<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-form ref="ruleForm" :model="oData" :rules="rules" label-width="150px">
      <el-form-item label="企划编号：" prop="projectNo">
        <el-input class="name-input" v-model="oData.projectNo" maxlength="12" placeholder="请输入企划编号"/>
        <span class="placeholder">例：C201908001SH</span>
      </el-form-item>
      <el-form-item label="优惠券名称：" prop="name">
        <el-input class="name-input" v-model="oData.name" maxlength="30" placeholder="请输入优惠券名称" @input="stripscript('name', $event)"/>
        <span class="placeholder">优惠券名称文字长度不能超过30个字（包含30个）</span>
      </el-form-item>
      <el-form-item label="优惠券类型：" prop="type">
        <el-radio-group v-model="oData.type">
          <el-radio :label="0">商品券</el-radio>
          <el-radio :label="1">免费券</el-radio>
          <el-radio :label="2">满减券</el-radio>
          <el-radio :label="3">立减券</el-radio>
        </el-radio-group>
        <span class="placeholder" v-if="oData.type===0">商品券，例：可口可乐，减至1元</span>
        <span class="placeholder" v-if="oData.type===1">免费券，例：直接免费兑换一瓶可口可乐</span>
        <span class="placeholder" v-if="oData.type===2">满减券，例：满20元，减5元</span>
        <span class="placeholder" v-if="oData.type===3">立减券，例：可口可乐，减1元</span>
      </el-form-item>
      <el-form-item label="发送类型：" class="sendType_radio" prop="sendType">
        <el-radio-group v-model="oData.sendType">
          <el-radio :label="2">集点活动</el-radio>
          <el-radio :label="3">活动派发</el-radio>
          <el-radio :label="4">积分兑换</el-radio>
          <el-radio :label="6">注册</el-radio>
          <el-radio :label="7">购买</el-radio>
          <el-radio :label="8">外部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="促销区分：" prop="subsidyFlg">
        <el-radio-group v-model="oData.subsidyFlg">
          <el-radio :label="0" :disabled="oData.type===2">促销让利(原卖变)</el-radio>
          <el-radio :label="1">会员代金券</el-radio>
        </el-radio-group>
        <span class="placeholder">促销让利以优惠后金额计入门店业绩，会员代金券以原价计入门店业绩</span>
      </el-form-item>
      <el-form-item label="使用期限类型：" prop="dynamicPeriodFlg">
        <el-radio-group v-model="oData.dynamicPeriodFlg">
          <el-radio :label="0">固定期限</el-radio>
          <el-radio :label="1">动态期限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示开始期限：" prop="displayDateFromStr" v-show="oData.dynamicPeriodFlg === 0">
        <el-col class="useDate">
          <el-date-picker v-model="oData.displayDateFromStr" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间" @change="changedisplayTime"/>
        </el-col>
      </el-form-item>
      <el-form-item label="使用期限：" prop="useDateFromStr" v-show="oData.dynamicPeriodFlg === 0">
        <el-col class="useDate">
          <el-date-picker v-model="oData.useDateFromStr" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间" @change="changeStartTime" />
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="oData.useDateToStr" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束时间" @change="changeEndTime" />
        </el-col>
      </el-form-item>
      <el-form-item label="使用期限：" prop="dynamicPeriodDays" v-show="oData.dynamicPeriodFlg === 1">
        <el-input style="display: inline-block;width: 100px" class="mr" v-model.number="oData.dynamicPeriodDays" /><span>天</span>
      </el-form-item>
      <el-form-item id="shopFlg" label="适用门店：" prop="shopFlg">
        <el-radio-group v-model="oData.shopFlg">
          <el-radio :label="0">不限</el-radio>
          <el-radio :label="1">可用门店</el-radio>
        </el-radio-group>
        <div v-if="oData.shopFlg===1">
          <span class="mr">通过文件模板导入</span>
          <section v-if="oData.csvList[0].falg" class="inlineBlock">
            <el-upload ref="uploadshop" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :headers="headers" :http-request="requestFileSvg" :action="actionSvg">
              <el-button type="primary" class="mr" size="mini">添加文件</el-button>
            </el-upload>
            <a class="inlineBlock" href="https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/couponShopTemplate.csv">
              <el-button type="info" class="mr" size="mini">文件模板下载</el-button>
            </a>
          </section>
          <section v-else class="inlineBlock">
            <span class="mr">{{oData.csvList[0].name}}</span>
            <el-button type="primary" class="mr inlineBlock" size="mini" @click="csvClick(0)">预览</el-button>
            <el-button type="danger" class="mr15" size="mini" @click="shopCsvDel(0,0)">删除</el-button>
          </section>
        </div>
      </el-form-item>

      <el-form-item id="commodityFlg" label="适用商品：" prop="commodityFlg" v-if="oData.type!==2" >
        <section v-for="(items,index) in oData.searchShop" :key="index" class="mb">
          <el-input class="expiring-days-input mr" type="text" v-model="items.searchVal" :disabled="items.name !== ''"/><span class="mr">例：044041</span>
          <el-button type="primary" class="mr" size="mini" @click="seachShopData(index)">查询</el-button>
          <el-button type="danger" class="mr15" size="mini" @click="delShopData(index)">删除</el-button>
          <span class="mr" v-if="items.name">{{items.name}}</span>
          <span class="mr errorColor" v-if="items.nameerror">{{items.nameerror}}</span>
          <span v-if="items.sellPrice">{{items.sellPrice + '元'}}</span>
        </section>
        <section class="mt"><el-button type="primary" size="mini" @click="addShopData">添加商品</el-button></section>
      </el-form-item>

      <el-form-item id="commodity" label="适用商品：" prop="commodityFlg" v-if="oData.type==2" >
        <el-radio-group v-model="oData.commodityFlg">
          <el-radio :label="0">不限</el-radio>
          <el-radio :label="1">可用商品</el-radio>
          <el-radio :label="2">不可用商品</el-radio>
        </el-radio-group>
        <div v-for="(item,index) in oData.csvList" :key="index">
          <section v-if="oData.commodityFlg===index&&index>0">
            <span class="mr">通过文件模板导入</span>
            <section v-if="item.falg" class="inlineBlock">
              <el-upload ref="uploadshop" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :headers="headers" :http-request="requestFileSvgCommod" :action="actionSvg">
                <el-button type="primary" class="mr" size="mini">添加文件</el-button>
              </el-upload>
              <a  class="inlineBlock" href="https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/couponCommodityTemplate.csv">
               <el-button type="info" class="mr" size="mini">文件模板下载</el-button>
              </a>
            </section>
            <section v-else  class="inlineBlock">
              <span class="mr">{{item.name}}</span>
              <el-button type="primary" class="mr" size="mini" @click="csvClick(1, index)">预览</el-button>
              <el-button type="danger" class="mr15" size="mini" @click="shopCsvDel(index,1)">删除</el-button>
            </section>
          </section>
        </div>
      </el-form-item>

      <el-form-item  label="满足金额：" prop="amount1" v-if="oData.type===2">
        <section class="amount">
          满<el-input class="face-value-input" v-model="oData.amount1" @input="checkNumber('amount1', $event)" />元
        </section>
        <span class="placeholder">有效金额在0.00-999999.99范围内，仅支持2位有效小数</span>
      </el-form-item>
      <el-form-item label="优惠金额：" prop="amount2" v-if="oData.type!==1">
        <section class="amount">
          减<span v-if="oData.type===0">至</span><el-input class="face-value-input" v-model="oData.amount2" @input="checkNumber('amount2', $event)" />元
        </section>
        <span class="placeholder">有效金额在0.00-999999.99范围内，仅支持2位有效小数</span>
      </el-form-item>

      <el-form-item label="图片设置：" prop="imagePathDetail">
        <el-input class="image-input" v-model="oData.imagePathDetail" />
        <div class="img-content">
          <template v-if="oData.imagePathDetail">
            <image-item :url="oData.imagePathDetail" @del="delMainImage" />
          </template>
          <el-upload v-else ref="uploadimage" :show-file-list="false" :before-upload="beforeAvatarUpload" :headers="headers" :http-request="requestFile" :action="action" style="border: none">
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <span class="placeholder">建议尺寸400x400像素，不超过1MB，支持JPG、PNG、JPEG格式</span>
      </el-form-item>
      <el-form-item label="优惠券库存：" prop="couponUpperLimit">
        <el-input class="name-input" v-model="oData.couponUpperLimit" placeholder="请输入优惠券库存" @input="checkNumberLimit('couponUpperLimit', $event)" maxlength="6"/>
        <span class="placeholder">输入1~999999之间的数字，如果输入0则代表不限制礼券数量</span>
      </el-form-item>
