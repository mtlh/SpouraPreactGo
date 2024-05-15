package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() *sql.DB {
	// Construct connection string from environment variables
	url := os.Getenv("TURSO_DATABASE_URL") + os.Getenv("TURSO_AUTH_TOKEN")
	db, err := sql.Open("libsql", url)
	if err != nil {
		log.Fatal()
	}
	return db
}

func GetDB() *sql.DB {
	return db
}

// CREATE TABLE "User" (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nickname VARCHAR(255) DEFAULT 'guest',
//     email VARCHAR(255) DEFAULT 'null',
//     password VARCHAR(255),
//     verified BOOLEAN DEFAULT FALSE,
//     cart JSON DEFAULT '{}',
//     favourites JSON DEFAULT '{}'
// );

// CREATE TABLE "Session" (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userid INT REFERENCES "User"(id),
//     key VARCHAR(255) NOT NULL,
//     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE "Brand" (
//     name VARCHAR(255),
//     description VARCHAR(255),
//     imgurl VARCHAR(255),
//     urlslug VARCHAR(255) PRIMARY KEY
// );

// CREATE TABLE "Collection" (
//     name VARCHAR(255),
//     description VARCHAR(255),
//     imgurl VARCHAR(255),
//     urlslug VARCHAR(255) PRIMARY KEY
// );

// CREATE TABLE "Product" (
//     imgurl VARCHAR(255),
//     name VARCHAR(255),
//     price DOUBLE PRECISION,
//     urlslug VARCHAR(255) PRIMARY KEY,
//     description VARCHAR(255),
//     brand VARCHAR(255) REFERENCES "Brand"(urlslug),
//     collection VARCHAR(255) REFERENCES "Collection"(urlslug),
// 	   type CHAR(1) CHECK (type IN ('m', 'w', 'k'))
// );

// CREATE TABLE "Review" (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userid INT REFERENCES "User"(id),
//     producturlslug VARCHAR(255) REFERENCES "Product"(urlslug),
//     rating INT,
//     comment VARCHAR(255)
// );

// CREATE TABLE "Order" (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userid INT REFERENCES "User"(id),
//     producturlslug VARCHAR(255) REFERENCES "Product"(urlslug),
//     quantity INT,
//     size VARCHAR(255),
//     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
