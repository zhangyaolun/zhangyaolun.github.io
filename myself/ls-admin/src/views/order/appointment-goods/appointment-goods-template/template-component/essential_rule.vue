<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">主档信息</div>
    <el-form ref="ruleForm" :model="info" label-width="180px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称：" prop="commodityNameDisplay">
            <el-input v-model="info.commodityNameDisplay" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货号：" prop="commodityCd">
            <el-input class="name-input" v-model="info.commodityCd" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="到货周期：" prop="takeDelay">
            <el-input class="name-input" v-model="info.takeDelayDisplay" disabled />
            <span class="placeholder inlineBlock">天，预约间隔天数 = 到货周期 + 1天</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基本售价：" prop="sellPriceDisplay">
            <el-input class="name-input" v-model="info.sellPriceDisplay" disabled/>
            <span class="placeholder inlineBlock">元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始销售日：" prop="orderBegin">
            <el-date-picker class="name-input" v-model="info.orderBegin" format="yyyy-MM-dd" value-format="timestamp" type="datetime" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止订货日：" prop="orderEnd">
            <el-date-picker class="name-input" v-model="info.orderEnd" format="yyyy-MM-dd" value-format="timestamp" type="datetime" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="到货开始日期：" prop="arriveBegin">
            <el-date-picker class="name-input" v-model="info.arriveBegin" format="yyyy-MM-dd" value-format="timestamp" type="datetime" disabled/>
            <span class="placeholder inlineBlock">即最早提货日期</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到货结束日期：" prop="arriveEnd">
            <el-date-picker class="name-input" v-model="info.arriveEnd" format="yyyy-MM-dd" value-format="timestamp" type="datetime" disabled/>
            <span class="placeholder inlineBlock">即最晚提货日期</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="可售状态：" prop="saleFlgDisplay">
            <el-input class="name-input" v-model="info.saleFlgDisplay" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.appointmentGoodsInfo
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .el-input{
      display: inline-block;
      width: 300px !important;
    }
    .max-nums-input, .name-input{
      width: 150px !important;
      margin-right: 10px;
    }
    .placeholder{
      display: block;
      color: #909399;
      font-size: 13px;
    }
  }
</style>
