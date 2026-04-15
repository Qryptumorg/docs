import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

const FACTORY_V6_SEPOLIA = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const FACTORY_V6_MAINNET = ""; // pending

export default function QuickStart() {
  const { lang, t } = useLanguage();
  const c = developerContent[lang].quickStart;

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

      <h2>{c.h2Prerequisites}</h2>
      <ul>
        {c.prerequisites.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{c.h2Install}</h2>
      <pre><code>{`npm install ethers`}</code></pre>

      <h2>{c.h2Addresses}</h2>
      <table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Chain ID</th>
            <th>V6 Factory Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sepolia (testnet)</td>
            <td>11155111</td>
            <td>
              <code style={{ fontSize: "0.8rem" }}>{FACTORY_V6_SEPOLIA}</code>{" "}
              <a href={`https://sepolia.etherscan.io/address/${FACTORY_V6_SEPOLIA}#code`} target="_blank" rel="noopener noreferrer">↗</a>
            </td>
          </tr>
          <tr>
            <td>Mainnet</td>
            <td>1</td>
            <td>
              <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>{c.h2Connect}</h2>
      <pre><code>{`import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Sepolia testnet (chain ID 11155111)
const FACTORY_SEPOLIA = "${FACTORY_V6_SEPOLIA}";
// Mainnet (pending — not yet deployed)
// const FACTORY_MAINNET = "pending";

const FACTORY_ABI = [
  "function createQryptSafe(bytes32 initialChainHead) returns (address vault)",
  "function hasQryptSafe(address wallet) view returns (bool)",
  "function getQryptSafe(address wallet) view returns (address)",
];

const factory = new ethers.Contract(FACTORY_SEPOLIA, FACTORY_ABI, signer);`}</code></pre>

      <h2>{c.h2CheckVault}</h2>
      <pre><code>{`const userAddress = await signer.getAddress();
const hasSafe = await factory.hasQryptSafe(userAddress);

if (hasSafe) {
  const safeAddress = await factory.getQryptSafe(userAddress);
  console.log("QryptSafe:", safeAddress);
}`}</code></pre>

      <h2>{c.h2OtpChain}</h2>
      <p>{c.pOtpChain}</p>
      <pre><code>{`// V6 uses an OTP ratchet chain (not a static password hash).
// Derive the chain: apply keccak256 100 times to your seed.
// The LAST hash (H100) becomes the initialChainHead stored on-chain.
// Each operation passes the PREVIOUS hash (H99, H98, ...) as the proof.

const CHAIN_DEPTH = 100;

function deriveChainHead(seed: string): string {
  let hash = ethers.keccak256(ethers.toUtf8Bytes(seed));
  for (let i = 1; i < CHAIN_DEPTH; i++) {
    hash = ethers.keccak256(hash);
  }
  return hash; // This is H100 — pass to createQryptSafe()
}

// Keep the full chain in memory (or rebuild from seed before each tx).
function deriveChain(seed: string): string[] {
  const chain: string[] = [];
  chain[0] = ethers.keccak256(ethers.toUtf8Bytes(seed)); // H1
  for (let i = 1; i < CHAIN_DEPTH; i++) {
    chain[i] = ethers.keccak256(chain[i - 1]);
  }
  return chain; // chain[99] == H100 (initialChainHead)
}

// Usage:
const seed = "my-secure-seed-phrase"; // keep this secret and offline
const chain = deriveChain(seed);
const initialChainHead = chain[CHAIN_DEPTH - 1]; // H100

// For each transaction, consume from the end of the chain:
// First tx:  proof = chain[98]  (H99)
// Second tx: proof = chain[97]  (H98)
// ... each OTP link can only be used once`}</code></pre>

      <h2>{c.h2Create}</h2>
      <pre><code>{`// createQryptSafe takes the initialChainHead (H100).
// The vault stores H100. Each call advances the chain.
const tx = await factory.createQryptSafe(initialChainHead);
const receipt = await tx.wait();
// QryptSafeCreated event: receipt.logs[0]

const safeAddress = await factory.getQryptSafe(userAddress);
console.log("Vault deployed at:", safeAddress);`}</code></pre>

      <h2>{c.h2Shield}</h2>
      <pre><code>{`const VAULT_ABI = [
  "function qrypt(address tokenAddress, uint256 amount, bytes32 proof) external",
  "function unqrypt(address tokenAddress, uint256 amount, bytes32 proof) external",
];
const vault = new ethers.Contract(safeAddress, VAULT_ABI, signer);

const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Sepolia USDC
const USDC_ABI = ["function approve(address spender, uint256 amount) returns (bool)"];
const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);

const amount = ethers.parseUnits("10", 6); // 10 USDC (6 decimals)

// Step 1: approve vault to spend tokens (one-time per token)
await usdc.approve(safeAddress, amount);

// Step 2: qrypt — pass the current OTP link as proof
// Use chain[98] for the first call (H99), chain[97] for the second (H98), etc.
const otpProof = chain[CHAIN_DEPTH - 2]; // H99 for first call
await vault.qrypt(USDC_ADDRESS, amount, otpProof);

// Step 3: unqrypt (when you want tokens back)
const unqryptProof = chain[CHAIN_DEPTH - 3]; // H98
await vault.unqrypt(USDC_ADDRESS, amount, unqryptProof);`}</code></pre>
      <div className="callout callout-warning">{c.calloutProof}</div>

      <h2>{c.h2NextSteps}</h2>
      <ul>
        {c.nextSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
