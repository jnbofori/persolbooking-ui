<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
        <div class="container">
            <a href="#" class="navbar-brand">Syncline Hospital</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto" v-if="user==='none'">
                    <li class="nav-item">
                        <router-link to="/admin/login" class="nav-link">Login as Doctor</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto" v-if="user==='user'">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/log-issue" class="nav-link">Log Issue</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0)" @click="handleClick" class="nav-link">Log out</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto" v-if="user==='admin'">
                    <li class="nav-item">
                        <router-link to="/view-patients" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0)" @click="handleClick" class="nav-link">Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Header",
        props: ['user'],
        methods: {
            handleClick() {
                this.$emit('checkUser');
                localStorage.removeItem('token');
                this.$router.push('/');
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