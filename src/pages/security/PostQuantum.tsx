import QuantumBruteForceChart from "@/components/diagrams/QuantumBruteForceChart";
import { useLanguage } from "@/lib/LanguageContext";
import { securityContent } from "@/lib/content/security";

export default function PostQuantum() {
  const { lang, t } = useLanguage();
  const c = securityContent[lang].postQuantum;

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

      <QuantumBruteForceChart />

      <h2>{c.h2WhyMatters}</h2>
      <p>{c.pEcdsa}</p>
      <p>{c.pHash}</p>

      <table>
        <thead>
          <tr>
            <th>{c.algoHeaders[0]}</th>
            <th>{c.algoHeaders[1]}</th>
            <th>{c.algoHeaders[2]}</th>
            <th>{c.algoHeaders[3]}</th>
          </tr>
        </thead>
        <tbody>
          {c.algoRows.map(([type, usedIn, classical, quantum], i) => (
            <tr key={i}>
              <td>{type}</td>
              <td>{usedIn}</td>
              <td>{classical}</td>
              <td style={{ color: i === 0 ? "#dc2626" : "#16a34a", fontWeight: 600 }}>{quantum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2HowProtects}</h2>
      <p>{c.pHowProtects}</p>
      <pre><code>{`// On-chain storage (PersonalVault.sol)
bytes32 private passwordHash;  // keccak256(abi.encodePacked("abc123"))

// Verification on every vault operation
require(
    keccak256(abi.encodePacked(password)) == passwordHash,
    "Invalid vault proof"
);`}</code></pre>
      <p>{c.pPreimage}</p>

      <div className="callout callout-info">
        {c.calloutNist}
      </div>

      <h2>{c.h2BruteForce}</h2>
      <p>{c.pBruteForce}</p>

      <h3>{c.h3Barrier1}</h3>
      <p>{c.pBarrier1}</p>
      <pre><code>{`modifier onlyOwner() {
    require(msg.sender == owner, "Not vault owner");
    _;
}

// All vault functions use this modifier:
function shield(address token, uint256 amount, string calldata password)
    external onlyOwner nonReentrant { ... }

function revealTransfer(address token, address to, uint256 amount,
    string calldata password, uint256 nonce)
    external onlyOwner nonReentrant { ... }`}</code></pre>

      <h3>{c.h3Barrier2}</h3>
      <p>{c.pBarrier2}</p>

      <table>
        <thead>
          <tr>
            <th>{c.bruteForceHeaders[0]}</th>
            <th>{c.bruteForceHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.bruteForceRows.map(([param, value]) => (
            <tr key={param}>
              <td>{param}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>{c.pBruteForceConclusion}</p>

      <div className="callout callout-info">
        {c.calloutComparison}
      </div>

      <h3>{c.h3Barrier3}</h3>
      <p>{c.pBarrier3}</p>

      <h2>{c.h2PostQuantumFuture}</h2>
      <p>{c.pPostQuantumFuture}</p>

      <table>
        <thead>
          <tr>
            <th>{c.futureHeaders[0]}</th>
            <th>{c.futureHeaders[1]}</th>
            <th>{c.futureHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.futureRows.map(([scenario, standard, qryptum], i) => (
            <tr key={i}>
              <td>{scenario}</td>
              <td style={{ color: "#dc2626" }}>{standard}</td>
              <td>{qryptum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>{c.pFutureConclusion}</p>

      <h2>{c.h2HonestScope}</h2>
      <p>{c.pHonestScope}</p>
      <ul>
        {c.honestItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{c.pHonestConclusion}</p>
    </div>
  );
}
