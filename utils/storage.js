module.exports = function(e) {
    return {
        set: function(r, o, t) {
            var c = (t = t || {}).expire || 7;
            try {
                wx.setStorageSync(r, {
                    value: o,
                    version: e.VERSION,
                    expire: Date.now() + 24 * c * 3600
                });
            } catch (e) {
                console.error(e);
            }
        },
        get: function(r) {
            try {
                var o = wx.getStorageSync(r);
                if (o.version === e.VERSION && o.expire > Date.now()) return o.value;
            } catch (e) {
                console.error(e);
            }
        },
        remove: function(e) {
            try {
                wx.removeStorageSync(e);
            } catch (e) {
                console.error(e);
            }
        },
        clear: function() {
            try {
                wx.clearStorageSync();
            } catch (e) {
                console.error(e);
            }
        }
    };
};