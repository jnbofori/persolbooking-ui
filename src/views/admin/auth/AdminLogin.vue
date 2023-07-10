<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
        </div>
        <h3>Admin Login</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button class="btn btn-primary btn-block">Login</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminLogin",
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      axios.post('admin/auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        // this.$emit('checkUser');
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user))

        this.$store.commit('setUser', user)

        this.$router.push({ name: 'admin-users' })
      }).catch(() =>{
        this.error = 'Invalid email/password'
      });
    }
  }
}
</script>

<style scoped>

</style>