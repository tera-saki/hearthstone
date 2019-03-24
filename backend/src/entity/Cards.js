const Sequelize = require('sequelize')
const dbconfig = require('../../dbconfig.json')

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
  dialect: dbconfig.dialect,
})

const Card = sequelize.define('card', {
  armor: Sequelize.TINYINT.UNSIGNED,
  artist: Sequelize.STRING,
  attack: Sequelize.TINYINT.UNSIGNED,
  cardClass: {
    type: Sequelize.ENUM('druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior', 'neutral'),
    set(val) {
      this.setDataValue('cardClass', val.toLowerCase())
    },
  },
  cost: Sequelize.TINYINT.UNSIGNED,
  dbfId: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  flavor: Sequelize.STRING(2048),
  health: Sequelize.TINYINT.UNSIGNED,
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  mechanics: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('mechanics', val ? val.toString().toLowerCase() : null)
    },
  },
  name: Sequelize.STRING,
  rarity: {
    type: Sequelize.ENUM('free', 'common', 'rare', 'epic', 'legendary'),
    set(val) {
      this.setDataValue('rarity', val.toLowerCase())
    },
  },
  expansion: Sequelize.STRING,
  text: Sequelize.STRING(2048),
  type: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('type', val.toLowerCase())
    },
  },
  race: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('race', val.toLowerCase())
    },
  },
})

module.exports.Card = Card
