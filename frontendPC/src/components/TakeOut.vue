<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 折叠面板 -->
          <el-collapse accordion style="display: flex; flex-direction: column; align-items: center;">
            <!-- 地址 -->
            <el-collapse-item name="1" style="width: 90%">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span style="margin-left: 10px;">地址</span>
              </template>
              <div>{{scope.row.address}}</div>
            </el-collapse-item>
            <!-- 联系方式 -->
            <el-collapse-item name="2" style="width: 90%">
              <template slot="title">
                <i class="el-icon-phone"></i>
                <span style="margin-left: 10px;">联系方式</span>
              </template>
              <div>{{scope.row.phone}}</div>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-table-column>

      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>

      <!-- 日期 -->
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <!-- 订单号 -->
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderId }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 菜品 -->
      <el-table-column label="菜系" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.foodName1 }}</span>
            <span slot="reference" v-if="scope.row.foodName2 !== 'undefined'">
              &nbsp;&nbsp;{{scope.row.foodName2}}
            </span>
          </div>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column label="备注" width="180" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.remark}}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="finishTakeOut(scope.$index, scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        tableData: []
      }
    },
    created () {
      this.getTakeOut()
    },
    methods: {
      getTakeOut () {
        this.$http.get("takeOut").then(res => { this.tableData = res.data })
      },
      finishTakeOut (index, row) {
        this.$http.put(`finishTakeOut/${row.orderId}`).then(() => {
          this.getTakeOut()
          this.$notify({
            title: '完成订单',
            type: 'success',
            duration: 1500,
            position: 'bottom-right'
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
