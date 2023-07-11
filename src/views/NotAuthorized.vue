<template>
  <div v-loading="loading" class="flex flex-row justify-center items-center mt-14">
    <div class="shadow-md rounded-xl p-10 w-11/12 border-t text-center">
      <h1 class="text-lg font-semibold mb-3">
        You are not authorized! 🔐
      </h1>
      <p>You do not have permission to access this page</p>
      <el-button type="primary" color="#1E3A8A" class="ml-3 mt-3" @click="goHome">Back to Home</el-button>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Not-Authorized',
    methods: {
      goHome() {
        const userRole = this.$store.getters.userRole
        if (userRole === 'admin') {
          this.$router.push({ name: 'admin-users' })
        } else {
          this.$router.push({ name: 'bookings' })
        }
      }
    }
  }
</script>
