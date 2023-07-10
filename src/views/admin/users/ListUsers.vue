<template>
  <div>
    <el-row justify="space-between" class="mb-5 pt-2">
      <el-col :span="20">
        <el-input
          v-model="search"
          class="w-50 ml-2"
          placeholder="Search..."
          size="large"
          @input="fetchEmployees"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" color="#1E3A8A" @click="goToAddNew" class="mt-2">Add New</el-button>
      </el-col>
    </el-row>

    <el-table :data="employees" style="width: 100%" class="ml-2">

      <el-table-column label="First name" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.firstname }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Last name" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.lastname }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Email" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Department" width="auto">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.department }}</span>
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
import { debounce } from 'lodash';
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'admin-list-users',
  components: {},
  data() {
    return {
      employees: [],
      error: '',
      search: '',
      showConfirmDelete: false,
      debounceFetchAllData: () => {},
    }
  },
  async created() {
    this.debounceFetchAllData = debounce(this.fetchEmployees, 500);
    this.debounceFetchAllData()
  },
  methods: {
    async fetchEmployees() {
      try {
        let url = 'admin/employee';
        if (this.search) {
          url = `${url}?search=${this.search}`
        }
        const response = await axios.get(url, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        this.employees = response.data;
      }catch (e) {
        console.log('error', e)
      }
    },
    goToAddNew() {
      this.$router.push({ name: "admin-new-user" })
    },
    handleEdit(index, user) {
      this.$router.push({
        name: "admin-update-user",
        params: {
          id: user._id
        },
      });
    },
    handleDelete(index, user) {
      ElMessageBox.confirm(
        'This will permanently delete the user. Continue?',
        'Warning',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      .then(async () => {
        console.log({user})
        axios.delete(`admin/employee/${user._id}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        }).then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
          this.debounceFetchAllData()
        });
      })
    }
  }
}
</script>