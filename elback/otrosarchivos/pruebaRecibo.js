const pruebaRecibo = async (req, res, next) => {

    try {
        
        const { datorecibido } = req.body;
    
        if(datorecibido){
            res.send({
                status:"ok",
                message: "el dato fue recibido"
            })
        }else{

            res.send({
                status:"ok",
                message: "el dato no se recibió correctamente"
            })
        }
    } catch (error) {
        throw error;
    }
}

module.exports = pruebaRecibo;