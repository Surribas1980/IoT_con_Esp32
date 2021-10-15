const pruebaEnvio = async (req, res, next) => {
    try{

        res.send({
            enviouno:2
        })
    }catch(error){
        console.error();
    }
}

module.exports = pruebaEnvio;