package routes

import (
	"github.com/gofiber/fiber/v2"
	"TuDo/controllers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/parenttasks", controllers.GetParentTasks)
	api.Get("/parenttasks/:id", controllers.GetParentTask)
	api.Post("/parenttasks", controllers.CreateParentTask)
	api.Put("/parenttasks/:id", controllers.UpdateParentTask)
	api.Delete("/parenttasks/:id", controllers.DeleteParentTask)

	api.Post("/subtasks", controllers.CreateSubTask)
	api.Put("/subtasks/:id", controllers.UpdateSubTask)
	api.Delete("/subtasks/:id", controllers.DeleteSubTask)
}