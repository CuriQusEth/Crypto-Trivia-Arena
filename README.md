# Crypto Trivia Arena

Crypto Trivia Arena is a fast-paced, competitive crypto knowledge battle game natively featuring real-time multiplayer mechanics, streak multipliers, and on-chain integrations on the Base mainnet.

## Game Concept

Players compete in trivia arenas answering questions about Bitcoin, Ethereum, Base, memecoins, DeFi, NFTs, and Web3 culture. 

- **Multipliers & Streaks**: The more consecutive correct answers, the higher your score multiplier.
- **Ranks**: Rise from Bronze, through Silver and Gold, all the way to Diamond status based on your performance.
- **Base On-Chain Integration**: Play seamlessly with your wallet. Sign zero-value verification transactions, verify leaderboards with ERC-8021 tracking natively on-chain, and interact with the AI agent ecosystem!

## AI Agent Ecosystem & Model Context Protocol (MCP)

This project incorporates a robust AI orchestration schema flawlessly establishing autonomous quiz automations and real-time scaling operations inside the orchestration schema.

### Agent Registration (ERC-8004 Compatible)
Our orchestrator acts as an officially published decentralized agent schema. The metadata identity card is structured publicly and can be reviewed directly at:
- Endpoint: `/.well-known/agent-card.json`

### MCP Connection Guide
The Model Context Protocol (MCP) endpoints natively enable robust automated integrations:
- **`GET /api/mcp`**: Active status, capability discovery, and MCP connection heartbeat endpoint.
- **`POST /api/mcp`**: Root execution listener for handling tools (`get_race_status`, `start_race`, `get_leaderboard`, `optimize_speed`, `get_track_info`), prompts list, and direct orchestration payloads.
- **`GET /api/agent`**: Primary verification endpoint displaying our orchestrator's name, platform signature validation, and version data.

## Tech Stack

- **Framework**: Next.js 14 (App Router Support) / React Structure
- **Design/UI**: Tailwind CSS & Framer Motion for rapid layouts & slick interactions
- **On-Chain Config**: Wagmi & Viem enabling swift multichain connections alongside Base Mainnet.
- **Global State**: Zustand for lightning-fast architecture.

## Running Locally

1. Install environment layers:
   ```bash
   npm install
   ```

2. Start the local server:
   ```bash
   npm run dev
   ```

*(Local environment processes Next.js equivalent routes alongside rendering architecture smoothly via the designated protocol mappings).*
