Page({

  data: {
    pages: 1,
    load: "loading",
    title: "请稍候"
  },

  onLoad: function (options) {
    var that = this

    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    //限定一次刷新获取的文章数limit
    var limit = 4
    var pages = 1
    //获取总文章数
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=75&titlelen=24',
      data: {
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var ct = res.data.data
        var len = ct.length
        that.setData({
          len: len
        })
        //判断如果缓存文章数一样，缓存获取，反之不加载数据
        console.log(res)
        var value = wx.getStorageSync("List2")
        var key = value.length
        if (key == len) {
          that.setData({
            detail: value
          })
        }
        else {
          wx.request({
            url: 'https://www.anifun.club/index.php/api/list?cid=75&titlelen=24',
            data: {
              limit: limit,
              pages: pages
            },
            header: { 'Content-Type': 'application/json' },
            success: function (res) {
              var ct = res.data.data
              for (var i = 0; i < ct.length; i++) {
                var pic = ct[i].pic.replace('//', 'https://')
                ct[i].pic = pic
                var desc = ct[i].desc.substring(4, 43)
                ct[i].desc = desc
                that.setData({
                  detail: res.data.data,
                  pages: pages
                })
                console.log(res)
              }
            }
          })
        }
      }
    })

  },//onload段尾
  //上拉监听加载更多
  searchScrollLower: function () {
    var that = this
    var keys = that.data.len
    console.log(keys)
    var value = wx.getStorageSync("List2")
    var key = value.length
    if (key == keys) {
      // that.setData({
      //   detail: value
      // })
      wx.showToast({
        title: '没有更多数据了',
        duration: 600,
        icon: "none"
      })
    }
    else {
      var pages = that.data.pages
      var icon = that.data.load
      var title = that.data.title

      wx.showToast({
        title: title,
        duration: 800,
        icon: icon
      })
      pages = pages + 1
      var limit = 4
      console.log(pages)
      wx.request({
        url: 'https://www.anifun.club/index.php/api/list?cid=75&titlelen=24',
        data: {
          limit: limit,
          pages: pages
        },
        header: { 'Content-Type': 'application/json' },
        method: 'GET',
        success: function (res) {
          var list = that.data.detail
          var ct = res.data.data

          for (var i = 0; i < ct.length; i++) {

            ct[i].pic = ct[i].pic.replace("//", "https://")
            var desc = ct[i].desc.substring(4, 43)
            ct[i].desc = desc
            list.push(ct[i])
            that.setData({
              detail: list,
              pages: pages,
            })
          }
          //设置缓存
          wx.setStorageSync("List2", list)
          wx.setStorageSync("key2", pages)
        },
        //成功之后文章数量显示状态
        complete: function (res) {
          console.log(res.data.data)
          var last = res.data.data.length

          if (last) {
            wx.showToast({
              title: "加载成功",
              duration: 600,
              icon: "success"
            });
          }
          else if (last == 0) {
            wx.showToast({
              title: '没有更多数据了',
              duration: 600,
              icon: "none"
            })
          }
        }
      })
    }
  },
  seeschool: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../pages/school/school-items/school-items?id=' + postId,
    })
  }
})