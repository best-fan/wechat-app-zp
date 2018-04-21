// pages/myjoin/myjoin.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户名
    username:'',
    //报名信息
    infor:'',
    //将要删除的信息
    seleteinfor:'',
    num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      username: options.username
    })

   this.getinfor();
  },
  //获取报名信息
  getinfor:function(){
    var that = this;
    //获取报名信息
    var Diary = Bmob.Object.extend("MyJoinInfo");
    var query = new Bmob.Query(Diary);
    query.equalTo("userName", that.data.username);
    // 查询所有数据
    query.find({
      success: function (results) {
        //console.log("共查询到 " + results.length + " 条记录");
        that.setData({
          infor: results,
          num:results.length 
        })
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  //获取id
  setinfor: function (e){
    //console.log('选择：'+e.detail.value)
    this.setData({
      seleteinfor: e.detail.value+''
    })
  },
  //删除数据
  deleteinfor: function(){
    var that=this;
    var Diary = Bmob.Object.extend("MyJoinInfo");
    var query = new Bmob.Query(Diary);
    query.get(that.data.seleteinfor, {
      success: function (object) {
        // The object was retrieved successfully.
        object.destroy({
          success: function (deleteObject) {
            //console.log('删除成功');
            that.getinfor();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
          },
          error: function (object, error) {
            //console.log('删除失败');
          }
        });
      },
      error: function (object, error) {
        //console.log("query object fail");
        wx.showToast({
          title: '请重新选择',
          image: "../../images/warning.png",
          duration: 2000,
          mask: true
        })
      }
    });

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