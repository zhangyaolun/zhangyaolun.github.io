<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">优惠券设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px" class="appid">
      <el-form-item label="优惠券发放类型：" prop="sendType">
        <el-radio-group v-model="info.sendType" :disabled="info.pageType === 'detail'">
          <el-radio :label="'ALL'">全发送</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item id="commodityFlg" label="优惠券：" prop="couponIdList" >
        <section v-for="(item,index) in info.couponIdList" :key="index" class="mb">
          <el-input class="expiring-days-input mr" type="text" v-model="item.couponId" :disabled="item.couponName !== ''" placeholder="请输入优惠券ID"/>
          <el-button type="primary" class="mr" size="mini" @click="seachShopData(item.couponId)" :disabled="info.pageType === 'detail' || info.couponIdList[0].couponName !== ''">添加优惠券</el-button>
        </section>
      </el-form-item>
      <el-form-item>
        <el-table :data="info.couponIdList" v-if="info.couponIdList[0].couponName !== '' && info.couponIdList[0].couponId !== ''">
          <el-table-column prop="couponName" label="活动名称" min-width="80"/>
          <el-table-column prop="couponId" label="优惠券ID"/>
          <el-table-column prop="type" label="优惠券发放数量" min-width="120">
            <template slot-scope="scope">
              <el-input class="expiring-days-input mr" type="text" v-model="info.couponIdList[0].num" placeholder="请输入优惠券库存" @blur="numBlur(scope.row.couponRemain)" :disabled="info.pageType === 'detail'"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button size="mini" type="danger" @click="handleDelete" :disabled="info.pageType === 'detail'">删除</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="活动库存" prop="inventoryQty">
        <el-input v-model="info.inventoryQty" maxlength="8" placeholder="请输入活动库存数量" @input="provingNum('inventoryQty', $event)" :disabled="info.pageType === 'detail'"/>
        <span style="color: #909399;font-size: 12px;display: block">输入1-99999999之间的数字，如果输入0则代表不限制优惠券数量；</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.channelSendCouponTemplateInfo
    }
  },
  data () {
    let validateCouponIdList = (rule, value, callback) => {
      if (this.info.couponIdList && this.info.couponIdList[0].couponId !== '') {
        callback()
      } else {
        callback(new Error('请输入优惠券ID'))
      }
    }
    return {
      rules: {
        'sendType': [{ required: true }],
        'inventoryQty': [{ required: true, message: '请输入活动库存', trigger: 'blur' }],
        'couponIdList': [{ required: true, validator: validateCouponIdList, trigger: 'blur' }]
      }
    }
  },
  methods: {
    numBlur (maxVal) {
      if (!this.info.couponIdList[0].num) {
        this.info.couponIdList[0].num = 1
      } else if (this.info.couponIdList[0].num > maxVal) {
        this.info.couponIdList[0].num = maxVal
        this.$message.error(`优惠券库存输入值不能大于优惠券剩余数量(${maxVal})`)
      }
    },
    provingNum (name, $event) {
      if (name === 'inventoryQty') {
        if (+$event.length === 1) {
          this.info[name] = $event.replace(/[^1-9]/gi, '')
        } else {
          this.info[name] = $event.replace(/[\D]/gi, '')
        }
      } else {
        this.info[name] = $event.replace(/[\D]/gi, '')
      }
    },
    seachShopData () {
      this.$api.orderGiftBundle.handlerCouponId(this.info.couponIdList[0].couponId).then(res => {
        if (res.data === undefined) {
          this.$message.error('优惠券信息不存在')
          return
        }
        if (res.data.regionBlockCode !== this.$store.getters.regionBlockCode) {
          this.$message.error('优惠券信息不存在')
          return
        }
        if (res.data.sendType !== 3) {
          this.$message.error('仅支持活动类型为活动派发的优惠券')
          return
        }
        this.info.couponIdList[0].couponId = res.data.couponId
        this.info.couponIdList[0].couponName = res.data.couponName
      })
    },
    handleDelete () {
      this.info.couponIdList[0].couponId = ''
      this.info.couponIdList[0].couponName = ''
      // this.$confirm('确认删除吗？')
      //   .then(_ => {
      //     this.info.couponIdList[0].couponId = ''
      //     this.info.couponIdList[0].couponName = ''
      //   })
      //   .catch(_ => {})
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
        width: 200px !important;
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
