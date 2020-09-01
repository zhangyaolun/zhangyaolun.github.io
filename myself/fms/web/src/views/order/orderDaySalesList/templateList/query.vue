<template>

    <el-card class="box-card">
        <el-form :model="info" class="formQuery" label-width="130px" ref="listQueryForm">

            <el-form-item label="渠道名称：" prop="type">
                <el-select placeholder="请选择" v-model="info.type">
                    <el-option
                            :key="item"
                            :label="channelGoodsList[item]"
                            :value="Number(item)"
                            v-for="item in Object.keys(channelGoodsList)"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="创建时间：" prop="time">
                <el-date-picker
                        :default-time="['23:59:59']"
                        placeholder="选择日期"
                        type="date"
                        v-model="info.time"
                        value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button @click="reset('listQueryForm')" plain size='small'>重置</el-button>
                <el-button @click="queryList" plain size='small' type="primary">查询</el-button>
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
            channelGoodsList: {
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

