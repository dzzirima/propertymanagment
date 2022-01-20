import express from 'express'
import { createLease, deleteLease, getAllLeases, getLease, updateLease } from '../controllers/lease.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createLease)
Router.route('/update').put(updateLease)
Router.route('/getLease').get(getLease)


// only the admin can do this
Router.route('/getAllLeases').get(verify_user,authRole(ROLES.ADMIN), getAllLeases)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deleteLease)










export default Router
