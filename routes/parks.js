import { Router } from 'express'
import * as parksCtrl from '../controllers/parks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/parks
router.get('/', parksCtrl.index)

//GET localhost:3000/parks/:id
router.get('/:id', parksCtrl.show)

//GET localhost:3000/parks/:id/edit
router.get('/:id/edit', isLoggedIn, parksCtrl.edit)

//POST localhost:3000/parks
router.post('/', isLoggedIn, parksCtrl.create)

//PATCH localhost:3000/parks/:id/likes
router.patch('/:id/likes', isLoggedIn, parksCtrl.likes)

export {
  router
}