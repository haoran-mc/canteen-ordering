package dao

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	DB *gorm.DB
)

type MySQLInfo struct {
	db string
	user string
	pwd string
	host string
	port int
}

func InitMySQL() (err error) {
	conf := new(MySQLInfo)
	conf.db = "CanteenOrdering"
	conf.user = "root"
	conf.pwd = "haoran232"
	conf.host = "127.0.0.1"
	conf.port = 3306
	//dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
	//	conf.user, conf.pwd, conf.host, conf.port, conf.db)

	dsn := "root:haoran232@(127.0.0.1:3306)/CanteenOrdering?charset=utf8mb4&parseTime=True&loc=Local"

	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	return DB.DB().Ping()
}

func Close() {
	DB.Close()
}