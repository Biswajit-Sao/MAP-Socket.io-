const express=require("express")
const http=require("http")
const socketio=require("socket.io")
const app=express()
const path = require('path');
const server=http.createServer(app)

const io=socketio(server)

app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    res.render('index');
})

server.listen(3000,()=>{
    console.log("Server is start in port:3000")
})