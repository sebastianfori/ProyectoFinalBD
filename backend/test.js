const bcript = require('bcrypt');


// Función para encriptar una contraseña
async function encryptPassword(password) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await bcript.genSalt(saltRounds);
    const hashedPassword = await bcript.hash(password, salt);
    return hashedPassword;
}

// Función para comparar una contraseña con un hash
async function comparePassword(password, hash) {
    const isMatch = await bcript.compare(password, hash);
    return isMatch;
}

encryptPassword('123456')
    .then(hashedPassword => {
        console.log('Contraseña encriptada:', hashedPassword);
        return comparePassword('123456', hashedPassword);
    })
    .then(isMatch => {
        console.log('¿Las contraseñas coinciden?', isMatch);
    })
    .catch(err => {
        console.error('Error:', err);
    });

    $2a$10$0abS/XKtb0LVglSPaBS/6.F2PES6ckVKBIwDAtAvFTEXZdv0jRfWa
    $2b$10$1d9D.mqL/IOHr6HtGrMxNuTgLRkX5pMtpZBlVVw.yVhvFSSuFgsZW