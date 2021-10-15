import { useState,useEffect } from "react";


export default function BotonSocket(props) {
    const [mensaje,setMensaje] = useState('Hola dos');
    const dirUrl = props.dir;

    /*useEffect(()=>{
        dirUrl.onopen = () => {
            console.log('Conectado');
        }

        dirUrl.onmessage = (e) =>{
            const message = JSON.parse(e.data);
            setMensaje(message);
        }
        return () => {
            dirUrl.onclose = () => {
                console.log('desconectado');
            }
        }
    },[mensaje]);*/

    const enviar = (msg)=>{
        dirUrl.send(JSON.stringify(msg))
      };
    return (
        <div>
                <form action="" onSubmit={e => {
                    e.preventDefault();
                    enviar(mensaje);
                }}>
                <input
                            type="text"
                            placeholder={'Type a message ...'}
                            value={mensaje}
                            onChange={e => setMensaje(e.target.value)}
                        />
                        <input type="submit" value={'Enviar dos'} />
                </form>
          </div>
    )
}