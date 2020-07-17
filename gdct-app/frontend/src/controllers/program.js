import axios from 'axios'

import { host } from '../constants/domain'

const programController = (() => {
  const programAxios = axios.create({
    baseURL: host + '/program',
  })
  return {
    fetchByIds: async (_ids) =>
      programAxios.post(`/searchProgram`, {_ids}).then((res) => res.data.program),
  }
})()

export default programController