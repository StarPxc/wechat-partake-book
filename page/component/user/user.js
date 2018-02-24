
const app = getApp()
Page({
  data:{
    orders:[],
    hasAddress:false,
    address:{},
    user_token:"",
    userInfo:[],
    gridList: [
      { enName: 'myinfo', zhName: '个人信息' },
      { enName: 'mybooks', zhName: '我的书库' },
      { enName: 'mymessages', zhName: '共享消息' },
      { enName: 'set', zhName: '设置' },
      { enName: 'about', zhName: '关于' },
      { enName: 'feedback', zhName: '反馈' }
    ],
    skinList: [
      { title: 'Road', imgUrl: '/image/userbg/user_bg_1.jpg' },
      { title: 'Night', imgUrl:  '/image/userbg/user_bg_2.jpg' },
      { title: 'Water', imgUrl:  '/image/userbg/user_bg_3.jpg' },
      { title: 'Mountain', imgUrl: '/image/userbg/user_bg_4.jpg' },
      { title: 'Thunder', imgUrl: '/image/userbg/user_bg_5.jpg' },
      { title: 'Black', imgUrl:  '/image/userbg/user_bg_6.jpg' },
      { title: 'Desert', imgUrl:  '/image/userbg/user_bg_7.jpg' },
      { title: 'Green', imgUrl:  '/image/userbg/user_bg_8.jpg' },
      { title: 'Life', imgUrl:  '/image/userbg/user_bg_9.jpg' },
      { title: 'England', imgUrl: '/image/userbg/user_bg_10.jpg' },
      { title: 'Grassland', imgUrl:  '/image/userbg/user_bg_11.jpg' },
      { title: 'City', imgUrl:  '/image/userbg/user_bg_12.jpg' }
    ],
    skin: ''
  },
  onLoad(){

    var that=this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo:res.userInfo
        })
      }
    })

    var user_token = wx.getStorageSync("user_token")
   
  
  },
  onShow(){ 

    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data,
        })
      }
    }),
      wx.getStorage({
        key: 'skin',
        success: function (res) {
          if (res.data == "") {
            self.setData({
              skin: "/image/userbg/user_bg_4.jpg"
            })
          } else {
            self.setData({
              skin: res.data
            })
          }
        }
      })
  },
  viewSkin: function () {
    wx.navigateTo({
      url: "../skin/skin"
    })
  },
  onPullDownRefresh: function () {
    this.onLoad(function () {
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../" + data.url + '/' + data.url
    })
  },
  test(){
    var user_token = wx.getStorageSync("user_token")
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/message/getMyReply/oOor05XvJvLYuqPtre_pDvjotfs4',
      method: 'get',
      // data: {
      //   fromUid:"oOor05XvJvLYuqPtre_pDvjotfs4",
      //   toUid:"oOor05dnQyVDzvRSIKsT-EzRTYgQ",
       
      //   bid:26,
      //   letter:'test',
      //   pass:'0'

      // },
      header: {
        'content-type': 'application/json',
        'user-token': user_token
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  addBook:function(event){
    var that=this;
    wx.request({
      url: 'https://jihangyu.cn/book/addBook',
      method:'POST',
      data:{
        bname: "三味书屋",
        bauthor: "甲乙丙",
        bpublisher: "图书出版社",
        bprice: "20",
        bisbn: "12352225874521",
        barcode: "12561563123152323",
        bownerid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        buserid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        bstatus: "0",
        btype: "小说"
      },
      header: {
        'content-type': 'application/json' ,
        'user-token':this.data.user_token
      },
      success:function(res){
        if(res.data.code==200){
          console.log(res.data)
        }else{
          console.log(res.data)
        }
      }
    })
  },

  updateBook: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/book/updateBook',
      method: 'POST',
      data: {
        bid:"37",
        bname: "是刚刚",
        bauthor: "jhy",
        bpublisher: "11",
        bprice: "20",
        bisbn: "121",
        barcode: "213",
        bownerid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        buserid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        bstatus: "1",
        btype: "1"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log("failure")
        }
      }
    })
  },

  getBookById: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/book/getBookById/26',
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log("failure")
        }
      }
    })
  },

  getBookByType: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/book/getBookByType/1',
      method: 'GET',
      header: {
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log("failure")
        }
      }
    })
  },

  getBookByName: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/book/getBookByName/是刚刚',
      method: 'GET',
      header: {
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log("failure")
        }
      }
    })
  },
  
  deleteBookById: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/book/deleteBookById/37',
      method: 'GET',
      header: {
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  findAllUsedBookByUid: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/findAllUsedBookByUid/asdasd',
      method: 'GET',
      header: {
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  findAllHadBookByUid: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/findAllHadBookByUid/oOor05dnQyVDzvRSIKsT-EzRTYgQ',
      method: 'GET',
      header: {
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log("failure")
        }
      }
    })
  },

  orderBook: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/orderBook',
      method: 'POST',
      data: {
        uid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        bid: "8"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  returnBook: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/returnBook',
      method: 'POST',
      data: {
        uid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        bid: "8"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  BookUpload: function (event) {
    var that=this
   wx.chooseImage({
     count:6,
     success: function(res) {
       var tempFilePaths = res.tempFilePaths

       app.uploadImgs({ uploadUrl: "https://jihangyu.cn/book/upload", fileUrl:tempFilePaths,"id":'38'},that)

     },
   })
  },

  uploadCaImg: function(event){
    var that=this
    wx.chooseImage({
      count:1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        app.uploadCaImgs({ uploadUrl: "https://jihangyu.cn/img/uploadCaImg", fileUrl: tempFilePaths,"type":"index","text":"firstcommit"},that)
      },
    })
  },

  uploadAdImg: function (event) {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        app.uploadAdImgs({ uploadUrl: "https://jihangyu.cn/img/uploadAdImg", fileUrl: tempFilePaths, "size": "little", "text": "firstcommit" }, that)
      },
    })
  },

  getCaImg: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/img/getCaImg/index',
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log("failure")
        }
      }
    })
  },
  getAdImg: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/img/getAdImg/little',
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log("failure")
        }
      }
    })
  },

  sendMyRequest: function (event) {
    var that = this;
    wx.request({
      url: 'https://jihangyu.cn/message/sendMyRequest',
      method: 'POST',
      data: {
        fromuid:"oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        touid:"oOor05XvJvLYuqPtre_pDvjotfs4",
        bid:"29",
        letter:"hello",
        pass:"0"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  getMyRequest: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/message/getMyRequest/oOor05dnQyVDzvRSIKsT-EzRTYgQ',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      },
      fail: function(res){
        console.log(res)
      }
    })
  },

  sendMyReply: function (event) {
    var that = this;
    wx.request({
      url: 'https://jihangyu.cn/message/sendMyReply',
      method: 'POST',
      data: {
        id:6,
        fromuid: "oOor05XvJvLYuqPtre_pDvjotfs4",
        touid: "oOor05dnQyVDzvRSIKsT-EzRTYgQ",
        bid: 26,
        letter: "test",
        pass: "2"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      }
    })
  },

  getMyReply: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/message/getMyReply/oOor05dnQyVDzvRSIKsT-EzRTYgQ',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },



  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})