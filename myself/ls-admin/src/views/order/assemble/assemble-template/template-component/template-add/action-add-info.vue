<template>
  <el-card class="box-card action-add-info">
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="190px">
      <el-form-item label="拼团ID：" prop="type" v-if="info.pageType === 'mod' || info.pageType === 'detail'">
        <el-input class="name-input" v-model="info.id" disabled/>
      </el-form-item>
      <el-form-item label="拼团类型：" prop="type">
        <el-radio-group v-model="+info.type" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
          <el-radio :label="1">普通拼团</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拼团名称：" prop="name">
        <el-input class="name-input" v-model="info.name" maxlength="30" placeholder="请输入拼团名称" :disabled="info.pageType === 'detail'"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">拼团名称文字长度不能超过30个字（包含30个）</span>
      </el-form-item>
      <el-form-item label="生效时间：" prop="beginTime">
        <el-col class="useDate">
          <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
        </el-col>
        <el-col class="line useDateLine">至</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" :picker-options="pickerOptions" placeholder="选择结束时间" @change="changeEndTime" :disabled="info.pageType === 'detail'"/>
        </el-col>
      </el-form-item>
      <el-form-item label="参团人数：" prop="peopleNum">
        <el-input class="name-input" v-model="info.peopleNum" placeholder="请输入参团人数" @keyup.native="provingCount" @blur="provingCountBlur" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">请填写2以上的数字（包含2）</span>
      </el-form-item>
      <el-form-item label="拼团有效期：" prop="validTime">
        <el-col class="useDate inputWidth100">
          <el-select v-model="info.dataTime.day" placeholder="请选择" class="elSelect" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
            <el-option
              v-for="(item, index) in 32"
              :key="index"
              :label="index < 10 ? '0' + index : index"
              :value="index < 10 ? '0' + index : index">
            </el-option>
          </el-select>
          <span class="mlr">日</span>
          <el-select v-model="info.dataTime.hour" placeholder="请选择" class="elSelect" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
            <el-option
              v-for="(item, index) in 24"
              :key="index"
              :label="index < 10 ? '0' + index : index"
              :value="index < 10 ? '0' + index : index">
            </el-option>
          </el-select>
          <span class="mlr">时</span>
          <el-select v-model="info.dataTime.minutes" placeholder="请选择" class="elSelect" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
            <el-option
              v-for="(item, index) in 61"
              :key="index"
              :label="index < 10 ? '0' + index : index"
              :value="index < 10 ? '0' + index : index">
            </el-option>
          </el-select>
          <span class="mlr">分</span>
        </el-col>
      </el-form-item>
      <el-form-item label="限购次数：" prop="purchaseLimit">
        <el-input class="name-input" v-model="info.purchaseLimit" placeholder="请输入限购次数" @keyup.native="provingNum('purchaseLimit')" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
        <span class="placeholder" v-if="info.pageType !== 'detail'">请填写1以上的数字（包含1），如果输入0则代表不限购次数</span>
      </el-form-item>
      <el-form-item label="特惠券包ID：" prop="cbBundleModelId">
          <el-input class="expiring-days-input mr" type="text" v-model="info.cbBundleModelId" placeholder="请输入券包ID" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/><!--<span class="mr">例：139</span>-->
          <el-button type="primary" class="mr" size="mini" @click="seachModelId()" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">添加</el-button>
          <span class="mr" v-if="info.cbName">{{info.cbName}}</span>
          <span class="mr errorColor" v-if="info.cbBundleNameError">{{info.cbBundleNameError}}</span>
      </el-form-item>
      <el-form-item label="拼团设置：" prop="cbBundleInfo" class="inputWidth70">
        <el-table :data="info.cbBundleInfo" size="mini">
          <el-table-column label="原价(元)">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.originalPrice" size="mini" placeholder="请输入原价" @input="checkNumber('originalPrice', $event)" :disabled="info.cbName === '' || info.pageType === 'mod' || info.pageType === 'detail'"/>
            </template>
          </el-table-column>
          <el-table-column label="拼团价(元)">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.sellPrice" size="mini" placeholder="请输入拼团价" @input="checkSellPrice('sellPrice', scope.row.originalPrice, $event)" :disabled="info.cbName === '' || info.pageType === 'mod' || info.pageType === 'detail'"/>
            </template>
          </el-table-column>
          <el-table-column label="库存">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.inventoryQty" size="mini" placeholder="请输入库存数量" @input="provingNum('inventoryQty', $event)" :disabled="info.cbName === '' || info.pageType === 'mod' || info.pageType === 'detail'"/>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="拼团活动主图：" prop="imageSmall">
        <upload-img :imageName="'imageSmall'" :imageList.sync="info.imageSmallList" :bundle.sync="info" v-if="info.pageType === 'create' || info.pageType === 'mod'"></upload-img>
        <section v-if="info.pageType === 'detail'">
          <img :src="info.imageSmall" alt="" class="uploadImg" v-if="info.imageSmall"/>
        </section>
        <span class="promptingDefalut" v-if="info.pageType != 'detail'">尺寸为400*400，仅支持JPG/PNG格式，图片要求小于等于2MB</span>
      </el-form-item>
      <el-form-item label="拼团图片：" prop="images">
        <uploadimg-more :bundle.sync="info" v-if="info && info.pageType === 'create' || info.pageType === 'mod'"></uploadimg-more>
        <section v-if="info.pageType === 'detail'">
          <img :src="item" v-for="(item, index) in info.imagesList" :key="index" alt="" class="uploadImg" />
        </section>
        <span class="promptingDefalut" v-if="info.pageType != 'detail'">尺寸为400*400，仅支持JPG/PNG格式，图片要求小于等于2MB，最多可上传5张</span>
      </el-form-item>
      <el-form-item label="是否屏蔽详情页推荐位：" prop="shieldRecommendedPlace">
        <el-radio-group v-model="info.shieldRecommendedPlace" :disabled="info.pageType === 'detail'">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <span class="promptingDefalut">默认选否。否：代表在拼团详情页面显示3个【去参团】推荐位。是：代表在拼团详情页面不显示3个【去参团】推荐位</span>
      </el-form-item>
      <el-form-item label="是否屏蔽活动列表页显示：" prop="isShieldDisplay">
        <el-radio-group v-model="info.isShieldDisplay" :disabled="info.pageType === 'detail'">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <span class="promptingDefalut">默认选否。否：代表在拼团活动列表页可见，在拼团活动详情页可见。是：代表在拼团活动列表页不可见，在拼团活动详情页可见</span>
      </el-form-item>
      <el-form-item label="投放区域：" prop="regionBlockCodeName">
        <el-input class="name-input" v-model="info.regionBlockCodeName" disabled/>
      </el-form-item>
      <el-form-item label="投放平台：" prop="platformList">
        <el-checkbox-group v-model="info.platformList" @change="platformListChange" :disabled="info.pageType === 'detail'">
          <el-checkbox label="小程序"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="form-desc-item inputWidth70" label="规则说明：" prop="description">
        <el-input type="textarea" v-model="info.description" :autosize="{ minRows: 6, maxRows: 40}" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
      <el-form-item label="分享标题：" prop="shareTitle">
        <el-input class="name-input" v-model="info.shareTitle" maxlength="30" placeholder="请输入分享标题" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
      <el-form-item label="分享图片：" prop="shareImage">
        <upload-img :imageName="'shareImage'" :imageList.sync="info.shareImageList" :bundle.sync="info" v-if="info.pageType === 'create' || info.pageType === 'mod'"></upload-img>
        <section v-if="info.pageType === 'detail'">
          <img :src="info.shareImage" alt="" class="uploadImg" v-if="info.shareImage"/>
          <span v-else>暂无设置</span>
        </section>
        <span class="promptingDefalut" v-if="info.pageType !== 'detail'">尺寸为500*400，仅支持JPG/PNG格式，图片要求小于等于2MB</span>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import uploadimgMore from "../uploadImgMore"
