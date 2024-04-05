import express, { Request, Response } from 'express';
import { body, param} from 'express-validator';
import { TeamController } from '../controllers/teamController';
import { ensureAuth } from '../middlewares/authenticated';

const router = express.Router();
router.post(
  '/team',
  [
    body('name').notEmpty().trim().escape(),
    body('description').trim(),
  ],[ensureAuth],
  TeamController.createTeam
);
router.get('/team/:id',param('id').isMongoId(),[ensureAuth], TeamController.getTeam);
router.get('/teams',[ensureAuth], TeamController.getAllTeam);
router.put(
  '/team/:id',
  [
    param('id').isMongoId(),
    body('name').trim(),
    body('description').trim(),
  ],[ensureAuth],
  TeamController.updateTeam
);
router.delete('/team/:id', param('id').isMongoId(),[ensureAuth], TeamController.deleteTeam);
export default router;
