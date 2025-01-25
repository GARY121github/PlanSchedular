import { Router } from 'express';
import planController from '../controllers/plan.controller';

const router = Router();

router.route('/')
    .get(planController.getPlans)
    .post(planController.createPlan)

router.route('/:id')
    .get(planController.getPlan)
    .patch(planController.updatePlan)
    .delete(planController.deletePlan)

export default router;
