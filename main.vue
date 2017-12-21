<template>
  <div class="hello">
    <h1 class="head">有订单时将自动收到提示</h1>
    <div class="cont">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="230">
        </el-table-column>
        <el-table-column
          prop="price"
          label="总价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="描述">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button @click="handleClick(scope.$index, scope.row)" type="text">接单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  const price = [2000, 1000, 500]
  const desc = ['大桶', '中桶', '小桶']
  import SH from './SocketHelp.js'
  let canShow = true
  export default {
    data () {
      return {
        tableData: [],
        tableDataExample: [{
          id: 170001,
          date: '2016-05-03',
          price: 'food.pdf',
          introduce: '数据',
          openid:'123452'
        }]
      }
    },
    methods: {
      handleClick (index, row) {
        // SH.ok_notify(this.$socket)
        // https://aaa.bigfacewo.com/dwssserverso/ok_notify/:out_trade_no
        this.$http.get('https://aaa.bigfacewo.com/dwssserverso/ok_notify/' + row.openid).then(res => {
          if(!res.data) {
            this.$message({
              message: '确认失败',
              type: 'error'
            })
            return
          }
          if(res.data.code === 0) {
            this.$message({
              message: '成功确认订单',
              type: 'success'
            })
            this.delRow(index)
          } else {
              this.$message({
                message: '确认失败：' + res.data.msg,
                type: 'error'
              })
          }
        }, res => {
          this.$message({
            message: '确认失败',
            type: 'error'
          })
        })
      },
      delRow(index) {
        this.tableData.splice(index, 1)
      },
      showNewOrder: function() {
        if(canShow) {
          canShow = false
          this.$message({
            message: '您有新的订单',
            type: 'success',
            onClose: function() {
              canShow = true
            }
          });

        }
      }
    },
    mounted: function() {
      this.tableData = this.$store.state.tableData
      SH.bind(data => {
        if(data.type === 'snotify') {
          this.showNewOrder()
          let nData = data.data
          let oData = {
            id: nData._id,
            date: new Date(nData.date).format('yy年MM月dd日 HH时mm分ss秒'),
            price: (price[nData.type] * nData.num / 100) + '元',
            introduce: '购买' + desc[nData.type] + '饮用水' + nData.num + '箱',
            openid: nData.openid
          }
          this.$store.commit('pushtableData', oData)
          this.tableData.push(oData)
        }
      })
    },
    beforeDestory: function() {
      SH.unbind()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none !important;
}
.head {
  width:100%;
  text-align: center;
}
.cont {
  padding-bottom: 60px;
}
</style>
