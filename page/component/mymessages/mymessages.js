const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["申请", "答复"],
    currentNavtab: "0",
    inBox: [],
    outBox: [],
    senders: [],
    receivers: [],
    unreadMessage: 0,
    pass:true
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var unreadMessage = wx.getStorageSync('unreadMessage')
    if (unreadMessage) {
      this.setData({
        unreadMessage: unreadMessage
      })
    }
    var that = this
    var user_token = wx.getStorageSync("user_token")

    //获取inBox
    wx.request({
      url: 'https://jihangyu.cn/message/getMyRequest',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'user-token': user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          var mes = res.data.data
          console.log(mes)
          for (var i = 0; i < mes.length; i++) {
            mes[i].bookimg = 'http://p4a0xyee4.bkt.clouddn.com/' + mes[i].bookimg.split(",")[0]
          }
          console.log(mes)
          that.setData({
            inBox: mes,
            unreadMessage: mes.length
          })

        } else {
          console.log(res.data)
        }

      },
      fail: function (res) {
        console.log(res.data)
      }
    })
    //获取outBox
    wx.request({
      url: 'https://jihangyu.cn/message/getMyReply',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'user-token': user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          var mes = res.data.data
          var pass = true
         

          for (var i = 0; i < mes.length; i++) {
            mes[i].bookimg = 'http://p4a0xyee4.bkt.clouddn.com/' + mes[i].bookimg.split(",")[0]
            if (mes[i].message.pass == 1) {
              mes[i].pass = true
            } else {
              mes[i].pass = false
            }
          }
          that.setData({
            outBox: mes,
          })
          console.log(mes)
        } else {
          console.log(res.data)
        }
      },
      fail: function (res) {
        console.log(res.data)
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