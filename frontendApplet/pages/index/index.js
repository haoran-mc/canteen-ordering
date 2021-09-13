const app = getApp()
import Toast from '@vant/weapp/toast/toast';
import Notify from '@vant/weapp/notify/notify';

Page({
    data: {
        url: '',
        swiperItem: [
            {
                url: "../../assest/swiper/swiper-item-1.png"
            },
            {
                url: "../../assest/swiper/swiper-item-2.jpeg"
            },
            {
                url: "../../assest/swiper/swiper-item-3.jpeg"
            }
        ],
        // 后端数据
        items: [
            {
                Name: "糖醋排骨",
                MonthSell: 1,
                Price: 20,
                photo_path: "../../assest/foodPhoto/糖醋排骨.jpg"
            }
        ],
        mid: 0,
        tatol_price: 0,
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    test:[],
    onSubmit(){
        wx.navigateTo({
            url: '/pages/cfOrder/cfOrder'
        })
    },
    onShow: function () {
        const that = this
        wx.request({
            url: app.globalData.URL + 'showFood',
            data: {},
            method: 'GET',
            success: function (res) {
                // success
                // console.log(res.data)
                that.setData({ items: res.data });
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
        wx.getStorage({
            key: 'url',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    url: res.data
                })
            },
            fail:function(){
                // wx.switchTab({ url: '/pages/me/me', })
            }
        })
    },
    a:function () {
        wx.getUserInfo({
            success:function (res) {
                console.log(res.userInfo.avatarUrl)
            }
        })
    },
    clickBtn: function (e) {
    },
    handeltap: function (e) {
        const items = this.data.items
        const index = e.currentTarget.dataset.index
        const name = items[index].Name
        const price = items[index].Price
        const url = items[index].PhotoPath
        var mid = this.data.mid
        var app = getApp()
        if (app.globalData.buycar.length > 1) {
            Toast.fail('购物车已满')
            console.log("-----" + items)
        } else {
            Toast.success('已添加购物车哦！')
            app.globalData.buycar.push({
                "name": name,
                "price": price,
                "thumb": url,
                number:1
            })
            mid++
        }
        var tatol_price = this.data.tatol_price
        tatol_price = tatol_price + price

        this.setData({
            mid: mid,
            tatol_price: tatol_price
        })
    },
    onHide: function () {
        this.setData({
            tatol_price:0
        })
    },

    // gotoPage1: function () {
    //   wx.navigateTo({ url: '/pages/me/me', })
    // },
    //事件处理函数
    //   bindViewTap: function() {
    //     wx.navigateTo({
    //       url: '../logs/logs'
    //     })
    //   },
    //   onLoad: function () {
    //     if (app.globalData.userInfo) {
    //       this.setData({
    //         userInfo: app.globalData.userInfo,
    //         hasUserInfo: true
    //       })
    //     } else if (this.data.canIUse){
    //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //       // 所以此处加入 callback 以防止这种情况
    //       app.userInfoReadyCallback = res => {
    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         })
    //       }
    //       console.log(app.globalData.userInfo)
    //     } else {
    //       // 在没有 open-type=getUserInfo 版本的兼容处理
    //       wx.getUserInfo({
    //         success: res => {
    //           app.globalData.userInfo = res.userInfo
    //           this.setData({
    //             userInfo: res.userInfo,
    //             hasUserInfo: true
    //           })
    //         }
    //       })
    //     }
    //   },
    //   getUserInfo: function(e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //       userInfo: e.detail.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
})
