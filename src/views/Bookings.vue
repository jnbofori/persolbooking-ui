<template>
  <div v-loading="loading" class="flex flex-row justify-center items-center mt-14">
    <div class="shadow-md rounded-xl p-10 w-11/12 border-t ">

      <div class="flex justify-between items-start mx-4">
        <h3 class="text-lg font-medium mb-4">Bookings</h3>
        <el-button v-if="$store.getters.userRole !=='admin'" type="primary" color="#1E3A8A"  @click="addBooking">
          Add New
        </el-button>
      </div>

      <div v-if="bookings.length" class="grid grid-cols-3 gap-y-10 justify-items-center">
        <div v-for="booking in bookings" :key="booking._id" class="rounded-xl p-4 w-11/12 shadow-md border">
          
          <div class="flex justify-between">
            <el-tag class="mb-3" round :type="getStatusVariant(booking.status)">{{ booking.status }}</el-tag>
            <span>
              <el-icon class="cursor-pointer" @click="editBooking(booking)"><Edit /></el-icon>
              <el-icon class="cursor-pointer ml-2" color="#B02020" @click="deleteBooking(booking)"><Delete /></el-icon>
            </span>
          </div>

          <div class="text-2xl font-bold text-black mb-1">{{ get(booking, 'facility.name') }}</div>

          <div v-if="isSameDay(parseISO(booking.startTime), parseISO(booking.endTime))" class="mb-1">
            <div class="text-xl font-semibold">{{ format(parseISO(booking.startTime), "eee do MMM yyyy") }}</div>
            <div class="text-base">{{ format(parseISO(booking.startTime), "hh : mm bb") }} - 
              {{ format(parseISO(booking.endTime), "hh : mm bb") }}
            </div>
          </div>
          <div v-else class="mb-1">
            <div class="text-xl font-semibold">
              {{ format(parseISO(booking.startTime), "eee do MMM yyyy") }} ({{format(parseISO(booking.startTime), "hh : mm bb")}}) -
              {{ format(parseISO(booking.endTime), "eee do MMM yyyy") }} ({{format(parseISO(booking.endTime), "hh : mm bb")}})
            </div>
          </div>

          <div>By: {{ get(booking, 'bookedBy.firstname', 'N/A') }} {{ get(booking, 'bookedBy.lastname', 'N/A') }}</div>
          <div v-if="booking && booking.department">{{ get(booking, 'department', 'N/A') }}</div>
        </div>
      </div>

      <div v-else class="text-center">
        <h2 class="text-lg font-semibold mb-3">No Data Found</h2>
        <div>No bookings to display</div>
      </div>
    </div>
  </div>

  <el-dialog
    id="new-booking"
    v-model="dialogFormVisible"
    title="New Booking"
  >
    <new-booking ref="bookingForm" @closeDialog="debounceFetchAllData() ; dialogFormVisible = false" />
  </el-dialog>

  <el-dialog
    id="update-booking"
    v-model="editDialogFormVisible"
    title="Update Booking"
  >
    <update-booking ref="bookingForm" :editingBooking="editingBooking" @closeDialog="debounceFetchAllData() ; editDialogFormVisible = false" />
  </el-dialog>
</template>

<script>
import axios from 'axios';
import NewBooking from "./NewBooking";
import UpdateBooking from "./UpdateBooking";
import { debounce, get } from 'lodash';
import { format, parseISO, isSameDay } from 'date-fns'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Edit, Delete
} from '@element-plus/icons-vue'

  export default {
    name: 'Bookings',
    components: {
      Edit,
      Delete,
      NewBooking,
      UpdateBooking
    },
    data() {
      return {
        loading: false,
        bookings: [],
        editingBooking: {},
        dialogFormVisible: false,
        editDialogFormVisible: false,
        debounceFetchAllData: () => {},
      }
    },
    async created() {
      this.debounceFetchAllData = debounce(this.fetchBookings, 500);
      this.debounceFetchAllData()
    },
    methods: {
      async fetchBookings() {
        this.loading = true
        try {
          const response = await axios.get('booking', {
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
          this.bookings = response.data;
        }catch (e) {
          ElMessage({
            message: get(e, "response.data.message"),
            type: 'error',
          })
        } finally {
          this.loading = false
        }
      },
      getStatusVariant(status) {
        if (status === 'active'){
          return 'success'
        } else if (status === 'passed') {
          return 'warning'
        }
        return 'info'
      },
      addBooking() {
        this.dialogFormVisible = true;
      },
      editBooking(booking) {
        this.editingBooking = booking;
        this.editDialogFormVisible = true;
      },
      deleteBooking(booking) {
        ElMessageBox.confirm(
          'This will delete the booking. Continue?',
          'Warning',
          {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        )
        .then(async () => {
          axios.delete(`booking/${booking._id}`, {
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          }).then(() => {
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
            this.debounceFetchAllData()
          }).catch((e) => {
            ElMessage({
              message: get(e, "response.data.message"),
              type: 'error',
            })
          });
        })
      },
      get,
      format,
      parseISO,
      isSameDay,
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .btn:hover {
    background: #666;
  }

</style>
