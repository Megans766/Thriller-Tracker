import { Router } from 'express'
import * as parksCtrl from '../controllers/parks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/parks
router.get('/', parksCtrl.index)

//GET localhost:3000/parks/:id
router.get('/:id', parksCtrl.show)

//POST localhost:3000/parks
router.post('/', isLoggedIn, parksCtrl.create)

router.patch('/:id/likes', isLoggedIn, parksCtrl.likes)

export {
  router
}