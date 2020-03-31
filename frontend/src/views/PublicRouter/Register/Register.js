import React, {lazy, useState} from "react";

import { connect } from "react-redux";

import { Formik } from "formik";

import { publicAxios } from "@tools/rest";

import logo from "@images/brand/ON_POS_LOGO_WHITE.svg";
import SRIBar from "@images/brand/SRI.jpg";

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";
import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "@constants/rest";
import { ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "@constants/routes";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from "react-select";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Preregister from "../Preregister";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FilteredMultiSelect from 'react-filtered-multiselect'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


import "./Register.scss";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import CustomSnackbarContent from "../../../tools/components/CustomSnackbarContent/CustomSnackbarContent";
import uniqid from "uniqid";
import {createProgram} from "typescript";

const MaterialTable = lazy(() => import("material-table"));

function getSteps() {
  return ['Step1', 'Step2', 'Step3'];
}

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, value);

  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    console.log(this.props.value);
    return (
      <div className={this.props.className}>
        <Select
          id={this.props.name}
          options={this.props.options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          defaultValue={this.props.value}
          name={this.props.name}
          variant="outlined"
        />
        {!!this.props.error &&
        this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
        )}
      </div>
    );
  }
}

const defaultRoleControlConfig = { organizationOptions:[], userOrganization:[], programOptions:[], userProgram:[] };

const registerSchema = yup.object().shape({
  title: yup.string()
    .required("Please select one title"),
  username: yup.string()
    .min(6, "Username must be 6 to 20 characters long")
    .max(20, "Username must be 6 to 20 characters long")
    .required("Please enter a username"),
  password: yup.string()
    .min(8, "The given password is too short. Password must be at least 8 character(s) long")
    .matches(/[{0-9}]/, "Password has too few numeric characters (0-9). The password must have at least 1 numeric character(s)")
    .matches(/[{a-z}{A-Z}}]/, "Password has too few alphabetic characters (A-Z, a-z). The password must have at least 2 alphabetic character(s)")
    .required("Please enter a password"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "Password should match with Verify Password")
    .required("Please confirm your password"),
  firstName: yup.string()
    .required("Please enter first name")
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  lastName: yup.string()
    .required("Please enter last name")
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  phoneNumber: yup.string()
    .length(10,"Please enter valid phone number")
    .matches(/^[0-9]+$/, "Please enter valid phone number")
    .required("Please enter phone number"),
  email: yup.string()
    .email("Please enter a valid email")
    .max(254, "Email is too long")
    .required("Please enter your email"),
  ext: yup.string()
    .max(100, "Ext is too long"),
});

const Header = () => (
  <div className="header__container">
    <div className="header__bgnd">
      <img src={SRIBar} className="header__logoBar"/>
      <img src={logo} height={48} alt="MOH Logo" className="header__logo"/>
    </div>
  </div>
)

const ButtonBox = ({activeStep, handleBack, handleNext, ableToComplete}) => (
  <Box border={1} color="primary" className="register__buttonBox" justifyContent="center">
    <Button disabled={activeStep === 0} variant="outlined" color="primary" className="register__buttonBack" onClick={handleBack} >
      Back
    </Button>

    <Button variant="outlined" color="primary" className="register__button"  href={ROUTE_PUBLIC_LOGIN} >
      Cancel
    </Button>

    <Button disabled={activeStep == 2} variant="outlined" color="primary" className="register__button"  onClick={handleNext} >
      Next
    </Button>

    <Button disabled={!ableToComplete || activeStep !== 2} variant="outlined" color="primary" className="register__button"  onClick={handleNext} >
      COMPLETE REGISTRATION
    </Button>
    <Typography className="register__inputTitle">
      To navigate from one page to the next for registration, please use the button provided on the page. Do not use your browsers's Back and Forward buttons.
    </Typography>

  </Box>
);

