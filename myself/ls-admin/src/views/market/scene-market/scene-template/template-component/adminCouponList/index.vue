<template>
  <el-dialog v-loading="loading" :visible.sync="dialogFormVisible" @close="close" custom-class="newDialog">
    <commodity-query @query="query" @reset="reset" :couponcsvtype="couponcsvtype"/>
    <commodity-list :list="list" :total="total" :couponcsvtype="couponcsvtype"/>
    <commodity-action @fetch="fetch" @comfirm="comfirm" @cancle="$emit('cancle')" />
  </el-dialog>
</template>

<script>
import CommodityList from './commodity-list.vue'
import CommodityAction from './commodity-action.vue'
import CommodityQuery from './query.vue'
export default {
  components: {
    CommodityList,
    CommodityAction,
    CommodityQuery
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    couponlist: {
      type: Array,
      required: true
    },
    couponcsvtype: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      loading: true,
      list: null,
      oldlist: null,
      dataFetched: false,
      total: 0,
      filter: {}
    }
  },
  watch: {
    couponcsvtype (val) {
      this.couponcsvtype = val
    },
    visible (val) {
      this.dialogFormVisible = val
    },
    couponlist (val) {
      if (this.couponcsvtype === 'shop') {
        this.list = this.couponlist.map((v) => {
          return { 'id': v.shopId, 'name': v.shopName }
        })
      } else {
        this.list = this.couponlist.map((v) => {
          return { 'id': v.commodityCd, 'name': v.commodityName }
        })
      }
      this.oldlist = JSON.parse(JSON.stringify(this.list))
    },
    list () {
      this.total = this.list.length
    }
  },
  created () {
    this.couponcsvtype = this.couponcsvtype
    this.fetch()
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    comfirm () {
      this.$emit('comfirm')
    },
    query (val) {
      this.filter = {}
      Object.keys(val).forEach(key => {
        if (val[key] !== '') {
          this.filter[key] = val[key]
        }
      })
      if (Object.keys(this.filter).length){
        this.fetch()
      }
    },
    reset () {
      this.filter = {}
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    // 改变页码和每页条数时变化
    fetch () {
      let data = {
        page: this.listQuery.page,
        pageSize: this.listQuery.limit
      }
      if (Object.keys(this.filter).length) {
        Object.keys(this.filter).forEach(key => {
          if (this.filter[key] !== '') {
            data[key] = this.filter[key]
          }
        })
      }
      this.fetchCommodityList(data)
    },
    fetchCommodityList (data) {
      if (data.id) {
        this.list = this.oldlist.filter((v) => {
          return v.id === data.id
        })
      } else {
        this.list = JSON.parse(JSON.stringify(this.oldlist))
      }
    }
  }
}
</script>
<style lang="scss">
  .newDialog{width: 65% !important;}
</style>
