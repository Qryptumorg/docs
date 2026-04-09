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

      <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>
        <strong>Active deployment: v3.</strong> v2 and v1 are preserved below for historical reference. All new Qrypt-Safe deployments use the v3 factory.
      </div>

      <h3>v3 -- Active (no admin keys)</h3>
      <p>
        Redeployed to remove <code>Ownable</code> and <code>Pausable</code> from the factory. QryptSafe v3
        is fully immutable: no one can pause vault creation or call privileged functions. The contracts are
        renamed <code>QryptSafe</code> (factory) and <code>PersonalQryptSafe</code> (vault implementation).
      </p>
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
            <td>QryptSafe v3 (factory)</td>
            <td><code>0x5c24dd33C33e70FcD9451e1Fc401E7C810c4135B</code></td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>Verified</td>
          </tr>
          <tr>
            <td>PersonalQryptSafe implementation v3</td>
            <td><code>0xD2db7514A58c9a940c6f0D411EE8364b9a5302D9</code></td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>Verified</td>
          </tr>
        </tbody>
      </table>
      <p>
        <a href="https://sepolia.etherscan.io/address/0x5c24dd33C33e70FcD9451e1Fc401E7C810c4135B#code" target="_blank" rel="noopener noreferrer">
          QryptSafe v3 on Sepolia Etherscan
        </a>
        {" | "}
        <a href="https://sepolia.etherscan.io/address/0xD2db7514A58c9a940c6f0D411EE8364b9a5302D9#code" target="_blank" rel="noopener noreferrer">
          PersonalQryptSafe v3 on Sepolia Etherscan
        </a>
      </p>

      <h3>v2 -- Superseded (had admin keys)</h3>
      <p>
        Fixed qToken decimal precision vs v1. Superseded by v3: ShieldFactory v2 had <code>Ownable</code> and{" "}
        <code>Pausable</code>, meaning the deployer could pause vault creation. v3 removes this entirely.
      </p>
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
            <td>ShieldFactory v2</td>
            <td><code>0x0c060e880A405B1231Ce1263c6a52a272cC1cE05</code></td>
            <td style={{ color: "#ca8a04", fontWeight: 600 }}>Superseded</td>
          </tr>
          <tr>
            <td>PersonalVault implementation v2</td>
            <td><code>0x5A77630B5D49943f71785BC57aF37380bBea0c5e</code></td>
            <td style={{ color: "#ca8a04", fontWeight: 600 }}>Superseded</td>
          </tr>
        </tbody>
      </table>
      <p>
        <a href="https://sepolia.etherscan.io/address/0x0c060e880A405B1231Ce1263c6a52a272cC1cE05#code" target="_blank" rel="noopener noreferrer">
          ShieldFactory v2 on Sepolia Etherscan
        </a>
      </p>

      <h3>v1 -- Superseded (decimal precision bug)</h3>
      <p>
        Initial deployment. ShieldToken did not read <code>decimals()</code> from the underlying token.
        All qTokens defaulted to 18 decimals, causing incorrect display in Etherscan and wallets.
        These contracts remain on-chain but the app no longer points to this factory.
      </p>
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
            <td>ShieldFactory v1</td>
            <td><code>0x9a66500886344cbcce882137f263CB0c61aa99b1</code></td>
            <td style={{ color: "#ca8a04", fontWeight: 600 }}>Superseded</td>
          </tr>
          <tr>
            <td>PersonalVault implementation v1</td>
            <td><code>0x63f575b38e9C6a26eAeb57d2382bC42B456fafbf</code></td>
            <td style={{ color: "#ca8a04", fontWeight: 600 }}>Superseded</td>
          </tr>
        </tbody>
      </table>
      <p>
        <a href="https://sepolia.etherscan.io/address/0x9a66500886344cbcce882137f263CB0c61aa99b1#code" target="_blank" rel="noopener noreferrer">
          ShieldFactory v1 on Sepolia Etherscan
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

      <h2>Test Wallets and Contracts (Sepolia)</h2>
      <p>These wallets were used for automated E2E testing on Sepolia. They hold no mainnet assets.</p>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Address</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wallet A (shield/transfer origin)</td>
            <td><code>0x7ee5dc8845cF2C5626bC8B5C7ea269fe221FEa6b</code></td>
            <td></td>
          </tr>
          <tr>
            <td>Wallet B (transfer recipient)</td>
            <td><code>0x2541eED685B7677e721A185d8612fA792468577d</code></td>
            <td></td>
          </tr>
          <tr>
            <td>Vault A v1 (PersonalVault clone)</td>
            <td><code>0x39bb32fFc4D6788518DB69304557638e6EE6578f</code></td>
            <td>Deployed via factory v1 -- superseded</td>
          </tr>
          <tr>
            <td>Vault A v2 (PersonalVault clone)</td>
            <td><code>0xA236C16e694B22c24Bdc641bF9B439A90fABF6B0</code></td>
            <td>Deployed via factory v2 -- active</td>
          </tr>
          <tr>
            <td>qUSDC v1 (ShieldToken)</td>
            <td><code>0xEAc05bF63B22D4969924998b1b79ceF9b2e4a702</code></td>
            <td>18 decimals (bug) -- superseded</td>
          </tr>
          <tr>
            <td>qUSDC v2 (ShieldToken)</td>
            <td><code>0xcD1569A66F01023a8587D69F3D3ad9C4DA12c3Cf</code></td>
            <td>6 decimals (correct) -- verified -- active</td>
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
