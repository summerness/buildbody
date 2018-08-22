module.exports = {
    showZanToast: function(t, a) {
        var o = this;
        this.clearZanToast();
        var s = setTimeout(function() {
            o.clearZanToast();
        }, a || 1500);
        "string" != typeof t && (console.error(t), t = "Network Error");
        var r = {
            show: !0,
            timer: s,
            title: t
        };
        this.setData({
            toast: r
        });
    },
    clearZanToast: function() {
        this.setData({
            "toast.show": !1
        });
        var t = this.data.toast || {};
        clearTimeout(t.timer);
    }
};