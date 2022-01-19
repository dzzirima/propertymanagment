import express from 'express'
import { Route } from 'express'
import { CreatePayment, updatePaymentStatus } from '../controllers/Payment.js'


const Router = express.Router()

Router.route('/create').post(CreatePayment)
Router.route('/update').post(updatePaymentStatus)



export default Router