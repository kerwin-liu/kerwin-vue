                                                             <template>
  <div>
    <el-form :inline="true" :model="inventoryListQo">
      <el-row>
        <el-checkbox v-model="inventoryListQo.stockType" label="查询库存不为0的" border></el-checkbox>
      </el-row>
        <el-form-item label="商品名称">
          <el-input v-model="inventoryListQo.itemName" placeholder="商品名称" size="small"/>
        </el-form-item>
      <el-form-item label="入库操作人">
        <el-input v-model="inventoryListQo.userName" placeholder="入库操作人" size="small"/>
      </el-form-item>
      <el-form-item label="入库时间"  size="small">
        <el-date-picker
          v-model="inventoryListQo.inventoryTime"
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
        <el-button type="primary" @click="onSubmit"  size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="inventoryList.result" empty-text="暂无数据" class="el-table-1" height="auto" :default-sort = "{ order: 'descending'}"
              >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.itemName }}</span>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>{{ props.row.models }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.unitName }}</span>
            </el-form-item>
            <el-form-item label="税率">
              <span>{{ props.row.rates }}%</span>
            </el-form-item>
            <el-form-item label="初始库存">
              <span>{{ props.row.quantity }}</span>
            </el-form-item>
            <el-form-item label="剩余库存">
              <span>{{ props.row.stock }}</span>
            </el-form-item>
            <el-form-item label="含税单价">
              <span>{{ props.row.priceTax }}</span>
            </el-form-item>
            <el-form-item label="不含税单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="不含税金额">
              <span>{{ props.row.totalPrice }}</span>
            </el-form-item>
            <el-form-item label="剩余金额">
              <span>{{ props.row.remainTotalPrice }}</span>
            </el-form-item>
            <el-form-item label="税额">
              <span>{{ props.row.taxAmount }}</span>
            </el-form-item>
            <el-form-item label="剩余税额">
              <span>{{ props.row.remainTaxAmount }}</span>
            </el-form-item>
            <el-form-item label="价税合计金额">
              <span>{{ props.row.totalPriceTax }}</span>
            </el-form-item>
            <el-form-item label="剩余价税合计金额">
              <span>{{ props.row.remainTotalPriceTax }}</span>
            </el-form-item>
            <el-form-item label="入库人">
              <span>{{ props.row.userName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable type="index" :index="indexMethod" label="序号" width="50" align="center"/>
      <el-table-column sortable prop="itemName" label="商品名称" width="200" align="center"/>
      <el-table-column sortable prop="stock" label="现有库存" width="100" align="center"/>
      <el-table-column sortable prop="createTime" label="入库时间"  align="center"/>
      <el-table-column sortable prop="producedTime" label="生产时间"  align="center"/>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">修改-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="primary"
            @click="handleDeliver(scope.$index, scope.row)">出库
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDeliverLog(scope.$index, scope.row)">记录
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="inventoryList.currentPageNo"
        :page-sizes="[7, 20, 30, 100]"
        :page-size="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="inventoryList.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="商品出库记录" :visible.sync="inventoryLogVisible" append-to-body width="85%">
      <el-table v-loading="loading" :data="inventoryLogList" empty-text="暂无数据" class="el-table-1" height="auto"
                :default-sort="{ order: 'descending'}"
      >
        <el-table-column sortable type="index" label="序号" width="50" align="center"/>
        <el-table-column sortable prop="itemNo" label="商品编号" width="100" align="center"/>
        <el-table-column sortable prop="itemName" label="商品名称" width="100" align="center"/>
        <el-table-column sortable prop="quantity" label="发货数量" width="90" align="center"/>
        <el-table-column sortable prop="unitName" label="单位" width="50" align="center"/>
        <el-table-column sortable prop="status" label="类型" width="60" align="center"/>
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
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow,
      ElCol},
    data() {
      return {
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
        loading:false,
        inventoryLogVisible:false,
        inventoryListQo: {
          stockType:true,
          itemId: '',
          itemName: '',
          userName: '',
          inventoryTime: [],
          inventoryTimeStart:'',
          inventoryTimeEnd:'',
          pageIndex: 1,
          pageSize: 7
        },
        inventoryList:[],
        inventoryLogList: []
      }
    },
    methods: {
      handleDeliverLog(index, row){
        this.inventoryLogVisible = true
        ajaxUtil.get('/inventoryLog/getList/' +  row.id).then(({data}) => {
          this.inventoryLogList = data
          console.log(this.inventoryLogList)
        }).catch(() => {
        });
      },
      indexMethod(index) {
        return this.inventoryListQo.pageIndex * this.inventoryListQo.pageSize - this.inventoryListQo.pageSize +index +1;
      },
      onSubmit() {
        this.loading = true
        ajaxUtil.get('/inventory/getPages', {
          params: {
            itemId: this.inventoryListQo.itemId,
            itemName: this.inventoryListQo.itemName,
            userName: this.inventoryListQo.userName,
            stockType: this.inventoryListQo.stockType,
            startTime: this.inventoryListQo.inventoryTimeStart,
            endTime: this.inventoryListQo.inventoryTimeEnd,
            pageIndex: this.inventoryListQo.pageIndex,
            pageSize: this.inventoryListQo.pageSize
          }
        }).then(({data}) => {
          this.loading = false
          this.inventoryList = data
          console.log(this.inventoryList);
        }).catch(() => {
        });
      },

      TimeChange(val){
        this.inventoryListQo.inventoryTimeStart =val[0]
        this.inventoryListQo.inventoryTimeEnd =val[1]
      },
      handleSizeChange(val){
        this.inventoryListQo.pageSize = val
        this.onSubmit()

      },
      handleCurrentChange(val){
        this.inventoryListQo.pageIndex = val
        this.onSubmit()
      },
      handleEdit(index, row){
        this.$router.push({ path: '/repertory/modify/'+row.id})
      },
      handleDeliver(index, row){
        this.$router.push({ path: '/repertory/inventoryLog/'+row.id})
      }
    },
    created: function () {
      this.onSubmit()
    }
  }
</script>
<style scoped>
  .el-table-1 {
    height: 60vh;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

