const axios = require('axios')
const { Card } = require('./entity/Cards')

const url = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json'

async function seedData(cards) {
  await Card.sync({ force: true })
  for (const card of cards) {
    await Card.create({ ...card, expansion: card.set })
  }
}

async function main() {
  try {
    const { data: cards } = await axios.get(url)
    await seedData(cards)
  } catch (e) {
    console.log(e);
  }
}

main().then(() => {
  process.exit(0)
})
