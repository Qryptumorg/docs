import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import { useLanguage } from "@/lib/LanguageContext";
import { contractsContent } from "@/lib/content/contracts";

export default function ShieldFactory() {
  const { lang, t } = useLanguage();
  const c = contractsContent[lang].shieldFactory;

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

      <div className="callout callout-success">{c.calloutAddressV6}</div>
      <pre style={{ marginTop: "0.5rem" }}><code style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</code></pre>
      <div className="callout callout-info" style={{ marginTop: "0.75rem" }}>{c.calloutV6Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV5}</div>
      <pre style={{ marginTop: "0.5rem" }}><code style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</code></pre>
      <div className="callout callout-info" style={{ marginTop: "0.5rem" }}>{c.calloutV5Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV4}</div>
      <pre style={{ marginTop: "0.5rem" }}><code style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</code></pre>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV3}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0xaf2E91CDc70e81fA74b9aE9C322e8302bb51715e</code>{" "}
        — <a href="https://sepolia.etherscan.io/address/0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>

      <div className="callout callout-warning" style={{ marginTop: "0.75rem" }}>{c.calloutAddressV2}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0x675f70646713D4026612c673E644C61ae3aa7725</code>{" "}
        — <a href="https://sepolia.etherscan.io/address/0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>
      <div className="callout callout-info" style={{ marginTop: "0.5rem" }}>{c.calloutV2Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "0.75rem" }}>{c.calloutAddressV1}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        <a href="https://sepolia.etherscan.io/address/0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>

      <ArchitectureDiagram />

      <h2>{c.h2Design}</h2>
      <pre><code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract QryptSafe {
    address public immutable vaultImplementation;
    mapping(address => address) private vaults;

    constructor(address _implementation) {
        vaultImplementation = _implementation;
    }
}`}</code></pre>
      <p>{c.pDesign}</p>
      <div className="callout callout-success" style={{ marginTop: "1rem" }}>
        {c.calloutNoAdmin}
      </div>

      <h2>{c.h2StateVars}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.stateHeaders[0]}</th>
            <th>{c.stateHeaders[1]}</th>
            <th>{c.stateHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.stateRows.map(([varName, type, desc]) => (
            <tr key={varName}>
              <td><code>{varName}</code></td>
              <td><code>{type}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Functions}</h2>

      <h3>{c.h3CreateVault}</h3>
      <pre><code>{`function createVault(bytes32 passwordHash) external returns (address)`}</code></pre>
      <p>{c.pCreateVault}</p>
      <table>
        <thead>
          <tr>
            <th>{c.revertHeaders[0]}</th>
            <th>{c.revertHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.createVaultReverts.map(([condition, revert]) => (
            <tr key={condition}>
              <td>{condition}</td>
              <td><code>{revert}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{c.h3HasVault}</h3>
      <pre><code>{`function hasVault(address user) external view returns (bool)`}</code></pre>
      <p>{c.pHasVault}</p>

      <h3>{c.h3GetVault}</h3>
      <pre><code>{`function getVault(address user) external view returns (address)`}</code></pre>
      <p>{c.pGetVault}</p>

      <h2>{c.h2Events}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.eventHeaders[0]}</th>
            <th>{c.eventHeaders[1]}</th>
            <th>{c.eventHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.eventRows.map(([event, args, when]) => (
            <tr key={event}>
              <td><code>{event}</code></td>
              <td><code>{args}</code></td>
              <td>{when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
