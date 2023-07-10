<template>
  <div id="app">
    <h3>Your logged Issues</h3>
    <Issues v-bind:issues="issues"/>
  </div>
</template>

<script>
  import Issues from '../components/Issues';
  import axios from 'axios';

  export default {
    name: 'Home',
    components: {
      Issues
    },
    data() {
      return {
        issues: []
      }
    },
    async created() {
      const response = await axios.get('issues', {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      this.issues = response.data;
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .btn:hover {
    background: #666;
  }

</style>
