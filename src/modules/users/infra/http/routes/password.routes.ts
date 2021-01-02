import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passswordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passswordRouter.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    }
}), forgotPasswordController.create);
passswordRouter.post('/reset', celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
}), resetPasswordController.create);

export default passswordRouter;
