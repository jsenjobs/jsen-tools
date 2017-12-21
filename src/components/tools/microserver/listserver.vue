<template>
  <div>
    <div class="common-title">{{ msg }}</div>
	<el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom:800px;">
      <el-table-column
        prop="_id"
        label="ID"
        width="220">
        <template scope="scope">
          <span class='jid'>{{scope.row._id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="模块名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="模块地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="介绍">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="handleClick(scope.$index, tableData)" type="text" size="small">查看服务</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../../../api/microserver.json'
export default {
  name: 'microserver',
  data () {
    return {
      msg: '微服务注册模块',
      tableData: []
    }
  },
  methods: {
    listServer () {
      this.$http.get(api.listMicroServer._links, { }, {emulateJSON: true}).then(
      function (res) {
      	let json = res.body
      	if (json.code === 0) {
      	  console.log(json.data)
      	  this.tableData = json.data
          this.$message({
            message: '获取微服务模块成功',
            type: 'success'
          });
      	} else {
      		console.log(json.msg)
          this.$message({
            message: '获取微服务模块错误',
            type: 'error'
          });
      	}
      }, function () {
        this.$message({
          message: '获取微服务模块失败',
          type: 'error'
        });
      })
    },
    handleClick (index, tableData) {
    	this.$router.push({name:'microdetail', params: {name:tableData[index].name, address:tableData[index].address}})
    }
  },
  created: function () {
    this.listServer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.common-title {
  color: #345;
  font-size: 26px;
  width: 100%;
  background-color: #efefef;
  text-align: center;
  margin-bottom: 12px;
  padding: 8px;
}
.jid {
  font-size: 12px;
  overflow: hidden;
}
</style>
