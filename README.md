This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](https://github.com/rainbow-me/rainbowkit/tree/main/packages/create-rainbowkit) with some additional tools.

## Technologies and Tools used

- [RainbowKit](https://rainbowkit.com) - Wallet connection flow
- [wagmi](https://wagmi.sh) and [viem](https://viem.sh/) - To interact with Ethereum
- [Next.js](https://nextjs.org/docs) - Frontend application
- [TailwindCSS](https://tailwindcss.com/) - For CSS
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [Solidity Coverage](https://github.com/sc-forks/solidity-coverage) - Code coverage for Solidity contracts

## Getting Started

Copy `.env.example` file to `.env` file, update values and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Other commands

### Test and code coverage

```bash
npx hardhat coverage
```

### Compile contracts

```bash
npx hardhat compile
```

### Deploy contract

```bash
npx hardhat run scripts/deploy.js --network fuji
```
