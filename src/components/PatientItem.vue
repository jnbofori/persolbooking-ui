<template>
    <div class="patient-item" @click="handleClick">
        <p>&#187; {{patient.surname}} {{patient.firstname}}</p>
    </div>
</template>

<script>
    export default {
        name: "PatientItem",
        props: ["patient"],
        methods: {
            handleClick() {
                this.$router.push(`/view-issues/${this.patient._id}`);
            }
        }
    }
</script>

<style scoped>
    .patient-item {
        padding: 10px;
        border-bottom: 1px #ccc dotted;
        text-align: left;
        cursor: pointer;
    }
</style>