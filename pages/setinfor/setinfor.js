// pages/setinfor/setinfor.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数据库个人信息
    username: '',
    userphone:'',
    objectId: '',
    //原始手机号
    initphone:'',
  
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      userphone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getinfor();
  
  },
  //获取信息
  getinfor:function(){
    var that = this
    var imgsrc = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(imgsrc);

    query.equalTo("imgSrc", app.userinfor.img_src);
    query.find({
      success: function (results) {
        ////console.log("个人中心判断:共查询到 " + results.length + " 条记录");
          //用户已注册
          that.setData({
            username: results[0].get("username"),
            userphone: results[0].get("userphone"),
            initphone: results[0].get("userphone"),
            objectId: results[0].id,
          });

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  //更新信息
  bindViewPut:function(){
    var that=this;
    var Diary = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(Diary);
    if (that.isusername(that.data.username) != false && that.validatemobile(that.data.userphone) != false ){
      if (that.data.initphone == that.data.userphone){
        //手机号未修改
        query.get(that.data.objectId, {
          success: function (result) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            // result.set('username', that.data.username);
            result.set('userphone', that.data.userphone);
            result.save();
            wx.switchTab({
              url: '../personal/personal'
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            //console.log('修改成功');
            // The object was retrieved successfully.
          },
          error: function (object, error) {

          }
        });
      }else{
        //查询手机号是否存在
        query.equalTo("userphone", that.data.userphone);
        //console.log('手机号：' + that.data.userphone)
        // 查询所有数据
        query.find({
          success: function (results) {
            //console.log('查询结果：'+results.length)
            if (results.length == 0) {
              var GameScore = Bmob.Object.extend("UserInfo");
              var query = new Bmob.Query(GameScore);
              query.get(that.data.objectId, {
                success: function (userinfo) {
                  // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                  userinfo.set("username", that.data.username);
                  userinfo.set("userphone", that.data.userphone);
                  userinfo.save();
                  wx.showToast({
                    title: "修改成功",
                    icon: 'success',
                    duration: 2000

                  });
                  // The object was retrieved successfully.
                },
                error: function (object, error) {

                }
              });

              // //添加数据，第一个入口参数是null
              // User.save(null, {
              //   success: function (result) {

              //     //添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
              //     //console.log("上传成功, objectId:" + result.id);

              //     wx.switchTab({
              //       url: '../personal/personal',
              //     });
              //     wx.showToast({
              //       title: "修改成功",
              //       icon: 'success',
              //       duration: 2000

              //     });
              //   },

              //   error: function (result, error) {
              //     // 添加失败
              //     //console.log('上传失败');

              //   }
              // });
            }
            else {
              wx.showToast({
                title: "该手机号已注册",
                image: "../../images/warning.png",
                duration: 2000
              });
            }

          }
        });

      }

    }


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
  //判断用户名是否为空
isusername:function(user){
  if(user.length==0){
    wx.showToast({
      title: '用户名不能为空',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
}
})