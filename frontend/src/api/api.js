import axios from 'axios'

const baseURL = 'http://localhost:3000'

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