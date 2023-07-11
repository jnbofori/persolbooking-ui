<template>
  <div class="p-3">
    <el-form label-width="120px" :label-position="'top'">
      <el-row class="ml-3">
        <el-col :span="11" class="ml-2">
          <el-form-item label="Start time">
            <el-date-picker
              v-model="startTime"
              size="large"
              type="datetime"
              placeholder="Select date and time"
              :disabled-date="disabledStartDate"
            />
          </el-form-item>
        </el-col>

        <el-col :span="11" class="ml-3">
          <el-form-item label="End time">
            <el-date-picker
              v-model="endTime"
              size="large"
              type="datetime"
              placeholder="Select date and time"
              :disabled-date="disabledEndDate"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="ml-4">
        <el-form-item label="Facility">
          <el-select v-model="facility" placeholder=" " size="large">
            <el-option
              v-for="item in facilityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>

      <el-button type="primary" color="#1E3A8A" size="large" class="ml-4 mt-3" @click="handleSubmit">
        Book
      </el-button>
    </el-form>
  </div>
</template>


<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
import { isAfter, isBefore, isPast, isToday } from 'date-fns';

export default {
  name: 'booking-form',
  components: {},
  data() {
    return {
      startTime: '',
      endTime: '',
      facility: '',
      facilityOptions: []
    }
  },
  async created() {
    this.fetchFacilities()
  },
  methods: {
    async fetchFacilities() {
      try {
        const response = await axios.get('admin/facility', {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        const facilities = response.data;
        for (let facility of facilities) {
          this.facilityOptions.push({
            label: facility.name,
            value: facility._id
          })
        }
      } catch (e) {
        ElMessage({
          message: 'Error fetching facilities',
          type: 'error',
        })
      }
    },
    async handleSubmit() {
      try {
        await axios.post('booking',{
          startTime: this.startTime,
          endTime: this.endTime,
          facility: this.facility
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        ElMessage({
          message: 'Booking Added Successfully.',
          type: 'success',
        })

        this.resetForm()
        this.$emit("closeDialog")
      } catch (e) {
        ElMessage({
          message: 'Error adding new booking',
          type: 'success',
        })
      }
    },
    disabledStartDate(date) {
      return isPast(date) && !isToday(date) || (this.endTime && isAfter(date, this.endTime))
    },
    disabledEndDate (date) {
      return isPast(date) && !isToday(date) || (this.startTime && isBefore(date, this.startTime))
    },
    resetForm() {
      this.startTime = ''
      this.endTime = ''
      this.facility = ''
    }
  }
}
</script>