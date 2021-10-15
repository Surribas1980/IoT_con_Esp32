const apiUrl = 'http://localhost:4000';

const requestMethods = { post: 'POST', get: 'GET', delete: 'DELETE' };
const endpoints = { envio: '/envio', recibo: '/recibo'};//desde el punto de vista de NODE


export async function fetchPrueba(){

    const datorecibido = await fetch(`${apiUrl}${endpoints.envio}`); // Recibo el dato desde el servidor
    let dato = await datorecibido.json();
    return dato;
}

export async function fetchdeReactANode(datodereactanode){
    const headers = new Headers ({ 'Content-Type': 'application/json' });
    const confirmacion = await fetch(`${apiUrl}${endpoints.recibo}`, { headers: headers, method: requestMethods.post, body: JSON.stringify(datodereactanode) })
    let contestacion = await confirmacion.json();
    console.log('está constestando: ', contestacion);
    return contestacion;
}