<template>
  <el-card class="list-table">
    <el-table
      :data="tableData"
    >
      <el-table-column prop="id" label="活动ID" min-width="80"/>
      <el-table-column prop="activityKey" label="活动KEY" min-width="80"/>
      <el-table-column prop="title" label="活动名称" min-width="80"/>
      <el-table-column label="活动日期" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.beginTime | formatBackendTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span> ~
          <span>{{ scope.row.endTime | formatBackendTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityUnicom" label="活动类型" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.activityUnicom | activityUnicomFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityType" label="赠送范围" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.activityType | activityTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponSendType" label="礼券赠送" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.couponSendType | couponSendTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="会员范围" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.userType | userTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prohibitFlg" label="屏蔽常规活动" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.prohibitFlg | prohibitFlgFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishFlg" label="状态" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.publishFlg | publishFlgFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="220">
        <template slot-scope="scope">
<!--          <template v-if="scope.row.publishFlg === 0">-->
<!--            <router-link :to="'/backend/appointmentGoods/templatedetail/' + scope.row.id" class="ml10">-->
<!--              <el-button type="primary" size="mini">详情</el-button>-->
<!--            </router-link>-->
<!--          </template>-->
          <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id, publishFlg: scope.row.publishFlg})">编辑</el-button>
          <template v-if="scope.row.publishFlg === 1">
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', {id: scope.row.id, title: '删除', name: scope.row.title})">删除</el-button>
          </template>
          <el-button size="mini" type="primary" class="inlineBlock ml10" @click="$emit('dimensionalBarcode', scope.row)" v-if="scope.row.activityUnicom === 3">生成二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
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
  filters: {
    activityUnicomFilter (val) {
      let activityUnicomObj = {
        0: '外部投放',
        1: '联通',
        2: '合作对接',
        3: '内部活动',
        4: '全部'
      }
      return activityUnicomObj[val]
    },
    activityTypeFilter (val) {
      let activityTypeObj = {
        0: '全赠送',
        1: '只送礼券',
        2: '只送积分',
        3: '全部'
      }
      return activityTypeObj[val]
    },
    couponSendTypeFilter (val) {
      let couponSendTypeObj = {
        0: '全发送',
        1: '随机一种',
        2: '全部'
      }
      return couponSendTypeObj[val]
    },
    userTypeFilter (val) {
      let userTypeObj = {
        0: '全会员',
        1: '新会员',
        2: '老会员',
        3: '全部'
      }
      return userTypeObj[val]
    },
    prohibitFlgFilter (val) {
      let prohibitFlgObj = {
        0: '不屏蔽',
        1: '屏蔽所有',
        4: '全部'
      }
      return prohibitFlgObj[val]
    },
    publishFlgFilter (val) {
      let publishFlgFlgObj = {
        0: '公开',
        1: '不公开'
      }
      return publishFlgFlgObj[val]
    }
  }
}
</script>
<style lang="scss" scoped>
.list-table{
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
