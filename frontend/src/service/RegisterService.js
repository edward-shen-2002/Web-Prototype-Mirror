import React, {lazy, useState} from "react";


import { publicAxios } from "../tools/rest";


import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "../constants/rest";
import {element} from "prop-types";

let hash = require("object-hash");

const handleInputTemplate = (templateSet, submission) => {
  let templateType= {
    templateTypeId: "",
    templateCode: "",
  }
  let templateSelected = templateSet.find(function(element){
    return element.templateCode == submission.submission;
  });

  if (templateSelected == undefined) {
    templateType.templateCode = submission.submission;
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
    return element.programCode == submission.program;
  });

  if (programSelected == undefined) {
    program.programCode = submission.program;
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
    return element.orgId == submission.organization;
  });
  if (organizationSelected == undefined) {
    org.orgId = submission.organization;
    organizationSelected = org;

    organization.push(organizationSelected);
  }

  handleInputProgram(organizationSelected.program, submission);
}

const checkPerission = (submission) => {
  if(submission.approve) return "approve";
  else if(submission.review) return "review";
  else if(submission.submit) return "submit";
  else if(submission.input) return "input";
  else if(submission.view) return "view";
  else if(submission.viewCongos) return "viewCongos";
}


export default class RegisterService {

  // searchOrgBySearckKey(searchKey, reference) {
  //   publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${searchKey}/${reference}`)
  //     .then(({data: {data: {organizations}}}) => {
  //       let options = []
  //       organizations.forEach(org => {
  //         options.push({label: "(" + org.code + ")" + org.name, value: org.code});
  //       });
  //       return options;
  //     })
  //     .catch((error) => console.error(error));
  //   if (searchKey == "OrgGroup") {
  //     publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${reference}`)
  //       .then(({data: {data: {organizations}}}) => {
  //         let options = []
  //         organizations.forEach(org => {
  //           options.push({label: "(" + org.code + ")" + org.name, value: org.code});
  //         });
  //         return options;
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }

  getAppSys() {
    return publicAxios.get(`${REST_PUBLIC_DATA}/AppSys`)
      .then(({data: {data: {appSys}}}) => {
        console.log(appSys);
        let options = [];
        appSys.forEach(appSysOptions => {
          options.push({label: appSysOptions.name, value: {name: appSysOptions.name, _id: appSysOptions._id}});
        });

        return options;
      })
      .catch((error) => console.error(error));
  }

  getOrgGroup() {
    return publicAxios.get(`${REST_PUBLIC_DATA}/organizationGroups`)
      .then(({data: {data: {organizationGroups}}}) => {
        console.log(organizationGroups);
        let options = [];
        organizationGroups.forEach(orgGroup => {
          options.push({label: orgGroup.name, value: {name: orgGroup.name, _id: orgGroup._id}});
        });

        return options;
      })
      .catch((error) => console.error(error));
  }

  getOrg(orgGroup) {
    console.log(orgGroup)
    return publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${orgGroup}`)
      .then(({data: {data: {organizations}}}) => {
        let options = []
        organizations.forEach(org => {
          options.push({label: "(" + org.id + ")" + org.name,
            value: org.id, information: {_id: org._id, name: org.name,  id: org.id, orgGroupId: orgGroup,
              programId: org.programId, authorizedPerson: org.authorizedPerson}});
        });

        return options;
      })
      .catch((error) => console.error(error));
  }

  // handleSearchKeyChange (event) {
  //   setSearchKey(event.value);
  // }
  // handleReferenceChange (event) {
  //   const { target: { name, value } } = event;
  //   setReference(value);
  // }

  searchOrg (searchKey, reference, options) {
    return options[searchKey]==reference;
    // const orgOptions = this.searchOrgBySearckKey(searchKey, reference);
    // setOrganizationOptions(options);
  }


  getProgram(programInfo) {

    let programId = [];
    programInfo.forEach(program => {
      programId.push(program.id)
    })

    return publicAxios.post(`${REST_PUBLIC_DATA}/programs` ,{ programId })
      .then(({data: {data: {programs}}}) => {
        let options = [];
        programs.forEach(program => {
          const option = programInfo.find(element => element.id == program._id);
          options.push({label: "(" + program.code + ")" + program.name, value: program._id,
          information: {_id: program._id, name: program.name,  code: program.code, org: option.org}});
        });

        return options;
      })
      .catch((error) => console.error(error));
  }

    // publicAxios.get(`${REST_PUBLIC_DATA}/organizations/code/${event.value}`)
    //   .then(({data: {data: {organizations}}}) => {
    //     console.log(organizations);
    //     let orgInformation = {name: organizations[0].name, authorizedName: organizations[0].contact.name, phone: organizations[0].contact.telephone, email: organizations[0].contact.email};
    //     setUserOrgInformation(orgInformation);
    //   })
    //   .catch((error) => console.error(error));


  // handleTitleChange  (event)  {props.values.title = event.target.value;}
  //
  // handleOrgGroupChange (event)  {setOrganizationGroup(event.target.value);}

  getTemplateType (userPrograms) {
    let programList = [];
    userPrograms.forEach(userProgram => {
      programList.push(userProgram._id);
    })
    console.log(programList);
    return publicAxios.post(`${REST_PUBLIC_DATA}/templateType`,{ programList })
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
      .catch((error) => console.error(error));
  }

  sendRegistrationData   (registerData) {
    console.log(registerData)
    return publicAxios.post(`${REST_PUBLIC_DATA}/registration`,{ registerData })
      .catch((error) => console.error(error));
  }

  submissionChange (userSubmissions) {
    let permissionList = [];
    userSubmissions.forEach(submission => {
      const permission = checkPerission(submission);
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
        sysRoleSelected.appSys = userAppSys;
        data.sysRole.push(sysRoleSelected);
      }
      console.log(submission);
      handleInputOrg(sysRoleSelected.org, submission);
    }
  }


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