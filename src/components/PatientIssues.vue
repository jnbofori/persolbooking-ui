<template>
    <div class="patient-issue">
        <p @click="handleClick"><em>Title: </em><span>{{issue.title}}</span>
            <img v-if="issue.response" class="icon-img" src="../../public/checked.png">
        </p>
        <p>{{issue.description}}</p>
        <p><b>Patient: </b>{{issue.patient.surname}} {{issue.patient.firstname}}</p>
        <small>Posted: {{issue.created.substring(0,10)}}</small>
    </div>
</template>

<script>
    export default {
        name: "PatientIssues",
        props: ['issue'],
        methods: {
            handleClick() {
                this.$router.push(`/respond-issue/${this.issue._id}`);
            }
        }
    }
</script>

<style scoped>
    .patient-issue {
        padding: 10px;
        border-bottom: 1px #ccc dotted;
        text-align: left;
        cursor: pointer;
    }

    small {
        font-size: 12px;
        margin-top: -100px;
        padding-top: 0px;
    }
</style>