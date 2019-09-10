import db from '../../models/index.js';
const notifier = require('node-notifier');
import { accountSid, authToken } from '../../config/twilio'

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
    }
  } else {
    return
  }
}

export function desktopNotification(title, message) {
  notifier.notify({
    title: title,
    message: message,
    wait: true
  });
  notifier.on('click', function (notifierObject, options, event) {
  });

}


export function sendWAmsg(phone, msg) {

  //TODO: to be shifted to external file
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

export function redirectWithMsg(url, req, res, alert, alertMsg) {
  req.flash('alert', alert)
  req.flash('alertMsg', alertMsg);
  res.redirect(url);
}