import axios from 'axios'
const baseUrl = '/api/players'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createPlayer = async (credentials) => {
  const res = await axios.post(baseUrl + '/new', { credentials })
  return res.data
}

const playerService = { getAll, createPlayer }

export default playerService
