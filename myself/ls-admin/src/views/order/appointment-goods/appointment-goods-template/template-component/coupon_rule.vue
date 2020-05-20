<template>
  <div class="bundle-bind-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>优惠券设置</span>
        <el-button type="primary" class="right" @click="couponAdd" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" >添加</el-button>
      </div>
      <el-form :model="info" :rules="rules" ref="ruleForm">
        <el-table :data="info.couponTable">
          <el-table-column label="绑定券id">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/couponId'" :rules='rules.couponId'>
                <el-input v-model.number="scope.row.couponId" size="mini" placeholder="绑定券id" @blur="handlerCouponId(scope.$index)"  @input="provingNum('couponId', scope.$index)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="couponNum" label="绑定券数量" min-width="120">
            <template slot-scope="scope">
              <el-form-item >
                <el-input  v-model.number="scope.row.couponNum" size="mini" placeholder="绑定券数量" @input="provingNum('couponNum', scope.$index)" disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="绑定券名称" min-width="150">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.couponName" readonly size="mini" disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-form-item>
                <el-button size="mini" type="danger" @click="couponDel(scope.$index)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" >删除</el-button>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.appointmentGoodsInfo
    }
  },
  data () {
    let validateCouponId = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.couponTable[index].couponId === '') {
        callback(new Error('请输入绑定券id'))
      } else {
        if (this.info.couponTable[index].couponId && this.info.couponTable[index].couponName === '') {
          callback(new Error(this.couponErrorTitle))
        } else {
          callback()
        }
      }
    }
    return {
      couponErrorTitle: '赠送礼券信息不存在',
      rules: {
        couponId: [{ required: true, validator: validateCouponId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    provingNum (name, index) {
      let _val = this.info.couponTable[index][name].toString().replace(/[\D]/gi, '')
      this.$set(this.info.couponTable[index], name, _val !== '' ? parseInt(_val) : '')
    },
    couponAdd () {
      let index = this.info.couponTable.length
      if (index !== 0) {
        this.$refs.ruleForm.validateField(index - 1 + '/couponId')
      } else {
        let newValue = {
          couponId: '',
          couponNum: 1,
          couponName: '',
          couponRemain: ''
        }
        this.info.couponTable.push(newValue)
      }
    },
    couponDel (index) {
      this.info.couponTable.splice(index, 1)
    },
    handlerCouponId (index) {
      if (!this.info.couponTable[index].couponId) return
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.orderGiftBundle.handlerCouponId(this.info.couponTable[index].couponId).then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.info.couponTable[index].couponName = ''
        if (res.data === undefined) {
          this.$message.error('绑定券信息不存在！')
          this.couponErrorTitle = '赠送礼券信息不存在！'
          this.$refs.ruleForm.validateField(`${index}/couponId`)
          return
        }
        if (res.data.regionBlockCode !== this.$store.getters.regionBlockCode) {
          this.$message.error(`请输入${this.$store.getters.regionBlockCodeName}券ID`)
          this.couponErrorTitle = `请输入${this.$store.getters.regionBlockCodeName}券ID`
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.$refs.ruleForm.validateField(`${index}/couponId`)
          return false
        }
        if (res.data.status === 'CREATED') {
          this.$message.error(`该券尚未公开`)
          this.couponErrorTitle = `该券尚未公开`
          this.$store.dispatch('specialActivity/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return false
        }
        if (+res.data.dynamicPeriodFlg !== 1) {
          this.$message.error(`仅限添加动态券`)
          this.couponErrorTitle = `仅限添加动态券`
          this.$store.dispatch('specialActivity/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return false
        }
        this.info.couponTable[index].couponName = res.data.couponName
        this.$refs.ruleForm.validateField(`${index}/couponId`)
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bundle-bind-form {
  margin: 20px;
  .right{
    float: right;
  }
}
</style>
