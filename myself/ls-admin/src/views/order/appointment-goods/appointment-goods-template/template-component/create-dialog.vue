<template>
  <el-dialog class="appointmentGoods-dialog" v-loading="loading" :title="title" :visible="createDialogFalg" @close="$emit('update:createDialogFalg', false)">
    <div class="query">
      近
      <el-select v-model="type" placeholder="请选择" @change="fetchList">
        <el-option
          v-for="item in dayOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      天，同步的预购计划
      <el-button type="primary" size="mini" @click="fetchList">更新</el-button>
    </div>
    <el-table :data="list">
      <el-table-column label="选择">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="selectClick(scope.row)" class="colorRouterLink">选择</a>
        </template>
      </el-table-column>
      <el-table-column property="commodityCd" label="商品编码"></el-table-column>
      <el-table-column property="commodityNameDisplay" label="商品名称" min-width="120"></el-table-column>
      <el-table-column label="基本售价" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sellPriceDisplay | RMB}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始销售日" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.orderBegin | formatBackendTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否可售">
        <template slot-scope="scope">
          <span v-if="scope.row.saleFlg === 0">不可售</span>
          <span v-if="scope.row.saleFlg === 1">可售</span>
        </template>
      </el-table-column> // 0 否 1 是
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    createDialogFalg: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    title () {
      return `新建（${this.$store.getters.regionBlockCodeName}）预购计划`
    }
  },
  data () {
    return {
      loading: false,
      type: 1,
      dayOptions: [{ label: 3, value: 1 }, { label: 7, value: 2 }, { label: 15, value: 3 }],
      list: null
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      this.loading = true
      this.$api.appointmentGoodsTemplate.getMainFileCommodityList({ type: this.type }).then(res => {
        this.list = res.data
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    selectClick (row) {
      this.$router.push({ path: '/backend/appointmentGoods/templatecreate', query: { type: this.type, commodityCd: row.commodityCd } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .appointmentGoods-dialog {
    margin-bottom: 20px;
    .colorRouterLink{color: rgb(19,148,236) !important}
    .query {
      text-align: right;
      margin-bottom: 20px;
    }
    .el-select {
      width: 100px;
    }
  }
</style>
