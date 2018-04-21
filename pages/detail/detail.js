// pages/index/detail.js

//引入SDK
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    username:'',
    userphone:'',
    detName :'',
    detSrc: '',
    objectId:'',
    //报名个数
    num:'',
    //是否为第一次加载
    isfist:true,
  },
  /**
   * 求职热线跳转
   */
  bindViewServicePhone: function () {
    wx.navigateTo({
      url: '../servicephone/servicephone'
    })
  },  
  /**
     * 返回主页跳转
     */
  bindViewIndex: function () {
    wx.switchTab({
      //url: '../servicephone/servicephone'
      url: '../index/index'
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否注册
    this.isuser();

    var that = this;
    // 获取传参
    if (options!=null)
    {

      that.setData({
        objectId: options.objectId,
      });
      //console.log('options为空')
    }else{
     
      //console.log('options不为空')
    }
   
    // 向Bmob请求详情页数据
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(DetailInfo);
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(that.data.objectId, {
      success: function (results) {
        that.setData({
          content: results,
          detName: results.get("detName"),
          detSrc: results.get("detSrc"),
          num: results.get("entNum"),
          
        });
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  
  },
  //提交信息
  bindViewPutinfor: function (){
    var name =this.data.detName
    var that = this;
    //console.log(name);
    //判断用户是否注册
    if (that.data.username.length==0){
      //用户已注册
      wx.showToast({
        title: '请先注册',
        image: "../../images/warning.png",
        duration: 1500
      })  
    }
    else{
    var MyJoinInfo = Bmob.Object.extend("MyJoinInfo");
    var query = new Bmob.Query(MyJoinInfo); 
    query.equalTo("userPhone", that.data.userphone);
    query.equalTo("myJoinName", that.data.detName);
    // 查询用户是否已经报名过这家公司
    query.find({
      success: function (results) {
        //console.log("个人中心判断:共查询到 " + results.length + " 条记录");
        if (results.length == 0) {
         
         //提交用户信息
          var MyJoinInfo = Bmob.Object.extend("MyJoinInfo");
          var diary = new MyJoinInfo();
          diary.set("userName", that.data.username);
          diary.set("userPhone",Number( that.data.userphone));
          diary.set("myJoinName", that.data.detName);
          diary.set("detSrc", that.data.detSrc);
          //添加数据，第一个入口参数是null
          diary.save(null, {
            success: function (result) {
              // 报名表添加成功，
              wx.showToast({
                title: '报名成功',
                icon: 'success',
                duration: 2000
              })
              //更新招聘信息表
              var Diary = Bmob.Object.extend("DetailInfo");
              var query = new Bmob.Query(Diary);       
              query.get(that.data.objectId, {
                success: function (result) {
                  // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                  result.set('entNum', (that.data.num + 1));
                  result.save();
                  //console.log('+1')
                  that.setData({
                  isFist:false,
                 });
                 that.onShow();
                  // The object was retrieved successfully.
                },
                error: function (object, error) {
                  //console.log('添加失败')
                }
              });

            },
            error: function (result, error) {
              // 添加失败
              //console.log('创建失败' + error.code + " " + error.message);

            }
          });
        } else {
          //用户已报名
          wx.showToast({
            title: '已参加过报名',
            image: "../../images/warning.png",
            duration: 2000
          })  
        }

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
     });
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
    var that=this;
    if(that.data.isFist==false)
    {
    // 向Bmob请求详情页数据
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(DetailInfo);
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(that.data.objectId, {
      success: function (results) {
        that.setData({
          content: results,
         
        });
      },
      error: function (object, error) {
        // 查询失败
      }
    });
    
    }
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
  //点击微信咨询
  bindViewXWZX: function () {
    wx.showToast({
      title: '此功能暂未启用',
      image: "../../images/warning.png",
      duration: 2000,
      mask: true
    })
  },
  /**
   * 判断用户是否存在
   */
  isuser:function(){
    var that = this
    var imgsrc = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(imgsrc);
    query.equalTo("imgSrc", app.userinfor.img_src);

    // 查询用户是否存在
    query.find({
      success: function (results) {
        //console.log("个人中心判断:共查询到 " + results.length + " 条记录");
        if (results.length == 0) {
          wx.redirectTo({
            url: '../personal/personal',
          })
        } else {
          //用户存在
          that.setData({
            username: results[0].get("username"),
            userphone: results[0].get("userphone"),
          });
          //console.log('用户存在');
         // //console.log(that.data.userphone + that.data.username);

        }

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  }

})