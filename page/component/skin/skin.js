
Page({
  data: {
    skinList: [
      { title: 'Road', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_1.jpg' },
      { title: 'Night', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_2.jpg' },
      { title: 'Water', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_3.jpg' },
      { title: 'Mountain', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_4.jpg' },
      { title: 'Thunder', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_5.jpg' },
      { title: 'Black', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_6.jpg' },
      { title: 'Desert', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_7.jpg' },
      { title: 'Green', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_8.jpg' },
      { title: 'Life', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_9.jpg' },
      { title: 'England', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_10.jpg' },
      { title: 'Grassland', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_11.jpg' },
      { title: 'City', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_12.jpg' }
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
            nowSkin: "http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_4.jpg"
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