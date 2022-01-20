import express from 'express'
import { createUnit, deleteUnit, getAllUnits, getUnit, updateUnit } from '../controllers/unit.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createUnit)
Router.route('/update').put(updateUnit)
Router.route('/getUnit').get(getUnit)



// only the admin can do this
Router.route('/getAllUnits').get(verify_user,authRole(ROLES.ADMIN), getAllUnits)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deleteUnit)










export default Router
