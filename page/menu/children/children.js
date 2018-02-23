var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['推荐', '展示', '共享'],
    currentNavbar: '0',
    swipers: [],
    list: [],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0,
    activityList:[]
  },

  onLoad() {
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/activity/findActiviysByState/1',//所有未开始的活动
      success(res) {
        if (res.data.code == 200) {
          var activityList=[]
          for(var i=0;i<res.data.data.length;i++){
            var imgurls = res.data.data[i].aImgs.split(",");
            imgurls.pop()
            for (var j = 0; j < imgurls.length; j++) {
              imgurls[j] = 'https://p4a0xyee4.bkt.clouddn.com/' + imgurls[j]
            }
     
            var startTime = app.formatDate(res.data.data[i].aStartTime)+'时正式开始'
            var aId = res.data.data[i].aId
            var activity = { "introduction": res.data.data[i].aIntroduction, "imgUrls": imgurls, "title": res.data.data[i].aTitle, "startTime": startTime,"aId":aId}
             activityList.push(activity)
      
          }
           that.setData({
             activityList: activityList
           })
         
     
        }

      },
      fail() {
        console.log("获取失败")
      }
    })
    
    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    })

    that.setData({
      _api: api
    })

    this.getSwipers()
    this.pullUpLoad()
  },

  /**
   *
   */
  getSwipers() {
    api.get(api.SWIPERS)
      .then(res => {
        this.setData({
          swipers: res.data.ads
        })
      })
  },

  /**
   * 点击跳转详情页
   */
  onItemClick(e) {
    var targetUrl = api.ACTI_DETAIL
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl +'children'+ '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      this.pullUpLoadLatest()
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    switch (this.data.currentNavbar) {
      case '0':
        this.setData({
          list: [],
          hot_last_id: 0
        })
        this.pullUpLoad()
        break
      case '1':
        this.setData({
          latest_list: [],
          latest_list_id: 0
        })
        this.pullUpLoadLatest()
        break
      case '2':
        wx.stopPullDownRefresh()
        break
    }
  },

  /**
   * [推荐]上拉刷新
   */
  pullUpLoad() {
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id)
      .then(res => {
        this.setData({
          list: this.data.list.concat(res.data.list),
          hot_last_id: res.data.last_id
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },

  /**
   * [最新]上拉刷新
   */
  pullUpLoadLatest() {
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
      .then(res => {
        this.setData({
          latest_list: this.data.latest_list.concat(res.data.list),
          latest_last_id: res.data.last_id
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  }
})
