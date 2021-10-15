import { fetchdeReactANode } from '../http/api';

export function datoAEnviar(dato){
    
    let entradaaobj = {
        datorecibido: document.getElementById("dato").value
    }
    fetchdeReactANode(entradaaobj);
  
}