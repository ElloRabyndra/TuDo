package database

import (
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"

	"TuDo/models"
)

var DB *gorm.DB

func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("tudo.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect SQLite:", err)
	}

	DB = db

	err = db.AutoMigrate(&models.ParentTask{}, &models.SubTask{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Connected to SQLite DB")
}
