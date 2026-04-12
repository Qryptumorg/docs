import { useLanguage } from "@/lib/LanguageContext";
import { contractsContent } from "@/lib/content/contracts";

export default function QToken() {
  const { lang, t } = useLanguage();
  const c = contractsContent[lang].qtoken;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.smartContracts}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <h2>{c.h2KeyDiff}</h2>
      <p>{c.pKeyDiff}</p>

      <h2>{c.h2Inheritance}</h2>
      <pre><code>{`import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShieldToken is ERC20 {
    address public vault;
    uint8 private _decimals;

    modifier onlyVault() {
        require(msg.sender == vault, "Only Qrypt-Safe can call this");
        _;
    }
}`}</code></pre>

      <h2>{c.h2Constructor}</h2>
      <pre><code>{`constructor(
    address _vault,
    string memory underlyingName,
    string memory underlyingSymbol,
    uint8 underlyingDecimals
) ERC20(
    string(abi.encodePacked("q", underlyingName)),
    string(abi.encodePacked("q", underlyingSymbol))
) {
    vault = _vault;
    _decimals = underlyingDecimals;
}`}</code></pre>
      <p>{c.pConstructor}</p>
      <div className="callout callout-info">{c.calloutDecimals}</div>

      <h2>{c.h2Overridden}</h2>
      <pre><code>{`function transfer(address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function transferFrom(address, address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function approve(address, uint256) public pure override returns (bool) {
    revert("qToken: approvals disabled");
}
function decimals() public view override returns (uint8) {
    return _decimals;
}`}</code></pre>

      <h2>{c.h2MintBurn}</h2>
      <pre><code>{`function mint(address to, uint256 amount) external onlyVault {
    _mint(to, amount);
}
function burn(address from, uint256 amount) external onlyVault {
    _burn(from, amount);
}`}</code></pre>
      <p>{c.pMintBurn}</p>

      <h2>{c.h2Naming}</h2>
      <p>{c.pNaming}</p>

      <h2>{c.h2OneContract}</h2>
      <p>{c.pOneContract}</p>
    </div>
  );
}
