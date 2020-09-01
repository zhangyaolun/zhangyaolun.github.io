<template>
    <div class="dashboard-container">
        Welcome {{ name }}
    </div>
</template>

<script>
    export default {
        computed: {
            name() {
                return this.$store.getters.name
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dashboard-container {
        font-size: 30px;
        color: #666;
        text-align: center;
        margin-top: 80px;
    }
</style>
