import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Clicker from '@/components/Clicker'
import Cli from '@/components/Cli'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/test/clicker',
      name: 'Clicker',
      component: Clicker
    },
    {
      path: '/test/cli',
      name: 'Cli',
      component: Cli
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
