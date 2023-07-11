import { createRouter, createWebHistory } from 'vue-router'
import { get } from "lodash"

import store from '../store'
import Bookings from '../views/Bookings.vue'
import Login from "../views/Login";
import AdminLogin from "../views/admin/auth/AdminLogin";
import ListUsers from "../views/admin/users/ListUsers";
import NewUser from "../views/admin/users/NewUser";
import UpdateUser from "../views/admin/users/UpdateUser";
import ListFacilities from "../views/admin/facilities/ListFacilities";
import NewFacility from "../views/admin/facilities/NewFacility";
import UpdateFacility from "../views/admin/facilities/UpdateFacility";
import ListFacilityTypes from "../views/admin/facility-types/ListFacilityTypes";
import NewFacilityType from "../views/admin/facility-types/NewFacilityType";
import UpdateFacilityType from "../views/admin/facility-types/UpdateFacilityType";


const routes = [
  { path: "/", redirect: { name: "login" } },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: Bookings,
    meta: {
      roles: ["employee"],
      require_auth: true,
    }
  },

  // ********** ADMIN ROUTES ***********
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: ListUsers,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Employees',
    }
  },
  {
    path: '/admin/users/new',
    name: 'admin-new-user',
    component: NewUser,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Add New Employee',
    }
  },
  {
    path: '/admin/users/:id',
    name: 'admin-update-user',
    component: UpdateUser,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Update Employee',
    }
  },
  {
    path: '/admin/facilities',
    name: 'admin-facilities',
    component: ListFacilities,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Facilities',
    }
  },
  {
    path: '/admin/facilities/new',
    name: 'admin-new-facility',
    component: NewFacility,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Add New Facility',
    }
  },
  {
    path: '/admin/facilities/:id',
    name: 'admin-update-facility',
    component: UpdateFacility,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Update Facility',
    }
  },
  {
    path: '/admin/facility-types',
    name: 'admin-facility-types',
    component: ListFacilityTypes,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Facility Types',
    }
  },
  {
    path: '/admin/facility-types/new',
    name: 'admin-new-facility-type',
    component: NewFacilityType,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Add New Facility Type',
    }
  },
  {
    path: '/admin/facility-types/:id',
    name: 'admin-update-facility-type',
    component: UpdateFacilityType,
    meta: {
      roles: ["admin"],
      require_auth: true,
      pageTitle: 'Update Facility Type',
    }
  },
  {
    path: '/admin/bookings',
    name: 'admin-bookings',
    component: Bookings,
    meta: {
      roles: ["admin"],
      require_auth: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from) => {
  console.log({to, from})
  if (to.name === from.name) { return true }
  const hasAccessToken = !!localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const toPathRequiresAuth = get(to, 'meta.require_auth', false)


  if (!hasAccessToken && toPathRequiresAuth) {    
    return { name: 'login' }
  }

  if (hasAccessToken && userData) {
    const userRole = store.getters.userRole
    if (!userRole) {
      store.commit('setUser', userData)
    }
  }

  if (toPathRequiresAuth) {
    const userRole = userData.role
  
    const { roles: allowed_roles = [] } = to.meta
    if (allowed_roles.length > 0 && !allowed_roles.includes(userRole)) {
      return { name: 'not-authorized' }
    }
  }

  if(!toPathRequiresAuth && hasAccessToken) {
    // redirect to user's home page
    const userRole = userData.role

    if (userRole === 'admin') {
      return { name: 'admin-bookings' }
    }

    if (userRole === 'employee') {
      return { name: 'bookings' }
    }
  }

  return true
});


export default router
