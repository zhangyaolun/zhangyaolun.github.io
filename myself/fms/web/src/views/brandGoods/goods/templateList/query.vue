<template>

    <el-card class="box-card">
        <el-form :model="info" class="formQuery" label-width="130px" ref="listQueryForm">
            <el-form-item label="商品名称：" prop="productName">
                <el-input clearable placeholder="请输入商品名称" v-model="info.productName"/>
            </el-form-item>
            <el-form-item label="商品编号：" prop="barCode">
                <el-input clearable placeholder="请输入商品编号" v-model="info.barCode"/>
            </el-form-item>
            <el-form-item label="销售状态：" prop="status" v-if="goodsStatus">
                <el-select placeholder="请选择" v-model="info.status">
                    <el-option
                            :key="item"
                            :label="goodsStatus[item]"
                            :value="Number(item)"
                            v-for="item in Object.keys(goodsStatus)"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset('listQueryForm')" plain size='small'>重置</el-button>
                <el-button @click="queryList" plain size='small' type="primary">查询</el-button>
                <el-button @click="() => $emit('add')" plain size='small' type="success">新增</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                required: true
            },
            goodsStatus: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {
            reset(formName) {
                this.$refs[formName].resetFields()
                this.$emit('query', 'rest')
            },
            queryList() {
                this.$emit('query')
            }
        }
    }
</script>

