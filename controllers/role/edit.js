import db from '../../models'
import { getRole } from '../services/common'
import { redirectWithMsg } from '../services/common'

let roles = db['roles']

export async function renderEditRole(req, res) {
  let loggedUser = req.session.user
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        let roleInstance = await roles.findOne({ where: { id: req.query.role_id } })
        res.render('base', {
          content: 'role/edit.ejs',
          name: roleInstance.name,
          level: roleInstance.level,
          role_id: req.query.role_id,
          userRole: await getRole(loggedUser.id)
        })
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(403).send('Unauthorized Access!! Please Login with Admin Role')
    }
  } else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
  }
}

export async function editRole(req, res) {
  let loggedUser = req.session.user
  let roleArray = await roles.findAll({
    attributes: ['id', 'name', 'level']
  })
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        if (!(req.body.name && req.body.level)) {
          throw "Please fill out required fields."
        }
        let roleInstance = await roles.findOne({ where: { id: req.params.role_id } })
        await roles.update(
          { name: req.body.name, level: req.body.level },
          { where: { id: req.params.role_id } }
        )
        roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        })
        redirectWithMsg('/roles', req, res, 'success', 'Role successfully editted.')
      } catch (err) {
        res.status(500)
        redirectWithMsg('/roles', req, res, 'danger', err)
      }
    } else {
      res.status(403).send('Unauthorized Access')
    }
  } else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
  }
}

