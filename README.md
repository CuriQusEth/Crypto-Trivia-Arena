# Crypto Trivia Arena

Crypto Trivia Arena is a fast-paced, competitive crypto knowledge battle game natively featuring real-time multiplayer mechanics, streak multipliers, and on-chain integrations on the Base mainnet.

## Game Concept

Players compete in trivia arenas answering questions about Bitcoin, Ethereum, Base, memecoins, DeFi, NFTs, and Web3 culture. 

- **Multipliers & Streaks**: The more consecutive correct answers, the higher your score multiplier.
- **Ranks**: Rise from Bronze, through Silver and Gold, all the way to Diamond status based on your performance.
- **Base On-Chain Integration**: Play seamlessly with your wallet. Sign zero-value verification transactions, verify leaderboards with ERC-8021 tracking natively on-chain, and interact with the AI agent ecosystem!

## AI Agent Ecosystem

This project ships with out-of-the-box infrastructure for on-chain AI behavior execution:

1. **ERC-8004 Support**: Configured to process and identify interactive AI Agents inside the orchestrator schema.
2. **MCP (Model Context Protocol)**: Exposes endpoints for active command execution via internal and external AI operations, allowing the Trivia Orchestrator Agent to run quiz automation and scaling game management tasks.

## Tech Stack

- Setup: React SPA with Vite
- Express backend for agent interactions
- Tailwind CSS & Framer Motion for rapid layout & animations
- Wagmi & Viem for robust multichain interactions and smart connectivity
- Zustand for lightning-fast global state

## Endpoints Provided By Embedded Express

- `GET /api/agent`: Basic agent data & identity endpoint.
- `GET /api/mcp`: Status endpoint detailing active MCP capabilities.
- `POST /api/mcp`: Command listener for internal MCP payloads.

## Running Locally

1. `npm install`
2. `npm run dev` (Starts Vite alongside the Express server at localhost:3000)

## Build for Production

Run `npm run build`. This generates frontend assets to `dist/` and compiles the Node.js server seamlessly into `dist/server.cjs`.

Run `npm run start` to start the compiled Express distribution.
