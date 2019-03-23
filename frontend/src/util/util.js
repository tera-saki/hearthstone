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
  { value: 'neutral', text: '中立' }
]

const expansions = [
  { value: 'TROLL', text: '天下一ヴドゥ祭', yearName: 'Raven'},
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

const hsSeasons = [
  { name: 'Kraken', start: new Date(2016, 4, 1) },
  { name: 'Mammoth', start: new Date(2017, 4, 1) },
  { name: 'Raven', start: new Date(2018, 4, 1) },
  { name: 'Dragon', start: new Date(2019, 4, 1) },
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

export { klasses, expansions, types, rarities, standardSets }