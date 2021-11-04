import { Server } from "socket.io";
import { serverHttp } from "./app";

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on("connection", socket => {
  console.log(`Usuário conectado no socket ${socket.id}`)
});

export { io };