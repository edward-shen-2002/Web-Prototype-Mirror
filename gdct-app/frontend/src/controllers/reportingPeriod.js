import axios from 'axios'

import { host } from '../constants/domain'

const reportingPeriodController = (() => {
  const reportingPeriodAxios = axios.create({
    baseURL: host + '/reportingPeriods',
  })
  return {
    fetch: async (query) =>
      reportingPeriodAxios.get('/fetchReportingPeriods').then((res) => res.data.reportingPeriods),
    create: async (reportingPeriod) =>
      reportingPeriodAxios
        .post('/createReportingPeriods', { reportingPeriod })
        .then((res) => res.data.reportingPeriod),
    delete: async (_id) => reportingPeriodAxios.delete(`/deleteReportingPeriods/${_id}`),
    update: async (reportingPeriod) =>
      reportingPeriodAxios.put(`/updateReportingPeriod/${reportingPeriod._id}`, { reportingPeriod }),
  }
})()

export default reportingPeriodController
