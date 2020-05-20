<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">价格&限制</div>
    <el-form ref="ruleForm" :model="info" :rules="rules">
      <el-form-item label="售价：" prop="sellPrice" label-width="180px">
        <el-input class="name-input mr10" v-model.number="info.sellPrice" placeholder="请输入售价" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" @input="checkNumber('sellPrice', $event)" @blur="priceBlur('sellPrice')"/>
        <span class="placeholder inlineBlock">元</span>
      </el-form-item>
      <el-form-item label="线上促销：" prop="hasPromotion" label-width="180px">
        <el-select v-model="info.hasPromotion" @change="hasPromotionChange" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
          <el-option
            v-for="item in hasPromotionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-row v-if="info.hasPromotion === 1">
        <el-col :span="12">
          <el-form-item label="数量：" prop="promotionStore" label-width="180px">
            <el-input v-model="info.reservePromotionDtoList[0].promotionStore" placeholder="请输入数量" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"  @input="provingNum('promotionStore', $event)"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优惠售价：" prop="promotionPrice">
            <el-input class="name-input mr10" v-model="info.reservePromotionDtoList[0].promotionPrice" placeholder="请输入优惠售价" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" @input="checkNumber('promotionPrice', $event, 0)" @blur="priceBlur('promotionPrice', 0)"/>
            <span class="placeholder inlineBlock">元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="info.hasPromotion === 2">
        <el-col :span="18">
          <el-table
            :data="info.reservePromotionDtoList"
            class="ml180 price_table"
          >
            <el-table-column label="优惠截止日期">
              <template slot-scope="scope">
                <el-form-item :prop="scope.$index + '/promotionEnd'" :rules='rules.promotionEndTime'>
                  <el-date-picker v-model="scope.row.promotionEnd" format="yyyy-MM-dd" value-format="timestamp" type="date" placeholder="选择时间" @change="promotionEndChange(scope.$index)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="优惠售价（元）">
              <template slot-scope="scope">
                <el-form-item :prop="scope.$index + '/promotionPrice'" :rules='rules.tablePrice'>
                  <el-input v-model="scope.row.promotionPrice" @input="checkNumber('promotionPrice', $event, scope.$index )" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" @blur="priceBlur('promotionPrice', scope.$index)"/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button  type="danger" size="mini" @click="reservePromotionDtoListDel(scope.$index)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">删除</el-button>
                <el-button v-if="scope.$index === 0" type="primary" size="mini" @click="reservePromotionDtoListAdd(scope.$index)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">新增</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-form-item label="购买上限：" prop="purchaseUpperLimit" label-width="180px">
        <el-input class="name-input mr10" v-model="info.purchaseUpperLimit" placeholder="请输入购买上限" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" @input="provingNum('purchaseUpperLimit')"/>
        <span class="placeholder inlineBlock">个，默认0为不限</span>
        <el-checkbox-group v-model="info.promotionUpperLimitFlg" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" >
          <el-checkbox label="上限仅限促销期间"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="限定城市设置：" prop="isAllCity" label-width="180px">
        <el-radio-group v-model="info.isAllCity" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" @change="isAllCityChange">
          <el-radio :label="0">所有城市</el-radio>
          <el-radio :label="1">{{title}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row v-show="info.isAllCity === 1">
        <el-col :span="6">
        <el-table
          :data="info.cityLimitedList"
          class="ml180 table_city"
        >
          <el-table-column label="选择" width="50px">
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.selectd" :disabled="info.pageType === 'mod' || info.pageType === 'detail' || scope.row.defaultFlg === 1" >
                <el-checkbox
                  :value="scope.row.cityId" ></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column label="城市名称" prop="cityName"></el-table-column>
        </el-table>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.appointmentGoodsInfo
    },
    title () {
      return `限定城市（仅${this.$store.getters.regionBlockCodeName}）`
    }
  },
  data () {
    let validateTableTime = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.hasPromotion === 2 && !this.info.reservePromotionDtoList[index].promotionEnd) {
        callback(new Error('请选择优惠截止日期'))
      } else {
        callback()
      }
    }
    let validateTablePrice = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.hasPromotion === 2 && this.info.reservePromotionDtoList[index].promotionPrice === '') {
        callback(new Error('请输入优惠售价'))
      } else {
        callback()
      }
    }
    let validatePromotionStore = (rule, value, callback) => {
      if (this.info.hasPromotion === 1 && this.info.reservePromotionDtoList[0].promotionStore === '') {
        callback(new Error('请输入数量'))
      } else {
        callback()
      }
    }
    let validatePromotionPrice = (rule, value, callback) => {
      if (this.info.hasPromotion === 1 && this.info.reservePromotionDtoList[0].promotionPrice === '') {
        callback(new Error('请输入优惠售价'))
      } else {
        callback()
      }
    }
    return {
      hasPromotionOptions: [
        { label: '无促销活动', value: 0 },
        { label: '限量优惠', value: 1 },
        { label: '限时优惠', value: 2 }
      ],
      rules: {
        sellPrice: [{ required: true, message: '请输入售价', trigger: 'blur' }],
        hasPromotion: [{ required: true }],
        promotionStore: [{ required: true, validator: validatePromotionStore, trigger: 'blur' }],
        promotionPrice: [{ required: true, validator: validatePromotionPrice, trigger: 'blur' }],
        promotionEndTime: [{ required: true, validator: validateTableTime, trigger: 'blur' }],
        tablePrice: [{ required: true, validator: validateTablePrice, trigger: 'blur' }],
        purchaseUpperLimit: [{ required: true, message: '请输入购买上限', trigger: 'blur' }],
        isAllCity: [{ required: true }]
      }
    }
  },
  methods: {
    hasPromotionChange () {
      this.info.reservePromotionDtoList = [{
        'promotionStart': '',
        'promotionEnd': '',
        'promotionPrice': '',
        'promotionStore': '' }]
    },
    promotionEndChange (index) {
      if (this.info.reservePromotionDtoList[index].promotionEnd < this.info.canOrderStart) {
        this.$message.error('优惠截止日期需大于等于开始销售时间')
        this.info.reservePromotionDtoList[index].promotionEnd = ''
        return
      }
      if (this.info.reservePromotionDtoList[index].promotionEnd < this.info.orderBegin) {
        this.$message.error('优惠截止日期需大于开始销售日')
        this.info.reservePromotionDtoList[index].promotionEnd = ''
        return
      }
      if (index !== 0 && this.info.reservePromotionDtoList[index].promotionEnd <= this.info.reservePromotionDtoList[index - 1].promotionEnd) {
        this.$message.error('新增限时优惠截止日期需大于等于上一行限时优惠截止日期')
        this.info.reservePromotionDtoList[index].promotionEnd = ''
        return
      }
      if (this.info.reservePromotionDtoList[index].promotionEnd > this.info.orderEnd) {
        this.$message.error('优惠截止日期需小于等于截止订货日')
        this.info.reservePromotionDtoList[index].promotionEnd = ''
        return
      }
    },
    checkNumber (name, $event, index) {
      if ($event && name !== 'promotionPrice') {
        this.info[name] = $event.match(/^\d*(\.?\d{0,2})/g)[0] || ''
      } else if ($event && name === 'promotionPrice') {
        this.info.reservePromotionDtoList[index].promotionPrice = $event.match(/^\d*(\.?\d{0,2})/g)[0] || ''
      }
    },
    priceBlur (name, index) {
      if (name !== 'promotionPrice') {
        this.info[name] = +this.info[name] === 0 ? '' : this.info[name]
      } else if (name === 'promotionPrice') {
        this.info.reservePromotionDtoList[index].promotionPrice = +this.info.reservePromotionDtoList[index].promotionPrice === 0 ? '' : this.info.reservePromotionDtoList[index].promotionPrice
      }
    },
    provingNum (name) {
      if (name === 'promotionStore') {
        let _val = this.info.reservePromotionDtoList[0][name].replace(/[^1-9]/g, '')
        this.$set(this.info.reservePromotionDtoList[0], name, _val !== '' ? parseInt(_val) : '')
      } else {
        let _val = this.info[name].replace(/[\D]/gi, '')
        this.$set(this.info, name, _val !== '' ? parseInt(_val) : '')
      }
    },
    isAllCityChange (val) {
      if (val === 0 && this.info.cityLimitedList.length > 0) return
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.appointmentGoodsTemplate.getCityList().then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        res.data.forEach(v => {
          v.selectd = +v.defaultFlg === 0 ? false : true
        })
        this.info.cityLimitedList = res.data
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    reservePromotionDtoListAdd (index) {
      if (this.info.reservePromotionDtoList[index].promotionEnd !== '' && this.info.reservePromotionDtoList[index].promotionPrice !== '') {
        this.info.reservePromotionDtoList.push({
          'promotionStart': '',
          'promotionEnd': '',
          'promotionPrice': '',
          'promotionStore': '' })
      } else {
        this.$refs.ruleForm.validateField(index + '/promotionEnd')
        this.$refs.ruleForm.validateField(index + '/promotionPrice')
      }
    },
    reservePromotionDtoListDel (index) {
      if (this.info.reservePromotionDtoList.length === 1) {
        this.info.reservePromotionDtoList = [{
          'promotionStart': '',
          'promotionEnd': '',
          'promotionPrice': '',
          'promotionStore': '' }]
      } else {
        this.info.reservePromotionDtoList.splice(index, 1)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .ml180{margin-left: 180px !important;}
    .mr10{margin-right: 10px !important;}
    .el-form-item, .price_table{
      margin-bottom: 18px !important;
    }
    .table_city {
      .el-form-item{
        margin-bottom: 0 !important;
      }
    }
    margin: 20px;
    .el-input, .el-select{
      display: inline-block;
      width: 150px !important;
    }
    .price_table{
      .el-input{
        width: 200px !important;
      }
    }
  }
</style>
