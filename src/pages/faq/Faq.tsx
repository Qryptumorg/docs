const faqs: { q: string; a: string }[] = [
  {
    q: "What is a Qrypt-Safe?",
    a: "A Qrypt-Safe is your personal smart contract vault on Ethereum. It holds your real ERC-20 tokens and issues non-transferable qTokens as receipts. Each wallet address has exactly one Qrypt-Safe.",
  },
  {
    q: "What is a vault proof?",
    a: "A vault proof is a 6-character string (3 letters and 3 numbers, for example abc123) that you choose when creating your Qrypt-Safe. It acts as a second factor: every shield, unshield, and transfer operation requires both your private key and your vault proof simultaneously.",
  },
  {
    q: "Can I lose my tokens if I forget my vault proof?",
    a: "If your vault has been inactive for approximately 6 months (1,296,000 Ethereum blocks), you can call emergencyWithdraw() with only your private key to recover all tokens. Any vault activity (shield, unshield, transfer) resets this timer.",
  },
  {
    q: "Can MetaMask, TrustWallet, or any wallet send qTokens?",
    a: "No. The qToken contract overrides transfer(), transferFrom(), and approve() with unconditional reverts. These functions always fail regardless of which wallet, app, or script initiates the call.",
  },
  {
    q: "Is the vault proof visible on-chain?",
    a: "Yes. The raw vault proof appears in transaction calldata during shield(), unshield(), and revealTransfer() calls. This is intentional and safe: the vault proof is useless without the private key, and all vault functions require msg.sender to be the vault owner.",
  },
  {
    q: "What does the recipient receive in a transfer?",
    a: "The recipient always receives the real underlying ERC-20 token (for example USDC), never the qToken. The qToken is burned during the transfer. The recipient does not need to be a Qryptum user.",
  },
  {
    q: "Does Qryptum have admin access to my funds?",
    a: "No. The Qryptum deployer can only pause and unpause new vault creation via the ShieldFactory. There is no admin key, no upgrade mechanism, and no function that allows anyone to access existing vault funds.",
  },
  {
    q: "Can I shield multiple token types in one Qrypt-Safe?",
    a: "Yes. Each Qrypt-Safe supports any number of ERC-20 token types. The first time you shield a given token, a new qToken contract is deployed automatically. Subsequent shields of the same token mint to the same qToken contract.",
  },
  {
    q: "Why does the commit-reveal transfer require two blockchain transactions?",
    a: "The two-step scheme ensures the vault proof is not visible in the mempool before the transaction is confirmed. The commit step records only a hash. The reveal step (sent after the commit is mined) carries the vault proof. This prevents front-running attacks.",
  },
  {
    q: "What networks are supported?",
    a: "Ethereum Mainnet (chain ID 1), Sepolia testnet (chain ID 11155111), and local Hardhat (chain ID 31337). Any other connected network shows an unsupported network banner in the app.",
  },
  {
    q: "Is the minimum shield amount enforced on-chain?",
    a: "Yes. The PersonalVault contract enforces a minimum of 1,000,000 base units per shield operation. For a 6-decimal token this is 1 unit; for a 6-decimal stablecoin like USDC this is 1 USDC.",
  },
  {
    q: "Can I change my vault proof?",
    a: "Yes. Call changeVaultProof() with your current vault proof and a new one. The new proof must match the 3-letter + 3-digit format. The old proof immediately stops working after the transaction is confirmed.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div
      style={{
        borderBottom: "1px solid hsl(var(--border))",
        paddingBottom: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <h3
        style={{
          fontSize: "0.9375rem",
          fontWeight: 600,
          marginTop: 0,
          marginBottom: "0.5rem",
          color: "hsl(var(--foreground))",
        }}
      >
        {q}
      </h3>
      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.7,
          color: "hsl(var(--muted-fg))",
          margin: 0,
        }}
      >
        {a}
      </p>
    </div>
  );
}

export default function Faq() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          FAQ
        </span>
      </div>
      <h1>Frequently Asked Questions</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        Common questions about how Qryptum works, its security model, and how to use it.
      </p>

      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}
