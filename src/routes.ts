import { Router } from 'express';

import { AuthUserController } from './controllers/AuthUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

router.post("/authenticate", new AuthUserController().handle);
router.post("/messages", ensureAuthenticated,  new CreateMessageController().handle);
router.get("/messages/last3",  new GetLastThreeMessagesController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }