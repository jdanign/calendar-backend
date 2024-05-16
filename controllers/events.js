const { response } = require('express');
const Evento = require('../models/Evento');


/** Controlador para la ruta de obtener eventos. */
const getEventos = async (req, res=response)=>{
    try {
        // Obtiene los eventos, añadiendo la información del usuario asociado al id que tiene almacenado el evento
        const eventos = await Evento.find().populate('user', 'name');

        // Establece la respuesta a la ruta 
        res.json({
            ok: true,
            eventos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


/** Controlador para la ruta de crear un nuevo evento. */
const crearEvento = async (req, res=response)=>{
    try {
        const evento = Evento({...req.body, user:req.uid});
        // Almacena el evento en la base de datos
        const eventoGuardado = await evento.save();

        // Establece la respuesta a la ruta 
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


/** Controlador para la ruta de actualizar un evento. */
const actualizarEvento = async (req, res=response)=>{
    try {
        const eventoId = req.params.id;
        // Obtiene los eventos, añadiendo la información del usuario asociado al id que tiene almacenado el evento
        const evento = await Evento.findById(eventoId);

        // Establece la respuesta a la ruta 
        if (!evento)
            res.status(404).json({
                ok: false,
                msg: 'No existe ningún evento con ese ID'
            });
        // Error si la persona que actualiza no es la propietaria del evento
        else if (evento.user.toString() !== req.uid)
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        // Respuesta correcta
        else{
            const eventoActualizado = await Evento.findByIdAndUpdate(
                eventoId, 
                {
                    ...req.body, 
                    user: req.uid
                }, 
                {new:true} // Con esta propiedad en true, se devuelve el evento actualizado, de lo contrario devuelve el evento que existía anteriormente en la BD
            );

            res.status(201).json({
                ok: true,
                evento: eventoActualizado,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


/** Controlador para la ruta de eliminar un evento. */
const eliminarEvento = async (req, res=response)=>{
    try {
        const eventoId = req.params.id;
        // Obtiene los eventos, añadiendo la información del usuario asociado al id que tiene almacenado el evento
        const evento = await Evento.findById(eventoId);

        // Establece la respuesta a la ruta 
        if (!evento)
            res.status(404).json({
                ok: false,
                msg: 'No existe ningún evento con ese ID'
            });
        // Error si la persona que actualiza no es la propietaria del evento
        else if (evento.user.toString() !== req.uid)
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        // Respuesta correcta
        else{
            const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

            if (eventoEliminado)
                res.status(201).json({
                    ok: true,
                    msg: 'Evento eliminado: ' + eventoId
                });
            else
                res.status(404).json({
                    ok: true,
                    msg: 'No se ha encontrado el evento'
                });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}