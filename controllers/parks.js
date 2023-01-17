import { Park } from '../models/park.js'

function index(req, res) {
  Park.find({})
  // .populate('owner')
  .then(parks => {
    res.render('parks/index', {
      title: 'Visited Parks',
      parks,
      // user: req.user ? req.user : null
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
  Park.findById(req.params.id)
  .populate('owner')
  .then(park => {
    // console.log(park.owner.name);
    res.render('parks/show', {
      title: 'Park Adventure',
      park
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function likes(req, res) {
  Park.findById(req.params.id)
  .then(park => {
    park.likes = !park.likes
    park.save()
    .then(() => {
      res.redirect(`/parks/${park._id}`)
    })
    // .catch(err => {
    //   console.log(err)
    //   res.redirect('/parks')
    // })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function edit(req, res) {
  Park.findById(req.params.id)
  .then(park => {
    res.render('parks/edit', {
      title: 'Edit Park',
      park
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function update(req, res) {
  Park.findById(req.params.id)
  .then(park => {
    if (park.owner.equals(req.user.profile._id)) {
      // park
      park.updateOne(req.body)
      .then(() => {
        res.redirect(`/parks/${park._id}`)
      })
    } else {
      throw new Error('You are not allowed to make these changes!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function deletePark(req, res) {
  Park.findById(req.params.id)
  .then(park => {
    if (park.owner.equals(req.user.profile._id)) {
      park.delete()
      .then(() => {
        res.redirect('/parks')
      })
    } else {
      throw new Error('You are not allowed to make these changes!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

export {
  index,
  create,
  show,
  likes,
  edit,
  update,
  deletePark as delete
}