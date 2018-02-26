Page({
    data: {
      showNull:false,
        category: [],
        detail:[],
        curIndex: 0,
        isScroll: true,
        toView: 'guowei',
        showData:[]
    },
    onLoad(){
      var nameList = ['小说', '社会', '财经', '科学', '哲学', '幼儿', '音乐', '戏剧', '名著', '情感','其他']
      var pinYingList=['xiaoshuo','shehui','caijing','kexue','zhexue','youer','yinyue','xiju','mingzhu','qinggan','qita']
      var category=[]
      for(var i=0;i<nameList.length;i++){
        var data={}
          data.name=nameList[i]
          data.id=pinYingList[i]
          category.push(data)
      }
      this.setData({
        category: category
      })
      
      var that=this
      wx.request({
        url: 'https://jihangyu.cn/book/getBookByType/' + category[0].name,
        success(res) {
          if (res.data.code == 200) {
            var showData = res.data.data
            for (var i = 0; i < showData.length; i++) {
              showData[i].bImg = 'http://p4a0xyee4.bkt.clouddn.com/' + showData[i].bImg.split(",")[0]
            }
            if(showData.length==0){
              that.setData({
                showNull: true
              })
            }else{
              that.setData({
                showNull: false
              })
            }
            
            that.setData({
              showData: showData
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      })
        
    },
    switchTab(e){
     
      const self = this;
     
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      var curIndex = e.target.dataset.index
      wx.request({
        url: 'https://jihangyu.cn/book/getBookByType/' + self.data.category[curIndex].name,
        success(res) {
          if (res.data.code == 200) {
            var showData = res.data.data
            for (var i = 0; i < showData.length; i++) {
              showData[i].bImg = 'http://p4a0xyee4.bkt.clouddn.com/' + showData[i].bImg.split(",")[0]
            }
            console.log(showData)
            if (showData.length == 0) {
              self.setData({
                showNull: true
              })
            }else{
              self.setData({
                showNull: false
              })
            }
            self.setData({
              showData: showData
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      })
        
    }
    
})