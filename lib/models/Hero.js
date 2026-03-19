import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    badge: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    stack: [{
        type: String,
    },],
    stats: {
        year: String,
        yearLabel: String,
        projects: String,
        hackathons: String,
        techDomains: String,
    },
    availableFor: [{ type: String }],
    email: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    linkedinUrl: {
        type: String,
    },
    resumeUrl: {
        type: String,
    }

}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model("Hero", heroSchema)