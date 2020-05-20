<template>
  <div class="dashboard-container">
    welcome {{ name }}
  </div>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$store.getters.name
    }
  }
}
</script>
