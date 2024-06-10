const path = require('path');

/** Configuración de las variables de entorno con el paquete dotenv instalado con NPM. */
require('dotenv').config();

/** Configuración de express. */
const express = require('express');

/** CORS. */
const cors = require('cors');

/** Base de datos. */
const { dbCon } = require('./db/config');



/** Crea el servidor de express. */
const app = express();


/** Conecta con la base de datos. */
dbCon();


/** Habilita CORS. */
app.use(cors());


/** Establece un directorio público, usa el middleware 'use'. */
app.use(express.static('public'));


/** Lectura y parseo del body. Procesa las peticiones que vengan en JSON y extrae su contenido. */
app.use(express.json());



//──── RUTAS ─────────────────────────────────────────────────────────────────────────────
// Lo que haya en el la ruta del require lo habilita en la ruta del primer parámetro
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Cualquier ruta que no esté especificada anteriormente, usa la aplicación montada en el front.
app.use('*', (req, res)=>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


/** Escuchar peticiones en el puerto establecido en las variables de entorno. */
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});