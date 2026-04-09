export default function WhyQryptum() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Introduction
        </span>
      </div>
      <h1>Why Qryptum</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        ERC-20 tokens on Ethereum carry a fundamental risk: anyone with your private key can transfer every token you own. Qryptum eliminates this exposure without introducing a custodian.
      </p>

      <h2>The Problem</h2>
      <p>
        Private key exposure is the single largest cause of crypto loss. Phishing, malware, compromised seed phrases, social engineering: the result is always the same. Once an attacker has the private key, they drain every token in the wallet within seconds.
      </p>
      <p>
        Existing solutions require trusting a third party: custodial exchanges, multisig services, or hardware wallet manufacturers. Qryptum requires trusting no one except the code.
      </p>

      <h2>The Qryptum Solution</h2>
      <p>
        Qryptum adds a second mandatory factor to every token movement: a vault proof. The vault proof is a 6-character string (3 letters and 3 numbers, for example <code>abc123</code>) that is verified entirely on-chain by the smart contract. No server ever sees it.
      </p>
      <p>
        When a user shields tokens into their Qrypt-Safe, those tokens move to a smart contract address with no private key. The real ERC-20 tokens sit at that vault address. In their place, the user holds qTokens (such as qUSDC or qETH) in their wallet. These qTokens are receipts: they prove ownership but cannot be moved by any wallet, exchange, or script.
      </p>

      <h2>How This Compares</h2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Standard ERC-20</th>
            <th>Qryptum qToken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Private key leaked</td>
            <td>All tokens drained instantly</td>
            <td>Attacker cannot move qTokens (revert)</td>
          </tr>
          <tr>
            <td>Phishing site approval</td>
            <td>Token approval drained</td>
            <td><code>approve()</code> always reverts</td>
          </tr>
          <tr>
            <td>Malicious contract call</td>
            <td><code>transferFrom()</code> drains balance</td>
            <td><code>transferFrom()</code> always reverts</td>
          </tr>
          <tr>
            <td>Exchange hack</td>
            <td>Tokens exposed if deposited</td>
            <td>qTokens cannot be deposited to any exchange</td>
          </tr>
          <tr>
            <td>Custodial risk</td>
            <td>Full exposure if custodian is compromised</td>
            <td>No custodian. Vault is a permissionless smart contract.</td>
          </tr>
        </tbody>
      </table>

      <h2>What Qryptum Is Not</h2>
      <ul>
        <li>Not a mixer or privacy tool. All transactions are fully visible on Etherscan.</li>
        <li>Not a custodian. Qryptum never holds or controls user funds at any point.</li>
        <li>Not a multisig wallet. No co-signers or recovery parties.</li>
        <li>Not a wrapped token bridge. Tokens stay on Ethereum L1.</li>
      </ul>

      <div className="callout callout-info">
        <strong>Key insight:</strong> Knowing the vault proof alone is useless without the private key. Knowing the private key alone is useless because qToken transfers always revert. An attacker needs both simultaneously, and the vault proof is never stored by any server.
      </div>
    </div>
  );
}
