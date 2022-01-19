import express from 'express'
import { Route } from 'express'
import { createCategory,getAllCategories } from '../controllers/Category.js'


const Router = express.Router()

Router.route('/create').post(createCategory)
Router.route('/getAllCategories').get(getAllCategories)



export default Router