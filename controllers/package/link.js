import { loadPackage } from "./load";

export async function linkPackageTrainGet(req, res) {
    let serialNo = req.params['serialNo']
    let sourceStatusId = req.params['sourceStatusId']
    let destinationStatusId = req.params['destinationStatusId']
    let trainId = req.params['trainId']

    let result = await loadPackage(serialNo, sourceStatusId, destinationStatusId, trainId)
    console.log(result, '================================================')
    if (result == 1) {
        res.render('base', {
            content: 'package/load',
            alertMsg: 'Your Package has been load to selected train.',
            alert: 'success'
        })
    } else {

    }
}