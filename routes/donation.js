import express from 'express'
const Router = express.Router()
import {createDonation, getAllDonationsPerFundRaise} from '../controllers/donation.js'



Router.route('/create/ecocash_one_money').post(createDonation);
Router.route('/donationForAFundRaise').post(getAllDonationsPerFundRaise)



export default Router