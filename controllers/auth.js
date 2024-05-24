const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


/** Controlador para la ruta de registro de usuarios. */
/* const crearUsuario = (req, res=response)=>{
    const {name, email, password} = req.body;

    // Validaciones con respuesta a los errores
    if (name.length < 4)
        res.status(400).json({
            ok: false,
            msg: 'El nombre debe tener 4 letras',
        });

    // Respuesta correcta
    else
        res.json({
            ok: true,
            msg: 'Registro',
            name, 
            email,
            password,
        })
} */
const crearUsuario = async (req, res=response)=>{
    const {name, email, password} = req.body;

    try {
        // Comprueba si existe un registro con el mismo email
        if (await Usuario.findOne({email}))
            res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email',
            });

        // Crea el registro
        else{
            // Crea la instancia
            const usuario = new Usuario({name, email, password});

            // Encripta la contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);
            
            // Almacena los datos en la BD
            await usuario.save();

            // Genera JSON webtoken
            const token = await generarJWT(usuario._id, usuario.name);
    
            // Respuesta al frontend
            res.status(201).json({
                ok: true,
                uid: usuario._id,
                name: usuario.name,
                token,
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


/** Controlador para la ruta de login de usuarios. */
const loginUsuario = async (req, res=response)=>{
    const {email, password} = req.body;
    
    try {
        // Comprueba si existe un registro con el mismo email
        const usuario = await Usuario.findOne({email});

        if (!usuario)
            res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            });

        // Compara las contraseñas
        else if (!bcrypt.compareSync(password, usuario.password))
            res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con esa contraseña',
            });
        
        // El usuario existe
        else{
            // Genera JSON webtoken
            const token = await generarJWT(usuario._id, usuario.name);
    
            // Respuesta al frontend
            res.status(201).json({
                ok: true,
                uid: usuario._id,
                name: usuario.name,
                token,
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
        });
    }
}


/** Controlador para la ruta de revalidación de token. */
const revalidarToken = async (req, res=response)=>{
    const {uid, name} = req;

    // Genera JSON webtoken
    const token = await generarJWT(uid, name);

    // Establece la respuesta a la ruta 
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}