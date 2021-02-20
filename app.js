const express = require('express');
const socket = require('socket.io')

const app = express()

//Body Parser
app.use(express.urlencoded({extended: true}))

//Serving static files
app.use(express.static('public'))

//PORT
const PORT = 8000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`))

// Socket setup
const io = socket(server)


io.on('connection', (socket) => {
    console.log('Connection made...', socket.id)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})

