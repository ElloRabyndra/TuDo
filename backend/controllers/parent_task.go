package controllers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"TuDo/database"
	"TuDo/models"
)

func GetParentTasks(c *fiber.Ctx) error {
	var tasks []models.ParentTask
	database.DB.Preload("SubTasks").Find(&tasks)
	return c.JSON(tasks)
}

func GetParentTask(c *fiber.Ctx) error {
	id := c.Params("id")

	var task models.ParentTask
	if err := database.DB.Preload("SubTasks").First(&task, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Task not found"})
	}

	return c.JSON(task)
}

func CreateParentTask(c *fiber.Ctx) error {
	var body models.ParentTask

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid input"})
	}

	body.ID = uuid.NewString()
	body.CreatedAt = time.Now()

	database.DB.Create(&body)
	return c.JSON(body)
}

func UpdateParentTask(c *fiber.Ctx) error {
	id := c.Params("id")

	var task models.ParentTask
	if err := database.DB.First(&task, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Task not found"})
	}

	if err := c.BodyParser(&task); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid input"})
	}

	database.DB.Save(&task)
	return c.JSON(task)
}

func DeleteParentTask(c *fiber.Ctx) error {
	id := c.Params("id")

	database.DB.Delete(&models.ParentTask{}, "id = ?", id)
	return c.JSON(fiber.Map{"message": "Parent task deleted"})
}
