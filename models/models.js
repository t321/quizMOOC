var path = require('path');

//Postgres: DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite: DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = (url[6] || null);
var user        = (url[2] || null);
var pwd         = (url[3] || null);
var protocol    = (url[1] || null);
var dialect     = (url[1] || null);
var port        = (url[5] || null);
var host        = (url[4] || null);
var storage     = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar la BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
        {
            dialect: protocol,
            protocol: protocol,
            port: port,
            host: host,
            storage: storage,   //sólo SQLite (.env)
            omitNull: true      //sólo Postgres
        });

// Importar la definición de la tabla Quiz realizada en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
// Importar la definición de la tabla Comments realizada en comments.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//Relación 1 a N
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar definición de la tabla Quiz
exports.Quiz = Quiz;
// Exportar definición de la tabla Comment
exports.Comment = Comment;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function () {
    // success(...) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if(count === 0){
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa'
            }).then(function () {
                console.log('Base de datos inicializada');
            });
        };
    });
});
