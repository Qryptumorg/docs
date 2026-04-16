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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        {c.intro}
      </p>
      <div className="callout callout-info" style={{ marginBottom: "2rem" }}>
        All factory contracts use the EIP-1167 minimal proxy pattern. Each user deploys a personal vault clone by calling <code>createQryptSafe(initialChainHead)</code>. Contracts are MIT-licensed and verified on Etherscan. V6 is live on both Sepolia and Ethereum mainnet. V5 is on Sepolia only.
      </div>

      <h2>{c.h2V6Design}</h2>
      <p>{c.pV6Design}</p>
      <div className="callout callout-success" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        {c.calloutV6Features}
      </div>

      <pre style={{ marginBottom: "1.5rem" }}><code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract QryptSafe {
    address public immutable vaultImplementation;
    mapping(address => address) private vaults;
    string public constant SALT = "qryptum.mainnet";

    constructor(address _implementation) {
        vaultImplementation = _implementation;
    }

    function createVault(bytes32 passwordHash) external returns (address vault) {
        require(vaults[msg.sender] == address(0), "Vault exists");
        vault = Clones.clone(vaultImplementation);
        PersonalQryptSafeV6(vault).initialize(msg.sender, passwordHash);
        vaults[msg.sender] = vault;
    }
}`}</code></pre>

      <ArchitectureDiagram />

      <h3 style={{ marginTop: "1.5rem" }}>{c.h2V6Functions}</h3>
      <table style={{ marginBottom: "1rem" }}>
        <thead>
          <tr>
            <th>{c.v6FuncHeaders[0]}</th>
            <th>{c.v6FuncHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.v6FuncRows.map(([fn, desc]) => (
            <tr key={fn}>
              <td><code style={{ fontSize: "0.8rem" }}>{fn}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{c.h2V6Events}</h3>
      <table style={{ marginBottom: "1rem" }}>
        <thead>
          <tr>
            <th>{c.v6EventHeaders[0]}</th>
            <th>{c.v6EventHeaders[1]}</th>
            <th>{c.v6EventHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.v6EventRows.map(([ev, params, when]) => (
            <tr key={ev}>
              <td><code>{ev}</code></td>
              <td style={{ fontSize: "0.85rem" }}><code>{params}</code></td>
              <td>{when}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>State Variables (v6)</h3>
      <table style={{ marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>{c.v6StateHeaders[0]}</th>
            <th>{c.v6StateHeaders[1]}</th>
            <th>{c.v6StateHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.v6StateRows.map(([varName, type, desc]) => (
            <tr key={varName}>
              <td><code>{varName}</code></td>
              <td><code style={{ fontSize: "0.8rem" }}>{type}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginBottom: "0.75rem" }}>Ethereum Mainnet</h2>
      <div className="callout callout-warning" style={{ marginBottom: "0.5rem" }}>
        <strong>Mainnet: Pending.</strong> V6 Sepolia must reach full audit and E2E verification before mainnet deployment. Addresses will be published here once deployed and MIT-verified on Etherscan mainnet.
      </div>
      <table style={{ marginBottom: "2rem" }}>
        <thead>
          <tr><th>Contract</th><th>Address</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>QryptSafe (factory)</td><td><span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</span></td><td>Pending</td></tr>
          <tr><td>QryptSafe (impl)</td><td><span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>Pending deployment</span></td><td>Pending</td></tr>
        </tbody>
      </table>

      <h2 style={{ marginBottom: "0.75rem" }}>Sepolia Testnet</h2>

      <div className="callout callout-success">{c.calloutAddressV6}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0xeaa722e996888b662E71aBf63d08729c6B6802F4</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3</code>{" "}
        <a href="https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code" target="_blank" rel="noopener noreferrer">Etherscan factory ↗</a>
        {" | "}
        <a href="https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code" target="_blank" rel="noopener noreferrer">Etherscan impl ↗</a>
      </p>
      <div className="callout callout-info" style={{ marginTop: "0.75rem" }}>{c.calloutV6Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV5}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0xB757fb0511A6d305370a20a0647C751D7E76D2ce</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0x06e29f9309Afa42A3f5E5640717bd8db952F12ba</code>{" "}
        <a href="https://sepolia.etherscan.io/address/0xB757fb0511A6d305370a20a0647C751D7E76D2ce#code" target="_blank" rel="noopener noreferrer">Etherscan factory ↗</a>
        {" | "}
        <a href="https://sepolia.etherscan.io/address/0x06e29f9309Afa42A3f5E5640717bd8db952F12ba#code" target="_blank" rel="noopener noreferrer">Etherscan impl ↗</a>
      </p>
      <div className="callout callout-info" style={{ marginTop: "0.5rem" }}>{c.calloutV5Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV4}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0x8E0c9350CdF384a208F6005A2F632f35FB4e413E</code>{" "}
        <a href="https://sepolia.etherscan.io/address/0x611Ba6F93fAeC0203eBee1c3e35d72C1e5ba560F#code" target="_blank" rel="noopener noreferrer">Etherscan factory ↗</a>
        {" | "}
        <a href="https://sepolia.etherscan.io/address/0x8E0c9350CdF384a208F6005A2F632f35FB4e413E#code" target="_blank" rel="noopener noreferrer">Etherscan impl ↗</a>
      </p>

      <div className="callout callout-warning" style={{ marginTop: "1.25rem" }}>{c.calloutAddressV3}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0xaf2E91CDc70e81fA74b9aE9C322e8302bb51715e</code>{" "}
        <a href="https://sepolia.etherscan.io/address/0x88E8eAFafc99E83e687BCAbD53F783a92e51F75c#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>

      <div className="callout callout-warning" style={{ marginTop: "0.75rem" }}>{c.calloutAddressV2}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        impl: <code>0x675f70646713D4026612c673E644C61ae3aa7725</code>{" "}
        <a href="https://sepolia.etherscan.io/address/0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>
      <div className="callout callout-info" style={{ marginTop: "0.5rem" }}>{c.calloutV2Note}</div>

      <div className="callout callout-warning" style={{ marginTop: "0.75rem" }}>{c.calloutAddressV1}</div>
      <pre style={{ marginTop: "0.5rem" }}><code>0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A</code></pre>
      <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-fg))", marginTop: "0.25rem" }}>
        <a href="https://sepolia.etherscan.io/address/0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A#code" target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </p>

    </div>
  );
}
