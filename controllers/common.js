'use strict';
import db from '../models/index.js';
const notifier = require('node-notifier');
export function getRole(userId) {
  db.roleAssigns.findOne({
    attribute: [roleId],
    where: { userId: userId }
  }).then((role) => {
    if (role != null) {
      db.roles.findOne({
        attribute: [roleId],
        where: { roleId: role.datavalues.roleId }
      }).then((role) => {
        if (role != null) {
          return role;
        } else {
          throw console.error('Role doesnt exist');
        }
      })
    } else {
      throw console.error('User doesnt exist');
    }
  });
}

export function desktopNotification(title, message) {
  notifier.notify({
    title: title,
    message: message,
    wait: true
  });
  notifier.on('click', function (notifierObject, options, event) {
    // Triggers if `wait: true` and user clicks notification
    console.log('clicked');
  });

}