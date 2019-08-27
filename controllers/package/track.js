import { getPackageStatus } from './status'
export async function trackGet(req, res) {
    let serial_no = req.params['serial_no']
    if (serial_no) {
        try {
            let status = await getPackageStatus(serial_no)

            let len = status.length
            let covered = 0;
            // let diffMins =1
            // let diffCurrMins = 0
            // if (status.length > 1) {
            //     let sTime = new Date(status[0].time)
            //     let dTime = new Date(status[len - 1].time);
            //     let currTime = new Date();
            //     diffMins = getDiffMins(sTime, dTime)
            //     diffCurrMins = getDiffMins(sTime, currTime)
            // }
            // console.log(diffCurrMins * 100 / diffMins, '-0000000000000000000000000000')

            if (len > 1) {
                for (let id in status) {
                    if (status[id].isLive) {
                        break;
                    } else {
                        covered += 1
                    }
                }
            }

            res.render('base', {
                content: 'package/track',
                status: status,
                percent: covered * 100 / len
                // percent: diffCurrMins * 100 / diffMins
            })
        } catch (e) {
            res.render('base', {
                content: 'package/search',
                alert: 'danger',
                alertMsg: 'Enter a Valid Serial number!'
            })
        }
    } else {
        res.render('base', {
            content: 'package/search'
        })
    }

}


function getDiffMins(sTime, dTime) {
    let diffMs = dTime - sTime
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}