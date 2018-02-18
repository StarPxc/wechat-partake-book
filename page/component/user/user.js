
const app = getApp()
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    user_token:"",
  },
  onLoad(){
    var that=this
    var user_token = wx.getStorageSync("user_token")
    if(user_token){
      console.log("用户已登录")
      that.setData({
        user_token: user_token
      })
    }else{
      console.log("正在登陆")
      app.login(that)
    }
   



    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
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
          address: res.data
        })
      }
    })
  },
  test(){
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/user/updateUser',
      method: 'POST',
      data: {
        appointmentBId: "0",
        ucity: "string",
        uemail: "11",
        ugender: "1",
        unickname: "121",
        uphone: "213",
        uprovince: "sadfsa",
        urole: "user",
        uselfIntroduction:"asds"
      },
      header: {
        'content-type': 'application/json',
        'user-token': this.data.user_token
      },
      success: function (res) {
       if(res.data.code==508){
        //登陆状态过期
         app.login(that)
         wx.showModal({
           title: '身份认证过期',
           content: '是否重试',
           success: function (res) {
             if (res.confirm) {
               that.test()
             } else if (res.cancel) {
               console.log('用户点击取消')
             }
           }
         })
       }else{
         console.log(res.data.data)
       }
      }
    })
  },
  addBook:function(event){
    var that=this;
    wx.request({
      url: 'https://jihangyu.cn/book/addBook',
      method:'POST',
      data:{
        bname: "豆腐干反对",
        bauthor: "jhy",
        bpublisher: "11",
        bprice: "20",
        bisbn: "121",
        barcode: "213",
        bownerid: "",
        buserid: "666666",
        bstatus: "1",
        btype: "1"
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
        bid:"9",
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
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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
      url: 'https://jihangyu.cn/book/getBookById/19',
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
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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
      url: 'https://jihangyu.cn/book/deleteBookById/19',
      method: 'GET',
      header: {
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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

  findAllUsedBookByUid: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/findAllUsedBookByUid/oOor05dnQyVDzvRSIKsT-EzRTYgQ',
      method: 'GET',
      header: {
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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

  findAllHadBookByUid: function (event) {
    wx.request({
      url: 'https://jihangyu.cn/ub/findAllHadBookByUid/oOor05dnQyVDzvRSIKsT-EzRTYgQ',
      method: 'GET',
      header: {
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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
        'user-token': 'cba52e94877838bccd29cb47f160a299'
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

  BookUpload: function (event) {
   wx.chooseImage({
     count:1,
     success: function(res) {
       var tempFilePaths = res.tempFilePaths
       console.log(tempFilePaths)
       
       wx.uploadFile({
         url: 'https://jihangyu.cn/book/upload',
         method: 'POST',
         filePath: tempFilePaths[0],
         name: 'files',
         formData: {
           'id': 8
         },
         header: {
           'content-type': 'multipart/form-data',// 默认值
           'user-token': 'cba52e94877838bccd29cb47f160a299'
         },
         success: function (res) {
            console.log("接口调用上传成功。")
            console.log(res.data)
         },
         fail: function (res){
           console.log("接口调用上传失败。")
           console.log(res.data)
         }
       })
     },
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