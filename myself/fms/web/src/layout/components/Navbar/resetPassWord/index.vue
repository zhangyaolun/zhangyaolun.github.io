<template>
    <el-dialog :visible.sync="dialogFormVisible" @close="close('resetPwdForm')" class="resetPwdDialog" title="修改密码">
        <el-form :model="info" :rules="rules" label-width="100px" ref="resetPwdForm">
            <el-form-item label="愿密码" prop="oldPassword">
                <el-input autocomplete="off" clearable show-password v-model="info.oldPassword"/>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input autocomplete="off" clearable show-password v-model="info.password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordRepeat">
                <el-input clearable show-password v-model="info.passwordRepeat"/>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button @click="cancle('resetPwdForm')">取 消</el-button>
            <el-button @click="comfirm('resetPwdForm')" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            }
        },
        data() {
            var validateRepeatPwd = (rule, value, callback) => {
                if (this.info.password !== '') {
                    if (value !== this.info.password) {
                        callback(new Error('两次新密码输入不一致'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            return {
                info: {
                    oldPassword: '',
                    password: '',
                    passwordRepeat: ''
                },
                dialogFormVisible: false,
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ],
                    passwordRepeat: [
                        {validator: validateRepeatPwd, trigger: 'blur'},
                        {required: true, message: '请再次输入新密码', trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            visible(val) {
                this.dialogFormVisible = val
                this.$nextTick(() => {
                    this.$refs.resetPwdForm.clearValidate()
                })
            }
        },
        methods: {
            close(formName) {
                this.$refs[formName].clearValidate()
                this.$emit('update:visible', false)
            },
            cancle(formName) {
                this.$refs[formName].resetFields()
                this.$emit('cancle')
            },
            comfirm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            oldPassword: this.info.oldPassword,
                            password: this.info.password,
                        }
                        this.$emit('comfirm', data)
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .resetPwdDialog {
        .el-input {
            width: 50%;
        }
    }
</style>
