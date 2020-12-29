import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const usersController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', usersController.update);

export default profileRouter;
