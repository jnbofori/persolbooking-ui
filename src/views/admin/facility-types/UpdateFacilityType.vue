<template>
  <div class="mt-5 mx-2 shadow-md rounded-md p-10 border-t">
    <el-form label-width="120px" :label-position="'top'">
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

      <el-button type="primary" color="#1E3A8A" class="ml-3 mt-3" @click="handleSubmit">Update</el-button>
    </el-form>
  </div>
</template>


<script>
import axios from "axios";
import { ElMessage } from 'element-plus'

export default {
  name: 'admin-list-users',
  components: {},
  data() {
    return {
      facilityTypeId: '',
      name: '',
      description: '',
    }
  },
  async created() {
    this.fetchFacilityType()
  },
  methods: {
    async fetchFacilityType() {
      try {
        const { id } = this.$route.params;
        this.facilityTypeId = id
        const response = await axios.get(`admin/facility-type/${this.facilityTypeId}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        const facilityType = response.data;

        this.name = facilityType.name
        this.description = facilityType.description
      }catch (e) {
        console.log('error', e)
      }
    },
    async handleSubmit() {
      try {
        await axios.put(`admin/facility-type/${this.facilityTypeId}`, {
          name: this.name,
          description: this.description,
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        ElMessage({
          message: 'Facility Type Updated Successfully.',
          type: 'success',
        })

        this.$router.push({ name: 'admin-facility-types' })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>