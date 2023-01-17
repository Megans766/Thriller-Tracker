import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index' , {
      title: 'Adventure Profiles',
      profiles
    })
  }) 
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const profileOwner = profile._id.equals(req.user.profile._id)
    res.render('profiles/show' , {
      title: `${profile.name}'s Adventures`,
      profile,
      profileOwner
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function createToVisit(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.toVisit.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createToVisit
}