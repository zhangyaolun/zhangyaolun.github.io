<template>
  <div class="view-order-system_bundle-detail" v-loading="loading">
    <bundle-create-form ref="bundleCreateFormContainer" :bundle="bundle" />
    <bundle-bind-form ref="bundleBindFormContainer" :table-data="bindBundleData" />
    <bundle-cancle-btn/>
  </div>
</template>

<script>

import bundleCreateForm from './bundle-create-form.vue'
import bundleBindForm from './bundle-bind-form.vue'
import bundleCancleBtn from './bundle-cancle-btn.vue'
import { decodeTextAreaString } from '@/utils/validate'

export default {
	components: {
    bundleCreateForm,
    bundleBindForm,
    bundleCancleBtn
  },
  data () {
    return {
			bundle: {},
			bindBundleData: [],
			loading: true
    }
  },
  mounted () {
		this.getDetail(this.$route.params.id)
	},
  methods: {
    getDetail (val) {
			this.$api.orderGiftBundle.detail(val).then(res => {
				this.loading = false
        this.bundle = res.data
				this.bindBundleData = res.data.bundleSubList
        this.bundle.description = decodeTextAreaString(this.bundle.description)
        var platformStr = this.bundle.platform.split(",")
        this.$set(this.bundle, 'platformList', [])
        for (var i = 0; i < platformStr.length; i++) {
          this.bundle.platformList.push(parseInt(platformStr[i]))
        }
			})
		}
	}
}
</script>
