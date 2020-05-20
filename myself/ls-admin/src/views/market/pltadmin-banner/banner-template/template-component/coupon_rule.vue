<template>
  <div class="bundle-bind-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>赠送礼券设置</span>
        <el-button type="primary" class="right" @click="couponAdd" >添加</el-button>
      </div>
      <el-form :model="info" :rules="rules" ref="ruleForm">
        <el-table :data="info.couponList">
          <el-table-column label="赠送礼券ID" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/couponId'" :rules='rules.couponId'>
                <el-input v-model="scope.row.couponId" size="mini" placeholder="请输入赠送礼券ID" @blur="handlerCouponId(scope.$index)"  @input="provingNum('couponId', scope.$index)" :disabled="scope.row.couponName !== ''" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="赠送礼券名称" width="220">
            <template slot-scope="scope">
              <el-form-item>
                <span>{{scope.row.couponName}}</span>
              </el-form-item>
            </template>
          </el-table-column>
<!--          <el-table-column label="领取库存" width="140" v-if="info.pageType === 'create'">-->
<!--            <template slot-scope="scope">-->
<!--              <el-form-item :prop="scope.$index + '/inventoryQty'" :rules='rules.inventoryQty'>-->
<!--                <el-input  v-model.number="scope.row.inventoryQty" size="mini" placeholder="请输入领取库存" @input="provingNum('inventoryQty', scope.$index)" />-->
<!--              </el-form-item>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="领取库存" width="140">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/inventoryQty'" :rules='rules.inventoryQty'>
                <span v-if="info.pageType !== 'create' && scope.row.id && +info.publishFlgOld === 0">{{scope.row.inventoryQty}}</span>
                <el-input v-else v-model="scope.row.inventoryQty" size="mini" placeholder="请输入领取库存" @input="provingNum('inventoryQty', scope.$index)" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="剩余库存" width="80" v-if="info.pageType !== 'create'">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.id">
                {{scope.row.inventoryQty - scope.row.salesedQty}}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="新增库存" width="140" v-if="info.pageType !== 'create'">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/additionalQty'" :rules='rules.additionalQty' v-if="scope.row.id && +info.publishFlgOld === 0">
                <el-input  v-model="scope.row.additionalQty" size="mini" placeholder="请输入新增库存" @input="provingNum('additionalQty', scope.$index)" :disabled="info.pageType === 'detail'" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="可领取时间" width="480">
            <template slot-scope="scope">
              <el-form-item :prop="scope.$index + '/beginEndTime'" :rules='rules.beginEndTime' class="clearfix">
                <div class="useDate">
                  <el-date-picker v-model="scope.row.beginTime" size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeBeginTime(scope.$index)" />
                </div>
                <div class="line useDateLine">-</div>
                <div class="useDate">
                  <el-date-picker v-model="scope.row.endTime" size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime(scope.$index)" />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-form-item>
                <el-button size="mini" type="danger" @click="couponDel(scope.$index)" >删除</el-button>
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
      return this.$store.getters.specialActivityInfo
    }
  },
  data () {
    let validateCouponId = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.couponList[index].couponId === '') {
        callback(new Error('请输入赠送礼券ID'))
      } else {
        if (this.info.couponList[index].couponId && this.info.couponList[index].couponName === '') {
          callback(new Error(this.couponErrorTitle))
        } else {
          callback()
        }
      }
    }
    let validateInventoryQty = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.couponList[index].inventoryQty === '') {
        callback(new Error('请输入领取库存'))
      } else {
        callback()
      }
    }
    let validateAdditionalQty = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (this.info.couponList[index].additionalQty === '') {
        callback(new Error('请输入新增库存'))
      } else {
        callback()
      }
    }
    let validateBeginEndTime = (rule, value, callback) => {
      let index = rule.field.split('/')[0]
      if (!this.info.couponList[index].beginTime || !this.info.couponList[index].endTime) {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    }
    return {
      couponErrorTitle: '赠送礼券信息不存在',
      rules: {
        couponId: [{ required: true, validator: validateCouponId, trigger: 'blur' }],
        inventoryQty: [{ required: true, validator: validateInventoryQty, trigger: 'blur' }],
        additionalQty: [{ required: true, validator: validateAdditionalQty, trigger: 'blur' }],
        beginEndTime: [{ required: true, validator: validateBeginEndTime, trigger: 'blur' }]
      }
    }
  },
  methods: {
    provingNum (name, index) {
      let _val = this.info.couponList[index][name].toString().replace(/[\D]/gi, '')
      this.$set(this.info.couponList[index], name, _val !== '' ? parseInt(_val) : '')
    },
    changeBeginTime (index) {
      if (this.info.beginTime) {
        if (+this.info.couponList[index].beginTime < +this.info.beginTime) {
          this.$set(this.info.couponList[index], 'beginTime', '')
          this.$message.error('可领取开始时间要大于等于活动开始时间')
          return
        }
      }
      if (this.info.endTime) {
        if (+this.info.couponList[index].beginTime > +this.info.endTime) {
          this.$set(this.info.couponList[index], 'endTime', '')
          this.$message.error('可领取开始时间要小于等于活动结束时间')
          return
        }
      }
      if (this.info.couponList[index].endTime) {
        if (+this.info.couponList[index].beginTime >= +this.info.couponList[index].endTime) {
          this.$set(this.info.couponList[index], 'beginTime', '')
          this.$message.error('可领取开始时间要小于可领取结束时间')
          return
        }
      }
      if (index > 0 && this.info.couponType === 'SINGLE' && +this.info.activityUnicom === 3) {
        if (+this.info.couponList[index].beginTime < +this.info.couponList[index - 1].endTime) {
          this.$set(this.info.couponList[index], 'beginTime', '')
          this.$message.error('可领取开始时间要大于上一行可领取结束时间')
          return
        }
      }
    },
    changeEndTime (index) {
      if (this.info.beginTime) {
        if (+this.info.couponList[index].endTime < +this.info.beginTime) {
          this.$set(this.info.couponList[index], 'beginTime', '')
          this.$message.error('可领取结束时间要大于等于活动开始时间')
          return
        }
      }
      if (this.info.endTime) {
        if (+this.info.couponList[index].endTime > +this.info.endTime) {
          this.$set(this.info.couponList[index], 'endTime', '')
          this.$message.error('可领取结束时间要小于等于活动结束时间')
          return
        }
      }
      if (this.info.couponList[index].beginTime) {
        if (+this.info.couponList[index].endTime <= +this.info.couponList[index].beginTime) {
          this.$set(this.info.couponList[index], 'endTime', '')
          this.$message.error('可领取结束时间要大于可领取开始时间')
          return
        }
      }
      if (index > 0 && this.info.couponType === 'SINGLE' && +this.info.activityUnicom === 3) {
        if (+this.info.couponList[index].endTime < +this.info.couponList[index - 1].endTime) {
          this.$set(this.info.couponList[index], 'endTime', '')
          this.$message.error('可领取结束时间要大于上一行可领取结束时间')
          return
        }
      }
    },
    couponAdd () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let newValue = {
            couponId: '',
            couponName: '',
            inventoryQty: '',
            salesedQty: '',
            additionalQty: '',
            beginTime: '',
            endTime: ''
          }
          this.info.couponList.push(newValue)
        }
      })
    },
    couponDel (index) {
      this.info.couponList.splice(index, 1)
    },
    handlerCouponId (index) {
      if (!this.info.couponList[index].couponId) return
      if (this.info.couponList.some((v, k) => {
        return +index !== +k && v.couponId === this.info.couponList[index].couponId
      })) {
        this.$message.error('不可重复添加同一张券')
        this.couponErrorTitle = '不可重复添加同一张券'
        return
      }
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.orderGiftBundle.handlerCouponId(this.info.couponList[index].couponId).then(res => {
        this.info.couponList[index].couponName = ''
        if (res.data === undefined) {
          this.$message.error('赠送礼券信息不存在！')
          this.couponErrorTitle = '赠送礼券信息不存在！'
          this.$store.dispatch('specialActivity/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return
        }
        // if (res.data.status === 'CREATED') {
        //   this.$message.error(`该券尚未公开`)
        //   this.couponErrorTitle = `该券尚未公开`
        //   this.$store.dispatch('specialActivity/setLoadingData', false)
        //   this.$refs.ruleForm.validateField(index + '/couponId')
        //   return false
        // }
        if (res.data.regionBlockCode !== this.$store.getters.regionBlockCode) {
          this.$message.error(`请输入${this.$store.getters.regionBlockCodeName}券ID`)
          this.couponErrorTitle = `请输入${this.$store.getters.regionBlockCodeName}券ID`
          this.$store.dispatch('specialActivity/setLoadingData', false)
          this.$refs.ruleForm.validateField(index + '/couponId')
          return false
        }
        this.info.couponList[index].couponName = res.data.couponName
        this.$refs.ruleForm.validateField(index + '/couponId')
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.info.couponList[index].couponName = ''
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$refs.ruleForm.validateField(index + '/couponId')
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
  .useDate{
    width: 200px;
    display: inline-block;
  }
  .useDateLine{
    width: 20px;
    display: inline-block;
    text-align: center;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 200px;
  }
}
</style>
