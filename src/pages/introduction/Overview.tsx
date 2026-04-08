import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import QuantumBruteForceChart from "@/components/diagrams/QuantumBruteForceChart";

export default function Overview() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Introduction
        </span>
      </div>
      <h1>Overview</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Qryptum is a non-custodial protocol on Ethereum L1 that lets users shield ERC-20 tokens inside a personal cryptographic vault called a QRYPTANK. Once shielded, tokens become non-transferable qTokens that no wallet, exchange, or tool can move without the correct vault proof. The vault proof layer is built on keccak256, a SHA-3 family hash function that retains 128-bit security under quantum attacks, making Qryptum designed for the post-quantum era.
      </p>

      <QuantumBruteForceChart />

      <h2>System Architecture</h2>
      <p>
        Every user deploys their own <code>PersonalVault</code> contract via the <code>ShieldFactory</code>. This vault is their QRYPTANK: an isolated smart contract address that holds their real ERC-20 tokens and issues non-transferable qTokens as receipts. The user pays all gas; Qryptum never touches funds.
      </p>

      <ArchitectureDiagram />

      <h2>Core Properties</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>How It Works</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Non-custodial</strong></td>
            <td>Tokens are held at the vault contract address. No third party has access. The deployer has zero admin keys.</td>
          </tr>
          <tr>
            <td><strong>Non-transferable qTokens</strong></td>
            <td><code>transfer()</code>, <code>transferFrom()</code>, and <code>approve()</code> always revert at the contract level. No wallet can move qTokens.</td>
          </tr>
          <tr>
            <td><strong>Dual-factor protection</strong></td>
            <td>Every vault operation requires both the user's private key and the 6-character vault proof simultaneously.</td>
          </tr>
          <tr>
            <td><strong>Isolated vaults</strong></td>
            <td>Each user has a unique vault address. User A's tokens are at <code>0xVaultA</code>; User B's are at <code>0xVaultB</code>. Never mixed.</td>
          </tr>
          <tr>
            <td><strong>Commit-reveal transfer</strong></td>
            <td>Transfers use a two-step commit-reveal scheme to prevent replay attacks and front-running exploitation.</td>
          </tr>
        </tbody>
      </table>

      <h2>Deployed Contracts (Sepolia)</h2>
      <div className="callout callout-info">
        <strong>ShieldFactory:</strong>{" "}
        <code>0x9a66500886344cbcce882137f263CB0c61aa99b1</code>
        <br />
        <a href="https://sepolia.etherscan.io/address/0x9a66500886344cbcce882137f263CB0c61aa99b1#code" target="_blank" rel="noopener noreferrer">
          View on Sepolia Etherscan
        </a>
      </div>
    </div>
  );
}
