import React, { useState } from 'react';
import ModifyOrganization from '../ModifyOrganization';
import OrgEntity from '../../../../../backend/src/entities/Organization/entity';
import { createOrgsRequest } from '../../../store/thunks/organization';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const CreateOrganization = () => {

    const history = useHistory();
    const initialState = new OrgEntity();
    const dispatch = useDispatch();

    const redirect = () => {
        history.push('/organizations');
    }

    const accept = result => {
        // redirect to list of orgs if added to db successfully
        console.log('AC',result);
        redirect();
    }

    const reject = error => {
        // log error message somehow o.O
        console.log('IE', error);
    }

    const submit = (newObject) => {
        // (try to) add to db
        dispatch(createOrgsRequest(newObject, accept, reject));
    }

    const cancel = () => {
        // redirect to list of orgs
        redirect();
    }

    return (
        <div>
            <ModifyOrganization 
                object={initialState} 
                submit={submit}
                cancel={cancel}
            />
        </div>
    );
};

export default CreateOrganization;