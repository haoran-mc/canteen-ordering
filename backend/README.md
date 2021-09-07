# The backend part of CanteenOrdering

## Logic of backend

1. Create a database
2. Connect this database
3. Distribution routing
4. Each route corresponds to a controller function
5. Manipulate the Models in the database through controller functions

## Create a database

```sql
CREATE DATABASE CanteenOrdering;
```

## Create table structure and put initial data

[table structure](https://github.com/haoran-mc/CanteenOrdering/blob/backend/backend/model/model.go)

## Connect this database

Change the data in this file `./dao/mysql.go` to connect to the database.

```go
conf.db = "CanteenOrdering"
conf.user = "root"
conf.pwd = "haoran232"
conf.host = "127.0.0.1"
conf.port = 3306
dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
    conf.user, conf.pwd, conf.host, conf.port, conf.db)
```

## Login

### Distribute router

```go
v1 := r.Group("CanteenPC")
{
  v1.POST("/login", controller.PCLogin)
}

v2 := r.Group("CanteenApplet")
{
  v2.GET("login", controller.AppletLogin)
}
```
