import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
    menus: [{ name: { type: String, required: true }, items: [{ type: mongoose.Types.ObjectId, ref: "foods" }] }],
    recommended: [{ type: mongoose.Types.ObjectId, ref: "foods", unique: true }]
})

export const MenuModel = mongoose.model("menu", menuSchema);