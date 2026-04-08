export default function DeployedAddresses() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Smart Contracts
        </span>
      </div>
      <h1>Deployed Addresses</h1>

      <h2>Sepolia Testnet (Chain ID: 11155111)</h2>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ShieldFactory</td>
            <td><code>0x9a66500886344cbcce882137f263CB0c61aa99b1</code></td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>Verified</td>
          </tr>
          <tr>
            <td>PersonalVault (implementation)</td>
            <td><code>0x63f575b38e9C6a26eAeb57d2382bC42B456fafbf</code></td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>Verified</td>
          </tr>
        </tbody>
      </table>
      <p>
        <a href="https://sepolia.etherscan.io/address/0x9a66500886344cbcce882137f263CB0c61aa99b1#code" target="_blank" rel="noopener noreferrer">
          ShieldFactory on Sepolia Etherscan
        </a>
      </p>

      <h2>Ethereum Mainnet (Chain ID: 1)</h2>
      <div className="callout callout-info">
        Mainnet deployment is pending. This table will be updated after deployment and Etherscan verification.
      </div>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ShieldFactory</td>
            <td><code>Pending</code></td>
            <td style={{ color: "hsl(var(--muted-fg))" }}>Pending</td>
          </tr>
          <tr>
            <td>PersonalVault (implementation)</td>
            <td><code>Pending</code></td>
            <td style={{ color: "hsl(var(--muted-fg))" }}>Pending</td>
          </tr>
        </tbody>
      </table>

      <h2>Test Wallets (Sepolia)</h2>
      <p>These wallets were used for automated E2E testing on Sepolia. They hold no mainnet assets.</p>
      <table>
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wallet A (shield/transfer origin)</td>
            <td><code>0x7ee5dc8845cF2C5626bC8B5C7ea269fe221FEa6b</code></td>
          </tr>
          <tr>
            <td>Wallet B (transfer recipient)</td>
            <td><code>0x2541eED685B7677e721A185d8612fA792468577d</code></td>
          </tr>
          <tr>
            <td>Vault A (PersonalVault clone)</td>
            <td><code>0x39bb32fFc4D6788518DB69304557638e6EE6578f</code></td>
          </tr>
          <tr>
            <td>qToken USDC (ShieldToken)</td>
            <td><code>0xEAc05bF63B22D4969924998b1b79ceF9b2e4a702</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Supported Networks</h2>
      <p>
        The frontend recognizes three chain IDs. Any other connected network displays an unsupported network warning.
      </p>
      <table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Chain ID</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ethereum Mainnet</td>
            <td><code>1</code></td>
            <td>Production</td>
          </tr>
          <tr>
            <td>Sepolia</td>
            <td><code>11155111</code></td>
            <td>Testnet (live)</td>
          </tr>
          <tr>
            <td>Hardhat Local</td>
            <td><code>31337</code></td>
            <td>Development</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
