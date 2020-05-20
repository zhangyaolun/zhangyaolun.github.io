<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="200px">
      <el-form-item label="投放区域：" prop="unionArr" >
        <el-checkbox v-model="checkAll" class="checkAllCity" @change="handleCheckAllChange">罗森</el-checkbox>
        <el-checkbox-group v-model="info.unionArr" class="checkItemCity" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in cities" :label="item.regionBlockCode" :key="item.id">{{item.regionBlockName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="应用类型：" prop="apType">
        <el-radio-group v-model="info.apType">
          <el-radio key="0" label="0">APP应用</el-radio>
          <el-radio key="1" label="1">小程序应用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告标题：" prop="title">
        <el-input class="name-input" v-model="info.title" placeholder="请输入广告标题"/>
        <span class="promptingDefalut">例：商品促销活动</span>
      </el-form-item>
      <el-form-item label="显示位置区分：" prop="displayType">
        <el-select v-model="info.displayType" placeholder="请选择显示位置区分" @change="activityUnicomChange">
          <el-option
            v-for="item in displayTypeList"
            v-if="item.displayType"
            :key="item.displayType"
            :label="item.displayName"
            :value="item.displayType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="banner类型：" prop="locationFlg" v-if="info.displayType=='appHomePopScreenAd'||
      info.displayType=='minaHomeActivityAd'||
      info.displayType=='minaHomeExtendAd'||
      info.displayType=='minaHomePopScreenAd'">
        <el-radio-group v-model="info.locationFlg">
          <el-radio key="大" label="0">大</el-radio>
          <el-radio key="小" label="1">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="banner类型：" prop="locationFlg" v-if="info.displayType=='appDiscoverActivityAd'||
      info.displayType=='appHomeActivityAd'">
        <el-radio-group v-model="info.locationFlg">
          <el-radio key="大" label="0">大</el-radio>
          <el-radio key="中" label="1">中</el-radio>
          <el-radio key="小" label="2">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="banner类型：" prop="locationFlg" v-if="info.displayType=='appDiscoverTopAd'">
        <el-radio-group v-model="info.locationFlg">
          <section class="mtb20" v-for="item in locationFlgList">
            <el-radio
              v-for="items in item.locationFlg"
              :key="items.value"
              :label="items.value" class="locationFlgRadio">{{items.name}}</el-radio>
          </section>
        </el-radio-group>
        <a href="javascript:" @click="dialogVisible = true" class="locationFlgA">广告位说明</a>
        <dia-log :visible.sync="dialogVisible"></dia-log>
      </el-form-item>
      <el-form-item label="广告图片：" prop="imagePath">
        <upload-img :imageName="'imagePath'"></upload-img>
        <span class="promptingDefalut">{{info.imageSize}}</span>
      </el-form-item>
<!--      为保证图片清晰度，请上传尺寸=宽度800px*高度不限，大小在2MB以下，格式=JPG,JPEG,PNG的图片文件-->

<!--      appHomeTopAd 新app/首页/topBanner(800*320)-->
<!--      appHomeActivityAd 新app/首页/点点活动(大702*142,中346*138,小227*160)-->
<!--      appHomeOuterAd 新app/首页/定时推介商品(346*227)-->
<!--      appHomeExtendAd 新app/首页/小banner(702*142)-->
<!--      appHomePopScreenAd 新app/首页/弹屏广告(大630*700,小104*104)-->
<!--      appDiscoverTopAd 新app/发现/顶部广告(横702*142,竖346*286,半346*138)-->
<!--      appDiscoverActivityAd 新app/发现/点点活动(大702*142,中346*138,小227*160)-->
<!--      appActivityTopAd 新app/会员活动/顶部广告(800*320)-->
<!--      appProfileAd 新app/我的/小banner(702*142)-->

    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import diaLog from "./dialog"
