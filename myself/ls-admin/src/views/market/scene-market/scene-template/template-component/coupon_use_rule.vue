<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">权益礼包</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">

      <el-form-item label="发放条件：" prop="rewardRuleInfo.distributeType" class="distributeType" v-if="info.baseInfo.planWayType === 'AUTO_LONG_TIME_PLAN'">
        <el-radio-group v-model="info.rewardRuleInfo.distributeType" :disabled="info.pageType !== 'create'" @change="distributeTypeChange">
          <el-radio :label="'LIMIT_COMMODITY'" class="block">限定商品
            <section class="inlineBlock distributeTypeShop" v-if="info.rewardRuleInfo.distributeType === 'LIMIT_COMMODITY'">
              <section v-if="info.csvList[0].name === ''" class="inlineBlock">
                <el-upload ref="uploadcommodity" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :http-request="requestFileSvgCommod" :action="actionSvg">
                  <el-button type="primary" class="mr" size="mini">上传商品</el-button>
                </el-upload>
                <a class="inlineBlock" href="./file/couponCommodityInfoTemplate.csv" download="commodityInfoTemplate.csv">
                  <el-button type="info" class="ml20" size="mini">文件模板下载</el-button>
                </a>
              </section>
              <section v-if="info.csvList[0].name !== ''" class="inlineBlock">
                <span class="mr">{{info.csvList[0].name}}</span>
                <el-button type="primary" class="mr" size="mini ml20" @click="csvClick">预览</el-button>
                <el-button type="danger" class="mr15" size="mini" @click="shopCsvDel" :disabled="info.pageType !== 'create'">删除</el-button>
              </section>
              <div class="inlineBlock ml40">
                <span>满足数量 ≥</span>
                <el-input class="ml10" v-model="info.rewardRuleInfo.limitCommodityCount" @input="provingNum('limitCommodityCount', $event)" placeholder="请输入数量" :disabled="info.pageType !== 'create'"/>
              </div>
            </section>
          </el-radio>
          <el-radio :label="'LIMIT_AMOUNT'" class="block" :class="[info.rewardRuleInfo.distributeType === 'LIMIT_COMMODITY'?'mt50b20':'mtb50']">限定金额/复购
            <section class="inlineBlock distributeTypeShop" v-if="info.rewardRuleInfo.distributeType === 'LIMIT_AMOUNT'">
              <el-select v-model="info.rewardRuleInfo.limitAmountDays" :disabled="info.pageType !== 'create'">
                <el-option
                  v-for="item in limitAmountDaysOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="info.rewardRuleInfo.limitAmountType" @change="limitAmountTypeChange" :disabled="info.pageType !== 'create'">
                <el-option
                  v-for="item in limitAmountTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="inlineBlock">
                <span>≥</span>
                <el-input class="ml20" v-if="info.rewardRuleInfo.limitAmountType !== 'CONSUME_COUNT'" v-model="info.rewardRuleInfo.limitPurchaseAmount" @input="checkNumber('limitPurchaseAmount', $event)" placeholder="请输入" :disabled="info.pageType !== 'create'"/>
                <el-input class="ml20" v-if="info.rewardRuleInfo.limitAmountType === 'CONSUME_COUNT'" v-model="info.rewardRuleInfo.limitRepeatPurchaseCount" @input="checkNumber('limitRepeatPurchaseCount', $event)" placeholder="请输入" :disabled="info.pageType !== 'create'"/>
              </div>
              <br/>
              <el-checkbox-group v-model="info.rewardRuleInfo.releatedActivityFlg" class="inlineBlock mt10" :disabled="info.pageType !== 'create'">
                <el-checkbox label="关联活动"></el-checkbox>
              </el-checkbox-group>
              <section v-if="info.rewardRuleInfo.releatedActivityFlg" class="inlineBlock">
                <el-input class="ml20" @input="provingNum('releatedActivityCouponId', $event)" v-model="info.rewardRuleInfo.releatedActivityCouponId" :disabled="info.pageType !== 'create'"/>
                <span class="placeholder inlineBlock ml10">关联后仅计算含优惠券的交易</span>
              </section>
            </section>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="奖励设置：" prop="couponFalg" class="couponFalg">
        <el-checkbox-group v-model="info.couponFalg" class="inlineBlock" :disabled="info.pageType !== 'create'">
          <el-checkbox label="发放优惠券" ></el-checkbox>
        </el-checkbox-group>
        <el-table :data="info.rewardCouponInfoList" v-if="info.couponFalg">
          <el-table-column label="优惠券ID" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/couponId'" :rules='rules.couponId'>
                <el-input v-model="scope.row.couponId" size="mini" placeholder="请输入优惠券ID" @blur="handlerCouponId(scope.$index)"  @input="tableProvingNum('couponId', scope.$index)" :disabled="scope.row.couponName !== ''"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="赠送礼券名称" width="300">
            <template slot-scope="scope">
              <el-form-item>
                <span>{{scope.row.couponName}}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/inventoryQty'" :rules='rules.inventoryQty'>
                <el-input v-model="scope.row.inventoryQty" size="mini" placeholder="请输入数量" @input="tableProvingNum('inventoryQty', scope.$index)" :disabled="info.pageType !== 'create'"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope" v-if="info.pageType === 'create'">
              <el-form-item>
                <el-button size="mini" type="primary" v-if="scope.$index === 0" @click="couponAdd(scope.$index)">添加</el-button>
                <el-button size="mini" type="danger" v-if="scope.row.couponName !== '' || scope.$index > 0" @click="couponDel(scope.$index)">删除</el-button>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="每人派发数量：" prop="baseInfo.individualDistributeQty">
        <el-input class="name-input" v-model="info.baseInfo.individualDistributeQty" placeholder="请输入每人派发数量" :disabled="info.pageType !== 'create'" @input="provingNum('individualDistributeQty')"/>
        <span class="placeholder inlineBlock ml10">张</span>
        <span class="placeholder block">您选择的优惠券总数{{couponTotal}}张，所选用户共计{{customerTotal}}人，优惠券发完后活动即终止。</span>
      </el-form-item>
      <el-form-item label="每人参与轮次：" prop="baseInfo.distributeRotation" v-if="info.pageMold === 'secne'">
        <el-input class="name-input" v-model="info.baseInfo.distributeRotation" placeholder="请输入每人参与轮次" :disabled="info.pageType !== 'create'" @input="provingNum('distributeRotation')"/>
        <span class="placeholder inlineBlock ml10">次</span>
        <span class="placeholder block">指活动期间，若用户多次达成约定条件，最高奖励次数</span>
      </el-form-item>
    </el-form>

    <csv-list :visible.sync="inclusionListsFormVisible" :couponcsvtype="couponCsvType" :couponlist="csvlist" @cancle="inclusionListsFormVisible=false" @comfirm="inclusionListsFormVisible=false" />

  </el-card>
