<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-form ref="ruleForm" :model="oData" label-width="150px">
      <el-form-item label="企划编号：" prop="projectNo">
        <span v-if="oData.projectNo != ''">{{oData.projectNo}}</span>
        <span v-else>无</span>
      </el-form-item>
      <el-form-item label="优惠券名称：" prop="name">
        <span>{{oData.name}}</span>
      </el-form-item>
      <el-form-item label="优惠券类型：" prop="type">
        <span>{{oData.type | typeFilters}}</span>
      </el-form-item>
      <el-form-item label="发送类型：" class="sendType_radio" prop="sendType">
        <span>{{oData.sendType | sendTypeFilters}}</span>
      </el-form-item>
      <el-form-item label="促销区分：" prop="atype">
        <span v-if="oData.subsidyFlg==0">促销让利(原卖变)</span>
        <span v-else>会员代金券</span>
      </el-form-item>
      <el-form-item label="使用期限类型：" prop="dynamicPeriodFlg">
        <span v-if="oData.dynamicPeriodFlg==0">固定期限</span>
        <span v-else>动态期限</span>
      </el-form-item>

      <el-form-item label="显示开始期限：" prop="dynamicPeriodFlg" v-if="oData.dynamicPeriodFlg==0 && oData.displayDateFrom ">
        <el-form-item prop="useDate">
          <span>{{oData.displayDateFromStr | formatBackendTime}}</span>
        </el-form-item>
      </el-form-item>

      <el-form-item label="使用期限：" prop="expiring_type">
        <el-form-item prop="useDate" v-if="oData.dynamicPeriodFlg==0">
          <span>{{oData.useDateFromStr | formatBackendTime}}</span>
          <span> 至 </span>
          <span>{{oData.useDateToStr | formatBackendTime}}</span>
        </el-form-item>
        <el-form-item prop="expiring_the_day" v-else class="amount">
          <span>{{oData.dynamicPeriodDays}}</span>天
        </el-form-item>
      </el-form-item>

      <el-form-item label="适用门店：" prop="discount_type2">
        <span v-if="oData.shopFlg==0">不限</span>
        <div v-else>
          <span class="mr">适用门店</span>
<!--          <el-button type="primary" class="mr" size="mini">适用门店</el-button>-->
          <el-button type="primary" class="mr" size="mini" @click="csvClick(0)">预览</el-button>
        </div>
      </el-form-item>

      <el-form-item label="适用商品：" prop="shopData" v-if="oData.type!=2" >
        <div v-for="(item, index) in oData.searchShop" :key="index">
          <span class="mr15">{{item.id}}</span>
          <span class="mr15" v-if="item.name">{{item.name}}</span>
          <span class="mr15 errorColor" v-if="item.nameerror">{{item.nameerror}}</span>
          <span v-if="item.sellPrice">{{item.sellPrice + '元'}}</span>
        </div>
      </el-form-item>

      <el-form-item label="适用商品：" prop="discount_type2" v-if="oData.type==2" >
        <span v-if="oData.commodityFlg==0">不限</span>
        <div v-if="oData.commodityFlg!=0" style="display: inline-block">
          <span class="mr" v-if="oData.commodityFlg==1">可用商品</span>
          <span class="mr" v-if="oData.commodityFlg==2">不可用商品</span>
          <el-button type="primary" class="mr" size="mini" @click="csvClick(1)">预览</el-button>
        </div>
      </el-form-item>

      <el-form-item  label="满足金额：" prop="amount1" v-if="oData.type==2">
        满<span>{{oData.amount1 + '元'}}</span>
      </el-form-item>
      <el-form-item label="优惠金额：" prop="amount2" v-if="oData.type!=1">
        减<span v-if="oData.type==0">至</span><span>{{oData.amount2 + '元'}}</span>
      </el-form-item>

      <el-form-item label="图片设置：" prop="imagePathList">
        <div class="img-content">
          <template v-if="oData.imagePathDetail">
            <image-item :url="oData.imagePathDetail" />
          </template>
          <span v-else>未上传</span>
        </div>
      </el-form-item>
      <el-form-item label="优惠券库存：" prop="couponUpperLimit">
        <span v-if="oData.couponUpperLimit == 0">无限库存</span>
        <span v-else>{{oData.couponUpperLimit}}</span>
      </el-form-item>
