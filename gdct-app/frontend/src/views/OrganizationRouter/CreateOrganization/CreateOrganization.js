import React, { useState } from 'react';
import ModifyOrganization, { currentTime } from '../ModifyOrganization';
import OrgEntity from '../../../../../backend/src/entities/Organization/entity';
import { createOrgsRequest } from '../../../store/thunks/organization';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const CreateOrganization = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // all fields on form must have value or else (un)controlled input warning will occur
    const initialState = new OrgEntity({ 
        id: 0,
        IFISNum: '',
        code: '',
        name: '',
        legalName: '',
        address: '',
        province: '',
        city: '',
        postalCode: '',
        location: '',
        active: true,
        programId: [],
        effectiveDate: currentTime(),
        expiryDate: null
    });

    const redirect = () => {
        history.push('/organizations');
    }

    const accept = result => {
        // redirect to list of orgs if added to db successfully
        redirect();
    }

    const reject = error => {
        // reflect error message on form somehow o.O
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
                title={'Create Organization'}
                object={initialState} 
                submit={submit}
                cancel={cancel}
            />
        </div>
    );
};

export default CreateOrganization;