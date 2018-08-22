var t = getApp(), a = require("../../components/customPicker/index"), n = require("../../utils/extend"), i = require("../../components/index"), e = [], o = [], s = [], r = void 0, u = void 0, m = void 0, d = void 0, T = void 0;

Page(n({}, i.Toast, a, {
  data: {
    STATUS: {
      INITIALIZE: 0,
      STARTED: 1,
      PAUSED: 2
    },
    RUNTIME: {
      READY: 0,
      WORKOUT: 1,
      REST: 2
    }
  },
  onLoad: function (a) {
    wx.createInnerAudioContext && ((u = wx.createInnerAudioContext()).src = "https://soccerinfo.xiaosikeji.com/resource/sq8q351czb.mp3",
      u.loop = !0, u.obeyMuteSwitch = !1, wx.downloadFile({
      url: "https://soccerinfo.xiaosikeji.com/resource/round1.mp3",
        success: function (t) {
          200 === t.statusCode && ((m = wx.createInnerAudioContext()).obeyMuteSwitch = !1,
            m.src = t.tempFilePath);
        }
      }), wx.downloadFile({
      url: "https://soccerinfo.xiaosikeji.com/resource/stop.mp3",
        success: function (t) {
          200 === t.statusCode && ((d = wx.createInnerAudioContext()).src = t.tempFilePath,
            d.obeyMuteSwitch = !1);
        }
      }), wx.downloadFile({
      url: "https://soccerinfo.xiaosikeji.com/resource/go.mp3",
        success: function (t) {
          200 === t.statusCode && ((T = wx.createInnerAudioContext()).obeyMuteSwitch = !1,
            T.src = t.tempFilePath);
        }
      }));
    for (var n = 0; n <= 60; n++) o.push(n), n < 60 && s.push(n), n > 0 && e.push(n);
    var i = t.storage.get("timer:data");
    (r = i ? {
      readyTime: i.readyTime ? i.readyTime : "00:10",
      restTime: i.restTime ? i.restTime : "00:10",
      workoutTime: i.workoutTime ? i.workoutTime : "00:20",
      wheel: i.wheel ? i.wheel : 1,
      group: i.group ? i.group : 8,
      status: this.data.STATUS.INITIALIZE,
      runtime: this.data.RUNTIME.READY
    } : {
        readyTime: "00:10",
        restTime: "00:10",
        workoutTime: "00:20",
        wheel: 1,
        group: 8,
        status: this.data.STATUS.INITIALIZE,
        runtime: this.data.RUNTIME.READY
      }).totleTime = this.caclTotalTime(r), r.remainingTime = r.totleTime, this.setData(r);
  },
  changeWheel: function (t) {
    var a = this;
    if (this.data.status == this.data.STATUS.INITIALIZE) {
      var n = e.findIndex(function (t) {
        return t == a.data.wheel;
      });
      this.showCustomPicker({
        range: [e],
        value: [n],
        bindColumnChange: function (t) {
          var n = t.detail.value[0];
          a.setData({
            wheel: e[n]
          }), a.saveAndCacl();
        }
      });
    }
  },
  changeGroup: function (t) {
    var a = this;
    if (this.data.status == this.data.STATUS.INITIALIZE) {
      var n = e.findIndex(function (t) {
        return t == a.data.group;
      });
      this.showCustomPicker({
        range: [e],
        value: [n],
        bindColumnChange: function (t) {
          var n = t.detail.value[0];
          a.setData({
            group: e[n]
          }), a.saveAndCacl();
        }
      });
    }
  },
  changeReady: function (t) {
    var a = this;
    if (this.data.status == this.data.STATUS.INITIALIZE) {
      var n = this.data.readyTime.split(":");
      if (2 != n.length) return this.showZanToast("时间不合法，请退出重试");
      var i = o.findIndex(function (t) {
        return t == n[0];
      }), e = s.findIndex(function (t) {
        return t == n[1];
      });
      this.showCustomPicker({
        range: [o, s],
        value: [i, e],
        bindColumnChange: function (t) {
          var n = t.detail.value, i = n[0], e = n[1];
          a.setData({
            readyTime: a.formatNumToTime(o[i]) + ":" + a.formatNumToTime(s[e])
          }), a.saveAndCacl();
        }
      });
    }
  },
  formatNumToTime: function (t) {
    return t < 10 ? "0" + parseInt(t) : parseInt(t);
  },
  caclTotalTime: function (t) {
    var a = t.group * this.strMinuteTosecond(t.workoutTime) + t.group * this.strMinuteTosecond(t.restTime), n = t.wheel * a + t.wheel * this.strMinuteTosecond(t.readyTime);
    return this.secondToMinute(n);
  },
  saveAndCacl: function () {
    var a = this.caclTotalTime(this.data);
    this.setData({
      totleTime: a,
      remainingTime: a
    }), r = {
      readyTime: this.data.readyTime,
      restTime: this.data.restTime,
      workoutTime: this.data.workoutTime,
      wheel: this.data.wheel,
      group: this.data.group,
      status: this.data.STATUS.INITIALIZE,
      runtime: this.data.RUNTIME.READY,
      totleTime: this.data.totleTime,
      remainingTime: this.data.remainingTime
    }, t.storage.set("timer:data", r);
  },
  secondToMinute: function (t) {
    return this.formatNumToTime(parseInt(t / 60)) + ":" + this.formatNumToTime(parseInt(t % 60));
  },
  strMinuteTosecond: function (t) {
    var a = t.split(":");
    return 2 != a.length ? 0 : parseInt(60 * a[0]) + parseInt(a[1]);
  },
  changeRest: function (t) {
    var a = this;
    if (this.data.status == this.data.STATUS.INITIALIZE) {
      var n = this.data.restTime.split(":");
      if (2 != n.length) return this.showZanToast("时间不合法，请退出重试");
      var i = o.findIndex(function (t) {
        return t == n[0];
      }), e = s.findIndex(function (t) {
        return t == n[1];
      });
      this.showCustomPicker({
        range: [o, s],
        value: [i, e],
        bindColumnChange: function (t) {
          var n = t.detail.value, i = n[0], e = n[1];
          a.setData({
            restTime: a.formatNumToTime(o[i]) + ":" + a.formatNumToTime(s[e])
          }), a.saveAndCacl();
        }
      });
    }
  },
  changeWorkout: function (t) {
    var a = this;
    if (this.data.status == this.data.STATUS.INITIALIZE) {
      var n = this.data.workoutTime.split(":");
      if (2 != n.length) return this.showZanToast("时间不合法，请退出重试");
      var i = o.findIndex(function (t) {
        return t == n[0];
      }), e = s.findIndex(function (t) {
        return t == n[1];
      });
      this.showCustomPicker({
        range: [o, s],
        value: [i, e],
        bindColumnChange: function (t) {
          var n = t.detail.value, i = n[0], e = n[1];
          a.setData({
            workoutTime: a.formatNumToTime(o[i]) + ":" + a.formatNumToTime(s[e])
          }), a.saveAndCacl();
        }
      });
    }
  },
  start: function () {
    var t = this;
    wx.getSystemInfo({
      success: function (a) {
        if (t.data.status == t.data.STATUS.INITIALIZE) {
          u.seek = 0, u.play(), wx.setKeepScreenOn({
            keepScreenOn: !0
          }), t.panAnimation.translate(-340 * a.windowWidth / 750).step(), t.statusPanAnimation.rotate(150).step(),
            t.timePanAnimation.opacity(1).step(), t.textPanAnimation.opacity(0).step();
          var n = t.data.readyTime.split(":")[1];
          t.countdownAnimation.rotate(3 * n - 90).step(), t.setData({
            panAnimationData: t.panAnimation.export(),
            statusPanAmimationData: t.statusPanAnimation.export(),
            timePanAnimationData: t.timePanAnimation.export(),
            textPanAnimationData: t.textPanAnimation.export(),
            status: t.data.STATUS.STARTED,
            curCountdown: n,
            countdownAnimationData: t.countdownAnimation.export()
          }), t.countdown();
        } else t.stop();
      }
    });
  },
  stop: function () {
    u && u.pause(), m && m.pause(), d && d.pause(), T && T.pause(), wx.setKeepScreenOn({
      keepScreenOn: !1
    }), this.panAnimation.translate(0).step(), this.statusPanAnimation.rotate(0).step(),
      this.timePanAnimation.opacity(0).step(), this.textPanAnimation.opacity(1).step(),
      this.setData(Object.assign({}, r, {
        panAnimationData: this.panAnimation.export(),
        statusPanAmimationData: this.statusPanAnimation.export(),
        timePanAnimationData: this.timePanAnimation.export(),
        textPanAnimationData: this.textPanAnimation.export(),
        status: this.data.STATUS.INITIALIZE
      }));
  },
  countdown: function () {
    var t = this;
    this.countdownTimer && clearInterval(this.countdownTimer), this.countdownTimer = setInterval(function () {
      if (t.data.status == t.data.STATUS.STARTED) {
        if (t.data.runtime == t.data.RUNTIME.READY) {
          var a = t.secondToMinute(t.strMinuteTosecond(t.data.remainingTime) - 1), n = t.strMinuteTosecond(t.data.readyTime) - 1;
          m && 5 == n && m.play();
          var i = t.secondToMinute(n), e = n <= 0 ? t.data.workoutTime.split(":")[1] : n % 60;
          t.countdownAnimation.rotate(3 * e - 93).step(), t.setData(Object.assign({}, {
            remainingTime: a,
            readyTime: i,
            curCountdown: e,
            runtime: n <= 0 ? t.data.RUNTIME.WORKOUT : t.data.RUNTIME.READY,
            countdownAnimationData: t.countdownAnimation.export()
          }, n <= 0 ? {
            statusPanAmimationData: t.statusPanAnimation.rotate(30).step().export()
          } : {}));
        } else if (t.data.runtime == t.data.RUNTIME.WORKOUT) {
          var o = t.secondToMinute(t.strMinuteTosecond(t.data.remainingTime) - 1), s = t.strMinuteTosecond(t.data.workoutTime) - 1;
          d && 5 == s && d.play();
          var r = t.secondToMinute(s), u = s <= 0 ? t.data.restTime.split(":")[1] : s % 60;
          t.countdownAnimation.rotate(3 * u - 93).step(), t.setData(Object.assign({}, {
            remainingTime: o,
            workoutTime: r,
            curCountdown: u,
            runtime: s <= 0 ? t.data.RUNTIME.REST : t.data.RUNTIME.WORKOUT,
            countdownAnimationData: t.countdownAnimation.export()
          }, s <= 0 ? {
            statusPanAmimationData: t.statusPanAnimation.rotate(-90).step().export()
          } : {}));
        } else if (t.data.runtime == t.data.RUNTIME.REST) {
          var c = t.secondToMinute(t.strMinuteTosecond(t.data.remainingTime) - 1), h = t.strMinuteTosecond(t.data.restTime) - 1;
          T && 3 == h && T.play();
          var p = t.secondToMinute(h);
          if (h <= 0) return t.countdownGroup();
          var A = h % 60;
          t.countdownAnimation.rotate(3 * A - 93).step(), t.setData(Object.assign({}, {
            remainingTime: c,
            restTime: p,
            curCountdown: A,
            countdownAnimationData: t.countdownAnimation.export()
          }, h <= 0 ? {
            statusPanAmimationData: t.statusPanAnimation.rotate(30).step().export()
          } : {}));
        }
      } else clearInterval(t.countdownTimer);
    }, 1e3);
  },
  countdownGroup: function () {
    var t = this.data.group - 1;
    if (t <= 0) return this.countdownWheel();
    var a = Object.assign({}, r, {
      status: this.data.STATUS.STARTED,
      wheel: this.data.wheel,
      group: t,
      runtime: this.data.RUNTIME.WORKOUT,
      statusPanAmimationData: this.statusPanAnimation.rotate(30).step().export()
    });
    a.remainingTime = this.secondToMinute(this.strMinuteTosecond(this.data.remainingTime) - 1),
      a.curCountdown = a.workoutTime.split(":")[1], this.countdownAnimation.rotate(3 * a.curCountdown - 93).step(),
      a.countdownAnimationData = this.countdownAnimation.export(), this.setData(a);
  },
  countdownWheel: function () {
    var t = this.data.wheel - 1;
    if (t <= 0) return this.stop();
    var a = Object.assign({}, r, {
      status: this.data.STATUS.STARTED,
      wheel: t,
      runtime: this.data.RUNTIME.READY,
      statusPanAmimationData: this.statusPanAnimation.rotate(150).step().export()
    });
    a.remainingTime = this.secondToMinute(this.strMinuteTosecond(this.data.remainingTime) - 1),
      a.curCountdown = a.readyTime.split(":")[1], this.countdownAnimation.rotate(3 * a.curCountdown - 93).step(),
      a.countdownAnimationData = this.countdownAnimation.export(), this.setData(a);
  },
  pause: function () {
    this.data.status == this.data.STATUS.PAUSED ? (this.setData({
      status: this.data.STATUS.STARTED
    }), u && u.play(), this.countdown()) : (u && u.pause(), m && m.pause(), d && d.pause(),
      T && T.pause(), this.setData({
        status: this.data.STATUS.PAUSED
      }));
  },
  onReady: function () { },
  onShow: function () {
    this.panAnimation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease"
    }), this.statusPanAnimation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease"
    }), this.timePanAnimation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease"
    }), this.textPanAnimation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease"
    }), this.countdownAnimation = wx.createAnimation({
      duration: 1e3,
      timingFunction: "linear"
    });
  },
  onHide: function () { },
  onUnload: function () {
    clearInterval(this.countdownTimer), this.stop();
  },
  onShareAppMessage: function () {
    return {
      title: "分享一个训练计时器给你，很好玩"
    };
  }
}));