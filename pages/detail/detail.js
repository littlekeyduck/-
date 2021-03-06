// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options)
    var postId = options.id;
    var that = this
    /**
     * 初始化emoji设置
     */
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=74',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var ct = res.data.data


        var pic = ct[postId].pic.replace("//", "https://")
        ct[postId].pic = pic

        var content = ct[postId].content
        WxParse.wxParse('content', 'html', content, that, 11);


        that.setData({
          detail: ct[postId],
          postId: postId
        })
      }
    })

  },
  seemoremessage: function () {
    wx.switchTab({
      url: '../../pages/newsList/newsList',
    })
  },
  backhome: function () {
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },
  test:function(){
    wx.switchTab({
      url: '../../pages/test/test',
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
    var that = this
    var postId = that.data.postId
    console.log(postId)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '都把人家看穿了，还不点进来',
      path: '/pages/detail/detail?id=' + postId,
      success: function (res) {
        // 转发成功
        that.setData({
          detail: ct[postId]
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})