<template>
  <div id="app">

    <component :is="layout">
      <div class="auth-wrapper">
        <div>
          <router-view />
        </div>
      </div>
    </component>

  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { checkUserStatus } from './verifyStatus';

import LayoutAdmin from "./layouts/admin";
import LayoutDefault from "./layouts/default";
import LayoutBlank from "./layouts/blank";


export default {
  components: {},
  data() {
    return {
      user: null,
      value: false
    }
  },
  created() {
    this.user = checkUserStatus();
  },
  methods:{
    checkUser(){
      this.value = !this.value;
    }
  },
  computed: {
    ...mapGetters([
      'userRole'
    ]),
    layout() {
      if (this.$route.meta.layout === 'admin') { 
        return LayoutAdmin
      } else if (this.$route.meta.layout === 'default') {
        return LayoutDefault
      }
      return LayoutBlank
    },
  },
  watch: {
    value: function () {
      this.user = checkUserStatus();
    }
  }
}
</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

  * {
    box-sizing: border-box;
  }

  body {
    /* background: #1C8EF9 !important; */
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    color: #625f6e;
    font-family: 'Poppins', serif, 'Fira Sans', sans-serif; 
  }

  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    /* color: #625f6e; */
    font-family: 'Poppins', serif, 'Fira Sans', sans-serif; 
  }

  body, html, #app, #root {
    width: 100%;
    height: 100%;
  }

  #app{
    text-align: center;
  }

  .navbar-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  }

  .auth-wrapper {
    /* display: flex; */
    /* justify-content: center; */
    /* flex-direction: column; */
    text-align: left;
    height: 80vh;

    /* margin-top: 100px; */
    padding-bottom: 100px;
  }

  .auth-inner {
    /* width: 600px; */
    margin: auto;
    background: #fff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    /* border-radius: 15px; */
  }

  .auth-wrapper .form-control:focus {
    border-color: #167bff;
    box-shadow: none;
  }

  .auth-wrapper h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }

  .custom-control-label {
    font-weight: 400;
  }

  .forgot-password,
  .forgot-password a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  .forgot-password a {
    color: #167bff;
  }

  img {
    size: 10px;
    margin-left: 10px;
    margin-top: -3px;
  }
</style>
