<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="拼团活动ID" min-width="50"/>
      <el-table-column prop="name" label="拼团活动名称" min-width="120"/>
      <el-table-column label="生效时间" min-width="160">
        <template slot-scope="scope">
          <template>
            <span>{{ scope.row.beginTime | formatBackendTime}}</span>
            <span>至</span>
            <span>{{ scope.row.endTime | formatBackendTime}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="状态" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'CREATED'">未公开</span>
          <span v-if="scope.row.status === 'PUBLISHED'">已公开</span>
          <span v-if="scope.row.status === 'ALREADYEND'">已结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="活动序号" min-width="50">
        <template scope="scope">
          <el-input :disabled="scope.row.status !== 'PUBLISHED'" v-model="scope.row.sort" maxlength="4" placeholder="请输入活动序号" @input="provingNum(scope.$index, $event)" @blur="$emit('update', { id: scope.row.id, sort: scope.row.sort, index: scope.$index })"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="180">
        <template slot-scope="scope">
          <template>
            <router-link :to="'/backend/assemble/templatedetail/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
          <template v-if="scope.row.status !== 'ALREADYEND'">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id})">编辑</el-button>
            <el-button class="ml10" size="mini" type="primary" v-if="scope.row.status === 'CREATED'" @click="$emit('updateConfirm', {id: scope.row.id,status: 'PUBLISHED', title: '公开', name: scope.row.name})">公开</el-button>
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', {id: scope.row.id,status: 'ALREADYEND', title: '结束', name: scope.row.name})">结束</el-button>
            <el-button size="mini" type="primary" class="ml10" @click="$emit('dimensionalBarcode', scope.row)">生成二维码</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
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
  methods: {
    provingNum (index, $event) {
      if (this.tableData[index].sort && $event) {
        this.tableData[index].sort = $event.replace(/[\D]/gi, '')
      } else {
        if (+this.tableData[index].sort.length === 1 && $event) {
          this.tableData[index].sort = this.tableData[index].sort.replace(/[^1-9]/gi, '')
        } else {
          this.tableData[index].sort = this.tableData[index].sort.replace(/[\D]/gi, '')
        }
      }
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
