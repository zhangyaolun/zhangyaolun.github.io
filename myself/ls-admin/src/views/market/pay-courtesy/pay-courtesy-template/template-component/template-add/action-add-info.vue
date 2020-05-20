<template>
  <div class="merchant-container">
    <essential-rule ref="essentialRule"></essential-rule>
    <stocksend-rule ref="stocksendRule"></stocksend-rule>
    <comment-rule ref="commentRule"></comment-rule>
  </div>
</template>

<script>
import essentialRule from "../essential_rule"
import stocksendRule from "../stock_send_rule"
import commentRule from "../comment_rule"

export default {
  components: {
    essentialRule, // 基本信息设置
    stocksendRule, // 发券设置
    commentRule // 其他设置
  }
}
</script>
