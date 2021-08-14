import { renderUpdation } from '../../controllers/profile/update'
import express from 'express'
let router = express.Router()

router.get('/', renderUpdation)

module.exports = router

