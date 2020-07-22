import axios from 'axios'

import { host } from '../constants/domain'

const submissionController = (() => {
  const submissionAxios = axios.create({
    baseURL: `${host}/submission_manager/submissions`,
  })
  return {
    fetchAndCreate: async (orgId, programIds) =>
      submissionAxios
        .post(`/findSubmissions`, { orgId, programIds })
        .then((res) => {
          return res.data.submissions
        }),
    create: async (submission, submissionNote) =>
      submissionAxios
        .post('/createSubmission', { submission, submissionNote })
        .then((res) => res.data.submission),
    update: async (submission) =>
      submissionAxios.put(`/updateSubmission`, { submission }),
    updateStatus: async (submission, submissionNote, role) =>
      submissionAxios.put(`/updateSubmissionStatus`, {
        submission,
        submissionNote,
        role,
      }),
    fetchSubmission: async (_id) =>
      submissionAxios.get(`/fetchSubmission/${_id}`).then((res) => res.data.submission),
    fetch: async (query) =>
      submissionAxios.get('/fetchSubmission').then((res) => res.data.submissions),

    delete: async (_id) => submissionAxios.delete(`/deleteSubmission/${_id}`),
  }
})()

export default submissionController
