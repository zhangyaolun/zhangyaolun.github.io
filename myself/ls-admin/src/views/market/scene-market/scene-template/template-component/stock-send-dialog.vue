<template>
  <el-dialog class="sceneMarket-dialog" :title="title[type]" :visible.sync="dialogFormVisible" @close="close('infoForm')">
    <el-form :model="info" label-width="100px" ref="infoForm" :rules="rules">
      <section v-if="type === 0">
        <el-form-item label="标题:" prop="wechatNewsInfo.title">
          <el-input v-model="info.wechatNewsInfo.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="自定义描述:" prop="wechatNewsInfo.customDescription">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="info.wechatNewsInfo.customDescription" placeholder="单条短信限制64个字(含签名)，超出后将多条短信发送。"></el-input>
        </el-form-item>
        <el-form-item label="缩略图:" prop="wechatNewsInfo.thumbnailImgUrl">
          <upload-img :imageName="'wechatNewsInfo.thumbnailImgUrl'"></upload-img>
          <span class="placeholder">请上传尺寸=宽度500px*高度400px，不超过2MB，支持JPG、PNG、JPEG格式</span>
        </el-form-item>
      </section>
      <section v-if="type === 1">
        <el-form-item label="标题:" prop="wechatTemplateInfo.title">
          <el-input v-model="info.wechatTemplateInfo.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="服务项目:" prop="wechatTemplateInfo.serveProject">
          <el-input v-model="info.wechatTemplateInfo.serveProject" placeholder="请输入服务项目" />
        </el-form-item>
        <el-form-item label="服务时间:" prop="wechatTemplateInfo.serveTime">
          <el-date-picker v-model="info.wechatTemplateInfo.serveTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择服务时间" @change="changeEndTime"/>
        </el-form-item>
        <el-form-item label="店面地址:" prop="wechatTemplateInfo.shopAddress">
          <el-input v-model="info.wechatTemplateInfo.shopAddress" placeholder="请输入店面地址" />
        </el-form-item>
        <el-form-item label="联系电话:" prop="wechatTemplateInfo.contactPhone">
          <el-input v-model="info.wechatTemplateInfo.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="备注:" prop="wechatTemplateInfo.content">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="info.wechatTemplateInfo.content" placeholder="请输入备注"></el-input>
        </el-form-item>
      </section>
      <section v-if="type === 2">
        <el-form-item label="活动名称:" prop="minaSubscribeInfo.activityName">
          <el-input v-model="info.minaSubscribeInfo.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动开始:" prop="minaSubscribeInfo.activityStartTime">
          <el-date-picker v-model="info.minaSubscribeInfo.activityStartTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime"/>
        </el-form-item>
        <el-form-item label="活动截止:" prop="minaSubscribeInfo.activityEndTime">
          <el-date-picker v-model="info.minaSubscribeInfo.activityEndTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime"/>
        </el-form-item>
        <el-form-item label="活动内容:" prop="minaSubscribeInfo.activityContent">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" maxlength="20" v-model="info.minaSubscribeInfo.activityContent" placeholder="请输入活动内容,最多20个字"></el-input>
        </el-form-item>
      </section>
      <section v-if="type === 3">
        <el-form-item label="短信:" prop="smsInfo.content">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="info.smsInfo.content" placeholder="单条短信限制64个字(含签名)，超出后将多条短信发送。"></el-input>
        </el-form-item>
        <el-form-item label="签名:">
          [罗森点点]
        </el-form-item>
      </section>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('infoForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm('infoForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import uploadImg from './uploadImg'
import { checkTel } from '@/filters/index'
export default {
  components: {
    uploadImg,
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  computed: {
    info () {
      return this.$store.getters.sceneMarketInfo
    },
    templateMsgObj () {
      return this.$store.state.sceneMarket.templateMsgObj
    }
  },
  data () {
    let validateContactPhone = (rule, value, callback) => {
      if (this.info.wechatTemplateInfo.contactPhone === '') {
        callback(new Error('请输入联系电话'))
      } else {
        if (checkTel(this.info.wechatTemplateInfo.contactPhone)) {
          callback(new Error('号码格式不正确或者位数不正确'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogFormVisible: false,
      title: {
        0: '公众号图文',
        1: '公众号模版消息',
        2: '小程序活动通知',
        3: '短信'
      },
      rules: {
        'wechatNewsInfo.title': [{ required: true, message: '请输入标题', trigger: 'blur' }],
        'wechatNewsInfo.customDescription': [{ required: true, message: '请输入自定义描述', trigger: 'blur' }],
        'wechatNewsInfo.thumbnailImgUrl': [{ required: true, message: '请上传缩略图', trigger: 'blur' }],
        'wechatTemplateInfo.title': [{ required: true, message: '请输入标题', trigger: 'blur' }],
        'wechatTemplateInfo.serveProject': [{ required: true, message: '请输入服务项目', trigger: 'blur' }],
        'wechatTemplateInfo.serveTime': [{ required: true, message: '请选择服务时间', trigger: 'blur' }],
        'wechatTemplateInfo.shopAddress': [{ required: true, message: '请输入店面地址', trigger: 'blur' }],
        'wechatTemplateInfo.contactPhone': [{ required: true, validator: validateContactPhone, trigger: 'blur' }],
        'wechatTemplateInfo.content': [{ required: true, message: '请输入备注', trigger: 'blur' }],
        'minaSubscribeInfo.activityName': [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        'minaSubscribeInfo.activityStartTime': [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        'minaSubscribeInfo.activityEndTime': [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
        'minaSubscribeInfo.activityContent': [{ required: true, message: '请输入活动内容', trigger: 'blur' }],
        'smsInfo.content': [{ required: true, message: '请输入短信内容', trigger: 'blur' }],
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    checkNumber (name, $event) {
      if ($event) {
        this.info.wechatTemplateInfo[name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || ''
      }
    },
    changeStartTime (value) {
      if (this.info.minaSubscribeInfo.activityEndTime) {
        if (+value > this.info.minaSubscribeInfo.activityEndTime) {
          this.info.minaSubscribeInfo.activityStartTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.minaSubscribeInfo.activityStartTime) {
        if (+value < this.info.minaSubscribeInfo.activityStartTime) {
          this.info.minaSubscribeInfo.activityEndTime = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    close (formName) {
      this.$refs[formName].clearValidate()
      this.$emit('update:visible', false)
    },
    cancle (formName) {
      this.$refs[formName].clearValidate()
      this.$emit('update:visible', false)
    },
    comfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('comfirm')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sceneMarket-dialog {
  .placeholder{
    display: block;
    color: #909399;
    font-size: 12px;
  }
}
</style>
