<template>
  <div>
    <el-row justify="space-between" class="mb-5 pt-2">
      <el-col :span="20">
        <el-input
          v-model="search"
          class="w-50 ml-2"
          placeholder="Search..."
          size="large"
          @input="fetchFacilityTypes"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" color="#1E3A8A" @click="goToAddNew" class="mt-2">Add New</el-button>
      </el-col>
    </el-row>

    <el-table :data="facilityTypes" style="width: 100%" class="ml-2">

      <el-table-column label="Name" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Description" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px" class="truncate">{{ scope.row.description }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>


<script>
import axios from "axios";
import { debounce, get } from 'lodash';
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'admin-list-facility-types',
  components: {},
  data() {
    return {
      facilityTypes: [],
      error: '',
      search: '',
      debounceFetchAllData: () => {},
    }
  },
  async created() {
    this.debounceFetchAllData = debounce(this.fetchFacilityTypes, 500);
    this.debounceFetchAllData()
  },
  methods: {
    async fetchFacilityTypes() {
      try {
        let url = 'admin/facility-type';
        if (this.search) {
          url = `${url}?search=${this.search}`
        }
        const response = await axios.get(url, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        this.facilityTypes = response.data;
      }catch (e) {
        ElMessage({
          message: get(e, "response.data.message"),
          type: 'error',
        })
      }
    },
    goToAddNew() {
      this.$router.push({ name: "admin-new-facility-type" })
    },
    handleEdit(index, item) {
      this.$router.push({
        name: "admin-update-facility-type",
        params: {
          id: item._id
        },
      });
    },
    handleDelete(index, item) {
      ElMessageBox.confirm(
        'This will permanently delete the facility type. Continue?',
        'Warning',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      .then(async () => {
        axios.delete(`admin/facility-type/${item._id}`, {
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
    }
  }
}
</script>