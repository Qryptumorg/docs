import { useLanguage } from "@/lib/LanguageContext";
import { securityContent } from "@/lib/content/security";

const PENDING_ADDR = <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</span>;
const PENDING_LINK = <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Available after deployment</span>;

const versions = [
  {
    key: "v6",
    label: "v6: Active",
    statusColor: "#16a34a",
    contracts: [
      { name: "QryptSafe v6 (factory)", addr: null },
      { name: "PersonalQryptSafe impl v6", addr: null },
      { name: "qToken USDC v6 (ShieldToken)", addr: null },
    ],
  },
  {
    key: "v5",
    label: "v5: Historical",
    statusColor: "#ca8a04",
    contracts: [
      { name: "QryptSafe v5 (factory)", addr: null },
      { name: "PersonalQryptSafe impl v5", addr: null },
    ],
  },
  {
    key: "v4",
    label: "v4: Historical",
    statusColor: "#ca8a04",
    contracts: [
      { name: "QryptSafe v4 (factory)", addr: null },
    ],
  },
  {
    key: "v3",
    label: "v3: Historical",
    statusColor: "#ca8a04",
    contracts: [
      { name: "QryptSafe v3 (factory)", addr: null },
      { name: "PersonalQryptSafe impl v3", addr: null },
    ],
  },
  {
    key: "v2",
    label: "v2: Historical",
    statusColor: "#ca8a04",
    contracts: [
      { name: "ShieldFactory v2 (factory)", addr: null },
      { name: "PersonalVault impl v2", addr: null },
    ],
  },
  {
    key: "v1",
    label: "v1: Historical (18-decimal bug)",
    statusColor: "#ca8a04",
    contracts: [
      { name: "QryptSafeV1 (factory)", addr: "0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A" },
      { name: "PersonalQryptSafeV1 (impl)", addr: "0x5E398e1E0Ba28f9659013B1212f24b8B43d69393" },
    ],
  },
];

export default function ContractVerification() {
  const { lang, t } = useLanguage();
  const c = securityContent[lang].contractVerification;

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

      <h2>{c.h2Sepolia}</h2>

      <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>
        V1 and V2 are deployed and MIT-verified on Etherscan. V3-V6 verification links will be added as each version is deployed.
      </div>

      {versions.map((v) => (
        <div key={v.key}>
          <h3 style={{ color: v.key === "v6" ? v.statusColor : undefined }}>{v.label}</h3>
          <table>
            <thead>
              <tr>
                <th>{c.contractTableHeaders[0]}</th>
                <th>{c.contractTableHeaders[1]}</th>
                <th>{c.contractTableHeaders[2]}</th>
              </tr>
            </thead>
            <tbody>
              {v.contracts.map((ct) => (
                <tr key={ct.name}>
                  <td>{ct.name}</td>
                  <td>{ct.addr ? <code>{ct.addr}</code> : PENDING_ADDR}</td>
                  <td>{ct.addr
                    ? <a href={`https://sepolia.etherscan.io/address/${ct.addr}#code`} target="_blank" rel="noopener noreferrer">{c.viewSource}</a>
                    : PENDING_LINK
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>{c.h2Mainnet}</h2>
      <div className="callout callout-info">
        {c.calloutMainnet}
      </div>

      <h2>{c.h2WhatProves}</h2>
      <p>{c.pWhatProves}</p>
      <ul>
        {c.proveItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{c.h2HowToVerify}</h2>
      <p>{c.pHowToVerify}</p>
      <pre><code>{`git clone https://github.com/Qryptumorg/contracts
cd contracts
npm install
npx hardhat compile

# Compare the bytecode hash of the local build
# against the deployed contract bytecode on Etherscan`}</code></pre>

      <h2>{c.h2TestCoverage}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.coverageHeaders[0]}</th>
            <th>{c.coverageHeaders[1]}</th>
            <th>{c.coverageHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.coverageRows.map(([suite, tests, coverage]) => (
            <tr key={suite}>
              <td>{suite}</td>
              <td>{tests}</td>
              <td>{coverage}</td>
            </tr>
          ))}
          <tr>
            <td><strong>{c.coverageTotal[0]}</strong></td>
            <td><strong>{c.coverageTotal[1]}</strong></td>
            <td><strong>{c.coverageTotal[2]}</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>{c.h2E2EV6}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.e2eHeaders[0]}</th>
            <th>{c.e2eHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.e2eV6Rows.map(([test, result]) => (
            <tr key={test}>
              <td>{test}</td>
              <td style={{ color: "#16a34a", fontWeight: 600 }}>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2E2EV5}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.e2eHeaders[0]}</th>
            <th>{c.e2eHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.e2eV5Rows.map(([test, result]) => (
            <tr key={test}>
              <td>{test}</td>
              <td style={{ color: "#16a34a", fontWeight: 600 }}>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2E2E}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.e2eHeaders[0]}</th>
            <th>{c.e2eHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.e2eRows.map(([test, result]) => (
            <tr key={test}>
              <td>{test}</td>
              <td style={{ color: "#16a34a", fontWeight: 600 }}>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
