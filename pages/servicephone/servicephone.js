// pages/servicephone/servicephone.js

//引入SDK
var Bmob = require('../../utils/bmob.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumberOne:'15518560900',
    phoneNumberTwo: '15239319818',
    phoneNumberThree: '15839341286',
    phoneNumberFour: '15090238998',
    phoneNameOne:'张经理',
    phoneNameTwo: '李经理',
    phoneNameThree: '张经理',
    phoneNameFour: '李经理',
  },
/*跳转到拨号页面*/
bindMakePhoneOne:function(){
  wx.makePhoneCall({
    phoneNumber: this.data.phoneNumberOne //仅为示例，并非真实的电话号码
  })
},
bindMakePhoneTwo: function () {
  wx.makePhoneCall({
    phoneNumber: this.data.phoneNumberTwo //仅为示例，并非真实的电话号码
  })
},
bindMakePhoneThree: function () {
  wx.makePhoneCall({
    phoneNumber: this.data.phoneNumberThree //仅为示例，并非真实的电话号码
  })
},
bindMakePhoneFour: function () {
  wx.makePhoneCall({
    phoneNumber: this.data.phoneNumberFour //仅为示例，并非真实的电话号码
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})