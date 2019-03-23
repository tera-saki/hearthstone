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
  const where = {}
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
    where.cost = OpWithNum(cost)
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
  if (text) {
    where.text = { [Op.substring]: text }
  }
  if (type) {
    where.type = { [Op.or]: type.split(',') }
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
