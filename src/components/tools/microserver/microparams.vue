<template>
  <div>
    <div class="title">{{ msg }}</div>
    <el-card class="box-card" style='margin-bottom:800px;'>
      <div slot="header" class="clearfix">
        <div>
          <span class="fname">{{ name }}</span>
          <span class="method" :class='{"code-post":data.method === "GET", "code-post":data.method === "POST"}'>{{ data.method }}</span>
          <el-button class='back' type="primary" size="small" @click='goback' icon='arrow-left'>返回</el-button>
        </div>
      </div>

      <el-card class="box-card" style='margin-top:20px;'>
        <div slot="header" class="clearfix">
          <span>Params</span>
        </div>
        <el-table
          :data="data.params"
          border
          style="width: 100%">
          <el-table-column
            label="名字">
            <template scope="scope">
            <span class='necessary'>{{scope.row.necessary === false ? '非必需': '&nbsp&nbsp必需&nbsp&nbsp'}}</span>{{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="140">
          </el-table-column>
          <el-table-column
            prop="des"
            label="描述">
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Headers</span>
        </div>

        <el-table
          :data="data.headers"
          border
          style="width: 100%">
          <el-table-column
            label="名字">
            <template scope="scope">
            <span class='necessary'>{{scope.row.necessary === false ? '非必需': '&nbsp&nbsp必需&nbsp&nbsp'}}</span>{{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="140">
          </el-table-column>
          <el-table-column
            prop="des"
            label="描述">
          </el-table-column>
        </el-table>
      </el-card>

    </el-card>


  </div>
</template>

<script>
import api from '../../../api/microserver.json'
export default {
  name: 'microparams',
  data () {
    return {
      msg: 'Api参数',
      name:'',
      data: []
    }
  },
  methods: {
    goback() {
        this.$router.back()
        // this.$router.go(-1)
    },
    backHome() {
    }
  },
  created: function () {
    this.data = JSON.parse(this.$route.params.data)
    this.name = this.$route.params.name
    console.log(JSON.parse(this.$route.params.data))
    console.log(this.name)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back {
  float: right;
  border-color: #cb8f00;
  background-color: #eaa823;
  transform:translate(0px,12px);
}
.back:active {
  float: right;
  border-color: #bb7f00;
  background-color: #bb7f00;
  transform:translate(0px,12px);
}
.back:hover {
  float: right;
  border-color: #bb7f00;
  background-color: #da9813;
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
  font-size: 0.6em;
  color: #f7a972;
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













