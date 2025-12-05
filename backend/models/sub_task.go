package models

type SubTask struct {
	ID        string `gorm:"primaryKey" json:"id"`
	ParentID  string `gorm:"not null;index" json:"parentId"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}
