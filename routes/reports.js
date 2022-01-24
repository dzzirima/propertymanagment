import express from 'express'
import { expenseReport, outstandingPayments } from '../controllers/reports.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



/**All reports to be viewed by the admin */

Router.route('/expenseReport').post(verify_user,authRole(ROLES.ADMIN), expenseReport)
Router.route('/outStandingReport').post(verify_user,authRole(ROLES.ADMIN), outstandingPayments)



export default Router
