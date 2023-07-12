<template>
  <div class="flex flex-row justify-between items-center ml-3 pt-4">
    <img v-if="currentUserRole === 'employee'" src="https://www.persol.net/wp-content/uploads/2016/10/Persol-Logo-small.png" alt="Logo" class="my-3">
    <h4 class="text-lg font-medium">{{ $route.meta.pageTitle }}</h4>
    <div class="mr-5 flex flex-row items-center">
      <div class="mr-1">{{ currentUserName }}</div>
      <el-tooltip
        effect="dark"
        content="Log Out"
        placement="top-start"
      >
        <img src="../../assets/log-out.svg" alt="Logout SVG" class="cursor-pointer mr-2"  @click="logout"/>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import {
} from '@element-plus/icons-vue'

export default {
  name: "Header",
  props: ['user'],
  components: {},
  computed: {
    currentUserName () {
      return `${get(this.$store, "state.user.firstname")} ${get(this.$store, "state.user.lastname")}`
    },
    currentUserRole () {
      return get(this.$store, "state.user.role")
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