const app = getApp()
import Toast from 'vant-weapp/toast/toast';
import Notify from 'vant-weapp/notify/notify';


Page({ 
    data: {
        mid: 0,
        tatol_price:0,
        motto: 'Hello World',
        url: "",
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        scImage:[
            {
                url:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1547182276,1037304042&fm=26&gp=0.jpg"
            },
            {
                url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2574575598,3551990549&fm=26&gp=0.jpg"
            },
            {
                url:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2147645132,268932704&fm=26&gp=0.jpg"
            }
        ],

        items: [{ Name: "素炒青菜", MonthSell: 1,Price:5.5, ImageUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=679410507,3478666188&fm=26&gp=0.jpg" }, 
                { Name: "腌排骨", MonthSell: 1, Price: 7, ImageUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2295249742,2696485909&fm=26&gp=0.jpg" },
                
                { Name: "狮子头", MonthSell: 1, Price: 6, ImageUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=33770419,1526287765&fm=26&gp=0.jpg" },   
                { Name: "油炸小虾", MonthSell: 20, Price: 8, ImageUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3021763351,856298291&fm=26&gp=0.jpg" }, 
                { Name: "炸鸡翅", MonthSell: 7, Price: 6, ImageUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1128675319,3362657940&fm=26&gp=0.jpg" },  
                { Name: "油焖排骨", MonthSell: 22, Price: 8, ImageUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1479485275,2612928786&fm=26&gp=0.jpg" }, 
                { Name: "香芋梅菜", MonthSell: 7, Price: 7, ImageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2925501324,1738052312&fm=26&gp=0.jpg" }, 
               ]
    },
    test:[],  
    
    onSubmit(){
        wx.navigateTo({
            url: '/pages/cfOrder/cfOrder'
        })
    },

    onShow: function () {
        var that = this
        wx.request({
            url: app.globalData.URL + 'Applets/showFood',
            data: {},
            method: 'GET', 
            success: function (res) {
                // success
                console.log(res.data)
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
                wx.switchTab({ url: '/pages/me/me', })
            }
        })  
    },

    a:function(){
        wx.getUserInfo({
            success:function(res){
                console.log(res.userInfo.avatarUrl)
            }
        })
    },

    clickBtn: function (e) {
        
    },
    
    handeltap:function(e){
        var items = this.data.items

        var index = e.currentTarget.dataset.index;
        
        var name = items[index].Name 
        var price = items[index].Price
        var url = items[index].ImageUrl
        
        var mid =this.data.mid
        console.log(mid)
        
        var app = getApp(); 
        if(app.globalData.buycar.length>1){
            Toast.fail('购物车已满');
            console.log("-----"+items)
        }

        else{

            Toast.success('已添加购物车哦！');
            app.globalData.buycar.push( {  "name": name, "price": price,"thumb":url,number:1 })
            mid++
        }

        var tatol_price =this.data.tatol_price
        tatol_price =tatol_price +price

        this.setData({
            mid:mid,
            tatol_price:tatol_price
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
