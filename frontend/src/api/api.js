import axios from 'axios'

const baseURL = 'http://localhost:7000'

async function getCards(query = '') {
  const url = `${baseURL}/cards?${query}`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await axios.get(url, config)
}

export { getCards }