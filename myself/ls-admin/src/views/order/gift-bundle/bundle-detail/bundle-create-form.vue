<template>
  <div class="bundle-create-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        基本信息：
      </div>
      <el-form ref="giftCreateForm" :model="bundle" :rules="formRules" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="特惠券包CODE：">
              <el-input v-model="bundle.code" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="特惠券包名称：">
              <el-input v-model="bundle.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="特惠券包原价：">
              <el-input v-model="bundle.originalPrice" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特惠券包卖价：">
              <el-input v-model="bundle.sellPrice" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特惠券包库存：">
              <el-input v-model="bundle.inventoryQty" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="活动开始：">
              <el-date-picker type="datetime" placeholder="开始日期" v-model="bundle.showTime" style="width: 100%;" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动结束：">
              <el-date-picker placeholder="结束时间" type="datetime" v-model="bundle.finishTime" style="width: 100%;" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付时间：">
              <el-date-picker placeholder="支付时间" type="datetime" v-model="bundle.orderTime" style="width: 100%;" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="设置在售或下架：">
              <el-tag type="success" v-if="bundle.status =='2'" :disabled="true">在售</el-tag>
              <el-tag type="danger" v-else-if="bundle.status =='3'" :disabled="true">暂停</el-tag>
              <el-tag type="danger" v-else :disabled="true">已下架</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单用户限制购买数量：" prop="totalLimited">
              <el-input v-model="bundle.totalLimited" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="特惠券包列表图：">
              <img v-if="bundle.imageSmall" width="148px" height="148px" :src="bundle.imageSmall" class="avatar">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="特惠券包详情图：">
              <section v-if="bundle.imageBigList && bundle.imageBigList.length>0">
                <img width="148px" height="148px" :src="item" class="imageBigImg" v-for="(item,index) in bundle.imageBigList" :key="index">
              </section>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
        <el-col :span="24">
          <el-form-item label="券包售卖渠道/平台：" prop="platformList">
            <el-checkbox disabled :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="bundle.platformList" @change="handleCheckedCitiesChange">
              <el-checkbox disabled v-for="(item,index) in platformOptions" :label="index" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="分享：">
          <el-radio-group v-model="bundle.shareFlg">
            <el-radio disabled class="radio" :label="0">可分享</el-radio>
            <el-radio disabled class="radio" :label="1">不可分享</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="规则说明：" >
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="bundle.description" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { isInteger, checkFloat } from "@/utils/validate"
import uploadImage from '../component/upload-image'

export default {
  props: {
    bundle: {
      type: Object,
      required: true
    }
  },
  components: {
    uploadImage
  },
  data () {
    return {
      isIndeterminate: true,
      checkAll: false,
      platformOptions: ["小程序", "App", "公众号", "二维码"],
      platformOptionsIndex: [0, 1, 2, 3],
      formRules: {
        code: [
          { required: true, message: "特惠券包CODE不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "特惠券包名称不能为空", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: checkFloat, trigger: "blur" }
        ],
        sellPrice: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: checkFloat, trigger: "blur" }
        ],
        inventoryQty: [
          { required: true,  message: "库存不能为空", trigger: "blur" },
          { validator: isInteger, trigger: "blur" }
        ],
        showTime: [
          { required: true, message: "时间不能为空", trigger: "blur" }
        ],
        finishTime: [
          { required: true,  message: "时间不能为空", trigger: "blur" }
        ],
        orderTime: [
          { required: true, message: "时间不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "设置在售或下架不能为空", trigger: "change" }
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        imageSmall: [
          { required: true, message: "特惠券包列表图不能为空", trigger: "change" }
        ],
        imageBig: [
          { required: true, message: "特惠券包详情图不能为空", trigger: "change" }
        ],
      }
    }
  },
  methods: {
    // smallFileSuccess (url) {
    //   this.bundle.imageSmall = url
    // },
    // bigFileSuccess (url) {
    //   this.bundle.imageBig = url
    // }
    handleCheckAllChange (val) {
      if (val) {
        this.$set(this.bundle, 'platformList', this.platformOptionsIndex)
      } else {
        this.$set(this.bundle, 'platformList', [])
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.bundle.platformList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.bundle.platformList.length
    },
  }
}
</script>

<style lang="scss" scoped>
.bundle-create-form {
  margin: 20px;
  .form-image-item {
    .el-input {
      opacity: 0;
      position: absolute;
    }
  }
  .imageBigImg{margin: 0 8px 8px 0;display: inline-block}
}
</style>
