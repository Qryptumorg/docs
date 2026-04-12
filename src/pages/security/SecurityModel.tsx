import SecurityLayerDiagram from "@/components/diagrams/SecurityLayerDiagram";
import { useLanguage } from "@/lib/LanguageContext";
import { securityContent } from "@/lib/content/security";

export default function SecurityModel() {
  const { lang, t } = useLanguage();
  const c = securityContent[lang].model;

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

      <h2>{c.h2TwoFactor}</h2>
      <p>{c.pTwoFactor}</p>
      <ol>
        {c.factorItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p>{c.pTwoFactorConclusion}</p>

      <SecurityLayerDiagram />

      <h2>{c.h2NonTransferable}</h2>
      <p>{c.pNonTransferable}</p>
      <pre><code>{`function transfer(address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function transferFrom(address, address, uint256) public pure override returns (bool) {
    revert("qToken: transfers disabled, use Qryptum app");
}
function approve(address, uint256) public pure override returns (bool) {
    revert("qToken: approvals disabled");
}`}</code></pre>
      <p>{c.pPure}</p>

      <h2>{c.h2Replay}</h2>
      <ul>
        {c.replayItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{c.h2Attacks}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.attackHeaders[0]}</th>
            <th>{c.attackHeaders[1]}</th>
            <th>{c.attackHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.attacks.map(([attack, outcome, why]) => (
            <tr key={attack}>
              <td>{attack}</td>
              <td>{outcome}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
