<template>

  <el-collapse accordion @change="handleChange" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">优惠券检索 <span class="placeholder">(点击{{collapseTitle}})</span></template>
      <el-card class="box-card coupon-query">
        <el-form :model="info" label-width="120px" ref="CouponListQueryForm">
          <el-form-item label="优惠券ID：" prop="id">
            <el-input
              v-model="info.id"
              placeholder="请输入优惠券ID"
            />
          </el-form-item>
          <el-form-item label="企业编号：" prop="projectNo">
            <el-input
              v-model="info.projectNo"
              placeholder="请输入企业编号"
            />
          </el-form-item>
          <el-form-item label="优惠券名称：" prop="name">
            <el-input
              v-model="info.name"
              placeholder="请输入优惠券名称"
            />
          </el-form-item>
          <el-form-item label="优惠券状态：" prop="status">
            <el-select v-model="info.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券类型：" prop="discount_type">
            <el-select v-model="info.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in discountTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="促销区分：" prop="subsidyFlg">
            <el-select v-model="info.subsidyFlg" placeholder="请选择" clearable>
              <el-option
                v-for="item in subsidyFlgOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发送类型：" prop="subsidyFlg">
            <el-checkbox-group v-model="info.sendType">
              <el-checkbox
                v-for="item in sendTypeOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value" >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="使用期限：" prop="from_time">
            <el-col :span="11">
              <el-date-picker v-model="info.useDateFromStr" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间" @change="changeStartTime" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.useDateToStr" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束时间" @change="changeEndTime" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('CouponListQueryForm')">重置</el-button>
            <el-button type="primary" @click="queryList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-collapse-item>
  </el-collapse>

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
      activeNames: [],
      collapseTitle: '展开',
      sendTypeOptions: [
        { label: '集点活动', value: '2' },
        { label: '活动派发', value: '3' },
        { label: '积分兑换', value: '4' },
        { label: '注册', value: '6' },
        { label: '购买', value: '7' },
        { label: '外部', value: '8' }
      ],
      statusOptions: [
        { label: '全部', value: '' },
        { label: '未公开', value: 'CREATED' },
        { label: '已公开', value: 'PUBLISHED' }
      ],
      subsidyFlgOptions: [
        { label: '全部', value: '' },
        { label: '促销让利(原卖变)', value: 0 },
        { label: '会员代金券', value: 1 }
      ],
      discountTypeOptions: [
        { label: '全部', value: '' },
        { label: '商品券', value: 0 },
        { label: '免费券', value: 1 },
        { label: '满减券', value: 2 },
        { label: '立减券', value: 3 }
      ]
    }
  },
  created () {
    let _seachData = this.$store.getters.couponSeachData
    if (_seachData) {
      let _falg = false
      Object.keys(_seachData).forEach(key => {
        if (key !== 'page' && key !== 'pageSize' && key !== 'discount_type' && key !== 'from_time') {
          _falg = true
        }
      })
      _falg ? this.activeNames = ['1'] : this.activeNames = []
    } else {
      this.activeNames = []
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.useDateToStr) {
        if (value > this.info.useDateToStr) {
          this.info.useDateFromStr = ''
          this.$message.error('开始时间要小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.useDateFromStr) {
        if (value < this.info.useDateFromStr) {
          this.info.useDateToStr = ''
          this.$message.error('结束时间要大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.id = ''
      this.info.projectNo = ''
      this.info.sendType = []
      this.info.sendTypeStr = ''
      this.info.name = ''
      this.info.status = ''
      this.info.type = ''
      this.info.subsidyFlg = ''
      this.info.useDateFromStr = ''
      this.info.useDateToStr = ''
      this.$emit('reset')
    },
    queryList () {
      if (this.info.useDateFromStr && !this.info.useDateToStr) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.useDateFromStr && this.info.useDateToStr) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
    },
    handleChange (val) {
      val ? this.collapseTitle = '收起' : this.collapseTitle = '展开'
    }
  }
}
</script>

<style lang="scss" scoped>

.placeholder{
  margin-left: 10px;
  display: block;
  color: #909399;
  font-size: 12px;
}
.coupon-query{
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 33%;
      /*&:nth-child(5){*/
      /*  flex-basis: 50%;*/
      /*}*/
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      &:nth-last-child(3){
        flex-basis: 100%;
      }
      &:nth-last-child(2){
        flex-basis: 66%;
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100%;
        }
        .line{
          text-align: center;
        }
      }
      &:last-child{
        flex-basis: 100%;
      }
    }
  }
}
</style>
