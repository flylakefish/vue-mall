<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goback"
            />

        <div class="login-panel">
            <van-field
                v-model="userName"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                requied
                @click-icon="username=''"
                :error-message="userNameErrorMsg"
                />
            
            <van-field 
                v-model="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                requied
                :error-message="passwordErrorMsg"
                />
            
            <div class="login-button">
                <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">登录</van-button>
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
        created(){
            if(window.localStorage.getItem('userInfo')){
                Toast.success('您已经登录')
                this.$router.push('/')
            }
        },
        methods: {
            goback() {
                this.$router.go(-1);
            },
            LoginAction() {
                this.checkForm() && this.UserLogin()
            },
            UserLogin(){
                this.openLoading = true;
                let data = {userName: this.userName, password: this.password};
                axios.post(url.loginUser ,data)
                .then(res => {
                    if(res.data.code === 200) {
                        new Promise((resolve, reject) => {
                            window.localStorage.setItem('userInfo',{userName: this.userName})
                            setTimeout(() => {
                                resolve()
                            },500)
                        })
                        .then(() => {
                            Toast.success('登录成功')
                            this.$router.push('/');
                        })
                        .catch(error => {
                            Toast.fail('登录状态保存失败')
                            console.log(error)
                        })
                    } else {
                        Toast.fail(res.message)
                        this.openLoading = false
                    }
                })
                .catch(error => {
                    Toast.fail('登录失败')
                    this.openLoading = false
                })
            },
            checkForm(){
                let isOk= true
                if(this.userName.length<5){
                    this.userNameErrorMsg="用户名不能小于5位"
                    isOk= false
                }else{
                    this.userNameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            }       
 
        },
    }
</script>

<style scoped>
    .login-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .login-button{
        padding-top:10px;
    }
</style>