<template>
    <div :class="{'has-logo':showLogo}">
        <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
        <el-scrollbar class="system-bar" wrap-class="scrollbar-wrapper">
            <el-menu
                    :active-text-color="variables.menuActiveText"
                    :background-color="variables.menuBg"
                    :collapse="isCollapse"
                    :default-active="activeMenuIndex"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    @select="changeSysSubMenu"
                    mode="vertical"
            >
                <section :key="menu.id" @click="modelNameClick()" v-for="menu in ruleMenu">
                    <el-submenu :index="`${menu.id}`" v-if="menu.children && menu.children.length > 0">
                        <template slot="title">
                            <item :icon="menu.meta.icon" :title="menu.meta.title" v-if="menu.meta && menu.meta.icon"/>
                        </template>
                        <sidebar-item
                                :base-path="route.path"
                                :hasOneShowingChild="hasOneShowingChild"
                                :item="route"
                                :key="route.id"
                                v-for="route in menu.children"/>
                    </el-submenu>
                    <el-menu-item :index="`${menu.id}`" v-else>
                        <section
                                v-if="hasOneShowingChild(menu.children,menu) && !onlyOneChild.children && !menu.alwaysShow">
                            >
                            <app-link :to="menu.path" v-if="onlyOneChild.meta">
                                <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="onlyOneChild.path">
                                    <item :icon="onlyOneChild.meta.icon||(onlyOneChild.meta&&onlyOneChild.meta.icon)"
                                          :title="onlyOneChild.meta.title"/>
                                </el-menu-item>
                            </app-link>
                        </section>
                    </el-menu-item>
                </section>
            </el-menu>
        </el-scrollbar>


        <!--<svg-icon :icon-class="menuIcon[menu.modelCode]"/>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    //import Logo from './Logo'
    import Item from './Item'
    import AppLink from './Link'
    import SidebarItem from './SidebarItem'
    import variables from '@/styles/variables.scss'

    export default {
        components: {SidebarItem, Item, AppLink},
        data() {
            this.onlyOneChild = null
            return {
                activeMenuIndex: '0',
                menuIcon: {
                    'member_sys': 'user',
                }
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'ruleMenu'
            ]),
            activeMenu() {
                const route = this.$route
                const {meta, path} = route
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
            }
        },
        methods: {
            changeSysSubMenu(val) {
                this.activeMenuIndex = val
            },
            modelNameClick() {
                this.$store.dispatch('app/toggleSideBar', {opened: true})
            },
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        this.onlyOneChild = item
                        return true
                    }
                })
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }
                return false
            },
        }
    }
</script>
