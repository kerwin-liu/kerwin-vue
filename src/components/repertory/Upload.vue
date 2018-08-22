<template>
  <div>
    <el-col :span="8" :offset="6">
      <el-upload
        class="upload-demo"
        ref="upload"
        :data="pdf"
        action="kerwin/pdf/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        list-type="picture"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('pdf')">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <el-form label-position="right" :model="pdf" ref="pdf" label-width="100px" status-icon :rules="rules">
        <el-form-item label="发票代码" prop="invoiceCode">
          <el-input v-model="pdf.invoiceCode" placeholder="发票代码"></el-input>
        </el-form-item>
        <el-form-item label="发票号码" prop="invoiceNo">
          <el-input v-model="pdf.invoiceNo" placeholder="发票号码"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import validate from '@/assets/js/validate.js'
  import util from '@/assets/js/util.js'
  export default {
    data(){
      const validatorInvoiceCode = (rule, value, callback) => {
        if (validate.validateInvoiceCode(value)) {
          callback();
        } else {
          return callback(new Error('请填写正确的发票代码'));
        }
      }
      const validatorInvoiceNo = (rule, value, callback) => {
        if (validate.validateInvoiceNo(value)) {
          callback();
        } else {
          return callback(new Error('请填写正确的发票号码'));
        }
      }
      return {
        pdf: {
          file: '',
          invoiceCode: '',
          invoiceNo: '',
        },
        rules: {
          invoiceCode: [
            {required: true, message: '请输入发票代码', trigger: 'blur'},
            {validator: validatorInvoiceCode, trigger: 'blur'}
          ],
          invoiceNo: [
            {required: true, message: '请输入发票号码', trigger: 'blur'},
            {validator: validatorInvoiceNo, trigger: 'blur'}
          ],
          file: [
            {required: true, message: '请选择电子发票', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitUpload(pdf) {
        this.$refs[pdf].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit()
          }
        })

      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      }
    }
  }
</script>

<style scoped>

</style>
