const WebSocket = require("ws");

const wss = new WebSocket.Server({port:8090})

const pruebaSocketsEnvio = async (req,res,next)=>{
    wss.on('connection', function connection(ws){
        ws.on('message', function incoming(data){
            console.log('esto es lo que envia dos',data.toString());
        })
    })
}
module.exports = pruebaSocketsEnvio;