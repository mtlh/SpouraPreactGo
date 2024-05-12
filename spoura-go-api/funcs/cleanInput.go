package funcs

import (
	"regexp"
	"strconv"
)

func CleanString(s string) string {
	reg := regexp.MustCompile("[^a-zA-Z-0-9]+")
	cleaned := reg.ReplaceAllString(s, "")
	return cleaned
}

func CleanWithQueryString(s string) string {
	reg := regexp.MustCompile("[^a-zA-Z0-9 -]+")
	cleaned := reg.ReplaceAllString(s, "")
	return cleaned
}

func StringOnly(s string) string {
	reg := regexp.MustCompile("[^a-z]+")
	cleaned := reg.ReplaceAllString(s, "")
	return cleaned
}

func NumberOnly(s string) int {
	reg := regexp.MustCompile("[^0-9]+")
	result := reg.ReplaceAllString(s, "")
	i, err := strconv.Atoi(result)
	if err != nil {
		return 0
	}
	return i
}
