const { Op } = require('sequelize')

function OpWithNum(str) {
  let match = null
  if (match = /(-?\d+),(-?\d+)/.exec(str)) {
    const min = parseInt(match[1], 10)
    const max = parseInt(match[2], 10)
    if (min >= 0 && max >= 0) {
      return { [Op.between]: [min, max] }
    }
    if (min >= 0) {
      return { [Op.gte]: min }
    }
    if (max >= 0) {
      return { [Op.lte]: max }
    }
  }
  console.log('query pattern is invalid');
  return { [Op.gte]: 0 }
}

module.exports = { OpWithNum }
