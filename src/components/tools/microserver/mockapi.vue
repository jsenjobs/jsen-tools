<template>
  <div>
    <div class="title">{{ msg }}</div>

    <pre v-highlight class="highlight d_jump"><code v-highlight v-html="mockResult" class="highlight"></code></pre>

    <el-card class="box-card" style='margin-bottom:800px;'>
    <div slot="header" class="clearfix">
      <div>
        <span class="fname">{{ data.links }}</span>
        <span class="method" :class='{"code-post":data.method === "GET", "code-post":data.method === "POST"}'>{{ data.method }}</span>
        <el-button class='back' type="primary" size="small" icon='arrow-left' @click='goback'>返回</el-button>
      </div>
      <span style="line-height: 36px;">{{address}}{{data._links}}</span>

      <el-button style="float: right;" type="primary" icon='setting' @click='mockApi'>测试</el-button>
    </div>
    <el-card class="box-card"  style="margin-top:20px;margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>Params</span>
      </div>
      <div v-for="(item,index) in data.params" style="margin-bottom:6px;">
        <el-row>
          <el-col :span="8">
            <span class='title-item'>{{item.name}}</span>
          </el-col>
          <el-col :span='8'>
          <span class='type'>{{item.type}}</span><span class='necessary'>{{item.necessary === false ? '非必需': '&nbsp&nbsp必需&nbsp&nbsp'}}</span>
          </el-col>
          <el-col :span="8">
            <el-input v-if='item.type !== "file"' :ref='item.name' :placeholder="item.name"></el-input>
            <label v-if='item.type === "file"' class="mo-upload">
              <input :ref='"_file_"+item.name' type="file" :accept="accepts" @change='txtchange(index, $event)'>
              <a><span class='selectfile'>选择文件</span><span class='filename'>{{filterFile(index)}}</span></a>
            </label>
          </el-col>
        </el-row>
      </div>
      <div v-if='!data.params || data.params.length === 0' class="hold">
        没有参数
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Headers</span>
      </div>
      <div v-for="item in data.headers" style="margin-bottom:6px;">
        <el-row>
          <el-col :span="8">
            <span class='title-item'>{{item.name}}</span>
          </el-col>
          <el-col :span='8'>
          <span class='type'>{{item.type}}</span><span class='necessary'>{{item.necessary === false ? '非必需': '&nbsp&nbsp必需&nbsp&nbsp'}}</span>
          </el-col>
          <el-col :span="8">
            <el-input :ref='"headers"+item.name' :placeholder="item.name"></el-input>
          </el-col>
        </el-row>
      </div>
      <div v-if='!data.headers || data.headers.length === 0' class="hold">
        没有Headers
      </div>
    </el-card>
  </el-card>
  </div>
</template>

