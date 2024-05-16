const jwt = require('jsonwebtoken');


/**
 * Genera un token según los parámetros recibidos. 
 * @param {string} uid UID del usuario.
 * @param {string} name Nombre del usuario.
 * @returns Promesa con el token en caso de que se haya resuelto o un mensaje de error.
 */
const generarJWT = (uid, name)=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid, name};

        // Firma el token
        jwt.sign(
            payload, 
            process.env.SECRET_JWT_SEED, 
            {
                expiresIn: '2h',
            },
            (err, token)=>{
                if (err){
                    console.log(err);
                    reject('No ha sido posible generar el token');
                }
                else
                    resolve(token);
            }
        );
    });
}


module.exports = {
    generarJWT,
}