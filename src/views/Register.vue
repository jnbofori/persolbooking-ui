<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="errors.length" class="alert alert-danger" role="alert">
            <ul>
                <li v-bind:key="error.index" v-for="error in errors">{{error}}</li>
            </ul>
        </div>
        <h3>Sign Up</h3>

        <div class="form-group">
            <label>First name</label>
            <input type="text" class="form-control" v-model="firstname" placeholder="First name" required>
        </div>

        <div class="form-group">
            <label>Surname</label>
            <input type="text" class="form-control" v-model="surname" placeholder="Surname" required/>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email" required/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password" required>
            <ul class="password-requirements">
                <li>Your password must contain at least 1 lowercase alphabetical character</li>
                <li>Your password must contain at least 1 uppercase alphabetical character</li>
                <li>Your password must contain at least 1 numeric character</li>
                <li>Your password must contain at least one special character</li>
                <li>Your password must be eight characters or longer</li>
            </ul>
        </div>

        <button class="btn btn-primary btn-block">Sign Up</button>

        <div class="text-below">
            <span>
                Already have an account?
                <router-link to="/login">Log in here</router-link>
            </span>
        </div>
    </form>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data() {
          return {
              firstname: '',
              surname: '',
              email: '',
              password: '',
              errors: []
          }
        },
        methods: {
            async handleSubmit() {
                try {
                    this.errors = [];
                    let passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})');
                    let emailPattern = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
                    if (!passwordPattern.test(this.password)) {
                        this.errors.push('Password too weak.');
                    }
                    if (!emailPattern.test(this.email)) {
                        this.errors.push('Invalid email address.');
                    }
                    if (this.firstname.length < 2 || this.surname < 3) {
                        this.errors.push('First name or Last name too short');
                    }

                    const data = {
                        firstname: this.firstname,
                        surname: this.surname,
                        email: this.email,
                        password: this.password
                    };
                    const response = await axios.post('user/register', data);
                    console.log(response);
                    await this.$router.push('/login')

                }catch (e) {
                    this.errors.unshift('Invalid input. Please check all entries');
                }
            }
        },
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

    .password-requirements {
        font-size: 13px;
        margin-left: 35px;
        padding-top: 3px;
    }
</style>