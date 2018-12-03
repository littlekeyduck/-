// pages/consult/consult.js
Page({

  data: {

  },

  onLoad: function (options) {
    wx.getStorageSync("consult")
    var that = this
    wx.request({
      url: 'https://www.anifun.club/index.php/api/type?typeid=20',
      data: {},
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        var pic = res.data.data.pic.replace('//', 'https://')
        res.data.data.pic = pic
        that.setData({
          aboutus: res.data.data
        })
        wx.setStorageSync("consult", pic)
      }
    });

  }

})