<template>
  <el-dialog calss="role-menu-dialog" :title="'角色菜单管理'" :visible.sync="dialogFormVisible" @close="close('roleMenuForm')">
    <el-tree
      v-loading="loading"
      ref="tree"
      :data="roleMenuLists"
      show-checkbox
      node-key="tid"
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="defaultCheckedKeys"
    >
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('roleMenuForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm('roleMenuForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      loading: true,
      roleMenuLists: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    },
    roleId (val) {
      this.loading = true
      this.defaultCheckedKeys = []
      this.$api.adminRoleMenu.index({
        roleId: val
      }).then(res => {
        res.data.sysList.forEach(ele => {
          ele.label = ele.modelName
          ele.tid = `sys-${ele.id}`
          if (ele.modelList && ele.modelList.length) {
            ele.children = ele.modelList
            ele.modelList.forEach(model => {
              model.tid = `model-${model.id}`
              model.label = model.modelName
              if (model.menuList && model.menuList.length) {
                model.children = model.menuList
                model.menuList.forEach(menu => {
                  menu.tid = `menu-${menu.id}`
                  menu.label = menu.menuName
                  if (menu.checked) {
                    this.defaultCheckedKeys.push(menu.tid)
                  }
                })
              }
            })
          }
        })
        this.roleMenuLists = res.data.sysList
        this.loading = false
      })
    }
  },
  methods: {
    close (formName) {
      this.$emit('update:visible', false)
    },
    cancle (formName) {
      this.$emit('cancle')
    },
    comfirm (formName) {
      let roleMenuLists = []
      this.$refs.tree.getCheckedKeys().forEach(menu => {
        if (/^(menu)/.test(menu)) {
          roleMenuLists.push(parseInt(menu.split('-')[1]))
        }
      })
      this.$emit('comfirm', roleMenuLists)
    }
  }
}
</script>
