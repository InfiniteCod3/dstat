# Use the latest Golang base image
FROM golang:latest AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Compile the binary executable
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o dstat .

# Start a new stage from scratch
FROM alpine:latest  

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/dstat .

# Command to run the executable
CMD ["./dstat"]
