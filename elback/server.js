const express = require("express"); 
const cors = require("cors"); 
const mqtt = require("mqtt"); 
const WebSocket = require("ws");
const wss = new WebSocket.Server({port:8080});
//const wss = new WebSocket("wss://localhost:8080");
const app = express();
const PORT = 4000;

const http = require ("http");
const servidor = http.createServer(app);
var eventos = require ("events");
var EmisorEventos = eventos.EventEmitter;
var ee = new EmisorEventos();

var miglobal = 12;
var boleana =0;
var elId;
var otraglobal;
const client = mqtt.connect('mqtt://192.168.43.31/');


const {
    pruebaEnvio,
    pruebaRecibo,
    pruebaSocketsEnvio
} = require("./otrosarchivos");

app.use(express.json());
app.use(cors());


//--------

/*
setInterval(function(){
 ee.emit('datos',Date.now());
},1000);
ee.on('datos',function(fecha){console.log(fecha);});
*/
//----------- Comunicación serial con Arduino

//----------- Socket : 

wss.on('connection', function (socket) {

//	let socket;

  socket.on('message', function incoming(message) {
    console.log('received: %s', message);
	otraglobal = message;
//	client.publish('/casa/salon','desde dentro de socket on');
	client.publish('/topic/qos0',`esto es otra global: ${otraglobal}`);


  });

/*
setInterval(function(){
  socket.send(miglobal);
},5000);
*/
/*ee.on('event',(boleana)=>{
	if(boleana){
		console.log('boleana ',boleana);
		socket.send(miglobal);
		
		console.log('?????',boleana);

	}else{
		console.log('boleana',boleana);
	}

});*/
/*
elId = setInterval(function(){
ee.emit('event',boleana);
boleana = 0;
console.log('interval \n /n');
},1000);
*/
		client.on ('message',function(topic,message){
				let entra = message.toString();
				miglobal = entra;
				//console.log('a ver que sale dentro de wss',entra);
    				//boleana = 1;
				
				wss.once('data',()=>{
						socket.send(miglobal);
						console.log('desde mqtt >',miglobal);
					})
				wss.emit('data',()=>{return 1});

				
 		});
});

/*wss.on('open', function open(){
	ws.send('....desde open...');
});*/

//wss.on('message',function (event){console.log('estoy en addEventListener',event.data)});


app.get('/otrosocket',pruebaSocketsEnvio);

//-----------

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
  });
  
//-------- Enviar datos -----------// 

app.get("/envio",pruebaEnvio);

//-------- Recibir datos ---------// 

app.post("/recibo",pruebaRecibo)


//------- Cliente mqtt ----------//

client.on ('connect',()=>{

    console.log('conectado a cliente mqtt');
//    console.log("connected mqtt"+client.connected);
    client.subscribe('/topic/qos0');
    client.subscribe('/topic/qos1');
    client.subscribe('/casa/salon');
  //  client.publish('/casa/salon',otraglobal);
    //client.publish('/casa/salon','hello mqtt');
    /*client.publish('casa/salon/temperatura', "cambio2");
    client.end();
    console.log("end "+client.connected);
    /*client.publish('/casa/salon/temperatura', 'Hello mqtt')*/
    /*client.subscribe('presence',(err)=>{
        if(!err){
            client.publish('presence', 'Hello mqtt')
        }
    })*/
})
/*Para poder coger el resultado del broker tengo que subscribirme, Me inscribí previamente

*/




//Ejecutar npm run dev 

const serverProba = app.listen(PORT,()=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
});

//
/*
client.on ('message',function(topic,message,otraglobal){
	let entra = message.toString();
	miglobal = entra
	console.log('a ver que sale',entra);
if(otraglobal !== null){
	console.log('la global',otraglobal.topic);
}
	//ws.send('some  thing');
	//serverProba.emit('open',{value: message.toString()});
		/*	wss.on('', function connection(entra) {
		  		ws.on('message', function incoming(message) {
		    			console.log('received: %s', message);
		  		});//ws.on

		  		ws.send('something ---> desde mqtt',entra);
		});*/

// });

