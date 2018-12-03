// pages/test/test.js
//知晓云的模板消息
let app = getApp()
let BaaS = wx.BaaS
let productTableID = 28175
let Product = new BaaS.TableObject(productTableID)

Page({

  data: {
    flag: true,//判断是否输入完整
    warn: "",//弹窗提示内容
    reset: "",
    date: ""
  },

  onLoad: function (options) {

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    //知晓云的模板消息代码
    BaaS.wxReportTicket(e.detail.formId)
    let product = Product.create()
    product.set('name', '留学通知')
    product.save().then((res) => {
      console.log(e.detail.formId)
      console.log(res.statusCode)
      console.log('statudCode', res.statusCode)
      if (res.statusCode == 201) {
        console.log('success')
      }
      else {
        console.log('fail')
      }
    })

    console.log(e)
    var that = this;
    var formData = e.detail.value;
    var name = formData.name
    console.log(name)
    var phone = formData.phone

    var flag = that.data.flag
    console.log(formData)
    var warn = that.data.warn
    if (formData.name == "") {
      warn = "请填写您的姓名";
    }
    else if (formData.phone == "") {
      warn = "请填写您的手机号！";
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(formData.phone))) {
      warn = "手机号格式不正确";
    }
    else if (formData.wechat == "") {
      warn = "请填写您的微信/QQ！";
    }
    else if (formData.abroadmajor == "") {
      warn = "请填写您的意向专业";
    }
    else if (formData.finishschool == "") {
      warn = "请填写您的在读(毕业)院校";
    }
    else {
      flag = false;
      wx.showToast({
        title: '提交成功',
        duration: 300,
        icon: "success"
      })
      that.setData({
        reset: "",
        date: ""
      })
      wx.request({
        url: 'https://www.anifun.club/admin/index/addInfo',
        method: "GET",
        data: {
          name: name,
          phone: phone,
          abroadmajor: formData.abroadmajor,
          shuoming: formData.shuoming,
          wechat: formData.wechat,
          finishtime: formData.finishtime,
          finishschool: formData.finishschool
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

        }
      })
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
      })
    }
  }
})