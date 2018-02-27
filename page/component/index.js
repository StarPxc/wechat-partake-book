const app = getApp()
Page({
  data: {
    imgUrls: [],
    adimgUrls_little:[],
    adimgUrls_large: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    newest: [],
    lastedList: [],
    hidden: true,
    array: ['小说', '社会', '财经', '科学', '哲学', '幼儿', '音乐', '戏剧', '名著', '情感', '其他'],
    tempFilePaths: [],
    uoloadImg: "",
    tempFilePaths: [],
    index: 0,
    bookname: '',
    author: '',
    price: '',
    publisher: '',
    barcode: '',
    isbn: ''
  },
  booknameinput(e) {
    this.setData({
      bookname: e.detail.value
    })
  },
  authorinput(e) {
    this.setData({
      author: e.detail.value
    })
  },
  priceinput(e) {
    this.setData({
      price: e.detail.value
    })
  },
  publisherinput(e) {
    this.setData({
      publisher: e.detail.value
    })
  },
  barcodeinput(e) {
    this.setData({
      barcode: e.detail.value
    })
  },
  isbninput(e) {
    this.setData({
      isbn: e.detail.value
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // complete
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

          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        } else {

          wx.showToast({
            title: res.data.msg,
          })
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      }
    })

  },
  close() {
    this.setData({
      hidden: true
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var user_token = wx.getStorageSync("user_token")
        that.setData({
          tempFilePaths: tempFilePaths
        })

      }
    })
  },
  formSubmit: function (e) {
    var that = this
    var user_token = wx.getStorageSync("user_token")

    var booktype = this.data.array[that.data.index]
    // console.log(booktype)
    if (that.data.tempFilePaths[0]) {
      if (that.data.bookname && that.data.author && that.data.price && that.data.publisher && booktype) {
        wx.request({
          url: 'https://jihangyu.cn/book/addBook',
          header: {
            'content-type': 'application/form-data', // 默认值
            'user-token': user_token
          },
          data: {
            bName: that.data.bookname,
            bAuthor: that.data.author,
            bPrice: that.data.price,
            bPublisher: that.data.publisher,
            bType: booktype
          },
          method: "POST",
          success(res) {
            if (res.data.code == 200) {


              var bookId = res.data.data

              wx.uploadFile({
                url: 'https://jihangyu.cn/book/upload',
                filePath: that.data.tempFilePaths[0],
                name: 'file',
                formData: {
                  id: parseInt(bookId)
                },
                header: {
                  'user-token': user_token
                },
                method: "post",
                success: function (res) {
                  var data = JSON.parse(res.data)
                  if (data.code == 200) {
                    wx.showToast({
                      title: '添加成功',
                    })
                    that.setData({
                      hidden: true
                    })
                  } 
                  else if (res.data.code == 508) {
                    app.login()
                    wx.showToast({
                      title: '正在重新登录',
                      icon: "loading"
                    })
                  }
                    else {
                    wx.showToast({
                      title: res.data.msg,
                    })

                  }

                }
              })


            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }

          },
          fail: function (res) {
            console.log(res);
          }
        })
      } else {
        wx.showToast({
          title: '带*标记为必填',
        })
      }
    } else {
      wx.showToast({
        title: '请上传封面',
      })
    }

    



  },
  formReset() {
    this.setData({
      tempFilePaths: []
    })
  },
  addBook() {
    this.setData({
      hidden: false
    })

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
//获取首页轮播图
    wx.request({
      url: 'https://jihangyu.cn/img/getCaImg/index',
      method:"GET",
      success:function(res){
        var urls = res.data.data
        var imgurls=[]
        for(var i=0;i<urls.length;i++){
          imgurls[i] = "http://p4a0xyee4.bkt.clouddn.com/" + urls[i].url
        }
        that.setData({
          imgUrls: imgurls
        })
        // console.log(that.data.imgUrls)
      }
    })

//获取首页广告图(小尺寸)
    wx.request({
      url: 'https://jihangyu.cn/img/getAdImg/little',
      method:"GET",
      success:function(res){
        var urls=res.data.data
        var adimgs=[]
        for(var i=0;i<urls.length;i++){
          adimgs[i] ="http://p4a0xyee4.bkt.clouddn.com/"+urls[i].url
        }
        that.setData({
          adimgUrls_little:adimgs
        })
        // console.log(that.data.adimgUrls_little)
      }
    })

    //获取首页广告图(大尺寸)
    wx.request({
      url: 'https://jihangyu.cn/img/getAdImg/large',
      method: "GET",
      success: function (res) {
        var urls = res.data.data
        var adimgs = []
        for (var i = 0; i < urls.length; i++) {
          adimgs[i] = "http://p4a0xyee4.bkt.clouddn.com/" + urls[i].url
        }
        that.setData({
          adimgUrls_large: adimgs
        })
        // console.log(that.data.adimgUrls_large)
      }
    })

  }



})