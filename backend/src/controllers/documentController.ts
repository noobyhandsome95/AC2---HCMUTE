import DocumentSchema from "../models/DocumentSchema.ts";

const toTitleCase = (str: string) => {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatDocumentResponse = (doc: any) => {
    const docObj = doc.toObject ? doc.toObject() : doc;

    if (docObj.author && typeof docObj.author === 'object') {
        const firstName = docObj.author.firstName || "";
        const lastName = docObj.author.lastName || "";
        let rawName = `${firstName} ${lastName}`.trim();
        
        if (!rawName) {
            rawName = docObj.author.username || docObj.author.email || "Unknown Author";
        }
        const displayName = toTitleCase(rawName);

        return {
            ...docObj,
            author: {
                _id: docObj.author._id,
                displayName: displayName,
                avatarURL: docObj.author.avatarURL || "",
            }
        };
    }
    return docObj;
};

export const createDocument = async (req, res) => {
    try {
        if (!req.user || !req.user._id) { 
            return res.status(401).json({ message: "Unauthorized: User not identified" });    
        }

        const { title, content, coverImage, tags, readTime, subscription } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        let newDocument = await DocumentSchema.create({
            title,
            content,
            coverImage: coverImage || "",
            author: req.user._id,
            tags: tags || [],
            readTime: readTime || "5 minutes",
            subscription: subscription || "",
        });

        newDocument = await newDocument.populate("author", "firstName lastName avatarURL username");
        res.status(201).json(newDocument);

    } catch (error) {
        console.error("Error creating document:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllDocuments = async (req, res) => {
    try {
        const documents = await DocumentSchema.find()
            .populate("author", "firstName lastName avatarURL username")
            .sort({ createdAt: -1 });
        const formattedDocs = documents.map(doc => formatDocumentResponse(doc));
        res.status(200).json(formattedDocs);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Internal server error" });      
    }
};


export const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await DocumentSchema.findById(id)
            .populate("author", "firstName lastName avatarURL username");
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error("Error fetching document by ID:", error);
        res.status(500).json({ message: "Internal server error" });      
    }
};

export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, coverImage, tags, subscription } = req.body;
        const userId = req.user._id.toString();
        
        const document = await DocumentSchema.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        if (document.author.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You are not the author of this document" });
        }

        document.title = title || document.title;
        document.content = content || document.content;
        document.coverImage = coverImage || document.coverImage;
        document.tags = tags || document.tags;
        document.subscription = subscription || document.subscription;

        await document.save();
        await document.populate("author", "firstName lastName avatarURL username");
        res.status(200).json(document);

    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error" });      
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();

        const document = await DocumentSchema.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        if (document.author.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You are not the author of this document" });
        }
        await document.deleteOne();
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({ message: "Internal server error" });      
    }
};