<!--      <el-form-item label="优惠券状态：" prop="status">-->
<!--        <el-radio-group v-model="oData.status">-->
<!--          <el-radio :label="'CREATED'">未公开</el-radio>-->
<!--          <el-radio :label="'PUBLISHED'">公开</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->

      <el-form-item label="转赠设置：" prop="giveLimitFalg">
        <el-checkbox-group v-model="oData.giveLimitFalg">
          <el-checkbox label="允许转赠给好友领取"></el-checkbox>
        </el-checkbox-group>
        <section v-if="oData.giveLimitFalg">
          可转赠<el-input class="face-value-input mr ml" @input="provingNum($event)" v-model="oData.giveLimit"/>次
<!--          <span class="placeholder">若次数为0，则不限制转赠次数</span>-->
        </section>
      </el-form-item>
      <el-form-item class="form-desc-item" label="优惠券说明：" prop="couponExplain">
        <el-input type="textarea" v-model="oData.couponExplain" :autosize="{ minRows: 6, maxRows: 40}"/>
      </el-form-item>
    </el-form>
    <coupon-list :visible.sync="inclusionListsFormVisible" :couponcsvtype="couponCsvType" :couponlist="couponlist" @cancle="inclusionListsFormVisible=false" @comfirm="inclusionListsFormVisible=false" />
  </el-card>
