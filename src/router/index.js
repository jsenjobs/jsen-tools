import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Search from '@/components/tools/search/search'
import Nav from '@/components/tools/nav/nav'
import ML from '@/components/tools/ML/nav'
import DataPage from '@/components/tools/ML/datapage'
import LabPage from '@/components/tools/ML/labpage'
import Login from '@/components/page/login'

import MicroServerList from '@/components/tools/microserver/listserver'
import MicroDetails from '@/components/tools/microserver/microdetail'
import MicroParams from '@/components/tools/microserver/microparams'
import MicroTemplate from '@/components/tools/microserver/microtemplate'
import MockApi from '@/components/tools/microserver/mockapi'
import ApiDoc from '@/components/tools/microserver/apidoc/apidoc'

// edit
import FileList from '@/components/tools/edit/file.list'
import SecEdit from '@/components/tools/edit/sec.edit'
import TestEdit from '@/components/tools/edit/test.edit'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/readme'
    },
    {
      path: '/tools',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '',
          redirect: 'edit'
        },
        {
          path: 'edit',
          component: TestEdit
        },
        {
          path: 'secedit/:securl/:path',
          name:'secedit',
          component: SecEdit
        },
        {
          path: 'filelist',
          component: FileList
        }
      ]
    },
    {
      path: '/readme',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '',
          redirect: 'main'
        },
        {
          path: 'ml',
          component: ML
        },
        {
          path: 'tick',
          component: DataPage
        },
        {
          path: 'main',
          component: Search
        },
        {
          path: 'nav',
          component: Nav
        },
        {
          path: 'lab',
          component: LabPage
        },
        {
          path: 'micro',
          component: MicroServerList
        },
        {
          path: 'microdetail/:name/:address',
          name: 'microdetail',
          component: MicroDetails
        },
        {
          path: 'microparams/:data/:name',
          name: 'microparams',
          component: MicroParams
        },
        {
          path: 'microtemplate',
          component: MicroTemplate
        },
        {
          path: 'mockapi/:data/:address',
          name: 'mockapi',
          component: MockApi
        },
        {
          path: 'apidoc',
          component: ApiDoc
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
import Cookies from '../utils/Cookies.js'
router.beforeEach((to, from, next) => {
  // alert(sessionStorage.getItem('accessToken'))
  //    console.log(to);
  if (to.path === '/login') {
    // 如果已经登入转到主页
    if (Cookies.getCookie('usession')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (!Cookies.getCookie('usession')) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
export default router
