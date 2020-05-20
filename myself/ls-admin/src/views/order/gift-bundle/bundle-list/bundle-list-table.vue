<template>
  <el-card class="gift-table-wrap">
    <el-table :data="list" class="bundle-table">
      <el-table-column prop="id" label="ID" min-width="40" />
      <el-table-column prop="name" label="特惠券包名称"/>
      <el-table-column prop="regionBlockCode" label="地区" min-width="60" />
      <el-table-column prop="originalPrice" label="原价(元)" min-width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.originalPrice | RMB }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sellPrice" label="卖价(元)" min-width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.sellPrice | RMB }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remainedQty" label="剩余库存" min-width="50" />
      <el-table-column prop="showTime" label="活动时间" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.showTime | formatBackendTime }}<br>{{ scope.row.finishTime | formatBackendTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="支付开始时间" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.orderTime | formatBackendTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="finishTime" label="活动结束时间" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.finishTime | formatBackendTime }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="status" label="是否在售" :formatter="saleFormat" min-width="60" />
      <el-table-column prop="sort" label="序号" min-width="80">
        <template scope="scope">
          <el-input v-model="scope.row.sort" maxlength="4" placeholder="请输入序号" :disabled="scope.row.status!==2" @input="provingNum(scope.$index, $event)" @blur="$emit('update', { id: scope.row.id, sort: scope.row.sort, index: scope.$index })"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作按钮" min-width="220">
        <template slot-scope="scope">
          <section v-if="scope.row.status==2" class="inlineBlock">
            <el-button size="mini" type="primary" @click="$emit('handleDetail', scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="$emit('handleDelete', scope.row)">暂停</el-button>
          </section>
          <section v-if="scope.row.status==3" class="inlineBlock">
            <el-button size="mini" type="primary" @click="$emit('handleDetail', scope.row)">详情</el-button>
          </section>
          <section v-if="scope.row.status==0" class="inlineBlock">
            <el-button size="mini" type="primary" @click="$emit('handleEdit', scope.row)">编辑</el-button>
          </section>
          <el-button v-if="scope.row.platform.indexOf('3') > -1" size="mini" type="primary" class="inlineBlock ml10" @click="$emit('dimensionalBarcode', scope.row)">生成二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    listQuery: {
      type: Object,
      required: true
    }
  },
  components: {
    Pagination
  },
  methods: {
    saleFormat (row, column, cellValue) {
      return cellValue == 2 ? "在售" : cellValue == 3 ? "暂停" : "已下架";
    },
    provingNum (index, $event) {
      this.list[index].sort = $event.replace(/[\D]/gi, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.gift-table-wrap {
  margin: 20px;
  .ml10{margin-left: 10px}
}
</style>
