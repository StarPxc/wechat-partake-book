
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
      { title: 'Road', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_1.jpg' },
      { title: 'Night', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_2.jpg' },
      { title: 'Water', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_3.jpg' },
      { title: 'Mountain', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_4.jpg' },
      { title: 'Thunder', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_5.jpg' },
      { title: 'Black', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_6.jpg' },
      { title: 'Desert', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_7.jpg' },
      { title: 'Green', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_8.jpg' },
      { title: 'Life', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_9.jpg' },
      { title: 'England', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_10.jpg' },
      { title: 'Grassland', imgUrl:  'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_11.jpg' },
      { title: 'City', imgUrl: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_12.jpg' }
    ],
    skin: 'http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_4.jpg'
  },
  onLoad(){
    wx.hideNavigationBarLoading() 
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
              skin: "http://p4a0xyee4.bkt.clouddn.com/userbg/user_bg_4.jpg"
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
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
 
})