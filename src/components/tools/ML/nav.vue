<template>
  <div>
    <nav v-for="navline in nbconf" class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li v-for='item in navline.sli'>
              <a :href="item.href" target="_blank" :title='item.title'>{{item.name}}</a>
            </li>
            <li class="dropdown" v-if="navline.dd">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{navline.dd.name}} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li v-for='item in navline.dd.sli' :role='item.role' :class='{"divider":item.role === "separator"}'>
                  <a v-if='item.role === "link"' :href="item.href" target="_blank">{{item.name}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import nbconf from './navbar.json'
export default {
  name: 'nav',
  data () {
    return {
      nbconf: nbconf
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style>
  body{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  #app {
    padding-bottom: 60px;
  }
  .item {
    background: #ccc;
  }
  .s-li {
    cursor: pointer; 
    padding: 8px;
    margin: 0px;
  }
  .s-ul {
    list-style-type:none;  
    padding: 0px;
    margin: 0px;
    width: 100%;
    background: #efefef;
  }
  .input-s {
    flex:1 !important;
    height: 41px !important;
    margin: 0px !important;
    outline:none !important;
    padding: 12px !important;
    border-width: 1px !important;
    border-color: #343434 !important;
    font: 16px BlinkMacSystemFont;
  }
  .holder{
    padding: 28px;
    text-align: center;
    color: #323232;
  }
  .engine-select{
    background: #ffffff;
    outline: none;
    padding: 5px;
    margin: 0px;
    font-size: 16px;
    border-width: 1px 0px 1px 1px;
    border-style: solid none solid solid;
    border-color: #343434;
    border-radius: 0px;
    height: 41px;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*在选择框的最右侧中间显示小箭头图片*/
      /*background: url("./arrow.png") no-repeat scroll right center transparent;*/
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
      /*padding-right: 14px;*/
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
  .search-container {
    display: inline-flex;
    display: -webkit-flex; /* Safari */
    display: flex; /* Safari */
    flex-direction:row;
    width: 100%;
    height: 41px;
    margin: 0px;
    padding: 0px;
  }
</style>
