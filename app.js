//app.js
App({
  uploadImgs(data, that) {
    var self=this
    var i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.uploadUrl,
      method: 'POST',
      filePath: data.fileUrl[i],
      name: 'file',
      formData: {
        'id': data.id
      },
      header: {
        'content-type': 'application/json', // 默认值
        'user-token': that.data.user_token
      },
      success: function (res) {
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        if (res.data.code == 200) {
          success++;//图片上传成功，图片上传成功的变量+1
          console.log("第"+i+"张图上传成功");
        } else {
          fail++;//图片上传失败，图片上传失败的变量+1
          console.log('fail: ' + i + "  failSum: " + fail);
          console.log(res.data)
        }

      },
      fail: function (res) {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete() {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.fileUrl.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log("第" + i + "张图开始上传");
          data.i = i;
          data.success = success;
          data.fail = fail;
          self.uploadImgs(data,that);
        }
      }
    })
  },
  login(that) {
    var self = this
    wx.login({
      success: function (res) {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://jihangyu.cn/user/login',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code
            },
            method: "POST",
            success(res) {
              console.log(res.data)
              wx.setStorageSync("user_token", res.data.data)
              that.setData({
                user_token: res.data.data
              })
            },
            fail: function (res) {
              console.log(res);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getSystemInfo: function (cb) {
    var that = this
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    systemInfo: null
  },

})