</template>

<script>
import ImageItem from '../../template-component/_part-image-item.vue'
import CouponList from '@/components/adminCouponList'
import { couponMixin } from "../../template-component/mixin.js"
export default {
  mixins: [couponMixin],
  props: ['submitFalg'],
  components: {
    ImageItem,
    CouponList
  },

  created () {
    if (this.$store.state.coupon.couponData != '') {
      this.oData = Object.assign({}, this.$store.state.coupon.couponData)
    }
  },
  methods: {
    seachShopData (index) {
      let searchVal = this.oData.searchShop[index].searchVal
      if (this.oData.searchShop.some((v, k) => {
        return (v.id === searchVal) && v.id !== '' && index !== k
      }) && this.oData.searchShop.length > 1) {
        this.$message.error('商品编码不能重复')
        return false
      }
      if (!searchVal || this.oData.searchShop[index].name !== '') { return false }
      this.$emit('load', true)
      this.$api.promotionCoupon.commodityCd(searchVal).then(res => {
        this.oData.searchShop[index].name = res.data.commodityName
        this.oData.searchShop[index].id = res.data.commodityCd
        this.oData.searchShop[index].sellPrice = res.data.sellPrice
        this.oData.searchShop[index].nameerror = ''
        this.$emit('load', false)
      }).catch(error => {
        this.$emit('load', false)
        if (error.message === 'not_data_error') {
          this.oData.searchShop[index].name = ''
          this.oData.searchShop[index].id = ''
          this.oData.searchShop[index].sellPrice = 0
          this.oData.searchShop[index].nameerror = '商品不存在或已删除'
        } else {
          this.$message.error(error.message)
        }
      })
    },
    delShopData (index) {
      if (+this.oData.searchShop.length === 1) {
        this.oData.searchShop = [{ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' }]
      } else {
        this.oData.searchShop.splice(index, 1)
      }
    },
    requestFile (param) {
      let temp = param.file
      let f = new FormData()
      f.append('file', temp)
      this.$emit('load', true)
      this.oData.imagePathDetail = ''
      this.$api.promotionCoupon.fileImg(f).then(res => {
        this.oData.imagePathDetail = res.data
        this.oData = JSON.parse(JSON.stringify(this.oData))
        this.$refs.uploadimage.clearFiles()
        this.$emit('load', false)
      }).catch(error => {
        this.$emit('load', false)
        this.$refs.uploadimage.clearFiles()
        this.$message.error(error.message)
      })
    },
    delMainImage () {
      this.oData.imagePathDetail = ''
    },
    csvClick (type, index) {
      this.couponlist = []
      type === 1 ? (this.couponlist = this.oData.csvList[index].list, this.couponCsvType = '1') : (this.couponlist = this.oData.csvList[0].list, this.couponCsvType = '0')
      this.inclusionListsFormVisible = true
      this.couponlist = JSON.parse(JSON.stringify(this.couponlist))
    },
    // 店铺csv上传删除
    shopCsvDel (index, type) {
      this.oData.csvList[index].falg = true
      this.oData.csvList[index].name = ''
      this.oData.csvList[index].list = []
      type === 0 ? this.oData.shopIdList = [] : this.oData.commodityCdList = []
    },
    beforeAvatarUploadsvg (file) {
      let _type = file.name.toLowerCase()
      let isCSV = /\.(csv)$/.test(_type)
      if (!isCSV) {
        this.$message.error('上传文件暂时只支持csv格式')
      }
      return isCSV
    },
    // 门店上传
    requestFileSvg (param) {
      let temp = param.file
      let f = new FormData()
      f.append('file', temp)
      f.append('fileType', '1')
      this.$emit('load', true)
      this.$api.promotionCoupon.upLoadCsv(f).then(res => {
        this.oData.csvList[0].falg = false
        this.oData.csvList[0].name = temp.name
        this.oData.csvList[0].list = []
        this.oData.shopIdList = []
        res.data.shopList.forEach((v, k) => {
          this.oData.csvList[0].list.push(v.shopId)
          this.oData.shopIdList.push(v.shopId)
        })
        this.$refs.uploadshop.clearFiles()
        this.$emit('load', false)
      }).catch(error => {
        this.$emit('load', false)
        this.$refs.uploadshop.clearFiles()
        this.oData.shopIdList = []
        this.oData.csvList[0].falg = true
        this.oData.csvList[0].name = ''
        this.oData.csvList[0].list = []
        this.$message.error(error.message)
      })
    },
    requestFileSvgCommod (param) {
      let temp = param.file
      let f = new FormData()
      f.append('file', temp)
      f.append('fileType', '4')
      this.$emit('load', true)
      this.$api.promotionCoupon.upLoadCsv(f).then(res => {
        this.oData.csvList[this.oData.commodityFlg].falg = false
        this.oData.csvList[this.oData.commodityFlg].name = temp.name
        this.oData.csvList[this.oData.commodityFlg].list = []
        this.oData.commodityCdList = []
        res.data.commodityMstList.forEach((v, k) => {
          this.oData.csvList[this.oData.commodityFlg].list.push(v.commodityCd)
          this.oData.commodityCdList.push(v.commodityCd)
        })
        this.$emit('load', false)
      }).catch(error => {
        this.$emit('load', false)
        this.oData.commodityMstList = []
        this.oData.csvList[this.oData.commodityFlg].falg = true
        this.oData.csvList[this.oData.commodityFlg].list = []
        this.$message.error(error.message)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .action-add-info{
    margin: 20px;
    .errorColor{color: #ff4949}
    .mr{margin-right: 10px !important;}
    .ml{margin-left: 10px !important;}
    .mr15{margin-right: 15px !important;}
    .mb{margin-bottom: 20px !important;}
    .mt{margin-top: 20px !important;}

    .amount{
      .el-input{
        display: inline-block;
        width: 100px !important;
        margin: 0 5px;
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
    }
    .useDateLine{
      width: 40px;
      display: inline-block;
      text-align: center;
    }
    .dynamicPeriodDays {
      width: 100px;
    }
    .expiring-days-input {
      width: 120px;
    }
    .face-value-input{
      width: 100px;
    }
  }
</style>
