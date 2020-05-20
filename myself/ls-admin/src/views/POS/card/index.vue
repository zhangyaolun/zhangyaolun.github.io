<template>
  <div class="view-pos-system_card-list" v-loading="loading">
    <card-query-form @reset="reset" @query="query" />
    <card-list-table :list="list" :list-query="listQuery" :total="total" @handleCorrect="handleCorrect" @handleRefund="handleRefund" @fetch="fetch" />
  </div>
</template>

<script>
import cardQueryForm from './card-query-form.vue'
import cardListTable from './card-list-table.vue'

export default {
  components: {
    cardQueryForm,
    cardListTable
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      orderId: '',
      total: 0,
      filter: {},
      list: [],
      loading: true,
      refundDialogVisible: false
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    reset () {
      this.filter = {}
      this.listQuery.currPage = 1
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
        data = Object.assign({}, data, this.filter)
      }
      this.$api.posCard.index(data).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.$message.error(error.message)
        this.loading = false
      })
    },
    handleCorrect ({ businessNo }) {
      this.$confirm('你正在做冲正操作，请确认！', '冲正确认', {
        type: 'warning'
      }).then(response => {
        this.$api.posCard.refund(row.businessNo).then(res =>{
          this.$message.success('冲正成功！')
          this.loading = true
          this.fetch()
        }).catch(error => {
          this.$message.error(error.message)
        })
      })
    },
    handleRefund ({ bussinesssNo, amount }) {
      this.$confirm('请确认要退款'+amount+'元，该操作一旦成功不可逆！', '退款确认', {
        type: 'warning'
      }).then(response => {
        this.$api.posCard.refund(bussinesssNo).then(response =>{
          this.loading = true
          this.fetch()
        }).catch(error => {
          this.$message.error(error.message)
        })
      })
    }
  }
}
</script>
