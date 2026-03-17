import { ValidatorError } from "./errors.util.js"

const REGEX_PATRON = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ\s]+$/,
    date: /^[0-2]{1}[0-9]{3}$/
}


export class Validate {

    static name(name, fieldName) {
        if(!name.trim() || typeof name !== 'string') throw new ValidatorError('Error al validar el texto' ,`El campo ${fieldName} es obligatorio`)

        if(!REGEX_PATRON.name.test(name.trim())) throw new ValidatorError('Error al validad el texto', `El campo ${fieldName} debe contener solo letras`)
        return name.trim()
    }

    static date(date, fieldName) {
        if(!date.trim() || typeof date !== 'string') throw new ValidatorError('Error al validar la fecha', `El campo ${fieldName} es obligatorio`)
        if(!REGEX_PATRON.date.test(date.trim())) throw new ValidatorError('Error al validar la fecha', `El campo ${fieldName} debe contener solo números`)
        return date.trim()
    }
}