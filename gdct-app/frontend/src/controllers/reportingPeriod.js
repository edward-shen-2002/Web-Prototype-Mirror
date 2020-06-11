import axios from 'axios'

const reportingPeriodController = (() => {
  const reportingPeriodAxios = axios.create({
    baseURL: 'http://localhost:3000/reportingPeriods',
  })
  return {
    fetch: async (query) =>
      reportingPeriodAxios.get('').then((res) => res.data.reportingPeriods),
    create: async (reportingPeriod) =>
      reportingPeriodAxios
        .post('', { reportingPeriod })
        .then((res) => res.data.reportingPeriod),
    delete: async (_id) => reportingPeriodAxios.delete(`/${_id}`),
    update: async (reportingPeriod) =>
      reportingPeriodAxios.put(`/${reportingPeriod._id}`, { reportingPeriod }),
  }
})()

export default reportingPeriodController