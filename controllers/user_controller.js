var users = { admin: {id: 1, username: "admin", password: "1234"},
              juanan: {id: 2, username: "juanan", password: "5678"}
            };

// Comprueba si el usuario está registrado en users
// Si la autenticación falla o hay errores se ejecuta el callback(error)
exports.authenticate = function (login, password, callback) {
    if (users[login]) {
        if (password === users[login].password) {
            callback(null, users[login]);
        } else {
            callback(new Error('Password erroneo.'));
        }
    } else {
        callback(new Error('El usuario no existe.'));
    }
};
