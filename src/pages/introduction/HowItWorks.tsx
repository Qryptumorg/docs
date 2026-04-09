import TokenLifecycleDiagram from "@/components/diagrams/TokenLifecycleDiagram";
import CommitRevealDiagram from "@/components/diagrams/CommitRevealDiagram";

export default function HowItWorks() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Introduction
        </span>
      </div>
      <h1>How It Works</h1>

      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Three operations form the complete Qryptum lifecycle: Shield, Transfer, and Unshield. All transactions are sent directly from the user's browser to the Ethereum network. No backend ever receives or relays transactions.
      </p>

      <h2>Token Lifecycle</h2>
      <TokenLifecycleDiagram />

      <h2>1. Shielding Tokens</h2>
      <p>
        Shielding moves real ERC-20 tokens from the user's wallet into their Qrypt-Safe. The user approves the vault contract to pull the tokens, then calls <code>shield()</code> with the token address, amount, and vault proof. The contract verifies the vault proof, pulls the tokens, and mints an equivalent amount of qTokens to the user's wallet.
      </p>
      <pre><code>{`// Steps performed by the user's browser:
// 1. ERC20.approve(vaultAddress, amount)
// 2. PersonalVault.shield(tokenAddress, amount, "abc123")`}</code></pre>

      <h2>2. Holding qTokens</h2>
      <p>
        After shielding, the user holds qTokens (such as qUSDC) in their wallet. The underlying USDC sits at the vault contract address. Any attempt to call <code>transfer()</code>, <code>transferFrom()</code>, or <code>approve()</code> on qTokens reverts immediately at the contract level, regardless of which wallet, app, or script initiates the call.
      </p>

      <h2>3. Transferring Value (Commit-Reveal)</h2>
      <p>
        To send value to another address, the user follows a two-step commit-reveal scheme. This prevents replay attacks and ensures the vault proof is not exposed before the block is finalized.
      </p>

      <CommitRevealDiagram />

      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Action</th>
            <th>On-chain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Browser computes commit hash from vault proof, nonce, token, recipient, and amount</td>
            <td>No</td>
          </tr>
          <tr>
            <td>2</td>
            <td><code>commitTransfer(commitHash)</code> is sent. The vault proof is not included in this transaction.</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Wait for the commit transaction to be included in a block (mandatory 1-block delay)</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>4</td>
            <td><code>revealTransfer(token, to, amount, proof, nonce)</code> is sent. Contract verifies the hash, burns qTokens, and sends real ERC-20 directly to the recipient.</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <div className="callout callout-info">
        The recipient always receives the real ERC-20 token (for example, USDC), never qUSDC. The recipient can then choose to shield the tokens into their own Qrypt-Safe if they want the same protection.
      </div>

      <h2>4. Unshielding Tokens</h2>
      <p>
        Unshielding is the reverse of shielding. The user calls <code>unshield()</code> with the token address, amount, and vault proof. The contract burns the qTokens and returns the real ERC-20 tokens to the user's wallet.
      </p>

      <h2>Creating a Qrypt-Safe</h2>
      <p>
        Each wallet can have exactly one Qrypt-Safe, deployed via the <code>ShieldFactory</code>. The user chooses a vault proof and provides its <code>keccak256</code> hash on deployment. The raw vault proof never touches any server. After deployment, the user can shield any number of different ERC-20 tokens into their single Qrypt-Safe.
      </p>
    </div>
  );
}