<script>
import api from '../../../api/microserver.json'
import Vue from 'vue'
let MD5 = require('../../../utils/MD5').md5
export default {
  name: 'microparams',
  data () {
    return {
      msg: '服务测试',
      data:{},
      address:'',
      mockResult:'',
      type:'normal',


      accepts : { //允许的上传类型
          type : String,
          default : 'image/jpeg,image/jpg,image/png,image/gif'
      },

      fileStrs:{
        0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',10:''
      }
    }
  },
  computed: {
  },
  methods: {
    goback() {
        this.$router.back()
        // this.$router.go(-1)
    },
    filterFile(index) {
      if(this.fileStrs[index]) {
        return this.fileStrs[index]
      } else {
        this.fileStrs[index] = ''
        return this.fileStrs[index]
      }
    },
    txtchange(index, event){
      let files = event.target.files
      if(files.length > 1) {
        this.fileStrs[index] = '共选择'+files.length+'个文件'
      } else {
        this.fileStrs[index] = files[0].name
      }
      console.log(this.fileStrs)
      // console.error(event.target.files[0])
      // console.error(event.target)
    },
    createParams(method = 'post') {

      let shoParams = this.data.params
      let params = {}
      let refs = this.$refs
      let hasFile = false
      for(let key in refs) {
        if(key.substring(0,7) !== 'headers') {
          if(key.substring(0, 6) !== '_file_') {
            let value = refs[key][0].$refs.input.value
            if (value) {
              params[key] = value
              if(key === 'password') {
                params[key] = MD5(value)
              }
            }
          } else {
            // console.error(refs[key][0].files[0])
            params[key.substring(6, key.length)] = refs[key][0].files[0]
            hasFile = true
          }
        }
      }
      if (!shoParams) {
        if(method === 'get') {
          return params
        } else {
          return {
            params:{},
            restParams:''
          }
        }
      }
      for(let i = 0; i<shoParams.length; i++) {
        let key = shoParams[i].name
        if (shoParams[i].necessary !== false) {
          if (!params[key]) {
            this.$message({
              message: key+'不能为空',
              type: 'warning'
            });
            return false
          }
        }
      }

      // 构建rest参数
      let lrp = this.data.local_rest_params
      let newParams = ''
      if (lrp) {
        for(let i = 0; i < lrp.length; i++) {
          let key = lrp[i]
          if(!params[key]) {
            this.$message({
              message: key+'为空',
              type: 'warning'
            });
            return false
          }
          newParams += '/'+params[key]
          delete params[key]
        }
      }

      if (method === 'get') {
        newParams += '?'
        for(let key in params) {
          newParams += key + '=' + params[key] + '&'
        }
        if (newParams.length > 1) {
          newParams = newParams.substring(0, newParams.length - 1)
          return newParams
        } else {
          return 'emptydata'
        }
      }

      // 创建formdata
      if(hasFile) {
        let formData = new FormData()
        for(let k in params) {
          formData.append(k, params[k])
        }

        return {
          params:formData,
          restParams:newParams
        }
      } else {
        return {
          params:params,
          restParams:newParams
        }
      }
    },
    createHeaders() {
      let headers = { }
      if(Vue.http.headers.common['token']) headers.token = Vue.http.headers.common['token']
      if(Vue.http.headers.common['principal']) headers.principal = Vue.http.headers.common['principal']
      let refs = this.$refs
      for(let key in refs) {
        if(key.substring(0,7) === 'headers') {
          let value = refs[key][0].$refs.input.value
          if (value) {
            headers[key.substring(7, key.length)] = value
          }
        }
      }
      let shoHeaders = this.data.headers
      if (!shoHeaders) return headers
      for(let i = 0; i<shoHeaders.length; i++) {
        let key = shoHeaders[i].name
        if (shoHeaders[i].necessary !== false) {
          if (!headers[key]) {
            this.$message({
              message: 'header['+key+']不能为空',
              type: 'warning'
            });
            return false
          }
        }
      }
      return headers
    },
    mockApi() {
      let api = this.address + this.data.links
      if (this.data.method.toLowerCase() === 'get') {
        let headers = this.createHeaders()
        if (!headers) {
          return
        }

        let params = this.createParams('get')
        if (!params && params !== false) {
          this.$message({
            message: '创建参数失败',
            type: 'error'
          });
        }
        if (!params) {
          return
        }
        if (params === 'emptydata') {
          params = ''
        }
        this.$http.get(api + params, {headers:headers,emulateJSON: true}).then(
        function (res) {
          // this.result = this.formatJson(res.body)
          this.mockResult = res.body
          this.jump(0)
          // document.getElementById('output').innerHTML = this.syntaxHighlight(res.body);
          this.$message({
            message: 'api执行成功',
            type: 'success'
          });
        }, function (res) {
          this.mockResult = res.body
          this.jump(0)
          this.$message({
            message: 'api执行失败',
            type: 'error'
          });
        })
      } else if (this.data.method.toLowerCase() === 'post') {
        let headers = this.createHeaders()
        if (!headers) {
          return
        }
        let params = this.createParams('post')
        if (!params && params !== false) {
          this.$message({
            message: '创建参数失败',
            type: 'error'
          });
        }
        if (!params) {
          return
        }
        this.$http.post(api + params.restParams, params.params, {headers:headers, emulateJSON: true}).then(
        function (res) {
          this.mockResult = res.body
          this.jump(0)
          // document.getElementById('output').innerHTML = this.syntaxHighlight(res.body);
          this.$message({
            message: 'api执行成功',
            type: 'success'
          });
        }, function (res) {
          console.log(res.body)
          if(res.body && res.body.code)
          this.mockResult = res.body
          this.jump(0)
          // document.getElementById('output').innerHTML = this.syntaxHighlight(res.body);
          this.$message({
            message: 'api执行失败',
            type: 'error'
          });
        })
      } else {
        this.$message({
          message: '不支持'+this.data.method.toLowerCase()+'操作',
          type: 'error'
        });
        return
      }
    },

    // dep
    formatJson(data,compress/*是否为压缩模式*/){/* 格式化JSON源码(对象转换为JSON文本) */  
      var indentChar = '  ';   
      if(!data) {
        this.$message({
          message: '数据为空,无法格式化!',
          type: 'error'
        });
        return;   
      }  
      var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;   

      var notify=function(name,value,isLast,indent/*缩进*/,formObj){   
        nodeCount++;/*节点计数*/  
        for (var i=0,tab='';i<indent;i++ )tab+=indentChar;/* 缩进HTML */  
        tab=compress?'':tab;/*压缩模式忽略缩进*/  
        maxDepth=++indent;/*缩进递增并记录*/  
        if(value&&value.constructor==Array){/*处理数组*/  
          draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);/*缩进'[' 然后换行*/  
          for (var i=0;i<value.length;i++)   
            notify(i,value[i],i==value.length-1,indent,false);   
          draw.push(tab+']'+(isLast?line:(','+line)));/*缩进']'换行,若非尾元素则添加逗号*/  
        }else   if(value&&typeof value=='object'){/*处理对象*/  
          draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);/*缩进'{' 然后换行*/  
          var len=0,i=0;   
          for(var key in value)len++;   
          for(var key in value)notify(key,value[key],++i==len,indent,true);   
          draw.push(tab+'}'+(isLast?line:(','+line)));/*缩进'}'换行,若非尾元素则添加逗号*/  
        }else{   
          if(typeof value=='string')value='"'+value+'"';   
          draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
        };   
      };   
      var isLast=true,indent=0;   
      notify('',data,isLast,indent,false);   
      return draw.join('');   
    },


    jump (index) {
      let jump = document.querySelectorAll('.d_jump')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop
        // Chrome
        document.body.scrollTop = total
        // Firefox
        document.documentElement.scrollTop = total
        // Safari
        window.pageYOffset = total
  }
    /*
    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    */
  },
  created: function () {
    this.data = JSON.parse(this.$route.params.data)
    let links = this.data._links.split('/:')
    if(links.length > 1) {
      this.data.links = links[0]
      let local_rest_params = []
      for(let i =1; i < links.length; i++) {
        local_rest_params.push(links[i])
      }
      if (local_rest_params.length > 0) {
        this.data.local_rest_params = local_rest_params
      }
    } else {
      this.data.links = this.data._links
    }
    this.address = this.$route.params.address
  }
}
</script>

