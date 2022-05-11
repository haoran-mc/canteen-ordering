<template>
  <el-card>
    <!-- 搜索区域 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getRecord">
          <el-button slot="append" icon="el-icon-search" @click="getRecordSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 表格区域 -->
    <el-table ref="filterTable"
      :data="tableData.slice(queryInfo.pagesize*(queryInfo.pagenum-1), queryInfo.pagesize*queryInfo.pagenum)"
      border stripe>
      <!-- 日期 -->
      <el-table-column prop="time" label="日期" sortable align="center"></el-table-column>
      <!-- 订单号 -->
      <el-table-column prop="orderId" label="订单号" align="center"></el-table-column>
      <!-- 菜名 -->
      <el-table-column label="菜名" align="center">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{scope.row.foodName1}}</span>
            <span slot="reference" v-if="scope.row.foodName2 !== 'undefined'">
              &nbsp;&nbsp;{{scope.row.foodName2}}
            </span>
          </div>
        </template>
      </el-table-column>
      <!-- 价格 -->
      <el-table-column prop="allPrice" label="价格" align="center"></el-table-column>
      <!-- 是否已收货 -->
      <el-table-column prop="UserCf" label="收货完成" align="center"></el-table-column>
      <!-- 类别 -->
      <el-table-column prop="type" label="类别" align="center"
        :filters="[{ text: '堂食', value: '堂食' }, { text: '外卖', value: '外卖' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '外卖' ? 'primary' : 'success'" disable-transitions>
            {{scope.row.type}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        // 获取用户列表的参数对象
        queryInfo: {
          query: '手抓饼',
          // 当前的页码
          pagenum: 1,
          // 当前每页显示多少条数据
          pagesize: 5
        },
        // 表格信息
        tableData: [],
        total: 0
      }
    },
    created () {
      this.getRecord()
    },
    methods: {
      getRecord () {
        this.$http.get("ordersRecord").then(res => {
          this.tableData = res.data
          this.total = res.data.length
        })
      },
      getRecordSearch () {
        console.log(this.queryInfo.query)
        this.$http.get(`ordersRecordSearch/${this.queryInfo.query}`).then(res => {
          this.tableData = res.data
          this.total = res.data.length
        })
      },
      filterTag (value, row) {
        return row.type === value
      },
      // 监听 pagesize 改变的事件
      handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize
        this.getRecord()
      },
      // 监听页码值改变的事件
      handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage
        this.getRecord()
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
