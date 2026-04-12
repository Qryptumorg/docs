// @ts-nocheck
  import { useLanguage } from "@/lib/LanguageContext";

  export default function QryptSafeV2History() {
      const { t } = useLanguage();
      return (
          <div className="docs-content">
              <div style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
                      {t.nav.sections.smartContracts}
                  </span>
              </div>
              <h1>QryptSafe V2: No-Pausable Factory</h1>
              <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
                  QryptSafe V2 removes the Pausable admin key introduced in V1 and adds nonce-based commit tracking and SafeERC20 overflow protection to the personal vault. It retains Ownable (removed in V3).
              </p>

              <div className="callout callout-warning">
                  V2 is superseded by V3. The factory and implementation addresses below are pending deployment.
              </div>

              <div className="callout callout-success" style={{ marginTop: "0.75rem" }}>
                  QryptSafeV2 (factory) - Pending deployment
              </div>
              <pre><code style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>TBD after Sepolia deployment</code></pre>

              <div className="callout callout-success" style={{ marginTop: "0.75rem" }}>
                  PersonalQryptSafeV2 (implementation) - Pending deployment
              </div>
              <pre><code style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>TBD after Sepolia deployment</code></pre>

              <h2>What changed from V1 to V2</h2>
              <table>
                  <thead>
                      <tr><th>Change</th><th>Detail</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                      <tr><td>Pausable removed</td><td>Factory no longer inherits Pausable. No address can freeze vault creation.</td><td>Fixed</td></tr>
                      <tr><td>Nonce-based commit tracking</td><td>CommitData stores a nonce to prevent cross-session commit hash replay.</td><td>Fixed</td></tr>
                      <tr><td>SafeERC20 + balance checks</td><td>unshield() uses SafeERC20.safeTransfer() and explicit require(balance &gt;= amount).</td><td>Fixed</td></tr>
                      <tr><td>Ownable retained</td><td>Admin can call setMinShieldAmount(). Removed in V3.</td><td>Known</td></tr>
                      <tr><td>Static passwordHash</td><td>Vault proof cannot be changed after creation. Exposed in failed TX calldata. Fixed in V3 via ECDSA.</td><td>Known</td></tr>
                  </tbody>
              </table>

              <h2>QryptSafeV2 factory</h2>
              <pre><code>{`// SPDX-License-Identifier: MIT
  pragma solidity 0.8.34;

  contract QryptSafeV2 is Ownable {
      address public immutable vaultImplementation;
      uint256 public minShieldAmount = 1e6;
      mapping(address => address) private vaults;

      constructor() Ownable(msg.sender) {
          vaultImplementation = address(new PersonalQryptSafeV2());
      }

      function createVault(bytes32 passwordHash) external returns (address vault);
      function setMinShieldAmount(uint256 newMin) external onlyOwner;
      function hasVault(address wallet) external view returns (bool);
      function getVault(address wallet) external view returns (address);
  }`}</code></pre>

              <h2>PersonalQryptSafeV2 vault</h2>
              <pre><code>{`// Key functions
  function shield(address tokenAddress, uint256 amount, bytes32 proof) external;
  function unshield(address tokenAddress, uint256 amount, bytes32 proof) external;
  function commit(bytes32 commitHash, bytes32 proof) external;
  function reveal(address tokenAddress, address to, uint256 amount, bytes32 proof, bytes32 commitHash) external;
  function emergencyWithdraw(address[] calldata tokenAddresses, bytes32 proof) external;
  function getShieldedBalance(address tokenAddress) external view returns (uint256);
  function getQTokenAddress(address tokenAddress) external view returns (address);`}</code></pre>

              <h2>validProof modifier</h2>
              <pre><code>{`modifier validProof(bytes32 proof) {
      require(keccak256(abi.encodePacked(proof)) == passwordHash, "Invalid vault proof");
      _;
  }`}</code></pre>
              <p>
                  The vault stores <code>passwordHash</code> set at initialization. Each vault operation passes the raw bytes32 proof; the modifier hashes it and compares to the stored hash. Because passwordHash is static, exposure in a failed transaction permanently compromises the vault. This is the V2 critical bug, fixed in V3.
              </p>

              <h2>Commit-reveal nonce (V2 fix)</h2>
              <pre><code>{`struct CommitData {
      uint256 blockNumber;
      uint256 timestamp;
      uint256 nonce;   // V2: added to prevent cross-session replay
      bool used;
  }

  function commit(bytes32 commitHash, bytes32 proof) external onlyOwner validProof(proof) {
      require(commits[commitHash].blockNumber == 0, "Commit already exists");
      commitNonce++;
      commits[commitHash] = CommitData({
          blockNumber: block.number,
          timestamp: block.timestamp,
          nonce: commitNonce,
          used: false
      });
  }`}</code></pre>

              <h2>Test results</h2>
              <div className="callout callout-success">
                  23 / 23 unit tests pass on Hardhat local fork.
              </div>
              <p>Tests cover factory admin controls, vault creation, shield, unshield, commit-reveal nonce enforcement, overflow protection, emergency delay, qToken non-transferability, and multi-token independence.</p>

              <h2>V3 migration</h2>
              <p>
                  V3 removes Ownable entirely (no admin of any kind) and replaces the static passwordHash with ECDSA meta-signatures, eliminating both remaining V2 risks. Vault data from V2 is not migrated: users must create a new V3 vault.
              </p>
          </div>
      );
  }
  