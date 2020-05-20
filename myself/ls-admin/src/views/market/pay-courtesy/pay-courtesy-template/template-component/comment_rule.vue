<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">其他设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px" class="appid">
      <el-form-item label="发券模式：" prop="otherInfo.deliveryUserCategory">
        <el-radio-group v-model="info.otherInfo.deliveryUserCategory" :disabled="info.pageType === 'detail'">
          <el-radio :label="'DELIVERY_ALL_PERSON'">所有用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择商户" prop="otherInfo.deliveryUserCategory" v-if="info.otherInfo.deliveryUserCategory === 'DELIVERY_MEMBER_PERSON'">
        <el-select v-model="info.otherInfo.merchantName" disabled>
          <el-option v-for="item in info.otherInfo.merchantNameData" :key="item.mchId + Math.random()" :label="item.mchName" :value="item.mchId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发券商户" prop="merchantListSelect">
        <el-select v-model="info.merchantListSelect" multiple placeholder="请选择" disabled>
          <el-option
            v-for="item in info.otherInfo.merchantListData"
            :key="item.mchId + Math.random()"
            :label="item.mchName"
            :value="item.mchId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.payCourtesyInfo
    }
  },
  watch: {
    'info.merchantListSelect': {
      handler: function (val) {
        this.info.otherInfo.merchantList = []
        this.info.otherInfo.merchantListData.forEach(v => {
          val.forEach(m => {
            if (v.mchId === m) {
              this.info.otherInfo.merchantList.push(v)
            }
          })
        })
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    let validateMerchantList = (rule, value, callback) => {
      if (this.info.merchantListSelect.length > 0) {
        callback()
      } else {
        callback(new Error('请选择发券商户'))
      }
    }
    return {
      rules: {
        'otherInfo.deliveryUserCategory': [{ required: true }],
        'merchantListSelect': [{ required: true, validator: validateMerchantList, trigger: 'change' }]
      }
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
    .appid{
      .el-input{
        width: 400px !important;
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
  }
</style>
