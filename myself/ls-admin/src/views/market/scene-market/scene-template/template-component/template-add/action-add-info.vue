<template>
  <div class="sceneMarket-container">
    <essential-rule ref="essentialRule"></essential-rule>
    <couponuse-rule ref="couponuseRule"></couponuse-rule>
    <stocksend-rule ref="stocksendRule"></stocksend-rule>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import couponuseRule from "../coupon_use_rule"
import stocksendRule from "../stock_send_rule"

export default {
  components: {
    essentialRule, // 基本信息设置
    couponuseRule, // 权益礼包
    stocksendRule // 通知配置
  }
}
</script>
