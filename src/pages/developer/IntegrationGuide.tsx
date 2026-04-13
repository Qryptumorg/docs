import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

export default function IntegrationGuide() {
  const { lang, t } = useLanguage();
  const c = developerContent[lang].integrationGuide;

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

      <h2>{c.h2ProofHashing}</h2>
      <p>{c.pProofHashing}</p>
      <pre><code>{`import { ethers } from "ethers";

// Compute the commitment hash from the user's vault proof
function computeCommitHash(
  token: string,
  to: string,
  amount: bigint,
  proof: string,
  nonce: bigint
): string {
  return ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "address", "uint256", "string", "uint256"],
      [token, to, amount, proof, nonce]
    )
  );
}`}</code></pre>

      <h2>{c.h2ProofFormat}</h2>
      <p>{c.pProofFormat}</p>
      <pre><code>{`// Validation regex: 3 lowercase letters followed by 3 digits
const PROOF_REGEX = /^[a-z]{3}[0-9]{3}$/;

function isValidProof(proof: string): boolean {
  return PROOF_REGEX.test(proof);
}

// Examples:
// isValidProof("abc123") => true
// isValidProof("ABC123") => false (uppercase)
// isValidProof("abc12")  => false (5 chars)
// isValidProof("abc1234")=> false (7 chars)`}</code></pre>

      <h2>{c.h2VaultStatus}</h2>
      <pre><code>{`// Get Qrypt-Safe status for a user
const FACTORY_ABI = [
  "function hasQryptSafe(address) view returns (bool)",
  "function getQryptSafe(address) view returns (address)",
];
const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);

const hasSafe = await factory.hasQryptSafe(userAddress);
const safeAddress = hasSafe ? await factory.getQryptSafe(userAddress) : null;`}</code></pre>

      <h2>{c.h2ShieldedBalances}</h2>
      <pre><code>{`const QTOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// qToken address stored per token per vault
// Use QryptSafeCreated and TokenQrypted events to discover qToken addresses
const qToken = new ethers.Contract(qTokenAddress, QTOKEN_ABI, provider);
const balance = await qToken.balanceOf(userAddress);
const decimals = await qToken.decimals();
const formatted = ethers.formatUnits(balance, decimals);`}</code></pre>

      <h2>{c.h2NetworkConfig}</h2>
      <pre><code>{`const NETWORK_CONFIG = {
  1: {
    name: "Ethereum Mainnet",
    factoryAddress: null, // Pending deployment
  },
  11155111: {
    name: "Sepolia Testnet (V6 active)",
    factoryAddress: "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
  },
  31337: {
    name: "Hardhat Local",
    factoryAddress: process.env.NEXT_PUBLIC_LOCAL_FACTORY,
  },
} as const;`}</code></pre>

      <h2>{c.h2RecordTx}</h2>
      <p>{c.pRecordTx}</p>
      <pre><code>{`// After a successful Qrypt tx:
await fetch("/api/transactions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    wallet: userAddress,
    txHash: receipt.hash,
    type: "Qrypt",
    tokenSymbol: "USDC",
    amount: "10.0",
    chainId: 11155111,
  }),
});`}</code></pre>

      <h2>{c.h2EnvVars}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.envHeaders[0]}</th>
            <th>{c.envHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.envRows.map(([key, desc]) => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
