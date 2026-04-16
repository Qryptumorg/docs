import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { introductionContent } from "@/lib/content/introduction";
import QryptSafeFlowDiagram from "@/components/diagrams/QryptSafeFlowDiagram";
import QryptShieldFlowDiagram from "@/components/diagrams/QryptShieldFlowDiagram";
import QryptAirFlowDiagram from "@/components/diagrams/QryptAirFlowDiagram";

const PRODUCTS = [
  { badge: "QryptSafe",   color: "rgba(255,255,255,0.7)", key: "tabSafe"   as const },
  { badge: "QryptShield", color: "rgba(255,255,255,0.7)", key: "tabShield" as const },
  { badge: "QryptAir",    color: "rgba(255,255,255,0.7)", key: "tabAir"    as const },
];

function StepCard({
  num,
  title,
  color,
  children,
}: {
  num: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "8px",
      padding: "1.25rem 1.5rem",
      marginBottom: "1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <span style={{
          fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.06em",
          color, padding: "2px 8px",
          border: `1px solid ${color}50`, borderRadius: "4px",
        }}>
          {num}
        </span>
        <strong style={{ fontSize: "0.9375rem" }}>{title}</strong>
      </div>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "hsl(var(--muted-fg))" }}>
        {children}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const { lang, t } = useLanguage();
  const c = introductionContent[lang].howItWorks;

  const tabLabels = [c.tabSafe, c.tabShield, c.tabAir];

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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        {c.intro}
      </p>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {PRODUCTS.map((prod, i) => (
          <button
            key={prod.badge}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "6px",
              border: `1px solid ${activeTab === i ? prod.color + "80" : "hsl(var(--border))"}`,
              background: activeTab === i ? prod.color + "15" : "transparent",
              color: activeTab === i ? prod.color : "hsl(var(--muted-fg))",
              fontWeight: activeTab === i ? 700 : 500,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tabLabels[i]}
          </button>
        ))}
      </div>

      {/* QryptSafe tab */}
      {activeTab === 0 && (
        <div>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(var(--muted-fg))", marginBottom: "1.5rem" }}>
            {c.safeIntro}
          </p>

          <h2>{c.safeH2Lifecycle}</h2>
          <QryptSafeFlowDiagram />

          <StepCard num="01" title={c.safeStep01Title} color="#22C55E">
            <p style={{ margin: 0 }}>{c.safeStep01Desc}</p>
          </StepCard>

          <StepCard num="02" title={c.safeStep02Title} color="#22C55E">
            <p style={{ margin: 0 }}>{c.safeStep02Desc}</p>
          </StepCard>

          <StepCard num="03" title={c.safeStep03Title} color="#22C55E">
            <p style={{ margin: "0 0 1rem" }}>{c.safeStep03Desc}</p>
            <table>
              <thead>
                <tr>
                  {c.safeTransferTableHeaders.map((h) => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {c.safeTransferRows.map(([step, action, onchain]) => (
                  <tr key={step}>
                    <td>{step}</td>
                    <td>{action}</td>
                    <td>{onchain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="callout" style={{ marginTop: "1rem" }}>
              {c.safeTransferCallout}
            </div>
          </StepCard>

          <StepCard num="04" title={c.safeStep04Title} color="#22C55E">
            <p style={{ margin: 0 }}>{c.safeStep04Desc}</p>
          </StepCard>

          <h2>{c.safeH2Creating}</h2>
          <p>{c.safeCreatingDesc}</p>

          <pre><code>{`// Derive the initial chain head off-chain from your vault proof
const initialChainHead = keccak256(toUtf8Bytes("abc123"));
// Deploy your Qrypt-Safe via the factory (seeds the OTP chain)
const tx = await factory.createQryptSafe(initialChainHead);
// After deployment, getVault(walletAddress) returns your vault address`}</code></pre>
        </div>
      )}

      {/* QryptShield tab */}
      {activeTab === 1 && (
        <div>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(var(--muted-fg))", marginBottom: "1.5rem" }}>
            {c.shieldIntro}
          </p>

          <h2>{c.shieldH2TokenLifecycle}</h2>
          <QryptShieldFlowDiagram />

          <StepCard num="01" title={c.shieldStep01Title} color="#8B5CF6">
            <p style={{ margin: 0 }}>{c.shieldStep01Desc}</p>
          </StepCard>

          <StepCard num="02" title={c.shieldStep02Title} color="#8B5CF6">
            <p style={{ margin: 0 }}>{c.shieldStep02Desc}</p>
          </StepCard>

          <StepCard num="03" title={c.shieldStep03Title} color="#8B5CF6">
            <p style={{ margin: "0 0 1rem" }}>{c.shieldStep03Desc}</p>
            <div className="callout callout-info">
              {c.shieldStep03Callout}
            </div>
          </StepCard>

          <h2>{c.shieldH2Privacy}</h2>
          <table>
            <thead>
              <tr>
                {c.shieldPrivacyHeaders.map((h) => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.shieldPrivacyRows.map(([hidden, visible]) => (
                <tr key={hidden}>
                  <td style={{ color: "hsl(var(--muted-fg))" }}>{hidden}</td>
                  <td style={{ color: "hsl(var(--muted-fg))" }}>{visible}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout">
            <strong>SDK note:</strong> QryptShield integration uses the <code>@railgun-community/wallet</code> SDK. The Railgun WASM prover generates ZK proofs client-side in the browser. No proof data leaves the user's device.
          </div>
        </div>
      )}

      {/* QryptAir tab */}
      {activeTab === 2 && (
        <div>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(var(--muted-fg))", marginBottom: "1.5rem" }}>
            {c.airIntro}
          </p>

          <QryptAirFlowDiagram />

          <StepCard num="01" title={c.airStep01Title} color="#F59E0B">
            <p style={{ margin: 0 }}>{c.airStep01Desc}</p>
          </StepCard>

          <StepCard num="02" title={c.airStep02Title} color="#F59E0B">
            <p style={{ margin: 0 }}>{c.airStep02Desc}</p>
          </StepCard>

          <StepCard num="03" title={c.airStep03Title} color="#F59E0B">
            <p style={{ margin: "0 0 1rem" }}>{c.airStep03Desc}</p>
            <div className="callout callout-info">
              {c.airStep03Callout}
            </div>
          </StepCard>

          <h2>{c.airH2UseCases}</h2>
          <table>
            <thead>
              <tr>
                {c.airUseCaseHeaders.map((h) => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.airUseCases.map(([scenario, help]) => (
                <tr key={scenario}>
                  <td><strong>{scenario}</strong></td>
                  <td>{help}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <pre><code>{`// QryptAir voucher structure (EIP-712 typed data)
const domain = {
  name: "QryptAir",
  version: "1",
  chainId: 11155111, // Sepolia
  verifyingContract: VAULT_ADDRESS,
};

const types = {
  VoucherData: [
    { name: "recipient",       type: "address" },
    { name: "token",           type: "address" },
    { name: "amount",          type: "uint256" },
    { name: "nonce",           type: "uint256" },
    { name: "deadline",        type: "uint256" },
    { name: "transferCodeHash",type: "bytes32"  },
  ],
};`}</code></pre>
        </div>
      )}
    </div>
  );
}
