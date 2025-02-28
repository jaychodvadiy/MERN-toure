import express from 'express';
import { createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:tourId', (req, res, next) => {
    console.log(" Received tourId in route:", req.params.tourId);
    next();
}, createReview);

export default router;
