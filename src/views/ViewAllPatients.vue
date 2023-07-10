<template>
    <div id="app">
        <h3>All patients here</h3>
        <div v-bind:key="patient._id" v-for="patient in patients">
            <PatientItem v-bind:patient="patient"/>
        </div>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script>
    import PatientItem from "../components/PatientItem";
    import axios from "axios";
    export default {
        name: "ViewAllPatients",
        components: {
            PatientItem
        },
        data() {
            return {
                patients: [],
                error: ''
            }
        },
        async created() {
            try {
                const response = await axios.get('admin/view-patients',{
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                });
                this.patients = response.data;
            }catch (e) {
                console.log('kloo')
            }
        },
    }
</script>

<style scoped>

</style>