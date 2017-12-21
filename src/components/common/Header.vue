<template>
    <div class="header">
        <div class="logo" v-show='!collapsed'>Jabeta</div>
        <div class="tools" :class='{collapsed:collapsed}' @click.prevent="collapse">
            <i v-if="!collapsed" class="fa fa-align-justify"></i>
            <img v-if="collapsed"  style="width:32px;height:32px;" src='../../../static/img/jlogo.png'>
        </div>
        <div class="menus">
            <el-menu default-active="0" mode="horizontal" @select="handleSelect">
                <el-submenu v-if='item.subs' v-for="(item, i) in navInfo" :key="item.name" :index='i + ""'>
                    <template slot="title">{{item.name}}</template>
                    <el-menu-item :href="sub.href" v-for="(sub, index) in item.subs"  :key="sub.name" :index="(i*100+index)+''">
                        <a :href="sub.href" target="_blank">{{sub.name}}</a>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-if='!item.subs' v-for="(item, i) in navInfo" :key="item.name" :href="item.href"  :index="(i*100)+''">
                    <a :href="item.href" target="_blank">{{item.name}}</a>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/head.png">
                    {{username}}
                    <img class="user-logo2" src="../../../static/img/ai.png">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
  import Bus from './EventBus.js'
  import navJson from './navbar.json'
  import api from '../../api/userapi.json'
  import Vue from 'vue'
  export default {
    data () {
      return {
        name: 'Jsen',
        collapsed: false,
        navInfo: navJson.left
      }
    },
    computed: {
      username () {
        let usession = this.getCookie('usession')
        try{
            usession = JSON.parse(usession)
            if(usession && usession.username) return usession.username
        } catch(e) {
            return 'null'
        }
        // let username = localStorage.getItem('ms_username')
        return 'null' // username ? username : this.name
      }
    },
    methods: {
      getUsername () {
        let usession = this.getCookie('usession')
        try{
            usession = JSON.parse(usession)
            if(usession && usession.username) return usession.username
        } catch(e) {
            return 'null'
        }
        // let username = localStorage.getItem('ms_username')
        return 'null' // username ? username : this.name
      },
      handleCommand (command) {
        let self = this
        if (command === 'loginout') {
          localStorage.removeItem('ms_username')
          // console.log(Vue.http.headers.common['token'])
          // this.$router.push('/login')
          this.$http.get(api.logout._links+'?username=' + this.getUsername(), {emulateJSON: true}).then(
            function (res) {
              self.delCookie('usession')
              self.$router.push('/login')
            },
            function () {
              self.delCookie('usession')
              self.$router.push('/login')
              this.$message({
                message: '调用退出api失败',
                type: 'error'
              });
            })
        }
      },
      collapse () {
        this.collapsed = !this.collapsed
        Bus().$emit('collapse', this.collapsed)
      },
      handleSelect (index) {
        var iP = parseInt(index / 100)
        var iS = index - iP * 100
        console.log(iP)
        console.log(iS)
        window.open(this.navInfo[iP].subs[iS].href)
      }
    },
    created: function () {
      Bus().$emit('collapse', this.collapsed)
    }
  }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        line-height: 60px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:230px;
        text-align: center;
    }
    .menus {
        flex: 1;
        float: left;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        padding-right: 14px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:10px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .user-info .user-logo2{
        position: absolute;
        right:0;
        top:20px;
        width:12px;
        height:12px;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .tools{
        float: left;
        width: 60px;
        height: 60px;
        text-align: center;
    }
    .tools:hover {
        background: #00cca0;
    }
    .collapsed {
        background: #00d1b2;
    }
    .menus > .el-menu {
        background-color: #00d1b2 !important;
    }
</style>
