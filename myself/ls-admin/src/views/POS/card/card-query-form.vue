<template>
  <el-card class="card-query-form-wrap">
    <el-form :model="info" label-width="120px" ref="cardQueryForm">
      <el-form-item label="会员手机号：">
        <el-input v-model="info.mobile" />
      </el-form-item>
      <el-form-item label="会员条码：">
        <el-input v-model="info.barcode" />
      </el-form-item>
      <el-form-item label="门店编号：">
        <el-input v-model="info.shopNo" />
      </el-form-item>
      <el-form-item label="pos机号：">
        <el-input v-model="info.posNo" />
      </el-form-item>
      <el-form-item label="交易流水号：">
        <el-input v-model="info.businessNo" />
      </el-form-item>
      <el-form-item label="交易时间：">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="开始日期"
            v-model="info.payTimeStart"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="结束时间"
            type="datetime"
            v-model="info.payTimeEnd"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('cardQueryForm')">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      info: {
        mobile: '',
        barcode: '',
        shopNo: '',
        posNo: '',
        businessNo: '',
        payTimeStart: '',
        payTimeEnd: ''
      }
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    query () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss">
.card-query-form-wrap {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item {
      flex-basis: 33.3%;
      &:last-child, &:nth-child(6) {
        .el-form-item__content {
          width: 50%;
        }
        flex-basis: 100%;
      }
    }

  }
}
</style>
