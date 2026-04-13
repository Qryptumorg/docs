import { useLanguage } from "@/lib/LanguageContext";
import { testnetContent } from "@/lib/content/testnet";

function TestnetHero({ cta, ctaLink, badge }: { cta: string; ctaLink: string; badge: string }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "2.5rem",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0a0f1a 70%, #060d18 100%)",
      border: "1px solid #1e2a3a",
      minHeight: "220px",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} viewBox="0 0 800 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="tng1" cx="20%" cy="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tng2" cx="80%" cy="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="220" fill="url(#tng1)" />
        <rect width="800" height="220" fill="url(#tng2)" />
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1={i*114} y1="0" x2={i*114} y2="220" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="4,8" />
        ))}
        {[0,1,2,3].map(i => (
          <line key={i} x1="0" y1={i*73} x2="800" y2={i*73} stroke="#1e3a5f" strokeWidth="1" strokeDasharray="4,8" />
        ))}
        <circle cx="160" cy="110" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
        <circle cx="160" cy="110" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
        <circle cx="640" cy="110" r="50" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
        <circle cx="640" cy="110" r="30" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <polygon points="380,30 420,30 440,65 420,100 380,100 360,65" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
        <polygon points="390,45 410,45 425,65 410,85 390,85 375,65" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
        <text x="400" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="#60a5fa" opacity="0.5" fontFamily="monospace">ETH</text>
        <line x1="220" y1="110" x2="350" y2="80" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
        <line x1="450" y1="80" x2="580" y2="110" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
        <rect x="50" y="85" width="90" height="50" rx="6" fill="#0d1117" stroke="#1e3a5f" strokeWidth="1" opacity="0.8" />
        <text x="95" y="107" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace" opacity="0.9">0xWallet</text>
        <text x="95" y="122" textAnchor="middle" fontSize="7" fill="#4b5563" fontFamily="monospace">Private Key</text>
        <rect x="660" y="85" width="90" height="50" rx="6" fill="#0d1117" stroke="#1e3a5f" strokeWidth="1" opacity="0.8" />
        <text x="705" y="107" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity="0.9">QryptVault</text>
        <text x="705" y="122" textAnchor="middle" fontSize="7" fill="#4b5563" fontFamily="monospace">OTP locked</text>
      </svg>

      <div style={{ position: "relative", zIndex: 1, padding: "2rem 2.5rem" }}>
        <div style={{
          display: "inline-block",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#60a5fa",
          background: "rgba(59,130,246,0.12)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "4px",
          padding: "3px 10px",
          marginBottom: "1rem",
        }}>
          {badge}
        </div>
        <h2 style={{ color: "#f9fafb", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem", lineHeight: 1.3 }}>
          Sepolia Testnet
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem", margin: "0 0 1.5rem", maxWidth: "500px", lineHeight: 1.6 }}>
          Chain ID: 11155111 · Free ETH from faucets · No real assets · 67/67 E2E tests verified
        </p>
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            padding: "0.6rem 1.4rem",
            borderRadius: "6px",
            textDecoration: "none",
            border: "none",
          }}
        >
          {cta} →
        </a>
      </div>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
      color: "#fff",
      fontSize: "0.8rem",
      fontWeight: 700,
      marginRight: "0.6rem",
      flexShrink: 0,
      verticalAlign: "middle",
    }}>{n}</span>
  );
}

