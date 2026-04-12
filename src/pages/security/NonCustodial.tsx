import { useLanguage } from "@/lib/LanguageContext";
import { securityContent } from "@/lib/content/security";

export default function NonCustodial() {
  const { lang, t } = useLanguage();
  const c = securityContent[lang].nonCustodial;

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

      <h2>{c.h2Custody}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.custodyHeaders[0]}</th>
            <th>{c.custodyHeaders[1]}</th>
            <th>{c.custodyHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.custodyRows.map(([asset, location, who]) => (
            <tr key={asset}>
              <td>{asset}</td>
              <td>{location}</td>
              <td>{who}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2NoAdmin}</h2>
      <p>{c.pNoAdmin1}</p>
      <p>{c.pNoAdmin2}</p>

      <h2>{c.h2NoUpgrade}</h2>
      <p>{c.pNoUpgrade}</p>

      <h2>{c.h2Emergency}</h2>
      <p>{c.pEmergency}</p>
      <div className="callout callout-warning">
        {c.calloutEmergency}
      </div>

      <h2>{c.h2Server}</h2>
      <p>{c.pServer}</p>
      <ul>
        {c.serverItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{c.pServerConclusion}</p>
    </div>
  );
}
