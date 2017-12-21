<template>
  <div>
    <div class="common-title">{{ msg }} <span class='mname'>{{ name }}</span></div>
    <div class="common-title2"><span class='maddress'>地址：{{ address }}</span></div>

	  <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom:800px;">
      <el-table-column
        prop="name"
        label="服务名字"
        width="200">
        <template scope="scope">
        <span :class="{idev:model === 'dev' ? true:false,iproduct:model === 'dev' ? false:true}">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="_links"
        label="请求路径"
        width="200">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
        width="100">
        <template scope="scope">
        <span class='code' :class='{"code-post":scope.row.method === "POST","code-get":scope.row.method === "GET"}'>{{scope.row.method}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paramsd"
        label="参数／头"
        width="100">
        <template scope="scope">
          <el-button @click="paramsClick(scope.$index, tableData)" type="text" size="small">查看参数</el-button>
        </el-collapse>
        </template>
      </el-table-column>
      <el-table-column
        prop="des"
        label="描述"
        width="320">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="handleClick(scope.$index, tableData)" type="text" size="small">测试</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../../../api/microserver.json'
export default {
  name: 'microdetail',
  data () {
    return {
      msg: '模块',
      name:'',
      address:'',
      tableData: [],
      model: ''
    }
  },
  methods: {
    listDetails () {
      this.$http.get(api.listServerinfo._links+'?name=' + this.name + '&address=' + this.address, { }, {emulateJSON: true}).then(
      function (res) {
      	let json = res.body
      	if (json.code === 0) {
          this.parseData(json.data)
      	  // this.tableData = json.data
          this.$message({
            message: '获取微服务详情成功',
            type: 'success'
          });
      	} else {
      		console.log(json.msg)
          this.$message({
            message: '获取微服务详情失败',
            type: 'error'
          });
      	}
      }, function () {
        this.$message({
          message: '获取微服务详情失败',
          type: 'error'
        });
      })
    },
    parseData(data) {
      if (data && data.code === 0) {
        let iData = data.data
        if (iData) {
          for(let k in iData) {
            let obj = Object.assign(iData[k], {name:k})
            if(obj.method)
              obj.method = obj.method.toUpperCase()
            this.tableData.push(obj)

          }
        }
        this.model = data.model
      }

    },
    handleClick (index, tableData) {
      if (this.model === 'dev') {
        this.$router.push({name:'mockapi', params: {address:this.address, data:JSON.stringify(tableData[index])}})
      } else {
        this.$message({
          message: '部署模式无法测试！！！',
          type: 'error'
        });
      }
    },
    paramsClick (index, tableData) {
      console.log(localStorage.getItem('testcode'))
      if (this.model === 'dev' || localStorage.getItem('testcode') === 'had') {
        this.$router.push({name:'microparams', params: {data:JSON.stringify(tableData[index]), name:tableData[index].name}})
      } else {
        this.$prompt('部署模式，请输入测试码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\w{20}/,
          inputErrorMessage: '长度错误'
        }).then(({ value }) => {
          if (value === 'cDJS78rqTEDlxkv7cbxhK47xfjs') {
            localStorage.setItem('testcode', 'had')
            this.$router.push({name:'microparams', params: {data:JSON.stringify(tableData[index]), name:tableData[index].name}})
          } else {
            this.$message({
              type: 'info',
              message: '测试码错误'
            });  
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });       
        });
      }
    }
  },
  mounted: function () {
    if (this.tableData.length === 0) {
      this.name = this.$route.params.name
      this.address = this.$route.params.address
      this.listDetails()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mname {
  font-size: 2em;
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
.idev {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-bottom: 2px;
  padding: 2px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #e7516a;
  text-align:center;
  cursor:pointer;

}
.iproduct {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 6px;
  margin-top:2px;
  margin-left: 2px;
  margin-bottom: 2px;
  padding: 2px 6px;
  background-color: #eee;
  font-size: 0.8em;
  color: #075b60;
  text-align:center;
  cursor:pointer;

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
.maddress {
  font-size: 0.8em;
  color: #20bf54;
  font-weight: bold;
}
</style>





















