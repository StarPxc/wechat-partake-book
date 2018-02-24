
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    contact: ''
  },
  contactImput(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  contentImput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    if (this.data.content) {
      var that = this
      wx.getStorage({
        key: 'account',
        success: function (res) {
          wx.request({
            url: 'https://guohe3.com/api/feedback',
            method: 'post',
            data: {
              content: that.data.content,
              contact: that.data.contact,
              name: res.data.name,
              category: '1'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.code != 200) {
                wx.showToast({
                  title: '评论接口异常',
                  icon: 'loading'
                })
              } else {
                wx.showToast({
                  title: '评论成功'
                })
              }
            }, fail() {
              wx.showToast({
                title: '评论接口异常',
                icon: 'loading'
              })
            }
          })
        },
      })
    } else {
      wx.showToast({
        title: '数据不能为空',
        icon: 'loading'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
