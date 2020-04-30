import React, {lazy, useState} from "react";

import { connect } from "react-redux";

import { Formik } from "formik";

import { publicAxios } from "../tools/rest";
import RegisterService from "../service/RegisterService";
import RegisterUI from "../views/PublicRouter/Register/Register"

import logo from "../images/brand/ON_POS_LOGO_WHITE.svg";
import SRIBar from "../images/brand/SRI.jpg";

import { ROLE_LEVEL_NOT_APPLICABLE } from "../constants/roles";
import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "../constants/rest";
import { ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "../constants/routes";
import * as yup from "yup";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import {createProgram} from "typescript";
let hash = require("object-hash");
let instance = null;
export default class RegisterController {

  constructor(){
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
    const [ searchKey, setSearchKey] = useState("");
    const [ reference, setReference] = useState("");
  }

//   searchOrgBySearckKey(searchKey, reference){
//     if (searchKey == "code") {
//
//       publicAxios.get(`${REST_PUBLIC_DATA}/organizations/code/${reference}`)
//         .then(({data: {data: {organizations}}}) => {
//           let options = []
//           organizations.forEach(org => {
//             options.push({label: "(" + org.code + ")" + org.name, value: org.code});
//           });
//           return options;
//         })
//         .catch((error) => console.error(error));
//     }
//     else if (searchKey == "name") {
//       publicAxios.get(`${REST_PUBLIC_DATA}/organizations/name/${reference}`)
//         .then(({data: {data: {organizations}}}) => {
//           let options = []
//           organizations.forEach(org => {
//             options.push({label: "(" + org.code + ")" + org.name, value: org.code});
//           });
//           return options;
//         })
//         .catch((error) => console.error(error));
//     }
//     else if (searchKey == "LocationName") {
//       publicAxios.get(`${REST_PUBLIC_DATA}/organizations/locationName/${reference}`)
//         .then(({data: {data: {organizations}}}) => {
//           let options = []
//           organizations.forEach(org => {
//             options.push({label: "(" + org.code + ")" + org.name, value: org.code});
//           });
//           return options;
//         })
//         .catch((error) => console.error(error));
//     }
//     else if (searchKey == "OrgGroup") {
//       const organizationGroup = reference;
//       publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${organizationGroup}`)
//         .then(({data: {data: {organizations}}}) => {
//           let options = []
//           organizations.forEach(org => {
//             options.push({label: "("+org.code+")"+org.name, value: org.code});
//           });
//           return options;
//         })
//         .catch((error) => console.error(error));
//     }
//   }
// }
let Register = ({ isOnline, history }) => {
  const registerManager = new RegisterController(props);

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

  const handleChangePermission = (rowData, event, permission) => {
    let submissions = userSubmissions;
    console.log(userSubmissions);
    const instruction = ""
    submissions[rowData.index][permission] = event.target.checked;
    rowData.approve = event.target.checked;
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
          onChange={handleChangePermission.bind(this, rowData, "approve")}
          color="primary"
        />
    },
    { title: "Review**", field: "review" ,render: rowData =>
        <Checkbox
          checked={rowData.review}
          disabled={!rowData.reviewAvailable}
          onChange={handleChangePermission.bind(this, rowData, "review")}
          color="primary"
        />
    },
    { title: "Submit***", field: "submit" ,render: rowData =>
        <Checkbox
          checked={rowData.submit}
          disabled={!rowData.submitAvailable}
          onChange={handleChangePermission.bind(this, rowData, "submit")}
          color="primary"
        />
    },
    { title: "Input****", field: "input" ,render: rowData =>
        <Checkbox
          checked={rowData.input}
          disabled={!rowData.inputAvailable}
          onChange={handleChangePermission.bind(this, rowData, "input")}
          color="primary"
        />
    },
    { title: "View*****", field: "view" ,render: rowData =>
        <Checkbox
          checked={rowData.view}
          disabled={!rowData.viewAvailable}
          onChange={handleChangePermission.bind(this, rowData, "view")}
          color="primary"
        />
    },
    { title: "View Cognos******", field: "viewCognos" ,render: rowData =>
        <Checkbox
          checked={rowData.viewCognos}
          disabled={!rowData.viewCognosAvailable}
          onChange={handleChangePermission.bind(this, rowData, "viewCongos")}
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

  const searchKeyOptions = [
    {label: "Organization Code", value: "code"},
    {label: "Organization Name", value: "name"},
    {label: "Location Name", value: "LocationName"},
  ]

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.value);
  }
  const handleReferenceChange = (event) => {
    const { target: { name, value } } = event;
    setReference(value);
    console.log(searchKey, reference);
  }

  const handleSearchOrg = () => {
    const orgOptions = registerManager.searchOrgBySearckKey(searchKey, reference);
    setOrganizationOptions(options);
  }

  const handleNext = () => {
    if (activeStep === 0) {
      const orgOptions = registerManager.searchOrgBySearckKey("OrgGroup", organizationGroup);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };


  return (
    <>
      <RegisterUI
        steps={steps}
        activeStep={activeStep}
        searchKey={searchKey}
        reference={reference}
        setSearchKey={setSearchKey}
        setReference={setReference}
        organizationGroup={organizationGroup}
        handleOrgGroupChange={handleOrgGroupChange}
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        handleSnackbarClose={handleSnackbarClose}
        userOrganizations={userOrganizations}
        userPrograms={userPrograms}
        userSubmissions={userSubmissions}
        userPermissions={userPermissions}
        setUserSubmissionList={setUserSubmissionList}
        setUserPermissionList={setUserPermissionList}
        columns={columns}
        checkBoxColumns={checkBoxColumns}
        organizationOptions={organizationOptions}
        programOptions={programOptions}
        setOrganizationOptions={setOrganizationOptions}
        handleOrgChange={handleOrgChange}
        titleOptions={titleOptions}
        handleTitleChange={handleTitleChange}
        handleProgramChange={handleProgramChange}
        handleSubmissionChange={handleSubmissionChange}
        createProgram={createProgram}
        ableToComplete={ableToComplete}
        setAbleToComplete={setAbleToComplete}
        props={props}


    />
</>
)
}