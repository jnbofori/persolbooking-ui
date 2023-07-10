<template>
    <div  id="app">
        <RespondIssueItem v-bind:issue="issue"/>
    </div>
</template>

<script>
    import RespondIssueItem from "../components/RespondIssueItem";
    import axios from "axios";

    export default {
        name: "RespondIssue",
        components: {RespondIssueItem},
        data(){
            return {
                issue: {}
            }
        },
        async created() {
            const response = await axios.get(`issues/detail/${this.$route.params.issueId}`, {
                headers: {'auth-token': localStorage.getItem('token')}
            });
            this.issue = response.data;
        }
    }
</script>

<style scoped>

</style>