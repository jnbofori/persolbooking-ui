import { createRouter, createWebHistory } from 'vue-router'
import { get } from "lodash"

import store from '../store'
import Bookings from '../views/Bookings.vue'
import Login from "../views/Login";
import ViewAllPatients from "../views/ViewAllPatients";
import AdminLogin from "../views/admin/auth/AdminLogin";
import ListUsers from "../views/admin/users/ListUsers";
import NewUser from "../views/admin/users/NewUser";
import UpdateUser from "../views/admin/users/UpdateUser";
import ViewPatientIssues from "../views/ViewPatientIssues";


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
  {
    path: '/create-booking',
    name: 'create-booking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIssue.vue'),
    meta: {
      roles: ["employee"],
      require_auth: true,
    }
  },
  {
    path: '/booking/:bookingId',
    name: 'booking-detail',
    component: () => import(/* webpackPrefetch: true */ '../views/IssueDetail'),
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
    path: '/admin/bookings',
    name: 'admin-bookings',
    component: ViewAllPatients,
    meta: {
      roles: ["admin"],
      require_auth: true,
    }
  },
  {
    path: '/admin/bookings/:bookingId',
    name: 'admin-booking-detail',
    component: ViewPatientIssues,
    meta: {
      roles: ["admin"],
      require_auth: true,
    }
  }
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
