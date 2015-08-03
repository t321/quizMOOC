var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var author = require('../controllers/author');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload para el parámetro quizId
router.param('quizId', quizController.load);

//Rutas para quizes
router.get('/quizes', quizController.index);
//router.get('/quizes/question', quizController.question);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/author', author.author);


module.exports = router;
