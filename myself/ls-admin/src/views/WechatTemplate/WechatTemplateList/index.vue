<template>
<!--  -->
  <el-card class="wechat-template-list" v-loading="loading" v-if="dataFetched">
    <serach-bar @query="query" @reset="reset" @add="$router.push({ path: '/backend/wechat-template-msg/create'})" />
    <template-msg-list :list="list" :list-query="listQuery" :total="total" @fetch="fetch" />
  </el-card>
</template>

<script>
import SerachBar from './SerachBar.vue'
import TemplateMsgList from './TemplateList.vue'
export default {
  components: {
    SerachBar,
    TemplateMsgList
  },
  data () {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      loading: true,
      list: [],
      dataFetched: false,
      total: 0,
      filter: {}
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.promotionTemplateMsg.index(data).then(res => {
        this.loading = false
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
      }).catch(error => {
        this.$message.error(error.message)
        this.loading = false
      })
    },
    reset () {
      this.filter = {}
      this.listQuery.page = 1
      this.fetch()
    },
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      this.listQuery.page = 1
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.wechat-template-list {
  margin: 20px;
  box-shadow: none;
}
</style>
