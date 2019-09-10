import { stripe } from "../../app";
import models from '../../models'
import { sendWAmsg, getRole } from "../common";
import { retrieveCityNames } from "../package/register";
import { getPackages } from "../package/update"
import { redirectWithMsg } from '../common';

// import { stripeSecretKey } from "../../config/payment";

// let stripeHandler = StripeCheckout.configure({
//     key: stripeSecretKey,
//     locale: 'en',
//     token: function(token){
//         //called when payment is made
//     }
// })

export async function makePayment(req, packageId, loggedUser, res) {
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
                    sendWAmsg(packageObj.user.mobileNo, `We have received a payment of ₹${amountToBeCharged / 100}\nPackage Serial ID: ${packageObj.serial_no}\nTransaction ID: ${charge.balance_transaction}`);
                    redirectWithMsg('/packages', req, res, 'success', `Payment has been processed successfully. Package Serial ID: ${packageObj.serial_no}. Transaction ID: ${charge.balance_transaction}`);
                })
                .catch(async (err) => {
                    await models.packages.update(
                        { isActive: false },
                        {
                            where: { id: packageId }
                        })
<<<<<<< 6c7c675a2a24183e5b2a387c96d18103c67b1715
                    redirectWithMsg('/packages', req, res, 'danger', `Payment Failed. Register again! ${err}`);
                    // Deal with an error
=======
                    let userRole = await getRole(loggedUser.id);
                    let packageArray = await getPackages(loggedUser.id, userRole);
                    res.render('base', {
                        content: 'package/packages.ejs',
                        packageList: packageArray,
                        userRole: userRole,
                        alertMsg: `Payment Failed. Register again! ${err}`,
                        alert: "danger",
                        citiesArray: await retrieveCityNames()
                    });
>>>>>>> Flash message implemented
                });

        } else {
            redirectWithMsg('/packages', req, res, 'danger', `Some error has occured! No Package found while doing payment. Please Try again.`);
        }
    } catch (e) {
        await models.packages.update(
            { isActive: false },
            {
                where: { id: packageId }
            })
        redirectWithMsg('/packages', req, res, 'danger', `Payment Failed. Please Try again. Exception: ${e}`);
    }
}

