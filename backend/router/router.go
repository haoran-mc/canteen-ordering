package router

import (
	"backend/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	// 跨域中间件
	// r.Use()

	// 静态资源
	// r.static()

	v1 := r.Group("CanteenPC")
	{
		v1.POST("/login", controller.PCLogin)
	}

	v2 := r.Group("CanteenApplet")
	{
		v2.GET("login", controller.AppletLogin)
	}

	return r
}