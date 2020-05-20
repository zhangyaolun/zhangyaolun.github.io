<template>
  <div v-loading="loading">
    <action-info :tableData.sync="list"></action-info>
    <coupon-rule :title="couponBeforeTitle" :couponList="couponBeforeList"></coupon-rule>
    <coupon-rule :title="couponAfterTitle" :couponList="couponAfterList"></coupon-rule>
    <action-btn></action-btn>
  </div>
</template>

<script>
import actionInfo from '../template-component/action-add-info'
import couponRule from '../template-component/coupon_rule'
import actionBtn from './action-btn'
import { formatBackendTime } from '@/filters'

export default {
  components: {
    actionInfo,
    couponRule,
    actionBtn
  },
  computed: {
    loading () {
      return this.$store.getters.specialActivityLoading
    }
  },
  data () {
    return {
      couponBeforeTitle: '赠送礼券设置(原值)',
      couponBeforeList: [],
      couponAfterTitle: '赠送礼券设置(新值)',
      couponAfterList: [],
      list: [
        { fieldName: 'id', name: '活动ID', beforeVal: '', afterVal: '' },
        { fieldName: 'title', name: '活动名称', beforeVal: '', afterVal: '' },
        { fieldName: 'beginTime', name: '活动开始时间', beforeVal: '', afterVal: '' },
        { fieldName: 'endTime', name: '活动结束时间', beforeVal: '', afterVal: '' },
        { fieldName: 'displayDateFrom', name: '公开结束时间', beforeVal: '', afterVal: '' },
        { fieldName: 'displayDateTo', name: '公开结束时间', beforeVal: '', afterVal: '' },
        { fieldName: 'activityUnicom', name: '活动类型', beforeVal: '', afterVal: '' },
        { fieldName: 'userType', name: '会员范围', beforeVal: '', afterVal: '' },
        { fieldName: 'prohibitFlg', name: '屏蔽常规活动', beforeVal: '', afterVal: '' },
        { fieldName: 'activityType', name: '赠送范围', beforeVal: '', afterVal: '' },
        { fieldName: 'couponSendType', name: '礼券赠送种类', beforeVal: '', afterVal: '' },
        { fieldName: 'activityKey', name: '活动KEY', beforeVal: '', afterVal: '' },
        { fieldName: 'publishFlg', name: '公开状态', beforeVal: '', afterVal: '' },
        { fieldName: 'couponShowOffset', name: '活动券显示位置(px)', beforeVal: '', afterVal: '' },
        { fieldName: 'couponType', name: '券类型', beforeVal: '', afterVal: '' },
        { fieldName: 'pushFlg', name: '是否推送服务通知', beforeVal: '', afterVal: '' },
      ],
      id: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.getSpecialActivityAdminLogDetail(this.id).then(res => {
        let beforeVal = ''
        let afterVal = ''
        let _res = res.data
        this.couponBeforeList = _res.beforeUpdateData ? _res.beforeUpdateData.couponList : []
        this.couponAfterList = _res.afterUpdateData ? _res.afterUpdateData.couponList : []
        this.list.forEach((m, n) => {
          if (_res.beforeUpdateData) {
            beforeVal = _res.beforeUpdateData[m.fieldName]
            if (m.fieldName === 'beginTime' || m.fieldName === 'endTime' || m.fieldName === 'displayDateFrom' || m.fieldName === 'displayDateTo') {
              beforeVal = formatBackendTime(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'activityUnicom') {
              beforeVal = this.activityUnicomFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'userType') {
              beforeVal = this.userTypeFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'prohibitFlg') {
              beforeVal = this.prohibitFlgFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'activityType') {
              beforeVal = this.activityTypeFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'couponSendType') {
              beforeVal = this.couponSendTypeFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'publishFlg') {
              beforeVal = this.publishFlgFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'couponType') {
              beforeVal = this.couponTypeFilter(_res.beforeUpdateData[m.fieldName])
            } else if (m.fieldName === 'pushFlg') {
              beforeVal = this.pushFlgFilter(_res.beforeUpdateData[m.fieldName])
            }
            this.$set(this.list[n], 'beforeVal', beforeVal)
          }
          if (_res.afterUpdateData) {
            afterVal = _res.afterUpdateData[m.fieldName]
            if (m.fieldName === 'beginTime' || m.fieldName === 'endTime' || m.fieldName === 'displayDateFrom' || m.fieldName === 'displayDateTo') {
              afterVal = formatBackendTime(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'activityUnicom') {
              afterVal = this.activityUnicomFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'userType') {
              afterVal = this.userTypeFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'prohibitFlg') {
              afterVal = this.prohibitFlgFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'activityType') {
              afterVal = this.activityTypeFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'couponSendType') {
              afterVal = this.couponSendTypeFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'publishFlg') {
              afterVal = this.publishFlgFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'couponType') {
              afterVal = this.couponTypeFilter(_res.afterUpdateData[m.fieldName])
            } else if (m.fieldName === 'pushFlg') {
              afterVal = this.pushFlgFilter(_res.afterUpdateData[m.fieldName])
            }
            this.$set(this.list[n], 'afterVal', afterVal)
          }
        })
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    activityUnicomFilter (val) {
      let activityUnicomObj = {
        0: '外部投放',
        1: '联通',
        2: '合作对接',
        3: '内部活动'
      }
      return activityUnicomObj[val]
    },
    activityTypeFilter (val) {
      let activityTypeObj = {
        0: '全赠送',
        1: '只送礼券',
        2: '只送积分'
      }
      return activityTypeObj[val]
    },
    couponSendTypeFilter (val) {
      let couponSendTypeObj = {
        0: '全发送',
        1: '随机一种'
      }
      return couponSendTypeObj[val]
    },
    userTypeFilter (val) {
      let userTypeObj = {
        0: '全会员',
        1: '新会员',
        2: '老会员'
      }
      return userTypeObj[val]
    },
    prohibitFlgFilter (val) {
      let prohibitFlgObj = {
        0: '不屏蔽',
        1: '屏蔽所有'
      }
      return prohibitFlgObj[val]
    },
    publishFlgFilter (val) {
      let publishFlgFlgObj = {
        0: '公开',
        1: '不公开'
      }
      return publishFlgFlgObj[val]
    },
    couponTypeFilter (val) {
      let couponTypeFlgObj = {
        'SINGLE': '单券',
        'MANY': '多券'
      }
      return couponTypeFlgObj[val]
    },
    pushFlgFilter (val) {
      let pushFlgObj = {
        0: '不推送',
        1: '推送'
      }
      return pushFlgObj[val]
    }
  }
}

</script>
