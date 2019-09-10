'use strict';
import db from '../../models/index.js';
import { getCityName, getUserName } from '../services/getCityName'
import { getRole, redirectWithMsg } from '../services/common.js';
const Office = db.offices;
export async function editOffice(req, res) {
  console.log(req.query._id);
  let loggedUser = req.session.user
  if (loggedUser) {
    try {
      let office = await Office.findOne({
        attributes: ['id', 'userId', 'cityId'],
        where: { id: req.query._id }
      })
      office.dataValues.cityName = await getCityName(office.cityId);
      office.dataValues.userName = await getUserName(office.userId);
      console.log(office)
      res.render('base',
        {
          content: 'office/edit',
          office: office.dataValues,
          userRole: await getRole(loggedUser.id)
        });
    } catch (err) {
      res.render('base', {
        content: 'office/offices', alert: 'danger', alertMsg: err
      });
    }
  } else {
    redirectWithMsg('/login',req,res,'danger','Please Login first!')
  }
  
}

