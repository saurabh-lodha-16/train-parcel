'use strict';
import db from '../../models/index.js';
import { getCityName, getUserName } from '../getCityName'
import { getRole } from '../common.js';
const Office = db.offices;
export async function editOffice(req, res) {
  console.log(req.query._id);
  try {
    let office = await Office.findOne({
      attributes: ['id', 'userId', 'cityId'],
      where: { id: req.query._id }
    })
    console.log(office)
    office.dataValues.cityName = await getCityName(office.cityId);
    office.dataValues.userName = await getUserName(office.userId);
    console.log(office)
    res.render('base',
      {
        content: 'office/edit',
        office: office.dataValues,
        userRole: await getRole(user.id)
      });
  } catch (err) {
    res.render('base', { alert: 'danger', alertMsg: err });
  }
}