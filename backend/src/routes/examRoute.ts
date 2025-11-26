import express from 'express';
import { 
    createExam, 
    deleteExam, 
    getAllExams, 
    getExamById, 
    updateExam 
} from '../controllers/examController.ts';
import { protectedRoute } from '../middlewares/authMiddleware.ts';

const router = express.Router();

router.get('/', getAllExams);
router.get('/:id', getExamById);

router.post('/', protectedRoute, createExam);
router.put('/:id', protectedRoute, updateExam);
router.delete('/:id', protectedRoute, deleteExam);

export default router;