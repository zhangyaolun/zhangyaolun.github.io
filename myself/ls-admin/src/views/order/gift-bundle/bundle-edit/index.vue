<template>
  <div class="view-order-system_bundle-edit" v-loading="loading">
    <bundle-create-form ref="bundleCreateFormContainer" :bundle.sync="bundle" :load.sync="loading"/>
    <bundle-bind-form ref="bundleBindFormContainer" :table-data="bindBundleData" @handleAdd="handleAdd" @handleDelete="handleDelete" />
    <bundle-create-btn @createBundle="updateBundle" />
  </div>
</template>

<script>

import bundleCreateForm from '../bundle-create/bundle-create-form.vue'
import bundleBindForm from '../bundle-create/bundle-bind-form.vue'
import bundleCreateBtn from '../bundle-create/bundle-create-btn.vue'
import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'

export default {
  components: {
    bundleCreateForm,
    bundleBindForm,
    bundleCreateBtn
  },
  data () {
    return {
      bundle: { shareFlg: 0, platformList: [] },
      bindBundleData: [],
      loading: false
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    getDetail (val) {
      this.$api.orderGiftBundle.detail(val).then(res => {
        this.loading = false
        this.bundle = res.data
        this.bindBundleData = res.data.bundleSubList
        let platformStr = this.bundle.platform.split(",");
        this.$set(this.bundle, 'platformList', [])
        let newBigAttr = []
        this.bundle.imageBigList.length > 0 ? this.bundle.imageBigList.forEach(v => {
          newBigAttr.push({ url: v })
        }) : newBigAttr
        this.$set(this.bundle, 'imageBigList', newBigAttr)
        this.bundle.description = decodeTextAreaString(this.bundle.description)
        for (var i = 0; i < platformStr.length; i++) {
          this.bundle.platformList.push(parseInt(platformStr[i]));
        }
        // this.bundle.originalPrice = format.toRMB(this.bundle.originalPrice);
        // this.bundle.sellPrice = format.toRMB(this.bundle.sellPrice);
      })
    },
    updateBundle () {
      var flag1 = false
      var flag2 = false
      this.bundle.bundleSubList = []
      this.bindBundleData.forEach(ele => {
        this.bundle.bundleSubList.push({
          couponId: ele.couponId,
          couponNum: ele.couponNum,
          couponName: ele.couponName
        })
      })
      this.$refs.bundleCreateFormContainer.$refs.giftCreateForm.validate(valid => {
        if (valid) {
          flag1 = true
        }
      })
      this.$refs.bundleBindFormContainer.$refs.bundleBindForm.validate(valid => {
        if (valid) {
          flag2 = true
        }
      })

      if (this.bundle.bundleSubList.length === 0) {
        this.$message.error('绑定券信息不能为空！')
        return
      }
      let platformStr = ""
      for (var i = 0; i < this.bundle.platformList.length; i++) {
        platformStr += this.bundle.platformList[i] + ","
      }
      this.bundle.platform = platformStr.substring(
        0,
        platformStr.length - 1
      );

      if (this.bundle.imageBigList.length === 0) {
        this.$message.error('请上传详情页缩略图')
        return
      }
      this.bundle.imageBig = ''
      this.bundle.imageBigList.forEach(v => {
        this.bundle.imageBig += v.url + ';'
      })
      this.bundle.imageBig = this.bundle.imageBig.substring(0, this.bundle.imageBig.length-1)
      if (flag1 && flag2) {
        this.$confirm('确认提交吗？')
          .then(_ => {
            this.update()
          })
          .catch(_ => {})
      }
    },
    update () {
      let bundles = JSON.parse(JSON.stringify(this.bundle))
      bundles.imageBigList = null
      bundles.description = encodeTextAreaString(bundles.description)
      this.$api.orderGiftBundle.update(bundles).then(res => {
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/on-line/gift/bundle/index' })
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    handleAdd () {
      let newValue = {
        couponId: '',
        couponNum: '',
        couponName: '',
        couponRemain: ''
      }
      this.bindBundleData.push(newValue)
    },
    handleDelete (index) {
      this.bindBundleData.splice(index, 1)
    }
  }
}
</script>
