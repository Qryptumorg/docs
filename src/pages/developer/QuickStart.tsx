import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

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

      <h2>{c.h2Connect}</h2>
      <pre><code>{`import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const FACTORY_ADDRESS = "0xeaa722e996888b662E71aBf63d08729c6B6802F4"; // V6 Sepolia
const FACTORY_ABI = [
  "function hasQryptSafe(address) view returns (bool)",
  "function getQryptSafe(address) view returns (address)",
  "function createQryptSafe(bytes32 initialChainHead) returns (address)",
];

const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);`}</code></pre>

      <h2>{c.h2CheckVault}</h2>
      <pre><code>{`const userAddress = await signer.getAddress();
const hasSafe = await factory.hasQryptSafe(userAddress);

if (hasSafe) {
  const safeAddress = await factory.getQryptSafe(userAddress);
  console.log("Qrypt-Safe:", safeAddress);
}`}</code></pre>

      <h2>{c.h2Create}</h2>
      <pre><code>{`const rawProof = "abc123"; // 3 lowercase letters + 3 digits
// Hash the proof off-chain: the raw proof never touches the chain
const initialChainHead = ethers.keccak256(ethers.toUtf8Bytes(rawProof));

const tx = await factory.createQryptSafe(initialChainHead);
const receipt = await tx.wait();
// QryptSafeCreated event: receipt.logs[0]`}</code></pre>

      <h2>{c.h2Shield}</h2>
      <pre><code>{`const VAULT_ABI = [
  "function Qrypt(address token, uint256 amount, bytes32 proofHash) external",
];
const vault = new ethers.Contract(safeAddress, VAULT_ABI, signer);

const USDC_ADDRESS = "0x..."; // token contract address
const USDC_ABI = ["function approve(address spender, uint256 amount) returns (bool)"];
const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);

// Step 1: approve vault to spend tokens
const amount = ethers.parseUnits("10", 6); // 10 USDC (6 decimals)
await usdc.approve(safeAddress, amount);

// Step 2: Qrypt (pass the hash, not the raw proof)
await vault.Qrypt(USDC_ADDRESS, amount, proofHash);`}</code></pre>
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
