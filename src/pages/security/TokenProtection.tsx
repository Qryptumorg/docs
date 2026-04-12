import TokenLifecycleDiagram from "@/components/diagrams/TokenLifecycleDiagram";
import { useLanguage } from "@/lib/LanguageContext";
import { securityContent } from "@/lib/content/security";

const NAMING_EXAMPLES = [
  ["USD Coin (USDC)", "qUSD Coin", "qUSDC"],
  ["Tether (USDT)", "qTether USD", "qUSDT"],
  ["Wrapped Ether (WETH)", "qWrapped Ether", "qWETH"],
  ["Dai (DAI)", "qDai Stablecoin", "qDAI"],
] as const;

export default function TokenProtection() {
  const { lang, t } = useLanguage();
  const c = securityContent[lang].tokenProtection;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.security}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <TokenLifecycleDiagram />

      <h2>{c.h2Contract}</h2>
      <p>{c.pContract}</p>
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

      <h2>{c.h2CannotHappen}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.cannotHeaders[0]}</th>
            <th>{c.cannotHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.cannotRows.map(([action, result]) => (
            <tr key={action}>
              <td>{action}</td>
              <td>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Naming}</h2>
      <p>{c.pNaming}</p>
      <table>
        <thead>
          <tr>
            <th>{c.namingHeaders[0]}</th>
            <th>{c.namingHeaders[1]}</th>
            <th>{c.namingHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {NAMING_EXAMPLES.map(([underlying, name, symbol]) => (
            <tr key={symbol}>
              <td>{underlying}</td>
              <td>{name}</td>
              <td>{symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2OneContract}</h2>
      <p>{c.pOneContract}</p>
    </div>
  );
}
