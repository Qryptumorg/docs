import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

export default function AbiReference() {
  const { lang, t } = useLanguage();
  const c = developerContent[lang].abiReference;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.developerDocs}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <h2>{c.h2FactoryAbi}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>v3+ factory (no admin keys, no pause, no owner)</p>
      <pre><code>{`const SHIELD_FACTORY_ABI = [
  // Read
  "function hasVault(address user) external view returns (bool)",
  "function getVault(address user) external view returns (address)",
  "function vaultImplementation() external view returns (address)",

  // Write
  "function createVault(bytes32 proofHash) external returns (address)",

  // Events
  "event VaultCreated(address indexed owner, address indexed vault)",
];`}</code></pre>

      <h2>{c.h2VaultAbi}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>v6 PersonalQryptSafe (full feature set: OTP chain, airBudget, QryptShield, QryptAir)</p>
      <pre><code>{`const PERSONAL_VAULT_ABI = [
  // State
  "function owner() external view returns (address)",
  "function factory() external view returns (address)",
  "function lastActivityBlock() external view returns (uint256)",
  "function shieldedBalance(address token) external view returns (uint256)",
  "function airBudget(address token) external view returns (uint256)",

  // Vault operations
  "function shield(address token, uint256 amount, bytes32 proofHash) external",
  "function unshield(address token, uint256 amount, bytes32 proofHash) external",

  // Commit-reveal transfer (QryptSafe)
  "function commitTransfer(bytes32 commitHash) external",
  "function revealTransfer(address token, address to, uint256 amount, bytes32 proofHash, uint256 nonce) external",

  // QryptShield (Railgun)
  "function unshieldToRailgun(address token, uint256 amount, bytes32 proofHash, bytes calldata railgunRecipient) external",

  // QryptAir (EIP-712 offline voucher)
  "function fundAirBudget(address token, uint256 amount, bytes32 proofHash) external",
  "function reclaimAirBudget(address token, uint256 amount, bytes32 proofHash) external",
  "function redeemAirVoucher(address token, address to, uint256 amount, uint256 deadline, bytes32 voucherHash, bytes calldata sig) external",

  // OTP chain management
  "function proofChainHead() external view returns (bytes32)",
  "function rechargeChain(bytes32[] calldata newLinks, bytes32 proofHash) external",

  // Vault proof management
  "function changeVaultProof(bytes32 oldProofHash, bytes32 newProofHash) external",

  // Emergency
  "function emergencyWithdraw(address[] calldata tokens) external",

  // Events
  "event TokenShielded(address indexed token, uint256 amount)",
  "event TokenUnshielded(address indexed token, uint256 amount)",
  "event TransferExecuted(address indexed token, address indexed to, uint256 amount)",
  "event CommitSubmitted(bytes32 indexed commitHash)",
  "event VaultProofChanged()",
  "event AirBudgetFunded(address indexed token, uint256 amount)",
  "event AirVoucherRedeemed(address indexed token, address indexed to, uint256 amount)",
  "event EmergencyWithdraw(address indexed token, uint256 amount)",
];`}</code></pre>

      <h2>{c.h2QTokenAbi}</h2>
      <pre><code>{`const SHIELD_TOKEN_ABI = [
  // ERC-20 read (transfer functions always revert)
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",

  // Always revert (non-transferable):
  // transfer(), transferFrom(), approve() all revert unconditionally

  // Vault-only
  "function mint(address to, uint256 amount) external",
  "function burn(address from, uint256 amount) external",
  "function vault() external view returns (address)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];`}</code></pre>

      <h2>{c.h2Erc20Abi}</h2>
      <pre><code>{`const ERC20_APPROVE_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
];`}</code></pre>

      <h2>{c.h2Addresses}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.addressHeaders[0]}</th>
            <th>{c.addressHeaders[1]}</th>
            <th>{c.addressHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.addressRows.map(([network, chainId, factory]) => (
            <tr key={chainId}>
              <td>{network}</td>
              <td><code>{chainId}</code></td>
              <td><code>{factory}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
