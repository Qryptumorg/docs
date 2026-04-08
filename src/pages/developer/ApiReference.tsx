export default function ApiReference() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Developer Docs
        </span>
      </div>
      <h1>API Reference</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        The Qryptum backend API is a read-write REST API for recording and retrieving vault registrations and transaction history. It never receives vault proofs or private keys.
      </p>

      <div className="callout callout-info">
        <strong>Base URL:</strong> <code>/api</code>
      </div>

      <h2>Health</h2>

      <h3>GET /api/healthz</h3>
      <p>Basic health check. Returns immediately without a database call.</p>
      <pre><code>{`// Response
{ "status": "ok" }`}</code></pre>

      <h3>GET /api/health</h3>
      <p>Full health check. Executes a <code>SELECT 1</code> against the database.</p>
      <pre><code>{`// Response
{ "status": "ok", "db": "connected" }`}</code></pre>

      <h2>Vaults</h2>

      <h3>POST /api/vaults</h3>
      <p>Register a vault record after the user's <code>createVault()</code> transaction is confirmed on-chain.</p>
      <pre><code>{`// Request body
{
  "walletAddress": "0x...",
  "vaultContractAddress": "0x...",  // optional
  "networkId": 11155111
}

// Response 201 (created) or 200 (already registered)
{
  "id": 1,
  "walletAddress": "0x...",
  "vaultContractAddress": "0x...",
  "networkId": 11155111,
  "createdAt": "2026-04-08T00:00:00.000Z",
  "exists": true
}`}</code></pre>

      <h3>GET /api/vaults/:walletAddress</h3>
      <p>Retrieve vault registration for a wallet address.</p>
      <pre><code>{`// Response 200
{
  "id": 1,
  "walletAddress": "0x...",
  "vaultContractAddress": "0x...",
  "networkId": 11155111,
  "createdAt": "2026-04-08T00:00:00.000Z",
  "exists": true
}

// Response 404
{ "error": "Vault not found" }`}</code></pre>

      <h3>POST /api/vault/verify</h3>
      <p>Check if a vault record exists for a wallet address. Returns only a boolean, never returns vault proof data.</p>
      <pre><code>{`// Request body
{ "walletAddress": "0x..." }

// Response 200
{ "exists": true }`}</code></pre>

      <h2>Transactions</h2>

      <h3>POST /api/transactions</h3>
      <p>Record a confirmed on-chain transaction. Call this after <code>waitForTransactionReceipt()</code> returns a successful receipt.</p>
      <pre><code>{`// Request body
{
  "walletAddress": "0x...",
  "txHash": "0x...",
  "type": "shield",            // "shield" | "unshield" | "transfer"
  "tokenAddress": "0x...",
  "tokenSymbol": "USDC",
  "tokenName": "USD Coin",
  "amount": "2000000",         // in token base units (string)
  "fromAddress": "0x...",
  "toAddress": null,           // required for type: "transfer"
  "networkId": 11155111
}

// Response 201 (recorded) or 200 (already recorded, idempotent on txHash)
{ "id": 1, "walletAddress": "0x...", ... }`}</code></pre>

      <h3>GET /api/transactions/:walletAddress</h3>
      <p>Retrieve transaction history for a wallet. Returns the 50 most recent by default, sorted newest first.</p>
      <pre><code>{`// Query params: ?limit=50&offset=0

// Response 200
{
  "transactions": [
    {
      "id": 1,
      "walletAddress": "0x...",
      "txHash": "0x...",
      "type": "shield",
      "tokenAddress": "0x...",
      "tokenSymbol": "USDC",
      "tokenName": "USD Coin",
      "amount": "2000000",
      "fromAddress": "0x...",
      "toAddress": null,
      "networkId": 11155111,
      "createdAt": "2026-04-08T00:00:00.000Z"
    }
  ],
  "total": 1
}`}</code></pre>

      <h2>Error Responses</h2>
      <table>
        <thead>
          <tr><th>Status</th><th>Body</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td><code>400</code></td><td><code>{"{"} "error": "..." {"}"}</code></td><td>Validation error in request body</td></tr>
          <tr><td><code>404</code></td><td><code>{"{"} "error": "..." {"}"}</code></td><td>Record not found</td></tr>
          <tr><td><code>409</code></td><td><code>{"{"} "error": "..." {"}"}</code></td><td>Duplicate wallet address on vault creation</td></tr>
          <tr><td><code>500</code></td><td><code>{"{"} "error": "Internal error" {"}"}</code></td><td>Server or database error</td></tr>
        </tbody>
      </table>
    </div>
  );
}
