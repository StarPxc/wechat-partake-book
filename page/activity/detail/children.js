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
    phone:""
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

    var user_token = wx.getStorageSync("user_token")
    var that = this
    wx.request({
      url: 'https://jihangyu.cn/ua/join',
      header: {
        "user-token": user_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:"post",
      data:{
        phone:that.data.phone,
        aId:that.data.activityId
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '报名成功',
          })

        } else {
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
            imgurls[i] = 'https://p4a0xyee4.bkt.clouddn.com/' +imgurls[i]
          }
          that.setData({
            introduction: res.data.data.aIntroduction,
            imgUrls: imgurls
          })
          console.log(that.data.imgUrls)
        }
       
      },
      fail(){
        console.log("获取失败")
      }
    })
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
