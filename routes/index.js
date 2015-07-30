var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var author = require('../controllers/author');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes', quizController.index);
//router.get('/quizes/question', quizController.question);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', author.author);

module.exports = router;
