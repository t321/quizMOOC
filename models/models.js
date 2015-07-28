var path = require('path');

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar la BBDD SQLite
var sequelize = new Sequelize(null, null, null,
        {
            dialect: 'sqlite',
            storage: 'quiz.sqlite',
        });

// Importar la definición de la tabla Quiz realizada en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// exportar definición de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function () {
    // success(...) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if(count === 0){
            return Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).then(function () {
                console.log('Base de datos inicializada');
            });
        }
    });
});
