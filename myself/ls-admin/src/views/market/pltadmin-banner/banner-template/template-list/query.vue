<template>

  <el-collapse accordion @change="handleChange" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">广告检索 <span class="placeholder">(点击{{collapseTitle}})</span></template>
      <el-card class="box-card query">
        <el-form :model="info" label-width="140px" ref="QueryForm">
          <el-form-item label="广告ID：" prop="id">
            <el-input
              v-model="info.id"
              placeholder="请输入广告ID"
            />
          </el-form-item>
          <el-form-item label="广告标题：" prop="title">
            <el-input
              v-model="info.title"
              placeholder="请输入广告标题"
            />
          </el-form-item>
          <el-form-item label="广告显示位置区分：" prop="displayType">
            <el-select v-model="info.displayType" placeholder="请选择"  >
              <el-option
                v-for="item in displayTypeOptions"
                :key="item.displayType"
                :label="item.displayName"
                :value="item.displayType"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="跳转方式：" prop="redirectType">
            <el-radio-group v-model="info.redirectType">
              <el-radio
                v-for="item in redirectTypeOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="对象会员：" prop="userFlg">
            <el-radio-group v-model="info.userFlg">
              <el-radio
                v-for="item in userFlgOptions"
                :key="item.value"
                :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布区分：" prop="bannerType">
            <el-radio-group v-model="info.bannerType">
              <el-radio
                v-for="item in bannerTypeOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公开状态：" prop="openFlg">
            <el-radio-group v-model="info.openFlg">
              <el-radio
                v-for="item in openFlgOptions"
                :key="item.value"
                :label="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公开时间：" prop="from_time">
            <el-col :span="11">
              <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.endTime" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('QueryForm')">重置</el-button>
            <el-button type="primary" @click="queryList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-collapse-item>
  </el-collapse>

</template>

<script>
import { formatBackendTime } from '@/filters'
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeNames: [],
      collapseTitle: '展开',
      redirectTypeOptions: [
        { label: 'app内部画面', value: 0 },
        { label: '内部浏览器或其他', value: 1 },
        { label: '外部链接', value: 2 },
        { label: '全部', value: 3 }
      ],
      userFlgOptions: [
        { label: '本地全部会员', value: 0 },
        { label: '本地分类', value: 1 },
        { label: '指定会员', value: 2 },
        { label: '全部', value: 3 }
      ],
      bannerTypeOptions: [
        { label: '平台', value: 0 },
        { label: '商家', value: 1 },
        { label: '全部', value: 2 }
      ],
      openFlgOptions: [
        { label: '公开', value: 0 },
        { label: '不公开', value: 1 },
        { label: '全部', value: 2 }
      ]
    }
  },
  computed: {
    displayTypeOptions () {
      return this.$store.getters.pltadminBannerDisplayTypeList
    }
  },
  created () {
    let _seachData = this.$store.getters.pltadminBannerTemplateQueryData
    if (_seachData) {
      let _falg = false
      Object.keys(_seachData).forEach(key => {
        if (key !== 'page' && key !== 'pageSize' && key !== 'regionBlockCode' && key !== 'sort' && key !== 'sortBy' && (_seachData.redirectType != 3 || _seachData.userFlg != 3 || _seachData.bannerType != 2 || _seachData.openFlg != 2)) {
          _falg = true
        }
      })
      _falg ? this.activeNames = ['1'] : this.activeNames = []
    } else {
      this.activeNames = []
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.endTime) {
        if (value > this.info.endTime) {
          this.info.beginTime = ''
          this.$message.error('开始时间要小于或等于结束时间')
        }
      }
      value ? this.info.openBeginDtStr = formatBackendTime(value, '{y}{m}{d}') + '000000' : this.info.openBeginDtStr = ''
    },
    changeEndTime (value) {
      if (this.info.beginTime) {
        if (value < this.info.beginTime) {
          this.info.endTime = ''
          this.$message.error('结束时间要大于或等于开始时间')
        }
      }
      value ? this.info.openEndDtStr = formatBackendTime(value, '{y}{m}{d}') + '235959' : this.info.openEndDtStr = ''
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.beginTime = ''
      this.info.endTime = ''
      this.info.openBeginDtStr = ''
      this.info.openEndDtStr = ''
      this.$emit('reset')
    },
    queryList () {
      if (this.info.beginTime && !this.info.endTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.beginTime && this.info.endTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
    },
    handleChange (val) {
      val ? this.collapseTitle = '收起' : this.collapseTitle = '展开'
    }
  }
}
</script>

<style lang="scss" scoped>
.query{
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 100%;
      margin-bottom: 10px;

      &:nth-child(1),&:nth-child(2),&:nth-child(3){
        flex-basis: 60%;
        .el-select,.el-input {
          width: 60%;
        }
      }
      &:nth-last-child(2){
        flex-basis: 66%;
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100%;
        }
        .line{
          text-align: center;
        }
      }
      &:last-child{
        flex-basis: 100%;
      }
    }
  }
}
</style>
