export default function ContractVerification() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Security
        </span>
      </div>
      <h1>Contract Verification</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        All Qryptum contracts are verified on Etherscan. Anyone can read the source code, inspect the ABI, and confirm that no privileged functions exist beyond what is documented here.
      </p>

      <h2>Sepolia Testnet (Live)</h2>

      <h3>v2 -- Active</h3>
      <p>
        Redeployed to fix a qToken decimal precision bug. ShieldToken now reads <code>decimals()</code> from
        the underlying ERC-20 at deploy time, so all qTokens display the correct amount in Etherscan and wallets.
      </p>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Address</th>
            <th>Etherscan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ShieldFactory v2</td>
            <td><code>0x0c060e880...Ce1263c6a5</code></td>
            <td><a href="https://sepolia.etherscan.io/address/0x0c060e880A405B1231Ce1263c6a52a272cC1cE05#code" target="_blank" rel="noopener noreferrer">View source</a></td>
          </tr>
          <tr>
            <td>qUSDC v2 (ShieldToken)</td>
            <td><code>0xcD1569A66...4DA12c3Cf</code></td>
            <td><a href="https://sepolia.etherscan.io/address/0xcD1569A66F01023a8587D69F3D3ad9C4DA12c3Cf#code" target="_blank" rel="noopener noreferrer">View source</a></td>
          </tr>
        </tbody>
      </table>

      <h3>v1 -- Superseded (decimal precision bug)</h3>
      <p>
        Initial deployment. ShieldToken did not inherit <code>decimals()</code> from the underlying token.
        OpenZeppelin ERC20 defaults to 18, causing USDC-backed qTokens (6 decimals) to display
        as 0.0000000000095 instead of 9.5 in Etherscan. These contracts remain on-chain for historical reference.
      </p>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Address</th>
            <th>Etherscan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ShieldFactory v1</td>
            <td><code>0x9a66500886...c61aa99b1</code></td>
            <td><a href="https://sepolia.etherscan.io/address/0x9a66500886344cbcce882137f263CB0c61aa99b1#code" target="_blank" rel="noopener noreferrer">View source</a></td>
          </tr>
          <tr>
            <td>PersonalVault impl v1</td>
            <td><code>0x63f575b38e...B456fafbf</code></td>
            <td><a href="https://sepolia.etherscan.io/address/0x63f575b38e9C6a26eAeb57d2382bC42B456fafbf#code" target="_blank" rel="noopener noreferrer">View source</a></td>
          </tr>
        </tbody>
      </table>

      <h2>Ethereum Mainnet</h2>
      <div className="callout callout-info">
        Mainnet deployment is in progress. Addresses will be published here after deployment and Etherscan verification.
      </div>

      <h2>What Verification Proves</h2>
      <p>
        Etherscan verification links the deployed bytecode to the Solidity source code. Anyone can confirm:
      </p>
      <ul>
        <li>The contract source matches the compiler output deployed on-chain</li>
        <li>No hidden functions exist beyond what is documented</li>
        <li>The constructor arguments match the expected values</li>
        <li>The compiler version and optimization settings are disclosed</li>
      </ul>

      <h2>How to Verify Yourself</h2>
      <p>
        Clone the contracts repository and compile locally:
      </p>
      <pre><code>{`git clone https://github.com/Qryptumorg/contracts
cd contracts
npm install
npx hardhat compile

# Compare the bytecode hash of the local build
# against the deployed contract bytecode on Etherscan`}</code></pre>

      <h2>Test Coverage</h2>
      <table>
        <thead>
          <tr>
            <th>Test Suite</th>
            <th>Tests</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>QToken.test.js</td>
            <td>13</td>
            <td>Mint, burn, all non-transferability cases, decimal precision</td>
          </tr>
          <tr>
            <td>ShieldFactory.test.js</td>
            <td>15</td>
            <td>Vault creation, pause/unpause, ownership</td>
          </tr>
          <tr>
            <td>PersonalVault.test.js</td>
            <td>45</td>
            <td>All operations, edge cases, security invariants</td>
          </tr>
          <tr>
            <td>integration.test.js</td>
            <td>11</td>
            <td>Full end-to-end shield, transfer, and unshield lifecycle</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>84</strong></td>
            <td><strong>All passing</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>E2E Test Results (Sepolia, factory v2)</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Create Qrypt-Safe", "PASS"],
            ["Shield USDC (shielded balance displayed as 2.0 qUSDC -- decimal fix confirmed)", "PASS"],
            ["qToken non-transferable (direct transfer reverts)", "PASS"],
            ["Wrong vault proof reverts", "PASS"],
            ["Cross-wallet vault access reverts (onlyOwner)", "PASS"],
            ["Commit-Reveal Transfer: Wallet B receives raw USDC", "PASS"],
            ["Replay commit reverts (Commit already used)", "PASS"],
            ["Unshield USDC", "PASS"],
          ].map(([test, result]) => (
            <tr key={test}>
              <td>{test}</td>
              <td style={{ color: "#16a34a", fontWeight: 600 }}>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
