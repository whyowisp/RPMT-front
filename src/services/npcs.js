import axios from 'axios'
const baseUrl = '/api/npcs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getAllById = async (campaignId) => {
  const res = await axios.get(`${baseUrl}/byCampaignId/${campaignId}`)
  return res.data
}

const initNewNpc = async (playerId, campaignId) => {
  const reqBody = { playerId, campaignId }
  const res = await axios.post(`${baseUrl}/new`, reqBody)
  return res.data
}

const updateNpc = async (reqData, npcId) => {
  const res = await axios.put(`${baseUrl}/${npcId}`, reqData)
  return res.data
}

const deleteNpc = async (npcId) => {
  const res = await axios.delete(`${baseUrl}/${npcId}`, npcId)
  return res.data
}

const npcService = {
  getAll,
  getAllById,
  initNewNpc,
  updateNpc,
  deleteNpc,
}

export default npcService
