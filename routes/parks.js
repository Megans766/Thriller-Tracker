import { Router } from 'express'
import * as parksCtrl from '../controllers/parks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/parks
router.get('/', parksCtrl.index)

//POST localhost:3000
router.post('/', isLoggedIn, parksCtrl.create)

export {
  router
}