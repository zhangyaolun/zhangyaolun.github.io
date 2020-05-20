<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">核销商家券设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item id="shopFlg" label="适用门店：" prop="couponInfo.shopFlg">
        <section>
          <el-radio-group v-model="info.couponInfo.shopFlg" @change="shopFlgChange" :disabled="info.pageType === 'detail'">
            <el-radio :label="'UNLIMITED'">不限</el-radio>
            <el-radio :label="'SUITED_SHOP'">可用门店</el-radio>
          </el-radio-group>
          <div v-if="info.couponInfo.shopFlg === 'SUITED_SHOP'">
            <span class="mr">通过文件模板导入</span>
            <section class="inlineBlock" v-if="info.csvList[0].falg">
              <el-upload ref="uploadshop" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :http-request="requestFileSvg" :action="actionSvg">
                <el-button type="primary" class="mr" size="mini">添加文件</el-button>
              </el-upload>
              <a class="inlineBlock" href="javascript:void(0)" @click="fetchTemplate('shop')" download="couponShopTemplate.csv">
                <el-button type="info" class="mr" size="mini">文件模板下载</el-button>
              </a>
            </section>
            <section v-else class="inlineBlock">
              <span class="mr">{{info.csvList[0].name}}</span>
              <el-button type="primary" class="mr inlineBlock" size="mini" @click="csvClick(0)">预览</el-button>
              <el-button type="danger" class="mr15" size="mini" @click="shopCsvDel(0,0)" :disabled="info.pageType === 'detail'">删除</el-button>
            </section>
          </div>
        </section>
      </el-form-item>

      <el-form-item id="commodityFlg" label="适用商品：" prop="couponInfo.commodityFlg" v-show="info.couponInfo.stockType !== 'NORMAL'" >
        <section v-for="(items,index) in info.searchShop" :key="index" class="mb">
          <el-input class="expiring-days-input mr" type="text" v-model="items.searchVal" :disabled="items.name !== ''"/><span class="mr">例：044041</span>
          <el-button type="primary" class="mr" size="mini" @click="seachShopData(index)" :disabled="info.pageType === 'detail'">查询</el-button>
          <el-button type="danger" class="mr15" size="mini" @click="delShopData(index)" :disabled="info.pageType === 'detail'">删除</el-button>
          <span class="mr" v-if="items.name">{{items.name}}</span>
          <span class="mr errorColor" v-if="items.nameerror">{{items.nameerror}}</span>
          <span v-if="items.sellPrice">{{items.sellPrice + '元'}}</span>
        </section>
        <section class="mt"><el-button type="primary" size="mini" @click="addShopData" :disabled="info.pageType === 'detail'">添加商品</el-button></section>
      </el-form-item>

      <el-form-item id="commodity" label="适用商品：" prop="commodityFlg" v-show="info.couponInfo.stockType === 'NORMAL'" >
        <el-radio-group v-model="info.couponInfo.commodityFlg" @change="commodityFlgChange" :disabled="info.pageType === 'detail'">
          <el-radio :label="'UNLIMITED'">不限</el-radio>
          <el-radio :label="'SUITED_COMMODITY'">可用商品</el-radio>
          <el-radio :label="'UNSUITED_COMMODITY'">不可用商品</el-radio>
        </el-radio-group>
        <div v-for="(item,index) in info.csvList" :key="index">
          <section v-if="item.type === info.couponInfo.commodityFlg && index > 0">
            <span class="mr">通过文件模板导入</span>
            <section v-if="item.falg" class="inlineBlock">
              <el-upload ref="uploadcommodity" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :http-request="requestFileSvgCommod" :action="actionSvg">
                <el-button type="primary" class="mr" size="mini">添加文件</el-button>
              </el-upload>
              <a class="inlineBlock" href="javascript:void(0)" @click="fetchTemplate()" download="'couponCommodityInfoTemplate.csv'">
                <el-button type="info" class="mr" size="mini">文件模板下载</el-button>
              </a>
            </section>
            <section v-else class="inlineBlock">
              <span class="mr">{{item.name}}</span>
              <el-button type="primary" class="mr" size="mini" @click="csvClick(1, index)">预览</el-button>
              <el-button type="danger" class="mr15" size="mini" @click="shopCsvDel(index,1)" :disabled="info.pageType === 'detail'">删除</el-button>
            </section>
          </section>
        </div>
      </el-form-item>

      <el-form-item label="券使用期限类型：" prop="couponInfo.dynamicPeriodFlg">
        <el-radio-group v-model="info.couponInfo.dynamicPeriodFlg" :disabled="info.pageType === 'detail'">
          <el-radio :label="'FIXED_TERM'">固定期限</el-radio>
          <el-radio :label="'DYNAMIC_TERM'">动态期限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="券显示开始期限：" prop="couponInfo.displayDateFrom" v-show="info.couponInfo.dynamicPeriodFlg === 'FIXED_TERM'">
        <el-col class="useDate">
          <el-date-picker v-model="info.couponInfo.displayDateFrom" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changedisplayTime" :disabled="info.pageType === 'detail'"/>
        </el-col>
      </el-form-item>
      <el-form-item label="券使用时间期限：" prop="couponInfo.availableBeginTime">
        <el-col class="useDate">
          <el-date-picker v-model="info.couponInfo.availableBeginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime"  :disabled="info.pageType === 'detail'"/>
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.couponInfo.availableEndTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime"  :disabled="info.pageType === 'detail'"/>
        </el-col>
      </el-form-item>
      <el-form-item label="券使用期限：" prop="couponInfo.dynamicPeriodDays" v-show="info.couponInfo.dynamicPeriodFlg === 'DYNAMIC_TERM'">
        <span>领取后</span><el-input class="mlr dynamicPeriodDaysInput" v-model="info.couponInfo.dynamicPeriodDays" @input="provingNum('dynamicPeriodDays', $event)" placeholder="请输入天数"  :disabled="info.pageType === 'detail'"/><span>天内可用！</span>
      </el-form-item>

      <el-form-item  label="券使用门槛金额：" prop="couponInfo.fullAmount" v-if="info.couponInfo.stockType === 'NORMAL'">
        <section class="amount">
          满<el-input class="face-value-input" v-model="info.couponInfo.fullAmount" @input="checkNumber('fullAmount', $event)" placeholder="请输入门槛金额"  :disabled="info.pageType === 'detail'"/>元可使用
        </section>
        <span class="placeholder">有效金额在0.00-999999.99范围内，仅支持2位有效小数</span>
      </el-form-item>
      <el-form-item label="优惠金额：" prop="couponInfo.reduceAmount">
        <section class="amount">
          减<span v-if="info.couponInfo.stockType=='EXCHAHGE'">至</span><el-input class="face-value-input" v-model="info.couponInfo.reduceAmount" @input="checkNumber('reduceAmount', $event)" placeholder="请输入金额" :disabled="info.pageType == 'detail'"/>元
        </section>
        <span class="placeholder">有效金额在0.00-999999.99范围内，仅支持2位有效小数</span>
      </el-form-item>

      <el-form-item label="商家券库存：" prop="couponInfo.couponUpperLimit">
        <el-input class="name-input" v-model="info.couponInfo.couponUpperLimit" placeholder="请输入优惠券库存" @input="provingNum('couponUpperLimit', $event)" maxlength="6" :disabled="info.pageType == 'detail'"/>
        <span class="placeholder">输入1~999999之间的数字，如果输入0则代表不限制礼券数量</span>
      </el-form-item>

      <el-form-item label="核销方式：" prop="baseInfo.useMethod">
        <el-radio-group v-model="info.baseInfo.useMethod" :show="info.pageType !== 'detail'">
          <el-radio :label="'MINI_PROGRAMS'">线上小程序核销</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="小程序appid：" prop="baseInfo.couponUseMiniProgramsAppid" class="appid">
        <el-input class="name-input" v-model="info.baseInfo.couponUseMiniProgramsAppid" disabled/>
      </el-form-item>

      <el-form-item label="小程序path：" prop="baseInfo.couponUseMiniProgramsPath" class="appid">
        <el-input class="name-input" v-model="info.baseInfo.couponUseMiniProgramsPath" disabled/>
      </el-form-item>

    </el-form>
    <coupon-list :visible.sync="inclusionListsFormVisible" :couponcsvtype="couponCsvType" :couponlist="couponlist" @cancle="inclusionListsFormVisible=false" @comfirm="inclusionListsFormVisible=false" />
  </el-card>
