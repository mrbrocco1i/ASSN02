import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Beverages from '@/components/Beverages'
import Add from '@/components/Add'
import ContactUs from '@/components/ContactUs'
import Edit from '@/components/Edit'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/beverages',
      name: 'Beverages',
      component: Beverages
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
  ]
})
