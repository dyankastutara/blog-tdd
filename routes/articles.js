const express = require('express')
const router = express.Router()
const controllerArticle = require('../controllers/articles')

router.get('/', controllerArticle.getAll)
router.post('/', controllerArticle.insert)
router.delete('/:id', controllerArticle.delete)
router.put('/:id', controllerArticle.update)

module.exports = router