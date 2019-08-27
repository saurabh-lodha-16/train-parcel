import { getPackageStatus } from './status'
export async function trackGet(req, res) {
    console.log(req.params,'============================================')
    let serial_no = req.params['serial_no']
    let status = await getPackageStatus(serial_no)
    res.render('base', {
        content: 'package/track',
        status: status
    })
}