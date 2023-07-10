<template>
    <div class="issue-item">
        <p><em>Title: </em><span>{{issue.title}}</span></p>
        <p>{{issue.description}}</p>
        <p v-if="issue.patient"><b>Patient: </b>{{issue.patient.surname}} {{issue.patient.firstname}}</p>
        <hr style="width:50%;text-align:left;margin-left:0">

        <div v-if="issue.response">
            <h6>Response:</h6>
            <p>{{issue.response.content}}</p>
            <p><span>By: </span>{{issue.response.doctor.surname}} {{issue.response.doctor.firstname}}</p>
        </div>
        <div v-else>
            <form @submit.prevent="addResponse">
                <div class="form-group">
                    <label>Response:</label>
                    <textarea v-model="content" class="form-control" placeholder="Respond to patient..."></textarea>
                </div>

                <button class="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "RespondIssueItem",
        props: ['issue'],
        data() {
            return {
                content: ''
            }
        },
        methods: {
            async addResponse() {
                axios.put(`issues/respond/${this.issue._id}`, {
                    content: this.content,
                }, {
                    headers: {'auth-token': localStorage.getItem('token')}
                }).then(() => {
                    this.$router.push('/view-patients');
                });
            }
        }
    }
</script>

<style scoped>
    .issue-item {
        padding: 10px;
        border-bottom: 1px #ccc dotted;
        text-align: left;
    }
</style>