<template>
  <el-card class="wechat-template-create" v-loading="loading">
    <push-msg-content-setting ref="PushMsgContentSetting" :form.sync="form" :rules="rules" />
    <push-object-setting ref="PushObjectSetting" :form.sync="form" :rules="rules" :loading.sync="loading" v-show="form.templateType !== 3"/>
    <action-btn @submit="submit" />
  </el-card>
</template>

<script>
import PushMsgContentSetting from './PushMsgContentSetting.vue'
import PushObjectSetting from './PushObjectSetting.vue'
import ActionBtn from './ActionBtn.vue'
import { formatBackendTime } from '@/filters'

export default {
  components: {
    PushMsgContentSetting,
    PushObjectSetting,
    ActionBtn
  },
  computed: {
    loading () {
      return this.$store.getters.wechatTemplateLoading
    },
    marketForm () {
      return this.$store.getters.wechatTemplateMarketForm
    }
  },
  data () {

    const validateTimeType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置推送时间类型'))
      } else if (value === 1) {
        this.$refs['PushObjectSetting'].$refs['PushObjectSettingContent'].validateField('pushTime')
        callback()
      } else {
        this.$refs['PushObjectSetting'].$refs['PushObjectSettingContent'].clearValidate('pushTime')
        callback()
      }
    }

    const validateTime = (rule, value, callback) => {
      if (this.form.pushTimeType === 1) {
        if (value === '') {
          callback(new Error('请选择推送时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      form: {
        templateName: '',
        templateType: '',
        templateId: '',
        uploadFileName: [],
        content: '',
        pushActivityKey: '',
        pushTimeType: '',
        pushTime: '',
        pushTimeImmediate: '',
      },
      rules: {
        templateName: [
          { required: true, message: '请选择模版类型', trigger: 'change' }
        ],
        pushActivityKey: [
          { required: true, message: '请导入名单', trigger: 'change' }
        ],
        pushTime: [
          { validator: validateTime, trigger: 'blur' }
        ],
        pushTimeType: [
          { required: true, validator: validateTimeType, trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.$store.dispatch('wechatTemplate/setLoadingData', false)
  },
  methods: {
    submit () {
      let flag1 = false
      let flag2 = false

      this.$refs['PushMsgContentSetting'].$refs['PushMsgContentSettingContent'].validate((valid) => {
        if (valid) {
          this.$refs['PushMsgContentSetting'].$refs['TemplateMsgCreateForm'].$refs['TemplateMsgCreateFormContent'].validate(validInner => {
            if (validInner) {
              flag1 = true
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })

      if (this.form.templateType !== 3) {
        this.$refs['PushObjectSetting'].$refs['PushObjectSettingContent'].validate((valid) => {
          if (valid) {
            flag2 = true
          } else {
            return false
          }
        })
        if (flag1 && flag2) {
          this.confirm('create')
        }
      } else {
        if (flag1) {
          this.confirm('creatMarket')
        }
      }
    },
    confirm (type) {
      this.$confirm('确认提交吗？')
        .then(_ => {
          type === 'create' ? this.create() : this.creatMarket()
        })
        .catch(_ => {})
    },
    create () {
      this.$store.dispatch('wechatTemplate/setLoadingData', true)
      let obj = Object.assign({}, this.form)
      delete obj.templateName
      if (obj.pushTimeType === 0) {
        obj.pushTime = obj.pushTimeImmediate
      }
      delete obj.pushTimeImmediate
      delete obj.pushTimeType
      delete obj.templateType
      delete obj.uploadFileName
      this.$api.promotionTemplateMsg.create(obj).then(res => {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$message.success('创建成功')
        this.$router.push({ path: '/backend/wechat-template-msg/list' })
      }).catch(error => {
        this.$message.error(error.message)
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
      })
    },
    creatMarket () { // 营销推送创建
      let obj = Object.assign({}, this.marketForm)
      obj.startTime = formatBackendTime(obj.startTime, '{y}-{m}-{d}')
      obj.endTime = formatBackendTime(obj.endTime, '{y}-{m}-{d}')
      delete obj.type
      delete obj.imageUrl
      this.$store.dispatch('wechatTemplate/setLoadingData', true)
      this.$api.promotionTemplateMsg.addMarketMsgActivity({ msgType: this.marketForm.type, content: JSON.stringify(obj) }).then(res => {
        this.$message.success('创建成功')
        this.$router.push({ path: '/backend/wechat-template-msg/list' })
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
      }).catch(error => {
        this.$message.error(error.message)
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wechat-template-create {
  margin: 20px;
}
</style>
