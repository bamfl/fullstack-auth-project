import Router from 'express';
import userController from '../controllers/user-controller.js';

const router = new Router();

router.get('/activate/:activationLink', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
