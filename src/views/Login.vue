<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
        </div>
        <h3>Login</h3>

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
                axios.post('user/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.$emit('checkUser');
                    localStorage.setItem('token', response.data);
                    this.$router.push('/home')
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