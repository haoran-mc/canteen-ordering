package model

// Admin 管理员
type Admin struct {
	Name     string
	Password string
}

// User 用户
type User struct {
	WxId     string `gorm:"not null; unique"`
	UserId   string
	Address  string
	Phone    string
	QrUrl    string
	ImageUrl string
}

// Orders 订单
type Orders struct {
	OrderId   string `gorm:"primary_key" form:"orderId" json:"orderId" binding:"required"`
	GetId     string `form:"getId"  json:"getId" binding:"required"`
	UserId    string `gorm:"not null" form:"userId" json:"userId" binding:"required"`
	OrderTime string `form:"time" json:"time"`
	Address   string `form:"address" json:"address"`
	Phone     string `form:"phone" json:"phone"`
	Price     int    ` gorm:"not null" form:"allPrice" json:"allPrice" binding:"required"`
	Type      string `form:"type" json:"type" binding:"required"`
	FoodName  string `form:"foodName" json:"foodName" binding:"required"`
	FoodName1 string `form:"foodName1" json:"foodName1" `
	FoodId    string `form:"foodId" json:"foodId" binding:"required"`
	FoodId1   string `form:"foodId1" json:"foodId1" `
	FoodUrl   string `form:"url" json:"url" `
	FoodUrl1  string `form:"url1" json:"url1" `
	Remark    string `form:"remark" json:"remark" `
	HangUp    bool   // 挂起
	Finish    bool   // 完成标记
	UserCf    string // 用户确认
}

// FoodList 菜单列表
type FoodList struct {
	Name      string
	Price     string
	ImageUrl  string
	ImageId   int `gorm:"primary_key"`
	MonthSell int
}

// Advise 建议
type Advise struct {
	ID       uint `gorm:"primary_key"`
	Time     string
	FoodName string
	Advise   string
}
