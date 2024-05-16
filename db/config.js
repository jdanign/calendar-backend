const mongoose = require('mongoose');


/** Función para crear la conexión con la BD. */
const dbCon = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la BD.')
    }
}


module.exports = {
    dbCon,
}