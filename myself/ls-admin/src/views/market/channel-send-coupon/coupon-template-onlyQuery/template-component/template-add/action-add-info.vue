<template>
  <div class="merchant-container">
    <essential-rule ref="essentialRule"></essential-rule>
    <coupon-rule ref="couponRule"></coupon-rule>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import couponRule from "../coupon_rule"

export default {
  components: {
    essentialRule, // 基本信息设置
    couponRule // 优惠券设置
  }
}
</script>
