export default function NonCustodial() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Security
        </span>
      </div>
      <h1>Non-Custodial Architecture</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Qryptum is fully non-custodial. Tokens are controlled by an immutable smart contract with no admin key, no upgrade mechanism, and no back door.
      </p>

      <h2>Token Custody: Who Holds What</h2>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Location</th>
            <th>Who Controls It</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Real ERC-20 (USDC, ETH, etc.)</td>
            <td>PersonalVault contract address (0xVaultA)</td>
            <td>Only the vault owner via vault functions</td>
          </tr>
          <tr>
            <td>qToken balance</td>
            <td>User's wallet address (ERC-20 balance mapping)</td>
            <td>Immovable: always reverts on transfer</td>
          </tr>
          <tr>
            <td>Vault proof hash</td>
            <td>PersonalVault storage (private)</td>
            <td>Only changed via <code>changeVaultProof()</code> with old proof</td>
          </tr>
        </tbody>
      </table>

      <h2>No Admin Access</h2>
      <p>
        The <code>ShieldFactory</code> deployer (Qryptum) has exactly one privileged capability: pausing and unpausing the factory. Pausing blocks new QRYPTANK creation. It does not affect any existing QRYPTANK.
      </p>
      <p>
        The deployer has zero access to any user's vault. There is no <code>adminWithdraw()</code>, no <code>setOwner()</code>, no upgradeable proxy. The code that handles user funds is immutable from the moment of deployment.
      </p>

      <h2>No Upgrade Mechanism</h2>
      <p>
        PersonalVault uses EIP-1167 minimal proxy cloning for gas efficiency. The implementation contract is deployed once and all vaults delegate to it. However, there is no <code>upgradeTo()</code> function and no proxy admin. The implementation is fixed after deployment. Existing vaults cannot be modified.
      </p>

      <h2>Emergency Withdrawal</h2>
      <p>
        If a user loses their vault proof and the vault is inactive for 1,296,000 blocks (approximately 6 months at 12 seconds per block), the user can call <code>emergencyWithdraw()</code> with only their private key. This returns all tokens to the owner's wallet.
      </p>
      <div className="callout callout-warning">
        <strong>Note:</strong> Any vault activity resets the 6-month inactivity counter. Shield, unshield, or transfer operations all count as activity.
      </div>

      <h2>Where the Server Fits In</h2>
      <p>
        The Qryptum backend API stores only two things: the wallet-to-vault address mapping and the transaction history (tx hashes and token symbols). It never:
      </p>
      <ul>
        <li>Receives or stores vault proofs in any form</li>
        <li>Relays or co-signs transactions</li>
        <li>Holds private keys</li>
        <li>Controls smart contract functions</li>
      </ul>
      <p>
        All transactions are signed in the user's browser and broadcast directly to the Ethereum network. The server is an indexing and convenience layer only.
      </p>
    </div>
  );
}
