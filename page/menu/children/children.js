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
    activityList:[],
    activityEndList:[],
    recommondList:[],
  },

  onLoad() {
    var that = this

  //获取推荐的书籍
  wx.request({
    url: 'https://jihangyu.cn/book/getBookByTag/recommend',
    success(res){
      if(res.data.code==200){
       
        var recommondList=res.data.data
        for(var i=0;i<recommondList.length;i++){
          recommondList[i].bImg='http://p4a0xyee4.bkt.clouddn.com/'+recommondList[i].bImg.split(",")[0]
        }
        console.log(recommondList)
        that.setData({
          recommondList: recommondList
        })
      }else{
        wx.showToast({
          title: res.data.msg,
        })
      }
    }
  })




    //获取已经结束的活动
   
    wx.request({
      url: 'https://jihangyu.cn/activityEnd/findAllActivityEnd',
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          var activityEndList = []
          for (var i = 0; i < res.data.data.length; i++) {
            var imgurls = res.data.data[i].endImgs.split(",");
            imgurls.pop()
            for (var j = 0; j < imgurls.length; j++) {
              imgurls[j] = 'http://p4a0xyee4.bkt.clouddn.com/' + imgurls[j]
            }
            console.log(imgurls)
            var startTime = app.formatDate(res.data.data[i].activity.aStartTime) 
            var title = res.data.data[i].activity.aTitle
            var introduction = res.data.data[i].activity.aIntroduction
            var summary = res.data.data[i].summary
            var totalPeopleNumber = res.data.data[i].totalPeopleNumber
            var address = res.data.data[i].activity.aAddress
            var sponsor = res.data.data[i].activity.aSponsor
            var endTime = app.formatDate(res.data.data[i].activity.aStartTime) 
            var activityEnd = {
               "introduction": introduction, 
               "imgUrls": imgurls,
                "title": title, 
                "startTime": startTime,
                "summary": summary,
                "totalPeopleNumber": totalPeopleNumber,
                "address":address,
                "sponsor": sponsor,
                "startTime": startTime,
                "endTime": endTime

               }
            activityEndList.push(activityEnd)

          }
      
          that.setData({
            activityEndList: activityEndList
          })


        }else{
          wx.showModal({
            title: '错误消息',
            content: res.data.msg,
          })
        }

      },
      fail() {
        console.log("获取失败")
      }
    })
    //获取所有未开始的活动
    wx.request({
      url: 'https://jihangyu.cn/activity/findActiviysByState/1',//所有未开始的活动
      success(res) {
        if (res.data.code == 200) {
          var activityList=[]
          for(var i=0;i<res.data.data.length;i++){
            var imgurls = res.data.data[i].aImgs.split(",");
            imgurls.pop()
            for (var j = 0; j < imgurls.length; j++) {
              imgurls[j] = 'http://p4a0xyee4.bkt.clouddn.com/' + imgurls[j]
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


  },




  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      //this.pullUpLoadLatest()
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
   * [最新]上拉刷新
   */
 
})
