export default function QToken() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Smart Contracts
        </span>
      </div>
      <h1>qToken (ShieldToken)</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        ShieldToken is the contract behind every qToken (qUSDC, qUSDT, qWETH, etc.). It is an ERC-20 with all transfer-related functions permanently disabled. Only the parent vault contract can mint or burn.
      </p>

      <h2>Key Difference from Standard ERC-20</h2>
      <p>
        A standard ERC-20 exposes three functions that allow tokens to move between addresses: <code>transfer()</code>, <code>transferFrom()</code>, and <code>approve()</code>. ShieldToken overrides all three with unconditional reverts. No amount of gas or clever contract call can bypass this, because the functions are marked <code>pure</code> (no state reads, no conditions, just revert).
      </p>

      <h2>Inheritance</h2>
      <pre><code>{`contract ShieldToken is ERC20`}</code></pre>

      <h2>Constructor</h2>
      <pre><code>{`constructor(string memory name, string memory symbol, address _vault, uint8 decimals_) ERC20(name, symbol) {
    vault = _vault;
    _decimals = decimals_;
}

function decimals() public view override returns (uint8) {
    return _decimals;
}`}</code></pre>
      <p>
        Called by PersonalVault when a token is shielded for the first time. The <code>vault</code> address is
        the PersonalVault instance that owns this qToken. The <code>decimals_</code> value is read from the
        underlying ERC-20 before deployment and stored permanently. This ensures Etherscan, MetaMask, and
        all wallets display the correct token amount regardless of the underlying token's decimal precision.
      </p>
      <div className="callout callout-info">
        <strong>Why this matters:</strong> OpenZeppelin ERC20 defaults to 18 decimals. USDC has 6 decimals.
        Without this fix, 9.5 qUSDC would display as 0.0000000000095 in Etherscan.
        The constructor parameter was added in the v2 deployment.
      </div>

      <h2>Overridden Functions</h2>
      <pre><code>{`function transfer(address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}

function transferFrom(address, address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}

function approve(address, uint256) public pure override returns (bool) {
    revert("qToken: approvals disabled");
}`}</code></pre>

      <h2>Mint and Burn</h2>
      <pre><code>{`function mint(address to, uint256 amount) external onlyVault {
    _mint(to, amount);
}

function burn(address from, uint256 amount) external onlyVault {
    _burn(from, amount);
}`}</code></pre>
      <p>
        Only the vault contract can call <code>mint()</code> and <code>burn()</code>. Attempts from any other address revert with <code>"Only QRYPTANK can call this"</code>.
      </p>

      <h2>Token Naming Convention</h2>
      <p>
        When deployed, the qToken reads the underlying token's name and symbol and prepends <code>q</code>:
      </p>
      <pre><code>{`name   = "q" + underlying.name()    // e.g. "qUSD Coin"
symbol = "q" + underlying.symbol()  // e.g. "qUSDC"`}</code></pre>
      <p>
        If the underlying token does not implement <code>name()</code> or <code>symbol()</code>, the qToken falls back to <code>"qToken"</code> and <code>"qTKN"</code>.
      </p>

      <h2>One Contract Per Token Per Vault</h2>
      <p>
        Each PersonalVault deploys its own set of qToken contracts. User A and User B each have their own <code>qUSDC</code> at different addresses. The balances are attributed to the user's wallet address in the qToken's ERC-20 balance mapping.
      </p>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Token</th>
            <th>qToken Contract</th>
            <th>Balance Attributed To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0xWalletA</td>
            <td>USDC</td>
            <td>0xqTokenA_USDC</td>
            <td>0xWalletA</td>
          </tr>
          <tr>
            <td>0xWalletB</td>
            <td>USDC</td>
            <td>0xqTokenB_USDC</td>
            <td>0xWalletB</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
