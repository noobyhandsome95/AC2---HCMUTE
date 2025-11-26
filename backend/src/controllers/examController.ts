import Exam from "../models/Exam.ts";

const toTitleCase = (str: string) => {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatExamResponse = (exam: any) => {
    const examObj = exam.toObject ? exam.toObject() : exam;
    
    if (examObj.author && typeof examObj.author === 'object') {
        const firstName = examObj.author.firstName || "";
        const lastName = examObj.author.lastName || "";
        let rawName = `${firstName} ${lastName}`.trim();
        
        if (!rawName) {
            rawName = examObj.author.username || examObj.author.email || "Unknown Author";
        }
        
        const displayName = toTitleCase(rawName);
        
        return {
            ...examObj,
            author: {
                _id: examObj.author._id,
                displayName: displayName,
                avatarURL: examObj.author.avatarURL || "",
            }
        };
    }
    return examObj;
};

export const createExam = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, content, coverImage, tags } = req.body;
        
        let newExam = await Exam.create({
            title,
            content,
            coverImage,
            author: req.user._id,
            tags: tags || [],
            completionCount: 0
        });

        newExam = await newExam.populate("author", "firstName lastName avatarURL username email");
        
        res.status(201).json(formatExamResponse(newExam));
    } catch (error) {
        console.error("Error creating exam:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find()
            .populate("author", "firstName lastName avatarURL username email")
            .sort({ createdAt: -1 });
        
        const formattedExams = exams.map(exam => formatExamResponse(exam));
        res.status(200).json(formattedExams);
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findById(id)
            .populate("author", "firstName lastName avatarURL username email");
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        res.status(200).json(formatExamResponse(exam));
    } catch (error) {
        console.error("Error fetching exam by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, coverImage, tags, completionCount } = req.body;
        const userId = req.user._id.toString();

        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        if (exam.author.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You are not the author of this exam" });
        }

        exam.title = title || exam.title;
        exam.content = content || exam.content;
        exam.coverImage = coverImage || exam.coverImage;
        exam.tags = tags || exam.tags;
        if (completionCount !== undefined) {
            exam.completionCount = completionCount;
        }

        await exam.save();
        await exam.populate("author", "firstName lastName avatarURL username email");
        res.status(200).json(formatExamResponse(exam));
    } catch (error) {
        console.error("Error updating exam:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();

        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        if (exam.author.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You are not the author of this exam" });
        }
        await exam.deleteOne();
        res.status(200).json({ message: "Exam deleted successfully" });
    } catch (error) {
        console.error("Error deleting exam:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};