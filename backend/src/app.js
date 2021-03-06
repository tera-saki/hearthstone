const express = require('express')
const cors = require('cors')
const cardsRouter = require('./router/cards.js')

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use('/cards', cardsRouter)

const port = 7000
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
