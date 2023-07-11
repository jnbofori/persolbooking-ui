<template>
  <div class="mt-5 mx-2 shadow-md rounded-md p-10 border-t">
    <el-form label-width="120px" :label-position="'top'">
      <el-row>
        <el-col :span="11" class="mx-3">
          <el-form-item label="First name">
            <el-input v-model="firstname" />
          </el-form-item>
        </el-col>

        <el-col :span="11" class="mx-3">
          <el-form-item label="Last name">
            <el-input v-model="lastname" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" class="mx-3">
          <el-form-item label="Email">
            <el-input v-model="email" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="mx-3">
          <el-form-item label="Department">
            <el-select v-model="department" placeholder=" ">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary" color="#1E3A8A" class="ml-3 mt-3" @click="handleSubmit">Update</el-button>
    </el-form>
  </div>
</template>


<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
import { get } from 'lodash';

export default {
  name: 'admin-list-users',
  components: {},
  data() {
    return {
      employeeId: '',
      departmentOptions: [
        {
          label: 'Finance',
          value: 'finance'
        },
        {
          label: 'IT',
          value: 'it'
        },
        {
          label: 'Human Resources',
          value: 'humanResources'
        },
        {
          label: 'Marketing',
          value: 'marketing'
        }
      ],
      firstname: '',
      lastname: '',
      email: '',
      department: ''
    }
  },
  async created() {
    this.fetchEmployee()
  },
  methods: {
    async fetchEmployee() {
      try {
        const { id } = this.$route.params;
        this.employeeId = id
        const response = await axios.get(`admin/employee/${this.employeeId}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        const employee = response.data;

        this.firstname = employee.firstname
        this.lastname = employee.lastname
        this.email = employee.email
        this.department = employee.department
      }catch (e) {
        ElMessage({
          message: get(e, "response.data.message"),
          type: 'error',
        })
      }
    },
    async handleSubmit() {
      try {
        await axios.put(`admin/employee/${this.employeeId}`,{
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          department: this.department
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        ElMessage({
          message: 'Employee Updated Successfully.',
          type: 'success',
        })

        this.$router.push({ name: 'admin-users' })
      } catch (e) {
        ElMessage({
          message: get(e, "response.data.message"),
          type: 'error',
        })
      }
    },
  }
}
</script>