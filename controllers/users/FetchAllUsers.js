'use strict';
import db from '../../models/index.js';
const Users = db.users;
export function fetchAllUsers(req, res) {
  try {
    Users.findAll({
      attributes: ['id', 'name']
    }).then((user) => {
      res.send(user);
    })
  } catch (error) {
    res.send(error);
  }
}

