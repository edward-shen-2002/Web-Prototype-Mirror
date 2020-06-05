import React from "react";
import RegisterDAL from "../DataAccessLayer";

const {getAllAppSys, getAllOrgGroup, getOrgByOrgGroup, getProgramById, getTemplateTypeByProgramIds, createUser}= new RegisterDAL();

const handleInputTemplate = (templateSet, submission) => {
  let templateType= {
    templateTypeId: "",
    templateCode: "",
  }
  let templateSelected = templateSet.find(function(element){
    return element.templateTypeId == submission.submission._id;
  });

  if (templateSelected == undefined) {
    templateType.templateCode = submission.submission.name;
    templateType.templateTypeId = submission.submission._id;
    templateSelected = templateType;
    templateSet.push(templateSelected);
  }
}

const handleInputProgram = (programSet, submission) => {
  let program= {
    programId: "",
    programCode: "",
    template: [],
  }
  let programSelected = programSet.find(function(element){
    return element.programId == submission.program.code;
  });

  if (programSelected == undefined) {
    program.programCode = submission.program.code;
    program.programId = submission.program._id;
    programSelected = program;
    programSet.push(programSelected);
  }

  handleInputTemplate(programSelected.template, submission);
}

const handleInputOrg = (organization, submission) => {
  let org= {
    orgId: "",
    program: [],
  };

  let organizationSelected = organization.find(function(element){
    return element.orgId == submission.organization.id;
  });
  if (organizationSelected == undefined) {
    org.IsActive = false;
    org.orgId = submission.organization.id;
    org.name = submission.organization.name;
    org.authorizedPerson = submission.organization.authorizedPerson;
    organizationSelected = org;

    organization.push(organizationSelected);
  }

  handleInputProgram(organizationSelected.program, submission);
}

const checkPerission = (submission) => {
  let permission = [];
  if(submission.approve) permission.push("approve");
  if(submission.review) permission.push("review");
  if(submission.submit) permission.push("submit");
  if(submission.input) permission.push("input");
  if(submission.view) permission.push("view");
  if(submission.viewCongos) permission.push("viewCongos");
  return permission;
}


export default class RegisterService {

  getAppSys() {
    return(
      getAllAppSys()
        .then(({data: {data: {appSys}}}) => {
          let options = [];
          appSys.forEach(appSysOptions => {
            options.push({label: appSysOptions.name, value: {name: appSysOptions.name, _id: appSysOptions._id}});
          });

          return options;
        })
        .catch((error) => console.error(error))
      )
  }

  getOrgGroup() {
    return(getAllOrgGroup()
      .then(({data: {data: {organizationGroups}}}) => {
        let options = [];
        organizationGroups.forEach(orgGroup => {
          options.push({label: orgGroup.name, value: {name: orgGroup.name, _id: orgGroup._id}});
        });

        return options;
      })
      .catch((error) => console.error(error))
    )
  }

  getOrg(orgGroup) {

    return(getOrgByOrgGroup(orgGroup)
      .then(({data: {data: {organizations}}}) => {
        let options = []
        organizations.forEach(org => {
          options.push({label: "(" + org.id + ")" + org.name,
            value: org.id, information: {_id: org._id, name: org.name,  id: org.id, orgGroupId: orgGroup,
              programId: org.programId, authorizedPerson: org.authorizedPerson}});
        });
        return options;
      })
      .catch((error) => console.error(error))
    )
  }

  searchOrg (searchKey, reference, options) {
    return options[searchKey]==reference;
  }


  getProgram(programInfo) {
    let programId = [];
    programInfo.forEach(program => {
      programId.push(program.id)
    })

    return(getProgramById(programId)
      .then(({data: {data: {programs}}}) => {
        let options = [];
        programs.forEach(program => {
          const option = programInfo.find(element => element.id == program._id);
          options.push({label: "(" + program.code + ")" + program.name, value: program._id,
          information: {_id: program._id, name: program.name,  code: program.code, org: option.org}});
        });

        return options;
      })
      .catch((error) => console.error(error))
    )
  }

