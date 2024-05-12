package funcs

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func Encrypt(str string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	hashedStr := string(hashedBytes)
	return hashedStr, nil
}

func EncryptCheck(str, hashedStr string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedStr), []byte(str))
	return err == nil
}

func EncryptWithPrivateKey(data string) (string, error) {
	key, err := base64.StdEncoding.DecodeString(os.Getenv("SESSION_KEY"))
	if err != nil {
		return "", err
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return "", err
	}
	encryptedData := gcm.Seal(nonce, nonce, []byte(data), nil)
	encryptedString := base64.StdEncoding.EncodeToString(encryptedData)
	return encryptedString, nil
}

func DecryptWithPrivateKey(encryptedData string) (string, error) {
	key, err := base64.StdEncoding.DecodeString(os.Getenv("SESSION_KEY"))
	if err != nil {
		return "", err
	}
	encryptedBytes, err := base64.StdEncoding.DecodeString(encryptedData)
	if err != nil {
		return "", err
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonceSize := gcm.NonceSize()
	if len(encryptedBytes) < nonceSize {
		return "", errors.New("encrypted data too short")
	}
	nonce, ciphertext := encryptedBytes[:nonceSize], encryptedBytes[nonceSize:]
	decryptedData, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}
	decryptedString := string(decryptedData)
	return decryptedString, nil
}

func GenerateRandomString(length int) string {
	bytesNeeded := (length * 6) / 8
	randomBytes := make([]byte, bytesNeeded)
	_, err := rand.Read(randomBytes)
	if err != nil {
		fmt.Printf("Cannot create random string...")
	}
	randomStr := base64.URLEncoding.EncodeToString(randomBytes)
	if len(randomStr) > length {
		randomStr = randomStr[:length]
	}

	return randomStr
}
