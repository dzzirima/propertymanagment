import express from 'express'
import { createRoom, deleteRoom, generateRooms, getAllRooms, getRoom, updateRoom } from '../controllers/room.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createRoom)
Router.route('/update').put(updateRoom)
Router.route('/getRoom').get(getRoom)
Router.route('/generate').post(generateRooms)




// only the admin can do this
Router.route('/getAllRooms').get(verify_user,authRole(ROLES.ADMIN), getAllRooms)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deleteRoom)










export default Router
