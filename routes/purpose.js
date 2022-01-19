import express from 'express'
import { Route } from 'express'
import { createdPurpose, getAllPurposes } from '../controllers/Purpose.js'

const Router = express.Router()

Router.route('/create').post(createdPurpose)
Router.route('/getAllPurposes').get(getAllPurposes)



export default Router