import axios from 'axios'

const submissionController = (
  () => {
    const submissionAxios = axios.create({ baseURL: 'http://localhost:3000/submission_manager/submissions' })
    return {
      fetchSubmissions: async (query) => submissionAxios.get('').then((res) => res.data.submissions),
      createSubmission: async (submission) => submissionAxios.post('', { submission }).then((res) => res.data.submission),
      deleteSubmission: async (_id) => submissionAxios.delete(`/${_id}`),
      updateSubmission: async (submission) => submissionAxios.put(`/${submission._id}`, { submission })
    }
  }
)()

export default submissionController