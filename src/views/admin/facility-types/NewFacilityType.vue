<template>
  <div class="mt-5 mx-2 shadow-md rounded-md p-10 border-t">
    <el-form label-width="120px" :label-position="'top'">
      <el-alert v-if="errorMessage" :title="errorMessage" type="error" class="mb-4" />
      <el-row>
        <el-col :span="12" class="mx-3">
          <el-form-item label="Name">
            <el-input v-model="name" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="mx-3">
          <el-form-item label="Description">
            <el-input v-model="description" type="textarea" :rows="4" />
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
      name: '',
      description: '',
      errorMessage: '',
    }
  },
  async created() {},
  methods: {
    async handleSubmit() {
      try {
        if (!this.name) {
          this.errorMessage = 'Please input a name'
          return
        }
        await axios.post('admin/facility-type',{
          name: this.name,
          description: this.description,
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        ElMessage({
          message: 'Facility Type Added Successfully.',
          type: 'success',
        })

        this.$router.push({ name: 'admin-facility-types' })
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