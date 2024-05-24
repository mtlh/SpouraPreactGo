package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"
)

func setup(urlstring string, t *testing.T) []byte {
	request, err := http.NewRequest("GET", urlstring, nil)
	if err != nil {
		t.Error(err)
	}
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		t.Error(err)
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Error(err)
	}
	return body
}

func setupJSON(urlstring string, t *testing.T) []map[string]interface{} {
	body := setup(urlstring, t)
	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		t.Error(err)
	}
	return data
}
