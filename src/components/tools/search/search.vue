<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6" style="display:flex;flex-direction:column;height:100%;">
          <div class="search-container" style="margin-bottom:6px;">
            <select name="engine-select" class='engine-select' v-model="selectedEngine">
              <option value="百度">百度</option>
              <option value="好搜">好搜</option>
              <option value="搜狗">搜狗</option>
              <option value="淘宝">淘宝</option>
            </select>
            <input class="input-s" type='text' name="input" 
              :placeholder='getPHStr'
              v-model='key' 
              @keyup='getKey' 
              @keydown.40.prevent="itemDown"
              @keydown.38.prevent="itemUp"
              @keyup.enter='open'
              v-focus
            >
          </div>
          <div style="flex:1;overflow:auto;">
            <ul class="s-ul">
              <li class="s-li" v-show='lists.length!=0' v-for='(item, index) in lists' :class="{item:current == index}" 
                @click='openUrl(item)'
                @mouseover='over(index)'
                @mouseout='out()'
              >{{item}}</li>
              <p v-show='lists.length==0' class="holder">无数据</p>
            </ul>
          </div>
          <!-- <iframe style="height:400px;" src="http://proceedings.mlr.press/index.html"></iframe> -->
        </div>
        <div class="col-md-6">
          <books></books>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import engine from './engine.json'
import books from '../books/Books.vue'
export default {
  name: 'app',
  data () {
    return {
      key: '',
      oKey: '',
      lists: [],
      current: -1,
      selectedEngine: '百度',
      sUrls: {}
    }
  },
  computed: {
    getPHStr: function () {
      return '搜索' + this.selectedEngine
    }
  },
  created: function () {
    var self = this
    window.sogou = {}
    window.sogou.sug = (json) => {
      self.lists = json[1]
    }
    window.youdao = {}
    window.youdao.setSearchMoreParams = (str) => {
    }
    window.youdao.updateCall = (data) => {
      // console.log(decodeUTF8(data))
    }
    this.sUrls = engine
  },
  components: {
    books
  },
  methods: {
    getKey: function (events) {
      if (events.keyCode === 40 || events.keyCode === 38 || events.keyCode === 13) return
      this.current = -1
      var uc = this.getUc()
      if (!uc) return

      if (this.selectedEngine === '搜狗') {
        this.hintFromSougou(uc, this.key)
        return
      }
      if (this.selectedEngine === '淘宝') {
        this.hintFromTaobao(uc, this.key)
        return
      }
      var params = {}
      params[uc.kW] = this.key
      this.$http.jsonp(uc.hint, {
        params: params,
        jsonp: uc.jsonp
      }).then((res) => {
        this.lists = res.data[uc.hS]
      })
      this.oKey = this.key
    },
    hintFromSougou: function (uc, key) {
      var params = {}
      params[uc.kW] = key
      params = Object.assign(params, uc.params)
      this.$http.jsonp(uc.hint, {params: params, jsonp: uc.jsonp}).then()
    },
    hintFromTaobao: function (uc, key) {
      var params = {}
      params[uc.kW] = key
      this.$http.jsonp(uc.hint, {params: params, jsonp: uc.jsonp}).then((res) => {
        var result = res.data.result
        var self = this
        if (result) {
          self.lists = []
          result.forEach((item) => {
            self.lists.push(item[0])
          })
        }
      })
    },
    itemDown: function () {
      this.current++
      if (this.current >= this.lists.length) this.current = -1
      if (this.current === -1) {
        this.key = this.oKey
      } else {
        this.key = this.lists[this.current]
      }
    },
    itemUp: function () {
      this.current--
      if (this.current <= -2) {
        this.current = this.lists.length - 1
      }
      if (this.current === -1) {
        this.key = this.oKey
      } else {
        this.key = this.lists[this.current]
      }
    },
    open: function (events, u) {
      var url = u
      if (!url) {
        var uc = this.getUc()
        if (!uc) return
        url = uc.search + this.key
        if (this.current >= 0) {
          url = uc.search + this.lists[this.current]
        };
      }
      this.key = ''
      this.lists = []
      this.current = -1
      window.open(url)
    },
    openUrl: function (item) {
      var uc = this.getUc()
      if (!uc) return
      this.open(null, uc.search + item)
    },
    getUc: function () {
      var uc = this.sUrls[this.selectedEngine]
      if (!uc) {
        this.selectedEngine = '百度'
        uc = this.sUrls[this.selectedEngine]
      }
      return uc
    },
    over: function (index) {
      this.current = index
    },
    out: function () {
      this.current = -1
    }
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
    padding-left: 12px !important;
    padding-right: 12px !important;
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
    padding: 0px;
  }
</style>
