// pages/newsList/newsList.js
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
    var limit = 6
    var pages = 1

    //只为了获取总文章数
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=76&titlelen=24',
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
        var value = wx.getStorageSync("videos")
        var key = value.length
        if (key == len) {
          that.setData({
            detail: value
          })
        }
        else {
          wx.request({
            url: 'https://www.anifun.club/index.php/api/list?cid=76&titlelen=24',
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
                that.setData({
                  detail: res.data.data,
                  pages: pages
                })
              }
            }
          })
        }
      }
    })

  },//onload段尾
  //根据文章跳转到文章内容
  onPostTap: function (event) {
    console.log(event)
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../pages/videos/videos?id=' + postId,
    })
  },
  //上拉监听加载更多
  searchScrollLower: function () {
    var that = this
    var keys = that.data.len //从onload里面获取的文章数
    console.log(keys)
    var value = wx.getStorageSync("videos")
    var key = value.length
    if (key == keys) {
      // that.setData({
      //   detail: value
      // })
      wx.showToast({
        title: '没有更多数据了',
        duration: 300,
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
      var limit = 6
      console.log(pages)
      wx.request({
        url: 'https://www.anifun.club/index.php/api/list?cid=76&titlelen=24',
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

            list.push(ct[i])
            that.setData({
              detail: list,
              pages: pages,
            })
          }
          //设置缓存
          wx.setStorageSync("videos", list)
          wx.setStorageSync("key3", pages)
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
              duration: 300,
              icon: "none"
            })
          }
        }
      })
    }
  },
  //打开视频按钮
  openVideos: function (event) {
    console.log(event)
    var postId = event.currentTarget.dataset.getpid
    wx.navigateTo({
      url: '../../pages/videos/videos?id=' + postId,
    })
  }
})