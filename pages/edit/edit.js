// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tizhong : 73.7,
    tizhi : 18.0,
    xiongwei : 96,
    biwei : 30.6,
    yaowei : 86,
    tuiwei : 54.5,
    tunwei : 30.6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    setTimeout(() => {
      var openId = wx.getStorageSync('openId')
      wx.showLoading({
        title: '加载中',
      })
      var _this = this
      wx.request({
        url: 'https://soccerinfo.xiaosikeji.com/api/getrecentbodyinfo',
        data: {
          'Open_id': openId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.data.errcode == 0) {
            _this.setData(
              {
                tizhong: res.data.data.data.tizhong,
                tizhi: res.data.data.data.tizhi,
                xiongwei: res.data.data.data.xiongwei,
                biwei: res.data.data.data.biwei,
                yaowei: res.data.data.data.yaowei,
                tuiwei: res.data.data.data.tuiwei,
                tunwei: res.data.data.data.tunwei
              }
            )
          }
        },
        fail: function (res) {
          console.log('111')
          wx.hideLoading()
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    },400)
  
  },
  boxTizhongInput:function(e){
    this.data.tizhong = e.detail.value;
  },
  boxTizhiInput: function (e) {
    this.data.tizhi = e.detail.value;
  },
  boxXiongweiInput: function (e) {
    this.data.xiongwei = e.detail.value;
  },
  boxBiweigInput: function (e) {
    this.data.biwei = e.detail.value;
  },
  boxYaoweiInput: function (e) {
    this.data.yaowei = e.detail.value;
  },
  boxTuiweiInput: function (e) {
    this.data.tuiwei = e.detail.value;
  },
  boxTunweiInput: function (e) {
    this.tunwei = e.detail.value;
  },
  saveData:function(e){
    var openId = wx.getStorageSync('openId')
    if (!openId) {
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
              success: function (res) {
                wx.setStorageSync('openId', res.data.data.open_id)
                console.log(res.data.data.open_id)
              },
            })
          }
        }
      })
    }
    wx.showLoading({
      title: '上传云端',
    })
    var _this = this

    wx.request({
      url: 'https://soccerinfo.xiaosikeji.com/api/createbodyinfo',
      data: {
        'Open_id': openId,
        'tizhong': _this.data.tizhong,
        'tizhi': _this.data.tizhi,
        'xiongwei': _this.data.xiongwei,
        'biwei': _this.data.biwei,
        'yaowei': _this.data.yaowei,
        'tuiwei': _this.data.tuiwei,
        'tunwei': _this.data.tunwei
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.data.errcode == 0){
          wx.navigateBack()

        }
      },
      fail:function(){
        wx.hideLoading()
        wx.showModal({
          title: '网络错误',
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }



})