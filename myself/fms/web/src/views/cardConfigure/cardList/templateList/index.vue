<template>
    <div class="container" v-pageLoading="loading">
        <template-query :cardType="cardType" :info.sync="info" @add="add" @query="query"/>
        <template-list :cardType="cardType" :list-query="info" :table-data="list" @query="query"/>
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
                'cardType'
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
                    brandNameCn: ''
                },
                dialogData: {
                    type: 'create',
                    imageBigList: [],
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
            },
            add() {
                this.dialogData = {
                    type: 'create',
                    brandNameCn: '',
                    imageBigList: [],
                }
                this.visible = true
                console.log(this.dialogData)
            },
            comfirm(data) {
                this.visible = false
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
