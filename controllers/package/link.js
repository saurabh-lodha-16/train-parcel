import { loadPackage } from "./load";
import { getRole } from "../services/common";

export async function linkPackageTrainGet(req, res) {
  let serialNo = req.query['serialNo']
  let sourceStatusId = req.query['sourceStatusId']
  let destinationStatusId = req.query['destinationStatusId']
  let trainId = req.query['trainId']

  let result = await loadPackage(serialNo, sourceStatusId, destinationStatusId, trainId)
  let user = req.session.user
  if (user) {
    if (result == 1) {
      res.render('base', {
        content: 'package/load',
        alertMsg: 'Your Package has been load to selected train.',
        alert: 'success',
        userRole: await getRole(user.id)
      })
    } else {
    }
  } else {
    res.redirect('/login')
  }
}
