import mongoose from 'mongoose'

const Schema = mongoose.Schema

const toVisitSchema = new Schema({
  park: { type: String, required: true}
}, {
  timestamps: true
})

const Visit = mongoose.model('Visit', toVisitSchema)

export {
  Visit
}