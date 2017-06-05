const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')

router.get('/', controllerUser.getAll)
router.post('/', controllerUser.insert)
router.delete('/:id', controllerUser.delete)
router.put('/:id', controllerUser.update)

module.exports = router