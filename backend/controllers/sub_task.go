package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"TuDo/database"
	"TuDo/models"
)

func CreateSubTask(c *fiber.Ctx) error {
	var body models.SubTask

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid input"})
	}

	if body.ParentID == "" {
		return c.Status(400).JSON(fiber.Map{"message": "ParentID required"})
	}

	body.ID = uuid.NewString()

	database.DB.Create(&body)
	return c.JSON(body)
}

func UpdateSubTask(c *fiber.Ctx) error {
	id := c.Params("id")

	var sub models.SubTask
	if err := database.DB.First(&sub, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Subtask not found"})
	}

	if err := c.BodyParser(&sub); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid input"})
	}

	database.DB.Save(&sub)
	return c.JSON(sub)
}

func DeleteSubTask(c *fiber.Ctx) error {
	id := c.Params("id")

	database.DB.Delete(&models.SubTask{}, "id = ?", id)
	return c.JSON(fiber.Map{"message": "Subtask deleted"})
}