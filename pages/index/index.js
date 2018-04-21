// pages/index/FirstIndex.js

//引入SDK
var Bmob = require('../../utils/bmob.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingTip:"上拉加载更多",
    page_index:0,
    detailInfo:"",

    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls:'',

    //tab 
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置

  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    //console.log(this.data.swiperCurrent);
    // wx.switchTab({
    //  // url: this.data.links[this.data.swiperCurrent]
    // })
  },
   //点击招聘列表页面跳转，页面传参
  showDetail: function (e) {
    var that = this;
    // 获取wxml元素绑定的index值
    var index = e.currentTarget.dataset.index;
  //  console.log("1111111" + index);
    // 取出objectId
    var objectId = that.data.detailInfo[index].id;
    //console.log("1111111" + objectId);
    // 跳转到详情页
    wx.navigateTo({
      url: '../detail/detail?objectId=' + objectId
    });
  },
  //点击门店导航页面跳转
  bindViewLoaction:function(){
    wx.navigateTo({
      url: '../map/map'
    })
    
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
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getswitchimg();
   this.qbzwLoad();
  },
  //加载轮播图
  getswitchimg:function(){
    var that=this;
    var Diary = Bmob.Object.extend("SwiperImgSrc");
    var query = new Bmob.Query(Diary);
    // 查询所有数据
    query.find({
      success: function (results) {
        //console.log("轮播图共查询到 " + results.length + " 条记录");
        that.setData({
          imgUrls: results
        });
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
//分页加载
  loadArticle: function () {
    ////console.log('分页传值:' + this.data.currentTab);
    var that = this;
    var page_size = 10;
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(DetailInfo); 
    ////console.log('分页传值:' + currentTaB);
    switch (that.data.currentTab) {
      case 0:
        //console.log('全部职位');
        //this.qbzwLoad();
        query.descending('updatedAt');
        break;
      case 1:
        //console.log('高薪资');
        query.equalTo("payType", 0);
        query.descending('detPayMax');

        break;
      case 2:
        //console.log('临时工');
        query.equalTo("payType", 1);
        query.descending('detPayMax');

        break;
      case 3:
        //console.log('推荐');
        query.descending('entNum');
        break;
    }
  // 分页
  query.limit(page_size);
  query.skip(that.data.page_index * page_size);
  var aaa = that.data.page_index * page_size
  //console.log('跳过:' +aaa)
  // 查询所有数据
  query.find({
    success: function (results) {
      // 请求成功将数据存入article_list
      that.setData({
        detailInfo: that.data.detailInfo.concat(results)
      });
      //console.log('查询数量:' + results.length + '加载数量' + page_size)

      if(results.length<page_size){
        //如果数据库中剩余的条数 不够下次分页加载则全部加载
        query.skip(that.data.page_index * page_size);
        query.find({
          success: function (results) {
            //console.log('最后剩余数量：'+results.length)
            that.setData({
              detailInfo: that.data.detailInfo.concat(results)
            })
          }
        });

        that.setData({
        loadingTip: '没有更多内容'
      });

      }
    }
 
    });
},

  /**
   * 页面上拉触底事件的处理函数
   */
  scrolltolower: function () {
    //console.log('--下拉刷新-')
    this.setData({
      page_index: ++this.data.page_index
    });
    if (this.data.loadingTip !="没有更多内容"){
      wx.showToast({
        title: "正在加载",
        icon: 'loading',
        duration: 1000
      });
    }
    this.loadArticle();
  },
  /**
   * 页面搜索事件的处理函数
   */
  wxSearchTab: function () {
    //console.log('wxSearchTab');
    wx.navigateTo  ({
      url: '../search/search'
    })
  },
  /**
   * 列表详情跳转
   */
  bindViewList: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  /**
   * 推荐奖励跳转
   */
  bindViewAward: function () { 
    wx.switchTab({
      url: '../award/award'
    })
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
   * 今日招聘（全部职位）跳转
   */
  bindViewToday: function () {
    app.globalData.tabid = 0;
    wx.switchTab({
      url: '../today/today',
    })
  },  
  /**
 * 今日招聘（高薪资）跳转
 */
  bindViewTodayGxz: function () {
    app.globalData.tabid=1;
    wx.switchTab({
      url: '../today/today',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
  },  
  /**
 * 今日招聘（临时工）跳转
 */
  bindViewTodayLsg: function () {
    app.globalData.tabid = 2;
    wx.switchTab({
      url: '../today/today',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
  },  
  /**
 * 今日招聘（推荐）跳转
 */
  bindViewTodayTj: function () {
    app.globalData.tabid = 3;
    wx.switchTab({
      url: '../today/today',
      success: function (e) { 
      var page = getCurrentPages().pop(); 
      if (page == undefined || page == null) return; 
      page.onLoad(); 
      } 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //滚动tab
  
  // 滚动切换标签样式
  switchTab: function (e) {
    var cur = e.detail.current;
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
    ////console.log('滑动' + cur);
    this.switchTabLoad(cur+'');
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
  
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    //  //console.log('点击tab'+cur);
      this.switchTabLoad(cur);
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //tab分类加载
  switchTabLoad: function(e){
    var that = this;
    this.cleardata();
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(DetailInfo);
    switch (e) {
      case '0':
        //console.log('全部职位');
        //this.qbzwLoad();
        query.descending('updatedAt');
        break;
      case '1':
        //console.log('高薪资');
        query.equalTo("payType", 0);
        query.descending('detPayMax');
        break;
      case '2':
        //console.log('临时工');
        query.equalTo("payType", 1);
        query.descending('detPayMax');

        break;
      case '3':
        //console.log('推荐');
        query.descending('entNum');
        break;
    }
    query.limit(10);
    wx.showToast({
      title: "正在加载",
      icon: 'loading',
      duration: 1000
    });
    // 查询数据
    query.find({
      success: function (results) {
        //console.log("第一次加载 " + results.length + "条记录");
        //请求将数据存入detailInfo
        that.setData({
          detailInfo: results,
          page_index:0,
          loadingTip:"上拉加载更多"
        });
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },
  //全部职位加载
  qbzwLoad:function(){
    var that = this;
    // 动态添加列表详情
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(DetailInfo);
    query.descending('updatedAt');
    query.limit(10);
    wx.showToast({
      title: "正在加载",
      icon: 'loading',
      duration: 1000
    });
    // 查询所有数据
    query.find({
      success: function (results) {
        //console.log("第一次加载 " + results.length + "条记录");
        //请求将数据存入detailInfo
        that.setData({
          detailInfo: results
        });
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  //清空招聘列表
  cleardata: function(){
    this.setData({
      detailInfo:[]
    });
  }


})