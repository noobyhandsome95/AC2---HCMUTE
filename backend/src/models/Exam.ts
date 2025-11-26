import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "", 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    completionCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Exam = mongoose.model("Exam", examSchema);
export default Exam;