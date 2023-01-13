import { Router } from 'express'
import * as parksCtrl from '../controllers/parks.js'

const router = Router()

//GET localhost:3000/parks
router.get('/', parksCtrl.index)

export {
  router
}