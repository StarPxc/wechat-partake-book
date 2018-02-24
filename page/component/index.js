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
    newest:[],
  },
  onLoad(){
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/book/getBookByType/小说',
      method: 'GET',
      success:function(res){
        if (res.data.code == 200) {
          //单张图片的话，直接替换掉字符串中的,
          var after_filt_data=res.data.data
         
          for (var i = 0; i < res.data.data.length;i++){
            after_filt_data[i]["bImg"]=after_filt_data[i]["bImg"].replace(",","")
           
          }
          that.setData({
            newest: after_filt_data
          })
          console.log(that.data.newest)
        } else {
          console.log("failure")
        }
      }
    })
  }


  
})