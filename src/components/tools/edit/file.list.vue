<template>
  <div>

    <div class="common-title">{{ msg }}</div>
    <div class="common-title2">当前路径：{{ cRoot }}</div>

    <el-row style='margin-bottom:800px;'>
      <template  v-for="(node, index) in cData">
        <el-col :span="6">
          <el-card class="box-card" style="margin:4px;">
            <div class="clearfix">
              <span :class="{file:node.type === 'file',dir:node.type === 'dir'}">{{node.type}} </span>
              <el-select v-model="opts[index]" style="float: right;padding:0px;width:80px;"
                                placeholder="操作" @change="item_select($event, index)">
                  <template  v-for="(op, i) in opt[node.type]">
                    <el-option :label="op.label" :value="i">
                    </el-option>
                  </template>
              </el-select>
            </div>
            <span class="file-name">{{node.name}}</span>
          </el-card>
        </el-col>
      </template>
      <el-col :span="6">
        <el-card class="box-card" style="margin:4px;">
          <div class=''>
            <el-button style="width:100%;margin:0px;" type="primary" @click='addFile'>添加文件</el-button>
            <el-row style="margin:0px;margin-top:10px;">
              <el-col :span="span" style="margin:0px;">
                <el-button style="width:100%;margin:0px;margin-right:5px;" type="warning" @click='addDir'>添加文件夹</el-button>
              </el-col>
              <el-col v-if="getBack() !== null" :span="12"  style="margin:0px;">
                <el-button style="width:100%;margin:0px;margin-left:5px;" type="info" @click='goBack'>返回上一级</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

  <el-dialog title="添加文件" :visible.sync="fileShow">
      <el-input v-model="createFileName" placeholder="文件名字" auto-complete="off"></el-input>
      <div slot="footer" class="dialog-footer">
          <el-button @click="fileShow = false">取 消</el-button>
          <el-button type="primary" @click="doAddFile">确 定</el-button>
      </div>
  </el-dialog>

  <el-dialog title="添加文件夹" :visible.sync="dirShow">
      <el-input v-model="createDirName" placeholder="文件夹名字" auto-complete="off"></el-input>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dirShow = false">取 消</el-button>
          <el-button type="primary" @click="doAddDir">确 定</el-button>
      </div>
  </el-dialog>
  <Modal v-model="modalShowDel" width="360">
    <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
    </p>
    <div style="text-align:center">
        <p>删除问价夹将删除该文件夹下所有内容。</p>
        <p>是否继续删除？</p>
    </div>
    <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="doDel">删除</Button>
    </div>
  </Modal>



  </div>
</template>

<script>
import api from '../../../api/editserver.json'

// const LH = require('../../../utils/LevelDBHelp')
const crypto = require("crypto")
const eccrypto = require("eccrypto")
let secHelp = require('./sec.help')

