<template>
  <div>
    <el-col :span="8" :offset="6">
      <el-form label-position="right" :model="inventoryLog" ref="inventoryLog" label-width="100px" status-icon>
        <el-form-item label="商品编号" prop="itemNo" >
          <el-input v-model="inventoryLog.itemNo" placeholder="商品编号" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="itemName">
          <el-input v-model="inventoryLog.itemName" placeholder="商品名称" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="出库数量" prop="quantity">
          <el-input v-model="inventoryLog.quantity" placeholder="出库数量" :readonly="true"></el-input>
        </el-form-item>
          <el-form-item label="退货数量" prop="deliverQuantity">
            <el-input-number v-model="modelForm.returnQuantity" size="small"
                             :min="0"
                             :max="inventoryLog.quantity" label="已经到到最大出库数量"></el-input-number>
          </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="inventoryLog.unitName" placeholder="单位名称" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="退货人" prop="cName">
          <el-input v-model="inventoryLog.cName" placeholder="退货人" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="退货地址" prop="cAddress">
          <el-input v-model="inventoryLog.cAddress" placeholder="退货地址" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="退货原因" prop="cAddress">
          <el-input v-model="modelForm.cause" placeholder="退货原因" :readonly="false"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleUpdate()">退 货</el-button>
          <el-button @click="handleCancel()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import util from '@/assets/js/util.js'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    data(){
      return {
        loading: false,
        modelForm: {
          inventoryLogId:'',
          returnQuantity:'',
          cause:''

        },
        inventoryLog: {}
      }
    },
    methods: {
      handleUpdate(){
        this.$confirm('是否继续退货?', '退货提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
            console.log("dsffffffffffffffff")
          ajaxUtil.post('/inventoryLog/returnGoods',this.modelForm).then((object) => {
            console.log(object)
            if (object.code == '200') {
              this.$message({
                type: 'success',
                message: object.msg
              });
            }
          }).catch((object) => {
            this.$message({
              type: 'error',
              message: object.msg
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退货'
          });
        });
      },
      handleCancel(){
        this.$router.push({ path: '/repertory/Log'})
      },
      getOne(){
        loading:true
        ajaxUtil.get('/inventoryLog/getOne/' + this.$route.params.id).then((object) => {
          loading:false
          this.inventoryLog = object.data
          this.modelForm.inventoryLogId = object.data.id
        }).catch(() => {
        })
      }
    },
    created(){
      this.getOne()
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
