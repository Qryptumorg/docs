import { useLanguage } from "@/lib/LanguageContext";
import { introductionContent } from "@/lib/content/introduction";
import TransferModeDiagram from "@/components/diagrams/TransferModeDiagram";

const MODE_COLORS: Record<string, string> = {
  QryptSafe:   "#22C55E",
  QryptShield: "#8B5CF6",
  QryptAir:    "#F59E0B",
};

const PENDING = (
  <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.85rem" }}>
    Pending deployment
  </em>
);

export default function Overview() {
  const { lang, t } = useLanguage();
  const c = introductionContent[lang].overview;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{
          fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "hsl(var(--muted-fg))",
        }}>
          {t.nav.sections.introduction}
        </span>
      </div>

      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <h2>{c.h2TransferModes}</h2>
      <table>
        <thead>
          <tr>
            {c.modeTableHeaders.map((h) => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {c.modes.map(([mode, mechanism, privacy, bestFor]) => (
            <tr key={mode}>
              <td><strong style={{ color: MODE_COLORS[mode] ?? "inherit" }}>{mode}</strong></td>
              <td>{mechanism}</td>
              <td>{privacy}</td>
              <td>{bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <TransferModeDiagram />

      <h2>{c.h2Architecture}</h2>
      <p>{c.pArchitecture}</p>
      <ul>
        {c.archItems.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>{c.h2CoreProperties}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.coreTableHeaders[0]}</th>
            <th>{c.coreTableHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.coreProperties.map(([prop, how]) => (
            <tr key={prop}>
              <td><strong>{prop}</strong></td>
              <td>{how}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2DeployedContracts}</h2>
      <p>{c.pDeployedV6}</p>

      <div className="callout callout-info" style={{ marginBottom: "0.75rem" }}>
        All V1-V6 contracts are being redeployed from a clean wallet with zero association to other projects. Contract addresses will appear here as each version is deployed and verified on Etherscan, one version per day. See the Deployed Addresses page for the full table.
      </div>

      <div className="callout callout-success" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.4rem" }}>
          <strong>{c.labelFactoryV6}</strong>{" "}{PENDING}
        </p>
        <p style={{ margin: "0 0 0.4rem" }}>
          <strong>{c.labelImplV6}</strong>{" "}{PENDING}
        </p>
        <p style={{ margin: "0" }}>
          <strong>{c.labelQryptAirV6}</strong>{" "}
          <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.875rem" }}>depositToAirBag() / redeemVoucher() in PersonalQryptSafe v6</em>
        </p>
      </div>

      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.4rem" }}>
          <strong>{c.labelFactoryV5}</strong>{" "}{PENDING}
        </p>
        <p style={{ margin: "0 0 0.4rem" }}>
          <strong>{c.labelImplV5}</strong>{" "}{PENDING}
        </p>
        <p style={{ margin: "0" }}>
          <strong>{c.labelQryptAirV5}</strong>{" "}
          <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.875rem" }}>redeemVoucher() in PersonalQryptSafe v5</em>
        </p>
      </div>

      <div className="callout callout-warning" style={{ marginBottom: "0" }}>
        <p style={{ margin: "0 0 0.4rem" }}>
          <strong>v1-v4 (Historical):</strong>{" "}{PENDING}
        </p>
        <p style={{ margin: "0" }}>
          <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.875rem" }}>{c.pendingNote}</em>
        </p>
      </div>

      <h2>{c.h2V5ToV6}</h2>
      <ul>
        {c.v5ToV6Items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>{c.h2V3ToV5}</h2>
      <ul>
        {c.v3ToV5Items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>{c.h2V4ToV5}</h2>
      <ul>
        {c.v4ToV5Items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>v1 to v3: Factory bug fixes</h2>
      <ul>
        <li>v1: Factory had <code>Ownable</code> and <code>Pausable</code> — deployer could pause vault creation (critical bug).</li>
        <li>v2: Fixed decimal precision bug in qToken. Still had Ownable/Pausable.</li>
        <li>v3: Removed <code>Ownable</code> and <code>Pausable</code> entirely. Factory is fully immutable with zero admin keys.</li>
        <li>Renamed: <code>ShieldFactory</code> to <code>QryptSafe</code>; <code>PersonalVault</code> to <code>PersonalQryptSafe</code>.</li>
      </ul>
    </div>
  );
}
