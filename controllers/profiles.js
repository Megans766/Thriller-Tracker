import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
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
    res.render('profiles/show', {
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
  req.body.visited = !!req.body.visited
  req.body.profileOwner = req.user.profile.id
  Profile.findById(req.user.profile._id)
  .then(visit => {
    visit.toVisit.push(req.body)
    visit.save()
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

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(park => {
    console.log(park, "the log");
    res.render('profiles/edit', {
      title: 'Complete Bucket List Item',
      park
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function editToVisit(req, res) {
  Profile.findById(req.params.id)
  .then(park => {
    if (park._id.equals(req.user.profile._id)) {
      res.render('profiles/edit', {
        title: 'Edit Profile',
        park
      })
    } else {
      throw new Error('You are not authorized to make these changes!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function updateToVisit(req, res) {
  Profile.findById(req.params.parkId)
  .then(profile => {
    if (profile.park.equals(req.user.profile._id)) {
      const bucketList = profile.park.id(req.params.toVisitId)
      console.log("BUCKETLIST", bucketList);
      bucketList.set(req.body)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    } else {
      throw new Error('You are not authorized to make these changes')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

// function updateToVisit(req, res) {
//   Profile.findById(req.params.parkId)
//   .then(park => {
//     const parkDoc = park.toVisit.id(req.params.id)
//     if (park.profileOwner.equals(req.user.profile._id)) {
//       parkDoc.set(req.body)
//       park.save()
//       .then(() => {
//         res.redirect(`/profiles/${req.user.profile._id}`)
//       })
//       .catch(err => {
//         console.log(err)
//         res.redirect('/profiles')
//       })
//     } else {
//       throw new Error('You are not authorized to make these changes!')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/profiles/${req.user.profile._id}`)
//   })
// }

function deleteToVisit(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.toVisit.remove({_id: req.params.id})
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
  createToVisit,
  edit,
  editToVisit,
  updateToVisit,
  deleteToVisit
}