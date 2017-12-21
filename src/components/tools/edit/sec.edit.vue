<template>
  <div id="app-test-edit">
      <el-row>
          <el-col :span="12">
            <el-button v-if="normal" style="width:100%;margin-bottom:20px;" type="success" @click='goback'>返回</el-button>
          </el-col>
          <el-col :span="12">
            <el-button v-if="normal" style="width:100%;margin-bottom:20px;" type="primary" @click='saveEnc'>保存文件</el-button>
          </el-col>
      </el-row>

    <!-- bidirectional data binding（双向数据绑定） -->
    <quill-editor v-if="normal" v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
    </quill-editor>
    
    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <!--
    <quill-editor :content="content"
                    :options="editorOption"
                    @change="onEditorChange($event)">
    </quill-editor>
    -->


  <Modal v-model="showSelect" width="360">
    <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>选择密钥文件</span>
    </p>
    <div style="text-align:center">
        <p>拥有密钥才能查看数据</p>
        <label class="mo-upload">
          <input id="uploadPEM" type="file"  :accept="accepts" @change='callgetFile'>
          <a><span class='selectfile'>选择密钥</span></a>
        </label>
    </div>
    <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="callgetPK">确认提交密钥</Button>
    </div>
  </Modal>
  </div>
</template>

<script>
import api from '../../../api/editserver.json'
import { quillEditor } from 'vue-quill-editor'
const crypto = require("crypto")
const eccrypto = require("eccrypto")
const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxEqmltFO9dek0h2YdvLPzpDDl
tovO8gvg0QbLgipJSM3cpjHDuL8U/bK1iXYFibEWF9gABm2G5c2mlHdz/4Pbof5u
HyNkMAS1NnNweos6JZ2Rnra9H96lkEQir+x7+D59n+ougVafzz8AG/rWAPb8ie5f
4ZwQfBSOXk6LLkVG8QIDAQAB
-----END PUBLIC KEY-----`;
export default {
    name: 'testedit',
    data () {
    return {
        fR:false,
        content:'',
        editorOption: {
            // some quill options
        },
        normal:false,
        securl:null,
        path:null,

        showSelect:false,
        pK:'',
        accepts : 'text/plain',
        secData:''
    }
    },
    components: {
    quillEditor
    },
  
    methods: {
        goback() {
            this.$router.back()
            // this.$router.go(-1)
        },
        callgetFile() {
            let self = this
            let oFReader = new FileReader(), 
            rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

            oFReader.onload = function (oFREvent) {
                self.pK = oFREvent.target.result
            }
            if (document.getElementById("uploadPEM").files.length === 0) { return }
            var oFile = document.getElementById("uploadPEM").files[0];
            oFReader.readAsText(oFile);
        },
        callgetPK() {
            this.showSelect = false
            this.decodeData(this.secData, this.pK)
        },
        saveEnc() {
            if(!this.path) {
                this.$message({
                    message: '无法获取文件路径',
                    type: 'error'
                })
                return
            }
            if(!this.normal) {
                this.$message({
                    message: '还没有加载数据',
                    type: 'error'
                })
                return
            }
            if(!this.fR) {
                this.$message({
                    message: '您的浏览器不支持FileReader',
                    type: 'error'
                })
                return
            }
            let data = this.encodeData(this.content)
            if(data) {
                this.$http.post(api.updateFile._links, {path:this.path, data:data}, {emulateJSON: true}).then(res => {
                    let body = res.body
                    if(res.body.code === 0) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '保存失败-' + body.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    this.$message({
                        message: '保存失败',
                        type: 'error'
                    });
                })
            } else {
                this.$message({
                    message: '加密数据出错',
                    type: 'error'
                });
            }
        },
        replaceAll(str) {
            if(str!=null)
                str = str.replace(/\\n/g,"\n")
            return str;
        },
        loadEnc() {
            if(this.securl === null) {
                this.$message({
                    type: 'info',
                    message: '没有文件地址信息'
                })
                return   
            }
            console.log(this.securl)
            this.$http.get(this.securl, {emulateJSON: true}).then(res => {
                let body= res.body
                if(body.code === 0 && body.data) {
                    this.showSelect = true
                    this.secData = body.data
                    /*
                    this.$prompt('请输入密钥', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                        // inputPattern: /\w{15}/,
                        // inputErrorMessage: '长度错误'
                    }).then(({ value }) => {
                        value = this.replaceAll(value)
                        this.decodeData(body.data, value)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消'
                        });       
                    })
                    */
                } else {
                    this.$message({
                        message: '加载数据出错-' + body.msg,
                        type: 'error'
                    });
                }
            }, err => {
                this.$message({
                    message: '无法加载数据',
                    type: 'error'
                });
            })
        },
        encodeData(data) {
            data = new Buffer(data, 'utf-8')
            let en = crypto.publicEncrypt(publicKey, data)
            return en.toString('base64')
        },
        decodeData(data, pK = privateKey) {
            try{
                data = new Buffer(data, 'base64')
                let de = crypto.privateDecrypt(pK, data)
                this.content = de.toString('utf-8')
                this.normal = true
            } catch(e) {
                this.$message({
                    message: '解码数据出错',
                    type: 'error'
                });
            }
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            this.content = html
        }
    },
    // get the current quill instace object.
    computed: {
        editor() {
        return this.$refs.myQuillEditor.quill
        }
    },
    mounted() {
        // you can use current editor object to do something(quill methods)
        // console.log('this is current quill instance object', this.editor)

        if (this.securl === null) {
            this.securl = decodeURIComponent(decodeURIComponent(this.$route.params.securl))
        }
        if (this.path === null) {
            this.path = decodeURIComponent(decodeURIComponent(this.$route.params.path))
            console.log(this.path)
        }
        if(typeof FileReader === 'undefined') {
            this.$message({
                message: '您的浏览器不支持FileReader',
                type: 'error'
            });
        } else {
            this.fR = true
            this.loadEnc()
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
  #app-test-edit {
    padding-bottom: 60px;
  }
</style>
