<template>
  <div class="view-channel" v-loading="loading">
    <merchant-query-form @reset="reset" @query="query" :info.sync="info"/>
    <merchant-add-btn @add="add" />
    <merchant-list-table :tableData="list" :total="total" :list-query="listQuery" @fetch="fetch" @mod="mod" />
    <merchant-dialog :visible.sync="merchantDialogVisible" :info.sync="merchantInfo" @comfirm="comfirm"/>
  </div>
</template>

<script>
import merchantListTable from './merchant-list-table.vue'
import merchantQueryForm from './merchant-query-form.vue'
import merchantAddBtn from './merchant-add-btn.vue'
import merchantDialog from './merchant-dialog.vue'
import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'

export default {
  components: {
    merchantListTable,
    merchantQueryForm,
    merchantAddBtn,
    merchantDialog
  },
  data () {
    return {
      merchantDialogVisible: false,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      list: [],
      dataFetched: false,
      total: 0,
      filter: {},
      info: {
        id: '',
        merchantName: '',
        merchantNumber: '',
        userName: ''
      },
      loading: true,
      merchantInfo: {
        type: 'create',
        id: '',
        merchantName: '',
        linkedUserName: '',
        callbackUrl: '',
        comment: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.channelSendCouponMerchantQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.info[key] = _filter[key]
          key === 'page' ? this.listQuery.page = _filter[key] : ''
          key === 'pageSize' ? this.listQuery.pageSize = _filter[key] : ''
        }
      })
    }
    this.fetch()
  },
  methods: {
    add () {
      this.merchantDialogVisible = true
      Object.keys(this.merchantInfo).forEach(key => { this.merchantInfo[key] = '' })
      this.merchantInfo.type = 'create'
    },
    mod (val) {
      this.loading = true
      this.merchantInfo.id = val.id
      this.$api.channelSendCouponMerchant.detail({ id: val.id }).then(res => {
        this.loading = false
        Object.keys(this.merchantInfo).forEach(key => { this.merchantInfo[key] = '' })
        this.merchantDialogVisible = true
        this.merchantInfo.type = 'mod'
        this.merchantInfo = Object.assign(this.merchantInfo, res.data)
        this.merchantInfo.comment = encodeTextAreaString(this.merchantInfo.comment)
        this.fetch()
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    query (obj) {
      this.filter = {}
      Object.keys(obj).forEach(key => {
        if (obj[key] !== '' && obj[key] !== null) {
          this.filter[key] = obj[key]
        }
      })
      this.listQuery.page = 1
      this.fetch()
    },
    reset () {
      this.filter = {}
      Object.keys(this.info).forEach(key => {
        if (key !== 'page' && key !== 'pageSize') {
          this.info[key] = ''
        }
      })
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    fetch () {
      this.loading = true
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('channelSendCoupon/setMerchantQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$api.channelSendCouponMerchant.getList(data).then(res => {
        let _res = res.data
        this.dataFetched = true
        this.loading = false
        this.list = _res.list
        this.total = _res.meta.totalNum
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    comfirm (data) {
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.merchantDialogVisible = false
          this.merchantInfo.type === 'create' ? this.create(data) : this.update(data)
        })
        .catch(_ => {})
    },
    create (data) {
      this.loading = true
      let _data = JSON.parse(JSON.stringify(data))
      _data.comment = encodeTextAreaString(_data.comment)
      this.$api.channelSendCouponMerchant.create(_data).then(res => {
        this.loading = false
        this.$message.success('创建成功！')
        this.fetch()
      }).catch(error => {
        this.loading = false
        this.merchantInfo.comment = decodeTextAreaString(this.merchantInfo.comment)
        this.$message.error(error.message)
      })
    },
    update (data) {
      this.loading = true
      let _data = JSON.parse(JSON.stringify(data))
      _data.comment = encodeTextAreaString(_data.comment)
      this.$api.channelSendCouponMerchant.update(_data).then(res => {
        this.loading = false
        this.$message.success('修改成功！')
        this.fetch()
      }).catch(error => {
        this.loading = false
        this.merchantInfo.comment = decodeTextAreaString(this.merchantInfo.comment)
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .view-channel{
    margin: 20px;

  }
</style>
