package controller

import (
	"backend/dao"
	"backend/logic"
	"backend/model"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

// AppletLogin 小程序端登录
func AppletLogin(c *gin.Context) {
	code := c.PostForm("code")
	appID := "appID"
	appSecret := "appSecret"
	code2sessionURL := "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
	url := fmt.Sprintf(code2sessionURL, appID, appSecret, code)

	resp, err := http.DefaultClient.Get(url)
	if err != nil {
		println(err)
	}
	defer resp.Body.Close()

	var wxMap map[string]string // 通过 map 存储通过接口得到的数据
	if err := json.NewDecoder(resp.Body).Decode(&wxMap); err != nil {
		println(err)
	}

	var openId = wxMap["openid"] // 接收的数据 key = "openid"

	rand.Seed(time.Now().UnixNano())
	userId := rand.Intn(10000)
	Id := strconv.Itoa(userId)
	logic.GetQr(Id)

	qrUrl := "http://127.0.0.1:8003/resource/qr/" + Id + ".png"
	mp := make(map[string]interface{})
	mp["qrUrl"] = qrUrl
	mp["userId"] = Id

	c.JSON(http.StatusOK, mp)
	user := model.User{
		WxId:   openId,
		UserId: Id,
		QrUrl:  qrUrl,
	}
	dao.DB.Create(&user)
}

// ShowFood 首页，菜单列表
func ShowFood(c *gin.Context) {
	var foodList []model.Food
	dao.DB.Find(&foodList)
	c.JSON(http.StatusOK, foodList)
}

// ShoppingCart 购物车页面
func ShoppingCart(c *gin.Context) {
	var orders model.Orders
	if err := c.ShouldBind(&orders); err == nil {
		order := model.Orders{
			UserId:    orders.UserId,
			GetId:     orders.GetId,
			OrderId:   orders.OrderId,
			OrderTime: orders.OrderTime,
			Address:   orders.Address,
			Phone:     orders.Phone,
			Price:     orders.Price,
			Type:      orders.Type,
			FoodName1: orders.FoodName1,
			FoodName2: orders.FoodName2,
			FoodId1:   orders.FoodId1,
			FoodId2:   orders.FoodId2,
			FoodUrl1:  orders.FoodUrl1,
			FoodUrl2:  orders.FoodUrl2,
			Remark:    orders.Remark,
		}
		dao.DB.Create(&order)

		c.JSON(http.StatusOK, gin.H{
			"userId":    orders.UserId,
			"getId":     orders.GetId,
			"orderId":   orders.OrderId,
			"time":      orders.OrderTime,
			"address":   orders.Address,
			"phone":     orders.Phone,
			"allPrice":  orders.Price,
			"foodType":  orders.Type,
			"foodName1":  orders.FoodName1,
			"foodName2": orders.FoodName2,
			"foodId1":    orders.FoodId1,
			"foodId2":   orders.FoodId2,
			"url1":       orders.FoodUrl1,
			"url2":      orders.FoodUrl2,
			"remark":    orders.Remark,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	dao.DB.Model(&model.Food{}).Where("name = ?", orders.FoodName1).
		UpdateColumn("month_sell", gorm.Expr("month_sell + ?", 1))

	dao.DB.Model(&model.Food{}).Where("name = ?", orders.FoodName2).
		UpdateColumn("month_sell", gorm.Expr("month_sell + ?", 1))
}

// MyOrder 我的订单
func MyOrder(c *gin.Context) {
	userId := c.PostForm("userId")
	var orders []model.Orders
	dao.DB.Where("user_id = ? AND user_cf = ?", userId, "").Find(&orders)
	c.JSON(http.StatusOK, orders)
	jsons, errs := json.Marshal(orders)
	if errs != nil {
		fmt.Println(errs.Error())
	}
	fmt.Println(string(jsons))
}

// ReceiptMyOrder 收货
func ReceiptMyOrder(c *gin.Context) {
	userId := c.PostForm("userId")
	getId := c.PostForm("getId")
	var order []model.Orders

	dao.DB.Model(&model.Orders{}).Where("user_id = ? AND get_id = ?", userId, getId).
		Update("user_cf", "已完成")
	c.JSON(http.StatusOK, order)
	jsons, errs := json.Marshal(order)
	if errs != nil {
		fmt.Println(errs.Error())
	}
	fmt.Println(string(jsons))
}

// HistoryOrders 历史订单
func HistoryOrders(c *gin.Context) {
	dao.DB.AutoMigrate(model.Orders{})
	userId := c.PostForm("userId")
	println(userId)
	var query []model.Orders
	dao.DB.Where("user_id = ?", userId).Find(&query)
	c.JSON(http.StatusOK, query)
	jsons, errs := json.Marshal(query)
	if errs != nil {
		fmt.Println(errs.Error())
	}
	fmt.Println(string(jsons))
}

// AddAdvice 提建议
func AddAdvice(c *gin.Context) {
	foodName := c.PostForm("foodName")
	advise := c.PostForm("advise")
	t := time.Now()
	nowTime := t.Format("2006-01-02 15:04:05")
	advice := model.Advise {
		FoodName: foodName,
		Advise: advise,
		Time: nowTime,
	}
	dao.DB.Create(&advice)
}

// Contact 联系
func Contact(c *gin.Context) {
	id := c.PostForm("userId")
	phone := c.PostForm("phone")

	dao.DB.Model(&model.User{}).Where("user_id = ?", id).Update("phone", phone)
}

// Address 地址
func Address(c *gin.Context) {
	id := c.PostForm("userId")
	address := c.PostForm("address")
	dao.DB.Model(&model.User{}).Where("user_id = ?", id).Update("address", address)
}
