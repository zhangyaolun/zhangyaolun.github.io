<template>
  <el-card class="box-card action-add-info">
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="150px">
      <el-form-item label="商品名称：" prop="name">
        <el-input class="name-input" v-model="info.name" maxlength="30" placeholder="请输入商品名称" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
      <el-form-item label="商品售价：" prop="price">
        <el-input class="name-input" v-model="info.price" placeholder="请输入商品售价" :disabled="info.pageType === 'detail'" @input="checkPrice('price', $event)"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">单位：元，支持2位小数点</span>
      </el-form-item>
      <el-form-item label="商品运费：" prop="postage">
        <el-input class="name-input" v-model="info.postage" placeholder="请输入商品运费" :disabled="info.pageType === 'detail'" @input="checkPrice('postage', $event)"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">单位：元，支持2位小数点</span>
      </el-form-item>
      <el-form-item label="商品库存：" prop="stock">
        <el-input class="name-input" v-model="info.stock" placeholder="请输入商品库存" :disabled="info.pageType === 'detail'" maxlength="8" @input="provingNum('stock', $event)"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">0~99999999的整数</span>
      </el-form-item>
      <el-form-item label="单用户购买上限：" prop="purchaseLimit">
        <el-input class="name-input" v-model="info.purchaseLimit" placeholder="请输入用户购买上限" :disabled="info.pageType === 'detail'" maxlength="8" @input="provingNum('purchaseLimit', $event)"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">指单用户可购买的商品个数</span>
      </el-form-item>
      <el-form-item label="单笔订单购买上限：" prop="singlePurchaseLimit">
        <el-input class="name-input" v-model="info.singlePurchaseLimit" placeholder="请输入单笔订单购买上限" :disabled="info.pageType === 'detail'" maxlength="8" @input="provingNum('singlePurchaseLimit', $event)"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">指单笔订单用户可下单的该商品个数</span>
      </el-form-item>
      <el-form-item label="是否上架：" prop="status">
        <el-radio-group v-model="info.status" :disabled="info.pageType === 'detail'">
          <el-radio :label="'ONSALE'">上架</el-radio>
          <el-radio :label="'OFFSALE'">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品缩略图：" prop="thumnailImagePath">
        <upload-img :imageName="'thumnailImagePath'"></upload-img>
        <span style="color:red" v-if="info.pageType !== 'detail'">400*400≤文件尺寸≤2000*2000，支持jpg/png格式，不超过2MB</span>
      </el-form-item>
      <el-form-item label="商品详情图：" prop="detailImageList">
        <uploadimg-more></uploadimg-more>
        <span style="color:red" v-if="info.pageType !== 'detail'">400*400≤文件尺寸≤2000*2000，支持jpg/png格式，不超过2MB</span>
      </el-form-item>
      <el-form-item label="商品详情：" prop="detail" style="width: 50%">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入商品详情"
          v-model="info.detail"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadimgMore from "../uploadImgMore"
import uploadImg from "../uploadImg"
export default {
  components: {
    uploadimgMore,
    uploadImg
  },
  computed: {
    info () {
      return this.$store.getters.commodityInfo
    }
  },
  watch: {
    'info.detail': {
      handler: function (val) {
        if (val.length > 250) {
          this.info.detail = val.substring(0, 250)
        }
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    let valdisplayImageSmall = (rule, value, callback) => {
      if (!this.info.thumnailImagePath) {
        callback(new Error('请上传商品缩略图'))
      } else {
        callback()
      }
    }
    let valdisplayImages = (rule, value, callback) => {
      if (this.info.detailImageList.length === 0) {
        callback(new Error('请上传商品详情图'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'change' }],
        price: [{ required: true, message: '请输入商品售价', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
        status: [{ required: true }],
        thumnailImagePath: [{ required: true, validator: valdisplayImageSmall, trigger: 'blur' }],
        detailImageList: [{ required: true, validator: valdisplayImages, trigger: 'blur' }],
        detail: [{ required: true, message: '请输入商品详情', trigger: 'blur' }]
      }
    }
  },
  methods: {
    checkPrice (name, $event) {
      if ($event) {
        this.info[name] = $event.match(/^\d*(\.?\d{0,2})/g)[0] || ''
      }
    },
    provingNum (name, $event) {
      if ($event) {
        this.info[name] = $event.replace(/[^0-9]/gi, '')
      }
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
    .mb{margin-bottom: 20px !important;}
    .mt{margin-top: 20px !important;}
    .mlr{margin: 0 10px !important;}
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
      display: inline-block;
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
    .expiring-days-input{
      width: 140px !important;
    }
  }
</style>
