<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="计划名称：" prop="baseInfo.name">
        <el-input class="name-input" v-model="info.baseInfo.name" maxlength="30" placeholder="请输入名称" :disabled="info.pageType !== 'create'" @input="inputSapceTrim"/>
      </el-form-item>

      <el-form-item id="customer" label="指定对象：" prop="baseInfo.customer">
        <div v-if="info.pageType === 'create'" class="customer">
          <span class="colorRouterLink pointer" @click="dialogVisible = true">选择客群</span>
          <router-link to="/backend/groupSetting/templatelist" class="colorRouterLink">上传自定义人群</router-link>
        </div>
        <span class="placeholder">人数大于10万，分批次执行</span>
        <customer-table :type="'essential'" v-if="info.customerSegmentInfoList.length > 0"></customer-table>
      </el-form-item>

      <el-form-item label="计划方式：" prop="baseInfo.planWayType" v-if="info.pageMold === 'secne'">
        <el-radio-group v-model="info.baseInfo.planWayType" :disabled="info.pageType !== 'create'" @change="planWayTypeChange">
          <el-radio :label="'AUTO_LONG_TIME_PLAN'">自动长期计划</el-radio>
          <el-radio :label="'MANUAL_TIMING_PLAN'">手动定时计划
            <el-tooltip placement="top" effect="light" class="ml40">
              <div slot="content">
                自动——在活动时间内满足条件即发放<br/>手动——在指定时间内无条件发放
              </div>
              <span class="Monitor_info">?</span>
            </el-tooltip>
          </el-radio>
        </el-radio-group>
        <section v-show="info.baseInfo.planWayType === 'AUTO_LONG_TIME_PLAN'" class="planWayTypeTime">
          <div class="left mr10">开始日期:</div>
          <el-col class="useDate">
            <el-date-picker v-model="info.baseInfo.startTime" format="yyyy-MM-dd HH:mm" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime" :disabled="info.pageType !== 'create'"/>
          </el-col>
          <el-col class="line useDateLine mlr10">至</el-col>
          <el-col class="useDate">
            <el-date-picker v-model="info.baseInfo.endTime" format="yyyy-MM-dd HH:mm" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime" :disabled="info.pageType !== 'create'"/>
          </el-col>
        </section>
        <section v-show="info.baseInfo.planWayType === 'MANUAL_TIMING_PLAN'" class="planWayTypeTime">
          <div class="left mr10 mt8">执行时间:</div>
          <el-radio-group v-model="info.baseInfo.distributeRewardType" :disabled="info.pageType !== 'create'" class="left" @change="planWayTypeChange">
            <el-radio :label="'IMMEDIATE_EXECUTION'" class="block mtb20">立即执行</el-radio>
            <el-radio :label="'TIMING_EXECUTION'" class="block mtb20">定时执行
              <el-col class="timing" v-if="info.baseInfo.distributeRewardType === 'TIMING_EXECUTION'">
                <el-date-picker v-model="info.baseInfo.distributeRewardTime" format="yyyy-MM-dd HH:mm" value-format="timestamp" type="datetime" placeholder="选择时间" :disabled="info.pageType !== 'create'"/>
              </el-col>
            </el-radio>
          </el-radio-group>
        </section>
      </el-form-item>

      <el-form-item label="活动时间：" prop="baseInfo.repeatType" v-if="info.pageMold === 'timing'">
        <el-radio-group class="repeatType" v-model="info.baseInfo.repeatType" :disabled="info.pageType !== 'create'" @change="repeatTypeChange">

          <el-radio :label="'MONTHLY'" class="block">每月
            <section class="inlineBlock ml40" v-if="info.baseInfo.repeatType === 'MONTHLY'">
              <el-select v-model="info.baseInfo.monthlyStartDay" :disabled="info.pageType !== 'create'" @change="monthlyStartDay">
                <el-option
                  v-for="item in 31"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <span class="ml10">日</span>
              <span class="ml10 mr10">至</span>
              <el-select v-model="info.baseInfo.monthlyEndDay" :disabled="info.pageType !== 'create'" @change="monthlyEndDay">
                <el-option
                  v-for="item in 31"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <span class="ml10 errorColor">日</span>
            </section>
          </el-radio>
          <el-radio :label="'WEEKLY'" class="block">每周
            <el-checkbox-group v-model="info.baseInfo.weeklyDay" class="inlineBlock ml40" v-if="info.baseInfo.repeatType === 'WEEKLY'" :disabled="info.pageType !== 'create'">
              <el-checkbox :label="item" v-for="item in weekList" :key="item"></el-checkbox>
            </el-checkbox-group>
          </el-radio>
          <el-radio :label="'DAILY'" class="block">每天
            <section class="inlineBlock ml40 activityDayTime" v-if="info.baseInfo.repeatType === 'DAILY'">
              <el-time-picker
                :disabled="info.pageType !== 'create'"
                v-model="info.baseInfo.dailyStartDay"
                class="date-box"
                format='HH:mm'
                value-format="timestamp"
                placeholder="开始时间"
                :picker-options="{
                  selectableRange:`00:00:00 -${info.baseInfo.dailyEndDay ? info.baseInfo.dailyEndDay+':00' : '23:59:00'}`
              }">
              </el-time-picker>
              <span class="mlr10">至</span>
              <el-time-picker
                :disabled="info.pageType !== 'create'"
                v-model="info.baseInfo.dailyEndDay"
                format='HH:mm'
                value-format="timestamp"
                placeholder="结束时间"
                :picker-options="{
                  selectableRange:`${info.baseInfo.dailyStartDay ? info.baseInfo.dailyStartDay+':00' : '00:00:00'}-23:59:00`
              }">
              </el-time-picker>
            </section>
          </el-radio>

        </el-radio-group>
      </el-form-item>

      <essential-dialog :visible.sync="dialogVisible" @comfirm="selectCustomer" @cancle="cancleCustomer"/>
    </el-form>
  </el-card>