import uploadImg from "../uploadImg"
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  components: {
    uploadimgMore,
    uploadImg
  },
  computed: {
    pickerOptions () {
      let _this = this
      return {
        disabledDate (time) {
          if (_this.info.endTimeOld === '') return
          return +time.getTime() <= +_this.info.endTimeOld - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  watch: {
    'info.dataTime': {
      handler: function (val) {
        if (val.day && val.hour && val.minutes) {
          this.info.validTime = (parseInt(val.day) * 24 * 60 * 60 + parseInt(val.hour) * 60 * 60 + parseInt(val.minutes) * 60) * 1000
        }
      },
      immediate: true,
      deep: true
    },
    'info.cbBundleInfo': {
      handler: function (val) {
        this.$set(this.info, 'sellPrice', val[0].sellPrice)
        this.$set(this.info, 'inventoryQty', val[0].inventoryQty)
        this.$set(this.info, 'originalPrice', val[0].originalPrice)
      },
      immediate: true,
      deep: true
    },
    'info.imageBigList': {
      handler: function (val) {
        let _images = ''
        val.forEach(v => {
          _images += v.url + ','
        })
        _images = _images.substring(0, _images.length - 1)
        this.$set(this.info, 'images', _images)
      },
      immediate: true,
      deep: true
    },
    'info.imageSmall': {
      handler: function (val) {
        let _imageSmallList = []
        if (val) {
          _imageSmallList.push({ url: val })
        }
        this.$set(this.info, 'imageSmallList', _imageSmallList)
      },
      immediate: true,
      deep: true
    },
    'info.shareImage': {
      handler: function (val) {
        let _shareImageList = []
        if (val) {
          _shareImageList.push({ url: val })
        }
        this.$set(this.info, 'shareImageList', _shareImageList)
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    let validateTime = (rule, value, callback) => {
      if (this.info.beginTime && this.info.endTime) {
        if (this.info.endTime < this.info.endTimeOld) {
          callback(new Error(`结束时间只可较活动原结束时间延长`))
        } else {
          callback()
        }
      } else {
        callback(new Error('请选择时间'))
      }
    }
    let validateCouponInfo = (rule, value, callback) => {
      if (this.info.sellPrice !== '' && this.info.inventoryQty !== '' && this.info.originalPrice !== '') {
        callback()
      } else {
        callback(new Error('请填写拼团设置'))
      }
    }
    let validateimageSmall = (rule, value, callback) => {
      if (this.info.imageSmall) {
        callback()
      } else {
        callback(new Error('请上传拼团活动主图'))
      }
    }
    let validateimages = (rule, value, callback) => {
      if (this.info.images) {
        callback()
      } else {
        callback(new Error('请上传拼团图片'))
      }
    }
    let validateCbBundleModelId = (rule, value, callback) => {
      if (this.info.cbBundleModelId && this.info.cbName) {
        callback()
      } else {
        if (this.info.cbBundleModelId === '') {
          callback(new Error('请输入券包ID'))
        } else {
          callback(new Error(`请输入${this.$store.getters.regionBlockCodeName}券包ID`))
        }
      }
    }
    return {
      rules: {
        type: [{ required: true, message: '请选择拼团类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入拼团名称', trigger: 'blur' }],
        beginTime: [
          { required: true, validator: validateTime, trigger: 'blur' }
        ],
        peopleNum: [{ required: true, message: '请输入参团人数', trigger: 'blur' }],
        purchaseLimit: [{ required: true, message: '请输入限购次数', trigger: 'blur' }],
        cbBundleModelId: [{ required: true, validator: validateCbBundleModelId, trigger: 'blur' }],
        validTime: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
        cbBundleInfo: [{ required: true, validator: validateCouponInfo, trigger: 'blur' }],
        imageSmall: [{ required: true, validator: validateimageSmall, trigger: 'change' }],
        images: [{ required: true, validator: validateimages, trigger: 'change' }],
        status: [{ required: true }],
        isShieldDisplay: [{ required: true }],
        shieldRecommendedPlace: [{ required: true }],
        region: [{ required: true }],
        platformList: [{ required: true, message: '请选择投放平台', trigger: 'change' }],
        description: [{ required: true, message: '请填写规则说明', trigger: 'blur' }]
      }
    }
  },
  methods: {
    platformListChange (val) {
      val.length > 0 && val[0] === '小程序' ? this.$set(this.info, 'platform', 0) : this.$set(this.info, 'platform', '')
    },
    provingCount () { // 参团输入数字
      if (+this.info.peopleNum.length === 1) {
        this.$set(this.info, 'peopleNum', this.info.peopleNum.replace(/[^1-9]/gi, ''))
      } else {
        this.$set(this.info, 'peopleNum', this.info.peopleNum.replace(/[\D]/gi, ''))
      }
    },
    provingCountBlur () { // 参团人数失去焦点验证
      if (+this.info.peopleNum.length === 1) {
        this.$set(this.info, 'peopleNum', this.info.peopleNum.replace(/[^2-9]/gi, ''))
      } else {
        this.$set(this.info, 'peopleNum', this.info.peopleNum.replace(/[\D]/gi, ''))
      }
    },
    provingNum (name, $event) {
      if (name === 'inventoryQty') {
        if (+$event.length === 1) {
          this.info.cbBundleInfo[0][name] = $event.replace(/[^1-9]/gi, '')
        } else {
          this.info.cbBundleInfo[0][name] = $event.replace(/[\D]/gi, '')
        }
      } else {
        this.$set(this.info, 'purchaseLimit', this.info.purchaseLimit.replace(/[\D]/gi, ''))
      }
    },
    changeStartTime (value) {
      if (this.info.beginTime && this.info.endTime) {
        if (+value >= +this.info.endTime) {
          this.$set(this.info, 'beginTime', '')
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.beginTime && this.info.endTime) {
        if (+value <= +this.info.beginTime) {
          this.$set(this.info, 'endTime', '')
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    getTimes (value) {
      if (!value) return 0
      return parseInt(new Date(value).getTime() / 1000)
    },
    checkNumber (name, $event) { // 拼团价
      if ($event) {
        this.info.cbBundleInfo[0][name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }
    },
    checkSellPrice (name, originalPrice, $event) { // 原价
      if ($event) {
        this.info.cbBundleInfo[0][name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }
      if (+$event > +originalPrice) {
        this.info.cbBundleInfo[0][name] = originalPrice
      }
    },
    seachModelId () {
      if (this.info.cbBundleModelId === '') return false
      this.$store.dispatch('assemble/setLoadingData', true)
      this.info.cbBundleInfo[0].originalPrice = ''
      this.info.cbBundleInfo[0].sellPrice = ''
      this.info.cbBundleInfo[0].inventoryQty = ''
      this.info.cbName = ''
      this.info.cbBundleNameError = ''
      this.$api.assemble.getGiftDetail(this.info.cbBundleModelId).then(res => {
        this.$store.dispatch('assemble/setLoadingData', false)
        let _res = res.data
        if (_res.regionBlockCode !== this.$store.getters.regionBlockCode) {
          this.$message.error(`请输入${this.$store.getters.regionBlockCodeName}券包ID`)
          return false
        }
        this.info.originalPrice = _res.originalPrice
        this.info.cbName = _res.name
        this.info.finishTime = _res.finishTime
        this.info.cbBundleInfo[0].originalPrice = _res.originalPrice
        this.info.cbBundleInfo[0].sellPrice = ''
        this.info.cbBundleInfo[0].inventoryQty = ''
        this.$refs.ruleForm.validateField('cbBundleModelId')
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.error(error.message)
        this.$refs.ruleForm.validateField('cbBundleModelId')
      })
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
    .expiring-days-input{
      width: 140px !important;
    }
  }
</style>
