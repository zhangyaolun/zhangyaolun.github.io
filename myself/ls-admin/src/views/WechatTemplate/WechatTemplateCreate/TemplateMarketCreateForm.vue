<template>
  <el-form class="template-msg-create-form" ref="TemplateMsgCreateFormContent" :model="FormData" :rules="rules" label-width="130px">
    <el-form-item label="推送类型：" prop="type">
      <el-radio-group v-model="FormData.type">
        <el-radio :label="0">小程序卡片</el-radio>
        <el-radio :label="1">图文消息</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标题：" prop="title">
      <el-input class="name-input" v-model="FormData.title" placeholder="请输入推送标题" :maxlength="+FormData.type == 1 ? 30 : 1000"/>
      <span class="promptingDefalut" v-if="+FormData.type === 1">标题文字长度不能超过30个</span>
    </el-form-item>
    <el-form-item label="描述：" prop="desc" v-show="FormData.type === 1">
      <el-input class="name-input" v-model="FormData.desc" placeholder="请输入推送描述" maxlength="60"/>
      <span class="promptingDefalut">描述文字长度不能超过60个</span>
    </el-form-item>
    <el-form-item label="跳转地址：" prop="jumpUrl" v-show="FormData.type !== 1">
      <el-select v-model="FormData.jumpUrl">
        <el-option :label="item.name" :value="item.value" v-for="item in jumpUrlList" :key="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跳转地址：" prop="jumpUrl" v-show="FormData.type === 1">
      <el-input class="name-input" v-model="FormData.jumpUrl" placeholder="请输入跳转地址"></el-input>
    </el-form-item>
    <el-form-item label="有效时间：" prop="startTime">
      <el-col class="useDate">
        <el-date-picker v-model="FormData.startTime" format="yyyy-MM-dd" value-format="timestamp" type="date" placeholder="选择开始时间" @change="changeStartTime"/>
      </el-col>
      <el-col class="line useDateLine">至</el-col>
      <el-col class="useDate">
        <el-date-picker v-model="FormData.endTime" format="yyyy-MM-dd" value-format="timestamp" type="date" placeholder="选择结束时间" @change="changeEndTime"/>
      </el-col>
    </el-form-item>
    <el-form-item label="推送图片：" prop="imageUrl">
      <upload-img :imageName="'imageUrl'"></upload-img>
      <span class="promptingDefalut">尺寸为<span v-if="FormData.type === 0">520*416</span><span v-else>400*400</span>，仅支持JPG/PNG格式，图片要求不超过2MB</span>
    </el-form-item>
  </el-form>
</template>

<script>
import uploadImg from "./uploadImg"
export default {
  components: {
    uploadImg,
  },
  computed: {
    FormData () {
      return this.$store.getters.wechatTemplateMarketForm
    },
    jumpUrlList () {
      let jumpPage = this.$store.state.wechatTemplate.jumpPage
      let attr = []
      Object.keys(jumpPage).forEach(v => {
        attr.push({ name: v, value: jumpPage[v] })
      })
      return attr
    }
  },
  data () {
    let validateTime = (rule, value, callback) => {
      if (this.FormData.startTime && this.FormData.endTime) {
        callback()
      } else {
        callback(new Error('请选择时间'))
      }
    }
    let validateImage = (rule, value, callback) => {
      if (this.FormData.imageUrl) {
        callback()
      } else {
        callback(new Error('请上传推送图片'))
      }
    }
    let validateDescription = (rule, value, callback) => {
      if (this.FormData.type !== 1 || this.FormData.desc) {
        callback()
      } else {
        callback(new Error('请输入推送描述'))
      }
    }
    return {
      rules: {
        type: [{ required: true }],
        title: [{ required: true, message: '请输入推送标题', trigger: 'blur' }],
        desc: [{ required: true, validator: validateDescription, trigger: 'blur' }],
        jumpUrl: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
        startTime: [{ required: true, validator: validateTime, trigger: 'blur' }],
        imageUrl: [{ required: true, validator: validateImage, trigger: 'blur' }],
      }
    }
  },
  watch: {
    FormData: {
      handler (val) {
        if (this.$refs.TemplateMsgCreateFormContent) {
          this.$refs.TemplateMsgCreateFormContent.clearValidate()
        }
      },
      deep: true
    },
    'FormData.type': {
      handler (val, oldval) {
        if (val === oldval) return
        if (val === 1) {
          this.$set(this.FormData, 'jumpUrl', '')
          this.$set(this.FormData, 'title', '')
          this.$set(this.FormData, 'imageUrl', '')
          this.$set(this.FormData, 'mediaKey', '')
        } else {
          this.$set(this.FormData, 'jumpUrl', this.jumpUrlList[0].value)
          this.$set(this.FormData, 'title', '')
          this.$set(this.FormData, 'imageUrl', '')
          this.$set(this.FormData, 'mediaKey', '')
        }
      },
      deep: true
    },
  },
  methods: {
    changeStartTime (value) {
      if (this.FormData.startTime && this.FormData.endTime) {
        if (+value >= +this.FormData.endTime) {
          this.$set(this.FormData, 'startTime', '')
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.FormData.startTime && this.FormData.endTime) {
        if (+value <= +this.FormData.startTime) {
          this.$set(this.FormData, 'endTime', '')
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.template-msg-create-form {
  margin-top: 20px;
  .el-form-item {
    margin-bottom: 22px !important;
  }
  .max-nums-input, .name-input{
    width: 50%;
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
}
</style>
