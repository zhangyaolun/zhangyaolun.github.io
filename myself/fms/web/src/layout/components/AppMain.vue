<template>
    <section class="app-main">
        <transition mode="out-in" name="fade-transform">
            <keep-alive :include="cachedViews">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            cachedViews() {
                return this.$store.getters.cachedViews
            },
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-main {
        min-height: calc(100vh - 84px);
        width: 100%;
        position: relative;
        top: 84px;
        overflow: hidden;
        /*background: #C0C4CC;*/
    }

    .fixed-header + .app-main {
        padding-top: 50px;
    }

    .hasTagsView {
        .app-main {
            min-height: calc(100vh - 84px);
        }

        .fixed-header + .app-main {
            padding-top: 84px;
        }
    }
</style>

<style lang="scss">
    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 15px;
        }
    }
</style>
