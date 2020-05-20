<template>
  <el-card class="coupon-list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="优惠券ID"/>
      <el-table-column prop="projectNo" label="企划编号"/>
      <el-table-column prop="name" label="优惠券名称"/>
      <el-table-column prop="type" label="优惠券类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">商品券</span>
          <span v-if="scope.row.type == 1">免费券</span>
          <span v-if="scope.row.type == 2">满减券</span>
          <span v-if="scope.row.type == 3">立减券</span>
        </template>
      </el-table-column>
      <el-table-column prop="sendType" label="发送类型">
        <template slot-scope="scope">
          <span v-if="scope.row.sendType == 2">集点活动</span>
          <span v-if="scope.row.sendType == 3">活动派发</span>
          <span v-if="scope.row.sendType == 4">积分兑换</span>
          <span v-if="scope.row.sendType == 6">注册</span>
          <span v-if="scope.row.sendType == 7">购买</span>
          <span v-if="scope.row.sendType == 8">外部</span>
        </template>
      </el-table-column>
      <el-table-column prop="subsidyFlg" label="促销区分">
        <template slot-scope="scope">
          <span v-if="scope.row.subsidyFlg == 0">促销让利(原卖变)</span>
          <span v-if="scope.row.subsidyFlg == 1">会员代金券</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="优惠内容" min-width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.coupon_type === 'limited'">-->
<!--            <span>满{{scope.row.condition}}，</span>-->
<!--          </span>-->
<!--          <span v-else>-->
<!--            <span>无门槛，</span>-->
<!--          </span>-->
<!--          <span v-if="scope.row.discount_type === 'reduction'">减{{scope.row.face_value}}</span>-->
<!--          <span v-if="scope.row.discount_type === 'discount'">打{{parseFloat(scope.row.face_value)}}折</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="使用期限">
        <template slot-scope="scope">
          <template v-if="scope.row.dynamicPeriodFlg==0">
            <span>{{ scope.row.useDateFrom | formatBackendTime}}</span>
            <span>至</span>
            <span>{{ scope.row.useDateTo | formatBackendTime}}</span>
          </template>
          <template v-else>
            <span>{{ scope.row.dynamicPeriodDays }}</span>天
          </template>
        </template>
      </el-table-column>
<!--      <el-table-column label="已领取/剩余" min-width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.receive_nums }}/{{ scope.row.remain_nums }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="createTime" sortable label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatBackendTime}}
        </template>
      </el-table-column>
      <el-table-column prop="couponUpperLimit" label="剩余库存">
        <template slot-scope="scope">
          <span v-if="scope.row.couponUpperLimit == 0">无限库存</span>
          <span v-else>{{scope.row.couponRemain}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'CREATED'">未公开</span>
          <span v-if="scope.row.status === 'PUBLISHED'">已公开</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="success" size="mini" class="ml10" @click="$emit('copymod', { type: 1, id: scope.row.id})">复制</el-button>
          <template v-if="scope.row.status === 'CREATED'">
            <el-button size="mini" class="ml10" @click="$emit('copymod', { type: 2, id: scope.row.id})">编辑</el-button>
          </template>
          <template v-if="scope.row.status === 'PUBLISHED'">
            <router-link :to="'/backend/coupon/detail/'+scope.row.id" class="ml10">
              <el-button size="mini">查看</el-button>
            </router-link>
          </template>
          <template v-if="scope.row.status === 'CREATED'">
            <el-button class="ml10" type="primary" size="mini" @click="$emit('mod', scope.row)">公开</el-button>
          </template>
          <template v-if="scope.row.status === 'CREATED'">
            <el-button class="ml10" size="mini" type="danger" @click="$emit('del', scope.row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  filters: {
    formatUpperLimit (val) {
      return val == 0 ? '无限库存' : val
    }
  },
  props: {
    tableData: {
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
  methods: {
    handleDelete (id) {
      this.$emit('del', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-list-table{
  .ml10{margin: 2px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
