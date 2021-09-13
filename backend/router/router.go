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
		v1.POST("/login", controller.PCLogin)                  // TODO 登录页面
		v1.GET("/manageOrders", controller.ManageOrders)       // TODO 订单管理

		v1.PUT("/finishOrder", controller.FinishOrder)         // TODO 完成订单

		v1.GET("/hangUp", controller.HangUp)                   // TODO 挂起页面
		v1.PUT("/hangUpOrder", controller.HangUpOrder)         // TODO 订单挂起
		v1.PUT("/hangUpFinish", controller.HangUpFinish)       // TODO 完成挂起订单

		v1.GET("/takeOut", controller.TakeOut)                 // TODO 外卖页面
		v1.PUT("/takeOutOp", controller.FinishTakeOut)         // TODO 完成外卖

		v1.GET("/ordersRecord", controller.OrdersRecord)       // TODO 订单记录

		v1.GET("/manageFood", controller.ManageFood)           // 管理菜品页面
		v1.POST("/addFood", controller.AddFood)                // 添加菜品
		v1.PUT("/editFood", controller.EditFood)               // 编辑菜品
		v1.DELETE("/deleteFood/:id", controller.DeleteFood)    // 删除菜品

		v1.GET("/opinion", controller.Opinion)                 // TODO 意见页面
		v1.POST("/deleteOpinion", controller.DeleteOpinion)    // TODO 删除意见

		v1.GET("/salesAnalysis", controller.SalesAnalysis)     // TODO 销量分析
		v1.GET("/foodAnalysis", controller.FoodAnalysis)       // TODO 菜品分析
	}

	v2 := r.Group("CanteenApplet")
	{
		v2.POST("/login", controller.AppletLogin)              // TODO 小程序端登录页面
		v2.GET("/showFood", controller.ShowFood)               // 小程序首页，菜单列表
		v2.GET("/shoppingCart", controller.ShoppingCart)       // TODO 购物车页面
		v2.GET("/myOrder", controller.MyOrder)                 // TODO 我的订单
		v2.PUT("/receiptMyOrder", controller.ReceiptMyOrder)   // TODO 收货
		v2.GET("/historyOrders", controller.HistoryOrders)     // TODO 历史订单
		v2.POST("/addAdvice", controller.AddAdvice)            // TODO 提建议
		v2.POST("/contact", controller.Contact)                // TODO 联系方式
		v2.POST("/address", controller.Address)                // TODO 地址
	}

	return r
}