const selectOrgProgram = (organizationGroup, organizationOptions, handleOrgChange, handleProgramChange,programOptions, selectedPrograms) => {
  switch (organizationGroup) {
    case "Health Service Providers":
      return(
        <>
          <Typography className="register__inputTitle"> *Organizations </Typography>
          <Select
            name = "organizations"
            options = {organizationOptions}
            onChange={handleOrgChange}
            className="register__select"
          />
          <Typography className="register__inputTitle"> *Program </Typography>

          <FilteredMultiSelect
            onChange={handleProgramChange}
            options={programOptions}
            selectedOptions={selectedPrograms}
            textProp="label"
            valueProp="value"
            buttonText="Add Program"
            className="register__filteredMultiSelect"
            showFilter={false}
            classNames={{
              button: "register__step3Button",
              select: "register__multiSelect",
            }}
          />
        </>
      )
  }
}

const getStepContent = (steps, activeStep, organizationGroup, handleOrgGroupChange, isSnackbarOpen, setIsSnackbarOpen, handleBack, handleNext, handleSubmit, handleSnackbarClose,
                        userOrganizations, userPrograms, userSubmissions, userPermissions, setUserSubmissionList, setUserPermissionList, columns, checkBoxColumns, organizationOptions, programOptions,
                        handleOrgChange, titleOptions, handleTitleChange, handleProgramChange, handleSubmissionChange, createProgram, ableToComplete, setAbleToComplete, props) => {

  const { values, handleChange, touched, handleBlur, errors, setFieldValue, setFieldTouched} = props
  switch (activeStep) {
    case 0:
      return (
        <>
          <Box border={1} color="primary" className="register__box" justifyContent="center">
            <FormControl component="fieldset" className="register__selection">
              <FormLabel className="register__title" component="legend">Step1: Select your Organization Group</FormLabel>
              <RadioGroup aria-label="OrgGroup" name="OrgGroup1" defaultValue={organizationGroup} onChange={handleOrgGroupChange}>
                <FormControlLabel value="Health Service Providers" control={<Radio />} label="Health Service Providers" />
                <FormControlLabel value="Local Health Integration Network" control={<Radio />} label="Local Health Integration Network" />
                <FormControlLabel value="Ontario Government" control={<Radio />} label="Ontario Government" />
                <FormControlLabel value="Other User Groups" control={<Radio />} label="Other User Groups" />
              </RadioGroup>
            </FormControl>
          </Box>
          <ButtonBox activeStep = {activeStep} handleBack = {handleBack} handleNext = {handleNext} ableToComplete = {ableToComplete} />
        </>
      );
    case 1:
      console.log(values.title);
      return (
        <>
          <form className="register__form">
            <FormLabel className="register__title" component="legend">Step2: Enter User Information</FormLabel>
            <div className="register__label">
              <Typography className="register__inputTitle"> *Title </Typography>
            </div>
            <div className="register__informationField">
              <MySelect
                name = "title"
                options = {titleOptions}
                value={values.title}
                onChange={setFieldValue}
                className="register__selectTitle"
                onBlur={setFieldTouched}
              />
            </div>
            <div className="register__label">
              <Typography className="register__inputTitle"> *Last Name </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <div className="register__label">
             <Typography className="register__inputTitle"> *First Name </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>

            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Phone Number </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <div className="register__label">
             <Typography className="register__inputTitle"> Ext. </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="Ext."
                name="Ext."
                type="Ext."
                value={values.ext}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Email </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *User ID </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="username"
                name="username"
                type="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Password </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Confirm Password </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={values.passwordConfirm}
                onChange={handleChange}
                error={touched.passwordConfirm && !!errors.passwordConfirm}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            {/*<Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>*/}
            <ButtonBox activeStep = {activeStep} handleBack = {handleBack} handleNext = {handleNext} ableToComplete = {ableToComplete} />
          </form>
        </>
      );
    case 2:
      const selectedPrograms = [];
      console.log(userSubmissions)

      return (
        <div className="register__form">
          {selectOrgProgram(organizationGroup, organizationOptions, handleOrgChange, handleProgramChange,programOptions, selectedPrograms)}

          <div className="register__tableContainer">
            <MaterialTable
              className="register__table"
              columns={checkBoxColumns}
              options={{
                toolbar : false,
                showTitle: false,
                headerStyle: {
                  backgroundColor: "#f2f5f7"
                }
              }}
              style={{
                backgroundColor: "#f2f5f7"
              }}
              data={userSubmissions}
              // editable={editable} options={options}
            />
          </div>
          <Button variant="outlined" color="primary" className="register__step3Button"  onClick={handleSubmissionChange} >
            Add Submission
          </Button>
          <div className="register__tableContainer">
            <MaterialTable
              className="register__table"
              columns={columns}
              options={{
                toolbar : false,
                showTitle: false,
                headerStyle: {
                  backgroundColor: "#f2f5f7"
                }
              }}
              style={{
                backgroundColor: "#f2f5f7"
              }}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Delete Permission',
                  onClick: (event, rowData) => {
                    console.log(rowData.tableData.id);
                    console.log(rowData);
                    let editedPermission = userPermissions.splice(rowData.tableData.id - 1, 1);
                    setUserPermissionList(editedPermission);

                  }
                }
              ]}
              components={{
                Action: props => (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    variant="outlined"
                    style={{textTransform: 'none'}}
                    size="small"
                  >
                    Delete
                  </Button>
                )
              }}
              data={userPermissions}
              // editable={editable} options={options}
            />
            <ButtonBox activeStep = {activeStep} handleBack = {handleBack} handleNext = {handleNext} ableToComplete = {ableToComplete} />
          </div>

        </div>
    );
    default:
      return (
        <Typography >
          Select campaign settings...
        </Typography>);
  }
}

