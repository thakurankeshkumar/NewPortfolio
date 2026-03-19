import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    period: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    orgType: String,
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
});

const aboutSchema = new mongoose.Schema({
    bio: [{ type: String }],
    achievements: [{ type: String }],
    timeline: [timelineSchema],
}, { timestamps: true });

export default mongoose.models.About || mongoose.model("About", aboutSchema);