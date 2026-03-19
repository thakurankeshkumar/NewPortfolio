import mongoose from "mongoose";
const skillCategorySchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    skills: [{ type: String }],
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });


export default mongoose.models.SkillCategory || mongoose.model("SkillCategory", skillCategorySchema)