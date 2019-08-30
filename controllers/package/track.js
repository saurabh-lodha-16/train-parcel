import { getPackageStatus } from './status'
import { getRole } from '../common';
export async function trackGet(req, res) {
    let serial_no = req.params['serial_no']
    let loggedUser = req.session.user
    if (loggedUser) {
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

                if (len > 1 && Array.isArray(status)) {
                    for (let id in status) {
                        if (status[id].isLive) {
                            break;
                        } else {
                            covered += 1
                        }
                    }
                }
                if (covered == len) {
                    covered = 0
                }

                res.render('base', {
                    content: 'package/track',
                    status: status,
                    percent: covered * 100 / len,
                    userRole: await getRole(loggedUser.id)
                    // percent: diffCurrMins * 100 / diffMins
                })
            } catch (e) {
                console.log(e)
                res.render('base', {
                    content: 'package/search',
                    alert: 'danger',
                    alertMsg: 'Enter a Valid Serial number! ' + e,
                    userRole: await getRole(loggedUser.id)
                })
            }
        } else {
            res.render('base', {
                content: 'package/search',
                userRole: await getRole(loggedUser.id)
            })
        }
    } else {
        res.redirect('/login')
    }



}


function getDiffMins(sTime, dTime) {
    let diffMs = dTime - sTime
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}

