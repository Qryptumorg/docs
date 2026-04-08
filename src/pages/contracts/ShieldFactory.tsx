export default function ShieldFactory() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Smart Contracts
        </span>
      </div>
      <h1>ShieldFactory</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        ShieldFactory is the entry point for all QRYPTANK deployments. It uses the EIP-1167 minimal proxy pattern to deploy a unique PersonalVault for each wallet address.
      </p>

      <div className="callout callout-info">
        <strong>Sepolia address (v2 -- active):</strong> <code>0x0c060e880A405B1231Ce1263c6a52a272cC1cE05</code>
        <br /><br />
        <strong>Sepolia address (v1 -- superseded):</strong> <code>0x9a66500886344cbcce882137f263CB0c61aa99b1</code>
        <br />
        v1 was redeployed because ShieldToken did not read <code>decimals()</code> from the underlying ERC-20.
        v2 fixes this: every qToken deployed through the new factory stores the correct decimal precision.
      </div>

      <h2>Inheritance</h2>
      <pre><code>{`contract ShieldFactory is Ownable, Pausable`}</code></pre>
      <ul>
        <li><code>Ownable</code>: The deployer is the owner. Only the owner can call <code>pause()</code> and <code>unpause()</code>.</li>
        <li><code>Pausable</code>: When paused, <code>createVault()</code> is blocked. Existing vaults are unaffected.</li>
      </ul>

      <h2>State Variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>vaultImplementation</code></td>
            <td><code>address immutable</code></td>
            <td>The PersonalVault implementation contract. Set in the constructor, never changed.</td>
          </tr>
          <tr>
            <td><code>vaults</code></td>
            <td><code>{"mapping(address => address) private"}</code></td>
            <td>Maps wallet address to deployed vault address.</td>
          </tr>
        </tbody>
      </table>

      <h2>Functions</h2>

      <h3>createVault</h3>
      <pre><code>{`function createVault(bytes32 passwordHash) external whenNotPaused returns (address vault)`}</code></pre>
      <p>
        Deploys a new PersonalVault clone for <code>msg.sender</code>. Reverts if a vault already exists for this wallet. The <code>passwordHash</code> must be <code>keccak256(abi.encodePacked(rawVaultProof))</code> computed off-chain in the browser. The raw vault proof never reaches this function.
      </p>
      <table>
        <thead><tr><th>Revert Condition</th><th>Message</th></tr></thead>
        <tbody>
          <tr><td>Vault already exists</td><td><code>"QRYPTANK already exists for this wallet"</code></td></tr>
          <tr><td>Factory is paused</td><td>OpenZeppelin Pausable revert</td></tr>
        </tbody>
      </table>

      <h3>hasVault</h3>
      <pre><code>{`function hasVault(address wallet) external view returns (bool)`}</code></pre>
      <p>Returns <code>true</code> if the wallet has a deployed QRYPTANK.</p>

      <h3>getVault</h3>
      <pre><code>{`function getVault(address wallet) external view returns (address)`}</code></pre>
      <p>Returns the vault contract address for the given wallet. Returns <code>address(0)</code> if no vault exists.</p>

      <h3>pause / unpause</h3>
      <pre><code>{`function pause() external onlyOwner
function unpause() external onlyOwner`}</code></pre>
      <p>Emergency controls. Only affect new vault creation. Existing vaults and their funds are unaffected.</p>

      <h2>Events</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Parameters</th>
            <th>Emitted When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>VaultCreated</code></td>
            <td><code>owner (indexed), vault (indexed)</code></td>
            <td>A new PersonalVault is successfully deployed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
