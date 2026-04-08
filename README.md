# Qryptum Docs

Official documentation site for the Qryptum protocol. Built with React, Vite, TypeScript, and Tailwind CSS v4.

## What Is Qryptum

Qryptum is a non-custodial protocol on Ethereum L1 that shields ERC-20 tokens inside personal cryptographic vaults called QRYPTANKs. Vault access requires both a private key and a 6-character vault proof verified on-chain using keccak256.

## Docs Structure

18 pages across 5 sections:

- **Introduction**: Overview, Why Qryptum, How It Works
- **Security**: Security Model, Non-Custodial Architecture, Token Protection, Post-Quantum Design, Contract Verification
- **Smart Contracts**: Deployed Addresses, ShieldFactory, PersonalVault, qToken
- **Developer Docs**: Quick Start, Integration Guide, API Reference, Commit-Reveal Flow, ABI Reference
- **FAQ**

## Local Development

```bash
npm install
npm run dev
```

The docs site runs at http://localhost:3000.

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18
- Vite 6
- TypeScript 5
- Tailwind CSS v4
- wouter (client-side routing)
- tw-animate-css

## Related Repositories

- [Qryptumorg/contracts](https://github.com/Qryptumorg/contracts): Solidity smart contracts
- [Qryptumorg/api](https://github.com/Qryptumorg/api): REST API backend
- [Qryptumorg/app](https://github.com/Qryptumorg/app): dApp frontend
- [Qryptumorg/site](https://github.com/Qryptumorg/site): Marketing site

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](LICENSE)

Copyright (c) 2026 [wei-zuan](https://github.com/wei-zuan). See [LICENSE](LICENSE) for full terms.
