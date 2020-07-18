import React, { useState } from 'react';
import ModifyOrganization, { currentTime } from '../ModifyOrganization';
import OrgEntity from '../../../../../backend/src/entities/Organization/entity';
import { createOrgsRequest } from '../../../store/thunks/organization';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateOrganization = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialState = new OrgEntity({
    active: true,
    programId: [],
    effectiveDate: currentTime(),
    expiryDate: null,
  });

  const redirect = () => {
    history.push('/organizations');
  };

  const accept = result => {
    redirect();
  };

  const reject = error => {
    // reflect error message on form somehow o.O
    alert('Missing or invalid parameters');
  };

  const submit = newObject => {
    dispatch(createOrgsRequest(newObject, accept, reject));
  };

  const cancel = () => {
    redirect();
  };

  return (
    <div>
      <ModifyOrganization
        title={'Create Organization'}
        object={initialState}
        submit={submit}
        cancel={cancel}
      />
    </div>
  );
};

export default CreateOrganization;
