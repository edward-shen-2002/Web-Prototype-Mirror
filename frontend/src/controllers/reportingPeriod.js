import axios from 'axios'

const reportingPeriodController = (
  () => {
    const reportingPeriodAxios = axios.create({ baseURL: 'http://localhost:3000/reportingPeriods' })
    return {
      fetchReportingPeriods: async (query) => reportingPeriodAxios.get('').then((res) => res.data.reportingPeriods),
      createReportingPeriod: async (reportingPeriod) => reportingPeriodAxios.post('', { reportingPeriod }).then((res) => res.data.reportingPeriod),
      deleteReportingPeriod: async (_id) => reportingPeriodAxios.delete(`/${_id}`),
      updateReportingPeriod: async (reportingPeriod) => reportingPeriodAxios.put(`/${reportingPeriod._id}`, { reportingPeriod })
    }
  }
)()

export default reportingPeriodController