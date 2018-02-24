Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:{},
    user:{},
    book:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    wx.request({
      url: 'https://jihangyu.cn/book/getBookById/'+options.url,
      method:'GET',
      success:function(res){
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading'
          })
        }else{
          var result = res.data.data
          result["bImg"]=result["bImg"].replace(",", "")
          console.log(result)
          that.setData({
              book:result
          })
          wx.request({
            url: 'https://jihangyu.cn/user/getUser',
            method: 'POST',
            data: {
              openid: that.data.book.bOwnerId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code != 200) {
            
                wx.showToast({
                  title: res.data.msg,
                  icon: 'loading'
                })
              } else {
                that.setData({
                  owner: res.data.data
                })
                console.log(that.data.owner)
              }
            }

          })

          wx.request({
            url: 'https://jihangyu.cn/user/getUser',
            method: 'POST',
            data: {
              openid: that.data.book.bUserId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code != 200) {
                console.log(res.data)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'loading'
                })
              } else {
                that.setData({
                  user: res.data.data
                })
                console.log(that.data.user)
              }
            }

          })
        
        }
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