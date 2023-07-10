<template>
    <div class="issue-item">
        <p><em>Title: </em><span>{{issue.title}}</span></p>
        <p>{{issue.description}}</p>

        <div v-if="issue.response">
            <h6>Response:</h6>
            <p>{{issue.response.content}}</p>
            <p><span>By: </span>{{issue.response.doctor.surname}} {{issue.response.doctor.firstname}}</p>
        </div>
        <div v-else>
            <p><span>Responded: </span>No response yet</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IssueDetailItem",
        props: ["issue"]
    }
</script>

<style scoped>
    .issue-item {
        padding: 10px;
        border-bottom: 1px #ccc dotted;
        text-align: left;
    }
</style>