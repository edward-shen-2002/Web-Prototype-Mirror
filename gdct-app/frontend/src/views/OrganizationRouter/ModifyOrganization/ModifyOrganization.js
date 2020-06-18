import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import OrgEntity from '../../../../../backend/src/entities/Organization/entity'

import {
  getOrgsRequest,
  createOrgsRequest,
  deleteOrgsRequest,
  updateOrgsRequest,
} from '../../../store/thunks/organization'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'

import './ModifyOrganization.scss'
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors'
import { selectOrgsStore } from '../../../store/OrganizationsStore/selectors'

const OrganizationHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">Modify Organization</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const FormNav = (props) => {
    return (
        <div>
            <button onClick={props.gotoInfo}>Organization Info</button>
            <button onClick={props.gotoList}>Program List</button>
        </div>
    )
};

const TextGroup = ({ object, attribute, text, handleChanges }) => (
    <div className="TextGroup">
        <label htmlFor={attribute}>{text}</label> <br/>
        <input
            name={attribute}
            type="text"
            placeholder={`Enter ${text}`}
            value={object[attribute]}
            onChange={handleChanges}
            disabled={!object.active}
        />
    </div>    
);


const ButtonGroup = ({ object, attribute, text, handleChanges }) => (
    <div>
        <label htmlFor={attribute}>{text}</label>
        <input
            name={attribute}
            type="checkbox"
            placeholder={`Enter ${text}`}
            checked={object[attribute]}
            onChange={handleChanges}
        />
    </div>    
);

const NumberGroup = ({ object, attribute, text, handleChanges }) => (
    <div className="NumberGroup">
        <label htmlFor={attribute}>{text}</label> <br/>
        <input
            name={attribute}
            type="number"
            placeholder={`Enter ${text}`}
            value={object[attribute]}
            onChange={handleChanges}
            disabled={!object.active}
        />
    </div>    
);

const OrgInfo = ({ object, handleChanges }) => (
    <div>
        <ButtonGroup
            object={object}
            attribute={'active'}
            text={"Active"}
            handleChanges={handleChanges}
        />

        <div className="formRow" id="basicInfo">
            <TextGroup
                object={object}
                attribute={'name'}
                text={"Organization Name"}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'legalName'}
                text={'Legal Name'}
                handleChanges={handleChanges}
            />
            <NumberGroup
                object={object}
                attribute={'id'}
                text={'Organization ID'}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'code'}
                text={"Organization Code"}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'IFISNum'}
                text={"IFIS Number"}
                handleChanges={handleChanges}
            />
        </div>

        <span className="formRow" id="locationInfo">
            <TextGroup
                object={object}
                attribute={'address'}
                text={'Address'}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'city'}
                text={'City'}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'province'}
                text={'Province'}
                handleChanges={handleChanges}
            />
            <TextGroup
                object={object}
                attribute={'postalCode'}
                text={'Postal Code'}
                handleChanges={handleChanges}
            />
        </span>

        <span className="formRow" id="userInfo">
            <TextGroup
                object={object}
                attribute={'address'}
                text={'Organization Address'}
                handleChanges={handleChanges}
            />
        </span>
        
    </div>
);

const ProgList = ({ object, updateState }) => {
    // need to somehow get list of programs
    
    const dispatch = useDispatch();

    const programId = object.programId;

    const { programList } = useSelector(state => ({
        programList: ([/*get list of all progs from redux store*/])
    }));

    useEffect(() => {
        // dispatch request to redux store
        // dispatch(getProgsRequest())
    }, [dispatch]);

    const OrgProgs = programList.filter(elem => programId.includes(elem._id));
    const nonOrgProgs = programList.filter(elem => !programId.includes(elem._id));
    
    const columns = useMemo(
        () => [
            { title: 'Name', field: 'name' },
        ]
    );

    const options = useMemo(
        () => ({ actionsColumnIndex: -1, search: false, showTitle: true }),
        []
    );

    const left_actions = useMemo(
        () => [
            {
                icon: AddIcon,
                tooltip: 'Remove Program from Organization',
                onClick: (_event, prog) => 
                    updateState('programId', object.programId.filter(elem => !elem==prog._id))
            }
        ]
    );

    const right_actions = useMemo(
        () => [
            {
                icon: DeleteIcon,
                tooltip: 'Add Program to Organization',
                onClick: (_event, prog) =>
                    updateState('programId', object.programId.concat(prog))
            }
        ]
    );

    return (
        <div className="tableWrapper">
            <MaterialTable
                title="Remove from Organization"
                columns={columns}
                data={OrgProgs}
                options={options}
                actions={left_actions}
            />
            <MaterialTable
                title="Add to Organization"
                columns={columns}
                data={nonOrgProgs}
                options={options}
                actions={right_actions}
            />
        </div>
    );
};

const OrganizationForm = ({ object, submit, cancel, handleChanges, updateState }) => {
    
    const [visiblePage, updateVisiblePage] = useState(0);

    const gotoInfo = (e) => {
        e.preventDefault();
        updateVisiblePage(0);
    };
    const gotoList = (e) => {
        e.preventDefault();
        updateVisiblePage(1);
    };

    return (
        <Paper className="body">
            <form onSubmit={()=>false}>
                <FormNav gotoInfo={gotoInfo} gotoList={gotoList} />
                {visiblePage == 0 && <OrgInfo object={object} handleChanges={handleChanges} />}
                {visiblePage == 1 && <ProgList object={object} updateState={updateState} />}
                <br/>

                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => cancel()}
                >Cancel</Button>
                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => submit(object)}
                >Submit</Button>
                
            </form>
        </Paper>
    );
}

// pass in empty object to create, pass in existing object to view/modify
class ModifyOrganization extends React.Component {
    state = {};
    constructor(props){
        super(props);
        const temp = Object.assign({}, props.object);
        delete temp._id;
        this.state = temp;
    }
    updateState = (name, value) => {
        this.setState(state => Object.assign({},state,{ [name]: value }));
    }
    handleChanges = (e) => {
        const {name, value, checked, type} = e.target;
        let updateValue;

        switch (type) {
            case "checkbox":
                updateValue = checked ? true : false;
                break;
            case "number":
                updateValue = parseInt(value);
                break;
            default:
                updateValue = value;
        }
        this.updateState(name, updateValue);
    };
    render = () => (
        <div className="create">
            <OrganizationHeader />
            <OrganizationForm 
                object={this.state}
                submit={this.props.submit}
                cancel={this.props.cancel}
                handleChanges={this.handleChanges}
                updateState={this.updateState}
            />
        </div>
    );
};

export default ModifyOrganization;