const bcript = require('bcrypt');


// Función para encriptar una contraseña
async function encryptPassword(password) {
    const saltRounds = 10; // Número de rondas de sal
    const hashedPassword = await bcript.hash(password, saltRounds);
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

