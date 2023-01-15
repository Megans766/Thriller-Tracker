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

function create(req, res) {
  req.body.owner = req.user.profile._id
  Park.create(req.body)
  .then(park => {
    res.redirect('/parks')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function show(req, res) {
  Park.findById(req.parmas.id)
  .populate('owner')
  .then(park => {
    res.render('parks/show', {
      title: 'Parks Show Page',
      park
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

export {
  index,
  create,
  show
}