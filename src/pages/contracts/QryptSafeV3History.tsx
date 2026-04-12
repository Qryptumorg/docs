import { useLanguage } from "@/lib/LanguageContext";

const FACTORY_V3 = "0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c";
const IMPL_V3    = "0xaf2E91CDc70e81fA74b9aE9C322e8302bb51715e";
const VAULT_A    = "0xA4f55574a666919cab62b23A11923f999dB1384a";
const QUSDC      = "0xba89d6e805Af537aA61BA4437A0C781CD17B5637";
const TX_DEPLOY  = "0x996102864a7a32106f83f39b8d7f3fb2135d4c21f9a15211d4682ade93827a58";
const TX_CREATE  = "0x5cc7d8146da42da281b72bc1594cec9b3590f8a0138d84c815930fb2be397b3b";
const TX_SHIELD  = "0x1cda6e42db64a0dc688b0f93e2350d8a723aad698e795a3e0b159bcaea84da62";
const TX_REVEAL  = "0xc67d0b17eeb424fce5764a0985e969e3d49fd146c749f498b7e74f3fdb97bc1f";
const TX_CHANGE  = "0xe34cd69ac5f94bc1afd5eb80927d809a8976248b1345703cb7e56ad9324c4c2c";
const TX_UNSHIELD= "0xb71cb6f1e44b7557145403597c7dc26e22024719551ff1c81c9dd354f8396055";
const ETHERSCAN  = "https://sepolia.etherscan.io";

