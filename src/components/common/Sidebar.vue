<template>
    <div class="sidebar" :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu v-show="!collapsed" :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <!-- :index="subItem.index"-->
                        <el-menu-item v-for="(subItem,i) in item.subs" :index='i + ""' :key="i"  @click="goAddress(subItem.index)">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" @click="goAddress(item.index)">
                        <i :class="item.icon" ></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <ul v-show='collapsed' class="el-menu el-menu-vertical-demo collapsed">
          <li v-for="(item,index) in items" class="el-submenu item">
            <template v-if="item.subs">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index)" @mouseout="hiddenMenu(index)"><i :class="item.icon"></i></div>
                <ul class="el-menu submenu" :style="{display:item.display}" @mouseover="showMenu(index)" @mouseout="hiddenMenu(index)"> 
                  <li v-for="(child,i) in item.subs" v-if="item.display === 'block'" :key="i" class="el-menu-item" style="padding-left: 40px;" @click="goAddress(child.index)">{{child.title}}</li>
              </ul>
            </template>
            <template v-else>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" @click="goAddress(item.index)"><i :class="item.icon"></i></div>
              </li>
            </template>
          </li>
        </ul>
    </div>
</template>

<script>
  import Bus from './EventBus.js'
  import sidebardata from './sidebar.json'
  export default {
    data () {
      return {
        collapsed: false,
        hiddenAble: false,
        items: sidebardata
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path.replace('/', '')
      }
    },
    methods: {
      goAddress(url){
        if(url) {
          if(url.substring(0, 4) === 'http') {
            window.open(url)
          } else {
            this.$router.push(url)
          }
        }
      },
      showMenu (i) {
        this.hiddenAble = false
        this.items.forEach((item) => {
          item.display = 'none'
        })
        this.items[i].display = 'block'
      },
      hiddenMenu (i) {
        this.hiddenAble = true
        setTimeout(() => {
          if (this.hiddenAble) {
            this.items.forEach((item) => {
              item.display = 'none'
            })
          }
        }, 40)
      }
    },
    created: function () {
      Bus().$on('collapse', (collapsed) => {
        this.collapsed = collapsed
      })
    }
  }
</script>

<style scoped >
    .sidebar{
        display: block;
        width: 250px;
        height: 100%;
        left: 0;
        top: 60px;
        bottom:0;
        flex:0 0 230px;
    }
    .sidebar > ul {
        height:100%;
    }
    .menu-collapsed{
      flex:0 0 60px;
      width: 60px;
    }
    .menu-expanded{
      flex:0 0 230px;
      width: 230px;
    }
    .submenu{
      position:absolute;
      top:0px;
      left:60px;
      z-index:99999;
      height:auto;
      display:none;
    }
    .el-menu{
    }
    .item{
      position: relative;
      background: transparent;
    }
    .collapsed{
      width:60px;
    }
</style>
