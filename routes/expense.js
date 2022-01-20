import express from 'express'
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from '../controllers/expense.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'
const Router = express.Router()



Router.route('/create').post(createExpense)
Router.route('/update').put(updateExpense)
Router.route('/getExpense').get(getExpense)


// only the admin can do this
Router.route('/getAllExpenses').get(verify_user,authRole(ROLES.ADMIN), getAllExpenses)
Router.route('/delete').delete(verify_user,authRole(ROLES.ADMIN), deleteExpense)










export default Router
