const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';

Page({
    handleGetUserInfo(e) {
        var url = e.detail.userInfo.avatarUrl
        wx.setStorage({
            key: 'url',
            data: url,
        })
        this.setData({
            url: url
        })
    },
    data: {
        url: ''
    },
    onGetOpenId() {
        wx.login({
            success: res => {
                if (res.code) {
                    wx.request({
                        url: app.globalData.URL + 'login',
                        method: "POST",
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: ({
                            code: res.code
                        }),
                        success: res => {
                            console.log("成功登陆")
                            console.log(res.data)
                            wx.setStorage({
                                key: "info",   data: res.data,
                            })
                        }
                    })
                }
            }
        })
    },
    getLoginId () {
        wx.request({
            url: app.globalData.URL + 'login',
            data: {},
            method: 'POST',
            success: function (res) {
                // success
                console.log(res.data)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    tip () {
        Dialog.alert({
            title: '声明',
            message: '食堂预约点餐主要用于线上预定饭菜和线上支付，减少食堂排队时间，和同时提供外卖服务。',
        }).then(() => {})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        var that = this;
        wx.getStorage({
            key: 'url',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    url: res.data
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
