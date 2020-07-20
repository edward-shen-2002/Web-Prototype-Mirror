import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  registrationData: {
    title: "Mr.",
    username: "Haonan",
    email: "",
    firstName: "Haonan",
    lastName: "Sun",
    phoneNumber: "1234567890",
    password: "123qweASD",
    passwordConfirm: "123qweASD",
    ext: "111",
    IsActive: false,
    startDate: new Date(),
    endDate: new Date(),
    sysRole: []
  },
  snackbarMessage: "",
  activeStep: 0,
  organizationGroup: [],
  helperState: true,
  isSnackbarOpen: false,
  appSysOptions: [],
  organizationGroupOptions: [],
  organizationOptions: [],
  programOptions: [],
  userOrganizations: [],
  userPrograms: [],
  userSubmissions: [],
  userPermissions: [],
  ableToComplete: false,
  searchKey: "",
  userAppSys: "",
  reference: "",
}

const setRegistrationData = (state, { payload }) => ({
  ...state,
  registrationData: payload.registrationData,
})

const setSnackbarMessage = (state, { payload }) => ({
  ...state,
  snackbarMessage: payload.snackbarMessage,
})

const setActiveStep = (state, { payload }) => ({
  ...state,
  activeStep: payload.activeStep,
})
const setHelperState = (state, { payload }) => ({
  ...state,
  helperState: payload.helperState,
})
const setIsSnackbarOpen = (state, { payload }) => ({
  ...state,
  isSnackbarOpen: payload.isSnackbarOpen,
})
const setAppSysOptions = (state, { payload }) => ({
  ...state,
  appSysOptions: payload.appSysOptions,
})
const setOrganizationGroupOptions = (state, { payload }) => ({
  ...state,
  organizationGroupOptions: payload.organizationGroupOptions,
})
const setOrganizationOptions = (state, { payload }) => ({
  ...state,
  organizationOptions: payload.organizationOptions,
})
const setProgramOptions = (state, { payload }) => ({
  ...state,
  programOptions: payload.programOptions,
})
const setUserOrganizations = (state, { payload }) => ({
  ...state,
  userOrganizations: payload.userOrganizations,
})
const setUserPrograms = (state, { payload }) => ({
  ...state,
  userPrograms: payload.userPrograms,
})
const setUserSubmissionList = (state, { payload }) => ({
  ...state,
  userSubmissions: payload.userSubmissions,
})
const setUserPermissionList = (state, { payload }) => ({
  ...state,
  userPermissions: payload.userPermissions,
})
const setSearchKey = (state, { payload }) => ({
  ...state,
  searchKey: payload.searchKey,
})
const setUserAppSys = (state, { payload }) => ({
  ...state,
  userAppSys: payload.userAppSys,
})
const setReference = (state, { payload }) => ({
  ...state,
  reference: payload.reference,
})
const setOrganizationGroup = (state, { payload }) => ({
  ...state,
  organizationGroup: payload.organizationGroup,
})
const setAbleToComplete = (state, { payload }) => ({
  ...state,
  ableToComplete: payload.ableToComplete,
})

const reducers = {
  setRegistrationData,
  setSnackbarMessage,
  setActiveStep,
  setOrganizationGroup,
  setHelperState,
  setIsSnackbarOpen,
  setAppSysOptions,
  setOrganizationGroupOptions,
  setOrganizationOptions,
  setProgramOptions,
  setUserOrganizations,
  setUserPrograms,
  setUserSubmissionList,
  setUserPermissionList,
  setAbleToComplete,
  setSearchKey,
  setUserAppSys,
  setReference

}

export const UserRegistrationStore = createSlice({
  name: 'OrganizationGroup',
  initialState,
  reducers,
})

export default UserRegistrationStore