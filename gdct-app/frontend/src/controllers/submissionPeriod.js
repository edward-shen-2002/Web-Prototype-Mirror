import axios from 'axios'

import { host } from '../constants/domain'

const submissionPeriodController = (() => {
  const submissionPeriodAxios = axios.create({
    baseURL: `${host}/submission_manager/submissionPeriods`,
  })
  return {
    fetch: async (query) =>
      submissionPeriodAxios
        .get('/fetchSubmissionPeriods')
        .then((res) => res.data.submissionPeriods),
    create: async (submissionPeriod) =>
      submissionPeriodAxios
        .post('/createSubmissionPeriod', { submissionPeriod })
        .then((res) => res.data.submissionPeriod),
    delete: async (_id) => submissionPeriodAxios.delete(`/deleteSubmissionPeriod/${_id}`),
    update: async (submissionPeriod) =>
      submissionPeriodAxios.put(`/updateSubmissionPeriod/${submissionPeriod._id}`, {
        submissionPeriod,
      }),
  }
})()

export default submissionPeriodController
