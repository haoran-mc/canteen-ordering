package router

import (
	"backend/controller"
	"backend/middleware"
	"github.com/gin-gonic/gin"
	"net/http"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())

	//设置外部访问静态资源
	r.StaticFS("/resource", http.Dir("./resource"))

	v1 := r.Group("CanteenPC")
	{
		v1.POST("/login", controller.PCLogin)                  // 登录页面
		v1.GET("/home", controller.IndexHandler)               // 主页面

		v1.PUT("/finishOrder", controller.FinishOrder)         // 完成订单

		v1.GET("/hangUp", controller.HangUp)                   // 挂起页面
		v1.PUT("/hangUpOrder", controller.HangUpOrder)         // 订单挂起
		v1.PUT("/hangUpFinish", controller.HangUpFinish)       // 完成挂起订单

		v1.GET("/takeOut", controller.TakeOut)                 // 外卖页面
		v1.PUT("/takeOutOp", controller.FinishTakeOut)         // 完成外卖

		v1.GET("/ordersRecord", controller.OrdersRecord)       // 订单页面

		v1.GET("/manageFood", controller.ManageFood)           // 管理菜品页面
		v1.POST("/addFood", controller.AddFood)                // 添加菜品
		v1.PUT("/editFood", controller.EditFood)               // 编辑菜品
		v1.DELETE("/deleteFood", controller.DeleteFood)        // 删除菜品

		v1.GET("/opinion", controller.Opinion)                 // 意见页面
		v1.POST("/deleteOpinion", controller.DeleteOpinion)    // 删除意见

		v1.GET("/salesAnalysis", controller.SalesAnalysis)     // 销量分析
		v1.GET("/foodAnalysis", controller.FoodAnalysis)       // 菜品分析
	}

	v2 := r.Group("CanteenApplet")
	{
		v2.POST("/login", controller.AppletLogin)              // 小程序端登录页面
		v2.GET("/showFood", controller.ShowFood)               // 小程序首页，菜单列表
		v2.GET("/shoppingCart", controller.ShoppingCart)       // 购物车页面
		v2.GET("/myOrder", controller.MyOrder)                 // 我的订单
		v2.PUT("/receiptMyOrder", controller.ReceiptMyOrder)   // 收货
		v2.GET("/historyOrders", controller.HistoryOrders)     // 历史订单
		v2.POST("/addAdvice", controller.AddAdvice)            // 提建议
		v2.POST("/contact", controller.Contact)                // 联系方式
		v2.POST("/address", controller.Address)                // 地址
	}

	return r
}
