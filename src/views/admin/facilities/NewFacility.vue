<template>
  <div class="mt-5 mx-2 shadow-md rounded-md p-10 border-t">
    <el-form label-width="120px" :label-position="'top'">
      <el-row class="ml-3">
        <el-form-item label="Type">
          <el-select v-model="facilityType" placeholder=" ">
            <el-option
              v-for="item in facilityTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>

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
  name: 'admin-list-facilities',
  components: {},
  data() {
    return {
      name: '',
      description: '',
      facilityType: '',
      facilityTypeOptions: []
    }
  },
  async created() {
    // fetch facility types
    this.fetchFacilityTypes()
  },
  methods: {
    async fetchFacilityTypes() {
      try {
        let url = 'admin/facility-type';
        const response = await axios.get(url, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        const facilityTypes = response.data;
        for (let facilityType of facilityTypes) {
          this.facilityTypeOptions.push({
            label: facilityType.name,
            value: facilityType._id
          })
        }
      }catch (e) {
        ElMessage({
          message: get(e, "response.data.message"),
          type: 'error',
        })
      }
    },
    async handleSubmit() {
      try {
        await axios.post('admin/facility',{
          name: this.name,
          description: this.description,
          facilityType: this.facilityType
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        ElMessage({
          message: 'Facility Added Successfully.',
          type: 'success',
        })

        this.$router.push({ name: 'admin-facilities' })
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