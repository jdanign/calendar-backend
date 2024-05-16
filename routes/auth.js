// Ruta /api/auth
const { Router } = require('express');
const router = Router();

// Validadores
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controladores para las rutas
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');




/** Ruta para el registro. */
router.post(
    '/new', 
    [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email debe tener un formato adecuado').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres').isLength({min:6}),
        validarCampos,
    ], 
    crearUsuario
);


/** Ruta para el inicio de sesión. */
router.post(
    '/', 
    [ // Middlewares
        check('email', 'El email debe tener un formato adecuado').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres').isLength({min:6}),
        validarCampos,
    ],
    loginUsuario
);


/** Ruta para renovar el token. */
router.get(
    '/renew', 
    [ // Middlewares
        validarJWT,
    ],
    revalidarToken
);




//──── EXPORTACIÓN DE RUTAS ──────────────────────────────────────────────────────────────
module.exports = router;