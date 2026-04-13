import { useLanguage } from "@/lib/LanguageContext";
import { contractsContent } from "@/lib/content/contracts";

const PENDING = <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</span>;

const versions = [
  {
    key: "v6",
    label: "v6: Active",
    sublabel: "OTP chain (proofChainHead) · airBudget isolation · QryptumSigner broadcaster · 50 tests",
    factory: "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
    impl: "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3",
    status: "active",
    etherscanFactory: "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
    mainnet: false,
  },
  {
    key: "v5",
    label: "v5: Historical",
    sublabel: "Railgun (unshieldToRailgun) · QryptAir EIP-712 voucher · passwordHash static bug · airBudget not isolated bug · 51 tests",
    factory: "0xB757fb0511A6d305370a20a0647C751D7E76D2ce",
    impl: "0x06e29f9309Afa42A3f5E5640717bd8db952F12ba",
    status: "superseded",
    etherscanFactory: "https://sepolia.etherscan.io/address/0xB757fb0511A6d305370a20a0647C751D7E76D2ce#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0x06e29f9309Afa42A3f5E5640717bd8db952F12ba#code",
    mainnet: false,
  },
  {
    key: "v4",
    label: "v4: Historical",
    sublabel: "Custom errors (13) · vault metadata (createdAtBlock, activityCount) · partial unshield · 47 tests",
    factory: "0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F",
    impl: "0x8E0c9350CdF384a208F6005A2F632f35FB4e413E",
    status: "superseded",
    etherscanFactory: "https://sepolia.etherscan.io/address/0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0x8E0c9350CdF384a208F6005A2F632f35FB4e413E#code",
    mainnet: false,
  },
  {
    key: "v3",
    label: "v3: Historical",
    sublabel: "Trustless factory (no Ownable) · ECDSA meta-transfer · changeVaultProof · 36 tests",
    factory: "0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c",
    impl: "0xaf2E91CDc70e81fA74b9aE9C322e8302bb51715e",
    status: "superseded",
    etherscanFactory: "https://sepolia.etherscan.io/address/0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0xaf2E91CDc70e81fA74b9aE9C322e8302bb51715e#code",
    mainnet: false,
  },
  {
    key: "v2",
    label: "v2: Historical",
    sublabel: "Pausable removed · nonce commits · overflow fix · 23 tests",
    factory: "0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf",
    impl: "0x675f70646713D4026612c673E644C61ae3aa7725",
    status: "superseded",
    etherscanFactory: "https://sepolia.etherscan.io/address/0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf#code",
    etherscanImpl: "https://sepolia.etherscan.io/address/0x675f70646713D4026612c673E644C61ae3aa7725#code",
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
        V1, V2, V3, and V4 are deployed and MIT-verified on Etherscan. V5-V6 addresses will be added as each version is deployed and verified.
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
