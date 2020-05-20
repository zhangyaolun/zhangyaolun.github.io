<template>
  <el-form :model="info" class="commodity-selecte-modal-form" ref="commoditySelecteModalForm">
    <el-form-item :label="label" prop="id">
      <el-input
        v-model="info.id"
        :placeholder="placeholder"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="query">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      info: {
        id: ''
      },
      label: '',
      placeholder: ''
    }
  },
  props: {
    couponcsvtype: {
      type: String,
      required: true
    }
  },
  watch: {
    couponcsvtype (val) {
      this.title(val)
    }
  },
  created () {
    this.couponcsvtype = this.couponcsvtype
    this.title(this.couponcsvtype)
  },
  methods: {
    title (val) {
      if (val === 'COMMODITY') {
        this.label = '商品编码：'
        this.placeholder = '请输入商品编码'
      } else {
        this.label = '门店编码：'
        this.placeholder = '请输入门店编码'
      }
    },
    reset () {
      this.$refs.commoditySelecteModalForm.resetFields()
      this.info.id = ''
      this.$emit('reset')
    },
    query () {
      let data = {
        id: this.info.id
      }
      this.$emit('query', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .commodity-selecte-modal-form{
    display: flex;
    flex-wrap: wrap;
    .el-form-item{
      flex-basis: 50%;
      margin-bottom: 10px;
      &:first-child{
        input{
          width: 150px;
        }
      }
      &:last-child{
        display: flex;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .commodity-selecte-modal-form{
    .el-form-item{
      .el-input{
        width: 200px !important;
      }
    }
  }
</style>
