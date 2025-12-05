package models

import "time"

type ParentTask struct {
	ID           string     `gorm:"primaryKey" json:"id"`
	Title        string     `json:"title"`
	Priority     string     `json:"priority"`
	Label        string     `json:"label"`
	Status       string     `json:"status"`
	CreatedAt    time.Time  `json:"createdAt"`
	DeadlineDate *time.Time `json:"deadlineDate"`
	DeadlineTime *string    `json:"deadlineTime"`

	SubTasks []SubTask `gorm:"foreignKey:ParentID;constraint:OnDelete:CASCADE" json:"subTasks"`
}
