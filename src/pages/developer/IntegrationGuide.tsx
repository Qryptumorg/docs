export default function IntegrationGuide() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Developer Docs
        </span>
      </div>
      <h1>Integration Guide</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        A complete walkthrough for integrating Qryptum into a frontend application, including vault detection, shielding, and full transfer flow.
      </p>

      <h2>1. Vault Proof Hashing</h2>
      <p>
        The vault proof must be hashed in the browser before any on-chain operation. Never send the raw vault proof to any backend.
      </p>
      <pre><code>{`import { keccak256, toBytes } from 'viem';

// For createVault:
const proofHash = keccak256(toBytes(vaultProof));

// For shield / unshield / revealTransfer:
// Pass the raw string directly in calldata.
// The contract hashes it internally.
vault.shield(tokenAddress, amount, vaultProof)`}</code></pre>

      <h2>2. Vault Proof Format Validation</h2>
      <p>
        The vault proof must be exactly 6 characters: 3 letters and 3 digits. The contract enforces this format when calling <code>changeVaultProof()</code>. Validate in the browser before submission:
      </p>
      <pre><code>{`function isValidVaultProof(proof: string): boolean {
  if (proof.length !== 6) return false;
  const letters = proof.split('').filter(c => /[a-zA-Z]/.test(c));
  const digits = proof.split('').filter(c => /[0-9]/.test(c));
  return letters.length === 3 && digits.length === 3;
}`}</code></pre>

      <h2>3. Detecting Vault Status</h2>
      <pre><code>{`const hasVault = await publicClient.readContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'hasVault',
  args: [walletAddress],
});

// If vault exists, get its address
const vaultAddress = hasVault
  ? await publicClient.readContract({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'getVault',
      args: [walletAddress],
    })
  : null;`}</code></pre>

      <h2>4. Reading Shielded Balances</h2>
      <pre><code>{`// Get the qToken address for a given underlying token
const qTokenAddress = await publicClient.readContract({
  address: vaultAddress,
  abi: VAULT_ABI,
  functionName: 'getQTokenAddress',
  args: [tokenAddress],
});

// Get shielded balance (in token base units)
const shieldedBalance = await publicClient.readContract({
  address: vaultAddress,
  abi: VAULT_ABI,
  functionName: 'getShieldedBalance',
  args: [tokenAddress],
});`}</code></pre>

      <h2>5. Network Configuration</h2>
      <pre><code>{`const FACTORY_ADDRESSES = {
  1: process.env.VITE_SHIELD_FACTORY_MAINNET,       // Ethereum mainnet
  11155111: process.env.VITE_SHIELD_FACTORY_SEPOLIA, // Sepolia testnet
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Hardhat local
};

const SUPPORTED_CHAIN_IDS = [1, 11155111, 31337];

function getFactoryAddress(chainId: number): string | undefined {
  return FACTORY_ADDRESSES[chainId];
}`}</code></pre>

      <h2>6. Recording Transactions to the API</h2>
      <p>
        After each successful on-chain transaction, record it to the Qryptum backend API for display in the dashboard history:
      </p>
      <pre><code>{`await fetch('/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    walletAddress,
    txHash: receipt.transactionHash,
    type: 'shield', // 'shield' | 'unshield' | 'transfer'
    tokenAddress,
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    amount: amount.toString(),
    fromAddress: walletAddress,
    toAddress: null, // only for transfers
    networkId: chainId,
  }),
});`}</code></pre>

      <h2>Environment Variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>VITE_SHIELD_FACTORY_SEPOLIA</code></td><td>ShieldFactory address on Sepolia</td></tr>
          <tr><td><code>VITE_SHIELD_FACTORY_MAINNET</code></td><td>ShieldFactory address on mainnet (set after deploy)</td></tr>
          <tr><td><code>VITE_ALCHEMY_SEPOLIA_URL</code></td><td>Optional: Alchemy RPC for Sepolia reads</td></tr>
          <tr><td><code>VITE_ALCHEMY_MAINNET_URL</code></td><td>Optional: Alchemy RPC for mainnet reads</td></tr>
          <tr><td><code>VITE_WALLETCONNECT_PROJECT_ID</code></td><td>Optional: WalletConnect cloud project ID</td></tr>
        </tbody>
      </table>
    </div>
  );
}