</template>

<script>
import couponList from './adminCouponList/index'
export default {
  components: {
    couponList
  },
  computed: {
    info () {
      return this.$store.getters.merchantCouponInfo
    },
    commodityFlgIndex () {
      return this.info.couponInfo.commodityFlg === 'SUITED_COMMODITY' ? 1 : 2
    }
  },
  data () {
    let valdisplayDate = (rule, value, callback) => {
      if (this.info.couponInfo.dynamicPeriodFlg === 'FIXED_TERM') {
        if (this.info.couponInfo.displayDateFrom) {
          callback()
        } else {
          callback(new Error('请选择时间'))
        }
      } else {
        callback()
      }
    }
    let validateTime = (rule, value, callback) => {
      if (this.info.couponInfo.availableBeginTime && this.info.couponInfo.availableEndTime) {
        callback()
      } else {
        callback(new Error('请选择时间'))
      }
    }
    let validateDay = (rule, value, callback) => {
      if (this.info.couponInfo.dynamicPeriodFlg === 'DYNAMIC_TERM') {
        if (this.info.couponInfo.dynamicPeriodDays === null || this.info.couponInfo.dynamicPeriodDays === '') {
          callback(new Error('请输入天数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      publicPath: process.env.BASE_URL,
      downNm: 'couponShopTemplate.csv',
      inclusionListsFormVisible: false,
      couponlist: [],
      couponCsvType: '0', // 0门店 1商店
      actionSvg: `${process.env.VUE_APP_LAWSONADMIN_API_BASE_URL}/admin/new/admin/file/upLoadCsv`,
      rules: {
        'couponInfo.shopFlg': [{ required: true }],
        'couponInfo.commodityFlg': [{ required: true }],
        'couponInfo.dynamicPeriodFlg': [{ required: true }],
        'couponInfo.displayDateFrom': [{ required: true, validator: valdisplayDate, trigger: 'blur' }],
        'couponInfo.availableBeginTime': [{ required: true, validator: validateTime, trigger: 'blur' }],
        'couponInfo.dynamicPeriodDays': [{ required: true, validator: validateDay, trigger: 'blur' }],
        'couponInfo.fullAmount': [{ required: true, message: '请输入金额', trigger: 'blur' }],
        'couponInfo.reduceAmount': [{ required: true, message: '请输入金额', trigger: 'blur' }],
        'couponInfo.couponUpperLimit': [{ required: true, message: '请输入优惠券库存', trigger: 'blur' }],
        'baseInfo.useMethod': [{ required: true }],
        'baseInfo.couponUseMiniProgramsAppid': [{ required: true }],
        'baseInfo.couponUseMiniProgramsPath': [{ required: true }],
      }
    }
  },
  methods: {
    fetchTemplate (type) {
      type ? window.location.href = "./file/couponShopInfoTemplate.csv" : window.location.href = "./file/couponCommodityInfoTemplate.csv"
    },
    shopFlgChange (val) {
      if (val === 'SUITED_SHOP') {
        this.info.couponInfo.shopInfoList = this.info.csvList[0].list
      } else {
        this.info.couponInfo.shopInfoList = []
      }
    },
    commodityFlgChange (val) {
      if (val === 'SUITED_COMMODITY' || val === 'UNSUITED_COMMODITY') {
        let index = val === 'SUITED_COMMODITY' ? 1 : 2
        this.info.couponInfo.commodityInfoList = this.info.csvList[index].list
      } else {
        this.info.couponInfo.commodityInfoList = []
      }
    },
    provingNum (name, $event) {
      let _val = this.info.couponInfo[name].replace(/[\D]/gi, '')
      this.$set(this.info.couponInfo, name, _val !== '' ? parseInt(_val) : '')
    },
    changedisplayTime (value) {
      if (this.info.couponInfo.availableBeginTime && this.info.couponInfo.dynamicPeriodFlg === 'FIXED_TERM') {
        if (+value >= +this.info.couponInfo.availableBeginTime) {
          this.info.couponInfo.displayDateFrom = ''
          this.$message.error('显示开始时间要早于使用开始时间')
        }
      }
    },
    changeStartTime (value) {
      if (this.info.couponInfo.displayDateFrom && this.info.couponInfo.dynamicPeriodFlg === 'FIXED_TERM') {
        if (+value <= +this.info.couponInfo.displayDateFrom) {
          this.info.couponInfo.availableBeginTime = ''
          this.$message.error('使用开始时间要晚于显示开始时间')
          return false
        }
      }
      if (this.info.couponInfo.availableEndTime) {
        if (+value >= this.info.couponInfo.availableEndTime) {
          this.info.couponInfo.availableBeginTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.couponInfo.availableBeginTime) {
        if (+value <= this.info.couponInfo.availableBeginTime) {
          this.info.couponInfo.availableEndTime = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    checkNumber (name, $event) {
      if ($event) {
        this.info.couponInfo[name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }
      if ($event > 999999.99) {
        this.info.couponInfo[name] = 999999.99
      }
    },
    beforeAvatarUploadsvg (file) {
      let type = file.name.toLowerCase()
      let isCSV = /\.(csv)$/.test(type)
      if (!isCSV) {
        this.$message.error('上传文件暂时只支持csv格式')
      }
      return isCSV
    },
    // 门店上传
    requestFileSvg (param) {
      let temp = param.file
      temp.mimeType = temp.type
      let f = new FormData()
      f.append('file', temp)
      f.append('fileType', 'SHOP')
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.$api.merchantCouponTemplate.upLoadCsv(f).then(res => {
        this.info.csvList[0].falg = false
        this.info.csvList[0].name = temp.name
        this.info.csvList[0].list = []
        this.info.couponInfo.shopInfoList = []
        if (res.data) {
          res.data.forEach((v, k) => {
            this.info.csvList[0].list.push({ shopId: v.shopId, shopName: v.shopName })
            this.info.couponInfo.shopInfoList.push({ shopId: v.shopId, shopName: v.shopName })
          })
        }
        this.$refs.uploadshop.clearFiles()
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.info.csvList[0].falg = true
        this.info.couponInfo.shopInfoList = []
        this.$message.error(error.message)
      })
    },
    // 上传预览
    csvClick (type, index) {
      this.couponlist = []
      type === 1 ? (this.couponlist = this.info.csvList[index].list, this.couponCsvType = '1') : (this.couponlist = this.info.csvList[0].list, this.couponCsvType = '0')
      this.inclusionListsFormVisible = true
      this.couponlist = JSON.parse(JSON.stringify(this.couponlist))
    },
    // 上传删除
    shopCsvDel (index, type) {
      this.info.csvList[index].falg = true
      this.info.csvList[index].name = ''
      this.info.csvList[index].list = []
      type === 0 ? this.info.couponInfo.shopInfoList = [] : this.info.couponInfo.commodityInfoList = []
    },
    // 商品查询
    seachShopData (index, type) {
      let searchVal = this.info.searchShop[index].searchVal
      if (!type) {
        if (this.info.searchShop.some((v, k) => {
          return (v.id === searchVal) && v.id !== '' && index !== k
        }) && this.info.searchShop.length > 1) {
          this.$message.error('商品编码不能重复')
          return false
        }
      }
      if (!searchVal || this.info.searchShop[index].name !== '') { return false }
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.$api.promotionCoupon.commodityCd(searchVal).then(res => {
        this.info.searchShop[index].name = res.data.commodityName
        this.info.searchShop[index].id = res.data.commodityCd
        this.info.searchShop[index].sellPrice = res.data.sellPrice
        this.info.searchShop[index].nameerror = ''
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        if (error.message === 'not_data_error') {
          this.info.searchShop[index].name = ''
          this.info.searchShop[index].id = ''
          this.info.searchShop[index].sellPrice = 0
          this.info.searchShop[index].nameerror = '商品不存在或已删除'
        } else {
          this.$message.error(error.message)
        }
      })
    },
    // 添加商品
    addShopData () {
      if (this.info.searchShop[this.info.searchShop.length - 1].id !== '') {
        this.info.searchShop.push({ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' })
      }
    },
    // 删除商品
    delShopData (index) {
      if (+this.info.searchShop.length === 1) {
        this.info.searchShop = [{ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' }]
      } else {
        this.info.searchShop.splice(index, 1)
      }
    },
    // 商品文件上传
    requestFileSvgCommod (param) {
      let temp = param.file
      temp.mimeType = temp.type
      let f = new FormData()
      f.append('file', temp)
      f.append('fileType', 'COMMODITY')
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.$api.merchantCouponTemplate.upLoadCsv(f).then(res => {
        this.info.csvList[this.commodityFlgIndex].falg = false
        this.info.csvList[this.commodityFlgIndex].name = temp.name
        this.info.csvList[this.commodityFlgIndex].list = []
        this.info.couponInfo.commodityInfoList = []
        if (res.data) {
          res.data.forEach((v, k) => {
            this.info.csvList[this.commodityFlgIndex].list.push({ commodityCd: v.commodityCd, commodityName: v.commodityName })
            this.info.couponInfo.commodityInfoList.push({ commodityCd: v.commodityCd, commodityName: v.commodityName })
          })
        }
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.info.csvList[this.commodityFlgIndex].falg = true
        this.info.couponInfo.commodityInfoList = []
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
    margin: 20px;
    .errorColor{color: #ff4949}
    .mr{margin-right: 10px !important;}
    .mr15{margin-right: 15px !important;}
    .mb{margin-bottom: 20px !important;}
    .mt{margin-top: 20px !important;}
    .mlr{margin: 0 10px !important;}
    .amount{
      .el-input{
        display: inline-block;
        width: 130px !important;
        margin: 0 5px;
      }
    }
    .appid{
      .el-input{
        width: 400px !important;
      }
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
    .useDate{
      width: 220px;
      display: inline-block;
      .elSelect{
        display: inline-block;
        width: 100px;
      }
    }
    .useDateLine{
      width: 40px;
      display: inline-block;
      text-align: center;
    }
    .uploadImg{
      border: 1px solid #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;
    }
    .expiring-days-input {
      width: 120px !important;
    }
    .dynamicPeriodDaysInput{
      display: inline-block;
      width: 120px !important;
    }
  }
</style>
