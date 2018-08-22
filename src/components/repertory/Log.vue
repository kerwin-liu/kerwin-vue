<template>
  <div>
    <el-form :inline="true" :model="inventoryLogPageQo">
      <el-form-item label="商品名称">
        <el-input v-model="inventoryLogPageQo.itemName" placeholder="商品名称" size="small"/>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="inventoryLogPageQo.clientName" placeholder="收货人" size="small"/>
      </el-form-item>
      <el-form-item label="收货人地址">
        <el-input v-model="inventoryLogPageQo.address" placeholder="收货人地址" size="small"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="inventoryLogPageQo.status" clearable placeholder="请选择类型" size="small">
          <el-option label="货物出库" value="0"></el-option>
          <el-option label="已出库退货" value="1"></el-option>
          <el-option label="新货入库" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收货人手机号">
        <el-input v-model="inventoryLogPageQo.phone" placeholder="收货人手机号" size="small"/>
      </el-form-item>
      <el-form-item label="出库时间" size="small">
        <el-date-picker
          v-model="inventoryLogPageQo.inventoryTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2"
          @change="TimeChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="inventoryLogList.result" empty-text="暂无数据" class="el-table-1" height="auto"
              :default-sort="{ order: 'descending'}" :row-class-name="tableRowClassName"
    >
      <el-table-column sortable type="index" label="序号" width="50" align="center"/>
      <el-table-column sortable prop="itemNo" label="商品编号" width="100" align="center"/>
      <el-table-column sortable prop="itemName" label="商品名称" width="100" align="center"/>
      <el-table-column sortable prop="quantity" label="数量" width="90" align="center"/>
      <el-table-column sortable prop="unitName" label="单位" width="50" align="center"/>
      <el-table-column sortable prop="status" label="操作类型" width="60" align="center"/>
      <el-table-column sortable prop="createTime" label="发货时间" width="110" align="center"/>
      <el-table-column sortable prop="cName" label="收货人" width="100" align="center"/>
      <el-table-column sortable prop="cAddress" label="收货地址" width="200" align="center"/>
      <el-table-column label="电话号码" width="100" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>物流: {{ scope.row.transport }}</p>
            <p>单号: {{ scope.row.transportNo }}</p>
            <p>备注: {{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.phone }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" v-if="scope.row.status === '出库'">
          <el-button
            size="mini"
            type="danger"
            @click="returnGoods(scope.$index, scope.row)">退货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="inventoryLogList.currentPageNo"
        :page-sizes="[10, 20, 30, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="inventoryLogList.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  export default {
    data(){
      return {
        inventoryLogPageQo: {
          itemName: '',
          clientName: '',
          address: '',
          phone: '',
          status: '',
          startTime: '',
          endTime: '',
          pageIndex: 1,
          pageSize: 10
        },
        inventoryLogList: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      tableRowClassName({row}) {
        if (row.status === '退货') {
          return 'warning-row';
        } else if (row.status === '入库'){
          return 'success-row';
        }else{
            return '';
        }
      },
      returnGoods(index, row){
        this.$router.push({ path: '/repertory/inventoryLogReturn/'+row.id})
      },
      TimeChange(val){
        this.inventoryLogPageQo.startTime = val[0]
        this.inventoryLogPageQo.endTime = val[1]
      },
      onSubmit() {
        this.loading = true
        ajaxUtil.get('/inventoryLog/getPages', {
          params: {
            itemName: this.inventoryLogPageQo.itemName,
            clientName: this.inventoryLogPageQo.clientName,
            address: this.inventoryLogPageQo.address,
            phone: this.inventoryLogPageQo.phone,
            startTime: this.inventoryLogPageQo.startTime,
            endTime: this.inventoryLogPageQo.endTime,
            status: this.inventoryLogPageQo.status,
            pageIndex: this.inventoryLogPageQo.pageIndex,
            pageSize: this.inventoryLogPageQo.pageSize
          }
        }).then(({data}) => {
          this.loading = false
          this.inventoryLogList = data
          console.log(this.inventoryLogList);
        }).catch(() => {
        });
      },
      handleSizeChange(val){
        this.inventoryLogPageQo.pageSize = val
        this.onSubmit()

      },
      handleCurrentChange(val){
        this.inventoryLogPageQo.pageIndex = val
        this.onSubmit()
      },
    },
    created: function () {
      this.onSubmit()
    }
  }
</script>

<style scoped>
  .el-table-1 {
    height: 55vh;
  }
</style>
