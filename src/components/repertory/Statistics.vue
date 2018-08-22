<template>
  <div>
    <el-form :inline="true" :model="StatisticsQo" :rules="rules">
      <el-row>
        <el-form-item label="选择时间模式" >
          <el-radio-group v-model="StatisticsQo.dateType" @change="changeDateType">
            <el-radio label="date" >日</el-radio>
            <el-radio label="month">月</el-radio>
            <el-radio label="year">年</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间"  size="small" prop="startTime">
          <el-date-picker
            v-model="StatisticsQo.startTime"
            align="right"
            :type='StatisticsQo.dateType'
            placeholder="选择日期"
            :value-format="StatisticsQo.dateFormat"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"  size="small" prop="endTime">
          <el-date-picker
            v-model="StatisticsQo.endTime"
            :type='StatisticsQo.dateType'
            placeholder="选择日期"
            :value-format="StatisticsQo.dateFormat"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()"  size="small">查询</el-button>
          <el-button @click="exportExcel" type="success" size="small">导出查询结果</el-button>
        </el-form-item>

      </el-row>
    </el-form>
    <el-table id="rebateSetTable" v-loading="loading" :data="StatisticsVo" empty-text="暂无数据" class="el-table-1" height="auto" :default-sort = "{ order: 'descending'}">

      <el-table-column sortable type="index" label="序号" width="50" align="center"/>
      <el-table-column sortable prop="itemName" label="商品名称" width="200" align="center"/>
      <el-table-column sortable prop="itemNo" label="编号" width="100" align="center"/>
      <el-table-column sortable prop="models" label="规格"  align="center"/>
      <el-table-column sortable prop="producedTime" label="生产时间"  align="center"/>
      <el-table-column sortable prop="inventoryIn" label="入库"  align="center"/>
      <el-table-column sortable prop="inventoryReturn" label="退货"  align="center"/>
      <el-table-column sortable prop="inventoryOut" label="出库"  align="center"/>
      <el-table-column sortable prop="stock" label="现有库存"  align="center"/>
    </el-table>
  </div>
</template>


<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    components: {
      ElRow,
      ElCol},
    data() {
      return {
        loading:false,
        inventoryLogVisible:false,
        StatisticsQo: {
          dateType:'date',
          dateFormat:'yyyy-MM-dd',
          startTime:'',
          endTime:''
        },
        StatisticsVo:[],
        inventoryLogList: [],
        rules: {
          startTime: [
            {required: true, message: '请输入开始时间', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '请输入结束时间', trigger: 'blur'}
          ],

        }
      }
    },
    methods: {
      exportExcel () {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '按商品统计'+this.StatisticsQo.startTime+'至'+this.StatisticsQo.endTime+'.xlsx');
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      },
      changeDateType(){
        this.StatisticsQo.startTime =''
        this.StatisticsQo.endTime=''
      },
      onSubmit() {
        if(this.StatisticsQo.startTime =='' || this.StatisticsQo.endTime ==''){
          this.$message.error('请填写时间范围！！');
        } else if(this.StatisticsQo.startTime > this.StatisticsQo.endTime){
          this.$message.error('结束时间不能早于开始时间！！');
        } else {
        this.loading = true
        ajaxUtil.get('/statistics/getStatistics', {
          params: {
            dateType:this.StatisticsQo.dateType,
            startTime: this.StatisticsQo.startTime,
            endTime: this.StatisticsQo.endTime
          }
        }).then(({data}) => {
          this.loading = false
          this.StatisticsVo = data
        }).catch(() => {
        });
        }
      },
    },
    created: function () {
      var date = new Date();//获取当前时间
      var nowyear = date.getFullYear()+"";//获取年（yyyy）
      var nowmonth = date.getMonth()+1+"";//获取月份（0-11，0代表1月）
      this.StatisticsQo.startTime =nowyear+'-'+nowmonth+'-01'
      var date1 = new Date(nowyear,(nowmonth),0);
      var byear = date1.getFullYear()+"";
      var bmonth = date1.getMonth()+1+"";
      var bday = date1.getDate()+"";
      this.StatisticsQo.endTime = byear + "-" + bmonth + "-" + bday;
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

