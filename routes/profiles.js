import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)

router.get('/:id', isLoggedIn, profilesCtrl.show)

router.post('/:id/toVisit', isLoggedIn, profilesCtrl.createToVisit)

router.delete('/toVisit/:id', isLoggedIn, profilesCtrl.deleteToVisit)

export {
  router
}