export default {
  name: 'microtemplate',
  data () {
    return {
      msg: '文件列表',
      cRoot:'/secfile',
      cData:[],
      opts:[],

      editType:'',
      opt:{
        dir:[
          {label:'删除',value:'del'},
          {label:'打开',value:'open'}
        ],
        file:[
          {label:'删除',value:'del'},
          {label:'编辑',value:'edit'}
        ]
      },

      fileShow:false,
      dirShow:false,
      createDirName:'',
      createFileName:'',

      modal_loading:false,
      modalShowDel:false,
      delItem:null,

      span:12

    }
  },
  methods: {
      getBack() {
        if(this.cRoot.lastIndexOf('/') > 0) {
          this.span = 12
          return this.cRoot.substring(0, this.cRoot.lastIndexOf('/'))
        }
        this.span = 24
        return null
      },
      goBack() {
        let path = this.getBack()
        if(path) {
          this.cRoot = path
          this.listFile()
        }
      },
      listFile() {
        console.log(api.list._links + '/' + encodeURIComponent(encodeURIComponent(this.cRoot)))
        this.$http.get(api.list._links + '/' + encodeURIComponent(encodeURIComponent(this.cRoot)), {emulateJSON: true}).then(res => {
          let result = res.body
          console.log(result)
          if(result && result.code === 0) {
            this.cData = result.data
          }
        })
      },


      addFile() {
        this.fileShow = true
      },
      addDir() {
        this.dirShow = true
      },
      doAddFile(e) {
        let fileName = this.createFileName

        let data = null
        try{
          data = secHelp.encodeData('Template')
        } catch(e) {
          this.$message({
            message: '加密数据出错',
            type: 'error'
          })
          return
        }
        if(!data) {
          this.$message({
            message: '加密数据出错',
            type: 'error'
          })
          return
        }
        
        if(!fileName) {
          this.$message({
            message: '请输入文件夹名字',
            type: 'warning'
          })
          return
        }
        this.fileShow = false
        if(fileName[0] !== '/') {
          fileName = '/' + fileName
        }
        let parent = encodeURIComponent(encodeURIComponent(this.cRoot))
        fileName = encodeURIComponent(encodeURIComponent(fileName))
        console.log(data)
        data = encodeURIComponent(encodeURIComponent(data))
        this.createFileName = ''
        console.log(api.createFile._links + '/' + parent + '/' + fileName + '/' + data)
        this.$http.get(api.createFile._links + '/' + parent + '/' + fileName + '/' + data, {emulateJSON:true}).then(res => {
          let result = res.body
          if(result && result.code === 0) {
              this.$message({
                message: '创建文件成功' ,
                type: 'success'
              })
              this.listFile()
          } else  {
              let msg = '创建失败'
              if(result.msg) msg += '-' + result.msg
              this.$message({
                message: msg ,
                type: 'error'
              })
          }
        }, err => {
            this.$message({
              message: '创建失败',
              type: 'error'
            })
          })
      },
      doAddDir(e) {
        let dirName = this.createDirName
        if(!dirName) {
          this.$message({
            message: '请输入文件夹名字',
            type: 'warning'
          })
          return
        }
        this.dirShow = false
        if(dirName[0] !== '/') {
          dirName = '/' + dirName
        }
        let parent = encodeURIComponent(encodeURIComponent(this.cRoot))
        dirName = encodeURIComponent(encodeURIComponent(dirName))
        this.createDirName = ''
        console.log(api.createDir._links + '/' + parent + '/' + dirName)
        this.$http.get(api.createDir._links + '/' + parent + '/' + dirName, {emulateJSON:true}).then(res => {
          let result = res.body
          if(result && result.code === 0) {
              this.$message({
                message: '创建文件夹成功' ,
                type: 'success'
              })
              this.listFile()
          } else  {
              let msg = '创建失败'
              if(result.msg) msg += '-' + result.msg
              this.$message({
                message: msg ,
                type: 'error'
              })
          }
        }, err => {
            this.$message({
              message: '创建失败',
              type: 'error'
            })
          })
      },
      item_select(e, index) {
        if(e !== null && e >= 0) {
          this.delItem = this.cData[index]
          let value = this.opt[this.delItem.type][e].value
          if(value === 'del') {
            this.modalShowDel = true
          } else if(value === 'edit') {
            let path = this.delItem.parent + '/' + this.delItem.name
            path = encodeURIComponent(path)
            this.$router.push({name:'secedit', params: {securl:encodeURIComponent(this.delItem.uri), path:path}})
            this.opts[index] = {}
          } else if(value === 'open') {
            this.cRoot = this.delItem.parent + '/' + this.delItem.name
            this.listFile()
          }
          this.opts[index] = {}
        }
      },
      doDel() {
        this.modal_loading = true
        if(!this.delItem) {
          this.modal_loading = false
          this.modalShowDel = false
          this.$message({
            message: '没有要删除的数据',
            type: 'warning'
          })
          this.modal_loading = false
          return
        }
        let path = this.delItem.parent + '/' + this.delItem.name
        path = encodeURIComponent(encodeURIComponent(path))
        console.log(api.del._links + '/' + path)
        this.$http.get(api.del._links + '/' + path, {emulateJSON:true}).then(res => {
          let result = res.body
          this.modal_loading = false
          this.modalShowDel = false
          if(result && result.code === 0) {
            this.$message({
              message: '删除' + result.n + '条数据成功' ,
              type: 'success'
            })
            this.listFile()
          } else {
            this.modal_loading = false
            let msg = '删除失败'
            if(result.msg) msg += '-' + result.msg
            this.$message({
              message: msg ,
              type: 'error'
            })
          }
        }, err => {
          this.modal_loading = false
          this.modalShowDel = false
          this.$message({
            message: '网络错误，删除失败',
            type: 'error'
          })
        })
      }
  },
  created: function () {
      this.listFile()
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
.file-name {
  line-height: 1.65em;
  color: #1d0d08;
  font-size: 2em;
}
.file {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 3px;
  padding: 0px 6px;
  background-color: #c7f38d;
  font-size: 1.2em;
  font-weight: bold;
  color: #15901c;
  text-align:center;
  cursor:pointer;
  line-height: 1.8em;
}

.dir {
  display:inline-block;
  border:1px solid #ddd;
  border-radius: 3px;
  padding: 0px 6px;
  background-color: #fffbd1;
  font-size: 1.2em;
  color: #e60548;
  text-align:center;
  cursor:pointer;
  line-height: 1.8em;
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





















