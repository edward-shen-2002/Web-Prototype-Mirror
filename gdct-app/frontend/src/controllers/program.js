import axios from 'axios'

const programController = (() => {
  const programAxios = axios.create({
    baseURL: 'http://localhost:3000/program_manager/programs',
  })
  return {
    fetchByIds: async (_ids) =>
      programAxios
        .post(`/searchProgram`, { _ids })
        .then((res) => res.data.program),
    fetch: async (query) =>
      programAxios.get('').then((res) => res.data.programs),
    create: async (program) =>
    programAxios.post('', { program }).then((res) => res.data.program),
    delete: async (_id) => programAxios.delete(`/${_id}`),
    update: async (program) => programAxios.put(`/${program._id}`, { program }),

  }
})()

export default programController
