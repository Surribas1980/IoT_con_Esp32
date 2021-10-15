import {useState, useEffect} from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { fetchPrueba } from './http/api';
import { datoAEnviar } from './funciones/helpers';
//import { MqttClient } from 'mqtt';

import mqtt from 'mqtt';

import './App.css';
import BotonEnvioDato from './componentes/BotonEnvioDato';
import BotonSocket from './componentes/BotonSocket';




export default function App() {
  const [connectionStatus,setConnectionStatus] = useState("");
  const [messages,setMessages] = useState([]);
  let socket = new WebSocket('ws://localhost:8080');

  const [response, setResponse] = useState("");

  useEffect (()=> {
    const probar = async() => {
      const datorecibido = await fetchPrueba();
      console.log('esto es lo recibido: ',datorecibido)
    }
    probar();
	socket.addEventListener('open', function (event) {
    socket.send('Hello una vez?!');
	});
//	const client = mqtt.connect('mqtt://192.168.43.31');
/*	client.on('connect',()=>{setConnectionStatus(true);
				console.log('conectado');
		});*/
//	client.on('message',(topic,payload,packet)=>{setMessages(messages.concat(payload.toString()));});
  },[]);

let envio = ()=>{socket.send('hadjñañj');};


 /*socket.addEventListener('message', function (event) {
    console.log('Mensaje recibido con addEventListener, evento message ', event.data);
});*/

     socket.onmessage = e => {console.log('recibo con onmessage',e.data)};
     socket.on = e => {console.log('--->recibo do serverd on',e.data)}
 
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <input name="dato" type="text" id="dato"></input>
      <BotonEnvioDato funcion={datoAEnviar}/>
      // {/* Aquí me sale una línea: Line 22:7:  React Hook useEffect has a missing dependency: 'dirUrl'. Either include it or remove the dependency array  react-hooks/exhaustive-deps  */}
      <p>
      It's <time dateTime={response}>{response}</time>
    </p>
	
        
       
	<button onClick={envio}>Enviar</button>
   
    </div>
  );
}
