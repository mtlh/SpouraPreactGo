package main

import (
	"testing"
)

// TestCreateSession tests the creation of a session
func TestCreateSession(t *testing.T) {
	data := setup("https://spoura-go-api.vercel.app/api/createsession", t)
	if data == nil {
		t.Error("Session has no key.")
	}
	// decryptedStr, err := funcs.DecryptWithPrivateKey(string(data))
	// if err != nil {
	// 	t.Error(err)
	// }
}
