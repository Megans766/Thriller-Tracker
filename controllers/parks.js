import { Park } from '../models/park.js'

function index(req, res) {
  Park.find({})
  .then(parks => {
    res.render('parks/index', {
      title: 'Visited Parks',
      parks
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index
}