const express = require('express')
const router = express.Router()
import { fetchAllOffices as allCities } from '../../controllers/office/fetchAll'
router.get('/', allCities)
module.exports = router