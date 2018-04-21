// pages/searchinfor/searchresult.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    detailInfo:"",
    isnull:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 搜索
    if (options && options.searchValue) {
      //console.log('onload' + options.searchValue)
      this.setData({
        searchValue: options.searchValue
      });
     this.loadinfor();
    }
  
  },
  //查询搜索结果是否存在
  loadinfor: function(){
    var that=this;
    // 动态添加列表详情
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(DetailInfo);
    ////console.log('aaaa' + this.data.searchValue);
    query.equalTo("detAddr", that.data.searchValue);
    query.descending('updatedAt');
    wx.showToast({
      title: "正在查询",
      icon: 'loading',
      duration: 1500
    });
    // 查询所有数据
    query.find({
      success: function (results) {
        //console.log("查询到的信息 " + results.length + "条记录");
        if (results.length!=0)
        {
          //请求将数据存入detailInfo
          that.setData({
            detailInfo: results,
            isnull:1
          });
        }

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },
  //点击招聘列表页面跳转，页面传参
  showDetail: function (e) {
    var that = this;
    // 获取wxml元素绑定的index值
    var index = e.currentTarget.dataset.index;
    //console.log("1111111" + index);
    // 取出objectId
    var objectId = that.data.detailInfo[index].id;
    ////console.log("1111111" + objectId);
    // 跳转到详情页
    wx.navigateTo({
      url: '../detail/detail?objectId=' + objectId
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