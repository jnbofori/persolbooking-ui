<template>
    <IssueDetailItem v-bind:issue="issue"/>
</template>

<script>
    import axios from "axios";
    import IssueDetailItem from "../components/IssueDetailItem";

    export default {
        name: "IssueDetail",
        components: {IssueDetailItem},
        data(){
            return {
                issue: {}
            }
        },
        async created() {
            const response = await axios.get(`issues/detail/${this.$route.params.issueId}`, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            this.issue = response.data;
        }
    }
</script>

<style scoped>

</style>