<template>
  <div class="flex flex-row justify-between items-center ml-3 pt-4">
    <h4 class="text-lg font-medium">{{ $route.meta.pageTitle }}</h4>
    <div class="mr-5 flex flex-row items-center">
      <div class="mr-3">{{ currentUserName }}</div>
      <el-icon :size="20" class="cursor-pointer" @click="logout"><guide /></el-icon>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import {
  Guide
} from '@element-plus/icons-vue'

export default {
  name: "Header",
  props: ['user'],
  components: {
    Guide
  },
  computed: {
    currentUserName () {
      return `${get(this.$store, "state.user.firstname")} ${get(this.$store, "state.user.lastname")}`
    }
  },
  methods: {
    logout() {
      // this.$emit('checkUser');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      this.$router.replace({ name: 'login'});
    }
  }
}
</script>

<style scoped>
  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }
  .header a {
    color: #fff;
    padding-right: 5px;
  }
</style>