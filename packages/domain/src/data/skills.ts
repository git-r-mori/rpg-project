import type { Skill } from '../features/character';

/** Every skill a character can learn, grouped by the class that grants it. */
export const SKILLS = [
  // warrior
  {
    id: 'power-strike',
    name: '渾身の一撃',
    description: '力を込めた一撃で、敵 1 体に大きなダメージを与える。',
    stat: 'strength',
  },
  {
    id: 'iron-wall',
    name: '鉄壁の構え',
    description: '守りを固め、次に受けるダメージを半減する。',
    stat: 'vitality',
  },
  {
    id: 'whirlwind-slash',
    name: '旋風斬り',
    description: '武器を振り回し、周りの敵すべてを攻撃する。',
    stat: 'agility',
  },
  {
    id: 'war-cry',
    name: '鬨の声',
    description: '雄叫びで味方を奮い立たせ、全員の攻撃力を上げる。',
    stat: 'vitality',
  },
  // mage
  {
    id: 'fireball',
    name: 'ファイアボール',
    description: '炎の球を放ち、敵 1 体に大きなダメージを与える。',
    stat: 'intelligence',
  },
  {
    id: 'blizzard',
    name: 'ブリザード',
    description: '吹雪を起こし、敵全体にダメージを与える。',
    stat: 'intelligence',
  },
  {
    id: 'mana-shield',
    name: 'マナシールド',
    description: '魔力の障壁を張り、受けるダメージを軽くする。',
    stat: 'vitality',
  },
  {
    id: 'quick-cast',
    name: '高速詠唱',
    description: '詠唱を省き、次の魔法をすぐに発動する。',
    stat: 'agility',
  },
  // cleric
  {
    id: 'heal',
    name: 'ヒール',
    description: '味方 1 人の体力を回復する。',
    stat: 'intelligence',
  },
  {
    id: 'holy-light',
    name: 'ホーリーライト',
    description: '聖なる光で、敵 1 体にダメージを与える。',
    stat: 'intelligence',
  },
  {
    id: 'sanctuary',
    name: 'サンクチュアリ',
    description: '聖域を作り、味方全体の防御力を上げる。',
    stat: 'vitality',
  },
  {
    id: 'blessing',
    name: '祝福',
    description: '味方 1 人に加護を与え、会心の一撃が出やすくなる。',
    stat: 'luck',
  },
  // thief
  {
    id: 'steal',
    name: 'ぬすむ',
    description: '敵 1 体から道具を盗む。',
    stat: 'luck',
  },
  {
    id: 'backstab',
    name: '不意打ち',
    description: '敵の背後を突き、会心の一撃を狙う。',
    stat: 'dexterity',
  },
  {
    id: 'smoke-bomb',
    name: '煙玉',
    description: '煙で姿をくらまし、敵の攻撃をかわしやすくする。',
    stat: 'agility',
  },
  {
    id: 'lockpick',
    name: '鍵開け',
    description: '鍵のかかった扉や宝箱を開ける。',
    stat: 'dexterity',
  },
  // hunter
  {
    id: 'aimed-shot',
    name: '狙い撃ち',
    description: '弱点を狙って矢を放ち、確実にダメージを与える。',
    stat: 'dexterity',
  },
  {
    id: 'arrow-rain',
    name: '五月雨撃ち',
    description: '矢を次々に放ち、敵全体を攻撃する。',
    stat: 'agility',
  },
  {
    id: 'snare-trap',
    name: 'くくり罠',
    description: '罠を仕掛け、敵 1 体の動きを止める。',
    stat: 'intelligence',
  },
  {
    id: 'beast-call',
    name: '獣呼び',
    description: '森の獣を呼び寄せ、共に戦ってもらう。',
    stat: 'luck',
  },
  // jester
  {
    id: 'lucky-dice',
    name: '運命のダイス',
    description: 'サイコロを振り、出た目に応じた効果が起こる。',
    stat: 'luck',
  },
  {
    id: 'juggling',
    name: 'お手玉',
    description: '曲芸で敵の気を引き、攻撃を自分に向けさせる。',
    stat: 'dexterity',
  },
  {
    id: 'odd-dance',
    name: 'ふしぎな踊り',
    description: '踊りで敵を惑わせ、1 回行動を休ませる。',
    stat: 'agility',
  },
  {
    id: 'all-in',
    name: '一か八か',
    description: '有り金を賭け、敵全体に運任せの大ダメージを与える。',
    stat: 'luck',
  },
] satisfies Skill[];
