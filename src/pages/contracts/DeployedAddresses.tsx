import { useLanguage } from "@/lib/LanguageContext";
import { contractsContent } from "@/lib/content/contracts";

const PENDING = <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</span>;

const versions = [
  {
    key: "v6",
    label: "v6: Active",
    sublabel: "OTP chain (proofChainHead) · airBudget isolation · QryptumSigner broadcaster · 63 tests",
    factory: null,
    impl: null,
    status: "active",
    etherscanFactory: null,
    etherscanImpl: null,
    mainnet: false,
  },
  {
    key: "v5",
    label: "v5: Historical",
    sublabel: "Railgun (unshieldToRailgun) · QryptAir EIP-712 voucher · passwordHash static bug · airBudget not isolated bug · 51 tests",
    factory: null,
    impl: null,
    status: "superseded",
    etherscanFactory: null,
    etherscanImpl: null,
    mainnet: false,
  },
  {
    key: "v4",
    label: "v4: Historical",
    sublabel: "Custom errors · activityCount · createdAtBlock · partial unshield · 47 tests",
    factory: null,
    impl: null,
    status: "superseded",
    etherscanFactory: null,
    etherscanImpl: null,
    mainnet: false,
  },
  {
    key: "v3",
    label: "v3: Historical",
    sublabel: "Trustless factory (no Ownable) · ECDSA meta-transfer · changeVaultProof · 36 tests",
    factory: null,
    impl: null,
    status: "superseded",
    etherscanFactory: null,
    etherscanImpl: null,
    mainnet: false,
  },
  {
    key: "v2",
    label: "v2: Historical",
    sublabel: "Pausable removed · nonce commits · overflow fix · 23 tests",
    factory: null,
    impl: null,
    status: "superseded",
    etherscanFactory: null,
    etherscanImpl: null,
    mainnet: false,
  },
  {
    key: "v1",
    label: "v1: Historical",
    sublabel: "Initial deployment · Ownable+Pausable factory · 18-decimal bug · 12 tests",
    factory: "0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A",
    impl: "0x5E398e1E0Ba28f9659013B1212f24b8B43d69393",
    status: "superseded",
    etherscanFactory: "https://sepolia.etherscan.io/address/0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0x5E398e1E0Ba28f9659013B1212f24b8B43d69393#code",
    mainnet: false,
  },
];

const statusColor: Record<string, string> = {
  active: "#16a34a",
  superseded: "#ca8a04",
  decommissioned: "#dc2626",
  pending: "hsl(var(--muted-fg))",
};

const statusLabel: Record<string, string> = {
  active: "Verified",
  superseded: "Superseded",
  decommissioned: "Decommissioned",
  pending: "Pending",
};

export default function DeployedAddresses() {
  const { lang, t } = useLanguage();
  const c = contractsContent[lang].deployedAddresses;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.smartContracts}
        </span>
      </div>
      <h1>{c.title}</h1>

      <h2>{c.h2Sepolia}</h2>

      <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>
        All V1-V6 contracts are being redeployed from a clean wallet with zero association to other projects. Addresses will be filled in as each version is deployed and verified on Etherscan, one version per day.
      </div>

      {versions.map((v) => {
        const isActive = v.status === "active";
        return (
          <div key={v.key}>
            <h3 style={{ color: isActive ? statusColor.active : undefined }}>{v.label}</h3>
            <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{v.sublabel}</p>
            <table>
              <thead>
                <tr>
                  <th>{c.tableHeaders[0]}</th>
                  <th>{c.tableHeaders[1]}</th>
                  <th>{c.tableHeaders[2]}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>QryptSafe {v.key} (factory)</td>
                  <td>{v.factory ? <code>{v.factory}</code> : PENDING}</td>
                  <td style={{ color: v.factory ? statusColor[v.status] : statusColor.pending, fontWeight: 600 }}>
                    {v.factory ? statusLabel[v.status] : statusLabel.pending}
                  </td>
                </tr>
                <tr>
                  <td>PersonalQryptSafe {v.key} (impl)</td>
                  <td>{v.impl ? <code>{v.impl}</code> : PENDING}</td>
                  <td style={{ color: v.impl ? statusColor[v.status] : statusColor.pending, fontWeight: 600 }}>
                    {v.impl ? statusLabel[v.status] : statusLabel.pending}
                  </td>
                </tr>
              </tbody>
            </table>
            {v.etherscanFactory && (
              <p>
                <a href={`https://sepolia.etherscan.io/address/${v.etherscanFactory}#code`} target="_blank" rel="noopener noreferrer">
                  QryptSafe {v.key} factory on Sepolia Etherscan
                </a>
                {v.etherscanImpl && (
                  <>
                    {" | "}
                    <a href={`https://sepolia.etherscan.io/address/${v.etherscanImpl}#code`} target="_blank" rel="noopener noreferrer">
                      PersonalQryptSafe {v.key} impl on Sepolia Etherscan
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        );
      })}

      <h2>{c.h2Mainnet}</h2>
      <div className="callout callout-info">
        {c.calloutMainnet}
      </div>
      <table>
        <thead>
          <tr>
            <th>{c.tableHeaders[0]}</th>
            <th>{c.tableHeaders[1]}</th>
            <th>{c.tableHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>QryptSafe v6 (factory)</td>
            <td>{PENDING}</td>
            <td style={{ color: statusColor.pending, fontWeight: 600 }}>Pending</td>
          </tr>
          <tr>
            <td>PersonalQryptSafe v6 (impl)</td>
            <td>{PENDING}</td>
            <td style={{ color: statusColor.pending, fontWeight: 600 }}>Pending</td>
          </tr>
        </tbody>
      </table>

      <h2>{c.h2TestWallets}</h2>
      <p>{c.pTestWallets}</p>
      <div className="callout callout-info">
        Test wallet addresses will be published here after V1-V6 deployment is complete.
      </div>

      <h2>{c.h2SupportedNetworks}</h2>
      <p>{c.pSupportedNetworks}</p>
      <table>
        <thead>
          <tr>
            <th>{c.networkHeaders[0]}</th>
            <th>{c.networkHeaders[1]}</th>
            <th>{c.networkHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.networkRows.map(([network, chainId, useCase]) => (
            <tr key={chainId}>
              <td>{network}</td>
              <td><code>{chainId}</code></td>
              <td>{useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
