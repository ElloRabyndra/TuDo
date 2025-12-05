package models

import "time"

type ParentTask struct {
    ID           string     `gorm:"primaryKey"`
    Title        string
    Priority     string
    Label        string
    Status       string
    CreatedAt    time.Time
    DeadlineDate *time.Time
    DeadlineTime *string

    SubTasks []SubTask `gorm:"foreignKey:ParentID;constraint:OnDelete:CASCADE"`
}
