package main

import "backend/dao"

func main() {
	// 创建数据库 CREATE DATABASE CanteenOrdering;
	// 连接数据库
	if err := dao.InitMySQL(); err != nil {
		panic(err)
	}
	defer dao.DB.Close()
}