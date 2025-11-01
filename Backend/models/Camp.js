import mongoose from 'mongoose'

const campSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String },
  date: { type: Date },
  organizerName: { type: String },
  organizerContact: { type: String },
  proName: { type: String },
  hospitalName: { type: String },
}, { timestamps: true })

export default mongoose.model('Camp', campSchema)
