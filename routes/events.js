// Ruta /api/events
const { Router } = require('express');
const router = Router();

// Validadores
const { validarJWT } = require('../middlewares/validar-jwt');

// Controladores para las rutas
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/date');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");



// Validación con middleware para todas las rutas que haya después
router.use(validarJWT);



/** Ruta para obtener eventos. */
router.get(
    '/', 
    getEventos
);


/** Ruta para crear un nuevo evento. */
router.post(
    '/', 
    [ // Middlewares
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
);


/** Ruta para actualizar un evento. */
router.put(
    '/:id', 
    [ // Middlewares
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
);


/** Ruta para borrar un evento. */
router.delete(
    '/:id', 
    eliminarEvento
);




//──── EXPORTACIÓN DE RUTAS ──────────────────────────────────────────────────────────────
module.exports = router;