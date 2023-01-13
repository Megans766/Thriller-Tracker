import mongoose from 'mongoose'

const Schema = mongoose.Schema

const parkSchema = new Schema({
  park: String,
  ride: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'Profile'}]
}, {
  timestamps: true
})

const Park = mongoose.model('Park', parkSchema)