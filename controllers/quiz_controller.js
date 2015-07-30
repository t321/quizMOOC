var models = require('../models/models.js');

//Autoload - salta si la ruta contiene :quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.findById(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz= quiz;
                next();
            }else {
                next(new Error('No existe quizId' + quizId));
            }
        }
    ).catch(function (error) { next(error); });
};


//GET /quizes
exports.index = function(req, res){
    models.Quiz.findAll().then(function (quizes) {
        res.render('quizes/index', {preguntas: quizes});
    }).catch(function (error) { next(error); });
};

//GET /quizes/:quizId
exports.show = function(req, res){
    res.render('quizes/show', {pregunta: req.quiz});
};

//GET /quizes/answer
exports.answer = function (req, res) {
    if(req.query.respuesta === req.quiz.respuesta){
        res.render('quizes/answer', {
            quiz: req.quiz,
            respuesta: 'Correcto'});
    }else {
        res.render('quizes/answer', {
            quiz: req.quiz,
            respuesta: 'Incorrecto'
            });
    }
};
