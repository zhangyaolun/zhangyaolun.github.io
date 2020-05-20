<template>
  <div class="merchant-container">
    <essential-rule ref="essentialRule"></essential-rule>
    <couponuse-rule ref="couponuseRule"></couponuse-rule>
    <stocksend-rule ref="stocksendRule"></stocksend-rule>
    <customentrance-rule ref="customentranceRule"></customentrance-rule>
    <comment-rule ref="commentRule"></comment-rule>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import couponuseRule from "../coupon_use_rule"
import stocksendRule from "../stock_send_rule"
import customentranceRule from "../custom_entrance_rule"
import commentRule from "../comment_rule"

export default {
  components: {
    essentialRule, // 基本信息设置
    couponuseRule, // 核销商家券设置
    stocksendRule, // 微信发放商家券设置
    customentranceRule, // 微信自定义入口设置
    commentRule // 备注信息设置
  }
}
</script>
