import express from 'express'
import { sendSms } from '../controllers/communication.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



// only the admin can do this
Router.route('/sms').post(verify_user,authRole(ROLES.ADMIN),sendSms)











export default Router
