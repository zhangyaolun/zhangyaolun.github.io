<template>
  <el-card class="box-card add-info" v-loading="loading">
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="类型：" prop="id">
        <el-select v-model="info.id" @change="typeChange">
          <el-option
            v-for="(item, index) in typeList"
            :key="index.id"
            :label="item.pageName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <section>
        <el-form-item
          v-for="(item, index) in pageParamList"
          :key="index"
          :prop="item"
          :label="item === 'regionBlockCode' ? '区域：' : item"
        >
          <el-input class="name-input" v-model="regionBlockCodeName" v-if="item === 'regionBlockCode'" :disabled="item === 'regionBlockCode'"/>
          <el-input class="name-input" v-model="info[item]" v-else placeholder="请输入" :disabled="typeFlag[item] || (item === 'platform' && type === 'couponBundleList')"/>
          <section v-if="item !== 'regionBlockCode' && item !== 'qrCode' && item !== 'platform'" class="inlineBlock">
            <el-button type="primary" size="small" class="ml20px" @click="addClick(item)" v-if="!typeFlag[item]">添加</el-button>
            <el-button type="danger" size="small" class="ml20px" @click="delClick(item)" v-if="typeFlag[item]">删除</el-button>
            <span v-if="typeFlag[item]" class="ml20px promptingDefalut inlineBlock">添加成功</span>
            <span v-if="errorTip" class="ml20px promptingError inlineBlock">数据不存在</span>
          </section>
        </el-form-item>
      </section>

      <el-form-item label="选择城市：" v-show="type === 'newEcProductDetail'" prop="cityId">
        <el-select v-model="info.cityId">
          <el-option
            v-for="(item, index) in cityList"
            :key="index.cityId"
            :label="item.cityName"
            :value="item.cityId"
          />
        </el-select>
        <span class="promptingDefalut">若选择指定城市，则扫码进入指定城市预购详情页；若选择“不选”，则扫码进入详情页后需选择提货城市。</span>
      </el-form-item>
      <el-form-item label="投放渠道：">
        <el-select v-model="info.channel">
          <el-option
          v-for="(item, index) in channelList"
          :key="index.id"
          :label="item.channelName"
          :value="item.channelType"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道id：" prop="channelId">
        <el-input class="name-input" v-model="info.channelId" placeholder="请输入渠道id" @input="provingNum('channelId')"/>
        <span class="placeholder block">支持数字和字母。若已选择投放渠道，则必填渠道id。</span>
      </el-form-item>
      <el-form-item label="下载文件名称：" prop="name">
        <el-input class="name-input" v-model="info.name" placeholder="请输入二维码图片的文件名称"/>
      </el-form-item>
      <el-form-item label="预览：">
        <el-button type="primary" @click="previewClick">生成预览</el-button>
        <section class="previewClick" id="smallQrcode" v-show="config.value">
          <div class="previewClick_url">{{config.value}}</div>
          <vue-qr :text="config.value" :size="config.sizeSamll" :margin="10"></vue-qr>
        </section>
        <section id="bigQrcode">
          <vue-qr :text="config.value" :size="config.sizeBig" :margin="10"></vue-qr>
        </section>
        <section class="codeButton">
          <a :href="config.sizeSamllHref" v-if="config.sizeSamllHref" :download="config.nameSmall" class="el-button">下载二维码(小图)</a>
          <a :href="config.sizeBigHref" v-if="config.sizeBigHref" :download="config.nameBig" class="el-button ml15">下载二维码(大图)</a>
        </section>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  data () {
    let validateCallback = (rule, value, callback) => {
      callback()
    }
    return {
      loading: false,
      errorTip: false,
      regionBlockCodeName: this.$store.getters.regionBlockCodeName,
      typeList: [],
      pageParamList: [],
      channelList: [],
      cityList: [],
      typeFlag: {},
      info: {
        id: '',
        type: '',
        channel: '',
        channelId: '',
        name: '',
        cityId: '',
        qrCode: '',
        platform: ''
      },
      config: {
        nameBig: '',
        nameSmall: '',
        value: '',
        sizeSamll: 300,
        sizeSamllHref: '',
        sizeBig: 1000,
        sizeBigHref: ''
      },
      rules: {
        'id': [{ required: true, message: '请选择类型', trigger: 'blur' }],
        'cityId': [{ required: true, validator: validateCallback, trigger: 'blur' }],
        'regionBlockCode': [{ required: true, validator: validateCallback, trigger: 'blur' }],
        'name': [{ required: true, message: '请输入二维码图片的文件名称', trigger: 'blur' }],
      }
    }
  },
  computed: {
    type () {
      let attrtype = this.typeList.filter(v => {
        return v.id === this.info.id
      })
      return attrtype.length > 0 ? attrtype[0].pageKey : ''
    },
    url () {
      //let defaultUrl = process.env.NODE_ENV === 'development' ? 'https://devlawson.api.yorentick.cn/newQrcodeScanEntry/pageKey=' : 'https://lawsonapp.api.yorentick.cn/newQrcodeScanEntry/pageKey='
      let defaultUrl = 'https://lawsonapp.api.yorentick.cn/newQrcodeScanEntry/pageKey='
      let param = ''
      this.pageParamList.forEach(v => {
        param += `${v}=${this.info[v]}&`
        if (this.type === 'newEcProductDetail') {
          param += `cityId=${this.info.cityId}&`
        }
      })
      param = param.substr(0, param.length - 1)
      return `${defaultUrl}${this.type}&channel=${this.info.channel}&channelId=${this.info.channelId}&${param}`
    }
  },
  created () {
    this.getQRCodeChannelConfig()
    this.getQRcodeTypeConfig()
  },
  methods: {
    provingNum (name) {
      let _val = this.info[name].replace(/[^a-zA-Z0-9]/g, '')
      this.$set(this.info, name, _val !== '' ? _val : '')
    },
    getQRCodeChannelConfig () { // 投放渠道查询
      this.$api.dimensionalBarcode.getQRCodeChannelConfig().then(res => {
        this.channelList = res.data
        this.channelList.unshift({ channelName: '请选择', channelType: '' })
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getQRcodeTypeConfig () { // 类型查询
      this.$api.dimensionalBarcode.getQRcodeTypeConfig().then(res => {
        this.typeList = res.data
        this.jumpDetail()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    seachCityList (commodityId) { // 城市查询
      this.$api.dimensionalBarcode.getCommodityCityList({ commodityId: commodityId }).then(res => {
        this.cityList = res.data
        this.cityList.unshift({ cityName: '请选择', cityId: '' })
      }).catch(error => {
        this.cityList = []
        this.$message.error(error.message)
      })
    },
    typeChange () {
      this.$refs.ruleForm.clearValidate()
      this.pageParamList.forEach(v => {
        if (Object.keys(this.info).some(i => {
          return i === v
        })) {
          delete this.typeFlag[v]
          delete this.info[v]
        }
      })
      this.setPageParamList()
    },
    setPageParamList () {
      let attrSelect = this.typeList.filter(v => {
        return v.pageKey === this.type && v.id === this.info.id
      })
      this.type === 'couponBundleList' && attrSelect[0].pageParam.indexOf('qrCode') > -1 ? this.info.platform = 3 : this.info.platform = ''
      let paramAttr = attrSelect.length > 0 && attrSelect[0].pageParam ? attrSelect[0].pageParam.split('&') : []
      paramAttr.forEach((v, k) => {
        paramAttr[k] = paramAttr[k].substr(0, paramAttr[k].length - 1)
        if (paramAttr[k] === 'regionBlockCode') {
          this.$set(this.info, 'regionBlockCode', this.$store.getters.regionBlockCode)
        }
        if (!Object.keys(this.info).some(i => {
          return i === paramAttr[k]
        })) {
          this.$set(this.info, paramAttr[k], '')
          if (paramAttr[k] !== 'qrCode') {
            this.$set(this.typeFlag, paramAttr[k], false)
          }
        }
        if (!Object.keys(this.rules).some(i => {
          return i === paramAttr[k]
        })) {
          this.rules[paramAttr[k]] = [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      })
      this.pageParamList = paramAttr
    },
    jumpDetail () {
      let queryList = Object.keys(this.$route.query)
      if (queryList.length > 0) {
        let id = ''
        queryList.forEach(v => {
          if (v === 'type') {
            this.typeList.forEach(i => {
              i.pageKey === this.$route.query[v] ? id = i.id : ''
            })
            this.$set(this.info, 'id', id)
          }
          this.$set(this.info, v, this.$route.query[v])
          this.$set(this.typeFlag, v, true)
        })
        this.setPageParamList()
      }
    },
    addClick (id) { // 添加验证
      this.loading = true
      this.$api.dimensionalBarcode.qRcodeVerificationDate({ detailId: this.info[id], datailType: this.type }).then(res => {
        this.typeFlag[id] = true
        this.errorTip = false
        if (this.type === 'newEcProductDetail') this.seachCityList(this.info[id])
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.typeFlag[id] = false
        this.errorTip = true
        this.$message.error(error.message)
      })
    },
    delClick (id) { // 删除验证
      this.info[id] = ''
      this.typeFlag[id] = false
    },
    previewClick () { // 生成预览
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.info.channel && !this.info.channelId) {
          this.$message.error('请输入渠道id')
          valid = false
        }
        if (valid && !this.info.channel && this.info.channelId) {
          this.$message.error('请选择投放渠道')
          valid = false
        }
        let id = ''
        if (valid && Object.keys(this.typeFlag).length > 0 && Object.keys(this.typeFlag).some(v => {
          id = v
          return !this.typeFlag[v]
        })) {
          this.$message.error(`请添加正确的${id}或先点击添加`)
          valid = false
        }
        if (valid) {
          this.config.nameBig = this.info.name + '_big.png'
          this.config.nameSmall = this.info.name + '_small.png'
          this.config.value = this.url
          setTimeout(v => {
            let oQrcodeSamll = document.querySelector('#smallQrcode img')
            this.config.sizeSamllHref = oQrcodeSamll.src
            let oQrcodeBig = document.querySelector('#bigQrcode img')
            this.config.sizeBigHref = oQrcodeBig.src
          }, 100)
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .add-info{
    margin: 20px;
    position: relative;
    .ml20px{margin-left: 20px}
    .el-select{
      width: 300px;
    }
    .el-input{
      width: 300px;
    }
    .placeholder{
      display: block;
      color: #909399;
      font-size: 13px;
    }
    #bigQrcode{
      position: absolute;
      z-index: -1;
    }
    #smallQrcode{
      width: 500px;
      margin-top: 20px;
      border: 1px solid #DCDFE6;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      .previewClick_url{
        line-height: 20px;
        word-wrap:break-word;
        text-align: left;
        margin-bottom: 20px;
      }
    }
    .codeButton{
      width: 500px;
      text-align: center;
      margin-top: 20px;
      .el-button{
        color: #FFFFFF;
        background-color: #1890ff;
        border-color: #1890ff;
      }
      .el-button:nth-child(2){
        margin-left: 70px !important;
      }
    }
  }
</style>
