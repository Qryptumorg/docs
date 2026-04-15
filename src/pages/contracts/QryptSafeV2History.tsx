import { useLanguage } from "@/lib/LanguageContext";

const FACTORY_V2: string = "0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf";
const IMPL_V2: string    = "0x675f70646713D4026612c673E644C61ae3aa7725";
const TX_DEPLOY: string  = "0x8e934988c40519d973ed2cdaf00a28ff0255448e2cfaf3c30101b5922ec26e30";
const ETHERSCAN          = "https://sepolia.etherscan.io";

export default function QryptSafeV2History() {
  const { t } = useLanguage();

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.smartContracts}
        </span>
      </div>

      <h1>QryptSafe V2 History</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Second deployment in the sequential contract history. V2 removes the Pausable admin key introduced in V1, adds nonce-based commit deduplication, and wraps all token transfers in SafeERC20. Ownable remains for minimum-shield governance. The static passwordHash limitation is documented here; it is resolved in V3 with an ECDSA meta-signature scheme.
      </p>

      <h2>What V2 Changed</h2>
      <ul>
        <li><strong>Pausable removed:</strong> V1 factory could be paused globally by the deployer. V2 removes <code>Pausable</code> entirely. No account can halt vault creation.</li>
        <li><strong>Nonce-based commit-reveal:</strong> <code>commit()</code> now stores an incrementing nonce. Duplicate <code>commitHash</code> submissions revert with <code>Commit already exists</code>. V1 had no deduplication.</li>
        <li><strong>SafeERC20:</strong> All token transfers use <code>SafeERC20</code> from OpenZeppelin to handle non-standard ERC-20 return values without reverting.</li>
        <li><strong>Ownable kept for <code>setMinShieldAmount</code>:</strong> The only remaining privileged function. V3 removes it entirely.</li>
      </ul>

      <h2>Known Issue: Static passwordHash</h2>
      <p>
        V2 stores <code>keccak256(proof)</code> at vault creation and never allows it to be rotated. If the vault proof leaks via calldata inspection, the attacker gains permanent access until the user migrates. V3 introduces <code>changeVaultProof()</code> guarded by an ECDSA meta-signature.
      </p>
      <div className="callout callout-warning">
        <strong>Calldata visibility:</strong> <code>reveal()</code> accepts the raw proof bytes. Any observer of the submitted transaction can extract the proof from calldata and replay it. V3 moves to an off-chain ECDSA signature approach.
      </div>

      <h2>Factory Architecture</h2>
      <pre><code>{`// SPDX-License-Identifier: MIT
// QryptSafeV2: Pausable removed, Ownable kept for minShieldAmount
contract QryptSafeV2 is Ownable {
    address public immutable vaultImplementation;
    uint256 public minShieldAmount = 1e6;
    mapping(address => address) private vaults;

    constructor() Ownable(msg.sender) {
        vaultImplementation = address(new PersonalQryptSafeV2());
    }

    function createVault(bytes32 passwordHash) external returns (address vault) {
        require(vaults[msg.sender] == address(0), "Vault already exists for this wallet");
        vault = vaultImplementation.clone();
        PersonalQryptSafeV2(vault).initialize(msg.sender, passwordHash, minShieldAmount);
        vaults[msg.sender] = vault;
    }

    function setMinShieldAmount(uint256 newMin) external onlyOwner {
        require(newMin > 0, "Min must be positive");
        minShieldAmount = newMin;
    }
}`}</code></pre>

      <h2>Commit-Reveal with Nonce</h2>
      <pre><code>{`struct CommitData {
    uint256 blockNumber;
    uint256 timestamp;
    uint256 nonce;     // V2: added for replay protection
    bool used;
}

function commit(bytes32 commitHash, bytes32 proof) external onlyOwner validProof(proof) {
    require(commits[commitHash].blockNumber == 0, "Commit already exists");
    commitNonce++;
    commits[commitHash] = CommitData({
        blockNumber: block.number,
        timestamp:   block.timestamp,
        nonce:       commitNonce,
        used:        false
    });
}`}</code></pre>

      <h2>Proof Verification (V2)</h2>
      <pre><code>{`modifier validProof(bytes32 proof) {
    require(
        keccak256(abi.encodePacked(proof)) == passwordHash,
        "Invalid vault proof"
    );
    _;
}

// proof must be zeroPadBytes(toUtf8Bytes(password), 32)
// passwordHash is keccak256(proof) stored at vault creation`}</code></pre>
      <div className="callout callout-info">
        The proof is a right-padded 32-byte value. Clients must call <code>ethers.zeroPadBytes(ethers.toUtf8Bytes(password), 32)</code> before passing it to any vault function.
      </div>

      <h2>V2 Sepolia Contracts</h2>
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
            <td>QryptSafeV2 (factory)</td>
            <td><code>{FACTORY_V2 === "PENDING" ? "Deployment pending" : FACTORY_V2}</code></td>
            <td>{FACTORY_V2 !== "PENDING" && <a href={`${ETHERSCAN}/address/${FACTORY_V2}`} target="_blank" rel="noopener noreferrer">View ↗</a>}</td>
          </tr>

          <tr>
            <td>Deploy TX</td>
            <td><code>{TX_DEPLOY === "PENDING" ? "Deployment pending" : TX_DEPLOY.slice(0, 18) + "..."}</code></td>
            <td>{TX_DEPLOY !== "PENDING" && <a href={`${ETHERSCAN}/tx/${TX_DEPLOY}`} target="_blank" rel="noopener noreferrer">View ↗</a>}</td>
          </tr>
        </tbody>
      </table>

      <h2>Test Suite (23/23)</h2>
      <p>
        23 unit tests cover all V2 changes. Run with: <code>npm run test:v2</code>
      </p>
      <ul>
        <li>Pausable removal (factory.pause is undefined)</li>
        <li>Admin-only <code>setMinShieldAmount</code></li>
        <li>Duplicate vault prevention</li>
        <li>Shield / unshield with balance checks</li>
        <li>Nonce deduplication on commit</li>
        <li>Commit expiry and used-commit rejection</li>
        <li>Multi-token isolation</li>
        <li>Emergency withdraw delay enforcement</li>
        <li>Non-transferable qTokens</li>
        <li>Partial unshield balance accounting</li>
      </ul>

      <h2>Version Lineage</h2>
      <table>
        <thead>
          <tr><th>Version</th><th>Key Change</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>V1</td><td>Genesis: EIP-1167 proxy, Ownable + Pausable factory</td><td>Superseded</td></tr>
          <tr><td>V2</td><td>Pausable removed, nonce commit, SafeERC20</td><td>Superseded</td></tr>
          <tr><td>V3</td><td>Ownable removed, ECDSA changeVaultProof</td><td>Deployed</td></tr>
        </tbody>
      </table>
    </div>
  );
}
