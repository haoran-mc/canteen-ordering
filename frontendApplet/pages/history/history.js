// pages/history/history.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userId: "",
        orderList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        wx.getStorage({
            key: 'info',
            success: function (res) {
                that.setData({
                    userId: res.data.userId
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const that = this
        wx.request({
            method: "get",
            url: app.globalData.URL + 'historyOrders',
            data: ({
                userId: this.data.userId,
            }),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res.data)
                that.setData({ orderList: res.data });
            },
        })
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
