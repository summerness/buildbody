module.exports = {
    showCustomPicker: function(e) {
        this.setData({
            customPicker: {
                show: !0,
                range: e.range,
                value: e.value,
                bindColumnChange: e.bindColumnChange
            }
        });
    },
    hideCustomPicker: function() {
        this.setData({
            customPicker: {
                show: !1,
                range: [],
                value: 0,
                bindColumnChange: void 0
            }
        });
    },
    customPickerValueChange: function(e) {
        this.data.customPicker.bindColumnChange && this.data.customPicker.bindColumnChange(e);
    }
};