<style>
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hold {
  width: 100%;
  padding: 12px;
  background-color: #eee;
  text-align: center;
}
.back {
  float: right;
  border-color: #cb8f00;
  background-color: #eaa823;
  transform:translate(0px,12px);
}
.fname {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-bottom: 6px;
  padding:5px 10px;
  background-color: #eee;
  color: #17a972;
  font-size: 2em;
  text-align:center;
  cursor:pointer;
}
.method {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-bottom: 2px;
  padding: 2px 6px;
  background-color: #eee;
  font-size: 0.6em;
  color: #e75b6a;
  text-align:center;
  cursor:pointer;
  font-weight: bold;
}
.code-get {
  color: #e75b6a;
}
.code-post {
  color: #01ab3f;
}
.necessary {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-right: 4px;
  margin-bottom: 2px;
  padding: 2px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #f7a972;
  text-align:center;
  cursor:pointer;
}
.type {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 2px;
  padding: 4px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #27a972;
  text-align:center;
  cursor:pointer;
}
.title-item {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  padding: 4px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #f71912;
  text-align:center;
  cursor:pointer;
}
 .mo-upload {
  position: relative;
  font-size: 14px;
  display: inline-block;
}

.selectfile {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 2px;
  padding: 4px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #27a972;
  text-align:center;
  cursor:pointer;
}
.filename {
  display:inline-block;
  border:1px solid #ccc;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 2px;
  padding: 4px 6px;
  background-color: #ddd;
  font-size: 0.8em;
  color: #345;
  text-align:center;
  cursor:pointer;
}
input[type="file"] {
    display: none;
}
.mo-upload label {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 216);
  box-sizing: border-box;
  color: rgb(31, 61, 60);
  display: block;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
  background-color: red;
}

.mo-upload a {
  text-decoration: none;
  color: #345;
  font-size: 16px;
}

pre {
  outline: none; 
  padding: 5px; 
  margin: 5px; 
  background-color: transparent;
}


.title {
  color: #345;
  font-size: 26px;
  width: 100%;
  background-color: #efefef;
  text-align: center;
  margin-bottom: 12px;
  padding: 8px;
}
</style>













