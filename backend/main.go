package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"TuDo/database"
	"TuDo/routes"
)

func main() {
	app := fiber.New()

	database.ConnectDB()
	routes.SetupRoutes(app)

	log.Println("Server running on :8080")
	app.Listen(":8080")
}
