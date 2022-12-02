import axios from 'axios'
const baseUrl = '/api/players'

const createPlayer = async (credentials) => {
  const res = await axios.post(baseUrl + '/new', { credentials })
  return res.data
}

const playerService = { createPlayer }

export default playerService
