const app = getApp()

Page({
    data: {
        show: false,
        phone:"",
        userId:""
    },
    input: function (e) {
        var phone = e.detail
        this.setData({
            phone: e.detail
        })
    },

    clickBtn: function () {
        wx.setStorage({
            key: "phone", data: this.data.phone,
        })
        wx.request({
            method:"post",
            url: app.globalData.URL + 'contact',
            data: ({
                phone: this.data.phone,
                userId: this.data.userId
            }),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                wx.showToast({
                    title: '提交成功',
                    image: "/assest/su.png",
                    duration: 700,
                    mask: true
                })
            },
            fail(res) {
                wx.showToast({
                    title: '提交失败',
                    image: "/assest/fail.png",
                    duration: 700,
                    mask: true
                })
            },
        })
        this.setData({ show: false });
    },

    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        // this.setData({ show: false });
        // wx.showToast({
        //   title: '提交成功',
        //   image: "/assest/su.png",
        //   duration: 700,
        //   mask: true
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        var that = this;
        wx.getStorage({
            // key: 'info',
            key:'phone',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    phone:res.data
                })
            },
        })
        wx.getStorage({
            key: 'info',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    userId: res.data.userId,
                })
            },
        })
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
