import express from 'express'
import { createProperty, deleteProperty, getAllProperties, getProperty, updateProperty } from '../controllers/property.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createProperty)
Router.route('/update').put(updateProperty)
Router.route('/getProperty').get(getProperty)



// only the admin can do this
Router.route('/getAllProperties').get(verify_user,authRole(ROLES.ADMIN), getAllProperties)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deleteProperty)










export default Router
