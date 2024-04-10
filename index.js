const express = require('express'),
	app = express(),
	http = require('http').createServer(app),
	path = require('path'),
	fs = require('fs')
var all_requests = 0,
	per_requests = 0

require('events').EventEmitter.defaultMaxListeners = Infinity

app.use(express.static(path.join(__dirname, 'assets/')))

app.get('/stats', (req, res) => {
	res.header("Content-Type", "text/event-stream")
	res.header("Cache-Control", "no-cache")
	res.header("Connection", "keep-alive")

	// Sending initial data
	res.write(`data: ${per_requests}\n\n`)

	// Setup interval to push updates
	const interval = setInterval(() => {
		res.write(`data: ${per_requests}\n\n`)
	}, 1000)

	// Clean up when connection is closed
	req.on('close', () => clearInterval(interval))
})

app.get('/attack', (req, res) => {
	all_requests++
	per_requests++
	res.sendStatus(403)
})

setInterval(async() => {
	const config = await fs.readFileSync('stats.json', 'utf8')
	if(per_requests >= JSON.parse(config).max_requests) {
		fs.writeFileSync('stats.json', JSON.stringify({
			max_requests: per_requests
		}))
	}
	per_requests = 0
}, 1000)

setInterval(() => all_requests = 0, 1000 * 86400)

http.listen(8080)