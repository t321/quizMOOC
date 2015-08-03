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

    if (req.query.search === undefined) {
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index', {preguntas: quizes});
        }).catch(function (error) { next(error); });
    }else {
        var search = "%" + req.query.search + "%";
        search = search.replace(" ", "%")
        models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function (quizes) {
            res.render('quizes/index', {preguntas: quizes});
        }).catch(function (error) { next(error); });
    }

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

//GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build( // crea un objeto quiz
        {pregunta: "Pregunta", respuesta: "Respuesta"}
    );
    res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function(req, res){
    var quiz = models.Quiz.build(req.body.quiz);

    //guarda en la DB los campos pregunta y respuesta, sólamente.
    quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
        res.redirect('/quizes');
    }) //Redirección a la lista de preguntas.
};
