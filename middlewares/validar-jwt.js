const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = (req, res=response, next)=>{
    // Lee el 'x-token' desde el header HTTP recibido
    const token = req.header('x-token');

    if (!token)
        res.status(401).json({
            ok: false,
            msg: 'No existe el token en la petición',
        });

    else{
        try {
            // Verifica el token (si se cambia algún carácter de 'SECRET_JWT_SEED' se invalidan los tokens existentes y sería necesario renovarlos)
            const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
            
            // Añade los datos necesarios a la respuesta que se da al frontend
            req.uid = uid;
            req.name = name;

            next();
            
        } catch (error) {
            console.log(error)
            res.status(401).json({
                ok: false,
                msg: 'Token no válido',
            });
        }
    }
}


module.exports = {
    validarJWT,
}