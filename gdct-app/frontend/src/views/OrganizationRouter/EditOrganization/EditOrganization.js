import React, { useState, useEffect } from 'react';
import ModifyOrganization from '../ModifyOrganization';
import { updateOrgsRequest, getOrgsRequest } from '../../../store/thunks/organization';
import { selectOrgsStore } from '../../../store/OrganizationsStore/selectors';
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading'

const EditOrganization = ({ match: { params: { _id } } }) => {

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrgsRequest());
    }, [ dispatch ]
    );

    const { object } = useSelector(state => ({
        object: ( selectFactoryRESTResponseTableValues(selectOrgsStore)(state).filter(elem => elem._id == _id) || [{}] )[0]
    }));

    const { isOrgsCallInProgress } = useSelector(state => ({
        isOrgsCallInProgress: state.OrgsStore.isCallInProgress
    }));

    const redirect = () => {
        history.push('/organizations');
    }

    const accept = result => {
        redirect();
    }

    const reject = error => {
        // reflect error message on form somehow o.O
        alert('Missing or invalid parameters')
    }

    const submit = (newObject) => {
        // we need to preserve _id property of old object
        const temp = Object.assign({}, object, newObject);
        // material-table appends .tableData property to object, we have to get rid of it
        delete temp.tableData;
        dispatch(updateOrgsRequest(temp, accept, reject));
    }

    const cancel = () => {
        redirect();
    }

    return isOrgsCallInProgress? <Loading /> : (
        <div>
            <ModifyOrganization 
                title={"Edit Organization"}
                object={object}
                submit={submit}
                cancel={cancel}
            />
        </div>
    );
};

export default EditOrganization;