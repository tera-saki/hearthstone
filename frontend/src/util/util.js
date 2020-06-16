import { addYears } from 'date-fns'

const klasses = [
  { value: 'druid', text: 'ドルイド' },
  { value: 'hunter', text: 'ハンター' },
  { value: 'mage', text: 'メイジ' },
  { value: 'paladin', text: 'パラディン' },
  { value: 'priest', text: 'プリースト' },
  { value: 'rogue', text: 'ローグ', },
  { value: 'shaman', text: 'シャーマン' },
  { value: 'warlock', text: 'ウォーロック' },
  { value: 'warrior', text: 'ウォーリアー' },
  { value: 'demonhunter', text: 'デーモンハンター' },
  { value: 'neutral', text: '中立' }
]

const expansions = [
  { value: 'BLACK_TEMPLE', text: '灰に舞う降魔の狩人', yearName: 'Phoenix' },
  { value: 'YEAR_OF_THE_DRAGON', text: 'ガラクロンドの目覚め', yearName: 'Dragon' },
  { value: 'DRAGONS', text: '激闘！ドラゴン大決戦', yearName: 'Dragon' },
  { value: 'ULDUM', text: '突撃！探検同盟', yearName: 'Dragon' },
  { value: 'DALARAN', text: '爆誕！悪党同盟', yearName: 'Dragon' },
  { value: 'TROLL', text: '天下一ヴドゥ祭', yearName: 'Raven' },
  { value: 'BOOMSDAY', text: '博士のメカメカ大作戦', yearName: 'Raven' },
  { value: 'GILNEAS', text: '妖の森ウィッチウッド', yearName: 'Raven' },
  { value: 'LOOTAPALOOZA', text: 'コボルトと秘宝の迷宮', yearName: 'Mammoth' },
  { value: 'ICECROWN', text: '凍てつく玉座の騎士団', yearName: 'Mammoth' },
  { value: 'UNGORO', text: '大魔境ウンゴロ', yearName: 'Mammoth' },
  { value: 'GANGS', text: '仁義なきガジェッツァン', yearName: 'Kraken' },
  { value: 'KARA', text: 'ワン・ナイト・イン・カラザン', yearName: 'Kraken' },
  { value: 'OG', text: '旧神のささやき', yearName: 'Kraken' },
  { value: 'LOE', text: 'リーグ・オブ・エクスプローラー' },
  { value: 'TGT', text: 'グランドトーナメント' },
  { value: 'BRM', text: 'ブラックロックマウンテン' },
  { value: 'GVG', text: 'ゴブリン vs ノーム' },
  { value: 'NAXX', text: 'ナクスラーマスの呪い' },
  { value: 'EXPERT1', text: 'クラシック' },
  { value: 'CORE', text: 'ベーシック' },
  { value: 'HOF', text: '栄誉の殿堂' }
]

const types = [
  { value: 'minion', text: 'ミニオン' },
  { value: 'spell', text: 'スペル' },
  { value: 'weapon', text: '武器' },
  { value: 'hero', text: 'ヒーローカード' }
]

const rarities = [
  { value: 'common', text: 'コモン' },
  { value: 'rare', text: 'レア' },
  { value: 'epic', text: 'エピック' },
  { value: 'legendary', text: 'レジェンド' },
  { value: 'free', text: 'なし' }
]

const mechanicsList = [
  { value: 'battlecry', text: '雄叫び' },
  { value: 'charge', text: '突撃' },
  { value: 'combo', text: 'コンボ' },
  { value: 'deathrattle', text: '断末魔' },
  { value: 'divine_shield', text: '聖なる盾' },
  { value: 'echo', text: '木霊' },
  { value: 'inspire', text: '激励' },
  { value: 'lifesteal', text: '生命奪取' },
  { value: 'outcast', text: '異端' },
  { value: 'overkill', text: '血祭' },
  { value: 'overload', text: 'オーバーロード' },
  { value: 'poisonous', text: '猛毒' },
  { value: 'reborn', text: '蘇り' },
  { value: 'rush', text: '急襲' },
  { value: 'sidequest', text: 'サイドクエスト' },
  { value: 'stealth', text: '潜伏' },
  { value: 'taunt', text: '挑発' },
  { value: 'twinspell', text: '双呪文' },
  { value: 'windfury', text: '疾風' }
]

const races = [
  { value: 'beast', text: '獣' },
  { value: 'demon', text: '悪魔' },
  { value: 'dragon', text: 'ドラゴン' },
  { value: 'elemental', text: 'エレメンタル' },
  { value: 'mechanical', text: 'メカ' },
  { value: 'murloc', text: 'マーロック' },
  { value: 'pirate', text: '海賊' },
  { value: 'totem', text: 'トーテム' }
]

const hsSeasons = [
  { name: 'Kraken', start: new Date('2016-04-01') },
  { name: 'Mammoth', start: new Date('2017-04-01') },
  { name: 'Raven', start: new Date('2018-04-01') },
  { name: 'Dragon', start: new Date('2019-04-01') },
  { name: 'Phoenix', start: new Date('2020-04-01') }
]

const standardSets = () => {
  const standardYearNames =
    hsSeasons.filter(season => addYears(season.start, 2) >= new Date() )
             .map(season => season.name)
  return [
    'CORE', 'EXPERT1',
    ...expansions.filter(
      exp => exp.yearName && standardYearNames.includes(exp.yearName)
    ).map(exp => exp.value)
  ]
}

export { klasses, expansions, types, rarities, mechanicsList, races, standardSets }