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

      {/* v6 */}
      <div className="callout callout-success" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v6 (Active)</strong> <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.8rem" }}>Pending deployment</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>OTP chain proofs, air bag isolation, pre-image resistant nonce chain. 49/49 E2E tests.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}><strong>QryptSafe v6 (factory):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}><strong>PersonalQryptSafe v6 (impl):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
      </div>

      {/* v5 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v5 (Superseded)</strong> <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.8rem" }}>Pending deployment</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>bytes32 proofHash, unshieldToRailgun, QryptAir EIP-712 vouchers. 32/32 E2E tests.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}><strong>QryptSafe v5 (factory):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}><strong>PersonalQryptSafe v5 (impl):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
      </div>

      {/* v4 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v4 (Superseded)</strong> <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.8rem" }}>Pending deployment</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>QryptAir EIP-712 vouchers, QryptShield Railgun integration.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}><strong>QryptSafe v4 (factory):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}><strong>PersonalQryptSafe v4 (impl):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
      </div>

      {/* v3 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v3 (Superseded)</strong> <em style={{ color: "hsl(var(--muted-fg))", fontSize: "0.8rem" }}>Pending deployment</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Ownable removed entirely, ECDSA changeVaultProof(), zero admin keys. 26/26 E2E tests.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}><strong>QryptSafe v3 (factory):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}><strong>PersonalQryptSafe v3 (impl):</strong> <em style={{ color: "hsl(var(--muted-fg))" }}>Pending deployment</em></p>
      </div>

      {/* v2 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v2 (Superseded)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Pausable removed, nonce-based commit deduplication, SafeERC20. 23/23 tests.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}>
          <strong>QryptSafe v2 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>PersonalQryptSafe v2 (impl):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x675f70646713D4026612c673E644C61ae3aa7725</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x675f70646713D4026612c673E644C61ae3aa7725" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v1 */}
      <div className="callout callout-warning" style={{ marginBottom: "0" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v1 (Historical)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Genesis deployment. EIP-1167 minimal proxy. Ownable + Pausable factory (admin keys). 12/12 tests.</p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}>
          <strong>ShieldFactory v1 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>PersonalVault v1 (impl):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x5E398e1E0Ba28f9659013B1212f24b8B43d69393</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x5E398e1E0Ba28f9659013B1212f24b8B43d69393" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>
    </div>
  );
}