</template>

<script>
import essentialDialog from './essential-dialog'
import customerTable from './customer-table'

export default {
  components: {
    essentialDialog,
    customerTable
  },
  computed: {
    info () {
      return this.$store.getters.sceneMarketInfo
    },
    customerList () {
      return this.$store.getters.sceneMarketCustomerList
    }
  },
  data () {
    let validateCustomer = (rule, value, callback) => {
      if (this.info.customerSegmentInfoList.length === 0) {
        callback(new Error('请选择客群'))
      } else {
        callback()
      }
    }
    let validatePlanWayType = (rule, value, callback) => {
      if (this.info.baseInfo.planWayType === 'AUTO_LONG_TIME_PLAN') {
        !this.info.baseInfo.startTime || !this.info.baseInfo.endTime ? callback(new Error('请选择时间')) : callback()
      } else if (this.info.baseInfo.planWayType === 'MANUAL_TIMING_PLAN' && this.info.baseInfo.distributeRewardType === 'TIMING_EXECUTION') {
        !this.info.baseInfo.distributeRewardTime ? callback(new Error('请选择时间')) : callback()
      } else {
        callback()
      }
    }
    let validateRepeatType = (rule, value, callback) => {
      if (this.info.baseInfo.repeatType === 'MONTHLY') {
        !this.info.baseInfo.monthlyStartDay || !this.info.baseInfo.monthlyEndDay ? callback(new Error('请选择活动时间')) : callback()
      } else if (this.info.baseInfo.repeatType === 'WEEKLY') {
        this.info.baseInfo.weeklyDay.length === 0 ? callback(new Error('请选择活动时间')) : callback()
      } else if (this.info.baseInfo.repeatType === 'DAILY') {
        !this.info.baseInfo.dailyStartDay || !this.info.baseInfo.dailyEndDay ? callback(new Error('请选择活动时间')) : callback()
      } else {
        callback()
      }
    }
    return {
      weekList: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
      dialogVisible: false,
      rules: {
        'baseInfo.name': [{ required: true, message: '请输入名称', trigger: 'blur' }],
        'baseInfo.customer': [{ required: true, validator: validateCustomer, trigger: 'change' }],
        'baseInfo.planWayType': [{ required: true, validator: validatePlanWayType, trigger: 'blur' }],
        'baseInfo.repeatType': [{ required: true, validator: validateRepeatType, trigger: 'change' }]
      }
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.baseInfo.endTime) {
        if (+value >= this.info.baseInfo.endTime) {
          this.info.baseInfo.startTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.baseInfo.startTime) {
        if (+value <= this.info.baseInfo.startTime) {
          this.info.baseInfo.endTime = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    monthlyStartDay (value) {
      if (this.info.baseInfo.monthlyEndDay) {
        if (value > this.info.baseInfo.monthlyEndDay) {
          this.info.baseInfo.startTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    monthlyEndDay (value) {
      if (this.info.baseInfo.monthlyStartDay) {
        if (value < this.info.baseInfo.monthlyStartDay) {
          this.info.baseInfo.monthlyEndDay = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    inputSapceTrim () {
      this.info.baseInfo.name = this.info.baseInfo.name.replace(/\s+/g, '')
    },
    planWayTypeChange (val) {
      if (val === 'MANUAL_TIMING_PLAN' && this.info.baseInfo.distributeRewardType === 1) {
        this.info.baseInfo.distributeRewardType = 'IMMEDIATE_EXECUTION'
      }
      this.$refs.ruleForm.clearValidate('baseInfo.planWayType')
    },
    repeatTypeChange () {
      this.$refs.ruleForm.clearValidate('baseInfo.repeatType')
    },
    selectCustomer () {
      let attr = this.customerList.filter(v => {
        return v.select
      })
      if (attr.length === 0) {
        this.$set(this.info, 'checkedList', [])
      } else {
        attr.forEach(v => {
          v.checkedList = this.info.checkedList
        })
      }
      this.$set(this.info, 'customerSegmentInfoList', attr)
      this.$refs.ruleForm.validateField('baseInfo.customer')
    },
    cancleCustomer () {
      this.customerList.forEach((v, k) => {
        this.$set(this.customerList[k], 'select', false)
        this.info.customerSegmentInfoList.forEach(m => {
          if (v.customerSegmentId === m.customerSegmentId) this.$set(this.customerList[k], 'select', true)
        })
      })
      this.$refs.ruleForm.clearValidate('customerSegmentInfoList')
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    position: relative;
    .colorRouterLink{color: rgb(19,148,236) !important}
    .customer{
      width: 300px;
      display: flex;
      justify-content: space-between;
    }
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .errorColor{color: #ff4949}
    .ml10{margin-left: 10px !important;}
    .ml40{margin-left: 40px !important;}
    .mr10{margin-right: 10px !important;}
    .mt8{margin-top: 8px !important;}
    .mlr10{margin: 0 10px !important;}
    .mtb20{margin: 20px 0}
    .el-input{
      display: inline-block;
      width: 400px !important;
    }
    .el-form-item__label{
      margin-right: 15px;
    }
    .max-nums-input, .name-input{
      width: 30%;
      margin-right: 10px;
    }
    .placeholder{
      display: block;
      color: #909399;
      font-size: 12px;
    }
    .image-input{
      opacity: 0;
      position: absolute;
      z-index: -99;
    }
    .sendType_radio{
      .el-radio{
        margin-bottom: 20px;
      }
    }
    .el-radio-group{
      vertical-align: inherit;
    }
    .planWayTypeTime{
      display: block;
      width: 100%;
      margin-top: 10px;
      .useDate{
        width: 220px;
        display: inline-block;
        .elSelect{
          display: inline-block;
          width: 50px;
        }
      }
      .el-input{
        display: inline-block;
        width: 100% !important;
      }
      .useDateLine{
        width: 20px;
        display: inline-block;
        text-align: center;
      }
      .el-radio{
         width: 100px;
      }
      .el-radio:nth-child(2){
        position: relative;
      }
      .timing{
        width: 200px;
        position: absolute;
        top: -10px;
        right: -200px;
      }
    }
    .Monitor_info {
      display: inline-block;
      width:18px;
      height:18px;
      line-height:18px;
      font-size:14px;
      color:#fff;
      text-align:center;
      background-color:#BCDBEA;
      border-radius:50%;
    }
    .Monitor_info:hover{
      background-color: rgb(19,148,236)
    }
    .repeatType{
      span{
        color: #909399;
      }
      .el-select{
        width: 120px !important;
      }
      .activityDay{
        width: 400px;
      }
      .el-radio{
        line-height: 36px;
        margin-bottom: 10px;
      }
      .activityDayTime{
        .el-input{
          display: inline-block;
          width: 130px !important;
        }
      }
    }

  }
</style>
