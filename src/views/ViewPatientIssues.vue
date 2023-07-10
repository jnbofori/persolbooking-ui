<template>
    <div id="app">
        <h3>Issues by this user</h3>
        <div v-bind:key="issue._id" v-for="issue in issues">
            <PatientIssues v-bind:issue="issue"/>
        </div>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script>
    import axios from "axios";
    import PatientIssues from "../components/PatientIssues";

    export default {
        name: "ViewPatientIssues",
        components: {PatientIssues},
        data() {
            return {
                issues: [],
                error: ''
            }
        },
        async created() {
            try {
                const response = await axios.get(`issues/${this.$route.params.userId}`,{
                    headers: {'auth-token': localStorage.getItem('token')}
                });
                this.issues = response.data;
            }catch (e) {
                this.error = e;
            }
        }
    }
</script>

<style scoped>

</style>