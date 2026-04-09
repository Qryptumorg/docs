export default function PersonalVault() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Smart Contracts
        </span>
      </div>
      <h1>PersonalVault</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        PersonalVault is the core contract for each Qrypt-Safe. It handles shielding, unshielding, commit-reveal transfers, vault proof management, and emergency withdrawal. One PersonalVault is deployed per wallet via the ShieldFactory.
      </p>

      <h2>Inheritance</h2>
      <pre><code>{`contract PersonalVault is ReentrancyGuard`}</code></pre>

      <h2>Constants</h2>
      <table>
        <thead>
          <tr><th>Constant</th><th>Value</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td><code>COMMIT_EXPIRY_SECONDS</code></td><td><code>600</code></td><td>Reveal must happen within 10 minutes of commit</td></tr>
          <tr><td><code>MINIMUM_SHIELD_AMOUNT</code></td><td><code>1_000_000</code></td><td>Minimum shield amount in token base units</td></tr>
          <tr><td><code>EMERGENCY_DELAY_BLOCKS</code></td><td><code>1_296_000</code></td><td>Approximately 6 months of inactivity before emergency withdrawal is available</td></tr>
        </tbody>
      </table>

      <h2>Functions</h2>

      <h3>initialize</h3>
      <pre><code>{`function initialize(address _owner, bytes32 _passwordHash) external notInitialized`}</code></pre>
      <p>Called once by the ShieldFactory immediately after cloning. Sets the owner and vault proof hash. Reverts if called again.</p>

      <h3>shield</h3>
      <pre><code>{`function shield(address tokenAddress, uint256 amount, string calldata password) external onlyOwner nonReentrant`}</code></pre>
      <p>
        Pulls ERC-20 tokens from the owner's wallet into the vault and mints an equivalent amount of qTokens. Verifies the vault proof. Uses a balance-before/after pattern to handle fee-on-transfer tokens correctly.
      </p>
      <table>
        <thead><tr><th>Revert Condition</th><th>Message</th></tr></thead>
        <tbody>
          <tr><td>Wrong vault proof</td><td><code>"Invalid vault proof"</code></td></tr>
          <tr><td>Amount below minimum</td><td><code>"Amount below minimum"</code></td></tr>
          <tr><td>Not the vault owner</td><td><code>"Not vault owner"</code></td></tr>
        </tbody>
      </table>

      <h3>unshield</h3>
      <pre><code>{`function unshield(address tokenAddress, uint256 amount, string calldata password) external onlyOwner nonReentrant`}</code></pre>
      <p>Burns qTokens and returns the underlying ERC-20 to the owner's wallet.</p>

      <h3>commitTransfer</h3>
      <pre><code>{`function commitTransfer(bytes32 commitHash) external onlyOwner`}</code></pre>
      <p>Step 1 of the two-step transfer. Records the commit hash, current block number, and timestamp. The vault proof is not included in this call.</p>

      <h3>revealTransfer</h3>
      <pre><code>{`function revealTransfer(
    address tokenAddress,
    address to,
    uint256 amount,
    string calldata password,
    uint256 nonce
) external onlyOwner nonReentrant`}</code></pre>
      <p>
        Step 2. Verifies the commit hash matches the stored commit, checks the 10-minute expiry window, verifies the vault proof, burns qTokens, and sends real ERC-20 directly to the recipient wallet. The recipient always receives the raw ERC-20, never qTokens.
      </p>
      <table>
        <thead><tr><th>Revert Condition</th><th>Message</th></tr></thead>
        <tbody>
          <tr><td>Commit not found</td><td><code>"Commit not found"</code></td></tr>
          <tr><td>Commit already used</td><td><code>"Commit already used"</code></td></tr>
          <tr><td>Commit expired</td><td><code>"Commit expired"</code></td></tr>
          <tr><td>Hash mismatch</td><td><code>"Commit hash mismatch"</code></td></tr>
          <tr><td>Wrong vault proof</td><td><code>"Invalid vault proof"</code></td></tr>
          <tr><td>Self-transfer</td><td><code>"Cannot transfer to yourself"</code></td></tr>
        </tbody>
      </table>

      <h3>changeVaultProof</h3>
      <pre><code>{`function changeVaultProof(string calldata oldPassword, string calldata newPassword) external onlyOwner`}</code></pre>
      <p>Changes the vault proof. Requires the current proof to be correct. The new proof must match the 3-letter + 3-digit format.</p>

      <h3>emergencyWithdraw</h3>
      <pre><code>{`function emergencyWithdraw(address[] calldata tokens) external onlyOwner`}</code></pre>
      <p>Available only after <code>EMERGENCY_DELAY_BLOCKS</code> of inactivity. Requires only the private key, not the vault proof. Burns all qTokens and sends all underlying tokens to the owner.</p>

      <h2>Events</h2>
      <table>
        <thead>
          <tr><th>Event</th><th>Parameters</th></tr>
        </thead>
        <tbody>
          <tr><td><code>TokenShielded</code></td><td><code>token (indexed), amount, qToken (indexed)</code></td></tr>
          <tr><td><code>TokenUnshielded</code></td><td><code>token (indexed), amount</code></td></tr>
          <tr><td><code>TransferExecuted</code></td><td><code>token (indexed), to (indexed), amount</code></td></tr>
          <tr><td><code>QTokenDeployed</code></td><td><code>token (indexed), qToken (indexed)</code></td></tr>
          <tr><td><code>CommitSubmitted</code></td><td><code>commitHash (indexed)</code></td></tr>
          <tr><td><code>VaultProofChanged</code></td><td>(no parameters)</td></tr>
          <tr><td><code>EmergencyWithdraw</code></td><td><code>token (indexed), amount</code></td></tr>
        </tbody>
      </table>
    </div>
  );
}
