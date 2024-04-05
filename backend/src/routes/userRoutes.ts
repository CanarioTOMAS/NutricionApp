import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { UserController } from '../controllers/userController';
import { ensureAuth } from '../middlewares/authenticated';

const router = express.Router();

router.get('/users',[ensureAuth], UserController.getAllUsers);
router.get('/user/:id', param('id').isMongoId(),[ensureAuth], UserController.getUserById);
router.post(
  '/register',
  [
    body('password').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
  ],
  UserController.createUser
);
router.put(
  '/user/:id',
  [
    param('id').isMongoId(),
    body('name').notEmpty().trim().escape(),
    body('status').trim(),
    body('role').trim(),
    body('address').trim(),
    body('placeOfBirth').trim(),
    body('gender').trim(),
    body('phone').trim(),
  ],[ensureAuth],
  UserController.updateUser
);
router.delete('/user/:id', param('id').isMongoId(),[ensureAuth], UserController.deleteUser);
router.post('/login',UserController.loginUser);
export default router;
