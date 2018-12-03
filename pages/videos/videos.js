// pages/videos/videos.js
Page({
  data: {

  },

  onLoad: function (options) {
    var postId = options.id;
    var that = this
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=76',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var ct = res.data.data

        var pic = ct[postId].pic.replace("//", "https://")
        ct[postId].pic = pic
        var getid = ct[postId].id
        console.log(getid)
        that.setData({
          videos: ct[postId],
          postId: postId,
          getid: getid
        })
        //获取真实视频地址
        wx.request({
          url: 'https://www.anifun.club/index.php/admin/content/getcontent',
          data: {
            id: getid
          },
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            var url = res.data.url
            console.log(url)
            that.setData({
              url: url
            })

          }
        })
      }
    })
    wx.request({
      url: 'https://www.anifun.club/index.php/admin/content/getcontentList',
      data: {

      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {

        console.log(res)
        that.setData({

        })

      }
    })
  },
  seemorevideo: function () {
    wx.navigateTo({
      url: '../../pages/videoslist/videoslist'
    })
  },
  backhome: function () {
    wx.reLaunch({
      url: '../../pages/index/index'
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
      path: '/pages/videos/videos?id=' + postId,
      success: function (res) {
        // 转发成功
        that.setData({
          videos: ct[postId],
          postId: postId
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})