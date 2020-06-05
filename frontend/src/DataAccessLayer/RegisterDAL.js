import React from "react";
import { publicAxios } from "../tools/rest";

import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "../constants/rest";

export default class RegisterDAL {

  getAllAppSys() {
    return publicAxios.get(`${REST_PUBLIC_DATA}/AppSys`)
  }

  getAllOrgGroup() {
    return publicAxios.get(`${REST_PUBLIC_DATA}/organizationGroups`)
      .then (data => {return data;})
  }

  getOrgByOrgGroup(orgGroup) {
    return publicAxios.get(`${REST_PUBLIC_DATA}/organizations/${orgGroup}`)
  }

  getProgramById(programId) {
    return publicAxios.post(`${REST_PUBLIC_DATA}/programs` ,{ programId })
  }

  getTemplateTypeByProgramIds(programList) {
    return publicAxios.post(`${REST_PUBLIC_DATA}/templateType`,{ programList })
  }

  createUser(registerData) {
    return publicAxios.post(`${REST_PUBLIC_REGISTER}`,{ registerData })
  }
}