import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [{ type: String }],
    type: {
        type: String,
        default: "PERSONAL",
    },
    role: {
        type: String,
    },
    liveUrl: String,
    githubUrl: String,
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);