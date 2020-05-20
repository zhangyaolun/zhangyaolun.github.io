<template>
  <el-card class="gift-query-form">
    <el-form :model="info" label-width="120px" ref="giftQueryForm">
      <el-form-item label="特惠券包名称：" prop="name">
        <el-input v-model="info.name" placeholder="请输入特惠券包名称" />
      </el-form-item>
      <el-form-item label="特惠券包ID：" prop="id">
        <el-input v-model="info.id" placeholder="请输入特惠券包ID" />
      </el-form-item>
      <el-form-item label="是否在售：" prop="saleFlag">
        <el-select v-model="info.saleFlag" placeholder="全部">
          <el-option
            v-for="item in saleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动开始：" prop="showTime">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="开始日期"
            v-model="info.showTime"
            value-format="timestamp"
            @change="changeStartTime"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="结束时间"
            type="datetime"
            v-model="info.finishTime"
            value-format="timestamp"
            @change="changeEndTime"
          />
        </el-col>
      </el-form-item>
       <el-form-item label="支付时间：" prop="orderTime">
          <el-date-picker
            placeholder="支付时间"
            type="datetime"
            v-model="info.orderTime"
            value-format="timestamp"
          />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('giftQueryForm')">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
     saleOptions: [
      {
        value: "sale",
        label: "在售"
      },
      {
        value: "close",
        label: "下架"
      },
      {
        value: "stop",
        label: "暂停"
      },
      {
        value: "all",
        label: "全部"
      }
    ],
    salePlatform: [
      {
        value: "mini",
        label: "小程序"
      },
      {
        value: "close",
        label: "app"
      },
      {
        value: "all",
        label: "全部"
      }
    ]
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.finishTime) {
        if (value > this.info.finishTime) {
          this.info.showTime = ''
          this.$message.error('开始时间要小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.showTime) {
        if (value < this.info.showTime) {
          this.info.finishTime = ''
          this.$message.error('结束时间要大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.finishTime = ''
      this.$emit('reset')
    },
    query () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .gift-query-form {
    margin: 20px;
    .el-form{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      .el-form-item {
        flex-basis: 33%;
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
        &:nth-child(4) {
          flex-basis: 66%;
          .line {
            text-align: center;
          }
          .el-input{
            width: 100%;
          }
        }

      }

    }
  }
</style>
