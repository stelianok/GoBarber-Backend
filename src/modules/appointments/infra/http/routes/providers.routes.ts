import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providerController = new ProvidersController();
providersRouter.use(ensureAuthenticated);


providersRouter.get('/', providerController.index);
export default providersRouter;
