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
  }
}
