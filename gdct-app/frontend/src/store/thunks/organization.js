import orgController from '../../controllers/organization';
import OrgsStore from '../OrganizationsStore/store';

import {
    getRequestFactory,
    createRequestFactory,
    deleteRequestFactory,
    updateRequestFactory
} from './common/REST'

const getOrgsRequest = getRequestFactory(OrgsStore, orgController);
const createOrgsRequest = createRequestFactory(OrgsStore, orgController);
const deleteOrgsRequest = deleteRequestFactory(OrgsStore, orgController);
const updateOrgsRequest = updateRequestFactory(OrgsStore, orgController);

export {
    getOrgsRequest,
    createOrgsRequest,
    deleteOrgsRequest,
    updateOrgsRequest
};