<template>
  <div id="app-test-edit">
    <!-- bidirectional data binding（双向数据绑定） -->
    <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
    </quill-editor>
    
    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <quill-editor :content="content"
                    :options="editorOption"
                    @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'testedit',
    data () {
    return {
        content:'<h2>I am Example</h2>',
        editorOption: {
            // some quill options
        }
    }
    },
    components: {
    quillEditor
    },
  
    methods: {
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
        console.log('this is current quill instance object', this.editor)
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
