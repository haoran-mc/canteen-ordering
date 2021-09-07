package controller

import (
	"backend/dao"
	"backend/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func PCLogin(c *gin.Context) {
	name := c.PostForm("name")
	password := c.PostForm("password")
	err := dao.DB.Where("name = ? AND password = ?", name, password).
		Find(&model.Admin{}).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"name": name,
			"password": password,
		})
		c.Redirect(http.StatusMovedPermanently, "CanteenPC")
	}
}