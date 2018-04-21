// pages/register/login.js
var Bmob = require('../../utils/bmob.js');

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPhone: "",
    userInfo: {}
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },

  
  /**
   * 点击返回按钮跳转主页
   */
  goBackIndex: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {


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
    //console.log('user' + e)
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

  //提交
  put_infor:function(){
    if (this.isusername(this.data.userName) == false || this.validatemobile(this.data.userPhone) == false){

    }else{
      //console.log('查询手机号是否存在');
      var userphone = Bmob.Object.extend("UserInfo");
      var query = new Bmob.Query(userphone);
      query.equalTo("userphone", this.data.userPhone);
      var name = this.data.userName
      var phone = this.data.userPhone
      var pir_src = this.data.userInfo.avatarUrl
      var time = this.getdate();
      // 查询所有数据
      query.find({
        success: function (results) {
          //console.log("共查询到 " + results.length + "条记录");
          if (results.length == 0) {
            //console.log("用户名：" + name + " 密码：" + phone);
            var User = new userphone();
            User.set("username", name);
            User.set("userphone", phone);
            User.set("imgSrc", pir_src);
            User.set("regtime", time);
            //添加数据，第一个入口参数是null
            User.save(null, {
              success: function (result) {

                //添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                //console.log("上传成功, objectId:" + result.id);
                
                wx.switchTab({
                  url: '../personal/personal',
                });
                wx.showToast({
                  title: "注册成功",
                  icon: 'success',
                  duration: 2000

                });
              },

              error: function (result, error) {
                // 添加失败
                // //console.log('上传失败');

              }
            });
            }
          else{
            wx.showToast({
              title: "该手机号已注册",
              image:"../../images/warning.png",
              duration: 2000
            });
          }
          
        }
      });
    }
        
  },
  //判断用户名是否为空
  isusername: function (user) {
    //console.log('判断用户名：'+user)
    if (user.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
  },
  // 判断手机号是否正确
  validatemobile: function (mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  getdate: function () {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var yue = String(myDate.getMonth() + 1); //获取当前月
    var date = String(myDate.getDate()); //获取当前日
    if(yue.length == 1) {
      yue = '0' + yue;
    }
    if (date.length == 1) {
      date = '0' + date;
    }
    var ss = year + '-' + yue + '-' + date;
    return ss
  }
})