  getTemplateType (userPrograms) {
    let programList = [];
    userPrograms.forEach(userProgram => {
      programList.push(userProgram._id);
    })
    return(getTemplateTypeByProgramIds(programList)
      .then(({data: {data: {templateTypes}}}) => {
        let submissionList = [];
        let index = 0;

        templateTypes.forEach(templateType => {
          const submission = userPrograms.find(element => templateType.programId.includes(element._id));
          console.log(submission);
          submissionList.push({
            organization: submission.org,
            program: {name: submission.name, code: submission.code, _id: submission._id},
            submission: {name: templateType.name, _id: templateType._id},
            approveAvailable: templateType.isApprovable,
            reviewAvailable: templateType.isReviewable,
            submitAvailable: templateType.isSubmittable,
            inputAvailable: templateType.isInputtable,
            viewAvailable: templateType.isViweable,
            viewCognosAvailable: templateType.isReportable,
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
        return submissionList;
      })
      .catch((error) => console.error(error))
    )
  }

  sendRegistrationData(registerData) {
    return(createUser(registerData)
      .catch((error) => console.error(error))
    )
  }

  submissionChange (userSubmissions) {
    let permissionList = [];
    userSubmissions.forEach(submission => {
      const permission = checkPerission(submission);
      permission.forEach(permission=> {
        permissionList.push({
          organization: submission.organization,
          program: submission.program,
          submission: submission.submission,
          permission: permission,
          approve: submission.approve,
          review: submission.review,
          submit: submission.submit,
          view: submission.view,
          viewCongos: submission.viewCongos,
          input: submission.input,
        })
      })

    });
    return permissionList;
  }


  handleInputSysRole (data, permission, submission, userAppSys) {
    let sysRole= {
      appSys: "",
      role: "",
      org: [],
    };
    if (submission[permission]){
      let sysRoleSelected = data.sysRole.find(function(element){
        return element.role == permission;
      });
      if (sysRoleSelected == undefined) {
        sysRoleSelected = sysRole;
        sysRoleSelected.role = permission;
        sysRoleSelected.appSys = userAppSys.code;
        data.sysRole.push(sysRoleSelected);
      }
      handleInputOrg(sysRoleSelected.org, submission);
    }
  }

  // checkUserInfo (registerData) {
  //   const userAndEmail = {username: registerData.username, email: registerData.email}
  //   return publicAxios.post(`${REST_PUBLIC_DATA}/checkUserDup`, {userAndEmail})
  //     .then(({data: {data: {user}}}) => {
  //       let msg = {dup: false, type: ""};
  //       if (user.username == registerData.username) {
  //         msg = {dup: true, type: "username"}
  //       } else if (user.email == registerData.email) {
  //         msg = {dup: true, type: "email"}
  //       }
  //       return msg;
  //     })
  //     .catch((error) => console.error(error));
  // }


}

// let Register = ({ isOnline, history }) => {
//   const registerManager = new RegisterController(props);
//   const [ registrationData, setRegistrationData ] = useState({
//     title: "Mr.",
//     username: "Haonan",
//     email: "sampleUser@ontario.ca",
//     firstName: "Haonan",
//     lastName: "Sun",
//     phoneNumber: "1234567890",
//     password: "123qweASD",
//     passwordConfirm: "123qweASD",
//     ext: "111",
//     organizations: {},
//     programs: []
//   });
//
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [ organizationGroup, setOrganizationGroup] = useState("Health Service Providers");
//   const [ helperState, setHelperState] = useState(true);
//   const [ userPhoneNumber, setUserPhoneNumber] = useState("");
//   const [ userEmail, setUserEmail] = useState("");
//   const [ userID, setUserID] = useState("");
//   const [ password, setPassword] = useState("");
//   const [ lastName, setLastName] = useState("");
//   const [ firstName, setFirstName] = useState("");
//   const [ Ext, setExt] = useState("");
//   const [ isSnackbarOpen, setIsSnackbarOpen] = useState(false);
//   const steps = getSteps();
//   const [ organizationOptions, setOrganizationOptions ] = useState([]);
//   const [ programOptions, setProgramOptions ] = useState([]);
//   const [ userOrganizations, setUserOrganizations ] = useState([]);
//   const [ userPrograms, setUserPrograms ] = useState([]);
//   const [ userSubmissions, setUserSubmissionList] = useState([]);
//   const [ userOrgInformation, setUserOrgInformation] = useState({});
//   const [ userPermissions, setUserPermissionList] = useState([]);
//   const [ ableToComplete, setAbleToComplete] = useState(false);
//   const [ searchKey, setSearchKey] = useState("");
//   const [ reference, setReference] = useState("");
//
//   let userInformation = {
//     organizationGroup: "",
//     organization: [{code: "", name: ""}],
//     program: [{name: ""}],
//     submission: [{name: "", Approve: false, Review: false, Submit: false, Input: false, View: false, ViewCognos: false}],
//     AuthorizedPerson: {name: "", email: "", phoneNumber: ""},
//     title: "",
//     userId: "",
//     lastName: "",
//     firstName: "",
//     phoneNumber: "",
//     etc: "",
//     email: "",
//     password: ""
//   };
//
//   const handleChangePermission = (rowData, event, permission) => {
//     let submissions = userSubmissions;
//     console.log(userSubmissions);
//     const instruction = ""
//     submissions[rowData.index][permission] = event.target.checked;
//     rowData.approve = event.target.checked;
//     setUserSubmissionList(submissions);
//     setHelperState(!helperState)
//
//   }
//
//   // const handleChangeReview = (rowData, event) => {
//   //   let submissions = userSubmissions;
//   //   console.log(userSubmissions);
//   //   submissions[rowData.index].review = event.target.checked;
//   //   rowData.review = event.target.checked;
//   //   setUserSubmissionList(submissions);
//   //   setHelperState(!helperState)
//   //
//   // }
//   // const handleChangeInput = (rowData, event) => {
//   //   let submissions = userSubmissions;
//   //   console.log(userSubmissions);
//   //   submissions[rowData.index].input = event.target.checked;
//   //   rowData.input = event.target.checked;
//   //   setUserSubmissionList(submissions);
//   //   setHelperState(!helperState)
//   //
//   // }
//   // const handleChangeView = (rowData, event) => {
//   //   let submissions = userSubmissions;
//   //   console.log(userSubmissions);
//   //   submissions[rowData.index].view = event.target.checked;
//   //   rowData.view = event.target.checked;
//   //   setUserSubmissionList(submissions);
//   //   setHelperState(!helperState)
//   //
//   // }
//   // const handleChangeSubmit = (rowData, event) => {
//   //   let submissions = userSubmissions;
//   //   console.log(userSubmissions);
//   //   submissions[rowData.index].submit = event.target.checked;
//   //   rowData.submit = event.target.checked;
//   //   setUserSubmissionList(submissions);
//   //   setHelperState(!helperState)
//   //
//   // }
//   // const handleChangeViewCognos = (rowData, event) => {
//   //   let submissions = userSubmissions;
//   //   console.log(userSubmissions);
//   //   submissions[rowData.index].viewCognos = event.target.checked;
//   //   rowData.viewCognos = event.target.checked;
//   //   setUserSubmissionList(submissions);
//   //   setHelperState(!helperState)
//   //
//   // }
//
//   const { values: { organizations: userOrganizationsMap, programs: userProgramsMap}, setFieldValue } = props;
//
//   const titleOptions = [
//     {label: "Mr.", value: "Mr."},
//     {label: "Mrs.", value: "Mrs."},
//     {label: "Ms.", value: "Ms."},
//     {label: "Dr.", value: "Dr."}
//   ]
//
//   const checkBoxColumns = [
//     { title: "Organization", field: "organization" },
//     { title: "Program", field: "program" },
//     { title: "Submission", field: "submission"},
//     { title: "Approve*", field: "approve" ,render: rowData =>
//         <Checkbox
//           checked={rowData.approve}
//           disabled={!rowData.approveAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "approve")}
//           color="primary"
//         />
//     },
//     { title: "Review**", field: "review" ,render: rowData =>
//         <Checkbox
//           checked={rowData.review}
//           disabled={!rowData.reviewAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "review")}
//           color="primary"
//         />
//     },
//     { title: "Submit***", field: "submit" ,render: rowData =>
//         <Checkbox
//           checked={rowData.submit}
//           disabled={!rowData.submitAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "submit")}
//           color="primary"
//         />
//     },
//     { title: "Input****", field: "input" ,render: rowData =>
//         <Checkbox
//           checked={rowData.input}
//           disabled={!rowData.inputAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "input")}
//           color="primary"
//         />
//     },
//     { title: "View*****", field: "view" ,render: rowData =>
//         <Checkbox
//           checked={rowData.view}
//           disabled={!rowData.viewAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "view")}
//           color="primary"
//         />
//     },
//     { title: "View Cognos******", field: "viewCognos" ,render: rowData =>
//         <Checkbox
//           checked={rowData.viewCognos}
//           disabled={!rowData.viewCognosAvailable}
//           onChange={handleChangePermission.bind(this, rowData, "viewCongos")}
//           color="primary"
//         />
//     },
//   ]
//
//
//   const columns = [
//     { title: "Organization", field: "organization" },
//     { title: "Program", field: "program" },
//     { title: "Submission", field: "submission" },
//     { title: "Permission", field: "permission" },
//     { title: "Authoritative Person Name", field: "authoritativePersonName" },
//     { title: "Authoritative Person's Phone Number", field: "authoritativePersonPhoneNumber" },
//     { title: "Authoritative Person's Email", field: "authoritativePersonEmail" }
//   ];
//
//   const registerSchema = yup.object().shape({
//     title: yup.string()
//       .required("Please select one title"),
//     username: yup.string()
//       .min(6, "Username must be 6 to 20 characters long")
//       .max(20, "Username must be 6 to 20 characters long")
//       .required("Please enter a username"),
//     password: yup.string()
//       .min(8, "The given password is too short. Password must be at least 8 character(s) long")
//       .matches(/[{0-9}]/, "Password has too few numeric characters (0-9). The password must have at least 1 numeric character(s)")
//       .matches(/[{a-z}{A-Z}}]/, "Password has too few alphabetic characters (A-Z, a-z). The password must have at least 2 alphabetic character(s)")
//       .required("Please enter a password"),
//     passwordConfirm: yup.string()
//       .oneOf([yup.ref("password"), null], "Password should match with Verify Password")
//       .required("Please confirm your password"),
//     firstName: yup.string()
//       .required("Please enter first name")
//       .max(100, "Name is too long, please enter an alias or nickname instead"),
//     lastName: yup.string()
//       .required("Please enter last name")
//       .max(100, "Name is too long, please enter an alias or nickname instead"),
//     phoneNumber: yup.string()
//       .length(10,"Please enter valid phone number")
//       .matches(/^[0-9]+$/, "Please enter valid phone number")
//       .required("Please enter phone number"),
//     email: yup.string()
//       .email("Please enter a valid email")
//       .max(254, "Email is too long")
//       .required("Please enter your email"),
//     ext: yup.string()
//       .max(100, "Ext is too long"),
//   });
//
//   const searchKeyOptions = [
//     {label: "Organization Code", value: "code"},
//     {label: "Organization Name", value: "name"},
//     {label: "Location Name", value: "LocationName"},
//   ]
//
//
//
//   return (
//     <>
//       <Register
//         steps={steps}
//         activeStep={activeStep}
//         searchKey={searchKey}
//         reference={reference}
//         setSearchKey={setSearchKey}
//         setReference={setReference}
//         organizationGroup={organizationGroup}
//         handleOrgGroupChange={handleOrgGroupChange}
//         isSnackbarOpen={isSnackbarOpen}
//         setIsSnackbarOpen={setIsSnackbarOpen}
//         handleBack={handleBack}
//         handleNext={handleNext}
//         handleSubmit={handleSubmit}
//         userOrganizations={userOrganizations}
//         userPrograms={userPrograms}
//         userSubmissions={userSubmissions}
//         userPermissions={userPermissions}
//         setUserSubmissionList={setUserSubmissionList}
//         setUserPermissionList={setUserPermissionList}
//         columns={columns}
//         checkBoxColumns={checkBoxColumns}
//         organizationOptions={organizationOptions}
//         programOptions={programOptions}
//         setOrganizationOptions={setOrganizationOptions}
//         handleOrgChange={handleOrgChange}
//         titleOptions={titleOptions}
//         handleTitleChange={handleTitleChange}
//         handleProgramChange={handleProgramChange}
//         handleSubmissionChange={handleSubmissionChange}
//         createProgram={createProgram}
//         ableToComplete={ableToComplete}
//         setAbleToComplete={setAbleToComplete}
//         props={props}) => {
//
//
//       />
//     </>
//   )
// }