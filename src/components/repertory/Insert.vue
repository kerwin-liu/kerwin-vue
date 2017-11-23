<template>
  <div>
    <h3>商品入库</h3>
    <el-row>
      <el-col :span="6" :offset="18">
        <el-button type="primary" @click="AddInventory" class="kerwin-main-content-title-button">增加一条商品</el-button>
        <el-button type="primary" @click="DeleteInventory">删除行</el-button>
      </el-col>
    </el-row>
    <div class="main-repertory-div">
      <el-row span="10" class="main-repertory text-center">
        <el-col :span="1">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
        </el-col>
        <el-col :span="2" style="text-align: center">
          商品名称
        </el-col>
        <el-col :span="2" style="text-align: center">
          规格
        </el-col>
        <el-col :span="2" style="text-align: center">
          数量
        </el-col>
        <el-col :span="1" style="text-align: center">
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
        <el-col :span="1" style="text-align: center">
          税率
        </el-col>
        <el-col :span="2" style="text-align: center">
          税额
        </el-col>
        <el-col :span="2" style="text-align: center">
          价税合计
        </el-col>
        <el-col :span="3" style="text-align: center">
          生产日期
        </el-col>

      </el-row>
      <el-row :span="24">
      </el-row>
      <el-form :model="inventories" :rules="rules" ref="inventories">
        <el-row :gutter="20" :span="24" v-for="(inventory,index) in inventories" :key="inventory.itemNo">
          <el-col :span="1">
            <el-form-item label-width="0px">
              <el-checkbox v-model="repertoryOptions" :label="index" @change="handleCheckedCitiesChange" size="mini">
                {{index+1}}
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px">
              <el-input size="small" v-model.trim="inventory.itemName" :readonly="true" class="login-form-input">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="openSearchForm(index)"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              [{{inventory.models}}]
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input" @change="quantityChange(inventory)">1</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" style="text-align: center">
              ({{inventory.unitName}})
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventory.rates}}%
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item >
            <el-date-picker
              size="small"
              v-model="inventory.producedTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <span>总合计金额：</span>
    </el-row>
    <el-dialog title="选择商品信息" :visible.sync="invoiceItemDialogVisible" append-to-body width="70%">
      <el-form :inline="true" :model="itemQo">
        <el-form-item label="商品编号">
          <el-input v-model="itemQo.itemNo" placeholder="商品编号" class="checkaaaaa"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model.trim="itemQo.itemName"></el-input>
        </el-form-item>
        .
        <el-form-item>
          <el-button type="primary" @click="getItems">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="items.result" empty-text="暂无数据" class="el-table-1" height="auto"
                :default-sort="{ order: 'descending'}" @row-dblclick="chooseItem">
        <el-table-column sortable type="index" label="序号" width="50" align="center"/>
        <el-table-column sortable prop="itemNo" label="商品编号" align="center"/>
        <el-table-column sortable prop="itemName" label="商品名称" align="center"/>
        <el-table-column sortable prop="unitName" label="单位名称" align="center"/>
        <el-table-column sortable prop="rates" label="税率%" align="center"/>
        <el-table-column sortable prop="models" label="规格型号" align="center"/>
        <el-table-column sortable prop="price" label="单价" align="center"/>
        <el-table-column sortable prop="warnQuantity" label="库存警告数量" align="center"/>
        <el-table-column sortable prop="quantity" label="现有库存" align="center"/>
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
          :current-page="items.currentPageNo"
          :page-sizes="[10, 20, 30, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="items.totalCount">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  const options = [0];
  export default {
    components: {
      ElCol,
      ElRow
    },
    data(){
      var validateWarnQuantity = (rule, value, callback) => {
        let regular = /^[0-9]{1,9}([.]+[0-9]{0,4})?$/;
        if (!regular.test(value)) {
          return callback(new Error('请填写正确的库存警告数量'));
        } else {
          callback();
        }
      }
      return {
        invoiceItemDialogVisible: false,
        inventoriesIndex: null,
        isIndeterminate: true,
        checkAll: false,
        repertoryOptions: [],
        inventories: [{
          itemId: null,
          itemName: '请选择入库商品',
          unitName: null,
          price:null,
          priceTax:null,
          rates: null,
          models: '',
          quantity: null,
          taxAmount: null,
          totalPrice: null,
          totalPriceTax: null,
          producedTime: null,
          invoiceStats: null,
          invoiceCode: null,
          invoiceNo: null,
          remark: null
        }],
        loading: false,
        itemQo: {
          itemNo: null,
          itemName: null,
          models: null,
          pageIndex: 1,
          pageSize: 10
        },
        items: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        rules: {
          quantity:[{required: true, message: '请输入库存数量'},
            {validator: validateWarnQuantity, trigger: 'blur'}]
        }
      }

    },
    methods: {
      openSearchForm(index){
        this.loading = true
        this.inventoriesIndex = index
        this.invoiceItemDialogVisible = true
        this.getItems()
      },
      getItems(){
        ajaxUtil.get('/item/getPages', {
          params: {
            itemNo: this.itemQo.itemNo,
            itemName: this.itemQo.itemName,
            models: this.itemQo.models,
            pageIndex: this.itemQo.pageIndex,
            pageSize: this.itemQo.pageSize
          }
        }).then(({data}) => {
          this.items = data
          this.loading = false
        }).catch(() => {
        });
      },
      handleSizeChange(val){
        this.itemQo.pageSize = val
        this.getItems()
      },
      handleCurrentChange(val){
        this.itemQo.pageIndex = val
        this.getItems()
      },
      chooseItem(row){
        this.inventories[this.inventoriesIndex].itemName = row.itemName
        this.inventories[this.inventoriesIndex].itemId = row.id
        this.inventories[this.inventoriesIndex].unitName = row.unitName
        this.inventories[this.inventoriesIndex].rates = row.rates
        this.inventories[this.inventoriesIndex].models = row.models
        this.invoiceItemDialogVisible = false
      },
      AddInventory(){
        this.inventories.push({
          itemId: null,
          itemName: '请选择入库商品',
          quantity: null,
          taxAmount: null,
          totalPrice: null,
          totalPriceTax: null,
          producedTime: null,
          invoiceStats: null,
          invoiceCode: null,
          invoiceNo: null,
          remark: null
        })
        options.push(this.inventories.length - 1)
      },
      DeleteInventory(){
        this.repertoryOptions.sort(function sequence(a, b) {
          return a - b;
        })
        for (var i = this.repertoryOptions.length; i > 0; i--) {
          console.log('删除' + this.repertoryOptions[i - 1])
          this.inventories.splice(this.repertoryOptions[i - 1], 1)
        }
        this.repertoryOptions = []
        this.isIndeterminate = false
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.repertoryOptions = val ? options : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange() {
        this.checkAll = this.repertoryOptions.length === options.length;
        this.isIndeterminate = this.repertoryOptions.length > 0 && this.repertoryOptions.length < options.length;
      },
      quantityChange(inventory){

      }
    }
  }
</script>

<style>
  .el-table-1 {
    height: 55vh;
  }

  .kerwin-main-content-title-button {
    display: inline-block;
    float: right;
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

  .login-form-input .el-input__inner {
    padding: 0 4px;
  }

  .main-repertory-div {
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
  }

</style>
