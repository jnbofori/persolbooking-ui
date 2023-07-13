<template>
  <div class="mt-5 mx-2 shadow-md rounded-md p-10 border-t">
    <el-form label-width="120px" :label-position="'top'">
      <el-alert v-if="errorMessage" :title="errorMessage" type="error" class="mb-4" />
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

        <el-col :span="11" class="mx-3">
          <el-form-item label="Password">
            <el-input v-model="password" type="password" show-password />
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

      <el-button type="primary" color="#1E3A8A" class="ml-3 mt-3" @click="handleSubmit">Submit</el-button>
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
      errorMessage: '',
      formInvalid: true,
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
          value: 'human resources'
        },
        {
          label: 'Marketing',
          value: 'marketing'
        }
      ],
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      department: ''
    }
  },
  async created() {},
  methods: {
    async handleSubmit() {
      try {
        this.validateForm()
        if (this.formInvalid) {
          return
        }

        await axios.post('admin/employee',{
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
          message: 'Employee Added Successfully.',
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
    validateForm() {
      this.errorMessage = ''
      this.formInvalid = false

      if (!this.firstname || !this.lastname || !this.email || !this.password || !this.department) {
        this.errorMessage = 'Missing required fields'
        this.formInvalid = true
      }
      const passwordRegExp = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/
       if (!passwordRegExp.test(this.password)) {
        this.errorMessage = 'Your password must contain at least eight(8) characters, one uppercase, one lowercase, one special character and one digit'
        this.formInvalid = true
       }
      const emailRegExp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegExp.test(this.email)) {
        this.errorMessage = 'Invalid email'
        this.formInvalid = true
      }
      if (this.firstname.length < 3 || this.lastname.length < 3) {
        this.errorMessage = `Length of firstname and lastname should be at least 2 characters`
        this.formInvalid = true
      }
    },
  }
}
</script>