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
        <p style={{ margin: "0 0 0.25rem" }}><strong>v6 (Active)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>OTP chain proofs, air bag isolation, pre-image resistant nonce chain. 67/67 E2E tests.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>QryptSafe v6 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0xeaa722e996888b662E71aBf63d08729c6B6802F4</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v5 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v5 (Superseded)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>bytes32 proofHash, unshieldToRailgun, QryptAir EIP-712 vouchers. 51/51 E2E tests.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>QryptSafe v5 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0xB757fb0511A6d305370a20a0647C751D7E76D2ce</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0xB757fb0511A6d305370a20a0647C751D7E76D2ce" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v4 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v4 (Superseded)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Custom errors (13), vault metadata (createdAtBlock, activityCount), partial unshield. 47 unit tests, 10 on-chain E2E txs.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>QryptSafe v4 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v3 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v3 (Superseded)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Ownable removed entirely, changeVaultProof(), metaTransfer() EIP-712. 36 unit tests, 5 on-chain E2E txs.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>QryptSafe v3 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v2 */}
      <div className="callout callout-warning" style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v2 (Superseded)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Pausable removed, nonce-based commit deduplication, SafeERC20. 23/23 tests.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>QryptSafe v2 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>

      {/* v1 */}
      <div className="callout callout-warning" style={{ marginBottom: "0" }}>
        <p style={{ margin: "0 0 0.25rem" }}><strong>v1 (Historical)</strong> <em style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>Deployed and verified</em></p>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>Genesis deployment. EIP-1167 minimal proxy. Ownable + Pausable factory (admin keys). 12/12 tests.</p>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>
          <strong>ShieldFactory v1 (factory):</strong>{" "}
          <code style={{ fontSize: "0.8rem" }}>0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A</code>{" "}
          <a href="https://sepolia.etherscan.io/address/0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem" }}>Etherscan ↗</a>
        </p>
      </div>
    </div>
  );
}
