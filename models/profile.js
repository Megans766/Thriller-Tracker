import mongoose from 'mongoose'

const Schema = mongoose.Schema

const toVisitSchema = new Schema ({
  park: { type: Schema.Types.ObjectId, ref: 'Park'}
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  toVisit: [toVisitSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
