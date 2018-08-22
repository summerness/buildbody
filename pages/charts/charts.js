import * as echarts from '../../ec-canvas/echarts';
var tizhong_charts, tizhi_charts, xiongwei_charts, biwei_charts, yaowei_charts, tuiwei_charts, tunwei_charts

Page({
  data: {
    tizhong: {
        onInit: function(canvas, width, height) {
          tizhong_charts = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(tizhong_charts);
          return tizhong_charts;
        }
    },
    tizhi: {
      onInit: function (canvas, width, height) {
        tizhi_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(tizhi_charts);
        return tizhi_charts;
      }
    },

    xiongwei: {
      onInit: function (canvas, width, height) {
        xiongwei_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(xiongwei_charts);
        return xiongwei_charts;
      }
    },

    biwei: {
      onInit: function (canvas, width, height) {
        biwei_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(biwei_charts);
        return biwei_charts;
      }
    },

    tuiwei: {
      onInit: function (canvas, width, height) {
        tuiwei_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(tuiwei_charts);
        return tuiwei_charts;
      }
    },

    tunwei: {
      onInit: function (canvas, width, height) {
        tunwei_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(tunwei_charts);
        return tunwei_charts;
      }
    },

    yaowei: {
      onInit: function (canvas, width, height) {
        yaowei_charts = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(yaowei_charts);
        return yaowei_charts;
      }
    },


  },

  onReady() {
    
  },
  JumpToEdit:function(){
    console.log(123)
    wx.navigateTo({
      url: '../edit/edit'
    })
  },
  onShow: function () {
    setTimeout(() => {
      var openId = wx.getStorageSync('openId')
      wx.showLoading({
        title: '加载中',
      })
      var _this = this
      wx.request({
        url: 'https://soccerinfo.xiaosikeji.com/api/getbodyinfo',
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
            tizhong_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.tizhongs, '体重(kg)', '#e28986'))
            tizhi_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.tizhis, '体脂(%)', '#1E90FF'))
            xiongwei_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.xiongweis, '胸围(cm)', '#e28986'))
            biwei_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.biweis, '臂围(cm)', '#800080'))
            yaowei_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.yaoweis, '腰围(cm)', '#00CED1'))
            tuiwei_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.tuiweis, '腿围(cm)', '#e28986'))
            tunwei_charts.setOption(_this.setChart(res.data.data.create_times, res.data.data.tunweis, '臀围(cm)', '#1E90FF'))
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
  setChart: function(x_data, y_data, title_text,corlor){
    var option = {
      title: {
        text: title_text,
        left: 'left',
        textStyle: {
          color: corlor,
          fontSize: 12
        }
      },
      color: [corlor],

      grid: {
        containLabel: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: x_data,
        axisLine: {
          lineStyle: {
            color: "#C0C0C0"
          }
        }
      },
      yAxis: {

        show: false,
        
      },
      series: [{
        name: title_text,
        type: 'line',
        smooth: true,
        data: y_data,
        clickable: false,
        itemStyle: {
          normal: { label: { show: true } }
          }
      }
      ]
    };
    return option
  }
});
