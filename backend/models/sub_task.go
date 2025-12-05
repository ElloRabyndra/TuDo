package models

type SubTask struct {
    ID        string `gorm:"primaryKey"`
    ParentID  string `gorm:"not null;index"`
    Title     string
    Completed bool
}
