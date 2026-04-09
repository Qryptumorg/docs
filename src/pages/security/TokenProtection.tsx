export default function TokenProtection() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Security
        </span>
      </div>
      <h1>Token Protection</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        qTokens are ERC-20 contracts with all transfer-related functions permanently disabled at the bytecode level. This makes them impossible to move through any external mechanism.
      </p>

      <h2>The ShieldToken Contract</h2>
      <p>
        Each qToken is an instance of <code>ShieldToken</code>, a minimal ERC-20 that overrides the three functions every wallet and exchange relies on:
      </p>
      <pre><code>{`contract ShieldToken is ERC20 {
    address public vault;

    modifier onlyVault() {
        require(msg.sender == vault, "Only Qrypt-Safe can call this");
        _;
    }

    // transfer() always reverts
    function transfer(address, uint256) public pure override returns (bool) {
        revert("qToken: transfers disabled, use Qryptum app");
    }

    // transferFrom() always reverts
    function transferFrom(address, address, uint256) public pure override returns (bool) {
        revert("qToken: transfers disabled, use Qryptum app");
    }

    // approve() always reverts
    function approve(address, uint256) public pure override returns (bool) {
        revert("qToken: approvals disabled");
    }

    // Only mint/burn from vault contract
    function mint(address to, uint256 amount) external onlyVault {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyVault {
        _burn(from, amount);
    }
}`}</code></pre>

      <h2>What Cannot Happen</h2>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Send qUSDC from MetaMask</td>
            <td>Transaction reverts. MetaMask shows a failure.</td>
          </tr>
          <tr>
            <td>Send qUSDC from TrustWallet, Phantom, Rabby, Coinbase Wallet</td>
            <td>Transaction reverts. All wallets call the same ERC-20 functions.</td>
          </tr>
          <tr>
            <td>Approve a DEX (Uniswap, 1inch) to spend qTokens</td>
            <td>Revert. <code>approve()</code> is disabled.</td>
          </tr>
          <tr>
            <td>Deposit qTokens to a CEX</td>
            <td>Revert. The CEX would call <code>transferFrom()</code>, which reverts.</td>
          </tr>
          <tr>
            <td>Use qTokens as collateral in a lending protocol</td>
            <td>Any approval or transfer step reverts.</td>
          </tr>
          <tr>
            <td>Drain via malicious contract approval</td>
            <td>Revert. No approval can be set on qTokens.</td>
          </tr>
        </tbody>
      </table>

      <h2>qToken Naming</h2>
      <p>
        Each qToken takes the name and symbol of the underlying asset and prepends <code>q</code>. Examples:
      </p>
      <table>
        <thead>
          <tr>
            <th>Underlying Token</th>
            <th>qToken Name</th>
            <th>qToken Symbol</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>USD Coin (USDC)</td><td>qUSD Coin</td><td>qUSDC</td></tr>
          <tr><td>Tether (USDT)</td><td>qTether USD</td><td>qUSDT</td></tr>
          <tr><td>Wrapped Ether (WETH)</td><td>qWrapped Ether</td><td>qWETH</td></tr>
          <tr><td>Dai (DAI)</td><td>qDai Stablecoin</td><td>qDAI</td></tr>
        </tbody>
      </table>

      <h2>One qToken Contract Per Token Per Vault</h2>
      <p>
        The first time a user shields a given token (for example USDC), the vault deploys a new <code>ShieldToken</code> contract for that token. Subsequent shields of the same token mint to the same qToken contract. Different users have different qToken contract addresses for the same underlying asset.
      </p>
    </div>
  );
}
