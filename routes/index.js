var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var author = require('../controllers/author');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload para el parámetro quizId
router.param('quizId', quizController.load);

// rutas para la sesión
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

//Rutas para quizes
router.get('/quizes', quizController.index);
//router.get('/quizes/question', quizController.question);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
router.get('/quizes/:quizId(\\d)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d)/comments', commentController.create);

router.get('/author', author.author);

module.exports = router;
