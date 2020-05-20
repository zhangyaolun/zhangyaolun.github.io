<template>
  <div class="container">
    <essential-rule ref="essentialRule"></essential-rule>
    <coupon-rule ref="couponRule"/>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import couponRule from "../coupon_rule"

export default {
  components: {
    essentialRule, // 信息设置
    couponRule // 优惠券设置
  }
}
</script>
