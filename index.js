require('dotenv').config()

const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')
const routes = require('./Routes/router')
const { connectDB } = require('./DB/connection')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use(routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const PORT =  3003 || process.env.PORT

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

// Start the server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Daily Server Started at port ${PORT} and waiting client request`);
    })
}).catch(err => {
    console.error('Failed to connect to database:', err)
})
