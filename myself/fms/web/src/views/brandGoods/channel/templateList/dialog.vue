<template>
    <el-dialog :before-close="() => $emit('update:visible',false)" :title="title" :visible.sync="visible" @close="close()"
               class="template-dialog">
        <el-form :model="info" :rules="rules" label-width="130px" ref="form">

            <el-form-item label="商品编码：" prop="barCode">
                <el-input autocomplete="off" clearable placeholder="请输入商品编码" v-model="info.barCode"/>
            </el-form-item>

            <el-form-item label="商品名称：" prop="productName">
                <el-input autocomplete="off" clearable placeholder="请输入商品名称" v-model="info.productName"/>
            </el-form-item>

            <el-form-item label="商品图片：" prop="images">
                <uploadimg-more :bundle.sync="info" :limit="1"></uploadimg-more>
                <!--        <span class="promptingDefalut">尺寸为400*400，仅支持JPG/PNG格式，图片要求小于等于2MB，最多可上传5张</span>-->
            </el-form-item>

            <el-form-item label="品牌：" prop="brand">
                <el-select placeholder="请选择" v-model="info.brand">
                    <el-option
                            :key="item.id"
                            :label="item.brandName"
                            :value="item.id"
                            v-for="item in brandList"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="售价：" prop="price">
                <el-input @input="checkSellPrice('price', $event)" autocomplete="off" clearable
                          placeholder="请输入售价" v-model="info.price"/>
            </el-form-item>

            <el-form-item label="预警库存：" prop="qty">
                <el-input @input="provingNum('qty')" autocomplete="off" clearable placeholder="请输入预警库存"
                          v-model="info.qty"/>
                <!--        <span class="placeholder">请填写1以上的数字（包含1），如果输入0则代表不限购次数</span>-->
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
  import uploadimgMore from "@/components/Image/uploadImgMore"
  import confirmDialog from "@/components/Dialog/confirmDialog/index"

  export default {
        components: {
            uploadimgMore,
            confirmDialog
        },
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
                brandList: [
                    {
                        id: '1',
                        brandName: '麦当劳'
                    }
                ],
                rules: {
                    brandNameCn: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
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
                    'create': '新增商品',
                    'edit': '编辑商品',
                }[this.info.type]
            }
        },
        methods: {
            checkSellPrice(name, $event) { // 拼团价
                this.$set(this.info, name, ($event.match(/^\d*(\.?\d{0,2})/g)[0]) || null)
            },
            provingNum(name) {
                //this.$set(this.info, name, this.info[name].replace(/[\D]/gi, ''))
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

