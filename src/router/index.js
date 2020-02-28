import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/projectManger',
    children: [{
      path: 'projectManger',
      name: '项目管理',
      component: () => import('@/views/projectManger/projectManger'),
      meta: {
        title: '项目管理',
        icon: 'iconxiangmu'
      }
    }]
  },

  {
    path: '/organizationPlan',
    component: Layout,
    redirect: '/organizationPlan/creatTeam',
    name: '编制计划',
    meta: {
      title: '编制计划',
      icon: 'iconjihua'
    },
    children: [{
        path: 'creatTeam',
        name: '组建团队',
        component: () => import('@/views/organizationPlan/creatTeam'),
        meta: {
          title: '组建团队',
          icon: ''
        }
      },
      {
        path: 'planProgress',
        name: '计划进度',
        component: () => import('@/views/organizationPlan/planProgress'),
        meta: {
          title: '计划进度',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/outlineAuthorized',
    component: Layout,
    redirect: '/outlineAuthorized/creatOutline',
    name: '大纲编制',
    meta: {
      title: '大纲编制',
      icon: 'icondagangguanli'
    },
    children: [{
        path: 'creatOutline',
        name: '生成大纲',
        component: () => import('@/views/outlineAuthorized/creatOutline'),
        meta: {
          title: '生成大纲',
          icon: ''
        }
      },
      {
        path: 'taskDivision',
        name: '任务分工',
        component: () => import('@/views/outlineAuthorized/taskDivision'),
        meta: {
          title: '任务分工',
          icon: ''
        }
      },
      {
        path: 'Tinymce',
        name: '新建大纲',
        hidden: true,
        component: () => import('@/views/outlineAuthorized/Tinymce'),
        meta: {
          title: '新建大纲',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/projectResearch',
    component: Layout,
    redirect: '/projectResearch/researchProgram',
    name: '项目调研',
    meta: {
      title: '项目调研',
      icon: 'icontiaoyan'
    },
    children: [{
        path: 'researchProgram',
        name: '调研方案',
        component: () => import('@/views/projectResearch/researchProgram'),
        meta: {
          title: '调研方案',
          icon: ''
        }
      },
      {
        path: 'researchSchedule',
        name: '调研日程',
        component: () => import('@/views/projectResearch/researchSchedule'),
        meta: {
          title: '调研日程',
          icon: ''
        }
      },
      {
        path: 'researchDatum',
        name: '调研资料',
        component: () => import('@/views/projectResearch/researchDatum'),
        meta: {
          title: '调研资料',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/planed',
    component: Layout,
    redirect: '/planed/divisonAuthorized',
    name: '规划成稿',
    meta: {
      title: '规划成稿',
      icon: 'iconguihua'
    },
    children: [{
        path: 'divisonAuthorized',
        name: '分工编制',
        component: () => import('@/views/planed/divisonAuthorized'),
        meta: {
          title: '分工编制',
          icon: ''
        }
      },
      {
        path: 'staging',
        name: '阶段成稿',
        component: () => import('@/views/planed/staging'),
        meta: {
          title: '阶段成稿',
          icon: ''
        }
      },
      {
        path: 'finalGather',
        name: '最终稿',
        component: () => import('@/views/planed/finalGather'),
        meta: {
          title: '最终稿',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/discussEdit',
    component: Layout,
    redirect: '/discussEdit/expertIdea',
    name: '讨论修改',
    meta: {
      title: '讨论修改',
      icon: 'icondiscuss'
    },
    children: [{
        path: 'expertIdea',
        name: '专家意见',
        component: () => import('@/views/discussEdit/expertIdea'),
        meta: {
          title: '专家意见',
          icon: ''
        }
      },
      {
        path: 'BranchIdea',
        name: '部门意见',
        component: () => import('@/views/discussEdit/BranchIdea'),
        meta: {
          title: '部门意见',
          icon: ''
        }
      },
      {
        path: 'partyIdea',
        name: '甲方意见',
        component: () => import('@/views/discussEdit/partyIdea'),
        meta: {
          title: '甲方意见',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/systemSet',
    component: Layout,
    redirect: '/systemSet',
    children: [{
      path: 'systemSet',
      name: '系统管理',
      component: () => import('@/views/systemSet/systemSet'),
      meta: {
        title: '系统管理',
        icon: 'iconshezhi'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }    
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
