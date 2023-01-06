import axios from 'axios'
const baseUrl = '/api/covenants'

const getAll = async (factionId) => {
  const res = await axios.get(`${baseUrl}/byCampaignId/${factionId}`)
  return res.data
}

const createNew = async (covenant) => {
  const res = await axios.post(`${baseUrl}/new`, covenant)
  return res.data
}

const updateCovenant = async (reqData, covenantId) => {
  const res = await axios.put(`${baseUrl}/${covenantId}`, reqData)
  return res.data
}

const deleteCovenant = async (covenantId) => {
  const res = await axios.delete(`${baseUrl}/${covenantId}`, covenantId)
  return res.data
}

const covenantService = {
  getAll,
  createNew,
  updateCovenant,
  deleteCovenant,
}

export default covenantService
