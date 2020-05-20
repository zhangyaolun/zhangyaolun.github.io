<template>
  <el-table
    ref="dialogTable"
    :data="customerList"
    :class="[type === 'essential' ? 'dialogTableEssential' : type === 'send' ? 'dialogTableSend' : '' ]"
  >
    <el-table-column prop="rangeList" label="序号" width="50">
      <template slot-scope="scope">
        <span>{{scope.$index + 1}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="customerSegmentName" label="客群名称" width="200"/>
    <el-table-column prop="customerSegmentCnt" label="数量" width="110">
      <template slot-scope="scope">
        <span>{{scope.row.customerSegmentCnt | millionProcessing}}</span>
      </template>
    </el-table-column>
    <el-table-column label="选择" min-width="200" v-if="type === 'original'">
      <template slot-scope="scope">
        <template v-if="scope.row.select">
          <el-button class="ml10" size="mini" type="success">已选</el-button>
          <el-button class="ml10" size="mini" type="danger" @click="selectClick(scope.$index, false)">取消</el-button>
        </template>
        <template v-else>
          <el-button class="ml10" size="mini" type="primary" @click="selectClick(scope.$index, true)">选择</el-button>
        </template>
      </template>
    </el-table-column>
    <el-table-column label="支持通知类型" min-width="100" v-if="type === 'send'">
      <template slot-scope="scope">
        <el-checkbox-group v-model="scope.row.checkedList" class="inlineBlock" :disabled="info.pageType === 'detail'">
          <el-checkbox :label="item.type" v-for="item in scope.row.list" :key="item.name" @change="checkedChange">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    info () {
      return this.$store.getters.sceneMarketInfo
    },
    customerList () {
      let data = []
      if (this.type === 'original') { // original 客群选择原始数据
        data = this.$store.getters.sceneMarketCustomerList
      } else if (this.type === 'essential' || this.type === 'send') {
        data = this.$store.getters.sceneMarketInfo.customerSegmentInfoList
      }
      return data
    }
  },
  methods: {
    selectClick (index, status) {
      this.$set(this.customerList[index], 'select', status)
    },
    checkedChange () {
      let typeList = []
      this.info.customerSegmentInfoList.forEach(i => {
        i.checkedList.forEach(v => {
          i.list.forEach(m => {
            if (v === m.type) typeList.push(m.type)
          })
        })
      })
      this.info.checkedList = [...new Set(typeList)]
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialogTableEssential{
    width: 360px;
  }
  .dialogTableSend{
    width: 930px;
  }
</style>
