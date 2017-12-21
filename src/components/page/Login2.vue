<template>
    <div class="login-wrap">
        <div class="ms-title">JABETA</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-row :gutter="10">
                      <el-col :span="12"><el-button type="info">刷脸登入（beta）</el-button></el-col>
                      <el-col :span="12"><el-button type="primary" @click="submitForm('ruleForm')">登录</el-button></el-col>
                    </el-row>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">暂时不支持注册</p>
            </el-form>
        </div>
    </div>
</template>

<script>
  import api from '../../api/userapi.json'
  import Vue from 'vue'
  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem('ms_username', self.ruleForm.username)
            this.$http.post(api.login._links, {'username': self.ruleForm.username, 'password': self.ruleForm.password}, {emulateJSON: true}).then(
            function (res) {
              // localStorage.setItem('utoken', res.body.token)
              Vue.http.headers.common['Authorization'] = res.body.token
              sessionStorage.setItem('ms_username', res.body.userinfo.username)
              self.$router.push('/readme')
            }, function () {
              alert('faild login')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:380px;
        height:240px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button {
        width:100%;
        height:36px;
    }
</style>
