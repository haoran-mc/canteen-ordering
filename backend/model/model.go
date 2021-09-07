package model

type Admin struct {
	Name string
	Password string
}

type User struct {
	WxId string    `gorm:"not null; unique"`
	UserId string
	Address string
	Phone string
	QrUrl string
	ImageUrl string
}
