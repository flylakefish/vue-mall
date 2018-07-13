<template>
    <div>
        <van-nav-bar 
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack" />

        <div class="register-panel">
            <van-field
                v-model="userName"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="userName=''"
                :error-message="userNameErrorMsg"
            />

            <van-field
                v-model="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />

            <div class="register-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serverAPI.config'
    import {Toast} from 'vant'

    export default {
        data() {
            return {
                userName: '',
                password: '',
                openLoading: false,
                userNameErrorMsg: '',
                passwordErrorMsg: ''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            registerUser(){
                this.openLoading = true;

                let postdata = {userName: this.userName, password: this.password};
                axios.post(url.registerUser,postdata)
                .then(res => {
                    console.log(res)
                    if(res.data.code === 200) {
                        Toast.success('注册成功')
                        this.$router.push('/')
                    }else {
                        console.log(res.data.message)
                        Toast.fail('注册失败')
                        this.openLoading = false;
                    }
                })
                .catch(err => {
                    console.log(err)
                    Toast.fail('注册失败')
                    this.openLoading = false
                })
            },
            checkForm() {
                let isOk = true;
                if(this.userName.length < 5) {
                    this.userNameErrorMsg = '用户名不能少于5位';
                    isOk = false;
                } else {
                    this.userNameErrorMsg = '';
                }

                if(this.password.length < 6) {
                    this.passwordErrorMsg = '密码不能少于6位';
                    isOk = false;
                } else {
                    this.passwordErrorMsg = ''
                }
                return isOk;
            },
            registerAction() {
                this.checkForm() && this.registerUser()
            }

        },
    }
</script>

<style scoped>
.register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-top: 50px;
}
.register-button {
    padding-top: 10px;
}
</style>