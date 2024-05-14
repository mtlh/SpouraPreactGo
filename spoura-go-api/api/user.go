package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"spoura/db"
	"spoura/funcs"
	"spoura/types"
	"strings"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Process session key if given, return user object
func UserHandler(w http.ResponseWriter, r *http.Request) {
	log.Print("UserHandler")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	// Log the request body, if it's JSON
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Error reading request body:", err)
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	// Parse the JSON body
	var requestData map[string]string
	json.Unmarshal(body, &requestData)
	// Extract data from the parsed JSON
	email := requestData["email"]
	password := requestData["password"]
	session := requestData["session"]

	// log.Print(requestData)
	if session[len(session)-1] != '=' {
		session += "="
	}
	session, err = funcs.DecryptWithPrivateKey(session)
	if err != nil {
		http.Error(w, err.Error(), http.StatusOK)
		return
	}
	log.Print(session)

	if email == "" || password == "" {
		http.Error(w, "Email or password not given", http.StatusBadRequest)
		return
	}

	parts := strings.Split(r.URL.Path, "/")

	if len(parts) < 4 {
		http.Error(w, "Key not found in URL -> follow /api/user/method", http.StatusBadRequest)
		return
	}

	if parts[3] == "signup" {
		SignupHandler(w, r, email, password, session)
	} else if parts[3] == "logout" {
		LogoutHandler(w, r, session)
	} else {
		LoginHandler(w, r, email, password, session)
	}
}

func SignupHandler(w http.ResponseWriter, r *http.Request, email string, password string, session string) {

	if !funcs.IsValidEmail(email) {
		http.Error(w, "Invalid email.", http.StatusOK)
		return
	}

	// Get linked user from session and update email/password
	db := db.InitDB()
	defer db.Close()

	rows, err := db.Query("SELECT User.id FROM User WHERE email = ?", email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var userEmailCheck types.User
	for rows.Next() {
		if err := rows.Scan(&userEmailCheck.ID); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	if userEmailCheck.ID != 0 {
		http.Error(w, "User already exists.", http.StatusOK)
		return
	}

	rows, err = db.Query("SELECT User.id, User.email, User.password FROM Session JOIN User ON Session.userid = User.id WHERE Session.key = ?", session)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var user types.User
	for rows.Next() {
		if err := rows.Scan(&user.ID, &user.Email, &user.Password); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	newPass, err := funcs.Encrypt(password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Print(user.ID)
	// log.Print(email)
	// log.Print(newPass)

	db.Exec("UPDATE User SET email = ?, password = ? WHERE id = ?", email, newPass, user.ID)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Signed up."))
}

func LoginHandler(w http.ResponseWriter, r *http.Request, email string, password string, session string) {
	// Check password and email
	db := db.InitDB()
	rows, err := db.Query("SELECT id, password FROM User WHERE email = ?", email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	defer db.Close()

	var user types.User
	for rows.Next() {
		if err := rows.Scan(&user.ID, &user.Password); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if user.Password == nil || !funcs.EncryptCheck(password, *user.Password) {
		http.Error(w, "Invalid credentials.", http.StatusOK)
		return
	}

	log.Print(user.ID)

	// Update session with user id
	db.Exec("UPDATE Session SET userid = ? WHERE key = ?", user.ID, session)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged in."))
}

func LogoutHandler(w http.ResponseWriter, r *http.Request, session string) {
	// Check password and email
	db := db.InitDB()
	db.Exec("UPDATE Session SET userid = ? WHERE key = ?", nil, session)
	defer db.Close()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged out."))
}