<!--      <el-form-item label="优惠券状态：" prop="status">-->
<!--        <span v-if="oData.status=='CREATED'">未公开</span>-->
<!--        <span v-else>公开</span>-->
<!--      </el-form-item>-->

      <el-form-item label="转赠设置：" prop="giveLimit">
        <span v-if="oData.transferFlag == 1">{{'可转赠' + oData.giveLimit + '次'}}</span>
        <!--        <span v-if="oData.giveLimit === 0">不限制转赠次数</span>-->
        <span v-if="oData.transferFlag == 0">不可转赠</span>
      </el-form-item>
      <el-form-item class="form-desc-item" label="优惠券说明：" prop="desc">
        <span>{{oData.couponExplain}}</span>
      </el-form-item>
    </el-form>
    <coupon-list :couponcsvtype="couponCsvType" :visible.sync="inclusionListsFormVisible" :couponlist="couponlist" @cancle="inclusionListsFormVisible=false" @comfirm="inclusionListsFormVisible=false" />
  </el-card>
</template>

<script>
import ImageItem from '../template-component/image-item.vue'
import CouponList from '@/components/adminCouponList'
export default {
  components: {
    ImageItem,
    CouponList
  },
  data () {
    return {
      couponCsvType: '0', // 0门店 1商店
      oData: {
        searchShop: []
      },
      inclusionListsFormVisible: false,
      couponlist: [],
      imagePathList: [],
      couponId: ''
    }
  },
  filters: {
    typeFilters (val, location) {
      let attr = ['商品券', '免费', '满减券', '立减券']
      return attr[val]
    },
    sendTypeFilters (val, location) {
      let attr = ['一般发送', '位置信息发送', '集点活动', '活动派发', '积分兑换', '', '注册', '购买', '外部', '新店专享', '领券中心']
      return attr[val]
    },
    subsidyFlgFilters (val, location) {
      let attr = ['促销让利(原卖变)', '会员代金券']
      return attr[val]
    },
    formatUpperLimit (val) {
      return val == 0 ? '无限库存' : val
    }
  },
  mounted () {
    this.couponId = this.$route.params.id
    if (this.couponId) {
      this.$api.promotionCoupon.detail({ id: this.couponId }).then(res => {
        this.oData = res.data
        if (this.oData.commodityCdList && this.oData.commodityCdList.length > 0 && this.oData.type != 2) {
          this.oData.searchShop = []
          this.oData.commodityCdList.forEach((v, k) => {
            this.oData.searchShop.push({ searchVal: v, name: '', id: v, sellPrice: 0, nameerror: '' })
            this.seachShopData(v, k)
          })
        }
        this.$emit('loadIng')
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  },
  methods: {
    seachShopData (v, index) {
      this.$api.promotionCoupon.commodityCd(v).then(res => {
        this.oData.searchShop[index].name = res.data.commodityName
        this.oData.searchShop[index].id = res.data.commodityCd
        this.oData.searchShop[index].sellPrice = res.data.sellPrice
        this.oData.searchShop[index].nameerror = ''
      }).catch(error => {
        if (error.message == 'not_data_error') {
          this.oData.searchShop[index].name = ''
          this.oData.searchShop[index].id = ''
          this.oData.searchShop[index].sellPrice = 0
          this.oData.searchShop[index].nameerror = '商品不存在或已删除'
        } else {
          //this.$message.error(error.message)
        }
      })
      this.oData = JSON.parse(JSON.stringify(this.oData))
    },
    csvClick (type) {
      this.couponlist = []
      type == 1 ? (this.couponlist = this.oData.commodityCdList, this.couponCsvType = '1') : (this.couponlist = this.oData.shopIdList, this.couponCsvType = '0')
      this.inclusionListsFormVisible = true
      this.couponlist = JSON.parse(JSON.stringify(this.couponlist))
    }
  }
}
</script>

<style lang="scss" scoped>
  .action-add-info{
    margin: 20px;
    .errorColor{color: #ff4949}
    .mr{margin-right: 10px !important;}
    .mr15{margin-right: 15px !important;}
    .mt{margin-top: 20px !important;}
  }
</style>
