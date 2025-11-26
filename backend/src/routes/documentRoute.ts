import express from "express";
import { 
    createDocument, 
    deleteDocument, 
    getAllDocuments, 
    getDocumentById, 
    updateDocument 
} from "../controllers/documentController.ts";
import { protectedRoute } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);

router.post('/', protectedRoute, createDocument);
router.put('/:id', protectedRoute, updateDocument);
router.delete('/:id', protectedRoute, deleteDocument);

export default router;
