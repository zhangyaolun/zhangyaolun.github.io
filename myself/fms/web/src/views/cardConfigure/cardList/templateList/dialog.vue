<template>
    <el-dialog :before-close="() => $emit('update:visible',false)" :title="title" :visible.sync="visible" @close="close()"
               class="template-dialog">
        <el-form :model="info" :rules="rules" label-width="130px" ref="form">

            <el-form-item label="商品编码：" prop="barCode">
                <el-select placeholder="请选择" v-model="info.brand">
                    <el-option
                            :key="item.id"
                            :label="item.brandName"
                            :value="item.id"
                            v-for="item in goodsList"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="自定义批次号：" prop="productName">
                <el-input autocomplete="off" clearable placeholder="请输入自定义批次号" v-model="info.productName"/>
            </el-form-item>

            <el-form-item label="有效期限：" prop="time">
                <el-date-picker
                        default-time="23:59:59"
                        placeholder="选择日期时间"
                        type="datetime"
                        v-model="info.time"
                        value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="数量：" prop="qty">
                <el-input @input="provingNum('qty')" autocomplete="off" clearable placeholder="请输入数量"
                          v-model="info.qty"/>
                <span class="placeholder">每批次生成最多一万</span>
            </el-form-item>

        </el-form>

        <confirm-dialog :innerVisible.sync="innerVisible"
                        @comfirm="()=>{ $emit('update:visible', false); $emit('comfirm') }"></confirm-dialog>

        <div class="dialog-footer" slot="footer">
            <el-button @click="close()">取 消</el-button>
            <el-button @click="comfirm()" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            info: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                innerVisible: false,
                goodsList: [
                    {
                        id: '1',
                        brandName: '麦当劳'
                    }
                ],
                rules: {
                    qty: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    ],
                    // sysObj: [
                    //   { validator: validateSysObj, trigger: 'change' },
                    // ],
                }
            }
        },
        computed: {
            title() {
                return {
                    'create': '生成卡券',
                    'edit': '编辑商品',
                }[this.info.type]
            }
        },
        methods: {
            provingNum(name) {
                this.$set(this.info, name, this.info[name].replace(/[^1-9]/gi, ''))
            },
            close() {
                this.$refs['form'].clearValidate()
                this.$emit('update:visible', false)
            },
            comfirm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.innerVisible = true
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

