import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8000;
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:5500','https://kausleshkn.github.io'],
        credentials: true
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log("A new user connected", socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('user-message', (data) => {
        io.emit('server-message', { message: data.message, userId: socket.id });
    });
});

app.get('/', (req, res) => {
    res.send('Hello user');
})


server.listen(port, () => console.log(`App listing at http://localhost:${port}`));
