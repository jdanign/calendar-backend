const { response } = require("express");
const { validationResult } = require("express-validator");


/** Custom middleware con la respuesta de los errores. */
const validarCampos = (req, res=response, next)=>{
    const errors = validationResult(req);
    
    // Respuesta incorrecta
    if (!errors.isEmpty())
        res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });

    else
        next();
}


module.exports = {
    validarCampos,
};