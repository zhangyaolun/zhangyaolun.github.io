<template>
    <div class="menu-wrapper" v-if="!item.hidden">
        <template
                v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <app-link :to="onlyOneChild.path" v-if="onlyOneChild.meta">
                <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="item.id">
                    <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu :index="item.id" v-else>
            <template slot="title">
                <item :icon="item.meta && item.meta.icon" :title="item.meta.title" v-if="item.meta"/>
            </template>
            <sidebar-item
                    :base-path="child.path"
                    :is-nest="true"
                    :item="child"
                    :key="child.id"
                    class="nest-menu"
                    v-for="child in item.children"
            />
        </el-submenu>
    </div>
</template>

<script>
    import Item from './Item'
    import AppLink from './Link'
    import FixiOSBug from './FixiOSBug'

    export default {
        name: 'SidebarItem',
        components: {Item, AppLink},
        mixins: [FixiOSBug],
        props: {
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            this.onlyOneChild = null
            return {}
        },
        methods: {
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
                    this.onlyOneChild = {...parent, noShowingChildren: true}
                    return true
                }
                return false
            }
        }
    }
</script>