let Register = ({ isOnline, history }) => {

  const [ registrationData, setRegistrationData ] = useState({
    title: "Mr.",
    username: "Haonan",
    email: "sampleUser@ontario.ca",
    firstName: "Haonan",
    lastName: "Sun",
    phoneNumber: "1234567890",
    password: "123qweASD",
    passwordConfirm: "123qweASD",
    ext: "111",
    organizations: {},
    programs: []
  });

  //
  // const handleOrgGroupChange = event => setOrganizationGroup(event.target.value);
  // const handleUserTitleChange = event => setUserTitle(event.target.value);
  // const handleUserPhoneNumberChange = event => setUserPhoneNumber(event.target.value);
  // const handleUserEmailChange = event => setUserEmail(event.target.value);
  // const handleUserIDChange = event => setUserID(event.target.value);
  // const handlePasswordChange = event => setPassword(event.target.value);
  // const handleLastNameChange = event => setLastName(event.target.value);
  // const handleFirstNameChange = event => setFirstName(event.target.value);
  // const handleExtChange = event => setExt(event.target.value);

  const handleRegister = () => {

  };

  return (
    <>
      <Header/>
      <div className="register">

        <br/>
        <Paper className="register__container" >
          <Formik validationSchema={registerSchema} initialValues={registrationData} onSubmit={handleRegister} component={Register_container}/>
        </Paper>
      </div>
    </>
  );

}

