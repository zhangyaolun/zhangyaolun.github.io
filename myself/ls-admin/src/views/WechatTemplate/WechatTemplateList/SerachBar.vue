<template>
  <el-form class="template-msg-query" :inline="true" :model="searchObj" ref="TemplateMsgQuery" label-width="80px">
    <el-form-item label="" prop="searchStr" style="width: 20%">
      <el-input v-model="searchObj.searchStr" placeholder="搜索userBarcode/手机号/userID/openId"></el-input>
    </el-form-item>
    <el-form-item label="发送时间" prop="startTime" style="max-width: 55%">
      <el-col :span="11">
        <el-date-picker type="datetime" placeholder="选择开始时间" v-model="searchObj.startTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center;">至</el-col>
      <el-col :span="11">
        <el-date-picker type="datetime" placeholder="选择结束时间" v-model="searchObj.endTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item style="width: 20%">
      <el-button type="primary" plain @click="search">搜索</el-button>
      <el-button type="primary" @click="$emit('add')">新建发送</el-button>
    </el-form-item>
    <el-form-item prop="pushTemplateName" style="width: 20%">
      <el-select v-model="searchObj.pushTemplateName" placeholder="请选择" @change="selectTemplateType">
        <el-option :label="'全部类型'" :value="null"></el-option>
        <el-option
          v-for="item in TemplateOptions"
          :key="item.id"
          :label="item.templateName"
          :value="item.templateName">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="status">
      <el-select v-model="searchObj.status" placeholder="" @change="selectStatusType">
        <el-option :label="'全部状态'" :value="null"></el-option>
        <el-option
          v-for="(item, index) in statusOptions"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-link type="primary" :underline="false" @click="reset('TemplateMsgQuery')">清空查询条件</el-link>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      searchObj: {
        searchStr: '',
        startTime: '',
        endTime: '',
        pushTemplateName: null,
        status: null
      },
       // 0-未推 1-成功 2-失败
      statusOptions: [
        { value: 0, label: '未推' },
        { value: 1, label: '成功' },
        { value: 2, label: '失败' }
      ],
      TemplateOptions: []
    }
  },
  created () {
    this.$api.promotionTemplateMsg.templateList().then(res => {
      this.TemplateOptions = res.data.list
    }).catch(error => {
      this.$message.error(error.message)
    })
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.searchObj.endTime = ''
      this.$emit('reset')
    },
    search () {
      this.$emit('query', this.searchObj)
    },
    selectTemplateType () {
      this.$emit('query', this.searchObj)
    },
    selectStatusType () {
      this.$emit('query', this.searchObj)
    }
  }
}
</script>

<style lang="scss">
.template-msg-query {
  .el-form-item:first-child {
    .el-form-item__content {
      width: 100%;
    }
  }
  .el-form-item:nth-child(5) {
    margin-left: 80px !important;
  }
}
</style>
