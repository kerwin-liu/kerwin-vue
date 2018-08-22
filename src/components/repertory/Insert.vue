<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="16">
        <el-button type="primary" size="small" @click="selectPDF">选择发票</el-button>
        <el-button type="primary" size="small" @click="AddInventory">增加一条商品</el-button>
        <el-button type="danger" size="small" @click="DeleteInventory" class="kerwin-main-content-title-button">删除行</el-button>
      </el-col>
      <el-col :span="5">
        发票代码:{{invoiceCodeVo}}
      </el-col>
      <el-col :span="5">
        发票号码:{{invoiceNoVo}}
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
      <el-form :model="modelForm" :rules="rules" ref="modelForm">
        <el-row :gutter="20" :span="24" v-for="(inventory, index) in modelForm.inventories" :key="inventory.key">
          <el-col :span="1">
            <el-form-item label-width="0px">
              <el-checkbox v-model="repertoryOptions" :label="index" @change="handleCheckedCitiesChange" size="mini">
                {{index + 1}}
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" :prop="'inventories.'+index+'.itemName'" :rules="rules.itemName">
              <el-input size="small" v-model.number.trim="inventory.itemName" placeholder="请选择入库商品" :readonly="true" class="login-form-input">
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
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.quantity'"
                          :rules="rules.quantity">
              <el-input size="small" v-model.trim="inventory.quantity" class="login-form-input"
                        @input="quantityChange(inventory)">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" style="text-align: center">
              ({{inventory.unitName}})
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.priceTax'"
                          :rules="rules.money">
              <el-input size="small" :readonly="inventory.readonly" v-model.number.trim="inventory.priceTax"
                        class="login-form-input" @input="priceTaxChange(inventory)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.price'"
                          :rules="rules.money">
              <el-input size="small" :readonly="inventory.readonly" v-model.number.trim="inventory.price"
                        class="login-form-input" @input="priceChange(inventory)"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.totalPrice'"
                          :rules="rules.money">
              <el-input size="small" :readonly="true" v-model.number.trim="inventory.totalPrice"
                        class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" style="text-align: center">
              {{inventory.rates}}%
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.taxAmount'"
                          :rules="rules.money">
              <el-input size="small" :readonly="true" v-model.number.trim="inventory.taxAmount"
                        class="login-form-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" style="text-align: center" :prop="'inventories.'+index+'.totalPriceTax'"
                          :rules="rules.money">
              <el-input size="small" :readonly="inventory.readonly" v-model.number.trim="inventory.totalPriceTax"
                        class="login-form-input" @input="totalPriceTaxChange(inventory)"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :prop="'inventories.'+index+'.producedTime'" :rules="rules.producedTime">
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
        <el-row>
          <el-col :span="3">总合计金额：</el-col>
          <el-col :span="2" :offset="15">
            {{squantity}}元
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="10">
            <el-button type="primary" :loading="loading" size="small" @click="handleSave('modelForm')">保 存 入 库</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="选择电子发票" :visible.sync="pdfDialogVisible" append-to-body width="70%">
      <el-form :inline="true" :model="pdfQo">
        <el-form-item label="发票代码">
          <el-input v-model="pdfQo.invoiceCode" placeholder="发票代码"></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="pdfQo.invoiceNo" placeholder="发票号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPdfs">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="pdfLading" :data="pdfs.result" empty-text="暂无数据" class="el-table-1" height="auto"
                @row-dblclick="choosePdf">
        <el-table-column sortable type="index" :index="indexMethod" label="序号" width="50" align="center"/>
        <el-table-column sortable prop="invoiceCode" label="发票代码" align="center"/>
        <el-table-column sortable prop="invoiceNo" label="发票号码" align="center"/>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              @click="choosePdf(scope.row)">选中
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block paging">
        <el-pagination
          @size-change="handlePDFSizeChange"
          @current-change="handlePDFCurrentChange"
          :current-page="pdfs.currentPageNo"
          :page-sizes="[10, 20, 30, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pdfs.totalCount">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="选择商品信息" :visible.sync="invoiceItemDialogVisible" append-to-body width="70%">
      <el-form :inline="true" :model="itemQo">
        <el-form-item label="商品编号">
          <el-input v-model="itemQo.itemNo" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model.trim="itemQo.itemName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getItems">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="items.result" empty-text="暂无数据" class="el-table-1" height="auto"
                :default-sort="{ order: 'descending'}" @row-dblclick="chooseItem">
        <el-table-column sortable type="index" :index="indexMethod2" label="序号" width="50" align="center"/>
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
  import validate from '@/assets/js/validate.js'
  import util from '@/assets/js/util.js'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  const options = [0];
  export default {
    components: {
      ElInput,
      ElCol,
      ElRow
    },
    data(){
      const validatorQuantity = (rule, value, callback) => {
        if (validate.validateQuantity(value)) {
          callback();
        } else {
          return callback(new Error('请填写正确的入库数量'));
        }
      }
      const validatorMoney = (rule, value, callback) => {
        if (validate.validateMoney(value)) {
          callback();
        } else {
          return callback(new Error('请填写正确的数据'));
        }
      }
      return {
        pdfDialogVisible: false,
        invoiceItemDialogVisible: false,
        inventoriesIndex: null,
        isIndeterminate: true,
        checkAll: false,
        invoiceCodeVo: '',
        invoiceNoVo: '',
        repertoryOptions: [],
        modelForm: {
          pdfId: '',
          inventories: [{
            key: Date.now(),
            readonly: true,
            itemId: '',
            itemName: '',
            unitName: '',
            price: 0,
            priceTax: 0,
            rates: '',
            models: '',
            quantity: '',
            taxAmount: 0,
            totalPrice: 0,
            totalPriceTax: 0,
            producedTime: '',
            invoiceStatus: '',
            remark: ''
          }]
        },
        loading: false,
        pdfLading: false,
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
        pdfQo: {
          invoiceCode: '',
          invoiceNo: '',
          pageIndex: 1,
          pageSize: 10
        },
        pdfs: [],
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
          itemName:[{required: true, message: '请选择入库商品',trigger: 'change'}],
          quantity: [
            {required: true, message: '请输入数量', trigger: 'change'},
            {validator: validatorQuantity, trigger: 'change'}
          ],
          money: [{validator: validatorMoney, trigger: 'change'}],
          producedTime: [
            {required: true, message: '请输入生产日期'}
          ]
        }
      }

    },
    methods: {
      indexMethod(index) {
        return this.pdfQo.pageIndex * this.pdfQo.pageSize - this.pdfQo.pageSize +index +1;
      },
      indexMethod2(index) {
        return this.itemQo.pageIndex * this.itemQo.pageSize - this.itemQo.pageSize +index +1;
      },
      selectPDF(){
        this.pdfLading = true
        this.pdfDialogVisible = true
        this.getPdfs()
      },
      openSearchForm(index){
        this.loading = true
        this.inventoriesIndex = index
        this.invoiceItemDialogVisible = true
        this.getItems()
      },
      getPdfs(){
        ajaxUtil.get('/pdf/getPages', {
          params: {
            invoiceCode: this.pdfQo.invoiceCode,
            invoiceNo: this.pdfQo.invoiceNo,
            pageIndex: this.pdfQo.pageIndex,
            pageSize: this.pdfQo.pageSize
          }
        }).then(({data}) => {
          this.pdfs = data
          this.pdfLading = false
        }).catch(() => {
        });
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
      handlePDFSizeChange(val){
        this.pdfQo.pageSize = val
        this.getPdfs()
      },
      handlePDFCurrentChange(val){
        this.pdfQo.pageIndex = val
        this.getPdfs()
      },
      chooseItem(row){
        this.modelForm.inventories[this.inventoriesIndex].itemName = row.itemName
        this.modelForm.inventories[this.inventoriesIndex].itemId = row.id
        this.modelForm.inventories[this.inventoriesIndex].unitName = row.unitName
        this.modelForm.inventories[this.inventoriesIndex].rates = row.rates
        this.modelForm.inventories[this.inventoriesIndex].models = row.models
        if (!isNaN(parseInt(row.rates))) {
          this.modelForm.inventories[this.inventoriesIndex].readonly = false
        }
        this.invoiceItemDialogVisible = false
      },
      choosePdf(row){
        this.modelForm.pdfId = row.id
        this.invoiceCodeVo = row.invoiceCode
        this.invoiceNoVo = row.invoiceNo
        this.pdfDialogVisible = false
      },
      AddInventory(){
        this.modelForm.inventories.push({
          key: Date.now(),
          readonly: true,
          itemId: '',
          itemName: '',
          quantity: '',
          price: 0,
          priceTax: 0,
          taxAmount: 0,
          totalPrice: 0,
          totalPriceTax: 0,
          producedTime: '',
          invoiceStatus: '',
          remark: ''
        })
        options.push(this.modelForm.inventories.length - 1)
      },
      DeleteInventory(){
        this.repertoryOptions.sort(function sequence(a, b) {
          return a - b;
        })
        for (var i = this.repertoryOptions.length; i > 0; i--) {
          this.modelForm.inventories.splice(this.repertoryOptions[i - 1], 1)
        }
        this.repertoryOptions = []
        this.isIndeterminate = false
      },
      handleCheckAllChange(val) {
        this.repertoryOptions = val ? options : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange() {
        this.checkAll = this.repertoryOptions.length === options.length;
        this.isIndeterminate = this.repertoryOptions.length > 0 && this.repertoryOptions.length < options.length;
      },
      quantityChange(inventory){
        if (validate.validateQuantity(inventory.quantity)) {
          inventory.totalPrice = inventory.quantity * inventory.price;
          inventory.totalPrice = Number(Number.parseFloat(inventory.totalPrice).toFixed(2));
          inventory.totalPriceTax = inventory.quantity * inventory.priceTax;
          inventory.totalPriceTax = Number(Number.parseFloat(inventory.totalPriceTax).toFixed(2));
          inventory.taxAmount = inventory.totalPriceTax - inventory.totalPrice;
          inventory.taxAmount = Number(Number.parseFloat(inventory.taxAmount).toFixed(2))
        }
      },
      priceTaxChange(inventory){
        if (validate.validateMoney(inventory.priceTax)) {
          inventory.price = inventory.priceTax / (1 + inventory.rates / 100)
          inventory.price = Number(Number.parseFloat(inventory.price).toFixed(2));
          inventory.totalPrice = inventory.quantity * inventory.price;
          inventory.totalPrice = Number(Number.parseFloat(inventory.totalPrice).toFixed(2));
          inventory.totalPriceTax = inventory.quantity * inventory.priceTax;
          inventory.totalPriceTax = Number(Number.parseFloat(inventory.totalPriceTax).toFixed(2));
          inventory.taxAmount = inventory.totalPriceTax - inventory.totalPrice;
          inventory.taxAmount = Number(Number.parseFloat(inventory.taxAmount).toFixed(2))
        }
      },
      priceChange(inventory){
        if (validate.validateMoney(inventory.price)) {
          inventory.priceTax = inventory.price * (1 + inventory.rates / 100)
          inventory.priceTax = Number(Number.parseFloat(inventory.priceTax).toFixed(2));
          inventory.totalPrice = inventory.quantity * inventory.price;
          inventory.totalPrice = Number(Number.parseFloat(inventory.totalPrice).toFixed(2));
          inventory.totalPriceTax = inventory.quantity * inventory.priceTax;
          inventory.totalPriceTax = Number(Number.parseFloat(inventory.totalPriceTax).toFixed(2));
          inventory.taxAmount = inventory.totalPriceTax - inventory.totalPrice;
          inventory.taxAmount = Number(Number.parseFloat(inventory.taxAmount).toFixed(2))
        }
      },
      totalPriceTaxChange(inventory){
        if (validate.validateMoney(inventory.totalPriceTax)) {
          inventory.priceTax = inventory.totalPriceTax / inventory.quantity
          inventory.priceTax = Number(Number.parseFloat(inventory.priceTax).toFixed(2))
          this.priceTaxChange(inventory)
        }
      },
      handleSave(modelForm) {
        this.$refs[modelForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            ajaxUtil.post('/inventory/save', this.modelForm).then((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.push('/repertory/query')
            }).catch((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'error'
              })
            });
          } else {
            return false;
          }
        });
      }
    },
    computed: {
      squantity() {
        var s = this.modelForm.inventories.filter(e => {
          return e.totalPriceTax
        }).map(e => {
          return e.totalPriceTax
        }).reduce(
          (acc, cur) => (parseFloat(cur) + acc), 0)
        return s
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
