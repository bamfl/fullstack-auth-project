import Router from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.get('/activate/:activationLink', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.post('/registration', 
  body('email').isEmail(), 
  body('password').isLength({ min: 6 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
