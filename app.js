//app.js

var i = require("./utils/storage");
App({
  onLaunch: function() {
    this.storage = i(this);
    wx.checkSession({
      success: function(res) {
        console.log(res)

      },
      fail: function(res) {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'https://soccerinfo.xiaosikeji.com/api/get_openid',
                data: {
                  'js_code': res.code,
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                success: function(res) {
                  wx.setStorageSync('openId', res.data.data.open_id)
                  console.log(res.data.data.open_id)
                },
              })
            }
          }
        })
      },
    });
  },
  globalData: {
    userInfo: null
  }
})