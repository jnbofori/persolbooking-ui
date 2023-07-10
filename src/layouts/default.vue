<template>
  <el-container>

    <el-header>
      <Header />
    </el-header>

    <el-main>
      <slot />
    </el-main>

    <el-footer>
      <Footer />
    </el-footer>

  </el-container>
</template>


<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'Layout-default',
  components: {
    Header,
    Footer,
  }
}
</script>