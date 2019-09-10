'use strict';
import db from '../../models/index.js';
const notifier = require('node-notifier');
export async function getRole(userId) {
  let roleAssign = await db.roleAssigns.findOne({
    where: { userId: userId },
    include: [{ model: db.roles }]
  })
  if (roleAssign != null) {
    let role = await db.roles.findOne({
      where: { id: roleAssign.roleId }
    })

    if (role != null) {
      return role.name;
    } else {
      return
      // throw console.error('Role doesnt exist');
    }
  } else {
    return
    // throw console.error('User doesnt exist');
  }
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


export function sendWAmsg(phone, msg) {

  //TODO: to be shifted to external file
  const accountSid = 'AC4eecddeed388af0beb36880bd18938f7';
  const authToken = '7f5b9c3fff5b2a8fec1eda34c705ef4f';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: msg,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+91${phone}`
    })
    .then(message => console.log(message.sid))
    .done();

}


// export async function getRole(userId) {
//   let roleAssign = await models.roleAssigns.findOne({
//     include: [{ model: models.roles }],
//     where: {
//       userId: userId
//     }
//   })
//   return roleAssign.roles[0].name
// }

export function redirectWithMsg(url, req, res, alert, alertMsg) {
  req.flash('alert', alert)
  req.flash('alertMsg', alertMsg);
  res.redirect(url);
}