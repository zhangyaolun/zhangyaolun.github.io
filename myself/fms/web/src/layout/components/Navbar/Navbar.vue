<template>
    <section>
        <div class="navbar">
            <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" class="hamburger-container"
                       id="hamburger-container"/>

            <breadcrumb class="breadcrumb-container" id="breadcrumb-container"/>

            <div class="right-menu">
                <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" v-if="nameFlag">
                    <div class="avatar-wrapper">
                        <span>{{ name }}</span>
                        <i class="el-icon-caret-bottom"/>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="logout" style="display:block;">注 销</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="resetPwd" style="display:block;">修改密码</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
        <reset-password-dialog :visible.sync="pwdDialogVisible" @cancle="cancle" @comfirm="comfirm"/>
    </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from './Breadcrumb/index'
  import Hamburger from './Hamburger/index'
  import resetPasswordDialog from './resetPassWord/index'

  export default {
        components: {
            Breadcrumb,
            Hamburger,
            resetPasswordDialog
        },
        data() {
            return {
                nameFlag: true,
                pwdDialogVisible: false
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device',
                'name'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout').catch(error => {
                    this.$message.error(error.message)
                })
                this.$router.push(`/login`)
                this.$store.dispatch('permission/clearRoutes')
                this.$store.dispatch('tagsView/delAllViews')
            },
            resetPwd() {
                this.pwdDialogVisible = true
            },
            cancle() {
                this.pwdDialogVisible = false
            },
            async comfirm(data) {
                await this.$store.dispatch('user/update', data).catch(error => {
                    this.pwdDialogVisible = false
                    location.reload()
                })
                // this.$api.user.update(data).then(res => {
                //     location.reload()
                //     // this.$store.dispatch('user/resetToken').then(() => {
                //     //     //this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                //     // })
                // })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: fixed;
        width: 100%;
        z-index: 10;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            //float: right;
            position: fixed;
            height: 50px;
            line-height: 50px;
            right: 0;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 20px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
