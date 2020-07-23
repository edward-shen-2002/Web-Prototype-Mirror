import { createSelector } from 'reselect';
import cloneDeep from 'clone-deep';
import { memoizeFunction } from '../../tools/misc';

const selectFactoryRESTError = memoizeFunction(selector =>
  createSelector([selector], store => store.error),
);

const selectFactoryRESTIsCallInProgress = memoizeFunction(selector =>
  createSelector([selector], store => store.isCallInProgress),
);

const selectFactoryRESTResponse = memoizeFunction(selector =>
  createSelector([selector], store => store.response),
);

const selectFactoryRESTResponseValues = memoizeFunction(selector =>
  createSelector([selectFactoryRESTResponse(selector)], response => response.Values),
);

const selectFactoryRESTResponseTableValues = memoizeFunction(selector =>
  createSelector([selectFactoryRESTResponseValues(selector)], response =>
    cloneDeep(response.Values),
  ),
);

const selectOrgsStore = store => store.OrgsStore;

const selectTemplatesStore = state => state.TemplatesStore;

export {
  selectFactoryRESTError,
  selectFactoryRESTIsCallInProgress,
  selectFactoryRESTResponse,
  selectFactoryRESTResponseTableValues,
  selectFactoryRESTResponseValues,
  selectOrgsStore,
  selectTemplatesStore,
};
