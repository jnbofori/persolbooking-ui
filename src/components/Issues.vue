<template>
    <div>
        <div v-bind:key="issue.id" v-for="issue in issues">
            <IssueItem v-bind:issue="issue"/>
        </div>
    </div>
</template>

<script>
    import IssueItem from "./IssueItem";
    export default {
        name: "Issues",
        components: {IssueItem},
        props: ["issues"],
    }
</script>

<style scoped>

</style>