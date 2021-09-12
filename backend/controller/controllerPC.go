package controller

import (
	"backend/dao"
	"backend/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"path"
	"time"
)

// PCLogin 管理员登录
func PCLogin(c *gin.Context) {
	name := c.PostForm("name")
	password := c.PostForm("password")
	err := dao.DB.Where("name = ? AND password = ?", name, password).
		Find(&model.Admin{}).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"name":     name,
			"password": password,
		})
		c.Redirect(http.StatusMovedPermanently, "CanteenPC")
	}
}

// ManageOrders 食堂订单界面
func ManageOrders(c *gin.Context) {
	var foodType string = "食堂"
	var hangUp bool = false
	var finish bool = false
	dao.DB.AutoMigrate(model.Orders{})
	var orderList []model.Orders
	dao.DB.Where("type = ? AND finish = ? AND hang_up = ?", foodType, finish, hangUp).Find(&orderList)
	c.JSON(http.StatusOK, orderList)
}

// FinishOrder 食堂完成订单
func FinishOrder(c *gin.Context) {
	var orderId = c.PostForm("orderId")
	var Finish bool = true
	dao.DB.Model(&model.Orders{}).Where("order_id = ?", orderId).Update("finish", Finish)
}

// HangUp 挂起页面
func HangUp(c *gin.Context) {
	var hangUp bool = true
	var finish bool = false
	var orders []model.Orders
	dao.DB.Where("hang_up = ? AND finish = ?", hangUp, finish).Find(&orders)
	c.JSON(200, orders)
}

// HangUpOrder 食堂挂起订单
func HangUpOrder(c *gin.Context) {
	var orderId = c.PostForm("orderId")
	var hangUp bool = true
	dao.DB.Model(&model.Orders{}).Where("order_id = ?", orderId).Update("hang_up", hangUp)
}

// HangUpFinish 完成挂起的订单
func HangUpFinish(c *gin.Context) {
	var orderId = c.PostForm("orderId")
	var finish bool = true
	dao.DB.Model(&model.Orders{}).Where("order_num = ?", orderId).Update("finish", finish)
}

// TakeOut 外卖订单界面
func TakeOut(c *gin.Context) {
	var foodType string = "外卖"
	var hangUp bool = false
	var finish bool = false
	var orderList []model.Orders
	dao.DB.Where("type = ? AND finish = ? AND hang_up = ?", foodType, finish, hangUp).Find(&orderList)
	c.JSON(http.StatusOK, orderList)
}

// FinishTakeOut 外卖完成订单
func FinishTakeOut(c *gin.Context) {
	var orderId = c.PostForm("orderId")
	var finish bool = true
	dao.DB.Model(&model.Orders{}).Where("order_id = ?", orderId).Update("finish", finish)
}

// OrdersRecord 订单记录
func OrdersRecord(c *gin.Context) {
	dao.DB.AutoMigrate(model.Orders{})
	var orders []model.Orders
	var finish bool = true
	dao.DB.Where("finish = ?", finish).Find(&orders)
	c.JSON(http.StatusOK, orders)
}

// ManageFood 食品管理
func ManageFood(c *gin.Context) {
	dao.DB.AutoMigrate(&model.Food{})
	var foodList []model.Food
	dao.DB.Find(&foodList)
	c.JSON(http.StatusOK, foodList)
}

// DAddFood 增加菜
func DAddFood(c *gin.Context) {
	dao.DB.AutoMigrate(model.Food{})
	foodName := c.PostForm("name")
	foodPrice := c.PostForm("price")
	file, err := c.FormFile("file")
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	log.Println(file.Filename)
	dst := path.Join("imageAssets/food", file.Filename)
	_ = c.SaveUploadedFile(file, dst)
	path1 := "http://127.0.0.1/imageAssets/food/" + file.Filename
	foodList := model.Food{
		Name:      foodName,
		Price:     foodPrice,
		PhotoPath: path1,
	}
	dao.DB.Create(&foodList)
}

