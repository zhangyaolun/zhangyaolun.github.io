<template>
    <div class="container" v-pageLoading="loading">
        <template-query :channelGoodsList='channelGoodsList' :info.sync="info" @add="add" @query="query"/>
        <template-list :channelGoodsList='channelGoodsList' :list-query="info" :table-data="list" @mod="mod"
                       @query="query"/>
        <template-dialog :info.sync="dialogData" :visible.sync="visible" @comfirm="comfirm"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    const templateList = resolve => require(['./list'], resolve)
    const templateQuery = resolve => require(['./query'], resolve)
    const templateDialog = resolve => require(['./dialog'], resolve)


    export default {
        components: {
            templateList,
            templateQuery,
            templateDialog
        },
        computed: {
            ...mapGetters([
                'loading',
                'channelGoodsList',
            ]),
        },
        data() {
            return {
                visible: false,
                list: [],
                info: {
                    total: 0,
                    currentPage: 1,
                    everyPage: 10,
                    productName: '',
                    barCode: '',
                    status: 0,
                },
                dialogData: {
                    type: 'create',
                    barCode: '',
                    productName: '',
                    imageBigList: [],
                    brand: '',
                    price: '',
                    qty: '',
                    status: 0
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
                this.$api.brandGoods.searchSpuList({...this.info}).then(res => {
                    let {result} = res
                    this.list = [...result.result]
                    this.info.total = result.total
                    this.$store.dispatch('app/setLoading', false)
                }).catch(error => {
                    this.$store.dispatch('app/setLoading', false)
                    this.$message.error(error.message)
                })
            },
            add() {
                this.dialogData = {
                    type: 'create',
                    barCode: '',
                    productName: '',
                    imageBigList: [],
                    brand: '',
                    price: '',
                    qty: '',
                    status: 0
                }
                this.visible = true
                console.log(this.dialogData)
            },
            mod() {
                this.dialogData = {
                    type: 'edit',
                    barCode: '',
                    productName: '',
                    imageBigList: [],
                    brand: '',
                    price: '',
                    qty: '',
                    status: 0
                }
                this.visible = true
                console.log(this.dialogData)
            },
            comfirm(data) {
                console.log(this.dialogData)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin: 20px;

    }
</style>
