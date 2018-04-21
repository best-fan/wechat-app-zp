// pages/personal/personal.js
var Bmob = require('../../utils/bmob.js');

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //微信官方信息
    userInfo:{},
    //数据库个人信息
    username:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //console.log("onLoad")
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
           this.setData({
             userInfo: res.userInfo,
             hasUserInfo: true
           })
        }
      })
    }
  
   
  },
  getUserInfo: function (e) {
    //console.log('user'+e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
   
    //console.log("onShow")
    var that = this
    var imgsrc = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(imgsrc);
    query.equalTo("imgSrc", app.userinfor.img_src);
    // 查询用户是否注册
    query.find({
      success: function (results) {
        //console.log("个人中心判断:共查询到 " + results.length + " 条记录");
        if (results.length == 0) {
          wx.redirectTo({
            url: '../register/register',
          })
        } else {
          //用户已注册
          that.setData({
            username: results[0].get("username")
          });
          // //console.log( data.username);
          wx.redirectTo({
            url: '../personal/personal',
          })
        }

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });

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
  
  },
  //点击个人中心里我的报名页面跳转
  bindViewMyJoin: function () {
    var user=this.data.username
    wx.navigateTo({
      url: '../myjoin/myjoin?username=' + user
    })
  },
  //点击个人中心里我的客服页面跳转
  bindViewServicePhone: function () {
    wx.navigateTo({
      url: '../servicephone/servicephone'
    })
  },
  //点击个人中心里门店地址页面跳转
  bindViewMap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  //点击个人中心里修改信息页面跳转
  bindViewTodayGxz:function(){
    wx.navigateTo({
      url: '../setinfor/setinfor' 
    })
  },
  //点击个人中心里我的推荐跳转
  bindViewMyaward:function(){
    var user = this.data.username
    wx.navigateTo({
      url: '../myaward/myaward?username=' + user
    })
  }

})