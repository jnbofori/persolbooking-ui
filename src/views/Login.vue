<template>
  <div class="flex flex-row justify-center items-center mt-20">
    <div class="shadow-md rounded-md p-10 w-2/5 border-t flex flex-col">
      <img src="https://www.persol.net/wp-content/uploads/2016/10/Persol-Logo-small.png" alt="Logo" class="my-3 w-64 self-center">

      <form @submit.prevent="handleSubmit">
        <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
        </div>
        <h3 class="font-semibold">Login</h3>

        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div>
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button class="btn btn-primary btn-block">Login</button>
        <div class="text-below">
          <span>
              Have an admin account?
              <router-link to="/admin/login">Login here</router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      axios.post('auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user))

        this.$store.commit('setUser', user)

        this.$router.push({ name: 'bookings' })
      }).catch(() =>{
        this.error = 'Invalid email/password';
      });
    }
  }
}
</script>

<style scoped>
  .text-below {
    text-align: center;
    margin-top: 15px;
  }

  .btn {
    margin-top: 20px;
  }
</style>