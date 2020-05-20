<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">发券设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="发券模式：" prop="couponInfo.activityType">
        <el-radio-group v-model="info.couponInfo.activityType" :disabled="info.pageType === 'detail'">
          <el-radio :label="'FULL_SEND_ACT_TYPE'">满额送</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="券类型：" prop="couponInfo.awardType">
        <el-radio-group v-model="info.couponInfo.awardType" :disabled="info.pageType === 'detail'">
          <el-radio :label="'BUSIFAVOR'">商家券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发券门槛金额：" prop="couponInfo.transactionNumberMinimum">
        <section class="amount">
          消费满<el-input class="face-value-input" v-model="info.couponInfo.transactionNumberMinimum" @input="checkNumber('transactionNumberMinimum', $event)" placeholder="请输入门槛金额" :disabled="info.pageType === 'detail'"/>元后发放商家券
        </section>
      </el-form-item>
      <el-form-item label="发放商家券模式：" prop="couponInfo.sendContent">
        <el-radio-group v-model="info.couponInfo.sendContent" :disabled="info.pageType === 'detail'" @change="sendContentChange">
          <el-radio :label="'SINGLE_COUPON'">单张券</el-radio>
          <el-radio :label="'GIFT_PACKAGE'">多张券</el-radio>
        </el-radio-group>
        <span class="promptingDefalut" v-if="info.pageType !== 'detail'">多张券，指至少3张券，最多5张券</span>
      </el-form-item>
      <el-form-item label="发券缩略图：" prop="couponInfo.thumbnailUrl" v-if="info.couponInfo.sendContent === 'GIFT_PACKAGE'">
        <upload-img :imageName="'thumbnailUrl'"></upload-img>
        <span class="promptingDefalut" v-if="info.pageType !== 'detail'">尺寸为400*400，仅支持JPG/PNG格式，图片要求小于等于2MB</span>
      </el-form-item>
      <section v-for="(item, index) in info.couponInfo.awardInfoList" :key="index">
        <el-form-item label="添加商家券：" prop="couponInfo.sendContent">
            <el-input class="expiring-days-input mr" type="text" v-model="item.mchCouponId" placeholder="请输入商家券ID" :disabled="item.name !== ''"/><span class="mr"></span>
            <el-button type="primary" class="mr" size="mini" @click="seachShopData(index)" :disabled="info.pageType === 'detail'">查询</el-button>
            <el-button type="danger" class="mr15" size="mini" @click="delShopData(index)" :disabled="info.pageType === 'detail'">删除</el-button>
            <span class="mr" v-if="item.name">{{item.name}}</span>
            <span class="mr errorColor" v-if="item.nameerror">{{item.nameerror}}</span>
            <span class="promptingError" v-if="info.pageType !== 'detail' && item.idShow">请添加商家券</span>
        </el-form-item>
        <el-form-item label="发券详情图：" prop="couponInfo.sendContent">
          <awardupload-img :index.sync="index"></awardupload-img>
          <span class="promptingDefalut" v-if="info.pageType !== 'detail'">尺寸为850*350，仅支持JPG/PNG格式，图片要求小于等于2MB</span>
          <span class="promptingError" v-if="info.pageType !== 'detail' && item.urlShow">请添加发券详情图</span>
        </el-form-item>
      </section>
      <el-form-item label="" v-if="info.couponInfo.sendContent === 'GIFT_PACKAGE' && info.couponInfo.awardInfoList.length < 5">
        <section class="mt"><el-button type="primary" size="mini" @click="addShopData" :disabled="info.pageType === 'detail'">添加</el-button></section>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import awarduploadImg from "./awarduploadImg"
