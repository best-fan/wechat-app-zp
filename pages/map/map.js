var app = getApp()
Page({
  data: {
    // latitude: 0,//纬度 
    // longitude: 0,//经度 
    latitude: 23.10229,
    longitude: 113.3345211,
    speed: 0,//速度 
    accuracy: 16,//位置精准度 

  },
  onLoad: function () {
    this.getlocation();
  },
  getlocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        //console.log("latitude:" + latitude)
        //console.log("longitude:" + longitude)
        //console.log("speed:" + speed)
        //console.log("accuracy:" + accuracy)
        // wx.openLocation({
        //   latitude: 113.8837,
        //   longitude: 35.2986,
        //   scale: 28,
        //   // //位置名
        //   // name: '新乡市人民公园',
        //   // //详细地址
        //   // address: '新乡市红旗区'
        
        // })
       // var latitude = Number(113.8837) 
       // var longitude = Number(35.2986) 
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          name:'濮阳县德顺人力资源服务有限公司',
          address:'河南省濮阳县庆祖镇庆中村'
        })

      }
    })
  },

  // getlocation: function () {
  // wx.getLocation({
  //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
  //   success: function (res) {


  //   }

  // })
  // }
})