import axios from 'axios'

const programController = (() => {
  const programAxios = axios.create({
    baseURL: 'http://localhost:3000/program_manager/program',
  })
  return {
    fetchByIds: async (_ids) =>
      programAxios.post(`/searchProgram`, {_ids}).then((res) => res.data.program),
  }
})()

export default programController