export default {
  components: {
    uploadImg,
    diaLog
  },
  computed: {
    info () {
      return this.$store.getters.pltadminBannerInfo
    },
  },
  data () {
    let valdisplayUnionArr = (rule, value, callback) => {
      if (+this.info.unionArr.length === 0) {
        callback(new Error('请选择投放区域'))
      } else {
        callback()
      }
    }
    return {
      checkAll: true,
      cities: this.$store.state.pltadminBanner.COMPANYDATA.REGIONDATA.REGION,
      displayTypeList: [],
      displayTypeListApType1: [],
      locationFlgList: [
        { locationFlg: [{ 'name': '横-横1', 'value': 11 }] },
        { locationFlg: [{ 'name': '半半-半1 ', 'value': 21 }, { 'name': '半半-半2 ', 'value': 22 }] },
        { locationFlg: [{ 'name': '横横-横1', 'value': 31 }, { 'name': '横横-横2', 'value': 32 }] },
        { locationFlg: [{ 'name': '竖竖-竖1', 'value': 61 }, { 'name': '竖竖-竖2', 'value': 62 }] },
        { locationFlg: [{ 'name': '竖半半-竖1', 'value': 71 }, { 'name': '竖半半-半1', 'value': 72 }, { 'name': '竖半半-半2', 'value': 73 }] },
        { locationFlg: [{ 'name': '半半半半-半1', 'value': 91 }, { 'name': '半半半半-半2', 'value': 92 }, { 'name': '半半半半-半3', 'value': 93 }, { 'name': '半半半半-半4', 'value': 94 }] }
      ],
      URLlist: [],
      imageSizeObj: {},
      dialogVisible: false,
      rules: {
        'unionArr': [{ required: true, validator: valdisplayUnionArr, trigger: 'blur' }],
        'apType': [{ required: true }],
        'title': [{ required: true, message: '请输入广告标题', trigger: 'blur' }],
        'displayType': [{ required: true, message: '请选择显示位置区分', trigger: 'blur' }],
        'locationFlg': [{ required: true }],
        'imagePath': [{ required: true, message: '请上传广告图片', trigger: 'blur' }],
      }
    }
  },
  watch: {
    'info.apType' (val) {
      this.info.displayType = ''
      if (+val === 1) {
        this.displayTypeList = this.displayTypeListApType1
        this.initSelectData(1, 1)
      } else {
        this.displayTypeList = this.$store.state.pltadminBanner.displayTypeList
        this.initSelectData(0, 1)
      }
    },
    'info.displayType' (val) {
      let attr = this.displayTypeList.filter(v => {
        return v.displayType === this.info.displayType
      })
      if (attr.length > 0) {
        let item = Object.assign({}, attr[0])
        item.isSizeNum ? this.$set(this.info, 'imageSize', item.sizeList) : (this.imageSizeObj = item.sizeList, this.$set(this.info, 'imageSize', item.sizeList[Object.keys(item.sizeList)[0]]))
      }
    },
    'info.locationFlg' (val) {
      let key = ''
      if (this.info.displayType === 'appHomePopScreenAd' ||
        this.info.displayType === 'minaHomeActivityAd' ||
        this.info.displayType === 'minaHomeExtendAd' ||
        this.info.displayType === 'minaHomePopScreenAd') {
        val === 0 ? key = '大' : key = '小'
      } else if (this.info.displayType === 'appDiscoverActivityAd' ||
        this.info.displayType === 'appHomeActivityAd') {
        val === 0 ? key = '大' : val === 1 ? key = '中' : key = '小'
      } else if (this.info.displayType === 'appDiscoverTopAd') {
        this.locationFlgList.forEach(v => {
          v.locationFlg.forEach(m => {
            if (m.value === val) key = m.name.substring(0, 1)
          })
        })
      }
      console.log(this.imageSizeObj)
      console.log(key)
      this.$set(this.info, 'imageSize', this.imageSizeObj[key])
    }
  },
  created () {
    this.initSelectData(1, 0)
    this.displayTypeList = this.$store.state.pltadminBanner.displayTypeList
    this.initSelectData(0, 1)
  },
  methods: {
    activityUnicomChange (val) {
      val === 'appDiscoverTopAd' ? this.info.locationFlg = 11 : this.info.locationFlg = '0'
    },
    handleCheckAllChange (val) {
      this.info.unionArr = val ? ['sh-lawson', 'bj-lawson', 'dl-lawson', 'wh-lawson', 'cq-lawson', 'ah-lawson', 'cs-lawson', 'sy-lawson'] : []
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
    },
    initSelectData (apType, locationFlg) {
      this.$api.pltadminBanner.initSelectData({ apType: apType, locationFlg: locationFlg }).then(res => {
        if (+apType === 1 && +locationFlg === 0) {
          this.displayTypeListApType1 = res.data
          let sizeAttr = []
          this.displayTypeListApType1.forEach(v => {
            sizeAttr = v.displayName.substring(+v.displayName.indexOf('(') + 1, v.displayName.length - 1).split(',')
            v.isSizeNum = /[0-9]/.test(sizeAttr[0].substring(0, 1))
            if (v.isSizeNum) {
              v.sizeList = sizeAttr
            } else {
              let obj = {}
              sizeAttr.forEach(m => {
                obj[m.substring(0, 1)] = m.substring(1, m.length)
              })
              v.sizeList = obj
            }
          })
        } else if (+locationFlg === 1) {
          this.URLlist = res.data
        }
      }).catch(error => {})
    },
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .mtb20{margin: 20px 0}
    .checkAllCity{
      display: inline-block;
      width: 100px;
      height: 60px;
      border: 1px solid #e6ebf5;
      text-align: center;
      line-height: 60px;
    }
    .checkItemCity{
      display: inline-block;
      height: 60px;
      line-height: 60px;
      border: 1px solid #e6ebf5;
      border-left: 0;
      padding: 0 10px;
    }
    .locationFlgRadio{
      display: inline-block;
      width: 100px;
    }
    .locationFlgA{
      display: block;
      width: 100px;
      text-decoration: underline;
      color: red;
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
    .el-select {
      width: 40%;
      .el-input {
        width: 100%;
      }
    }
    .max-nums-input, .name-input {
      width: 40%;
      margin-right: 10px;
    }
    .couponBackgroundImage{
      width: 25%;
      text-align: center;
    }
    .placeholder{
      display: block;
      color: #909399;
      font-size: 13px;
      height: 20px;
      margin-bottom: 20px;
    }
  }
</style>
