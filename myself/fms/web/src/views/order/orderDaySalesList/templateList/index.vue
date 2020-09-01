<template>
    <div class="container" v-pageLoading="loading">
        <template-query :channelGoodsList="channelGoodsList" :info.sync="info" @query="query"/>
        <template-list :list-query="info" :table-data="list" @query="query"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    const templateList = resolve => require(['./list'], resolve)
    const templateQuery = resolve => require(['./query'], resolve)


    export default {
        components: {
            templateList,
            templateQuery
        },
        computed: {
            ...mapGetters([
                'loading',
                'channelGoodsList',
            ]),
        },
        data() {
            return {
                list: [],
                info: {
                    total: 0,
                    currentPage: 1,
                    everyPage: 10,
                    type: '',
                    time: ''
                }
            }
        },
        mounted() {
            this.query()
        },
        methods: {
            query(type) {
                if (type === 'rest') {
                    this.info.currentPage = 1
                    this.info.everyPage = 10
                }
                this.$store.dispatch('app/setLoading', true)
                this.$api.brandGoods.searchBrand({...this.info}).then(res => {
                    let {result} = res
                    this.list = [...result.result]
                    this.info.total = result.total
                    this.$store.dispatch('app/setLoading', false)
                }).catch(error => {
                    this.$store.dispatch('app/setLoading', false)
                    this.$message.error(error.message)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin: 20px;

    }
</style>
