import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

export default function ApiReference() {
  const { lang, t } = useLanguage();
  const c = developerContent[lang].apiReference;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.developerDocs}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <div className="callout callout-info">{c.calloutBaseUrl}</div>

      <h2>{c.h2Health}</h2>

      <h3>{c.h3Healthz}</h3>
      <pre><code>{`GET /healthz`}</code></pre>
      <p>{c.pHealthz}</p>
      <pre><code>{`{ "status": "ok" }`}</code></pre>

      <h3>{c.h3Health}</h3>
      <pre><code>{`GET /api/health`}</code></pre>
      <p>{c.pHealth}</p>
      <pre><code>{`{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "uptime": 3600
}`}</code></pre>

      <h2>{c.h2Vaults}</h2>

      <h3>{c.h3PostVaults}</h3>
      <pre><code>{`POST /api/vaults
Content-Type: application/json

{
  "wallet": "0x...",
  "vaultAddress": "0x...",
  "chainId": 11155111
}`}</code></pre>
      <p>{c.pPostVaults}</p>

      <h3>{c.h3GetVault}</h3>
      <pre><code>{`GET /api/vaults/:walletAddress?chainId=11155111

Response:
{
  "wallet": "0x...",
  "vaultAddress": "0x...",
  "chainId": 11155111,
  "createdAt": "2024-01-15T12:00:00.000Z"
}`}</code></pre>
      <p>{c.pGetVault}</p>

      <h3>{c.h3VerifyVault}</h3>
      <pre><code>{`GET /api/vaults/:walletAddress/verify?chainId=11155111

Response:
{
  "valid": true,
  "onChain": true,
  "dbRecord": true
}`}</code></pre>
      <p>{c.pVerifyVault}</p>

      <h2>{c.h2Transactions}</h2>

      <h3>{c.h3PostTx}</h3>
      <pre><code>{`POST /api/transactions
Content-Type: application/json

{
  "wallet": "0x...",
  "txHash": "0x...",
  "type": "shield",
  "tokenSymbol": "USDC",
  "amount": "10.0",
  "chainId": 11155111
}`}</code></pre>
      <p>{c.pPostTx}</p>

      <h3>{c.h3GetTx}</h3>
      <pre><code>{`GET /api/transactions/:walletAddress?chainId=11155111

Response:
[
  {
    "txHash": "0x...",
    "type": "shield",
    "tokenSymbol": "USDC",
    "amount": "10.0",
    "timestamp": "2024-01-15T12:00:00.000Z"
  }
]`}</code></pre>
      <p>{c.pGetTx}</p>

      <h2>{c.h2Errors}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.errorHeaders[0]}</th>
            <th>{c.errorHeaders[1]}</th>
            <th>{c.errorHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.errorRows.map(([code, meaning, example]) => (
            <tr key={code}>
              <td><code>{code}</code></td>
              <td>{meaning}</td>
              <td><code>{example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
