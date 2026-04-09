import SecurityLayerDiagram from "@/components/diagrams/SecurityLayerDiagram";

export default function SecurityModel() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Security
        </span>
      </div>
      <h1>Security Model</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Qryptum's security is enforced entirely at the smart contract layer. There is no trusted backend, no relayer, no admin key. Every rule is expressed in immutable Solidity code and verified on the Ethereum Virtual Machine.
      </p>

      <h2>Two-Factor Protection</h2>
      <p>
        Every vault operation requires two independent factors present at the same time:
      </p>
      <ol>
        <li><strong>Private key</strong>: The transaction must be signed by the wallet that owns the Qrypt-Safe. This is enforced by the <code>onlyOwner</code> modifier: <code>require(msg.sender == owner, "Not vault owner")</code>.</li>
        <li><strong>Vault proof</strong>: The correct 6-character vault proof must be passed in calldata. The contract hashes it and compares against the stored hash: <code>keccak256(abi.encodePacked(proof)) == passwordHash</code>.</li>
      </ol>
      <p>
        An attacker who has only the private key cannot move tokens because qToken transfers always revert. An attacker who has only the vault proof cannot call vault functions because <code>onlyOwner</code> blocks any address that is not the owner wallet.
      </p>

      <SecurityLayerDiagram />

      <h2>qToken Non-Transferability</h2>
      <p>
        The <code>ShieldToken</code> contract overrides all three ERC-20 transfer-related functions with unconditional reverts:
      </p>
      <pre><code>{`function transfer(address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function transferFrom(address, address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function approve(address, uint256) public pure override returns (bool) {
    revert("qToken: approvals disabled");
}`}</code></pre>
      <p>
        These are <code>pure</code> functions: they contain no state reads and no conditions. They always revert. No gas amount, no contract call, no wallet feature can bypass them.
      </p>

      <h2>Replay Attack Prevention</h2>
      <p>
        The commit-reveal transfer scheme protects against replay attacks through two mechanisms:
      </p>
      <ul>
        <li>Each commit hash is stored in a mapping and marked as used after <code>revealTransfer</code> executes. A second attempt with the same hash reverts with <code>"Commit already used"</code>.</li>
        <li>Each commit hash includes a unique random nonce chosen by the browser, so even the same transfer parameters produce a different hash each time.</li>
        <li>A commit expires 600 seconds (10 minutes) after submission. A reveal attempted after this window reverts with <code>"Commit expired"</code>.</li>
      </ul>

      <h2>Attack Scenarios</h2>
      <table>
        <thead>
          <tr>
            <th>Attack</th>
            <th>Outcome</th>
            <th>Why It Fails</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Send qToken via MetaMask</td>
            <td>Revert</td>
            <td><code>transfer()</code> always reverts</td>
          </tr>
          <tr>
            <td>Approve a DEX to spend qToken</td>
            <td>Revert</td>
            <td><code>approve()</code> always reverts</td>
          </tr>
          <tr>
            <td>Call vault with wrong vault proof</td>
            <td>Revert</td>
            <td><code>"Invalid vault proof"</code></td>
          </tr>
          <tr>
            <td>Call vault from different wallet</td>
            <td>Revert</td>
            <td><code>"Not vault owner"</code></td>
          </tr>
          <tr>
            <td>Replay a used commit hash</td>
            <td>Revert</td>
            <td><code>"Commit already used"</code></td>
          </tr>
          <tr>
            <td>Use an expired commit</td>
            <td>Revert</td>
            <td><code>"Commit expired"</code></td>
          </tr>
          <tr>
            <td>Reentrancy attack</td>
            <td>Revert</td>
            <td><code>ReentrancyGuard</code> from OpenZeppelin</td>
          </tr>
          <tr>
            <td>Initialize vault twice</td>
            <td>Revert</td>
            <td><code>"Already initialized"</code></td>
          </tr>
          <tr>
            <td>Shield below minimum amount</td>
            <td>Revert</td>
            <td><code>"Amount below minimum"</code> (1,000,000 units)</td>
          </tr>
          <tr>
            <td>Transfer to self</td>
            <td>Revert</td>
            <td><code>"Cannot transfer to yourself"</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
