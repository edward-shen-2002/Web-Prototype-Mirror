import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getProgramsRequest,
  createProgramsRequest,
  deleteProgramsRequest,
  updateProgramsRequest,
} from '../../../store/thunks/Program'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Typography from '@material-ui/core/Typography'

import './ModifyOrganization.scss'
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors'
import { selectProgramsStore } from '../../../store/ProgramsStore/selectors'

const OrganizationHeader = ({ title }) => {
  return (
    <Paper className="header">
      <Typography variant="h5">{title}</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const TextGroup = ({ object, attribute, text, handleChanges }) => (
    <div className="TextGroup">
        <label htmlFor={attribute}>{text}</label> <br/>
        <input
            name={attribute}
            type="text"
            placeholder={`Enter ${text}`}
            value={object[attribute] || ''}
            onChange={handleChanges}
            disabled={!object.active}
        />
    </div>    
);

const ButtonGroup = ({ object, attribute, text, handleChanges }) => (
    <div>
        <label htmlFor={attribute}>{text}</label> <br/>
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
            <TextGroup
                object={object}
                attribute={'location'}
                text={'Location'}
                handleChanges={handleChanges}
            />
        </span>

        <span className="formRow" id="userInfo">
            <TextGroup
                object={object}
                attribute={'authorizedUserId'}
                text={'Authorized User'}
                handleChanges={handleChanges}
            />
        </span>
    </div>
);

const ProgList = ({ object, updateState }) => {
    
    const dispatch = useDispatch();

    const programId = object.programId;

    const { programList } = useSelector(state => ({
        programList: selectFactoryRESTResponseTableValues(selectProgramsStore)(state)
    }));

    useEffect(() => {
        dispatch(getProgramsRequest());
    }, []);

    const OrgProgs = () => programList.filter(elem => programId.includes(elem._id));
    const nonOrgProgs = () => programList.filter(elem => !programId.includes(elem._id));

    const columns = useMemo(
        () => [
            { title: 'Name', field: 'name' },
            { title: 'Code', field: 'code' },
            { title: 'Active', type: 'boolean', field: 'isActive' }
        ]
    );

    const options = useMemo(
        () => ({ actionsColumnIndex: -1, search: false, showTitle: true }),
        []
    );

    const left_actions = useMemo(
        () => [
            {
                icon: DeleteIcon,
                tooltip: 'Remove from Organization',
                onClick: (_event, prog) => 
                    updateState('programId', object.programId.filter(elem => elem!==prog._id))
            }
        ]
    );

    const right_actions = useMemo(
        () => [
            {
                icon: AddIcon,
                tooltip: 'Add to Organization',
                onClick: (_event, prog) =>
                    updateState('programId', object.programId.concat(prog._id))
            }
        ]
    );

    return (
        <div className="tableContainer">
            <div className="tableWrapper">
                <MaterialTable
                    title="Organization Programs"
                    columns={columns}
                    data={OrgProgs()}
                    options={options}
                    actions={left_actions}
                />
            </div>
            <div className="tableWrapper">
                <MaterialTable
                    title="Other Programs"
                    columns={columns}
                    data={nonOrgProgs()}
                    options={options}
                    actions={right_actions}
                />
            </div>
        </div>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value!==index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            display={value===index? 'inline':'none'}
            {...other}
        >
            {children}
        </div>
    );
}

const makeIdentifier = (index) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
});

const OrganizationForm = (props) => {

    const [current, setCurrent] = useState(0);

    const handleChange = (event, value) => setCurrent(value);

    return (
        <Paper className="formBody">
            <form onSubmit={() => false}>
                <AppBar position="static">
                    <Tabs value={current} onChange={handleChange} aria-label="form navigation">
                        <Tab label="Organization Info" {...makeIdentifier(0)}/>
                        <Tab label="Program List" {...makeIdentifier(1)}/>
                    </Tabs>
                </AppBar>

                <TabPanel value={current} index={0}>
                    <OrgInfo {...props} />
                </TabPanel>
                <TabPanel value={current} index={1}>
                    <ProgList {...props} />
                </TabPanel>

                <div className="formActions">
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={() => props.cancel()}
                    >Cancel</Button>
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={() => props.submit()}
                    >Submit</Button>
                </div>
            </form>
        </Paper>
    );
};

const currentTime = () => {
    const now = new Date();
    return now.toISOString();
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

        if (name === "active") {
            if (updateValue) {
                this.updateState('expiryDate', null);
            }
            else{
                // "delete" or expire org
                this.updateState('expiryDate', currentTime());
            }
        }

        this.updateState(name, updateValue);
    };

    render = () => (
        <div>
            <OrganizationHeader
                title={this.props.title}
            />
            <OrganizationForm
                object={this.state}
                submit={() => this.props.submit(this.state)}
                cancel={this.props.cancel}
                handleChanges={this.handleChanges}
                updateState={this.updateState}
            />
        </div>
    );

};

export { currentTime, ModifyOrganization as default };