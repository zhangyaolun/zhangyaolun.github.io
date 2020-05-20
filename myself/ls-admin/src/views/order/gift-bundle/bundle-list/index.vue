<template>
  <div class="view-order-system_bundle-list" v-loading="loading">
    <bundle-query-form @reset="reset" @query="query" :info.sync="info"/>
    <bundle-add-btn @handleCreate="handleCreate" />
    <bundle-list-table :list="list" :list-query="listQuery" :total="total" @handleDetail="handleDetail" @handleEdit="handleEdit" @update="update" @handleDelete="handleDeleteConfirm" @fetch="fetch" @dimensionalBarcode="dimensionalBarcode"/>
  </div>
</template>

<script>
import bundleListTable from './bundle-list-table.vue'
import bundleQueryForm from './bundle-query-form.vue'
import bundleAddBtn from './bundle-add-btn.vue'
export default {
  components: {
    bundleListTable,
    bundleQueryForm,
    bundleAddBtn
  },
  data() {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      filter: {},
      list: [],
      loading: true,
      info: {
        name: '',
        id: '',
        showTime: '',
        finishTime: '',
        saleFlag: '',
        orderTime: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.giftTemplateQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.info[key] = _filter[key]
          key === 'currPage' ? this.$set(this.listQuery, 'currPage', _filter[key]) : ''
          key === 'pageSize' ? this.$set(this.listQuery, 'pageSize', _filter[key]) : ''
        }
      })
    }
    this.fetch()
  },
  methods: {
    handleDetail ({ id }) {
      this.$router.push({ path: `/backend/on-line/gift/bundle/detail/${id}` })
    },
    handleEdit ({ id }) {
      this.$router.push({ path: `/backend/on-line/gift/bundle/edit/${id}` })
    },
    handleCreate () {
      this.$router.push({ path: '/backend/on-line/gift/bundle/create' })
    },
    reset () {
      this.filter = {}
      Object.keys(this.info).forEach(key => {
        if (key !== 'currPage' && key !== 'pageSize') {
          this.info[key] = ''
        }
      })
      this.listQuery.currPage = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      this.listQuery.currPage = 1
      this.fetch()
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('giftBundle/setGiftTemplateQueryData', data)
      this.$api.orderGiftBundle.index(data).then(res => {
        this.loading = false
        this.list = res.data.list
        if (this.list.length > 0) {
          this.list.forEach(v => {
            v.oldSort = v.sort
          })
        }
        this.total = res.data.totalCount
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    update (val) { // 序号更新
      this.loading = true
      if (val.sort === '') {
        this.$set(this.list[val.index], 'sort', this.list[val.index].oldSort)
        this.loading = false
      } else {
        this.$api.orderGiftBundle.updateBundleSort({ id: val.id, sort: parseInt(val.sort) }).then(res => {
          this.loading = false
          this.$message.success('修改成功！')
          this.fetch()
        }).catch(error => {
          this.loading = false
          this.$message.error(error.message)
        })
      }
    },
    handleDeleteConfirm ({ id, name }) {
      this.$confirm(`是否确定暂停活动【${name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id)
      }).catch(error => {})
    },
    handleDelete (val) {
      this.$api.orderGiftBundle.del(val).then(res => {
        this.loading = true
        this.$message.success('下架成功！')
        this.fetch()
      })
    },
    dimensionalBarcode ({ id }) {
      this.$router.push({ path: '/backend/dimensionalBarcode/templateCreate', query: { type: 'couponBundleDetail', bundleId: id } })
    }
  }
}
</script>
