const registerRule = {
    "email": "required|email",
    "password": "required|string|min:8",
    "currentCountry": "required|string",
    "username": "required|string"
}

const loginRule = {
    "email": "required|email",
    "password": "required|string|min:8"
}

const recoverRule = {
    "email": "required|email",

}

const validatePass = {
    "recoverHash": "required|string",
    "password": "required|min:8"
}

const validateProfileUpdate = {
    "username": "required|string",
    "lastname": "required|string",
    "phoneNumber": "required|string",
    "birthdate": "required|string",
    "occupation": "required|string",
    "birthCountry": "required|string",
    "currentCountry": "required|string",
    "documentDate": "required|string",
    "documentNumber": "required|string",
    "documentType": "required|string",
    "address": "required|string",
    "city": "required|string",
    "password": "string|min:8",
    "newPassword": "string|min:8"
}

let createExchange = {
    "sourceName": "required|string",
    "targetName": "required|string",
    "finalValue": "required|numeric",
    "comission": "required|numeric",
    "type": "required|string"
}


export {
    registerRule,
    loginRule,
    recoverRule,
    validatePass,
    validateProfileUpdate,
    createExchange
}

