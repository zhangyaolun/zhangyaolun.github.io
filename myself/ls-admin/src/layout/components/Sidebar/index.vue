<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper" class="system-bar">
      <el-menu
        :default-active="activeMenuIndex"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
        @select="changeSysSubMenu"
      >
        <el-menu-item :index="`${index}`" v-for="(menu, index) in sysModels" :key="index" @click="modelNameClick()">
          <el-tooltip class="item" effect="dark" :content="menu.modelName" placement="bottom">
<!--<i class="el-icon-menu"></i>-->
            <svg-icon :icon-class="menuIcon[menu.modelCode]" />
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permission_sys_subroutes" :key="route.modelCode" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Cookies from "js-cookie"

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      activeMenuIndex: '0',
      menuIcon: {
        'member_sys': 'user', // 会员系统
        'online-order': 'component', // 线上订单
        'pos-sys': 'bug', // POS
        'market-sys': 'tree-table', // 营销管理
        'market-sys_payasmember': 'excel' // 支付即会员
      }
      // pathToModel: {
      //   'member': '0',
      //   'on-line': '1',
      //   'pos': '2',
      //   'coupon': '3'
      // }
    }
  },
  created () {
    // console.log( this.permission_routes)
    if (this.$route.path !== '/index') {
      const menu = this.$route.path.split('/')[2]
      this.activeMenuIndex = this.pathToModel[menu] || this.activeMenuIndex
    }
  },
  watch: {
    '$route' (val) {
      const model = val.path.split('/')[2]
      this.activeMenuIndex = this.pathToModel[model] || this.activeMenuIndex
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'sysModels'
    ]),
    permission_sys_subroutes () {
      return this.permission_routes.filter(menu => menu.sysCode === this.sysModels[parseInt(this.activeMenuIndex)].modelCode)
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    pathToModel () {
      let _obj = {
      }
      Object.keys(this.sysModels).forEach((v, k) => {
        _obj[v] = k
      })
      return _obj
    }
  },
  methods: {
    changeSysSubMenu (val) {
      this.activeMenuIndex = val
      // 这里要对tagview做处理，隐藏前一个system的tabview，调出当前页面的tagview
    },
    modelNameClick () {
      this.$store.dispatch('app/toggleSideBar', { opened: true })
    }
  }
}
</script>