</template>

<script>
import csvList from './adminCouponList/index'
import { millionProcessing } from '@/filters'
export default {
  components: {
    csvList
  },
  computed: {
    info () {
      return this.$store.getters.sceneMarketInfo
    },
    couponTotal () {
      let num = 0
      this.info.rewardCouponInfoList.forEach(v => {
        v.inventoryQty ? num += parseInt(v.inventoryQty) : ''
      })
      return millionProcessing(num)
    },
    customerTotal () {
      let num = 0
      this.info.customerSegmentInfoList.forEach(v => {
        v.customerSegmentCnt ? num += parseInt(v.customerSegmentCnt) : ''
      })
      return millionProcessing(num)
    }
  },
  data () {
    let validateDistributeType = (rule, value, callback) => {
      if (this.info.rewardRuleInfo.distributeType === 'LIMIT_COMMODITY') {
        !this.info.csvList[0].name || this.info.rewardRuleInfo.limitCommodityCount === '' ? callback(new Error('请上传商品或者输入满足数量')) : callback()
      } else if (this.info.rewardRuleInfo.distributeType === 'LIMIT_AMOUNT') {
        if (this.info.rewardRuleInfo.limitAmountType === 'CONSUME_COUNT') {
          !this.info.rewardRuleInfo.limitAmountDays || this.info.rewardRuleInfo.limitRepeatPurchaseCount === '' ? callback(new Error('请正确选择或填写限定金额/复购信息')) : ''
        } else {
          !this.info.rewardRuleInfo.limitAmountDays || !this.info.rewardRuleInfo.distributeType || this.info.rewardRuleInfo.limitPurchaseAmount === '' ? callback(new Error('请正确选择或填写限定金额/复购信息')) : ''
        }
        this.info.rewardRuleInfo.releatedActivityFlg && !this.info.rewardRuleInfo.releatedActivityCouponId ? callback(new Error('请正确填写关联活动信息')) : callback()
      } else {
        callback()
      }
    }
    let validateCouponId = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.rewardCouponInfoList[index].couponId === '') {
        callback(new Error('请输入优惠券ID'))
      } else {
        if (this.info.rewardCouponInfoList[index].couponId && this.info.rewardCouponInfoList[index].couponName === '') {
          callback(new Error(this.couponErrorTitle))
        } else {
          callback()
        }
      }
    }
    let validateInventoryQty = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.rewardCouponInfoList[index].inventoryQty === '') {
        callback(new Error('请输入数量'))
      } else {
        callback()
      }
    }
    let validateCouponFalg = (rule, value, callback) => {
      if (!this.info.couponFalg) {
        callback(new Error('请选择奖励设置'))
      } else {
        callback()
      }
    }
    return {
      couponCsvType: 'COMMODITY',
      inclusionListsFormVisible: false,
      csvlist: [],
      couponErrorTitle: '优惠券信息不存在',
      actionSvg: `${process.env.VUE_APP_LAWSONADMIN_API_BASE_URL}/admin/new/admin/file/upLoadCsv`,
      limitAmountDaysOptions: [
        { label: '请选择', value: '' },
        { label: '1天', value: '1' },
        { label: '3天', value: '3' },
        { label: '7天', value: '7' },
        { label: '30天', value: '30' },
        { label: '90天', value: '90' }
      ],
      limitAmountTypeOptions: [
        { label: '请选择', value: '' },
        { label: '累计消费金额', value: 'CUMULATIVE_CONSUME_AMOUNT' },
        { label: '客单价', value: 'CUSTOMER_UNIT_PRICE' },
        { label: '最高消费金额', value: 'MAX_CONSUME_AMOUNT' },
        { label: '消费频次', value: 'CONSUME_COUNT' }
      ],
      rules: {
        'rewardRuleInfo.distributeType': [{ required: true, validator: validateDistributeType, trigger: 'blur' }],
        'couponFalg': [{ required: true, validator: validateCouponFalg, trigger: 'change' }],
        'couponId': [{ required: true, validator: validateCouponId, trigger: 'blur' }],
        'inventoryQty': [{ required: true, validator: validateInventoryQty, trigger: 'blur' }],
        'baseInfo.individualDistributeQty': [{ required: true, message: '请输入每人派发数量', trigger: 'blur' }],
        'baseInfo.distributeRotation': [{ required: true, message: '请输入每人参与轮次', trigger: 'blur' }]
      }
    }
  },
  methods: {
    tableProvingNum (name, index) {
      let _val = this.info.rewardCouponInfoList[index][name].toString().replace(/[\D]/gi, '')
      this.$set(this.info.rewardCouponInfoList[index], name, _val !== '' ? parseInt(_val) : '')
    },
    provingNum (name, $event) {
      if (name === 'individualDistributeQty') {
        let _val = this.info.baseInfo[name].replace(/[\D]/gi, '')
        this.$set(this.info.baseInfo, name, _val !== '' ? parseInt(_val) : '')
      } else if (name === 'distributeRotation') {
        let _val = this.info.baseInfo[name].replace(/[^1-9]/gi, '')
        this.$set(this.info.baseInfo, name, _val !== '' ? parseInt(_val) : '')
      } else {
        let _val = this.info.rewardRuleInfo[name].replace(/[\D]/gi, '')
        this.$set(this.info.rewardRuleInfo, name, _val !== '' ? parseInt(_val) : '')
      }
    },
    checkNumber (name, $event) {
      if ($event) {
        if (this.info.rewardRuleInfo.limitAmountType === 'CONSUME_COUNT') {
          this.provingNum(name)
        } else {
          // if ($event > 999999.99) {
          //   this.info[name] = 999999.99
          // } else {
          //
          // }
          this.info.rewardRuleInfo[name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || ''
        }
      }
    },
    limitAmountTypeChange () {
      this.info.rewardRuleInfo.limitPurchaseAmount = ''
      this.info.rewardRuleInfo.limitRepeatPurchaseCount = ''
    },
    distributeTypeChange () {
      this.$refs.ruleForm.clearValidate('rewardRuleInfo.distributeType')
    },
    couponAdd () {
      if (this.info.rewardCouponInfoList.some(v => {
        return v.couponName === '' || v.inventoryQty === ''
      })) {
        this.$message.error('请先输入优惠券ID和数量')
        return
      }
      this.info.rewardCouponInfoList.push({ couponId: '', couponName: '', inventoryQty: '' })
    },
    couponDel (index) {
      if (this.info.rewardCouponInfoList.length === 1) {
        this.info.rewardCouponInfoList = [{ couponId: '', couponName: '', inventoryQty: '' }]
      } else {
        this.info.rewardCouponInfoList.splice(index, 1)
      }
    },
    handlerCouponId (index) {
      if (!this.info.rewardCouponInfoList[index].couponId) return
      if (this.info.rewardCouponInfoList.some((v, k) => {
        return +index !== +k && v.couponId === this.info.rewardCouponInfoList[index].couponId
      })) {
        this.$message.error('不可重复添加同一张券')
        this.couponErrorTitle = '不可重复添加同一张券'
        return
      }
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.orderGiftBundle.handlerCouponId(this.info.rewardCouponInfoList[index].couponId).then(res => {
        this.info.rewardCouponInfoList[index].couponName = ''
        if (res.data === undefined) {
          this.$message.error('优惠券信息不存在！')
          this.couponErrorTitle = '优惠券信息不存在！'
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return
        }
        if (res.data.regionBlockCode !== this.$store.getters.regionBlockCode) {
          this.$message.error(`请输入${this.$store.getters.regionBlockCodeName}券ID`)
          this.couponErrorTitle = `请输入${this.$store.getters.regionBlockCodeName}券ID`
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return false
        }
        this.info.rewardCouponInfoList[index].couponName = res.data.couponName
        this.$refs.ruleForm.validateField(index + '/couponId')
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.info.rewardCouponInfoList[index].couponName = ''
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$refs.ruleForm.validateField(index + '/couponId')
        this.$message.error(error.message)
      })
    },
    csvClick () {
      this.csvlist = []
      this.inclusionListsFormVisible = true
      this.csvlist = JSON.parse(JSON.stringify(this.info.csvList[0].list))
    },
    // 上传删除
    shopCsvDel () {
      this.info.csvList = [{ name: '', list: [] }]
      this.info.limitCommodityInfoList = []
    },
    beforeAvatarUploadsvg (file) {
      let type = file.name.toLowerCase()
      let isCSV = /\.(csv)$/.test(type)
      if (!isCSV) {
        this.$message.error('上传文件暂时只支持csv格式')
      }
      return isCSV
    },
    // 商品文件上传
    requestFileSvgCommod (param) {
      let temp = param.file
      temp.mimeType = temp.type
      let f = new FormData()
      f.append('file', temp)
      f.append('fileType', 'COMMODITY')
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.merchantCouponTemplate.upLoadCsv(f).then(res => {
        this.info.csvList[0].name = temp.name
        this.info.csvList[0].list = []
        if (res.data) {
          res.data.forEach(v => {
            this.info.csvList[0].list.push({ commodityCd: v.commodityCd, commodityName: v.commodityName })
            this.info.limitCommodityInfoList.push({ commodityCd: v.commodityCd, commodityName: v.commodityName })
          })
        }
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.info.limitCommodityInfoList = []
        this.$message.error(error.message)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    .colorRouterLink{color: rgb(19,148,236) !important}
    margin: 20px;
    .mt10{margin-top: 20px !important;}
    .ml10{margin-left: 10px !important;}
    .ml20{margin-left: 20px !important;}
    .ml40{margin-left: 40px !important;}
    .mtb50{margin: 50px 0}
    .mt50b20{margin: 50px 0 10px 0}
    .placeholder{
      display: block;
      color: #909399;
      font-size: 13px;
    }
    .el-input{
      width: 200px;
    }
    .distributeType{
      .el-radio{
        position: relative;
      }
      .el-radio:nth-child(1){
        margin-top: 10px
      }
      .distributeTypeShop{
        position: absolute;
        top: -10px;
        left: 150px;
        span{
          color: #909399;
        }
        .el-select{
          width: 140px;
          margin-right: 20px;
        }
        .el-input{
          width: 140px;
        }
      }
    }
    .couponFalg{
      .el-table {
        width: 760px;
        .el-input{
          width: 100%;
        }
      }
    }
  }
</style>
