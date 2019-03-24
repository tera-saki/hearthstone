const express = require('express')
const { Op } = require('sequelize')
const { Card } = require('../entity/Cards')
const { OpWithNum } = require('../util')

const cardsRouter = express.Router()

cardsRouter.get('/', async (req, res, next) => {
  const { query } = req
  const { rows: cards, count: total } = await Card.findAndCountAll({
    ...procConditions(query),
    ...procPaging(query),
  })
  res.send({ cards, total })
})

function procConditions(query) {
  const { artist, attack, cardClass, cost, health, mechanics, name, rarity, expansion, text, type } = query
  let where = {}
  if (artist) {
    where.artist = { [Op.substring]: name }
  }
  if (attack) {
    where.attack = OpWithNum(attack)
  }
  if (cardClass) {
    where.cardClass = cardClass
  }
  if (cost) {
    const costs = cost.split(',').map((c) => {
      const threshold = /(\d+)(\+|-)/.exec(c)
      if (threshold) {
        const [, num, op] = threshold
        return { [op === '+' ? Op.gte : Op.lte]: parseInt(num, 10) }
      }
      return { [Op.eq]: parseInt(c, 10) }
    })
    where.cost = { [Op.or]: costs }
  }
  if (health) {
    where.health = OpWithNum(health)
  }
  if (mechanics) {
    where.mechanics = mechanics
  }
  if (name) {
    where.name = { [Op.substring]: name }
  }
  if (rarity) {
    where.rarity = { [Op.or]: rarity.split(',') }
  }
  if (expansion) {
    where.expansion = { [Op.or]: expansion.split(',') }
  }
  if (type) {
    where.type = { [Op.or]: type.split(',') }
  }
  if (text) {
    const NameOrText = {
      [Op.or]: [
        { name: { [Op.substring]: text } },
        { text: { [Op.substring]: text } },
      ],
    }
    where = { ...where, ...NameOrText }
  }
  return { where }
}

function procPaging(query) {
  const defaultBlockNum = 20
  const maxBlockNum = 100
  const blockNum = Math.min(query.blockNum, maxBlockNum) || defaultBlockNum
  const page = Math.max(query.page, 1) || 1
  return { offset: (page - 1) * blockNum, limit: blockNum }
}

module.exports = cardsRouter
