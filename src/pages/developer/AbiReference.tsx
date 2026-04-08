export default function AbiReference() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Developer Docs
        </span>
      </div>
      <h1>ABI Reference</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Human-readable ABIs for all Qryptum contracts. Use these to read and write to the contracts using viem, ethers.js, or any EVM-compatible library.
      </p>

      <h2>ShieldFactory ABI</h2>
      <pre><code>{`const FACTORY_ABI = [
  // Create a new QRYPTANK for msg.sender
  "function createVault(bytes32 passwordHash) external returns (address vault)",

  // Read functions
  "function hasVault(address wallet) external view returns (bool)",
  "function getVault(address wallet) external view returns (address)",

  // Admin (deployer only)
  "function pause() external",
  "function unpause() external",

  // Events
  "event VaultCreated(address indexed owner, address indexed vault)",
] as const;`}</code></pre>

      <h2>PersonalVault ABI</h2>
      <pre><code>{`const VAULT_ABI = [
  // Initialization (called once by factory)
  "function initialize(address _owner, bytes32 _passwordHash) external",

  // Core operations (onlyOwner)
  "function shield(address tokenAddress, uint256 amount, string calldata password) external",
  "function unshield(address tokenAddress, uint256 amount, string calldata password) external",

  // Transfer (2 steps, onlyOwner)
  "function commitTransfer(bytes32 commitHash) external",
  "function revealTransfer(address tokenAddress, address to, uint256 amount, string calldata password, uint256 nonce) external",

  // Vault proof management (onlyOwner)
  "function changeVaultProof(string calldata oldPassword, string calldata newPassword) external",

  // Emergency (onlyOwner, after EMERGENCY_DELAY_BLOCKS of inactivity)
  "function emergencyWithdraw(address[] calldata tokens) external",

  // View functions
  "function getQTokenAddress(address tokenAddress) external view returns (address)",
  "function getShieldedBalance(address tokenAddress) external view returns (uint256)",
  "function getEmergencyWithdrawAvailableBlock() external view returns (uint256)",

  // Public state
  "function owner() external view returns (address)",
  "function initialized() external view returns (bool)",
  "function lastActivityBlock() external view returns (uint256)",

  // Constants
  "function COMMIT_EXPIRY_SECONDS() external view returns (uint256)",
  "function MINIMUM_SHIELD_AMOUNT() external view returns (uint256)",
  "function EMERGENCY_DELAY_BLOCKS() external view returns (uint256)",

  // Events
  "event TokenShielded(address indexed token, uint256 amount, address indexed qToken)",
  "event TokenUnshielded(address indexed token, uint256 amount)",
  "event TransferExecuted(address indexed token, address indexed to, uint256 amount)",
  "event QTokenDeployed(address indexed token, address indexed qToken)",
  "event CommitSubmitted(bytes32 indexed commitHash)",
  "event VaultProofChanged()",
  "event EmergencyWithdraw(address indexed token, uint256 amount)",
] as const;`}</code></pre>

      <h2>ShieldToken (qToken) ABI</h2>
      <pre><code>{`const QTOKEN_ABI = [
  // Standard ERC-20 reads
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",

  // Allowance always returns 0 (approvals disabled)
  "function allowance(address, address) external view returns (uint256)",

  // These always revert
  "function transfer(address, uint256) external returns (bool)",
  "function transferFrom(address, address, uint256) external returns (bool)",
  "function approve(address, uint256) external returns (bool)",

  // Vault reference
  "function vault() external view returns (address)",
] as const;`}</code></pre>

      <h2>Minimal ERC-20 ABI (for underlying tokens)</h2>
      <pre><code>{`const ERC20_ABI = [
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
] as const;`}</code></pre>

      <h2>Contract Addresses</h2>
      <table>
        <thead>
          <tr><th>Network</th><th>Chain ID</th><th>ShieldFactory</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Sepolia</td>
            <td><code>11155111</code></td>
            <td><code>0x9a66500886344cbcce882137f263CB0c61aa99b1</code></td>
          </tr>
          <tr>
            <td>Mainnet</td>
            <td><code>1</code></td>
            <td>Pending deployment</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
