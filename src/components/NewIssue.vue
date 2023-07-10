<template>
    <form @submit.prevent="addIssue">
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="title" placeholder="Your title"/>
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea v-model="description" class="form-control" placeholder="Please describe your issue as thoroughly as possible..."></textarea>
        </div>

        <button class="btn btn-primary btn-block">Submit</button>
    </form>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AddIssue",
        data() {
            return {
                title: '',
                description: ''
            }
        },
        methods: {
            async addIssue() {
                axios.post('issues', {
                    title: this.title,
                    description: this.description
                }, {
                    headers: {'auth-token': localStorage.getItem('token')}
                }).then(() => {
                    this.$router.push('/home')
                });
            }
        }
    }
</script>


<style scoped>

</style>