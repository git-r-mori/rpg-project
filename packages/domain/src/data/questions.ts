import type { Question } from '../features/questionnaire';

/** The questionnaire, in the order it is asked. */
export const QUESTIONS = [
  {
    id: 'q1',
    text: '冒険に出る朝、最初に荷物へ詰めるものは？',
    options: [
      { id: 'a', text: '使い慣れた剣', effects: { strength: 2, vitality: 1 } },
      { id: 'b', text: '分厚い魔導書', effects: { intelligence: 2, dexterity: 1 } },
      { id: 'c', text: '手入れした弓と矢', effects: { dexterity: 2, agility: 1 } },
      { id: 'd', text: 'お守りのコイン', effects: { luck: 3 } },
    ],
  },
  {
    id: 'q2',
    text: '森で道に迷ったら、どうする？',
    options: [
      { id: 'a', text: '地図と星の位置から道を割り出す', effects: { intelligence: 2 } },
      { id: 'b', text: '高い木に登って辺りを見渡す', effects: { agility: 2, dexterity: 1 } },
      { id: 'c', text: '勘を信じて進む', effects: { luck: 2 } },
      { id: 'd', text: '体力が続くかぎり歩き続ける', effects: { vitality: 2 } },
    ],
  },
  {
    id: 'q3',
    text: '目の前に巨大な魔物が現れた！',
    options: [
      { id: 'a', text: '正面から斬りかかる', effects: { strength: 2, vitality: 1 } },
      { id: 'b', text: '弱点を見極めてから攻撃する', effects: { dexterity: 2, intelligence: 1 } },
      { id: 'c', text: 'すばやく背後へ回り込む', effects: { agility: 2 } },
      { id: 'd', text: '仲間の前に立って攻撃を受け止める', effects: { vitality: 3 } },
    ],
  },
  {
    id: 'q4',
    text: '仲間がけがをしてしまった。',
    options: [
      {
        id: 'a',
        text: '薬草の知識を生かして手当てする',
        effects: { intelligence: 2, dexterity: 1 },
      },
      { id: 'b', text: '背負って町まで運ぶ', effects: { vitality: 2, strength: 1 } },
      { id: 'c', text: '急いで助けを呼びに走る', effects: { agility: 2 } },
    ],
  },
  {
    id: 'q5',
    text: 'ダンジョンで宝箱を見つけた。',
    options: [
      { id: 'a', text: '罠がないか慎重に調べる', effects: { dexterity: 2, intelligence: 1 } },
      { id: 'b', text: '迷わず開ける', effects: { luck: 2 } },
      { id: 'c', text: '箱ごと担いで持ち帰る', effects: { strength: 2 } },
      { id: 'd', text: '仲間に開けてもらう', effects: { luck: 1, intelligence: 1 } },
    ],
  },
  {
    id: 'q6',
    text: '町の酒場で過ごすなら？',
    options: [
      { id: 'a', text: '腕相撲大会に参加する', effects: { strength: 2 } },
      { id: 'b', text: '旅人から各地のうわさを聞く', effects: { intelligence: 2 } },
      { id: 'c', text: 'カードの賭けに挑む', effects: { luck: 2, dexterity: 1 } },
      { id: 'd', text: '早めに休んで明日に備える', effects: { vitality: 2 } },
    ],
  },
  {
    id: 'q7',
    text: '敵の砦に忍び込むことになった。',
    options: [
      { id: 'a', text: '見張りの隙をついて駆け抜ける', effects: { agility: 2, luck: 1 } },
      { id: 'b', text: '壁をよじ登って屋根から入る', effects: { dexterity: 2, strength: 1 } },
      { id: 'c', text: '変装して正面から堂々と入る', effects: { luck: 2, intelligence: 1 } },
    ],
  },
  {
    id: 'q8',
    text: '修行をするなら、どれを選ぶ？',
    options: [
      { id: 'a', text: '山奥で滝に打たれる', effects: { vitality: 2, strength: 1 } },
      { id: 'b', text: '図書館にこもって研究する', effects: { intelligence: 3 } },
      { id: 'c', text: '的当てを一日中くり返す', effects: { dexterity: 3 } },
      { id: 'd', text: '野山を駆け回る', effects: { agility: 3 } },
    ],
  },
  {
    id: 'q9',
    text: '長い戦いで、仲間が疲れ切っている。',
    options: [
      { id: 'a', text: '冗談を言って場を和ませる', effects: { luck: 2 } },
      { id: 'b', text: '作戦を立て直す', effects: { intelligence: 2 } },
      { id: 'c', text: '自分が先頭に立って道を切り開く', effects: { strength: 2, vitality: 1 } },
    ],
  },
  {
    id: 'q10',
    text: '旅の終わりに、手に入れたいものは？',
    options: [
      { id: 'a', text: '誰にも負けない力', effects: { strength: 3 } },
      { id: 'b', text: '世界の真理', effects: { intelligence: 3 } },
      { id: 'c', text: '風よりも速い足', effects: { agility: 3 } },
      { id: 'd', text: '一生遊んで暮らせる財宝', effects: { luck: 3 } },
    ],
  },
] satisfies Question[];
