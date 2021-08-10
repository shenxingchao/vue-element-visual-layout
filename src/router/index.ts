import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由前置钩子
router.beforeEach((to, from) => {
  //旧路由数组,还没有push了
  let route_list: any[] = store.state.route_list
  //找到当前激活的路由
  let active_index = route_list.findIndex((item: any) => item.active == true)

  if (active_index !== -1) {
    //如果上一个页面的路径=要去的路径，那么就是返回
    if (
      route_list[active_index].from_path == to.path &&
      route_list[active_index - 1]
    ) {
      route_list.forEach((element: any) => {
        element.active = false
      })
      //找到要去的路径，置为active
      route_list[active_index - 1].active = true
    }
    //如果下一个页面的路径=要去的路径，那么就是前进
    else if (
      route_list[active_index + 1] &&
      route_list[active_index + 1].to_path == to.path
    ) {
      route_list.forEach((element: any) => {
        element.active = false
      })
      //找到要去的路径，置为active
      route_list[active_index + 1].active = true
    } else {
      //*这步很关键，当前激活的假如不是最后一个 就是返回后再添加新路由，需要把当前激活索引后的元素先删除 相当于堆栈由当前索引重新开始叠加
      if (active_index != route_list.length - 1) {
        let del_length = route_list.length - 1 - active_index
        //这里用filter过滤会有问题，会改变原数组类型 用pop也是可以的，就是要循环了
        route_list.splice(active_index + 1, del_length)
      }
      route_list.forEach((element: any) => {
        element.active = false
      })
      route_list.push({ to_path: to.path, from_path: from.path, active: true })
    }
  } else {
    //第一次进入 //把to,from全部放入堆栈
    route_list.push({ to_path: to.path, from_path: from.path, active: true })
  }
  store.dispatch('handleChangeRouteList', route_list)
})

export default router
