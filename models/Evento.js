const { Schema, model } = require('mongoose');


/** Definición de los campos. */
const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});


/** 
 * Modifica cómo se muestra el objeto al serializarlo en JSON. 
 * No muestra las propiedades '__v' y '_id'.
 * Añade la propiedad 'id' asignándole el valor de '_id'.
 */
EventoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;
})


module.exports = model('Evento', EventoSchema);