<template>
  <el-card class="modal-commodity-list-table">
    <el-table ref="multipleTable" :data="tableData" max-height="400">
      <el-table-column :label="label" min-width="250">
        <template slot-scope="scope" class="commodity-list-image">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :autoScroll="false" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  props: {
    total: {
      type: Number,
      required: true
    },
    list: {
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
      tableData: [],
      label: '',
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  watch: {
    'listQuery.page': {
			handler (newVal) {
        if (this.list.length > 0) {
          this.tableData = this.list.slice((newVal - 1) * this.listQuery.limit, (newVal - 1) * this.listQuery.limit+ this.listQuery.limit)
        }
			}
    },
    'listQuery.limit': {
      handler (newVal) {
        if (this.list.length > 0) {
          this.tableData = this.list.slice(0, newVal)
        }
      }
    },
    list (val) {
      this.tableData = val.slice(0, this.listQuery.limit)
    },
    couponcsvtype (val) {
      this.title(val)
    }
  },
  created () {
    this.couponcsvtype = this.couponcsvtype
    this.title(this.couponcsvtype)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.list.length > 0) {
        this.tableData = this.list.slice(0, 10)
      }
    })
  },
  methods: {
    title (val) {
      if (val == '1') {
        this.label = '商品编码：'
      } else {
        this.label = '门店编码：'
      }
    }
  }
}
</script>

<style lang="scss">
.modal-commodity-list-table{
  .el-card__body{
    padding: 0px;
    padding-bottom: 10px;
  }
}
</style>

<style lang="scss" scoped>
.modal-commodity-list-table{
  margin-top: 10px;
  .pagination-container{
    padding: 0px;
  }
  .pagination-container{
    margin-top: 15px;
  }
}
</style>
