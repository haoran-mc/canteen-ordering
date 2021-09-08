package logic

import "github.com/skip2/go-qrcode"

func GetQr(id string) {
	qrcode.WriteFile(id, qrcode.Medium, 256, "./resource/qr/" + id + ".png")
}