export default function JoinTestnet() {
  const { lang, t } = useLanguage();
  const c = testnetContent[lang].joinTestnet;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.developerDocs}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        {c.intro}
      </p>

      <TestnetHero cta={c.heroCta} ctaLink={c.heroCtaLink} badge={c.badge} />

      <div className="callout callout-info">{c.calloutSepolia}</div>

      <h2>{c.h2Prerequisites}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.prereqHeaders[0]}</th>
            <th>{c.prereqHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.prereqRows.map(([req, detail]) => (
            <tr key={req}>
              <td><strong>{req}</strong></td>
              <td>{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2><StepBadge n={1} />{c.h2AddNetwork.replace("Step 1 - ", "").replace("Шаг 1 - ", "").replace("步骤 1 - ", "")}</h2>
      <p>{c.pAddNetwork}</p>
      <table>
        <tbody>
          {c.networkRows.map(([key, val]) => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>{val}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2><StepBadge n={2} />{c.h2GetEth.replace("Step 2 - ", "").replace("Шаг 2 - ", "").replace("步骤 2 - ", "")}</h2>
      <p>{c.pGetEth}</p>
      <div className="callout callout-info">{c.calloutEthAmount}</div>
      <table>
        <thead>
          <tr>
            {c.faucetHeaders.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {c.faucetRows.map(([name, limit, url]) => (
            <tr key={name}>
              <td><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></td>
              <td>{limit}</td>
              <td><code style={{ fontSize: "0.8rem" }}>{url}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{c.pEthVerify}</p>

      <h2><StepBadge n={3} />{c.h2GetUsdc.replace("Step 3 - ", "").replace("Шаг 3 - ", "").replace("步骤 3 - ", "")}</h2>
      <p>{c.pGetUsdc}</p>
      <div className="callout callout-info"><code>0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238</code>{" - "}{c.calloutUsdcNote.replace("Sepolia USDC contract: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - ", "").replace("Контракт Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - ", "").replace("Sepolia USDC 合约：0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - ", "")}</div>
      <ol>
        {c.usdcSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <div className="callout callout-warning">{c.usdcAlt}</div>

      <h2><StepBadge n={4} />{c.h2OpenApp.replace("Step 4 - ", "").replace("Шаг 4 - ", "").replace("步骤 4 - ", "")}</h2>
      <p>{c.pOpenApp}</p>
      <ol>
        {c.openAppSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <div className="callout callout-warning">{c.calloutNetwork}</div>

      <h2><StepBadge n={5} />{c.h2CreateVault.replace("Step 5 - ", "").replace("Шаг 5 - ", "").replace("步骤 5 - ", "")}</h2>
      <p>{c.pCreateVault}</p>
      <ol>
        {c.createVaultSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <div className="callout callout-info">{c.calloutProofFormat}</div>
      <pre><code>{`// Proof format enforced on-chain
// Valid:   abc123   xyz789   qry001
// Invalid: ABC123   ab1234   abcdef   123abc`}</code></pre>
      <div className="callout callout-warning">{c.calloutProofWarning}</div>

      <h2><StepBadge n={6} />{c.h2ApproveQrypt.replace("Step 6 - ", "").replace("Шаг 6 - ", "").replace("步骤 6 - ", "")}</h2>
      <p>{c.pApproveQrypt}</p>
      <ol>
        {c.approveSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <pre><code>{`// What happens on-chain when you call Qrypt:
// 1. USDC.transferFrom(wallet, vault, amount)
// 2. qUSDC.mint(wallet, amount)
// Your wallet balance:  -10 USDC  +10 qUSDC
// Vault contract holds: +10 USDC`}</code></pre>
      <div className="callout callout-info">{c.calloutQToken}</div>

      <h2><StepBadge n={7} />{c.h2Transfer.replace("Step 7 - ", "").replace("Шаг 7 - ", "").replace("步骤 7 - ", "")}</h2>
      <p>{c.pTransfer}</p>
      <ol>
        {c.transferSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <pre><code>{`// Commit-Reveal pattern:
//
// initTransfer(token, amount, keccak256(proof))
//   -> stores hash on-chain, emits InitData event
//
// finalizeTransfer(token, amount, rawProof)
//   -> verifies hash, burns qToken, transfers ERC-20 to recipient
//   -> advances proofChainHead (OTP consumed)`}</code></pre>
      <div className="callout callout-info">{c.calloutCommitReveal}</div>

      <h2><StepBadge n={8} />{c.h2Unqrypt.replace("Step 8 - ", "").replace("Шаг 8 - ", "").replace("步骤 8 - ", "")}</h2>
      <p>{c.pUnqrypt}</p>
      <ol>
        {c.unqryptSteps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      <pre><code>{`// unQrypt on-chain flow:
// 1. Verify OTP proof against proofChainHead
// 2. qUSDC.burn(wallet, amount)
// 3. USDC.transfer(wallet, amount)
// 4. proofChainHead advances to next OTP`}</code></pre>

      <h2>{c.h2Monitor}</h2>
      <p>{c.pMonitor}</p>
      <table>
        <tbody>
          {c.monitorLinks.map(([label, url]) => (
            <tr key={label}>
              <td>{label}</td>
              <td><a href={url} target="_blank" rel="noopener noreferrer"><code style={{ fontSize: "0.8rem" }}>{url.replace("https://sepolia.etherscan.io/address/", "").replace("#code", "")}</code></a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Troubleshoot}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.troubleshootHeaders[0]}</th>
            <th>{c.troubleshootHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.troubleshootRows.map(([issue, fix]) => (
            <tr key={issue}>
              <td>{issue}</td>
              <td>{fix}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Contracts}</h2>
      <p>{c.pContracts}</p>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Address</th>
            <th>Etherscan</th>
          </tr>
        </thead>
        <tbody>
          {c.contractRows.map(([name, addr, url]) => (
            <tr key={name}>
              <td>{name}</td>
              <td><code style={{ fontSize: "0.8rem" }}>{addr}</code></td>
              <td><a href={url} target="_blank" rel="noopener noreferrer">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
