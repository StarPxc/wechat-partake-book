// page/component/myinfo/myinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    email:'',
    selfintroduction:'',
    info: {},
    userinfo:{},
    show:0
  },
  change(){
    var that=this
    that.setData({
      show:1
    })
  },
  submit(){
    var that = this
    console.log(that.data.userinfo)
    var user_token = wx.getStorageSync("user_token")
    wx.request({
      url: 'https://jihangyu.cn/user/updateUser',
      method:'POST',
      data:{
        uemail:that.data.email,
        uphone:that.data.phone,
        uselfIntroduction: that.data.selfintroduction,
        unickname: that.data.userinfo.nickName,
        ucity: that.data.userinfo.city,
        ugender: that.data.userinfo.gender==1?'男':'女',
        uprovince: that.data.userinfo.province

      },
      header:{
        'content-type': 'application/json',
        "user-token": user_token
      },
      success:function(res){
        if (res.data.code != 200) {
          wx.showToast({
            title: '提交失败',
            icon: 'loading'
          })
        }else{
          console.log(res.data)
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        }
      }
    })
  },
  introInput(e) {
    this.setData({
      selfintroduction: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  emailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var user_token = wx.getStorageSync("user_token")
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userinfo: res.userInfo
        })
      }
    })
    wx.request({
      url: 'https://jihangyu.cn/user/getCurrentUser',
      method:'GET',
      header:{
        'user-token':user_token
      },
      success:function(res){
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading'
          })
        }else{
          that.setData({
            info: res.data.data
          })
          // console.log(that.data.info)
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad(function () {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
