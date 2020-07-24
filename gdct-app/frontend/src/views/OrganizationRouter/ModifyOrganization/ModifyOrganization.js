import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';

import Typography from '@material-ui/core/Typography';

import './ModifyOrganization.scss';
import PropTypes, { object } from 'prop-types';
import { userIdButton } from '../../../components/buttons';
import ProgList from '../ProgramList';

const OrganizationHeader = ({ title }) => {
  return (
    <Paper className="header">
      <Typography variant="h5">{title}</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  );
};

const Label = ({ attribute, text }) => (
  <label htmlFor={attribute}>
    <Typography variant="subtitle2">{text}</Typography>
  </label>
);

const getValue = (object, attribute) => {
  let value;
  switch (typeof object[attribute]) {
    case 'undefined':
      value = '';
      break;
    default:
      value = object[attribute];
  }
  switch (attribute) {
    case 'effectiveDate':
      const tmp = new Date(value);
      value = tmp.toString();
  }
  return { value };
};

const Input = ({ object, attribute, text, handleChanges, type, cannotEdit }) => (
  <TextField
    name={attribute}
    type={type}
    placeholder={`Enter ${text}`}
    {...getValue(object, attribute)}
    variant="outlined"
    onChange={handleChanges}
    fullWidth
    disabled={!object.active || cannotEdit}
  />
);

const TextGroup = props => (
  <div className="InputGroup" style={{ width: props.fullWidth ? '100%' : '23%' }}>
    <Label {...props} />
    <br />
    <Input {...props} type={'text'} />
  </div>
);

// NOT a generic button group, DO NOT REUSE for other purposes
const ButtonGroup = props => (
  <div className="InputGroup">
    <Label {...props} />
    <Checkbox
      color="primary"
      name={props.attribute}
      checked={!props.object[props.attribute]}
      onChange={props.handleChanges}
    />
  </div>
);

const NumberGroup = props => (
  <div className="InputGroup" style={{ width: '23%' }}>
    <Label {...props} />
    <br />
    <Input {...props} type="number" />
  </div>
);

const OrgInfo = props => (
  <div>
    <div align="right">
      <ButtonGroup {...props} attribute={'active'} text={'Expire Organization'} />
    </div>

    <TextGroup {...props} attribute={'name'} text={'Organization Name*'} fullWidth />
    <TextGroup {...props} attribute={'legalName'} text={'Legal Name'} fullWidth />

    <div className="formRow" id="basicInfo">
      <NumberGroup {...props} attribute={'id'} text={'Organization ID*'} />
      <TextGroup {...props} attribute={'code'} text={'Organization Code'} />
      <TextGroup {...props} attribute={'IFISNum'} text={'IFIS Number*'} />
      <TextGroup {...props} attribute={'effectiveDate'} text={'Effective Date'} cannotEdit />
    </div>

    <div className="formRow" id="locationInfo">
      <TextGroup {...props} attribute={'address'} text={'Address'} />
      <TextGroup {...props} attribute={'city'} text={'City'} />
      <TextGroup {...props} attribute={'province'} text={'Province'} />
      <TextGroup {...props} attribute={'postalCode'} text={'Postal Code'} />
    </div>

    <div className="formRow" id="userInfo">
      <TextGroup {...props} attribute={'authorizedUserId'} text={'Authorized User'} />
      {/*
                <userIdButton onChange={props.handleChanges}/>
            */}
      <TextGroup {...props} attribute={'contactUserId'} text={'Contact User'} />
    </div>
  </div>
);

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      display={value === index ? 'inline' : 'none'}
      {...other}
    >
      {children}
    </div>
  );
};

const makeIdentifier = index => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const OrganizationForm = props => {
  const [current, setCurrent] = useState(0);
  const handleChange = (event, value) => setCurrent(value);

  const onClickAdd = (_event, program) => {
    props.updateState('programId', props.object.programId.concat(program._id));
  };

  const onClickDelete = (_event, program) => {
    props.updateState(
      'programId',
      props.object.programId.filter(elem => elem !== program._id),
    );
  };

  return (
    <Paper>
      <form onSubmit={() => false}>
        <AppBar
          position="static"
          color="transparent"
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Tabs
            value={current}
            onChange={handleChange}
            aria-label="form navigation"
            indicatorColor="primary"
          >
            <Tab label="Organization Info" {...makeIdentifier(0)} />
            <Tab label="Program List" {...makeIdentifier(1)} />
          </Tabs>
        </AppBar>

        <div className="formBody">
          <TabPanel value={current} index={0}>
            <OrgInfo {...props} />
          </TabPanel>
          <TabPanel value={current} index={1}>
            <ProgList
              programIds={props.object.programId}
              isEditable={props.object.active}
              onClickAdd={onClickAdd}
              onClickDelete={onClickDelete}
            />
          </TabPanel>

          <div className="formActions">
            <Button
              type="button"
              color="primary"
              variant="contained"
              size="large"
              onClick={() => props.cancel()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              size="large"
              onClick={() => props.submit()}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

const currentTime = () => {
  const now = new Date();
  return now.toISOString();
};

class ModifyOrganization extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    const temp = Object.assign({}, props.object);
    delete temp._id;
    this.state = temp;
  }

  updateState = (name, value) => {
    this.setState(state => Object.assign({}, state, { [name]: value }));
  };

  handleChanges = e => {
    const { name, value, checked, type } = e.target;
    let updateValue;

    switch (type) {
      case 'checkbox':
        updateValue = !checked;
        break;
      case 'number':
        updateValue = parseInt(value);
        break;
      default:
        updateValue = value;
    }

    if (name === 'active') {
      if (updateValue) {
        this.updateState('expiryDate', null);
      } else {
        this.updateState('expiryDate', currentTime());
      }
    }

    this.updateState(name, updateValue);
  };

  render = () => (
    <div>
      <OrganizationHeader title={this.props.title} />
      <OrganizationForm
        object={this.state}
        submit={() => this.props.submit(this.state)}
        cancel={this.props.cancel}
        handleChanges={this.handleChanges}
        updateState={this.updateState}
      />
    </div>
  );
}

// createOrg passes in empty object, editOrg passes in pre-existing object
ModifyOrganization.propTypes = {
  object: PropTypes.object,
  title: PropTypes.string,
  submit: PropTypes.func,
  cancel: PropTypes.func,
};

export { currentTime, ModifyOrganization as default };
