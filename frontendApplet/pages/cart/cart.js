import Toast from '@vant/weapp/toast/toast'

Page({
    data: {
        totalPrice: 0,
        items:[]
    },

    plus(e) {
        var items = this.data.items                // 获取购物车列表
        var index = e.currentTarget.dataset.index  // 获取当前点击事件的下标索引
        var number = items[index].number           // 获取购物车里面的value值
        number++
        items[index].number = number
        this.setData({
            items: items
        })
        this.getTotalPrice()
    },

    minus(e) {
        var items = this.data.items
        var index = e.currentTarget.dataset.index
        var number = items[index].number
        number--
        items[index].number = number
        this.setData({
            items: items
        })
        this.getTotalPrice()
    },

    // 获取总价
    getTotalPrice() {
        let items = this.data.items                    // 获取购物车列表
        let total = 0
        for (let i = 0; i < items.length; i++) {       // 循环列表得到每个数据
            total += items[i].number * items[i].price  // 所有价格加起来
        }
        this.setData({
            items: items,
            totalPrice: total
        })
    },

    // 删除
    deleteList(e) {
        const index = e.currentTarget.dataset.index
        let items = this.data.items
        items.splice(index, 1)              // 删除购物车列表里这个商品
        this.setData({
            items: items
        })
        this.getTotalPrice()
        Toast({
            message: '已删除'
        })
    },

    // 付款
    onSubmit() {
        wx.navigateTo({
            url: '/pages/receiptMyOrder/receiptMyOrder'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(items)
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
        var app = getApp()
        this.setData({
            items: app.globalData.buycar
        })
        let items = this.data.items                   // 获取购物车列表
        let total = 0
        for (let i = 0; i < items.length; i++) {      // 循环列表得到每个数据
            total += items[i].number * items[i].price // 所有价格加起来
            total = total
        }
        this.setData({
            items: items,
            totalPrice: total

        })

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
