const express = require('express')
const router = express.Router()

import { addStatus } from '../../controllers/status/add'
import { updateStatus } from '../../controllers/status/update'
import { editStatus } from '../../controllers/status/edit'


router.get('/', (req, res, next) => {
  res.render('status/status')
})

router.get('/add', function (req, res, next) {
  res.render('status/add')
})

router.post('/add', addStatus)
router.get('/edit', editStatus)
router.put('/:id', updateStatus)

module.exports = router

