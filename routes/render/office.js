const express = require('express')
const router = express.Router()
import { updateOffice } from '../../controllers/office/update'
import { editOffice } from '../../controllers/office/edit'
import { cityAssign } from '../../controllers/office/cityAssign'
import { getRole, redirectWithMsg } from '../../controllers/services/common'

router.get('/', async (req, res, next) => {
  let user = req.session.user
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/offices',
      userRole: await getRole(user.id)
    })
  } else {
    redirectWithMsg('../login', req, res, 'danger', 'Please Login first!')
  }

})

router.get('/add', async (req, res, next) => {
  let user = req.session.user
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
      userRole: await getRole(user.id)
    })
  } else {
    redirectWithMsg('../login', req, res, 'danger', 'Please Login first!')
  }
})

router.get('/edit', editOffice)
router.put('/:id', updateOffice)


router.get('/add', async (req, res, next) => {
  let user = req.session.user
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
      userRole: await getRole(user.id)
    })
  } else {
    redirectWithMsg('../login', req, res, 'danger', 'Please Login first!')
  }
})
router.post('/', cityAssign)
module.exports = router

