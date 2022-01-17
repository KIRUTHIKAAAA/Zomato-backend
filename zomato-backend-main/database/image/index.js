import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    images: [{ location: { type: String, required: true } }]

})

export const ImageModel = mongoose.model("images", imageSchema);