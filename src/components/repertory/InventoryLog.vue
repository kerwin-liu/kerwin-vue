<template>
  <div>
    <el-form label-position="top" :model="inventory" ref="inventory">
      <el-row :gutter="20">
        <el-col :span="2" style="text-align: center">
          <el-form-item label="商品名称" prop="itemName">
            <el-input v-model="inventory.itemName" placeholder="库存" size="small" :readonly="true"
                      class="login-form-input">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="openSearchForm()"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="库存数量" prop="stock">
            <el-input v-model="inventory.stock" placeholder="库存数量" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="3" style="text-align: center">
          <el-form-item label="出库数量" prop="deliverQuantity">
            <el-input-number v-model="deliverInventory.deliverQuantity" size="small" @input="deliverQuantityChange"
                             :min="0"
                             :max="inventory.stock" label="已经到到最大出库数量"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="使用税额" prop="deliverTaxAmount">
            <el-input v-model="deliverInventory.deliverTaxAmount" placeholder="使用税额" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="使用金额" prop="deliverTotalPrice">
            <el-input v-model="deliverInventory.deliverTotalPrice" placeholder="使用金额" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="使用合计" prop="deliverTotalPriceTax">
            <el-input v-model="deliverInventory.deliverTotalPriceTax" placeholder="使用合计" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="剩余数量" prop="stockResult">
            <el-input v-model="deliverInventory.stockResult" placeholder="剩余数量" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="剩余税额" prop="remainTaxAmount">
            <el-input v-model="inventory.remainTaxAmount" placeholder="剩余税额" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="剩余金额" prop="remainTotalPrice">
            <el-input v-model="inventory.remainTotalPrice" placeholder="剩余金额" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="剩余合计" prop="remainTotalPriceTax">
            <el-input v-model="inventory.remainTotalPriceTax" placeholder="剩余合计" size="small" :readonly="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-form-item label="操作">
            <el-button type="primary" size="small" @click="AddInventory">增加到出库</el-button>
            <el-button type="danger" size="small" @click="DeleteInventory" style="margin-left: 0px">删除所选行</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="main-repertory-div">
      <el-row class="main-repertory text-center">
        <el-col :span="1">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
        </el-col>
        <el-col :span="4" style="text-align: center">
          商品名称
        </el-col>
        <el-col :span="2" style="text-align: center">
          规格
        </el-col>
        <el-col :span="2" style="text-align: center">
          数量
        </el-col>
        <el-col :span="2" style="text-align: center">
          单位
        </el-col>
        <el-col :span="2" style="text-align: center">
          单价
        </el-col>
        <el-col :span="2" style="text-align: center">
          不含税单价
        </el-col>
        <el-col :span="2" style="text-align: center">
          金额
        </el-col>
        <el-col :span="2" style="text-align: center">
          税率
        </el-col>
        <el-col :span="2" style="text-align: center">
          税额
        </el-col>
        <el-col :span="3" style="text-align: center">
          价税合计
        </el-col>
      </el-row>
      <el-row :span="24">
      </el-row>
      <el-form label-position="top"  :model="modelForm" :rules="rules" ref="modelForm">
        <el-row :gutter="20" v-for="(inventoryLog, index) in modelForm.inventoryLogs"
                :key="inventoryLog.key">
          <el-col :span="1">
            <el-form-item label-width="0px">
              <el-checkbox v-model="options" :label="index" @change="handleCheckedCitiesChange" size="mini">
                {{index + 1}}
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.itemName}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              [{{inventoryLog.models}}]
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.quantity}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.unitName}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.priceTax}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.price}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.totalPrice}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.rates}}%
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.taxAmount}}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventoryLog.totalPriceTax}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

          <el-col :span="3" style="text-align: center">
            <el-form-item label="收货人" style="text-align: center" >
              <el-input v-model="client.cName" placeholder="客户名称" size="small" :readonly="true"
                        class="login-form-input">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="openSearchClient()"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: center" >
            <el-form-item label="收货电话">
              <el-input v-model="client.cPhone" size="small"  placeholder="收货电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="text-align: center" >
            <el-form-item label="收货地址">
              <el-select v-model="client.cAddress" size="small"  clearable placeholder="请选择客户收货地址">
                <el-option
                  v-for="address in addresses"
                  :key="address.id"
                  :label="address.address"
                  :value="address.address">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: center" >
            <el-form-item label="新增地址">
              <el-button type="primary" size="small" @click="openAddClientAddress">使用新地址</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="text-align: center" >
            <el-form-item label="收货物流">
              <el-select v-model="modelForm.transport" size="small"  clearable placeholder="请选择">
                <el-option
                  v-for="transport in transports"
                  :key="transport.id"
                  :label="transport.logisticsName"
                  :value="transport.logisticsName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="text-align: center" >
            <el-form-item label="物流单号">
              <el-input v-model="modelForm.transportNo" size="small"  placeholder="物流单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: center" >
            <el-form-item label="备注">
              <el-button type="text" @click="remarkEdit">点击编辑</el-button>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="4" :offset="10">
            <el-button type="primary" :loading="loading" size="small" @click="handleSave('modelForm')">商 品 出 库
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>
    <el-dialog title="选择库存商品" :visible.sync="inventoryListDialogVisible" append-to-body width="70%">
      <el-form :inline="true" :model="inventoryListQo">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model.trim="inventoryListQo.itemName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getInventory">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="inventoryListVo.result" empty-text="暂无数据" class="el-table-1" height="auto"
                :default-sort="{ order: 'descending'}" @row-dblclick="chooseItem">
        <el-table-column sortable type="index" :index="indexMethod" label="序号" width="50" align="center"/>
        <el-table-column sortable prop="itemName" label="商品名称" align="center"/>
        <el-table-column sortable prop="models" label="规格型号" align="center"/>
        <el-table-column sortable prop="stock" label="现有库存" align="center"/>
        <el-table-column sortable prop="createTime" label="入库时间" align="center"/>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              @click="chooseItem(scope.row)">选中
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="inventoryListVo.currentPageNo"
          :page-sizes="[5, 10, 30, 100]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="inventoryListVo.totalCount">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="增加新的收货地址" :visible.sync="clientAddAddressVisible" append-to-body width="70%">
      <el-input type="textarea" v-model="clientAddressAddQo.address" placeholder="收货地址"></el-input>
      <br/>
      <br/>
      <el-button size="small" @click="AddClientAddress">增加地址</el-button>
    </el-dialog>
    <el-dialog title="编辑备注" :visible.sync="remarkEditDialogVisible" append-to-body width="70%">
      <el-input type="textarea" v-model="modelForm.remake" placeholder="备注"></el-input>
      <br/>
      <br/>
      <el-button size="small" @click="remarkEditDialogVisible = false">保存备注</el-button>
    </el-dialog>
    <el-dialog title="选择客户信息" :visible.sync="clientListDialogVisible" append-to-body width="70%">
      <el-form :inline="true" :model="clientPageQo" :rules="rules">
        <el-col :span="7">
          <el-form-item label="客户名称">
            <el-input v-model="clientPageQo.cName" size="small" placeholder="客户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="客户手机号">
            <el-input v-model="clientPageQo.cPhone" size="small" placeholder="客户手机号"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="级别">
            <el-select v-model="clientPageQo.cLevel" clearable placeholder="请选择客户级别">
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button size="small" @click="getClient">查询</el-button>
          </el-form-item>
        </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button size="small"@click="addClient">新增客户</el-button>
            </el-form-item>
          </el-col>
      </el-form>
      <el-table v-loading="clientLoading" :data="clientPageVo.result" empty-text="暂无数据" class="el-table-1" height="auto"
                :default-sort="{ order: 'descending'}" @row-dblclick="chooseClient">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="客户地址:">
                {{ props.row.cAddress }}
              </el-form-item>
              <el-form-item label="备注:">
                {{ props.row.cRemark }}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column sortable type="index" :index="indexMethod2" label="序号" width="50" align="center"/>
        <el-table-column sortable prop="cName" label="客户名称" align="center"/>
        <el-table-column sortable prop="cSex" label="客户性别" align="center"/>
        <el-table-column sortable prop="cPhone" label="客户电话" align="center"/>
        <el-table-column sortable prop="cWx" label="微信号" align="center"/>
        <el-table-column sortable prop="cQq" label="QQ号" align="center"/>
        <el-table-column sortable prop="cLevel" label="客户级别" align="center"/>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="chooseClient(scope.row)">选中
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="block paging">
        <el-pagination
          @size-change="handleSizeChangeClient"
          @current-change="handleCurrentChangeClient"
          :current-page="clientPageVo.currentPageNo"
          :page-sizes="[4, 10, 30, 100]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="clientPageVo.totalCount">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import util from '@/assets/js/util.js'
  import validate from '@/assets/js/validate.js'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow,
      ElCol
    },
    data(){
      return {
        clientLoading: false,
        clientAddAddressVisible: false,
        clientListDialogVisible: false,
        remarkEditDialogVisible:false,
        loading: false,
        inventoriesIndex: '',
        inventoryListDialogVisible: false,
        inventoryLoading: false,
        isIndeterminate: true,
        checkAll: false,
        options: [],
        addresses: [],
        transports: [],
        modelForm: {
          clientId: '',
          cAddress:'',
          cPhone:'',
          transport:'',
          transportNo:'',
          remake:'',
          inventoryLogs: []
        },
        deliverInventory: {
          deliverQuantity: 0,
          deliverTaxAmount: 0,
          deliverTotalPrice: 0,
          deliverTotalPriceTax: 0,
          stockResult: 0
        },


        inventoryListQo: {
          itemId: '',
          itemName: '',
          userId: '',
          inventoryTime: [],
          inventoryTimeStart: '',
          inventoryTimeEnd: '',
          pageIndex: 1,
          pageSize: 5
        },
        clientAddressAddQo:{
          id:'',
          clientId:'',
          address:''
        },
        inventoryListVo: [],
        inventory: {},
        client: {
          id:'',
          cName:'',
          cAddress:'',
          cPhone:'',
          transport:'',
          transportNo:''
        },
        clientUpdate:{
          id:'',
          cAddress:''
        },
        clientPageQo: {
          cName: '',
          cPhone: '',
          cLevel: '',
          pageIndex: 1,
          pageSize: 4
        },
        clientPageVo: {},
        rules: {
          clientAddress: [
            {required: true, message: '收货人新增地址不能为空', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      indexMethod(index) {
        return this.inventoryListQo.pageIndex * this.inventoryListQo.pageSize - this.inventoryListQo.pageSize +index +1;
      },
      indexMethod2(index) {
        return this.clientPageQo.pageIndex * this.clientPageQo.pageSize - this.clientPageQo.pageSize +index +1;
      },
      openSearchForm(){
        this.loading = true
        this.inventoryListDialogVisible = true
        this.getInventory();
      },
      openSearchClient(){
        this.clientLoading = true
        this.clientListDialogVisible = true
        this.getClient();
      },
      remarkEdit(){
        this.remarkEditDialogVisible = true
      },
      getClient(){
        ajaxUtil.get('/client/getPage', {
          params: {
            cName: this.clientPageQo.cName,
            cPhone: this.clientPageQo.cPhone,
            cLevel: this.clientPageQo.cLevel,
            pageIndex: this.clientPageQo.pageIndex,
            pageSize: this.clientPageQo.pageSize
          }
        }).then(({data}) => {
          this.clientPageVo = data
          this.clientLoading = false
        }).catch(() => {
        });
      },
      chooseClient(row){
        this.client = row
        this.modelForm.clientId = row.id
        this.clientListDialogVisible = false
        this.getAddressAndTransport()
      },
      //查询客户使用过的收货地址 和物流公司集合
      getAddressAndTransport(){
        ajaxUtil.get('/client/getAddress/' + this.modelForm.clientId).then(({data}) => {
          this.addresses = data
        }).catch(() => {
        });
        ajaxUtil.get('/transport/getList', {}).then(({data}) => {
          this.transports = data
        }).catch(() => {
        });
      },
      getInventory(){
        this.inventoryLoading = true
        ajaxUtil.get('/inventory/getPages', {
          params: {
            itemId: this.inventoryListQo.itemId,
            itemName: this.inventoryListQo.itemName,
            userId: this.inventoryListQo.userId,
            startTime: this.inventoryListQo.inventoryTimeStart,
            endTime: this.inventoryListQo.inventoryTimeEnd,
            pageIndex: this.inventoryListQo.pageIndex,
            pageSize: this.inventoryListQo.pageSize
          }
        }).then(({data}) => {
          this.loading = false
          this.inventoryListVo = data
        }).catch(() => {
        });
      },
      getOne(){
        ajaxUtil.get('/inventory/getOne/' + this.$route.params.id).then((object) => {
          this.inventory = object.data
          this.deliverInventory.stockResult = this.inventory.stock
        }).catch(() => {
        })
      },
      deliverQuantityChange(){
        if (this.inventory.stock > 0) {
          this.deliverInventory.stockResult = this.inventory.stock - this.deliverInventory.deliverQuantity
          this.deliverInventory.deliverTotalPrice = this.deliverInventory.deliverQuantity * this.inventory.price;
          this.deliverInventory.deliverTotalPrice = Number(Number.parseFloat(this.deliverInventory.deliverTotalPrice).toFixed(2));
          this.deliverInventory.deliverTotalPriceTax = this.deliverInventory.deliverQuantity * this.inventory.priceTax;
          this.deliverInventory.deliverTotalPriceTax = Number(Number.parseFloat(this.deliverInventory.deliverTotalPriceTax).toFixed(2));
          this.deliverInventory.deliverTaxAmount = this.deliverInventory.deliverTotalPriceTax - this.deliverInventory.deliverTotalPrice;
          this.deliverInventory.deliverTaxAmount = Number(Number.parseFloat(this.deliverInventory.deliverTaxAmount).toFixed(2))

          this.inventory.remainTotalPrice = this.deliverInventory.stockResult * this.inventory.price;
          this.inventory.remainTotalPrice = Number(Number.parseFloat(this.inventory.remainTotalPrice).toFixed(2));
          this.inventory.remainTotalPriceTax = this.deliverInventory.stockResult * this.inventory.priceTax;
          this.inventory.remainTotalPriceTax = Number(Number.parseFloat(this.inventory.remainTotalPriceTax).toFixed(2));
          this.inventory.remainTaxAmount = this.inventory.remainTotalPriceTax - this.inventory.remainTotalPrice;
          this.inventory.remainTaxAmount = Number(Number.parseFloat(this.inventory.remainTaxAmount).toFixed(2))
        }
      },
      AddInventory(){
        this.modelForm.inventoryLogs.push({
          id: this.inventory.id,
          itemName: this.inventory.itemName,
          models: this.inventory.models,
          quantity: this.deliverInventory.deliverQuantity,
          unitName: this.inventory.unitName,
          priceTax: this.inventory.priceTax,
          price: this.inventory.price,
          totalPrice: this.deliverInventory.deliverTotalPrice,
          rates: this.inventory.rates,
          taxAmount: this.deliverInventory.deliverTaxAmount,
          totalPriceTax: this.deliverInventory.deliverTotalPriceTax,
          stockResult: this.deliverInventory.stockResult,
          remainTaxAmount: this.inventory.remainTaxAmount,
          remainTotalPrice: this.inventory.remainTotalPrice,
          remainTotalPriceTax: this.inventory.remainTotalPriceTax
        })
        this.deliverInventory.deliverQuantity = 0
        this.inventory.stock = this.deliverInventory.stockResult
      },
      openAddClientAddress(){
        if(this.client.id !==''){
          this.clientAddAddressVisible = true
        }else{
          this.$message.error('必须先选择收货人才能新增地址！！');
        }
      },
      AddClientAddress(){
        if(this.clientAddressAddQo.address ===''){
          this.$message.error('新增地址为空');
        }else{
            this.loading = true;
            this.clientAddressAddQo.clientId = this.client.id
          ajaxUtil.post('/client/saveAddress', util.stringify(this.clientAddressAddQo)).then((data) => {
              this.loading = false
              this.clientAddAddressVisible = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
            this.client.cAddress = this.clientAddressAddQo.address
            }).catch((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'error'
              })
            });
        }
        this.updateClientAddress()
      },
      updateClientAddress(){
        this.clientUpdate.cAddress = this.clientAddressAddQo.address
        this.clientUpdate.id = this.client.id
        ajaxUtil.post('/client/update', util.stringify(this.clientUpdate)).then((data) => {
          this.loading = false
          this.$message({
            message: data.msg,
            type: 'success'
          })
        }).catch((data) => {
            this.loading = false
            this.$message({
              message: data.msg,
              type: 'error'
            })
        });
        this.getAddressAndTransport()
      },
      addClient(){
        this.clientListDialogVisible = false
        this.$router.push({path: '/manager/clientAdd'})
      },
      DeleteInventory(){
        this.options.sort(function sequence(a, b) {
          return a - b;
        })
        for (var i = this.options.length; i > 0; i--) {
          this.modelForm.inventoryLogs.splice(this.options[i - 1], 1)
        }
        this.options = []
        this.isIndeterminate = false
      },
      handleCurrentChange(val){
        this.inventoryListQo.pageIndex = val
        this.getInventory()
      },
      handleSizeChange(val){
        this.inventoryListQo.pageSize = val
        this.getInventory()
      },
      handleCurrentChangeClient(val){
        this.clientPageQo.pageIndex =val
        this.getClient()
      },
      handleSizeChangeClient(val){
        this.clientPageQo.pageSize = val
        this.getClient()
      },
      chooseItem(row){
        this.inventory = row
        this.deliverInventory.stockResult = this.inventory.stock
        this.deliverInventory.deliverQuantity = 0
        this.inventoryListDialogVisible = false
      },
      handleCheckAllChange(val) {
        this.options = val ? options : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange() {
        this.checkAll = this.options.length === options.length;
        this.isIndeterminate = this.options.length > 0 && this.options.length < options.length;
      },
      handleSave(modelForm) {
        this.$refs[modelForm].validate((valid) => {
          if (valid) {
              console.log(this.client)
            if (this.modelForm.inventoryLogs.length == 0) {
              this.$message.error('必须选择出库商品才能出库！！');
            } else if (this.modelForm.clientId === '') {
              this.$message.error('必须选择收货人才能出库！！');
            } else if (this.client.cPhone === '') {
              this.$message.error('必须填写收货人电话才能出库！！');
            } else if (this.modelForm.transport === '') {
              this.$message.error('必须选择物流公司才能出库！！');
            } else if (this.modelForm.transportNo === '') {
              this.$message.error('必须填写物流单号才能出库！！');
            } else {
            this.loading = true;
            this.modelForm.cAddress= this.client.cAddress;
            this.modelForm.cPhone= this.client.cPhone;
              ajaxUtil.post('/inventoryLog/save', this.modelForm).then((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.push('/repertory/Log')
            }).catch((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'error'
              })
            });
          }
          } else {
            return false;
          }
        });
      }
    },
    created(){
      if (this.$route.params.id != '123') {
        this.getOne()
      }
    }
  }
</script>

<style scoped>
  .el-table-1 {
    height: 55vh;
  }

  .main-repertory {
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
    height: 35px;
    line-height: 35px;
    color: #6c59d8;
    font-size: 16px;
  }

  .main-repertory-div {
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
  }
</style>
