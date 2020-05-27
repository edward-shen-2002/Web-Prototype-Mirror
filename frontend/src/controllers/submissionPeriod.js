import axios from 'axios'

const submissionPeriodController = (() => {
  const submissionPeriodAxios = axios.create({
    baseURL: 'http://localhost:3000/submission_manager/submissionPeriods',
  })
  return {
    fetchSubmissionPeriods: async (query) =>
      submissionPeriodAxios.get('').then((res) => res.data.submissionPeriods),
    createSubmissionPeriod: async (submissionPeriod) =>
      submissionPeriodAxios
        .post('', { submissionPeriod })
        .then((res) => res.data.submissionPeriod),
    deleteSubmissionPeriod: async (_id) =>
      submissionPeriodAxios.delete(`/${_id}`),
    updateSubmissionPeriod: async (submissionPeriod) =>
      submissionPeriodAxios.put(`/${submissionPeriod._id}`, {
        submissionPeriod,
      }),
  }
})()

export default submissionPeriodController
