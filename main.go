package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/ws", wsHandler)
	http.HandleFunc("/", httpHandler)

	corsHandler := cors.Default().Handler(http.DefaultServeMux)

	fmt.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade:", err)
		return
	}
	defer conn.Close()

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read:", err)
			break
		}
		log.Printf("recv: %s", message)

		err = conn.WriteMessage(mt, message)
		if err != nil {
			log.Println("Write:", err)
			break
		}
	}
}

func httpHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Golang version of the project!")
}
