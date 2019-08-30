import { loadPackage } from "./load";
import { getRole } from "../common";

export async function linkPackageTrainGet(req, res) {
    let serialNo = req.params['serialNo']
    let sourceStatusId = req.params['sourceStatusId']
    let destinationStatusId = req.params['destinationStatusId']
    let trainId = req.params['trainId']

    let result = await loadPackage(serialNo, sourceStatusId, destinationStatusId, trainId)
    let user = req.session.user
    // console.log(result, '================================================')
    if(user){
        if (result == 1) {
            res.render('base', {
                content: 'package/load',
                alertMsg: 'Your Package has been load to selected train.',
                alert: 'success',
                userRole: await getRole(user.id)
            })
        } else {
    
        }
    }else{
        res.redirect('/login')
    }
    
}
