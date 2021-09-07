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
