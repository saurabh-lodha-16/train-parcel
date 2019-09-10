import * as models from '../../models';
import { sendWAmsg } from '../common';
const bcrypt = require('bcrypt')

var FormData = require('form-data')
export function registerGet(req, res) {
    res.render('auth/register');
}


export async function registerPost(req, res) {

    if (req.body.otp) {
        // console.log('====================== Register 2nd step')
        let otp = req.body.otp
        let user = req.session.user
        console.log(otp, user)
        if (user) {
            if (user.key == otp) {
                res.redirect('/dashboard/')
            } else {
                // delete user created if this error
                res.render('auth/phoneVerification', { userId: user.id, alert: 'danger', alertMsg: `You've entered a wrong OTP. Check the OTP again!` })
            }
        } else {
            res.render('auth/register', { alert: 'danger', alertMsg: 'Some Error Occured.' })
        }


    } else if (req.googleOAuth) {
        //Google Sign: user model already created
        let userId = req.body.userId
        let phone = req.body.phone;

        models.users.findOne({ where: { id: userId } }).then(user => {
            req.session.user = user;
            sendWAmsg(phone, `Hello ${user.name}, Your OTP is ${user.key}`)
            res.render('auth/phoneVerification', { userId: user.id, alert: 'primary', alertMsg: `Enter the OTP received on your Whatsapp +91${phone}` })
        })

    }

    else {
        console.log('====================== Register 1st step')
        let email = req.body.email;
        let name = req.body.name;
        let phone = req.body.phone;
        let pwd = req.body.pwd;
        let rpwd = req.body.rpwd;
        try {
            if (pwd == rpwd) {
                let user = await models.users.findOne({
                    where: {
                        [models.Sequelize.Op.or]: [
                            {
                                email: email
                            },
                            {
                                mobileNo: phone
                            }
                        ]
                    }
                })
                if (user) {
                    res.render('auth/register',
                        {
                            alert: 'danger',
                            alertMsg: 'User with same email or phone already exists!'
                        });
                } else {
                    let hashPwd = bcrypt.hashSync(pwd, 10);
                    let user = await models.users.create({
                        name: name,
                        mobileNo: phone,
                        email: email,
                        password: hashPwd,
                        key: generateOTP()
                    })

                    // create a default role for user
                    req.session.user = user;
                    sendWAmsg(phone, `Hello ${name}, Your OTP is ${user.key}`)
                    res.render('auth/phoneVerification', {
                        userId: user.id,
                        alert: 'primary', alertMsg: `Enter the OTP received on your Whatsapp +91${phone}`
                    })

                }

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

export async function resendOTPPost(req, res) {
    let user = req.session.user
    if (user) {
        user = await models.users.findOne({ where: { id: user.id } })
        await user.update({ key: generateOTP() })
        req.session.user = user
        sendWAmsg(user.mobileNo, `Hello ${user.name}, Your OTP is ${user.key}`)
        res.render('auth/phoneVerification', { userId: user.id, alert: 'primary', alertMsg: `Enter the new OTP received on your Whatsapp +91${user.mobileNo}` })
    } else {
        res.end()
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

