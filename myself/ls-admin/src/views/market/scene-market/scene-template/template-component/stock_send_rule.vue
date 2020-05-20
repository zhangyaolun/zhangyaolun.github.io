<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">通知配置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <div class="customerTable">
        <customer-table :type="'send'" v-if="info.customerSegmentInfoList.length > 0"></customer-table>
      </div>
      <div class="templateMsg clearfix" v-if="info.checkedList.length > 0 && info.pageType !== 'detail'">
        <section class="templateMsg_main left" v-for="item in info.checkedList" :key="item">
          <div class="templateMsg_title">{{templateMsgObj[item].title}}</div>
          <div class="templateMsg_tip">{{templateMsgObj[item].tip}}</div>
          <el-button type="primary" icon="el-icon-edit" @click="msgClick(item)">编辑模版消息</el-button>
        </section>
      </div>
      <msg-detail v-if="info.pageType === 'detail'"></msg-detail>
      <el-form-item label="发放权益，通知时间：" prop="baseInfo.notifyTime" class="ml180">
        每天
        <el-time-picker
          size="small"
          class="mlr10"
          format='HH:mm'
          value-format="timestamp"
          placeholder="选择时间"
          :disabled="info.pageType === 'detail'"
          v-model="info.baseInfo.notifyTime"
          :picker-options="{
            selectableRange: '07:00:00 - 19:00:00'
          }">
        </el-time-picker>
        开始发送通知
        <span class="placeholder block">为避免骚扰用户，限制通知时间范围 07:00-19:00</span>
      </el-form-item>
      <el-form-item label="" prop="status" v-if="info.pageType === 'create'">
        <el-radio-group v-model="info.baseInfo.status" :disabled="info.pageType === 'detail'">
          <el-radio :label="'PUBLISHED'">公开</el-radio>
          <el-radio :label="'CREATED'">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <send-dialog ref="sendDialog" :visible.sync="dialogVisible" :type="type" @comfirm="comfirm" v-if="info.pageType !== 'detail'"/>
  </el-card>
</template>

<script>
import customerTable from './customer-table'
import sendDialog from './stock-send-dialog'
import msgDetail from './stock-send-msgDetail'
export default {
  components: {
    customerTable,
    sendDialog,
    msgDetail
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
    return {
      dialogVisible: false,
      type: 0,
      rules: {
        'baseInfo.notifyTime': [{ required: true, message: '请选择通知时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    msgClick (type) {
      this.type = type
      this.dialogVisible = true
    },
    comfirm () {
      this.dialogVisible = false
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .ml180{margin-left: 180px;}
    .mlr10{margin: 0 10px;}
    .customerTable{
      margin: 0 100px 40px 180px;
    }
    .el-input{
      display: inline-block;
      width: 130px !important;
    }
    .templateMsg{
      width: 700px;
      margin-left: 180px;
      .templateMsg_main{
        position: relative;
        width: 330px;
        height: 140px;
        line-height: 20px;
        padding: 10px;
        margin-right: 20px;
        margin-bottom: 30px;
        border: 1px solid #e6ebf5;
        border-radius: 5px;
        font-size: 14px;
        .templateMsg_title{
          line-height: 30px;
        }
        .templateMsg_tip{
          color: #909399;
          font-size: 13px;
        }
        .el-button{
          position: absolute;
          left: 10px;
          bottom: 10px;
          width: 310px;
        }
      }
    }
  }
</style>
