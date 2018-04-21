//app.js
//引入SDK
var Bmob = require('utils/bmob.js');
//初始化Bmobkey
Bmob.initialize("", "");

App({
  globalData:{
    tabid:0,
    userInfo: null
  },
  //用户信息
  userinfor:{
    imgsrc: "",
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
       // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // this.user_id.openid =res.code  //返回code
      //   console.log('aaaaa:'+code);
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              this.userinfor.img_src = res.userInfo.avatarUrl
            
             // console.log("aaa" + res.userInfo.avatarUrl) 

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }
    )
  }
})