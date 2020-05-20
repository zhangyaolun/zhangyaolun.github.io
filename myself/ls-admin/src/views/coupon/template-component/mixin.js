import { getToken } from '@/utils/auth'
export const couponMixin = {
  computed: {
    headers () {
      return {
        'Authentication-Admin-Web-Token': getToken()
      }
    }
  },
  data: function () {
    let validateNums = (rule, value, callback) => {
      if (value && !/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    let valdisplayDate = (rule, value, callback) => {
      if (this.oData.dynamicPeriodFlg !== 1) {
        if (this.oData.displayDateFromStr) {
          callback()
        } else {
          callback(new Error('请选择时间'))
        }
      } else {
        callback()
      }
    }
    let validateTime = (rule, value, callback) => {
      if (this.oData.dynamicPeriodFlg !== 1) {
        if (this.oData.useDateFromStr && this.oData.useDateToStr) {
          callback()
        } else {
          callback(new Error('请选择时间'))
        }
      } else {
        callback()
      }
    }
    let validateDay = (rule, value, callback) => {
      if (this.oData.dynamicPeriodFlg === 1) {
        if (this.oData.dynamicPeriodDays === null || this.oData.dynamicPeriodDays === '') {
          callback(new Error('请输入天数'))
        } else {
          if (!/^[0-9]+$/.test(value)) {
            callback(new Error('格式错误'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    let valdisCommodityFlg = (rule, value, callback) => {
      callback()
    }
    return {
      inclusionListsFormVisible: false,
      couponlist: [],
      couponCsvType: '0', // 0门店 1商店
      action: `${process.env.VUE_APP_SRSLAWSON_API_BASE_URL}/market/web/v1/file/uploadImg`,
      actionSvg: `${process.env.VUE_APP_LAWSONADMIN_API_BASE_URL}/admin/new/admin/file/upLoadCsv`,
      oData: {
        projectNo: '',
        name: '',
        type: 0,
        sendType: 2,
        subsidyFlg: 0,
        dynamicPeriodFlg: 0,
        useDateFromStr: '',
        useDateToStr: '',
        displayDateFromStr: '',
        useDate: [],
        dynamicPeriodDays: '',
        shopFlg: 0,
        commodityFlg: 0,
        couponUpperLimit: '',
        amount1: '',
        amount2: '',
        imagePathDetail: '',
        giveLimitFalg: false,
        giveLimit: 1,
        transferFlag: 0,
        couponExplain: '',
        status: 'CREATED',
        commodityCdList: [],
        shopIdList: [],
        searchShop: [
          { searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' }
        ],
        csvList: [
          { name: '', falg: true, list: [] },
          { name: '', falg: true, list: [] },
          { name: '', falg: true, list: [] }
        ]
      },
      rules: {
        type: [
          { required: true, message: '请选择优惠券类型', trigger: 'change' }
        ],
        projectNo: [
          { validator: validateNums, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ],
        sendType: [{ required: true }],
        subsidyFlg: [{ required: true }],
        dynamicPeriodFlg: [{ required: true }],
        shopFlg: [{ required: true }],
        displayDateFromStr: [{ required: true, validator: valdisplayDate, trigger: 'blur' }],
        couponUpperLimit: [{ required: true, message: '请输入优惠券库存', trigger: 'blur' }],
        commodityFlg: [{ required: true, validator: valdisCommodityFlg }],
        useDateFromStr: [
          { required: true, validator: validateTime, trigger: 'blur' }
        ],
        amount1: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        amount2: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        dynamicPeriodDays: [
          { required: true, validator: validateDay, trigger: 'blur' }
        ],
        couponExplain: [
          { required: true, message: '请填写优惠内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'oData.type': {
      handler (newVal) {
        newVal == 2 ? this.oData.subsidyFlg = 1 : ''
      },
      immediate: true
    },
    'oData.giveLimitFalg': {
      handler (newVal) {
        newVal && (this.oData.giveLimit == '' || this.oData.giveLimit == null) ? this.oData.giveLimit = 1 : ''
        newVal ? this.oData.transferFlag = 1 : this.oData.transferFlag = 0
      },
      immediate: true,
      deep: true
    },
    'oData.shopFlg': {
      handler: function (val) {
        if (val === 1) {
          this.oData.shopIdList = this.oData.csvList[0].list
        } else {
          this.oData.shopIdList = []
        }
      },
      immediate: true,
      deep: true
    },
    'oData.commodityFlg': {
      handler: function (val) {
        if (val === 1 || val === 2) {
          this.oData.commodityCdList = this.oData.csvList[val].list
        } else {
          this.oData.commodityCdList = []
        }
      },
      immediate: true,
      deep: true
    },
    submitFalg () {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return false
        } else {
          if (this.oData.shopFlg != 0 && this.oData.shopIdList.length == 0) {
            this.$message.error('请上传适用门店')
            window.scrollTo(0, document.getElementById('shopFlg').scrollHeight)
            return false
          }
          if (this.oData.commodityFlg != 0 && this.oData.commodityCdList.length == 0 && this.oData.type == 2) {
            this.$message.error('请上传适用商品')
            window.scrollTo(0, document.getElementById('commodity').scrollHeight)
            return false
          }
          if (this.oData.searchShop[this.oData.searchShop.length - 1].id == '' && this.oData.type != 2 && this.oData.searchShop[this.oData.searchShop.length - 1].nameerror == '') {
            this.$message.error('请添加适用商品')
            window.scrollTo(0, document.getElementById('commodityFlg').scrollHeight)
            return false
          }
          let _attr = this.oData.searchShop.filter((v) => {
            return v.nameerror != ''
          })
          if (_attr.length > 0) {
            window.scrollTo(0, document.getElementById('commodityFlg').scrollHeight)
            return false
          }
          this.$store.dispatch('coupon/setCouponData', this.oData)
          this.$emit('couponCreat')
        }
      })
    }
  },
  methods: {
    stripscript (name, $event) {
      if ($event) {
        this.oData[name] = $event.replace(/[！!@#$¥%^&*_<>~]/gi, '')
      }
    },
    provingNum ($event) {
      if (+$event.length === 1) {
        this.oData.giveLimit = $event.replace(/[^1-9]/gi, '')
      } else {
        this.oData.giveLimit = $event.replace(/[\D]/gi, '')
      }
    },
    addShopData () {
      if (this.oData.searchShop[this.oData.searchShop.length - 1].id !== '') {
        this.oData.searchShop.push({ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' })
      }
    },
    changedisplayTime (value) {
      if (this.oData.useDateFromStr) {
        if (this.getTimes(value) > this.getTimes(this.oData.useDateFromStr)) {
          this.oData.displayDateFromStr = ''
          this.$message.error('显示开始时间要早于使用开始时间')
        }
      }
    },
    changeStartTime (value) {
      if (this.oData.displayDateFromStr) {
        if (this.getTimes(value) < this.getTimes(this.oData.displayDateFromStr)) {
          this.oData.useDateFromStr = ''
          this.$message.error('使用开始时间要晚于显示开始时间')
          return false
        }
      }
      if (this.oData.useDateToStr) {
        if (this.getTimes(value) >= this.getTimes(this.oData.useDateToStr)) {
          this.oData.useDateFromStr = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.oData.useDateFromStr) {
        if (this.getTimes(value) <= this.getTimes(this.oData.useDateFromStr)) {
          this.oData.useDateToStr = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    getTimes (value) {
      if (!value) return 0
      return parseInt(new Date(value).getTime() / 1000)
    },
    checkNumberLimit (name, $event) {
      if ($event) {
        let val = $event.replace(/\D/g, '')
        this.oData[name] = val ? parseInt(val) : ''
      }
    },
    checkNumber (name, $event) {
      if ($event) {
        this.oData[name] = ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }
      if ($event > 999999.99) {
        this.oData[name] = 999999.99
      }
    },
    /* 图片限制 */
    beforeAvatarUpload (file) {
      let _type = file.type.toLowerCase()
      let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
      let isLt2M = file.size / 1024/ 1024  <= 1
      if (!isJPG) {
        this.$message.error('上传图片暂时只支持JPG、PNG、JPEG格式')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB')
      }
      const isSize = new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width == img.height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('上传的图片建议400*400')
        return Promise.reject()
      })
      return isJPG && isLt2M && isSize
    }
  }
}
