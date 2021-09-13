const app = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        userId: '',
        radio: '1',
        remark: '',
        type: '堂食',

        getId: 0,
        receiptId: 0,
        receiptTime: '',

        receiptName1: '',
        receiptName2: '',
        url1: '',
        url2: '',
        foodId1: 1,
        foodId2: 1,
        food_price1: 0,
        food_price2: 0,

        cf_price: 0,
        run_price: 0,
        all_Price: 0,

        order: [],

        phone: '未填电话!',
        address: '未填地址!'
    },
    onChange(event) {
        this.setData({
            radio: event.detail
        })
        if (event.detail == 1){
            this.setData({ type: "堂食", })
            this.setData({ run_price: 0, })
        } else {
            this.setData({ type: "外卖", })
            this.setData({ run_price: 1, })
        }
    },

    remark1() {
        this.setData({ remark: "加饭",});
    },

    remark2() {
        this.setData({ remark: "加汤", });
    },

    onSubmit() {
        wx.request({
            method: 'post',
            url: app.globalData.URL + 'shoppingCart',
            data: ({
                userId:    this.data.userId,
                getId:     this.data.getId,
                orderId:   this.data.receiptId,
                time:      this.data.receiptTime,
                foodName1: this.data.receiptName1,
                foodName2: this.data.receiptName2,
                url1:      this.data.url1,
                url2:      this.data.url2,
                foodId1:   this.data.foodId1,
                foodId2:   this.data.foodId2,
                price1:    this.data.food_price1,
                price2:    this.data.food_price2,
                allPrice:  this.data.all_Price,
                type:      this.data.type,
                remark:    this.data.remark,
                address:   this.data.address,
                phone:     this.data.phone
            }),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                wx.showToast({
                    title: '提交成功',
                    image: "/assest/su.png",
                    mask: true
                })
                var app = getApp()
                // 清空购物车
                app.globalData.buycar = []
                app.globalData.buycar.splice(0, 2)
                app.globalData.selectFoodHash = []
                setTimeout(() => {
                    wx.switchTab({ url: '/pages/myOrder/myOrder', })
                }, 1000);
            },
            fail(res) {
                wx.showToast({
                    title: '提交失败',
                    image: "/assest/fail.png",
                    duration: 700,
                    mask: true
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var i = (Math.random() * 9999).toFixed(0)
        this.setData({
            getId: i
        })
        var str = '',
            range = 10,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', ]
        // 随机产生
        if (true) {
            range = Math.round(Math.random() * (2)) + 6
        }
        for (var i = 0; i < range; i++) {
            var pos = Math.round(Math.random() * (arr.length - 1))
            str += arr[pos]
        }
        this.setData({
            receiptId: str
        })

        const that = this
        wx.getStorage({
            key: 'phone',
            success: function (res) {
                that.setData({
                    phone: res.data,
                })
            },
            fail: function () {
            }
        })

        wx.getStorage({
            key: 'address',
            success: function (res) {
                that.setData({
                    address: res.data
                })
            },
            fail: function () {
            }
        })

        wx.getStorage({
            key: 'info',
            success: function (res) {
                that.setData({
                    userId: res.data.userId
                })
            },
            fail: function () {
            }
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
        var TIME = util.formatTime(new Date())
        this.setData({
            receiptTime: TIME
        })

        var app = getApp()
        this.setData({
            order: app.globalData.buycar
        })

        let order = this.data.order;                    // 获取购物车列表
        let total = 0;
        for (let i = 0; i < order.length; i++) {        // 循环列表得到每个数据
            total += order[i].number * order[i].price   // 所有价格加起来
        }
        this.setData({
            all_Price: total
        })

        let foodName1, foodID1, foodName2, foodID2, url1, url2
        if (order.length == 1) {
            foodName1 = order[0].name
            foodID1 = order[0].number
            url1 = order[0].thumb
        }
        if (order.length == 2) {
            foodName1 = order[0].name
            foodID1 = order[0].number
            url1 = order[0].thumb
            foodName2 = order[1].name
            foodID2 = order[1].number
            url2 = order[1].thumb
        }
        this.setData({
            receiptName1: foodName1,
            receiptName2: foodName2,
            foodId1: foodID1,
            foodId2: foodID2,
            url1: url1,
            url2: url2
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
