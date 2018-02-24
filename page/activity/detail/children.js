var api = require('../../utils/api.js')
var app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval:5000,
    duration: 800,
    introduction:"",
    user_token:"",
    activityId:0,
    hidden: true,
    phone:"",
    systemInfo: {},
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  phoneImput(e){
   this.setData({
     phone: e.detail.value
   })
  },
  confirm: function (e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (!this.data.phone){
        wx.showToast({
          title: '手机号不能为空',
          icon:'none'
        })
    } else if (this.data.phone< 11) {  
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none'
      })
    } else if (!myreg.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    }
    else{
      var user_token = wx.getStorageSync("user_token")
      var that = this
      wx.request({
        url: 'https://jihangyu.cn/ua/join',
        header: {
          "user-token": user_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          phone: that.data.phone,
          aId: that.data.activityId
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '报名成功',
            })

          } else if (res.data.code==508){
            wx.showModal({
              title: "身份认证失败",
              content: "是否重新登录",
              success(res){
                if(res.confirm){
                  wx.clearStorageSync("user_token")
                  app.login()
                }
              }
            })
            
          } 
          else {
            wx.showModal({
              title: '错误消息',
              content: res.data.msg,
            })
          }
          that.setData({
            hidden: true
          });
        },
        fail() {
          console.log("获取失败")
        }
      })
    }
  
  },
  join(){
    this.setData({
      hidden: false
    });
  },
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
    var that = this
    wx.request({
      url: 'https://jihangyu.cn/activity/getActivity/' + options.activityId,
      success(res){
        if(res.data.code==200){
          var imgurls = res.data.data.aImgs.split(",");
          imgurls.pop()
          for(var i=0;i<imgurls.length;i++){
            imgurls[i] = 'http://p4a0xyee4.bkt.clouddn.com/' +imgurls[i]
          }
          that.setData({
            introduction: res.data.data.aIntroduction,
            imgUrls: imgurls,
            address: res.data.data.aAddress,
            sponsor: res.data.data.aSponsor,
            title: res.data.data.aTitle
          })
          console.log(that.data.imgUrls)
        }
       
      },
      fail(){
        console.log("获取失败")
      }
    })


    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    })
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
