<template>
  <el-container>

    <el-aside width="21%" class="shadow-lg">
      <img src="https://www.persol.net/wp-content/uploads/2016/10/Persol-Logo-small.png" alt="Logo" class="my-3">
      <el-scrollbar>

        <el-menu active-text-color="#625f6e" text-color="#625f6e" class="mt-4">
          <el-menu-item
            index="1"
            :class="{ 'bg-blue-50 border-l-8 border-blue-900': $route.path.includes('admin/users') }"
            @click="$router.push({ name: 'admin-users' })"
          >
            <el-icon><user /></el-icon>
            <span class="text-base">Employees</span>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span class="text-base">Facilities</span>
            </template>
            <el-menu-item
              index="2-1"
              :class="{ 'bg-blue-50 border-l-8 border-blue-900': $route.path.includes('admin/facility-types') }"
              @click="$router.push({ name: 'admin-facility-types' })"
            > 
              <el-icon><icon-menu /></el-icon>
              <span class="text-base">Facility Types</span>
            </el-menu-item>
            <el-menu-item
              index="2-2"
              :class="{ 'bg-blue-50 border-l-8 border-blue-900': $route.path.includes('admin/facilities') }"
              @click="$router.push({ name: 'admin-facilities' })"
            > 
              <el-icon><icon-menu /></el-icon>
              <span class="text-base">Facilities</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item
            index="3"
            :class="{ 'bg-blue-50 border-l-8 border-blue-900': $route.name === 'admin-bookings' }"
            @click="$router.push({ name: 'admin-bookings' })"
          >
            <el-icon><document /></el-icon>
            <span class="text-base">Bookings</span>
          </el-menu-item>
        </el-menu>

      </el-scrollbar>

    </el-aside>

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

  </el-container>
</template>


<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import {
  Document,
  Menu as IconMenu,
  User
} from '@element-plus/icons-vue'

export default {
  name: 'Layout-admin',
  components: {
    Header,
    Footer,
    User,
    IconMenu,
    Document
  },
}
</script>

<style scoped>
</style>