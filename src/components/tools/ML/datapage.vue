<template>
  <div class="hello">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :file-list="fileList3"
      multiple
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">拖拽<em>上传</em></div>
      <!-- <el-button size="small" type="primary">点击上传</el-button>.-->
    </el-upload>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="introduce"
        label="介绍"
        width="320">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="handleClick" type="text" size="small">下载</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /*
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }], */
        fileList3: [],
        tableData: [{
          id: 170001,
          date: '2016-05-03',
          name: 'food.pdf',
          introduce: '数据'
        }, {
          id: 170002,
          date: '2016-05-02',
          name: 'food.pdf',
          introduce: '数据'
        }, {
          id: 170003,
          date: '2016-05-04',
          name: 'food.pdf',
          introduce: '数据'
        }, {
          id: 170004,
          date: '2016-05-01',
          name: 'food.pdf',
          introduce: '数据'
        }]
      }
    },
    methods: {
      handleChange (file, fileList) {
        this.fileList3 = fileList.slice(-3)
      },
      handleClick () {
        console.log(1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none !important;
}
</style>
