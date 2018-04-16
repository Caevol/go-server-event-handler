package main

import (
	"strings"
	"fmt"
	"log"
	"mime"
	"net/http"
	"io/ioutil"
)




func handler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Connection made to: ", r.URL.Path)
	fmt.Fprintf(w, "Hi there, %s", r.URL.Path[1:])
}

func icoHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Connection made to: ", r.URL.Path)
	body, err := ioutil.ReadFile(r.URL.Path[1:])
	if err != nil {
		fmt.Println("Invalid")
		return
	}
	fmt.Fprintf(w, string(body))
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Connection made to: ", r.URL.Path)
	body, err := ioutil.ReadFile("index.html")
	if err != nil {
		fmt.Println("Missing index.html")
		return
	}
	w.Header().Set("Content-type", mime.TypeByExtension(".html"))
	fmt.Fprintf(w, string(body))
}

func loadHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("File load request for: ", r.URL.Path[1:])
	body,err := ioutil.ReadFile(r.URL.Path[1:])
	if err != nil {
		fmt.Fprintf(w, "Invalid file")
		return
	}
	w.Header().Set("Content-type", mime.TypeByExtension(r.URL.Path[strings.LastIndex(r.URL.Path, "."):]))
	fmt.Fprintf(w, string(body))

}


func main() {	
	mime.AddExtensionType(".html", "text/html")
	mime.AddExtensionType(".css", "text/css")
	mime.AddExtensionType(".js", "text/javascript")
	

	port := ":8080"


	//http.HandleFunc("/", handler)
	http.HandleFunc("/view", viewHandler)
	http.HandleFunc("/pages/", loadHandler)
	http.HandleFunc("/favicon.ico", icoHandler)
	fmt.Println("Server listening at port ", port)
	log.Fatal(http.ListenAndServe(port, nil))
}