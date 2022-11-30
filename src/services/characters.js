import axios from 'axios'

const baseUrl = '/api/characters'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const initNewChar = async (playerId) => {
  const reqBody = { playerId }
  const res = await axios.post(`${baseUrl}/new`, reqBody)
  return res.data
}

const updateChar = async (reqData, charId) => {
  const res = await axios.put(`${baseUrl}/${charId}`, reqData)
  return res.data
}

const deleteChar = async (charId) => {
  const res = await axios.delete(`${baseUrl}/${charId}`, charId)
  return res.data
}

const charService = {
  getAll,
  initNewChar,
  updateChar,
  deleteChar,
}

export default charService
