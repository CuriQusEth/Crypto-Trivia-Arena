export type QuestionCategory = 'Bitcoin History' | 'Ethereum Ecosystem' | 'Base Chain' | 'Memecoins' | 'DeFi' | 'On-Chain Lore';

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questionsDB: Question[] = [
  // Bitcoin History
  { id: '1', category: 'Bitcoin History', text: 'What is the name of the first block ever mined on the Bitcoin network?', options: ['Alpha Block', 'Genesis Block', 'Origin Block', 'Block Zero'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: '2', category: 'Bitcoin History', text: 'Who is the pseudonymous creator of Bitcoin?', options: ['Vitalik Buterin', 'Nick Szabo', 'Satoshi Nakamoto', 'Hal Finney'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: '3', category: 'Bitcoin History', text: 'What day is celebrated as Bitcoin Pizza Day?', options: ['January 3', 'May 22', 'October 31', 'July 14'], correctAnswerIndex: 1, difficulty: 'medium' },
  // Ethereum Ecosystem
  { id: '4', category: 'Ethereum Ecosystem', text: 'What is the native programming language for Ethereum smart contracts?', options: ['Rust', 'Python', 'Solidity', 'Go'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: '5', category: 'Ethereum Ecosystem', text: 'Which transition event moved Ethereum from Proof of Work to Proof of Stake?', options: ['The Merge', 'The Surge', 'The Purge', 'The Splurge'], correctAnswerIndex: 0, difficulty: 'medium' },
  // Base Chain
  { id: '6', category: 'Base Chain', text: 'Base is a Layer-2 solution built on top of which technology stack?', options: ['Arbitrum Nitro', 'OP Stack', 'ZK Sync', 'Polygon Edge'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: '7', category: 'Base Chain', text: 'Which major cryptocurrency exchange incubated Base?', options: ['Binance', 'Kraken', 'Coinbase', 'OKX'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: '8', category: 'Base Chain', text: 'What is the primary token used to pay gas fees on Base?', options: ['BASE', 'OP', 'ETH', 'USDC'], correctAnswerIndex: 2, difficulty: 'medium' },
  // DeFi
  { id: '9', category: 'DeFi', text: 'What does "TVL" stand for in DeFi?', options: ['Total Value Locked', 'Token Vesting Ledger', 'Trusted Validator List', 'Transaction Volume Limit'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: '10', category: 'DeFi', text: 'Which protocol is famous for pioneering the Automated Market Maker (AMM) model?', options: ['Aave', 'Uniswap', 'Compound', 'MakerDAO'], correctAnswerIndex: 1, difficulty: 'medium' },
  // Memecoins
  { id: '11', category: 'Memecoins', text: 'Which dog breed is the face of Dogecoin and Shiba Inu?', options: ['Pug', 'Golden Retriever', 'Husky', 'Shiba Inu'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: '12', category: 'Memecoins', text: 'What popular memecoin originated on the Base network with the ticker $DEGEN?', options: ['Degen', 'Toshi', 'Brett', 'Dogwifhat'], correctAnswerIndex: 0, difficulty: 'medium' },
  // On-Chain Lore
  { id: '13', category: 'On-Chain Lore', text: 'What is "HODL" short for in crypto culture?', options: ['Hold On for Dear Life', 'Hold On to Digital Ledger', 'Hold Only Decentralized Liquidity', 'It originated as a typo for "hold"'], correctAnswerIndex: 3, difficulty: 'easy' },
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questionsDB].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
