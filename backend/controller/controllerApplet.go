package controller

import (
	"backend/dao"
	"backend/logic"
	"backend/model"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

// AppletLogin 小程序端登录
func AppletLogin(c *gin.Context) {
	code := c.PostForm("code")
	appID := "appID"
	appSecret:= "appSecret"
	code2sessionURL := "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
	url := fmt.Sprintf(code2sessionURL, appID, appSecret, code)

	resp, err := http.DefaultClient.Get(url)
	if err != nil {
		println(err)
	}
	defer resp.Body.Close()

	var wxMap map[string]string   // 通过 map 存储通过接口得到的数据
	if err := json.NewDecoder(resp.Body).Decode(&wxMap); err != nil {
		println(err)
	}

	var openId = wxMap["openid"]   // 接收的数据 key = "openid"

	rand.Seed(time.Now().UnixNano())
	userId := rand.Intn(10000)
	Id := strconv.Itoa(userId)
	logic.GetQr(Id)

	qrUrl := "http://127.0.0.1:8003/assets/qr/" + Id + ".png"
	mp := make(map[string]interface{})
	mp["qrUrl"] = qrUrl
	mp["userId"] = Id

	c.JSON(http.StatusOK, mp)
	user := model.User {
		WxId: openId,
		UserId: Id,
		QrUrl: qrUrl,
	}
	dao.DB.Create(&user)
}

// ShowFood 首页，菜单列表
func ShowFood(c *gin.Context) {
}

// ShoppingCart 购物车页面
func ShoppingCart(c *gin.Context) {
}

// MyOrder 我的订单
func MyOrder(c *gin.Context) {
}

// ReceiptMyOrder 收货
func ReceiptMyOrder(c *gin.Context) {
}

// HistoryOrders 历史订单
func HistoryOrders(c *gin.Context) {
}

// AddAdvice 提建议
func AddAdvice(c *gin.Context) {
}

// Contact 联系
func Contact(c *gin.Context) {
}

// Address 地址
func Address(c *gin.Context) {
}