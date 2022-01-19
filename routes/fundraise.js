import express from 'express'
import { Route } from 'express'
import {  createFundraise, deleteFundRaise, getAllFundRaises, getFundRaise, updateFundRaise,  } from '../controllers/fundraise.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'


const Router = express.Router()

Router.route('/create').post(verify_user,createFundraise)
Router.route('/getFundRaise').get(getFundRaise)

Router.route('/update').post(verify_user,updateFundRaise)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN),deleteFundRaise)
Router.route('/allFundRaises').get(getAllFundRaises)






export default Router