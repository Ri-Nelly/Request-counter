import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import requestIp from 'request-ip';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    contentType: 'text/plain',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT']
};

app.use('/', cors(corsOptions));
app.use(express.static('public'));

let requests = new Map([]);

app.get('/', (req, res) => {
    requests = new Map([]);
    res.sendFile(__dirname + '/index.html');
});

app.post('/message', (req, res) => {
    const clientIp = requestIp.getClientIp(req);

    const count = requests.get(clientIp);
    requests.set(clientIp, count ? count+1 : 1);

    const arr = Array.from(requests, item => {
        return { ip: item[0], count: item[1] };
    });

    io.emit('request', JSON.stringify(arr));

    res.statusCode = 200;
    res.send('success');
});

server.listen(3000, '127.0.0.1',() => {
    console.log('Сервер запущен 127.0.0.1:3000');
});