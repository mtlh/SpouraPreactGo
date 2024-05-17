package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func setup(urlstring string) []map[string]interface{} {
	request, err := http.NewRequest("GET", urlstring, nil)
	if err != nil {
		panic(err)
	}
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err)
	}
	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		panic(err)
	}
	return data
}
