// pages/search/search.js
Page({

  data: {

  },

  onLoad: function (e) {

  },
  searchValueInput: function (e) {
    var value = e.detail.value
    this.setData({
      searchValue: value,
    });
  },
  suo: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.postid
    var value = that.data.searchValue

    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=74&titlelen=24',
      method: 'post',
      data: {
        keyword: value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        var ct = res.data.data

        console.log(ct.length)
        for (var i = 0; i < ct.length; i++) {
          ct[i].pic = ct[i].pic.replace("//", "https://")
          that.setData({
            detail: ct
          })
        }
      },
      complete: function (res) {
        var length = res.data.data.length
        if (length == 0) {
          wx.showToast({
            title: "查找不到数据",
            duration: 700,
            icon: "none"
          });
        }
        else {
          wx.showToast({
            title: "已为你找到",
            duration: 700,
            icon: "success"
          });
        }
      }
    })
  },
  //根据文章跳转到文章内容
  onPostTap: function (event) {
    var that = this
    var _obj = {};
    var postId = event.currentTarget.dataset.postid;
    var value = that.data.searchValue
    _obj.postId = postId
    _obj.value = value
    console.log(_obj)
    console.log(value)

    wx.navigateTo({
      url: '../../pages/detail-search/detail?id=' + postId + '&value=' + value,
    })
  }
})