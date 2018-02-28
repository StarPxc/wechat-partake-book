const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我的", "正在阅读"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowed: false,
    inputVal: "",
    ownlist:[],//拥有的书列表
    uselist:[],//借阅的书列表
    isLoad: true
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_token = wx.getStorageSync("user_token")
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/ub/findAllHadBookByUid/123',
      method:"GET",
      header:{
        'user-token': user_token
      },
      success:function(res){
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.data,
            icon: 'loading'
          })
        }else{
          var result=res.data.data
      
          that.setData({
            ownlist:result
          })
          console.log(that.data.ownlist)
        }
      }
    })

    wx.request({
      url: 'https://jihangyu.cn/ub/findAllUsedBookByUid/123',
      method: "GET",
      header: {
        'user-token': user_token
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.data,
            icon: 'loading'
          })
        } else {
          var result = res.data.data
          
          that.setData({
            uselist: result
          })
          console.log(that.data.uselist)
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