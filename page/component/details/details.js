// page/component/details/details.js
Page({
  data:{
    book:{},
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    hidden: true,
    letter:""
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },
  letterInput(e){
    this.setData({
      letter: e.detail.value
    })
  },
  appoint(){
    this.setData({
      hidden: false
    });
   
  },
  cancel(){
    this.setData({
      hidden: true
    });
  },
  confirm(){
    var bId = this.data.book.bId
    var toUid = this.data.book.bOwnerId
    var letter = this.data.letter
    var user_token = wx.getStorageSync("user_token")
    var that = this
    console.log(letter)
    wx.request({
      url: 'https://jihangyu.cn/message/sendMyRequest',
      method: 'post',
      data: {
        bid: bId,
        fromUid: "test",
        toUid: toUid,
        letter: letter,
        pass: "0"
      },
      header: {
        'content-type': 'application/json',
        'user-token': user_token
      },
      success: function (res) {
        if(res.data.code==200){
          wx.showToast({
            title: '留言成功',
          })
          that.setData({
            hidden: true
          });
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      }
    })
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  onLoad: function (options) {
    var that = this
    var bId = options.bId
    wx.request({
      url: 'https://jihangyu.cn/book/getBookById/' + bId,
      method: "get",
      success(res) {
        if (res.data.code == 200) {
          var book=res.data.data
          var imgurls = book.bImg.split(",");
          imgurls.pop()
          for (var i = 0; i < imgurls.length; i++) {
            imgurls[i] = 'http://p4a0xyee4.bkt.clouddn.com/' + imgurls[i]
          }
          book.bImg = imgurls
          if (book.bStatus=="0"){
            book.bStatus="可借"
          } else if (book.bStatus == "1"){
            book.bStatus = "已预约"
          } else if (book.bStatus == "2") {
            book.bStatus = "已借出"
          }
          console.log(book)
          that.setData({
            book: book
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


})