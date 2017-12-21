<template>
  <div>

    <div class="common-title">{{ msg }}</div>
    <div class="common-title2">{{ msg2 }}</div>

    <el-row style='margin-bottom:800px;'>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class='code' style="line-height: 36px;">Node </span>
          <span style="line-height: 36px;">express rest </span>
          <el-button style="float: right;" type="primary" @click='dumpTemplate("node", data.nodeTemplate)'>导出项目</el-button>
        </div>
        <el-input v-model="data.nodeTemplate.name" placeholder="项目名字"></el-input>
        <el-input v-model="data.nodeTemplate.port" placeholder="部署端口(3000)"></el-input>
        <el-input v-model="data.nodeTemplate.address" placeholder="部署地址Address(http://127.0.0.1/name)"></el-input>
        <el-input v-model="data.nodeTemplate.register_ip" placeholder="注册服务器IP(59.110.168.95)"></el-input>

        <div class="db-select">
          <el-checkbox v-model="data.nodeTemplate.mysqlC" :label='true'>Mysql</el-checkbox>
          <el-checkbox v-model="data.nodeTemplate.mongodbC">Mongodb</el-checkbox>
          <el-checkbox v-model="data.nodeTemplate.redisC">Redis</el-checkbox>
        </div>
        <el-input v-if='data.nodeTemplate.mysqlC' v-model="data.nodeTemplate.mysqlAddress" placeholder="Mysql Address(mysql://username:password@127.0.0.1:3306/db)"></el-input>
        <el-input v-if='data.nodeTemplate.mongodbC' v-model="data.nodeTemplate.mongoAddress" placeholder="Mongo Address(mongodb://null:null@127.0.0.1:27017/db)"></el-input>
        <el-input v-if='data.nodeTemplate.redisC' v-model="data.nodeTemplate.redisAddress" placeholder="Redis Address(redis://null:null@127.0.0.1:6379/null)"></el-input>


        <el-input v-model="data.nodeTemplate.right"  placeholder="许可MIT"></el-input>
        <el-input v-model="data.nodeTemplate.desc"  placeholder="项目介绍DESC"></el-input>
        <el-input v-model="data.nodeTemplate.model"  placeholder="部署模式(dev,production)"></el-input>
        <!-- <el-input  placeholder="Version(V1.0.0)"></el-input> -->
        <!-- <el-input  placeholder="SessionTimeOut(18000)"></el-input> -->

      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import api from '../../../api/template.json'

export default {
  name: 'microtemplate',
  data () {
    return {
      msg: '微服务模版',
      msg2: '由http://59.110.168.95/templatedump/dump提供服务',
      data: {
        nodeTemplate:{
          name:'',
          port:'',
          address:'',
          register_ip:'',
          mysqlC:false,
          mysqlAddress: '',
          redisC:false,
          redisAddress:'',
          mongodbC:false,
          mongoAddress: '',
          right:'',
          desc:'',
          model:''
        }
      },
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  methods: {
    createParam(templateType, nt) {

      if (!templateType || !nt.name || !nt.port || !nt.register_ip || !nt.address) {
        return
      }
      let params = {}


      // 1
      params.templateType = templateType
      // 2
      params.name = nt.name
      // 3
      if (nt.right) params.right = nt.right
      // 4
      params.projectconf = {
        name: nt.name,
        PORT: nt.port,
        Register: nt.register_ip,
        Address: nt.address,
        desc: nt.desc,
        model: nt.model
      }
      params.projectconf = JSON.stringify(params.projectconf)
      // 5 6
      params.dbconf = {}
      params.sqlUse = {}
      if (nt.mysqlC) {
        params.sqlUse.mysql = true
        params.dbconf.Mysql = {Url:nt.mysqlAddress}
      }
      if (nt.mongodbC) {
        params.sqlUse.mongo = true
        params.dbconf.Mongo = {Url:nt.mongoAddress}
      }
      if (nt.redisC) {
        params.sqlUse.redis = true
        params.dbconf.Redis = {Url:nt.redisAddress}
      }
      params.dbconf = JSON.stringify(params.dbconf)
      params.sqlUse = JSON.stringify(params.sqlUse)

      console.log(params)
      return params

    },
    dumpTemplate(templateType, nt) {
      let params = this.createParam(templateType, nt)
      if (!params) {
        this.$message({
          message: '请输入正确参数',
          type: 'warning'
        });
        return
      }
      this.postcall(api.createnodetemplate._links, params)
    },
    postcall( url, params, target){
      // target = '_blank'
      var tempform = document.createElement("form");  
      tempform.action = url;  
      tempform.method = "post";  
      tempform.style.display="none"  
      if(target) {  
        tempform.target = target;  
      }
      for (let x in params) {  
        let opt = document.createElement("input");  
        opt.name = x;  
        opt.value = params[x];  
        tempform.appendChild(opt);  
      }  
      let opt = document.createElement("input");  
      opt.type = "submit";  
      tempform.appendChild(opt);  
      document.body.appendChild(tempform);  
      tempform.submit();  
      document.body.removeChild(tempform);  
    }
  },
  created: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mname {
  font-size: 2em;
}
.maddress {
  font-size: 0.8em;
  color: #ff4567;
}

.code {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-bottom: 2px;
  padding: 2px 6px;
  background-color: #eee;
  font-size: 0.6em;
  font-weight: bold;
  color: #e75b6a;
  text-align:center;
  cursor:pointer;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
  width: 480px;
}

.db-select {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-input {
  margin-top: 10px;
}
.common-title {
  color: #357;
  font-size: 26px;
  width: 100%;
  background-color: #efefef;
  text-align: center;
  padding-top: 8px;
}
.common-title2 {
  color: #357;
  width: 100%;
  background-color: #efefef;
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
}
</style>





















