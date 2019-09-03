import { stripe } from "../../app";
import models from '../../models'
import { sendWAmsg, getRole } from "../common";
import { retrieveCityNames } from "../package/register";
// import { stripeSecretKey } from "../../config/payment";

// let stripeHandler = StripeCheckout.configure({
//     key: stripeSecretKey,
//     locale: 'en',
//     token: function(token){
//         //called when payment is made
//     }
// })

export async function makePayment(packageId, loggedUser, res) {
    try {
        let packageObj = await models.packages.findOne({
            where: { id: packageId },
            include: [
                { model: models.users }
            ]
        })
        if (packageObj) {
            let amountToBeCharged = packageObj.weight * 100 * 100
            // Create a new customer and then a new charge for that customer:
            stripe.customers
                .create({
                    email: packageObj.user.email,
                    phone: packageObj.user.mobileNo
                })
                .then((customer) => {
                    return stripe.customers.createSource(customer.id, {
                        source: 'tok_visa',
                    });
                })
                .then((source) => {
                    return stripe.charges.create({
                        amount: amountToBeCharged,
                        currency: 'inr',
                        customer: source.customer,
                    });
                })
                .then(async (charge) => {
                    console.log(charge)
                    sendWAmsg(packageObj.user.mobileNo, `We have received a payment of ₹${amountToBeCharged/100}\nPackage Serial ID: ${packageObj.serial_no}\nTransaction ID: ${charge.balance_transaction}`)
                    res.render('base', {
                        content: 'package/registerPackage',
                        alertMsg: `Payment has been processed successfully. Package Serial ID: ${packageObj.serial_no}. Transaction ID: ${charge.balance_transaction}`,
                        alert: "success",
                        citiesArray: await retrieveCityNames(),
                        userRole: await getRole(loggedUser.id)
                    });
                    // New charge created on a new customer
                })
                .catch(async (err) => {
                    await models.packages.update(
                        { isActive: false },
                        {
                            where: { id: packageId }
                        })
                    res.render('base', {
                        content: 'package/registerPackage',
                        alertMsg: `Payment Failed. Register again! ${err}`,
                        alert: "danger",
                        citiesArray: await retrieveCityNames(),
                        userRole: await getRole(loggedUser.id)
                    });
                    // Deal with an error
                });

        } else {
            res.render('base', {
                content: 'package/registerPackage',
                alertMsg: `Some error has occured! No Package found while doing payment. Please Try again.`,
                alert: "danger",
                citiesArray: await retrieveCityNames(),
                userRole: await getRole(loggedUser.id)
            });
        }
    } catch (e) {
        await models.packages.update(
            { isActive: false },
            {
                where: { id: packageId }
            })
        res.render('base', {
            content: 'package/registerPackage',
            alertMsg: `Payment Failed. Please Try again. Exception: ${e}`,
            alert: "danger",
            citiesArray: await retrieveCityNames(),
            userRole: await getRole(loggedUser.id)
        });
    }



}