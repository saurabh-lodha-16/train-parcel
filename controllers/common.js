'use strict';
import db from '../models/index.js';
export function getRole(userId) {
  db.roleAssigns.findOne({
    attribute : [roleId],
    where: {userId: userId} 
  }).then((role) => {
    if(role != null){
      db.roles.findOne({
        attribute : [roleId],
        where: {roleId: role.datavalues.roleId} 
      }).then((role) => {
        return role;
      })
    }
  });
}