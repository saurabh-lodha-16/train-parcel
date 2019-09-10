'use strict';
import db from '../../models/index.js';
import { redirectWithMsg } from '../services/common.js';
const Office = db.offices;
export function cityAssign(req, res) {
  try {
    Office.findOne({
      attributes: ['id', 'userId', 'cityId'],
      where: {
        userId: req.body.user
      }
    }).then((office) => {
      if (office == null) {
        Office.create({
          userId: req.body.user,
          cityId: req.body.city
        }).then(() => {
          redirectWithMsg('/offices',req,res,'success','Successfully Assigned')
          res.redirect('/offices');
        });
      } else {
        Office.update({
          cityId: req.body.city
        }, { where: { userId: req.body.user } }).then(() => {
          redirectWithMsg('/offices',req,res,'success','Successfully Updated')
        });
      }
    })
  } catch (err) {
    redirectWithMsg('/offices',req,res,'danger',err)
  }
}

