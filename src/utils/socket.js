import { io } from "socket.io-client";

let socket 

export const getSocket = loggedInUserId => {
     if(!loggedInUserId) return console.log("Loggedin user id is required to connect")     

    if(!socket) {
        socket = io(`${import.meta.env.VITE_API_URL}`, {
            autoConnect:false,
            auth: { sender : loggedInUserId }
        })
    }else{
        socket.auth = { sender : loggedInUserId }
    }
    return socket
}

export const sendMessage = message => {
    if(!socket?.connected) return
    socket.emit("chat:send", { ...message, fromSocketId: socket.id})
}

export const read = (chat, loggedInUserId) => {
    if(!socket?.connected) return
    socket.emit("chat:active", { chat, reader: loggedInUserId })
}

export const unread = (chat, loggedInUserId) => {
    socket.emit("chat:inactive", { chat, reader: loggedInUserId})
}