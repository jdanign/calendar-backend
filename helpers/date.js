const moment = require("moment");


const isDate = (value, {req, location, path})=>
    value && moment(value).isValid();



module.exports = {
    isDate,
}