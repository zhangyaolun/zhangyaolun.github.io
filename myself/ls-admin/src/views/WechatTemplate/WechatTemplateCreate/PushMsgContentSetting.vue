<template>
  <div class="push-msg-content-setting">
    <h2>推送消息内容设置</h2>
    <el-form :model="form" :rules="rules" ref="PushMsgContentSettingContent" class="push-msg-content-setting__content">
      <el-form-item  prop="templateName">
        <el-select v-model="form.templateName" placeholder="请选择模版类型" @change="changeTemplateType">
          <el-option
            v-for="(item, index) in TemplateOptions"
            :key="index"
            :label="item.templateName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-row :gutter="20" v-if="form.templateType !== 3">
          <el-col :span="12">
            <div class="push-msg-content-setting__template-detail">
              <template-msg-detail-form :template-msg-detail="TemplateMsgDetail" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="push-msg-content-setting__template-form">
              <template-msg-create-form ref="TemplateMsgCreateForm" :form-data="TemplateMsgDetail" />
            </div>
          </el-col>
        </el-row>
        <el-row v-if="form.templateType === 3">
          <el-col :span="17">
            <div>
              <template-market-create-form ref="TemplateMsgCreateForm"/>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TemplateMarketCreateForm from './TemplateMarketCreateForm.vue'
import TemplateMsgCreateForm from './TemplateMsgCreateForm.vue'
import TemplateMsgDetailForm from './TemplateMsgDetailForm.vue'
export default {
  components: {
    TemplateMarketCreateForm,
    TemplateMsgCreateForm,
    TemplateMsgDetailForm
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      TemplateOptions: [],
      TemplateMsgDetail: []
    }
  },
  watch: {
    TemplateMsgDetail: {
      handler (val) {
        let obj = {}
        let arr = []
        val.forEach(ele => {
          obj[ele.fieldName] = ele[ele.fieldName]
        })
        arr.push(obj)
        this.form.content = JSON.stringify(arr)
      },
      deep: true
    }
  },

  created () {
    this.fetchTemplateList()
  },
  methods: {
    fetchTemplateList () {
      this.$api.promotionTemplateMsg.templateList().then(res => {
        this.TemplateOptions = res.data.list
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    fetchTemplateDetal (id) {
      this.$api.promotionTemplateMsg.templateDetail({ id: id }).then(res => {
        res.data.list.forEach(ele => {
          ele[ele.fieldName] = ''
        })
        this.TemplateMsgDetail = res.data.list
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    changeTemplateType (currentVal) {
      const index = this.TemplateOptions.findIndex(ele => ele.id === currentVal)
      this.form.templateId = currentVal
      this.form.templateName = this.TemplateOptions[index].templateName
      this.form.templateType = this.TemplateOptions[index].type
      if (this.form.templateType === 3) {
        this.$store.dispatch('wechatTemplate/setJumpPage', this.TemplateOptions[index].jumpPage)
        this.$store.dispatch('wechatTemplate/restMarketFormData')
      } else {
        this.fetchTemplateDetal(currentVal)
      }
      this.form.uploadFileName = []
    }
  }
}
</script>

<style lang="scss" scoped>
.push-msg-content-setting {
  padding-bottom: 20px;
}
</style>
