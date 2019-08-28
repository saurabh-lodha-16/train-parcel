import * as models from '../../models';
import * as  fetch from 'node-fetch'
const bcrypt = require('bcrypt')

var FormData = require('form-data')
export function registerGet(req, res) {
    res.render('auth/register');
}


export function registerPost(req, res) {

    if (req.body.otp) {
        console.log('====================== Register 2nd step')
        let otp = req.body.otp
        let user = req.session.user
        if (user) {
            if (user.key == otp) {
                res.redirect('/dashboard/')
            } else {
                // delete user created if this error
                res.render('auth/phoneVerification', { alert: 'danger', alertMsg: `You've entered a wrong OTP. Check the OTP again!` })
            }
        } else {
            res.render('auth/register', { alert: 'danger', alertMsg: 'Some Error Occured.' })
        }


    } else {
        console.log('====================== Register 1st step')
        let email = req.body.email;
        let name = req.body.name;
        let phone = req.body.phone;
        let pwd = req.body.pwd;
        let rpwd = req.body.rpwd;
        try {
            if (pwd == rpwd) {
                let hashPwd = bcrypt.hashSync(pwd, 10);
                models.users.create({
                    name: name,
                    mobileNo: phone,
                    email: email,
                    password: hashPwd,
                    key: generateOTP()
                }).then(user => {
                    // create a default role for user
                    req.session.user = user;
                    sendWAOTP(name, phone, user.key)
                    res.render('auth/phoneVerification', { alert: 'primary', alertMsg: `Enter the OTP received on your Whatsapp +91${phone}` })
                });
            } else {
                //==========================================
                //send form data again when fails
                res.render('auth/register', { alert: 'danger', alertMsg: 'Password didn\'t match!' })
            }
        } catch (e) {
            res.render('auth/register', { alert: 'danger', alertMsg: 'Exception: ' + e })

        }

    }

}


function generateOTP() {

    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function sendWAOTP(name, phone, otp) {
    // let formData = FormData()
    // formData.append('To', `whatsapp:+91${phone}`)
    // formData.append('From', 'whatsapp:+14155238886')
    // formData.append('Body', `Hello ${name}, Your OTP is ${otp}`)

    // //     --data-urlencode 'To=whatsapp:+918275273559' \
    // // --data-urlencode 'From=whatsapp:+14155238886' \
    // // --data-urlencode 'Body=Your Twilio code is 1238432' \
    // fetch('https://api.twilio.com/2010-04-01/Accounts/AC4eecddeed388af0beb36880bd18938f7/Messages.json',
    //     {
    //         method: "POST",
    //         headers: {
    //             'Authorization': 'Basic ' + Buffer.from('AC4eecddeed388af0beb36880bd18938f7:7f5b9c3fff5b2a8fec1eda34c705ef4f', 'base64').toString(),
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         },
    //         body: formData,

    //     })
    //     .then(response => {
    //         console.log('=======================================', response.json())
    //     }) // .text(), etc.
    //     .catch((e) => { console.log('================errorWAOTP===================', e) });



    //TODO: to be shifted to external file
    const accountSid = 'AC4eecddeed388af0beb36880bd18938f7';
    const authToken = '7f5b9c3fff5b2a8fec1eda34c705ef4f';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `Hello ${name}, Your OTP is ${otp}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${phone}`
        })
        .then(message => console.log(message.sid))
        .done();

}