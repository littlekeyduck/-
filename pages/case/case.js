
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options)
    var postId = options.id
    var that = this

    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=29',
      data: {

      },
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var pic = res.data.data[postId].pic.replace('//', 'https://')
        res.data.data[postId].pic = pic
        that.setData({
          case: res.data.data[postId]
        })
      }
    });
  }
})