import { stripe } from "../../app"
import models from '../../models'
import { sendWAmsg } from "../services/common"
import { redirectWithMsg } from '../services/common'

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
			stripe.customers
				.create({
					email: packageObj.user.email,
					phone: packageObj.user.mobileNo
				})
				.then((customer) => {
					return stripe.customers.createSource(customer.id, {
						source: 'tok_visa',
					})
				})
				.then((source) => {
					return stripe.charges.create({
						amount: amountToBeCharged,
						currency: 'inr',
						customer: source.customer,
					})
				})
				.then(async (charge) => {
					sendWAmsg(packageObj.user.mobileNo, `We have received a payment of ₹${amountToBeCharged / 100}\n\
					Package Serial ID: ${packageObj.serial_no}\nTransaction ID: ${charge.balance_transaction}`)
					redirectWithMsg('/packages', req, res, 'success', `Payment has been processed successfully.\
					 Package Serial ID: ${packageObj.serial_no}. Transaction ID: ${charge.balance_transaction}`)
				})
				.catch(async (err) => {
					await models.packages.update(
						{ isActive: false },
						{
							where: { id: packageId }
						})
					redirectWithMsg('/packages', req, res, 'danger', `Payment Failed. Register again! ${err}`)
				})

		} else {
			redirectWithMsg('/packages', req, res, 'danger', `Some error has occured! No Package found while doing payment. Please Try again.`)
		}
	} catch (e) {
		await models.packages.update(
			{ isActive: false },
			{
				where: { id: packageId }
			})
		redirectWithMsg('/packages', req, res, 'danger', `Payment Failed. Please Try again. Exception: ${e}`)
	}
}

