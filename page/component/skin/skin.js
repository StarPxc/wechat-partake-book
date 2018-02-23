
Page({
  data: {
    skinList:  [
    { title: '公路', imgUrl: '/image/userbg/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: '/image/userbg/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: '/image/userbg/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: '/image/userbg/user_bg_4.jpg' },
    { title: '火山', imgUrl: '/image/userbg/user_bg_5.jpg' },
    { title: '科技', imgUrl: '/image/userbg/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: '/image/userbg/user_bg_7.jpg' },
    { title: '叶子', imgUrl: '/image/userbg/user_bg_8.jpg' },
    { title: '早餐', imgUrl: '/image/userbg/user_bg_9.jpg' },
    { title: '英伦骑车', imgUrl: '/image/userbg/user_bg_10.jpg' },
    { title: '草原', imgUrl: '/image/userbg/user_bg_11.jpg' },
    { title: '城市', imgUrl: '/image/userbg/user_bg_12.jpg' }
    ],
    nowSkin: ''
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        if (res.data == "") {
          that.setData({
            nowSkin: "/image/userbg/user_bg_4.jpg"
          })
        } else {
          that.setData({
            nowSkin: res.data
          })
        }
      }
    })
  },
  chooseSkin: function (e) {
    var url = e.currentTarget.dataset.url
    wx.setStorage({
      key: 'skin',
      data: url,
      success: function (res) {
        wx.navigateBack({
          delta: 1,
          success: function (res) {
            console.log('success')
          }
        })
      }
    })
  }
})