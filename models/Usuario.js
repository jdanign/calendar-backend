const { Schema, model } = require('mongoose');


/** Definición de los campos. */
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


module.exports = model('Usuario', UsuarioSchema);