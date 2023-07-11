<template>
  <div class="flex flex-row justify-center items-center mt-14">
    <div class="shadow-md rounded-xl p-10 w-11/12 border-t text-center">
      <h1 class="text-lg font-semibold mb-3">
        Page Not Found 🕵🏻‍♀️
      </h1>
      <p>Oops! 😖 The requested URL was not found on this server.</p>
      <el-button type="primary" color="#1E3A8A" class="ml-3 mt-3" @click="goHome">Back to Home</el-button>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Not-Found',
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
