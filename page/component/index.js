Page({
  data: {
    imgUrls: [
      '/image/books/book1.png',
      '/image/books/book2.png',
      '/image/books/book3.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    newest: [],
    lastedList: [],
  },
  onLoad() {
    var that = this

    //获取最新的书籍
    wx.request({
      url: 'https://jihangyu.cn/book/getBookByTag/lasted',
      success(res) {
        if (res.data.code == 200) {

          var lastedList = res.data.data
          for (var i = 0; i < lastedList.length; i++) {
            lastedList[i].bImg = 'http://p4a0xyee4.bkt.clouddn.com/' + lastedList[i].bImg.split(",")[0]
          }
          console.log(lastedList)
          that.setData({
            lastedList: lastedList
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })

  }



})