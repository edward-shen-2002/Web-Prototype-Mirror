import AuthController from '../../controllers/Auth';
import UserStore from '../UserStore/store';

import { customRequestFactory } from './common/REST';

export const isSignInRequest = customRequestFactory(UserStore, AuthController);
