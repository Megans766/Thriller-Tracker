import mongoose from 'mongoose'

const Schema = mongoose.Schema

const parkSchema = new Schema({
  park: {type: String, required: true},
  ride: {type: String, required: true},
  likes: [{ type: Schema.Types.ObjectId, ref: 'Profile'}],
  owner: { type: Schema.Types.ObjectId, ref: "Profile" }
}, {
  timestamps: true
})

const Park = mongoose.model('Park', parkSchema)

export {
  Park
}