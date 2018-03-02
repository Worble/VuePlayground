import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import ClickerContainer from '@/components/ClickerContainer'
import CliContainer from '@/components/CliContainer'

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
      component: ClickerContainer
    },
    {
      path: '/test/cli',
      name: 'Cli',
      component: CliContainer
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
