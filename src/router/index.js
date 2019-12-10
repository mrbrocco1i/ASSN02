import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Beverages from '@/components/Beverages'
import Add from '@/components/Add'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'

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
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    }
  ]
})