export default {
  components: {
    uploadImg,
    awarduploadImg
  },
  computed: {
    info () {
      return this.$store.getters.payCourtesyInfo
    }
  },
  data () {
    return {
      rules: {
        'couponInfo.activityType': [{ required: true }],
        'couponInfo.awardType': [{ required: true }],
        'couponInfo.sendContent': [{ required: true }],
        'couponInfo.transactionNumberMinimum': [{ required: true, message: '请输入门槛金额', trigger: 'blur' }],
        'couponInfo.thumbnailUrl': [{ required: true, message: '请上传发券缩略图', trigger: 'blur' }],
      }
    }
  },
  methods: {
    checkNumber (name, $event) {
      if ($event) {
        this.info.couponInfo[name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || ''
      }
    },
    sendContentChange (val) {
      if (val === 'SINGLE_COUPON') {
        this.info.couponInfo.awardInfoList = [{ mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' }]
      } else {
        this.info.couponInfo.awardInfoList = [
          { mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' },
          { mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' },
          { mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' }
        ]
      }
    },
    seachShopData (index, type) {
      let _mchCouponId = this.info.couponInfo.awardInfoList[index].mchCouponId
      if (!type) {
        if (this.info.couponInfo.awardInfoList.some((v, k) => {
          return (v.mchCouponId === _mchCouponId) && v.mchCouponId !== '' && index !== k
        }) && this.info.couponInfo.awardInfoList.length > 1) {
          this.$message.error('商家券不能重复')
          return false
        }
      }
      this.$store.dispatch('payCourtesy/setLoadingData', true)
      this.info.couponInfo.awardInfoList[index].idShow = false
      this.$api.payCourtesy.detailBase(_mchCouponId).then(res => {
        this.info.couponInfo.awardInfoList[index].name = ''
        this.info.couponInfo.awardInfoList[index].nameerror = ''
        if (!res.data) {
          this.info.couponInfo.awardInfoList[index].nameerror = '商品不存在或已删除'
        } else {
          let _res = res.data
          if (_res.regionBlockCode !== this.$store.getters.regionBlockCode) {
            this.info.couponInfo.awardInfoList[index].nameerror = `商家券为 ${this.$store.getters.regionBlockCodeName}地区，不支持添加`
            this.$message.error(`该商家券归属地为 ${this.$store.getters.regionBlockCodeName}，不支持添加`)
            this.$store.dispatch('payCourtesy/setLoadingData', false)
            return false
          }
          if (_res.openStatus === 'CREATED') {
            this.info.couponInfo.awardInfoList[index].nameerror = '商家券尚未公开'
            this.$store.dispatch('payCourtesy/setLoadingData', false)
            return false
          }
          if (_res.successCount === 0) {
            this.info.couponInfo.awardInfoList[index].nameerror = '商家券模板必须已上传券 CODE'
            this.$store.dispatch('payCourtesy/setLoadingData', false)
            return false
          }
          this.info.couponInfo.awardInfoList[index].name = _res.name
          this.info.couponInfo.awardInfoList[index].stockId = _res.stockId
          this.info.couponInfo.awardInfoList[index].availableBeginTime = _res.availableBeginTime
          this.info.couponInfo.awardInfoList[index].availableEndTime = _res.availableEndTime
          this.info.couponInfo.awardInfoList[index].maxCouponsPerUser = _res.maxCouponsPerUser
        }
        this.$store.dispatch('payCourtesy/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('payCourtesy/setLoadingData', false)
        if (error.message === 'not_data_error') {
          this.info.couponInfo.awardInfoList[index].name = ''
          this.info.couponInfo.awardInfoList[index].nameerror = '商家券不存在或已删除'
        } else {
          this.$message.error(error.message)
        }
      })
    },
    addShopData () {
      let nowLength = this.info.couponInfo.awardInfoList.length
      if (this.info.couponInfo.awardInfoList[+nowLength - 1].name === '' || this.info.couponInfo.awardInfoList[+nowLength - 1].originalImageUrl === '') {
        this.$message.error('请添加商家券信息/添加发券详情图信息')
        return false
      }
      this.info.couponInfo.awardInfoList.push({ mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' })
    },
    delShopData (index) {
      if (this.info.couponInfo.sendContent === 'GIFT_PACKAGE' && this.info.couponInfo.awardInfoList.length > 1 && this.info.couponInfo.awardInfoList.length <= 5) {
        this.info.couponInfo.awardInfoList.splice(index, 1)
      } else if (this.info.couponInfo.awardInfoList[0].mchCouponId !== '' && this.info.couponInfo.awardInfoList[0].name !== '') {
        let _awardInfoList = [{ mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' }]
        _awardInfoList[0].originalImageUrl = this.info.couponInfo.awardInfoList[0].originalImageUrl
        this.info.couponInfo.awardInfoList = _awardInfoList
      }
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
    .el-input{
      display: inline-block;
      width: 300px !important;
    }
    .amount{
      .el-input{
        display: inline-block;
        width: 150px !important;
        margin: 0 5px;
      }
    }
  }
</style>
