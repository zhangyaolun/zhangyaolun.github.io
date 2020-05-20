<template>
  <div v-loading="loading">
    <action-info :info.sync="info" :load.sync="loading"></action-info>
    <action-btn></action-btn>
  </div>
</template>

<script>
import actionInfo from '../template-component/template-add/action-add-info'
import actionBtn from './action-btn'
import { templateMixin } from "../template-component/mixin.js"

export default {
  mixins: [templateMixin],
  components: {
    actionInfo,
    actionBtn
  },
  computed: {
    loading () {
      return this.$store.getters.payCourtesyLoading
    },
    info () {
      return this.$store.getters.payCourtesyInfo
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('payCourtesy/restInfoData', 'detail')
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.payCourtesy.detail(this.info.id).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('payCourtesy/setLoadingData', false)
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}

</script>
