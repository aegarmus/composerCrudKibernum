const REGEX_PATRON = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ\s]+$/,
    date: /^[0-2]{1}[0-9]{3}$/
}


export class Validate {

    static name(name, fieldName) {
        if(!name.trim() || typeof name !== 'string') throw new Error(`El campo ${fieldName} es obligatorio`)

        if(!REGEX_PATRON.name.test(name.trim())) throw new Error(`El campo ${fieldName} debe contener solo letras`)
        return name.trim()
    }

    static date(date, fieldName) {
        if(!date.trim() || typeof date !== 'string') throw new Error(`El campo ${fieldName} es obligatorio`)
        if(!REGEX_PATRON.date.test(date.trim())) throw new Error(`El campo ${fieldName} debe contener solo números`)
        return date.trim()
    }
}