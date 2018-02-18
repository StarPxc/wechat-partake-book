//app.js
App({
  login(that){
    var self=this
    wx.login({
      success: function (res) {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://jihangyu.cn/user/login',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code
            },
            method: "POST",
            success(res) {
              console.log(res.data)
              wx.setStorageSync("user_token", res.data.data)
              that.setData({
                user_token: res.data.data
              })
            },
            fail: function (res) {
              console.log(res);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getSystemInfo: function (cb) {
    var that = this
    if(that.globalData.systemInfo){
      typeof cb == "function" && cb(that.globalData.systemInfo)
    }else{
      wx.getSystemInfo({
        success: function(res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
  globalData:{
    userInfo: null,
    systemInfo: null
  },
  
})