function TxLink({ hash }: { hash: string }) {
  return (
    <a href={`${ETHERSCAN}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
      {hash.slice(0, 14)}...{hash.slice(-8)} ↗
    </a>
  );
}

export default function QryptSafeV3History() {
  const { t } = useLanguage();

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.smartContracts}
        </span>
      </div>

      <h1>QryptSafe V3 History</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Third deployment in the sequential contract history. V3 removes Ownable entirely, making the factory fully trustless. <code>MINIMUM_SHIELD_AMOUNT</code> becomes a Solidity constant. Adds <code>changeVaultProof()</code> for proof rotation and <code>metaTransfer()</code> for EIP-712 gasless transfers. 36 unit tests, 5 on-chain E2E transactions verified on Sepolia.
      </p>

      <h2>What V3 Changed</h2>
      <ul>
        <li><strong>Ownable removed:</strong> V2 inherited Ownable for <code>setMinShieldAmount</code>. V3 removes it completely. No account can call any privileged factory function.</li>
        <li><strong>MINIMUM_SHIELD_AMOUNT as constant:</strong> <code>1_000_000</code> (1.0 USDC) is a <code>uint256 public constant</code>. No admin can raise or lower it.</li>
        <li><strong>changeVaultProof():</strong> Allows the vault owner to rotate the <code>passwordHash</code> by providing the current proof and a new <code>keccak256</code> hash. Fixes the static-hash limitation from V1/V2.</li>
        <li><strong>metaTransfer() (EIP-712):</strong> Gasless transfer via a relayer. The vault owner signs an EIP-712 digest off-chain; any account can submit the transaction. Nonce-based replay protection.</li>
        <li><strong>36 unit tests:</strong> Single suite <code>QryptSafeV3.test.js</code> covering all factory logic, vault operations, changeVaultProof, ECDSA meta-transfer, and all security invariants.</li>
      </ul>

      <h2>Factory Architecture</h2>
      <pre><code>{`// SPDX-License-Identifier: MIT
// QryptSafeV3: Ownable removed, MINIMUM_SHIELD_AMOUNT constant
contract QryptSafeV3 {
    address public immutable vaultImplementation;
    uint256 public constant MINIMUM_SHIELD_AMOUNT = 1_000_000;
    mapping(address => address) private vaults;

    constructor() {
        vaultImplementation = address(new PersonalQryptSafeV3());
    }

    function createVault(bytes32 passwordHash) external returns (address vault) {
        require(vaults[msg.sender] == address(0), "Qrypt-Safe already exists for this wallet");
        vault = Clones.clone(vaultImplementation);
        PersonalQryptSafeV3(vault).initialize(msg.sender, passwordHash);
        vaults[msg.sender] = vault;
        emit VaultCreated(msg.sender, vault);
    }
    // no owner, no setMinShieldAmount, no pause
}`}</code></pre>

      <h2>changeVaultProof</h2>
      <pre><code>{`function changeVaultProof(bytes32 newPasswordHash, bytes32 currentProof)
    external onlyOwner validProof(currentProof)
{
    require(newPasswordHash != bytes32(0), "Invalid new proof hash");
    passwordHash = newPasswordHash;
    lastActivityBlock = block.number;
    emit ProofChanged();
}`}</code></pre>
      <div className="callout callout-info">
        The caller provides the current proof bytes (for <code>validProof</code> check) and the new <code>keccak256</code> hash. The vault stores only the hash, never the raw proof.
      </div>

      <h2>metaTransfer (EIP-712)</h2>
      <pre><code>{`function metaTransfer(
    address tokenAddress,
    address to,
    uint256 amount,
    uint256 nonce,
    uint256 deadline,
    bytes calldata signature
) external nonReentrant {
    require(block.timestamp <= deadline,  "Meta-transfer expired");
    require(!usedMetaNonces[nonce],        "Nonce already used");
    // recover signer via EIP-712 digest
    bytes32 structHash = keccak256(abi.encode(
        _META_TRANSFER_TYPEHASH, tokenAddress, to, amount, nonce, deadline
    ));
    address signer = ECDSA.recover(_hashTypedDataV4(structHash), signature);
    require(signer == owner, "Invalid signature");
    usedMetaNonces[nonce] = true;
    // burn qToken, send underlying to 'to'
    ShieldToken(qTokens[tokenAddress]).burn(owner, amount);
    IERC20(tokenAddress).safeTransfer(to, amount);
}`}</code></pre>

      <h2>Known Issue: Static passwordHash (V4 fix)</h2>
      <p>
        Although <code>changeVaultProof()</code> allows rotation, the <code>keccak256(proof)</code> is still stored on-chain and the proof space remains brute-forceable (17.5M combinations for the 3-letter + 3-digit format). V4 introduces OTP-chain authentication that eliminates this attack surface.
      </p>
      <div className="callout callout-warning">
        The static proof format limitation is a known bug in V3. It is fully documented and resolved in V4.
      </div>

      <h2>V3 Sepolia Contracts</h2>
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
            <td>QryptSafeV3 (factory)</td>
            <td><code>{FACTORY_V3}</code></td>
            <td><a href={`${ETHERSCAN}/address/${FACTORY_V3}#code`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
          </tr>
          <tr>
            <td>PersonalQryptSafeV3 (impl)</td>
            <td><code>{IMPL_V3}</code></td>
            <td><a href={`${ETHERSCAN}/address/${IMPL_V3}#code`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
          </tr>
          <tr>
            <td>Wallet A Vault (clone)</td>
            <td><code>{VAULT_A}</code></td>
            <td><a href={`${ETHERSCAN}/address/${VAULT_A}`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
          </tr>
          <tr>
            <td>qUSDC ShieldToken (v3)</td>
            <td><code>{QUSDC}</code></td>
            <td><a href={`${ETHERSCAN}/address/${QUSDC}`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
          </tr>
          <tr>
            <td>Deploy TX</td>
            <td colSpan={2}><TxLink hash={TX_DEPLOY} /></td>
          </tr>
        </tbody>
      </table>

      <h2>On-Chain E2E Transactions (5/5)</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Action</th>
            <th>TX</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>T1</td>
            <td>createVault</td>
            <td><TxLink hash={TX_CREATE} /></td>
          </tr>
          <tr>
            <td>T2</td>
            <td>shield 2.0 USDC</td>
            <td><TxLink hash={TX_SHIELD} /></td>
          </tr>
          <tr>
            <td>T3</td>
            <td>commit + reveal 1.0 USDC to Wallet B</td>
            <td><TxLink hash={TX_REVEAL} /></td>
          </tr>
          <tr>
            <td>T4</td>
            <td>changeVaultProof</td>
            <td><TxLink hash={TX_CHANGE} /></td>
          </tr>
          <tr>
            <td>T5</td>
            <td>unshield with new proof</td>
            <td><TxLink hash={TX_UNSHIELD} /></td>
          </tr>
        </tbody>
      </table>

      <h2>Test Suite (36/36)</h2>
      <p>
        36 unit tests in a single suite. Run with: <code>pnpm test:v3</code>
      </p>
      <ul>
        <li>Factory: no Ownable, no owner(), MINIMUM_SHIELD_AMOUNT constant</li>
        <li>Vault creation and EIP-1167 clone verification</li>
        <li>Shield and unshield with 6-decimal and 18-decimal tokens</li>
        <li>Commit-reveal: deduplication, expiry, replay protection</li>
        <li>changeVaultProof: old proof rejected, new proof accepted, zero hash rejected</li>
        <li>metaTransfer: EIP-712 signature verification, deadline, nonce replay</li>
        <li>Security invariants H1-H9: brute-force, cross-wallet access, double vault, self-transfer, etc.</li>
        <li>Edge cases: zero amounts, insufficient balance, emergency withdraw delay</li>
      </ul>

      <h2>Version Lineage</h2>
      <table>
        <thead>
          <tr><th>Version</th><th>Key Change</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>V1</td><td>Genesis: EIP-1167 proxy, Ownable + Pausable factory</td><td>Superseded</td></tr>
          <tr><td>V2</td><td>Pausable removed, nonce commit, SafeERC20</td><td>Superseded</td></tr>
          <tr><td>V3</td><td>Ownable removed, changeVaultProof, ECDSA metaTransfer</td><td>Deployed</td></tr>
          <tr><td>V4</td><td>OTP-chain authentication (fixes static passwordHash)</td><td>Pending</td></tr>
        </tbody>
      </table>
    </div>
  );
}
