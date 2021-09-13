const app = getApp()
import Toast from '@vant/weapp/toast/toast'
import Notify from '@vant/weapp/notify/notify'

Page({
    data: {
        url: '',
        swiperItem: [
            { url: "../../assest/swiper/swiper-item-1.png" },
            { url: "../../assest/swiper/swiper-item-2.jpeg" },
            { url: "../../assest/swiper/swiper-item-3.jpeg" }
        ],
        // 默认一道菜，需要从后端接收
        items: [
            {
                Name: "糖醋排骨",
                MonthSell: 1,
                Price: 20,
                photo_path: "../../assest/foodPhoto/糖醋排骨.jpg"
            }
        ],
        mid: 0,
        tatol_price: 0
        // userInfo: {}
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
                that.setData({
                    url: res.data
                })
            },
            fail:function(){
                // wx.switchTab({ url: '/pages/me/me', })
            }
        })
    },
    a: function () {
        wx.getUserInfo({
            success:function (res) {
                // console.log(res.userInfo.avatarUrl)
            }
        })
    },
    clickBtn: function (e) {
    },
    // 从后端接收数据
    handeltap: function (e) {
        const items = this.data.items
        const index = e.currentTarget.dataset.index
        const id = items[index].ID
        const name = items[index].Name
        const price = items[index].Price
        const url = items[index].PhotoPath
        var mid = this.data.mid
        const app = getApp()
        // 判断是否已选购本菜
        if (app.globalData.selectFoodHash[id]) {
            Toast.fail('重复选择')
        } else {
            Toast.success('已添加购物车')
            app.globalData.selectFoodHash[id] = true
            app.globalData.buycar.push({
                "name": name,
                "price": price,
                "thumb": url,
                number: 1
            })
            mid++
        }
        var tatol_price = this.data.tatol_price
        tatol_price = tatol_price + price

        this.setData({
            mid: mid,
            tatol_price: tatol_price
        })
    }
})
