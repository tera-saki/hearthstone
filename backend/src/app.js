const express = require('express')
const cardsRouter = require('./router/cards.js')

const app = express()

app.use(express.static('public'))
app.use('/cards', cardsRouter)

const port = 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
