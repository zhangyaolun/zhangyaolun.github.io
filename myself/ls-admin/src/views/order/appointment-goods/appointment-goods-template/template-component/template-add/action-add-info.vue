<template>
  <div class="merchant-container">
    <essential-rule ref="essentialRule"></essential-rule>
    <publicity-rule ref="publicityRule"></publicity-rule>
    <price-rule ref="priceRule"></price-rule>
    <coupon-rule ref="couponRule"/>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import publicityRule from "../publicity_rule"
import priceRule from "../price_rule"
import couponRule from "../coupon_rule"

export default {
  components: {
    essentialRule, // 主档信息设置
    publicityRule, // 公示信息设置
    priceRule, // 价格&限制
    couponRule // 优惠券设置
  }
}
</script>
