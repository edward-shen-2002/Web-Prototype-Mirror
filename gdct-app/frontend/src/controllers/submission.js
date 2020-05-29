import axios from 'axios'

const submissionController = (() => {
  const submissionAxios = axios.create({
    baseURL: 'http://localhost:3000/submission_manager/submissions',
  })
  return {
    fetch: async (query) =>
      submissionAxios.get('').then((res) => res.data.submissions),
    create: async (submission) =>
      submissionAxios
        .post('', { submission })
        .then((res) => res.data.submission),
    delete: async (_id) => submissionAxios.delete(`/${_id}`),
    update: async (submission) =>
      submissionAxios.put(`/${submission._id}`, { submission }),
  }
})()

export default submissionController
