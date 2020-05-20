<template>
  <div class="bundle-bind-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>绑定券设置：</span>
        <!-- <el-button type="primary" style="float: right;" @click="$emit('handleAdd')">添加</el-button> -->
      </div>
      <el-form :model="bindModel" :rules="bindModel.rules" ref="bundleBindForm">
        <el-table :data="bindModel.tableData">
          <el-table-column label="绑定券id">
            <template slot-scope="scope">
              <el-form-item  :prop="'tableData.' + scope.$index + '.couponId'" :rules='bindModel.rules.couponId'>
                <el-input v-model.number="scope.row.couponId" size="mini" placeholder="绑定券id" readonly @change="handlerCouponId" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="couponNum" label="绑定券数量" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.couponNum'" :rules='bindModel.rules.couponNum'>
                <el-input  v-model.number="scope.row.couponNum" size="mini" placeholder="绑定券数量" readonly />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="绑定券名称" min-width="150">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.couponName'" :rules='bindModel.rules.couponName'>
                <el-input v-model="scope.row.couponName" readonly size="mini" />
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
  props: {
    tableData: {
      required: true,
      type: Array
    }
  },
  data () {
    var validateNum = (rule, value, callback) => {
      const index = rule.field.split('.')[1]
      if (this.tableData[index].couponRemain && parseInt(this.tableData[index].couponRemain) < parseInt(value)) {
        callback(new Error(`输入值不能大于优惠券剩余数量（${this.tableData[index].couponRemain}）`))
      } else {
        callback()
      }
    }
    return {
      rules: {
        couponId: [
          { required: true, message: "绑定券id不能为空", trigger: "blur" },
          { type: 'number', message: "绑定券id为数值", trigger: "blur" },
        ],
        couponNum: [
          { required: true, message: "绑定券数量不能为空", trigger: "blur" },
          { type: 'number', message: "绑定券数量为数值", trigger: "blur" },
          { validator: validateNum, trigger: "blur" }
        ],
        couponName: [
          { required: true, message: "绑定券名称不能为空", trigger: "blur" }
        ]
      }
    }
  },
  computed: {
    bindModel () {
      return {
        tableData: this.tableData,
        rules: this.rules
      }
    }
  },
  methods: {
    handlerCouponId(value) {
     this.$api.orderGiftBundle.handlerCouponId(value).then(res => {
        if (res.data === undefined) {
          this.$alert("绑定券信息不存在！")
          return
        }
        const index = this.tableData.findIndex(ele => parseInt(ele.couponId) === parseInt(value))
        this.tableData[index].couponName = res.data.couponName
        this.tableData[index].couponRemain = res.data.couponRemain
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bundle-bind-form {
  margin: 20px;
}
</style>
