import { useLanguage } from "@/lib/LanguageContext";

const FACTORY_V1: string = "0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A";
const IMPL_V1: string    = "0x5E398e1E0Ba28f9659013B1212f24b8B43d69393";
const TX_DEPLOY: string  = "PENDING";
const ETHERSCAN  = "https://sepolia.etherscan.io";

export default function QryptSafeV1History() {
  const { t } = useLanguage();

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.smartContracts}
        </span>
      </div>

      <h1>QryptSafe V1 History</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Genesis deployment in the sequential contract history. V1 establishes the EIP-1167 minimal proxy factory pattern, Ownable and Pausable admin controls, and string-based vault proofs. Two critical issues are documented here: the 18-decimal <code>minShieldAmount</code> bug that breaks USDC (6 decimals), and the admin key risk introduced by Ownable and Pausable. Both are resolved in V2 and V3.
      </p>

      <h2>What V1 Was</h2>
      <ul>
        <li><strong>EIP-1167 minimal proxy:</strong> Each vault is a cheap clone of the <code>PersonalVault</code> implementation. Deploying a vault costs significantly less gas than deploying a full contract.</li>
        <li><strong>Ownable factory:</strong> The deployer holds the owner key and can call <code>setMinShieldAmount()</code> and <code>pause()</code>/<code>unpause()</code> at any time. This introduces an admin key risk: a compromised deployer wallet can pause all vault creation.</li>
        <li><strong>Pausable factory:</strong> <code>createVault()</code> is gated by <code>whenNotPaused</code>. The owner can halt new vault creation globally. V2 removes Pausable entirely.</li>
        <li><strong>String vault proofs:</strong> Vault proof is stored as a raw <code>string</code> in the vault state. <code>keccak256(bytes(proof))</code> is computed on every call. V2 switches to <code>bytes32 passwordHash</code> stored at initialization.</li>
        <li><strong>12 unit tests:</strong> Initial suite covering factory deploy, vault creation, shield, commit-reveal, and basic access control. V2 expands to 23 tests.</li>
      </ul>

      <h2>Known Issues</h2>

      <h3>18-Decimal minShieldAmount Bug</h3>
      <p>
        <code>minShieldAmount</code> is initialized to <code>1e18</code>, which assumes 18-decimal tokens. USDC has 6 decimals, so the minimum shield becomes <code>1,000,000,000,000 USDC</code> instead of <code>1.0 USDC</code>. Any shield call with a realistic USDC amount reverts on V1 with the minimum-amount check. Fixed in V2 by setting the default to <code>1e6</code> and in V3 by making it a <code>uint256 public constant MINIMUM_SHIELD_AMOUNT = 1_000_000</code>.
      </p>
      <div className="callout callout-warning">
        <strong>Impact:</strong> V1 vaults cannot shield USDC at any reasonable amount. The factory is deployed and verified but functionally unusable with standard 6-decimal tokens.
      </div>

      <h3>Admin Key Risk</h3>
      <p>
        The factory inherits both <code>Ownable</code> and <code>Pausable</code>. The deployer key can pause vault creation and change <code>minShieldAmount</code> at any time. If the deployer key is compromised, an attacker can permanently raise the minimum shield to <code>type(uint256).max</code>, making all future shielding impossible. V2 removes <code>Pausable</code>; V3 removes <code>Ownable</code> entirely.
      </p>
      <div className="callout callout-warning">
        <strong>Calldata visibility:</strong> <code>reveal()</code> and <code>commit()</code> accept the raw proof string. Any observer of the submitted transaction can extract the proof from calldata and replay it against the vault until the user migrates to a new vault.
      </div>

      <h2>Factory Architecture</h2>
      <pre><code>{`// SPDX-License-Identifier: MIT
// ShieldFactory (V1): Ownable + Pausable, string proofs, 18-decimal bug
contract ShieldFactory is Ownable, Pausable {
    address public immutable vaultImplementation;
    uint256 public minShieldAmount = 1e18; // Bug: 18-decimal assumption
    mapping(address => address) private vaults;

    constructor() Ownable(msg.sender) {
        vaultImplementation = address(new PersonalVault());
    }

    function createVault(string calldata proof) external whenNotPaused returns (address vault) {
        require(vaults[msg.sender] == address(0), "Vault already exists");
        vault = vaultImplementation.clone();
        PersonalVault(vault).initialize(msg.sender, proof, minShieldAmount);
        vaults[msg.sender] = vault;
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function setMinShieldAmount(uint256 newMin) external onlyOwner {
        require(newMin > 0, "Min must be positive");
        minShieldAmount = newMin;
    }
}`}</code></pre>

      <h2>Proof Verification (V1)</h2>
      <pre><code>{`// V1: raw string comparison via keccak256
string private vaultProof;

function initialize(address owner, string calldata proof, uint256 minAmount) external {
    require(!initialized, "Already initialized");
    _owner = owner;
    vaultProof = proof;
    minShieldAmount = minAmount;
    initialized = true;
}

modifier validProof(string calldata proof) {
    require(
        keccak256(bytes(proof)) == keccak256(bytes(vaultProof)),
        "Invalid vault proof"
    );
    _;
}

// proof is passed as raw string; exposed in calldata on every call`}</code></pre>
      <div className="callout callout-info">
        V2 replaces the string comparison with a stored <code>bytes32 passwordHash</code> computed at vault creation. V3 adds <code>changeVaultProof()</code> to rotate the hash without migrating to a new vault.
      </div>

      <h2>V1 Sepolia Contracts</h2>
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
            <td>ShieldFactory (factory)</td>
            <td><code>{FACTORY_V1}</code></td>
            <td><a href={`${ETHERSCAN}/address/${FACTORY_V1}`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
          </tr>

          <tr>
            <td>Deploy TX</td>
            <td><code>{TX_DEPLOY === "PENDING" ? "Deployment TX pending" : TX_DEPLOY.slice(0, 18) + "..."}</code></td>
            <td>{TX_DEPLOY !== "PENDING" && <a href={`${ETHERSCAN}/tx/${TX_DEPLOY}`} target="_blank" rel="noopener noreferrer">View ↗</a>}</td>
          </tr>
        </tbody>
      </table>

      <h2>Test Suite (12/12)</h2>
      <p>
        12 unit tests covering the genesis factory. Run with: <code>npx hardhat test</code>
      </p>
      <ul>
        <li>Factory deployment and ownership</li>
        <li>Vault creation via <code>createVault()</code></li>
        <li>Duplicate vault prevention per wallet</li>
        <li>Pause and unpause by owner</li>
        <li>Vault creation blocked while paused</li>
        <li>Shield tokens with balance check</li>
        <li>Commit with valid proof</li>
        <li>Reveal and unshield flow</li>
        <li>Wrong proof rejection</li>
        <li>Non-transferable qTokens</li>
        <li>Min shield amount enforcement (18-decimal bug present)</li>
        <li>Emergency withdraw after delay</li>
      </ul>

      <h2>Version Lineage</h2>
      <table>
        <thead>
          <tr><th>Version</th><th>Key Change</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>V1</td><td>Genesis: EIP-1167 proxy, Ownable + Pausable factory, string proofs</td><td>Superseded</td></tr>
          <tr><td>V2</td><td>Pausable removed, bytes32 passwordHash, nonce commit, SafeERC20</td><td>Superseded</td></tr>
          <tr><td>V3</td><td>Ownable removed, changeVaultProof(), metaTransfer() EIP-712</td><td>Deployed</td></tr>
        </tbody>
      </table>
    </div>
  );
}
