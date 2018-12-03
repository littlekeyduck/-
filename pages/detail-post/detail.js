// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
  },
  onLoad: function (options) {
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
      url: 'https://www.anifun.club/index.php/api/list?cid=28&titlelen=24',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var ct = res.data.data
        var pic = ct[postId].pic.replace("//", "https://")
        ct[postId].pic = pic
        var content = ct[postId].content
        var content1 = WxParse.wxParse('content', 'html', content, that, 11);
        that.setData({
          detail: ct[postId]
        })
      }
    })
  }
})