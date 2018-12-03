//index.js
//获取应用实例
const app = getApp()
// var QQMapWX = require('qqmap-wx-jssdk.js');
// var qqmapsdk;

Page({
  data: {
    info: [],
    introduce: '红领巾法语由2014年04月17日成立的法国巴黎留学生教育交流协会发展壮大而来，于2018年成立公司，整合多家国内外线上教育工作室资源。目前公司以小语种语言培训为核心,拥有短期培训系统、留学教育系统、文化传播系统、咨询服务系统、职前教育系统等多个发展平台，是一家集教育培训、留学申请、境外服务等一体的综合性小语种教育科技公司。线上淘宝店：“红领巾法语”经过5年的发展，成为法语培训以及法国留学圈的网红机构。'
  },
  onLoad: function () {
    // qqmapsdk = new QQMapWX({
    //   key: 'SLGBZ-DGYCP-SEGDL-VNRH2-KLODF-VQB2J' // 必填
    // });
    var that = this;
    //导航三大文章
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=28&limit=3',
      data: {
        type: 2
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        for (var i = 0; i < 3; i++) {
          var pic = res.data.data[i].pic.replace('//', 'https://')
          res.data.data[i].pic = pic
          that.setData({
            info: res.data.data
          })
        }

      }
    });
    //公司服务
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=77',
      data: {},
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {
        var pic = res.data.data[0].pic.replace('//', 'https://')
        res.data.data[0].pic = pic
        that.setData({
          service: res.data.data
        })
      }
    });
    //关于我们的联系方式
    wx.request({
      url: 'https://www.anifun.club/index.php/api/type?typeid=30',
      data: {},
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {

        var phone = res.data.data.content.substring(8, (res.data.data.content.length - 4))
        var weixin = res.data.data.desc.substring(8, (res.data.data.desc.length - 4))
        var pic = res.data.data.pic.replace('//', 'https://')
        that.setData({
          phone: phone,
          weixin: weixin,
          allcase: pic
        })
      }
    });
    //初始化视频列表
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=76&titlelen=24&limit=3',
      data: {},
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {

        for (var i = 0; i < 3; i++) {
          var ct = res.data.data
          var pic = ct[i].pic.replace('//', 'https://')
          var s = ct[i].content
          var reg = s.replace(/<p>/g, "<view>")
          var reg1 = reg.replace("//", 'https://')
          ct[i].content = reg1
          ct[i].pic = pic
          that.setData({
            videos: ct
          })
        }
      }
    })
    //初始文章列表
    wx.request({
      url: 'https://www.anifun.club/index.php/api/list?cid=74&titlelen=24&limit=6',
      data: {},
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {

        for (var i = 0; i < 6; i++) {
          var ct = res.data.data
          var pic = ct[i].pic.replace('//', 'https://')
          var s = ct[i].content
          var reg = s.replace(/<p>/g, "<view>")
          var reg1 = reg.replace("//", 'https://')
          ct[i].content = reg1
          ct[i].pic = pic
          that.setData({
            article: ct
          })
        }
      }
    })
  },
  openCase: function (event) {
    console.log(event)
    var postId = event.currentTarget.dataset.case;
    wx.navigateTo({
      url: '../../pages/case/case?id=' + postId,
    })
  },
  onPhone: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },
  seemore: function () {
    wx.switchTab({
      url: '../../pages/newsList/newsList',
    })
  },
  seemorevideos: function () {
    wx.navigateTo({
      url: '../../pages/videoslist/videoslist',
    })
  },
  //打开视频按钮
  openVideos: function (event) {
    var postId = event.currentTarget.dataset.getpid
    wx.navigateTo({
      url: '../../pages/videos/videos?id=' + postId,
    })
  },
  //打开文章按钮
  openArticle: function (event) {
    var postId = event.currentTarget.dataset.getpid
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + postId,
    })
  },
  onSwiperItemTap: function (event) {
    var postId = event.currentTarget.dataset.getpostid
    wx.navigateTo({
      url: '../../pages/detail-post/detail?id=' + postId,
    })
  },
  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  companycasetap: function (event) {
    var case1 = event.currentTarget.dataset.case
    wx.navigateTo({
      url: '../../pages/case/case?case=' + case1,
    })
  },
  copyweixin: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.weixin,
      success: function (res) {
        wx.showModal({
          title: '打开微信添加好友',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
  //获取地址
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {

        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: 22.5346300000,
          longitude: 113.9451500000,
          scale: 18, //放大倍数
          name: "深圳市",
          address: "深圳市南山区高新技术产业园区R3B座518号"
        })
        // //根据获取的炜经度转换为中文地址
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (res) {

        //     var address1 = res.result.formatted_addresses.recommend;
        //     var address2 = res.result.ad_info.city;
        //     console.log(address1)
        //     console.log(address2);
        //     that.setData({
        //       ad1: address1,
        //       ad2: address2
        //     })

        //   }
        // })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '红领巾留学',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
