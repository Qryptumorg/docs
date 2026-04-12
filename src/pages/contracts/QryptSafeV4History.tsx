import { useLanguage } from "@/lib/LanguageContext";

const FACTORY_V4   = "0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F";
const IMPL_V4      = "0x8E0c9350CdF384a208F6005A2F632f35FB4e413E";
const DEPLOY_TX_V4 = "0x6d5ccda226bf57e7b0e2c03e676c0de2fc6031a8060840936d909f2ed920cc2a";
const VAULT_A_V4   = "0x575bd006391DC3bF4443e1c3933162025288dbA8";
const ETHERSCAN    = "https://sepolia.etherscan.io";

function AddrCell({ value }: { value: string }) {
    const isPending = !value || value === "Pending deployment";
    if (isPending) return <em style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</em>;
    return <code>{value}</code>;
}

function TxCell({ hash }: { hash: string }) {
    if (!hash) return <em style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending</em>;
    return (
        <a href={`${ETHERSCAN}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
            {hash.slice(0, 14)}...{hash.slice(-8)} ↗
        </a>
    );
}

export default function QryptSafeV4History() {
    const { t } = useLanguage();

    return (
        <div className="docs-content">
            <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
                    {t.nav.sections.smartContracts}
                </span>
            </div>

            <h1>QryptSafe V4 History</h1>
            <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
                Fourth deployment in the sequential contract history. V4 keeps all V3 security properties and adds three improvements: all <code>require</code> strings replaced with 13 named custom Solidity errors (30-40% gas savings on revert paths), on-chain vault metadata (<code>createdAtBlock</code>, <code>lastActivityBlock</code>, <code>activityCount</code>), and partial unshield support via an explicit <code>amount</code> parameter. 47 unit tests. MIT license. Verified on Etherscan.
            </p>

            <h2>What V4 Changed from V3</h2>
            <ul>
                <li><strong>13 custom Solidity errors:</strong> All <code>require(cond, "string")</code> replaced with named errors such as <code>VaultAlreadyExists()</code>, <code>InvalidProof()</code>, <code>CommitExpired()</code>. ABI-encodes as a 4-byte selector, not a full UTF-8 string. 30-40% cheaper gas on the revert path.</li>
                <li><strong>Vault metadata on-chain:</strong> Three new fields in <code>PersonalQryptSafeV4</code>: <code>createdAtBlock</code> (set once in <code>initialize()</code>), <code>lastActivityBlock</code> (updated on every state-changing call), and <code>activityCount</code> (monotonic counter). All three are public and readable without events or subgraph indexing.</li>
                <li><strong>Partial unshield:</strong> <code>unshield(token, amount, proof)</code> now accepts an explicit amount. V3 burned 100% of the shielded qToken balance. V4 withdraws any amount up to the balance; the remainder stays in the vault.</li>
                <li><strong>Enhanced VaultCreated event:</strong> A third parameter (block number) is emitted alongside owner and vault address. Full on-chain provenance without secondary indexing.</li>
                <li><strong>47 unit tests:</strong> Up from 36 in V3. New tests cover all 13 custom errors, partial unshield paths, and all three metadata fields.</li>
            </ul>

            <h2>Custom Errors (13)</h2>
            <p>Each error is a distinct named type. The 4-byte ABI selector is cheaper to encode on revert than a UTF-8 string, and provides precise diagnostics in Etherscan and client code.</p>
            <table>
                <thead>
                    <tr>
                        <th>Error</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ["VaultAlreadyExists()", "createVault() called for owner who already has a vault"],
                        ["ZeroAddress()", "address(0) passed where a valid address is required"],
                        ["NotOwner()", "onlyOwner modifier: msg.sender is not the vault owner"],
                        ["AlreadyInitialized()", "initialize() called on an already-initialized clone"],
                        ["InvalidProof()", "vault proof keccak256 does not match stored passwordHash"],
                        ["InvalidAmount()", "shield amount below MINIMUM_SHIELD_AMOUNT (1,000,000 units)"],
                        ["TokenNotShielded()", "unshield or reveal called for token with no qToken deployed"],
                        ["InsufficientBalance()", "unshield or reveal amount exceeds shielded qToken balance"],
                        ["CommitExists()", "commit() called with a commitHash already stored on-chain"],
                        ["CommitNotFound()", "reveal() called with a commitHash that was never committed"],
                        ["CommitUsed()", "reveal() called on a commitHash already consumed by a prior reveal"],
                        ["CommitExpired()", "reveal() called after COMMIT_EXPIRY_SECONDS (600s) have elapsed"],
                        ["InvalidNewProof()", "changeVaultProof() new hash is bytes32(0)"],
                    ].map(([name, cond]) => (
                        <tr key={name}>
                            <td><code>{name}</code></td>
                            <td>{cond}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Factory Architecture</h2>
            <pre><code>{`// SPDX-License-Identifier: MIT
// QryptSafeV4: custom errors, vault metadata, partial unshield
contract QryptSafeV4 {
    address public immutable vaultImplementation;
    uint256 public constant MINIMUM_SHIELD_AMOUNT = 1_000_000;
    mapping(address => address) private vaults;
    mapping(address => uint256) public vaultCreatedAt; // V4: block number

    error VaultAlreadyExists();
    error ZeroAddress();

    constructor() {
        vaultImplementation = address(new PersonalQryptSafeV4());
    }

    function createVault(bytes32 passwordHash) external returns (address vault) {
        if (vaults[msg.sender] != address(0)) revert VaultAlreadyExists();
        vault = Clones.clone(vaultImplementation);
        PersonalQryptSafeV4(vault).initialize(msg.sender, passwordHash);
        vaults[msg.sender] = vault;
        vaultCreatedAt[msg.sender] = block.number; // V4: store creation block
        emit VaultCreated(msg.sender, vault, block.number); // V4: 3 params
    }
    // no owner, no setMinShieldAmount, no pause
}`}</code></pre>

            <h2>Vault Metadata Fields</h2>
            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Type</th>
                        <th>Set when</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>createdAtBlock</code></td>
                        <td><code>uint256</code></td>
                        <td>Once, in <code>initialize()</code>. Never changes.</td>
                    </tr>
                    <tr>
                        <td><code>lastActivityBlock</code></td>
                        <td><code>uint256</code></td>
                        <td>Updated on every state-changing call (shield, unshield, commit, reveal, changeVaultProof).</td>
                    </tr>
                    <tr>
                        <td><code>activityCount</code></td>
                        <td><code>uint256</code></td>
                        <td>Monotonic counter. Incremented on every state-changing call. Starts at 0 after initialize.</td>
                    </tr>
                </tbody>
            </table>
            <pre><code>{`// Read vault metadata (no events needed)
const vault = PersonalQryptSafeV4__factory.connect(vaultAddress, provider);
const [createdAt, lastActivity, count] = await Promise.all([
    vault.createdAtBlock(),
    vault.lastActivityBlock(),
    vault.activityCount(),
]);`}</code></pre>

            <h2>Partial Unshield</h2>
            <pre><code>{`// V3: all-or-nothing
function unshield(address token, bytes32 proof) external onlyOwner {
    uint256 full = ShieldToken(qTokens[token]).balanceOf(owner);
    ShieldToken(qTokens[token]).burn(owner, full);
    IERC20(token).safeTransfer(owner, full);
}

// V4: explicit amount
function unshield(address token, uint256 amount, bytes32 proof)
    external onlyOwner
{
    uint256 bal = ShieldToken(qTokens[token]).balanceOf(owner);
    if (bal < amount) revert InsufficientBalance();
    ShieldToken(qTokens[token]).burn(owner, amount);
    IERC20(token).safeTransfer(owner, amount);
    // remainder stays shielded
}`}</code></pre>

            <div className="callout callout-info">
                The partial unshield amount must be at most the current shielded balance. An <code>InsufficientBalance</code> custom error reverts if the amount exceeds the balance.
            </div>

            <h2>Known Issue: Static passwordHash (V5 path)</h2>
            <p>
                V4 improves gas efficiency and vault observability. The core protocol limitations from V3 remain:
            </p>
            <ul>
                <li><strong>No Railgun ZK integration:</strong> <code>unshieldToRailgun()</code> added in V5.</li>
                <li><strong>No QryptAir EIP-712 voucher:</strong> <code>createVoucher()</code> + <code>redeemVoucher()</code> offline transfer added in V5.</li>
                <li><strong>Static passwordHash:</strong> Although <code>changeVaultProof()</code> allows rotation, the on-chain <code>keccak256</code> is still visible. OTP-chain rotation (proofChainHead) added in V6.</li>
            </ul>
            <div className="callout callout-warning">
                All three limitations are fully documented and resolved progressively in V5 and V6.
            </div>

            <h2>V4 Sepolia Contracts</h2>
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
                        <td>QryptSafeV4 (factory)</td>
                        <td><AddrCell value={FACTORY_V4} /></td>
                        <td>{FACTORY_V4 === "Pending deployment" ? "Pending" : <a href={`${ETHERSCAN}/address/${FACTORY_V4}#code`} target="_blank" rel="noopener noreferrer">View ↗</a>}</td>
                    </tr>
                    <tr>
                        <td>PersonalQryptSafeV4 (impl)</td>
                        <td><AddrCell value={IMPL_V4} /></td>
                        <td>{IMPL_V4 === "Pending deployment" ? "Pending" : <a href={`${ETHERSCAN}/address/${IMPL_V4}#code`} target="_blank" rel="noopener noreferrer">View ↗</a>}</td>
                    </tr>
                </tbody>
            </table>

            <h2>On-Chain E2E Transactions (5/5)</h2>
            <p>All broadcast transactions executed on Sepolia testnet via Wallet A (<code>0x2459...431e4</code>). Vault A: <code>{VAULT_A_V4}</code></p>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Action</th>
                        <th>TX</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>T1</td><td>createVault (EIP-1167 clone + createdAtBlock)</td><td><TxCell hash="0x036ebf222afd1038dfab434df2bcde3fcd8e251f2c909a7bb824b8247c879b0c" /></td></tr>
                    <tr><td>T2</td><td>approve + shield 10.0 USDC</td><td><TxCell hash="0x9c42a482da4c36192de45484cb7b11c72b32e0a62cd54ce0fe30fe22a45c9642" /></td></tr>
                    <tr><td>T3</td><td>partialUnshield 5.0 USDC (V4 feature)</td><td><TxCell hash="0x280843d997f147c7d9b7fa375938e8373e5def7ab3b8fff6da533d37f2911e63" /></td></tr>
                    <tr><td>T4</td><td>commit</td><td><TxCell hash="0x0ac1914fb07e05b9ea230424923f2c1f4a72b52089dcf8f76b748f3f62796ae9" /></td></tr>
                    <tr><td>T5</td><td>reveal 3.0 USDC to Wallet B</td><td><TxCell hash="0x98da60a3706a0239c7fa4ff07f65a3e48fba0d2c53f3ba86776074c8dd13cd9b" /></td></tr>
                </tbody>
            </table>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Revert invariants (H1-H5): shield wrong proof, shield from non-owner, shield below minimum, reveal zero commitHash, emergencyWithdraw before delay. All 5 reverted as expected via eth_call.</p>

            <h2>Test Suite (47/47)</h2>
            <p>47 unit tests in a single suite. Run with: <code>pnpm test:v4</code></p>
            <ul>
                <li>Factory: no Ownable, no owner(), MINIMUM_SHIELD_AMOUNT constant, vaultCreatedAt per owner</li>
                <li>Vault metadata: createdAtBlock, lastActivityBlock, activityCount — all three field groups</li>
                <li>Shield: full path, emit event, reject below minimum (InvalidAmount), reject wrong proof (InvalidProof), reject non-owner (NotOwner)</li>
                <li>Unshield: full balance, partial balance, reject exceeding balance (InsufficientBalance), reject wrong proof</li>
                <li>changeVaultProof: rotation works, old proof rejected, zero hash rejected (InvalidNewProof), activityCount increments</li>
                <li>Commit-reveal: end-to-end, CommitExists, CommitUsed, CommitNotFound, activityCount increments on reveal</li>
                <li>metaTransfer: valid ECDSA path, expired deadline, wrong signer, replay protection, activityCount increments</li>
                <li>Multi-token: two independent tokens shield and unshield without interference</li>
                <li>qToken: non-transferable (transfer() reverts)</li>
                <li>Emergency: delay enforced (EmergencyDelayNotMet), block number is future</li>
                <li>Edge cases: zero balances, never-shielded tokens, independent second vault, hasVault false for new address</li>
            </ul>

            <h2>Version Lineage</h2>
            <table>
                <thead>
                    <tr><th>Version</th><th>Key Change</th><th>Status</th></tr>
                </thead>
                <tbody>
                    <tr><td>V1</td><td>Genesis: EIP-1167 proxy, Ownable + Pausable factory</td><td>Superseded</td></tr>
                    <tr><td>V2</td><td>Pausable removed, nonce commit, SafeERC20</td><td>Superseded</td></tr>
                    <tr><td>V3</td><td>Ownable removed, changeVaultProof, ECDSA metaTransfer</td><td>Superseded</td></tr>
                    <tr><td>V4</td><td>Custom errors (13), vault metadata, partial unshield</td><td>Deployed</td></tr>
                    <tr><td>V5</td><td>Railgun ZK, QryptAir EIP-712 voucher</td><td>Pending</td></tr>
                    <tr><td>V6</td><td>OTP-chain passwordHash rotation</td><td>Pending</td></tr>
                </tbody>
            </table>
        </div>
    );
}
