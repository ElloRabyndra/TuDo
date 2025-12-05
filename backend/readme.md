# TuDo Backend API

Backend service untuk aplikasi **TuDo**, dibangun menggunakan **Go (Golang)**, **Fiber**, dan **SQLite**.

## 🛠️ Tech Stack

* **Bahasa**: Go (v1.24.5)
* **Framework**: [Fiber v2](https://gofiber.io/)
* **Database**: SQLite
* **ORM**: [GORM](https://gorm.io/)

## 📂 Struktur Folder

```text
backend/
├── config/         # Konfigurasi Environment
├── controllers/    # Logika Bisnis (Handler)
├── database/       # Koneksi Database
├── models/         # Struct & Schema Database
├── routes/         # Definisi Route API
├── main.go         # Entry Point
└── go.mod          # Dependensi

🚀 Cara Instalasi & Menjalankan
Ikuti panduan ini untuk menjalankan server backend di komputer lokal Anda.
1. Prasyarat
Pastikan Anda sudah menginstal perangkat lunak berikut:
Go (Golang): Versi 1.24 atau lebih baru.
Git: (Opsional, untuk clone repository).
2. Instalasi DependensiBuka terminal atau command prompt, lalu masuk ke direktori backend proyek ini:
cd backend
Unduh semua library yang diperlukan menggunakan perintah berikut:
go mod tidy
3. Menjalankan ServerJalankan aplikasi dengan perintah:
go run main.go
Jika berhasil, Anda akan melihat pesan berikut di terminal:
Server running on :8080
Catatan: File database tudo.db akan dibuat secara otomatis di dalam folder backend saat pertama kali dijalankan.
📡 API
Berikut adalah daftar endpoint yang tersedia:
Parent Tasks (Tugas Utama)
Method
Endpoint
Deskripsi
GET/api/parenttasks
Mengambil semua tugas utama
GET/api/parenttasks/:id
Mengambil detail tugas berdasarkan ID
POST/api/parenttasks
Membuat tugas utama baru
PUT/api/parenttasks/:id
Memperbarui tugas utama
DELETE/api/parenttasks/:id
Menghapus tugas utama
Sub Tasks (Sub-tugas)
Method
Endpoint
Deskripsi
POST/api/subtasks
Membuat sub-tugas baru
PUT/api/subtasks/:id
Memperbarui sub-tugasDELETE/api/subtasks/:id
Menghapus sub-tugas