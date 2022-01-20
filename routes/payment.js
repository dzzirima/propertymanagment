import express from 'express'
import { createPayment, deletePayment, getAllPayments, getPayment, updatePayment } from '../controllers/payment.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createPayment)
Router.route('/update').put(updatePayment)
Router.route('/getPayment').get(getPayment)


// only the admin can do this
Router.route('/getAllPayments').get(verify_user,authRole(ROLES.ADMIN), getAllPayments)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deletePayment)










export default Router
