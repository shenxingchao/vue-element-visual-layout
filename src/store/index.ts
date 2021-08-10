import { createStore } from 'vuex'
import { getTheme, setTheme } from '@/untils/setting'
export default createStore({
  state: {
    setting: {
      show_drawer: false, //是否显示抽屉
      theme_type: getTheme() //主题
    },
    route_list: [] //维护一个路由数组,用于判断是否可以返回或者前进
  },
  mutations: {
    SET_SHOW_DRAWER: (state, bool) => {
      state.setting.show_drawer = bool
    },
    SET_THEME_TYPE: (state, theme_type) => {
      state.setting.theme_type = theme_type
    },
    SET_ROUTE_LIST: (state, route_list) => {
      state.route_list = route_list
    }
  },
  actions: {
    /**
     * 切换抽屉显示状态
     * @param param0 commit
     * @param bool 显示状态
     */
    handleChangeDrawer({ commit }, bool) {
      commit('SET_SHOW_DRAWER', bool)
    },

    /**
     * 切换主题
     * @param param0 commit
     * @param theme_type number 主题类型数字
     */
    handleChangeTheme({ commit }, theme_type) {
      document.body.className = 'theme' + theme_type
      setTheme(theme_type)
      commit('SET_THEME_TYPE', theme_type)
    },

    /**
     * 改变路由数组
     * @param param0 commit
     * @param route_list 路由列表
     */
    handleChangeRouteList({ commit }, route_list) {
      commit('SET_ROUTE_LIST', route_list)
    }
  },
  modules: {}
})
