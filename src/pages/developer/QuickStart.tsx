export default function QuickStart() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Developer Docs
        </span>
      </div>
      <h1>Quick Start</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        This guide shows how to interact with Qryptum contracts from a JavaScript or TypeScript application using viem or ethers.js.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>An Ethereum wallet with Sepolia ETH for gas</li>
        <li>Sepolia USDC or another ERC-20 token for testing</li>
        <li>Node.js 18+ and a package manager</li>
      </ul>

      <h2>Install Dependencies</h2>
      <pre><code>{`npm install viem
# or
npm install ethers`}</code></pre>

      <h2>Connect to ShieldFactory (viem)</h2>
      <pre><code>{`import { createPublicClient, createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';

// v2 (active) -- qToken decimal precision fix: ShieldToken reads decimals() from underlying ERC-20
const FACTORY_ADDRESS = '0x0c060e880A405B1231Ce1263c6a52a272cC1cE05';
// v1 (superseded) -- defaulted to 18 decimals, causing incorrect display in Etherscan and wallets
// const FACTORY_ADDRESS = '0x9a66500886344cbcce882137f263CB0c61aa99b1';

const FACTORY_ABI = [
  {
    name: 'createVault',
    type: 'function',
    inputs: [{ name: 'passwordHash', type: 'bytes32' }],
    outputs: [{ name: 'vault', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    name: 'hasVault',
    type: 'function',
    inputs: [{ name: 'wallet', type: 'address' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
  },
  {
    name: 'getVault',
    type: 'function',
    inputs: [{ name: 'wallet', type: 'address' }],
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
  },
];

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});`}</code></pre>

      <h2>Check if Vault Exists</h2>
      <pre><code>{`const hasVault = await publicClient.readContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'hasVault',
  args: [walletAddress],
});

if (hasVault) {
  const vaultAddress = await publicClient.readContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getVault',
    args: [walletAddress],
  });
  console.log('Vault address:', vaultAddress);
}`}</code></pre>

      <h2>Create a QRYPTANK</h2>
      <pre><code>{`import { keccak256, toBytes } from 'viem';

// Vault proof is hashed in the browser; raw proof never sent to any server
const vaultProof = 'abc123'; // 3 letters + 3 numbers
const proofHash = keccak256(toBytes(vaultProof));

const txHash = await walletClient.writeContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'createVault',
  args: [proofHash],
});

// Wait for confirmation and read the new vault address
const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
const vaultAddress = await publicClient.readContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'getVault',
  args: [walletAddress],
});`}</code></pre>

      <h2>Shield a Token</h2>
      <pre><code>{`// Step 1: Approve the vault to pull tokens
await walletClient.writeContract({
  address: tokenAddress,
  abi: ERC20_ABI,
  functionName: 'approve',
  args: [vaultAddress, amount],
});

// Step 2: Shield
await walletClient.writeContract({
  address: vaultAddress,
  abi: VAULT_ABI,
  functionName: 'shield',
  args: [tokenAddress, amount, vaultProof],
});`}</code></pre>

      <div className="callout callout-info">
        The vault proof string is passed in plaintext calldata during <code>shield()</code>, <code>unshield()</code>, and <code>revealTransfer()</code>. It is visible in the transaction on Etherscan. This is acceptable because the vault proof is useless without the private key, and all vault functions have the <code>onlyOwner</code> modifier.
      </div>

      <h2>Next Steps</h2>
      <ul>
        <li>See the <strong>Integration Guide</strong> for the full commit-reveal transfer implementation</li>
        <li>See <strong>ABI Reference</strong> for the complete ABIs of all contracts</li>
        <li>See <strong>API Reference</strong> for the backend REST API</li>
      </ul>
    </div>
  );
}
