import Vue from 'vue'
import Router from 'vue-router'

import PublicHeader from '../components/public/PublicHeader'
import Login from '../components/public/Login'
import SignUp from '../components/public/SignUp'
import Home from '@/components/public/Home'

import UserConsoleHeader from '../components/userConsole/UserConsoleHeader'
import People from '../components/userConsole/People/People'
import ReadPerson from '../components/userConsole/People/ReadPerson'
import UpdatePerson from '../components/userConsole/People/UpdatePerson'

import FeedPage from '../components/userConsole/feed/FeedPage'

import VolunteerOpportunities from '../components/userConsole/volunteerOpportunities/VolunteerOpportunities'

import AdminHeader from '../components/admin/AdminHeader'
import Admin from '../components/admin/Admin'
import UpdateUser from '../components/admin/UpdateUser'
import ReadUser from '../components/admin/ReadUser'
import NewUsers from '../components/admin/NewUsers'
import { GC_USER_ID } from '../constants/settings'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Router)

const router = new Router({
  routes: [
  // ======================================= Public Pages =============================================
    {
      path: '/',
      component: PublicHeader,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    },
    // ======================================= User Console Pages =============================================
    {
      path: '/',
      component: UserConsoleHeader,
      children: [
        {
          path: '/feed',
          component: FeedPage
        },
        {
          path: '/volunteeropportunities',
          component: VolunteerOpportunities
        },
        //  ------------------------------------------ People ----------------------------------
        {
          path: '/people',
          component: People,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/:id',
          component: ReadPerson,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/update/:id',
          component: UpdatePerson,
          name: 'UpdatePerson',
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    // ------------------------------------------ Admin ----------------------------------
    {
      path: '/',
      component: AdminHeader,
      children: [
        {
          path: '/admin',
          component: Admin
        },
        {
          path: '/newusers',
          component: NewUsers
        },
        {
          path: '/user/:id',
          component: ReadUser
        },
        {
          path: '/user/update/:id',
          component: UpdateUser,
          name: 'updateUser'
        }
      ]
    }
  ],
  // set mode to ‘history’ to remove the hash from the URLs
  mode: 'history'
})

// Need to add funcationality to default to a protected route if requiresAuth has not been set on a route
router.beforeEach((to, from, next) => {
  let currentUser = userId
  if (userId) {
    console.log('User is Authenticated')
  }
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('login')
  } else {
    next()
  }
})

export default router

// const router = new Router({
//   routes: [
//     {
//       path: '/people',
//       component: People,
//       meta: {
//         requiresAuth: true
//       }
//     }
//   ]
// })

// router.beforeEach((to, from, next) => {
//   const currentUser = userId
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requiresAuth && !currentUser) {
//     next('/login')
//   } else if (requiresAuth && currentUser) {
//     next()
//   } else {
//     next()
//   }
// })
