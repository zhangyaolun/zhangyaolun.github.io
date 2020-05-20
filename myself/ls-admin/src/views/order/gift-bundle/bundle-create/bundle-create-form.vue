<template>
  <div class="bundle-create-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        基本信息：
      </div>
      <el-form ref="giftCreateForm" :model="bundle" :rules="formRules" label-width="180px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="特惠券包CODE：" prop="code">
              <el-input v-model="bundle.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="特惠券包名称：" prop="name">
              <el-input v-model="bundle.name" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
          <el-form-item label="特惠券包原价：" prop="originalPrice">
            <el-input v-model="bundle.originalPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特惠券包卖价：" prop="sellPrice">
            <el-input v-model="bundle.sellPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特惠券包库存：" prop="inventoryQty">
            <el-input v-model="bundle.inventoryQty"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="活动开始：" prop="showTime">
            <el-date-picker
              type="datetime"
              placeholder="开始日期"
              v-model="bundle.showTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动结束：" prop="finishTime">
            <el-date-picker
              placeholder="结束时间"
              type="datetime"
              v-model="bundle.finishTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付时间：" prop="orderTime">
            <el-date-picker
              placeholder="支付时间"
              type="datetime"
              v-model="bundle.orderTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="设置在售或下架：" prop="status">
            <el-radio-group v-model="bundle.status">
              <el-radio :label='2'>在售</el-radio>
              <el-radio :label='0'>下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单用户限制购买数量：" prop="totalLimited">
            <el-input v-model="bundle.totalLimited" @keyup.native="proving"></el-input>
            <span style="color:red">默认0为不限</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="特惠券包列表图：" prop="imageSmall">
             <el-upload class="avatar-uploader" :action="uploadUrl()" :show-file-list="false"
              :on-success="smallFileSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="bundle.imageSmall" :src="bundle.imageSmall" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span style="color:red">400*400≤文件尺寸≤2000*2000，支持jpg/png格式，不超过2MB</span>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="特惠券包详情图：" prop="imageBig">
<!--              <el-upload class="avatar-uploader" :action="uploadUrl()" :show-file-list="false"-->
<!--                         :on-success="bigFileSuccess" :before-upload="beforeAvatarUpload">-->
<!--                <img v-if="bundle.imageBig" :src="bundle.imageBig" class="avatar">-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--              </el-upload>-->
              <uploadimg-more :bundle.sync="bundle" @loading="loading" @error="error"></uploadimg-more>
              <span style="color:red">400*400≤文件尺寸≤2000*2000，支持jpg/png格式，不超过2MB</span>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="券包售卖渠道/平台：" prop="platformList">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="bundle.platformList">
              <el-checkbox v-for="(item,index) in platformOptions" :label="index" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="分享：">
          <el-radio-group v-model="bundle.shareFlg">
            <el-radio class="radio" :label="0">可分享</el-radio>
            <el-radio class="radio" :label="1">不可分享</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="规则说明：" prop="description">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="bundle.description"
            ></el-input>
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
import uploadimgMore from "../component/uploadImgMore"

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  props: {
    bundle: {
      type: Object,
      required: true
    },
    load: {
      type: Boolean,
      required: true
    }
  },
  components: {
    uploadImage,
    uploadimgMore
  },
  watch: {
    'bundle.platformList': function (val) {
      +val.length === +this.platformOptionsIndex.length ? this.checkAll = true : this.checkAll = false
    }
  },
  data () {
    let validateImageBig = (rule, value, callback) => {
      if (!this.bundle.imageBigList || this.bundle.imageBigList.length == 0) {
        callback(new Error('请上传详情页缩略图'))
      } else {
        callback()
      }
    }
    return {
      checkAll: false,
      platformOptions: ["小程序", "App", "公众号", "二维码"],
      platformOptionsIndex: [0, 1, 2, 3],
      formRules: {
        // code: [
        //   { required: true, message: "特惠券包CODE不能为空", trigger: "blur" }
        // ],
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
        imageBig: [{ required: true, validator: validateImageBig, trigger: 'blur' }],
        platformList: [
          { type: 'array', required: true, message: '请配置券包售卖渠道/平台', trigger: 'change' }
        ],
        totalLimited: [
          { required: true, message: "单用户限制购买数量不能为空", trigger: "change" }
        ],
      }
    }
  },
  methods: {
    proving () {
      this.bundle.totalLimited = this.bundle.totalLimited.replace(/[^\.\d]/g, '')
      this.bundle.totalLimited = this.bundle.totalLimited.replace('.', '')
    },
    handleCheckAllChange (val) {
      if (val) {
        this.$set(this.bundle, 'platformList', this.platformOptionsIndex)
      } else {
        this.$set(this.bundle, 'platformList', [])
      }
    },
    smallFileSuccess(res, file) {
      this.bundle.imageSmall = res.data;
      setTimeout(() => {
        this.$emit('update:load', false)
      }, 600)
    },
    uploadUrl: function () {
      return `${BASE_URL}/modules/web/common/upload`;
    },
    beforeAvatarUpload (file) {
      this.$emit('update:load', true)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 <= 2;

      if (!isJPG && !isPNG) {
        this.$emit('update:load', false)
        this.$message.error('上传特惠券包图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$emit('update:load', false)
        this.$message.error('上传特惠券包图片大小不能超过 2MB!');
      }
      const isSize = new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = +img.width === +img.height
          if (valid) {
            +img.width >= 400 && +img.width <= 2000 ? resolve() : reject('图片尺寸不符合规范')
          } else {
            reject('图片比例不符合规范')
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, error => {
        this.$emit('update:load', false)
        this.$message.error(error)
        return Promise.reject()
      })
      return (isJPG || isPNG) && isLt2M && isSize;
    },
    loading (val) {
      this.$emit('update:load', val)
    },
    error (val) {
      let errorTitle = ['上传特惠券包图片只能是 JPG/png 格式!', '上传特惠券包图片大小不能超过 2MB!']
      this.$message.error(errorTitle[val])
    }
  }
}
</script>

<style lang="scss">
.bundle-create-form {
  margin: 20px;
  .form-image-item {
    .el-input {
      opacity: 0;
      position: absolute;
    }
  }
  .el-form-item {
    width: 100%;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
