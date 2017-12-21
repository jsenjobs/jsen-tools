<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="main el-col el-col-24">
    <v-sidebar></v-sidebar>
    <div class="content-container">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vSidebar from './Sidebar.vue'
  export default {
    components: {
      vHead, vSidebar
    }
  }
</script>

<style scoped>
.main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  overflow: hidden;
}
.content-container {
  flex:1;
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
}
</style>
