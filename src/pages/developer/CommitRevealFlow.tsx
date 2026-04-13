import CommitRevealDiagram from "@/components/diagrams/CommitRevealDiagram";
import { useLanguage } from "@/lib/LanguageContext";
import { developerContent } from "@/lib/content/developer";

export default function CommitRevealFlow() {
  const { lang, t } = useLanguage();
  const c = developerContent[lang].commitReveal;

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

      <CommitRevealDiagram />

      <h2>{c.h2WhyTwo}</h2>
      <p>{c.pWhyTwo1}</p>
      <p>{c.pWhyTwo2}</p>

      <h2>{c.h2Implementation}</h2>

      <h3>{c.h3Step1}</h3>
      <pre><code>{`import { ethers } from "ethers";

// Generate a random nonce
const nonce = BigInt(Math.floor(Math.random() * 1e15));

// Compute the commitment hash (same logic as the contract)
const commitHash = ethers.keccak256(
  ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address", "uint256", "string", "uint256"],
    [tokenAddress, recipientAddress, amount, vaultProof, nonce]
  )
);`}</code></pre>

      <h3>{c.h3Step2}</h3>
      <pre><code>{`// Submit the commitment (no vault proof in this transaction)
const VAULT_ABI = [
  "function initTransfer(bytes32 commitHash) external",
];
const vault = new ethers.Contract(safeAddress, VAULT_ABI, signer);

const commitTx = await vault.initTransfer(commitHash);
await commitTx.wait();
// commitHash is now stored in the contract with a 600-second expiry`}</code></pre>

      <h3>{c.h3Step3}</h3>
      <pre><code>{`// Wait for commit transaction to be mined
// The vault proof is safe to include now since it's not in the mempool
const FINALIZE_ABI = [
  "function finalizeTransfer(address token, address to, uint256 amount, string calldata password, uint256 nonce) external",
];
const vaultWithFinalize = new ethers.Contract(safeAddress, FINALIZE_ABI, signer);

const finalizeTx = await vaultWithFinalize.finalizeTransfer(
  tokenAddress,
  recipientAddress,
  amount,
  vaultProof,
  nonce
);
await finalizeTx.wait();`}</code></pre>

      <h3>{c.h3Step4}</h3>
      <pre><code>{`// On-chain verification (PersonalQryptSafeV6.sol):
// 1. Recompute hash from calldata params
bytes32 expectedHash = keccak256(abi.encode(token, to, amount, password, nonce));

// 2. Match against stored commit
require(commits[expectedHash].timestamp > 0, "No such commit");
require(!commits[expectedHash].used, "Commit already used");
require(block.timestamp <= commits[expectedHash].timestamp + 600, "Commit expired");
require(keccak256(abi.encodePacked(password)) == passwordHash, "Invalid vault proof");

// 3. Mark used and transfer
commits[expectedHash].used = true;
// burn qToken from owner, transfer underlying ERC-20 to recipient`}</code></pre>

      <h2>{c.h2Constraints}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.constraintHeaders[0]}</th>
            <th>{c.constraintHeaders[1]}</th>
            <th>{c.constraintHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.constraintRows.map(([constraint, value, reason]) => (
            <tr key={constraint}>
              <td>{constraint}</td>
              <td><code>{value}</code></td>
              <td>{reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Recipient}</h2>
      <p>{c.pRecipient}</p>
    </div>
  );
}