const Register_container = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [ organizationGroup, setOrganizationGroup] = useState("Health Service Providers");
  const [ helperState, setHelperState] = useState(true);
  const [ userPhoneNumber, setUserPhoneNumber] = useState("");
  const [ userEmail, setUserEmail] = useState("");
  const [ userID, setUserID] = useState("");
  const [ password, setPassword] = useState("");
  const [ lastName, setLastName] = useState("");
  const [ firstName, setFirstName] = useState("");
  const [ Ext, setExt] = useState("");
  const [ isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const steps = getSteps();
  const [ organizationOptions, setOrganizationOptions ] = useState([]);
  const [ programOptions, setProgramOptions ] = useState([]);
  const [ userOrganizations, setUserOrganizations ] = useState([]);
  const [ userPrograms, setUserPrograms ] = useState([]);
  const [ userSubmissions, setUserSubmissionList] = useState([]);
  const [ userOrgInformation, setUserOrgInformation] = useState({});
  const [ userPermissions, setUserPermissionList] = useState([]);
  const [ ableToComplete, setAbleToComplete] = useState(false);

  let userInformation = {
    organizationGroup: "",
    organization: [{code: "", name: ""}],
    program: [{name: ""}],
    submission: [{name: "", Approve: false, Review: false, Submit: false, Input: false, View: false, ViewCognos: false}],
    AuthorizedPerson: {name: "", email: "", phoneNumber: ""},
    title: "",
    userId: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    etc: "",
    email: "",
    password: ""
  };

  const handleChangeApprove = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].approve = event.target.checked;
    rowData.approve = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }

  const handleChangeReview = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].review = event.target.checked;
    rowData.review = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }
  const handleChangeInput = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].input = event.target.checked;
    rowData.input = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }
  const handleChangeView = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].view = event.target.checked;
    rowData.view = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }
  const handleChangeSubmit = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].submit = event.target.checked;
    rowData.submit = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }
  const handleChangeViewCognos = (rowData, event) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    submissions[rowData.index].viewCognos = event.target.checked;
    rowData.viewCognos = event.target.checked;
    setUserSubmissionList(submissions);
    setHelperState(!helperState)

  }

  const { values: { organizations: userOrganizationsMap, programs: userProgramsMap}, setFieldValue } = props;

  const titleOptions = [
    {label: "Mr.", value: "Mr."},
    {label: "Mrs.", value: "Mrs."},
    {label: "Ms.", value: "Ms."},
    {label: "Dr.", value: "Dr."}
  ]

  const checkBoxColumns = [
    { title: "Organization", field: "organization" },
    { title: "Program", field: "program" },
    { title: "Submission", field: "submission"},
    { title: "Approve*", field: "approve" ,render: rowData =>
        <Checkbox
          checked={rowData.approve}
          disabled={!rowData.approveAvailable}
          onChange={handleChangeApprove.bind(this, rowData)}
          color="primary"
        />
    },
    { title: "Review**", field: "review" ,render: rowData =>
        <Checkbox
          checked={rowData.review}
          disabled={!rowData.reviewAvailable}
          onChange={handleChangeReview.bind(this, rowData)}
          color="primary"
        />
    },
    { title: "Submit***", field: "submit" ,render: rowData =>
        <Checkbox
          checked={rowData.submit}
          disabled={!rowData.submitAvailable}
          onChange={handleChangeSubmit.bind(this, rowData)}
          color="primary"
        />
    },
    { title: "Input****", field: "input" ,render: rowData =>
        <Checkbox
          checked={rowData.input}
          disabled={!rowData.inputAvailable}
          onChange={handleChangeInput.bind(this, rowData)}
          color="primary"
        />
    },
    { title: "View*****", field: "view" ,render: rowData =>
        <Checkbox
          checked={rowData.view}
          disabled={!rowData.viewAvailable}
          onChange={handleChangeView.bind(this, rowData)}
          color="primary"
        />
    },
    { title: "View Cognos******", field: "viewCognos" ,render: rowData =>
        <Checkbox
          checked={rowData.viewCognos}
          disabled={!rowData.viewCognosAvailable}
          onChange={handleChangeViewCognos.bind(this, rowData)}
          color="primary"
        />
    },
  ]


  const columns = [
    { title: "Organization", field: "organization" },
    { title: "Program", field: "program" },
    { title: "Submission", field: "submission" },
    { title: "Permission", field: "permission" },
    { title: "Authoritative Person Name", field: "authoritativePersonName" },
    { title: "Authoritative Person's Phone Number", field: "authoritativePersonPhoneNumber" },
    { title: "Authoritative Person's Email", field: "authoritativePersonEmail" }
  ];


  const handleNext = () => {
    if (activeStep === 0) {
      console.log(organizationGroup);
      publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${organizationGroup}`)
        .then(({data: {data: {organizations}}}) => {
          let options = []
          organizations.forEach(org => {
            options.push({label: "("+org.code+")"+org.name, value: org.code});
          });
          setOrganizationOptions(options);
          setUserOrganizations(Object.keys(userOrganizationsMap).map((_id) => ({...userOrganizationsMap[_id], _id})));
        })
        .catch((error) => console.error(error));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = () => {

  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleOrgChange = event => {
    setUserOrganizations(event.value);
    console.log(event.value);
    publicAxios.get(`${REST_PUBLIC_DATA}/programs/${event.value}`)
      .then(({data: {data: {programs}}}) => {
        let options = []
        programs.forEach(program => {
          options.push({label: "("+program.shortName+")"+program.name, value: program.name});
        });
        setProgramOptions(options);
        setUserPrograms(Object.keys(userProgramsMap).map((_id) => ({...userProgramsMap[_id], _id})));
      })
      .catch((error) => console.error(error));
    publicAxios.get(`${REST_PUBLIC_DATA}/organizations/information/${event.value}`)
      .then(({data: {data: {organizations}}}) => {
        console.log(organizations);
        let orgInformation = {name: organizations[0].name, authorizedName: organizations[0].contact.name, phone: organizations[0].contact.telephone, email: organizations[0].contact.email};
        setUserOrgInformation(orgInformation);
      })
      .catch((error) => console.error(error));
  }

  const handleTitleChange = event => props.values.title = event.target.value;

  const handleOrgGroupChange = event => setOrganizationGroup(event.target.value);

  const handleProgramChange = (selectedPrograms) => {
    setUserPrograms(selectedPrograms);
    let programList = [];
    selectedPrograms.forEach(selectedProgram => {
      programList.push(selectedProgram.value);
    })
    publicAxios.post(`${REST_PUBLIC_DATA}/submissions`,{ programList })
      .then(({data: {data: {submissions}}}) => {
        let submissionList = []
        console.log(submissions);
        let index = 0;
        submissions.forEach(submission => {
          submissionList.push({
            organization: userOrganizations,
            program: submission.program,
            submission: submission.shortName,
            approveAvailable: submission.ApproveAvailable,
            reviewAvailable: submission.ReviewAvailable,
            submitAvailable: submission.SubmitAvailable,
            inputAvailable: submission.InputAvailable,
            viewAvailable: submission.ViewAvailable,
            viewCognosAvailable: submission.ViewCognosAvailable,
            approve: false,
            review: false,
            submit: false,
            input: false,
            view: false,
            viewCognos: false,
            index: index,
          });
          index++;
        });
        setUserSubmissionList(submissionList);
      })
      .catch((error) => console.error(error));
  }

  const handleSubmissionChange = () => {
    let permissionList = [];
    setAbleToComplete(true);
    userSubmissions.forEach(submission => {
      if (submission.approve) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "approve",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
      else if (submission.review) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "review",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
      else if (submission.submit) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "submit",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
      else if (submission.input) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "input",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
      else if (submission.view) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "view",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
      else if (submission.viewCognos) {
        permissionList.push({
          organization: userOrgInformation.code,
          program: submission.program,
          submission: submission.submission,
          permission: "view cognos",
          authoritativePersonName: userOrgInformation.authorizedName,
          authoritativePersonPhoneNumber: userOrgInformation.phone,
          authoritativePersonEmail: userOrgInformation.email,
        })
      }
    })
    setUserPermissionList(permissionList);
    setUserSubmissionList([]);

  }

  return (
     <div>
       <Stepper className="register__stepper" activeStep={activeStep}>
        {steps.map((label, index) => {

          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(steps, activeStep, organizationGroup, handleOrgGroupChange, isSnackbarOpen, setIsSnackbarOpen, handleBack, handleNext, handleSubmit, handleSnackbarClose,
              userOrganizations, userPrograms, userSubmissions, userPermissions, setUserSubmissionList, setUserPermissionList, columns, checkBoxColumns, organizationOptions, programOptions,
              handleOrgChange, titleOptions, handleTitleChange, handleProgramChange, handleSubmissionChange, createProgram, ableToComplete, setAbleToComplete, props)}
          </div>
        )}
      </div>
     </div>
  );
}

export default Register;