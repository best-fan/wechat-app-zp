// pages/award/award.js

//引入SDK
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPhone: '',
    //推荐人手机号
    recoName: '',
    
  },
  //获取用户输入的用户名
  recoNameInput: function (e) {
    this.setData({
      recoName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载(获取用户的微信信息)
   */
  onLoad: function () {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成（以用户微信头像为条件获取用户的姓名）
   */
  onReady: function () {
    var that = this
    var imgsrc = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(imgsrc);

    query.equalTo("imgSrc", app.userinfor.img_src);

    // 查询用户是否注册
    query.find({
      success: function (results) {
        ////console.log("共查询到 " + results.length + " 条记录");
        
          that.setData({
            userName: results[0].get("username"),
            userPhone: results[0].get("userphone"),
          });
          
        },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
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
  //提交
  put_infor: function () {
    if (this.data.recoName == "") {
      wx.showToast({
        title: '输入框不能为空',
        image: "../../images/warning.png",
        duration: 2000
      });
    } else {
      //console.log('查询是否已存在');
      var myRecommend = Bmob.Object.extend("MyRecommend");
      var query = new Bmob.Query(myRecommend);
      var that=this;
      query.equalTo("userPhone", Number(that.data.userPhone));
      query.equalTo("userName", that.data.userName);
      query.equalTo("recoName", that.data.recoName);
      // 查询所有数据
      query.find({
        success: function (results) {
          //console.log("共查询到 " + results.length + "条记录");
          if (results.length == 0) { 
            var User = new myRecommend();
            User.set("userPhone", Number(that.data.userPhone));
            User.set("userName", that.data.userName);
            User.set("recoName", that.data.recoName);

            //添加数据，第一个入口参数是null
            User.save(null, {
              success: function (result) {
                //添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                //console.log("上传成功, objectId:" + result.id);    
                wx.switchTab({
                  url: '../index/index'
                })        
                wx.showToast({
                  title: "推荐成功",
                  icon: 'success',
                  duration: 2000          
                });
              },

              error: function (result, error) {
                // 添加失败
                //console.log('上传失败');

              }
            });
          }
          else {
            wx.showToast({
              title: "推荐信息已提交",
              image: "../../images/warning.png",
              duration: 2000
            });
          }

        }
      });
    }

  }
})