import { Server } from "socket.io";
import * as dotenv from 'dotenv'
import express from 'express';
import http from 'http';
import cors from 'cors';

import { router } from './routes';

dotenv.config() // Load the environment variables

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on("connection", socket => {
  console.log(`Usuário conectado no socket ${socket.id}`)
});

export { serverHttp, io }