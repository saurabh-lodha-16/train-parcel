import { renderRegistration, registerPackage } from '../../controllers/package/register'
import { trackGet } from '../../controllers/package/track'
import { renderUpdation, update } from '../../controllers/package/update'
import { loadPackageGet } from '../../controllers/package/load'
import { linkPackageTrainGet } from '../../controllers/package/link'
import express from 'express'
import { listPackages } from '../../controllers/package/update'
let router = express.Router()
router.get('/', listPackages)
router.get('/register', renderRegistration)
router.post('/', registerPackage)
router.get('/track/', trackGet)
router.get('/track/:serial_no', trackGet)
router.get('/update', renderUpdation)
router.put('/:id', update)
router.get('/load', loadPackageGet)
router.get('/link', linkPackageTrainGet)
module.exports = router

