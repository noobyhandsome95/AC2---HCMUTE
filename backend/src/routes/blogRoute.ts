import express from 'express';
import { 
    createBlog, 
    deleteBlog, 
    getAllBlogs, 
    getBlogById, 
    updateBlog 
} from '../controllers/blogController.ts';
import { protectedRoute } from '../middlewares/authMiddleware.ts';


const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

router.post('/', protectedRoute, createBlog);
router.put('/:id', protectedRoute, updateBlog);
router.delete('/:id', protectedRoute, deleteBlog);

export default router;