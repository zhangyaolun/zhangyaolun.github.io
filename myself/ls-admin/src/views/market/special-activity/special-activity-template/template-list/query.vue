<template>

  <el-collapse accordion @change="handleChange" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">外部投放活动检索 <span class="placeholder">(点击{{collapseTitle}})</span></template>
      <el-card class="box-card coupon-query">
        <el-form :model="info" label-width="120px" ref="CouponListQueryForm">
          <el-form-item label="活动ID：" prop="id">
            <el-input
              v-model="info.id"
              placeholder="请输入活动ID"
            />
          </el-form-item>
          <el-form-item label="活动类型：" prop="activityUnicom">
            <el-radio-group v-model="info.activityUnicom">
              <el-radio
                v-for="item in activityUnicomOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="赠送范围：" prop="activityType">
            <el-radio-group v-model="info.activityType">
              <el-radio
                v-for="item in activityTypeOptions"
                :key="item.value"
                :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="礼券赠送：" prop="couponSendType">
            <el-radio-group v-model="info.couponSendType">
              <el-radio
                v-for="item in couponSendTypeOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员范围：" prop="userType">
            <el-radio-group v-model="info.userType">
              <el-radio
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="屏蔽常规活动：" prop="prohibitFlg">
            <el-radio-group v-model="info.prohibitFlg">
              <el-radio
                v-for="item in prohibitFlgOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公开状态：" prop="publishFlg">
            <el-radio-group v-model="info.publishFlg">
              <el-radio
                v-for="item in publishFlgOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动日期：" prop="from_time">
            <el-col :span="11">
              <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime" />
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
      activityUnicomOptions: [
        { label: '外部投放', value: 0 },
        { label: '联通', value: 1 },
        { label: '合作对接', value: 2 },
        { label: '内部活动', value: 3 },
        { label: '全部', value: 4 }
      ],
      activityTypeOptions: [
        { label: '全赠送', value: 0 },
        { label: '只送礼券', value: 1 },
        { label: '只送积分', value: 2 },
        { label: '全部', value: 3 }
      ],
      couponSendTypeOptions: [
        { label: '全发送', value: 0 },
        { label: '随机一种', value: 1 },
        { label: '全部', value: 2 }
      ],
      userTypeOptions: [
        { label: '全会员', value: 0 },
        { label: '新会员', value: 1 },
        { label: '老会员', value: 2 },
        { label: '全部', value: 3 }
      ],
      prohibitFlgOptions: [
        { label: '不屏蔽', value: 0 },
        { label: '屏蔽所有', value: 1 },
        { label: '全部', value: 4 }
      ],
      publishFlgOptions: [
        { label: '公开', value: 0 },
        { label: '不公开', value: 1 },
        { label: '全部', value: 2 }
      ]
    }
  },
  created () {
    let _seachData = this.$store.getters.specialActivityTemplateQueryData
    if (_seachData) {
      let _falg = false
      Object.keys(_seachData).forEach(key => {
        if (key !== 'page' && key !== 'pageSize') {
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
      if (this.info.endTime) {
        if (value > this.info.endTime) {
          this.info.beginTime = ''
          this.$message.error('开始时间要小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.beginTime) {
        if (value < this.info.beginTime) {
          this.info.endTime = ''
          this.$message.error('结束时间要大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.beginTime = ''
      this.info.endTime = ''
      this.$emit('reset')
    },
    queryList () {
      if (this.info.beginTime && !this.info.endTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.beginTime && this.info.endTime) {
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
      flex-basis: 100%;
      margin-bottom: 10px;
      &:nth-child(1){
        flex-basis: 35%;
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
