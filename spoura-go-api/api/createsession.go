package api

import (
	"log"
	"net/http"
	"spoura/db"
	"spoura/funcs"
	"strconv"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Create and return a new session key

func CreateSessionHandler(w http.ResponseWriter, r *http.Request) {

	NewSessionKey := funcs.GenerateRandomString(10)
	encryptedStr, err := funcs.EncryptWithPrivateKey(NewSessionKey)
	if err != nil {
		log.Print("Error encrypting:", err)
		return
	}

	db := db.InitDB()
	result, err := db.Exec("INSERT INTO USER DEFAULT VALUES")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	userID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = db.Exec("INSERT INTO SESSION(USERID, KEY) VALUES (?, ?)", strconv.Itoa(int(userID)), NewSessionKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(encryptedStr))
}
