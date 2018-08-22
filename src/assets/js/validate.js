export default {

  /**
   * 校验登录名是否合法
   * @param val
   * @returns {boolean}
   */
  validateUserName (val) {
    var reg = /^[a-zA-z0-9]{2,14}$/
    return reg.test(val)
  },

  /**
   * 校验登录密码是否合法
   * @param val
   * @returns {boolean}
   */
  validatePassword (val) {
    var reg = /^[\w\s~!@%#$^*+='?\-(){}[],.|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;"]{6,20}$/
    return reg.test(val)
  },
  /**
   * 数量
   * @param val
   * @returns {boolean}
   */
  validateQuantity (val) {
    var reg = /^[0-9]{1,9}([.]+[0-9]{0,4})?$/
    return reg.test(val)
  },
  /**
   * 价格金钱
   */
  validateMoney (val){
    var reg = /^[0-9]{1,20}([.]+[0-9]{0,2})?$/
    return reg.test(val)
  },
  /**
   * 发票代码
   */
  validateInvoiceCode(val){
    var reg = /^[0-9]{1,12}$/
    return reg.test(val)
  },
  /**
   * 发票号码
   */
  validateInvoiceNo(val){
    var reg = /^[0-9]{1,8}$/
    return reg.test(val)
  }
}
