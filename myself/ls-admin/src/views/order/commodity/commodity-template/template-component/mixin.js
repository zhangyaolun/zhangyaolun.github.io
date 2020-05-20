import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'
import { RMB } from '@/filters/index'
export const templateMixin = {
  methods: {
    // 提交数据验证
    submitFalg () {
      let ruleFlag = false
      this.$refs.commodityForm.$refs.ruleForm.validate(valid => {
        valid ? ruleFlag = true : ruleFlag = false
      })
      if (!ruleFlag) {
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      return true
    },
    // 提交数据转换
    submitChange (info) {
      info.detail = encodeTextAreaString(info.detail)
      let attr = []
      info.detailImageList.forEach(v => {
        attr.push(v.url)
      })
      info.detailImagePaths = JSON.stringify(attr)
      delete info.pageType
      delete info.detailImageList
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('commodity/setInfoData', _res)
      this.info.detail = decodeTextAreaString(this.info.detail)
      this.info.detailImagePaths = JSON.parse(this.info.detailImagePaths)
      let attr = []
      this.info.detailImagePaths.forEach(v => {
        attr.push({ url: v })
      })
      this.info.detailImageList = attr
    }
  }
}