// AddFood 添加食品
func AddFood(c *gin.Context) {
	dao.DB.AutoMigrate(&model.Food{})

	foodName := c.PostForm("name")
	foodPrice := c.PostForm("price")
	fmt.Println(foodName)
	fmt.Println(foodPrice)

	file, err := c.FormFile("foodPhoto")
	if err != nil {
		println("err1")
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	log.Println(file.Filename)
	dst := path.Join("resource/foodPhoto", file.Filename)
	_ = c.SaveUploadedFile(file, dst)
	foodPhoto := "http://127.0.0.1:8003/resource/foodPhoto/" + file.Filename
	newFood := model.Food{
		Name:      foodName,
		Price:     foodPrice,
		PhotoPath: foodPhoto,
	}
	dao.DB.Create(&newFood)
}

// EditFood 编辑食品
func EditFood(c *gin.Context) {
	var price = c.PostForm("price")
	var imageId = c.PostForm("imageId")
	dao.DB.Model(&model.Food{}).Where("image_id = ?", imageId).Update("price", price)
}

// DeleteFood 删除食品
func DeleteFood(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"error": "无效的id"})
		return
	}
	if err := dao.DB.Where("id = ?", id).Delete(model.Food{}); err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "error"})
	} else {
		c.JSON(http.StatusOK, gin.H{id: "deleted"})
	}
}

// Opinion 获得所有意见
func Opinion(c *gin.Context) {
	dao.DB.AutoMigrate(&model.Advise{})
	var advise []model.Advise
	dao.DB.Find(&advise)
	c.JSON(http.StatusOK, advise)
}

// DeleteOpinion 删除意见
func DeleteOpinion(c *gin.Context) {
	var id = c.PostForm("Id")
	dao.DB.Where("id = ?", id).Delete(model.Advise{})
}

// SalesAnalysis 销量分析(一周内)
func SalesAnalysis(c *gin.Context) {
	var sum [7]int
	var canteen [7]int
	var takeOut [7]int

	nowTime := time.Now()                              // 当前时间
	aheadTime := nowTime.Format("2006/01/02 15:04:05") // current 所在的这一天的结束(format)
	currentTime := nowTime                             // 每一天的开始
	oneDay, _ := time.ParseDuration("-24h")

	/*
	 * ----------------------------------------------------------->
	 *    ...         |          |          |          |          |
	 *    ...      三天前       两天前      两天前      一天前       现在
	 *           behindTime  aheadTime
	 */

	for i := 0; i < 7; i++ {
		currentTime = currentTime.Add(oneDay)                   // current
		behindTime := currentTime.Format("2006/01/02 15:04:05") // current 所在的这一天的开始(format)

		println(behindTime)
		println(aheadTime)
		println("------")

		dao.DB.Model(&model.Orders{}).Where("type = ? AND order_time > ? AND order_time < ? ",
			"食堂", behindTime, aheadTime).Count(&canteen[i])

		dao.DB.Model(&model.Orders{}).Where("type = ? AND order_time > ? AND order_time < ? ",
			"外卖", behindTime, aheadTime).Count(&takeOut[i])

		dao.DB.Model(&model.Orders{}).Where("order_time > ? AND order_time < ? ",
			behindTime, aheadTime).Count(&sum[i])

		aheadTime = behindTime // 前一天的结束
	}

	c.JSON(http.StatusOK, gin.H{
		"canteen": canteen,
		"takeOut": takeOut,
		"sum":     sum,
	})
}

// FoodAnalysis 菜品分析
func FoodAnalysis(c *gin.Context) {
	var foodList []model.Food
	dao.DB.Order("month_sell").Find(&foodList)
	name := make([]string, len(foodList))
	cnt := make([]int, len(foodList))

	for i := 0; i < len(foodList); i++ {
		name[i] = foodList[i].Name
		cnt[i] = foodList[i].MonthSell
	}

	c.JSON(200, gin.H{
		"name": name,
		"cnt":  cnt,
	})
}
