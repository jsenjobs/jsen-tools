<template>
    <div  class="login" id="login">
      <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
      <div class="log-bg">
          <div class="log-cloud cloud1"></div>
          <div class="log-cloud cloud2"></div>
          <div class="log-cloud cloud3"></div>
          <div class="log-cloud cloud4"></div>

          <div class="log-logo">欢迎登录!</div>
          <div class="log-text">@JABETA</div>
      </div>

      <div class="log-email">
          <input ref='username' :disabled='isLoging ? true : false' type="text" placeholder="用户名" :class="'log-input' + (username==''?' log-input-empty':'')" v-model="username" @keyup.enter='next'>
          <input ref='password' :disabled="isLoging ? true : false" type="password" placeholder="密码" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password" @keyup.13='login'>
          <a href="javascript:;" class="log-btn" @click="login">登录</a>
      </div>
      <Loading v-if="isLoging" marginTop="-30%"></Loading>
    </div>
</template>

<script>
  import api from '../../api/userapi.json'
  import Vue from 'vue'
  import Loading from './loading.vue'
  let MD5 = require('../../utils/MD5').md5

  export default {
    data: function () {
      return {
        isLoging: false,
        username: '',
        password: ''

      }
    },
    components:{
      Loading
    },
    methods: {
      next() {
        this.$refs.password.focus()
      },
      login () {
        if (this.isLoging) {
          return true
        }
        if (!this.username || !this.password) {
            this.$message({
              message: '请输入用户名和密码',
              type: 'warning'
            });
          return true
        }
        this.isLoging = true
        this.$http.post(api.login._links, {'phone': this.username, 'password': MD5(this.password), 'code':'024568'}, {emulateJSON: true}).then(
        function (res) {
          if (res.body.code !== 0) {
            this.$message({
              message: '登入失败:'+res.body.msg,
              type: 'error'
            });
            this.isLoging = false
            return
          }
          this.isLoging = false
          //登录成功后
          let expireDays = 15;
          this.setCookie('usession', JSON.stringify(res.body.data), expireDays);
          this.setCookie('refreshToken', res.body.refreshToken, 30);
          // localStorage.setItem('utoken', res.body.token)
          Vue.http.headers.common['token'] = res.body.token
          if (res.body.data) {
            Vue.http.headers.common['principal'] = res.body.data.username
          }

          this.$router.push('/readme')
        }, function () {
          this.isLoging = false

          this.$message({
            message: '登入失败',
            type: 'error'
          });
          /*
          if (this.username === 'jsen' && this.password === '123456#ht') {
            //登录成功后
            let expireDays = 15;
            console.log(this.setCookie)
            this.setCookie('usession', {username:'jsen'}, expireDays);
            console.log(this.getCookie('usession'))
            // localStorage.setItem('utoken', res.body.token)
            Vue.http.headers.common['Authorization'] = '123mocktoken'
            this.$router.push('/readme')
            this.$message({
              message: '模拟用户登入成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '登入失败',
              type: 'error'
            });
          }
          */
        })
        return true
      }
    },
    mounted: function() {
      this.$refs.username.focus()
    }
  }
</script>

<style scoped>
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -250px;
  width: 500px;
  min-height: 400px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707
}

.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}

.log-close:hover .icons {
  transform: rotate(180deg);
}

.log-close .icons {
  opacity: 1;
  transition: all .3s
}

.log-cloud {
  background-image: url(../../../static/img/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1
}

.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(.6);
  animation: cloud1 20s linear infinite;
}

.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}

.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(.8);
  animation: cloud3 21s linear infinite;
}

.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(.4);
  animation: cloud4 19s linear infinite;
}

.log-bg {
  background: url(../../../static/img/login-bg.jpg);
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.log-logo {
  height: 80px;
  margin: 80px auto 25px;
  text-align: center;
  color: #1fcab3;
  font-weight: bold;
  font-size: 40px;
}

.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}

.log-logo,.log-text {
  z-index: 2
}

.icons {
  background: url(../../../static/img/icons.png) no-repeat;
  display: inline-block;
}

.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}

.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}

.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3B5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

.log-btn.tw {
  background-color: #13B4E9
}

.log-btn.email {
  background-color: #50E3CE
}

.log-btn:hover,.log-btn:focus {
  color: #fff;
  opacity: .8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}

.log-email .log-btn {
  background-color: #50E3CE;
  text-align: center;
}

.log-input-empty {
  border: 1px solid #f37474 !important;
}

.isloading {
  background: #d6d6d6
}

.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}

.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}

.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #EBEBEB;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 24px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}

.log-input.warn {
  border: 1px solid #f88787
}

@-webkit-keyframes cloud1 {
  
  0% {
    left: 200px
  }

  100% {
    left: -130px;
  }
}

@keyframes cloud1 {
  0% {
    left: 200px
  }

  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@keyframes cloud2 {
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud3 {
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@-webkit-keyframes cloud4 {
  
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud4 {
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}

input {
  outline: none;
}
</style>
