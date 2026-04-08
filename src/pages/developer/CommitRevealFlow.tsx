import CommitRevealDiagram from "@/components/diagrams/CommitRevealDiagram";

export default function CommitRevealFlow() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Developer Docs
        </span>
      </div>
      <h1>Commit-Reveal Flow</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Transfers in Qryptum use a two-step commit-reveal scheme. The commit step records a hash on-chain without revealing the vault proof. The reveal step verifies the hash and executes the transfer.
      </p>

      <CommitRevealDiagram />

      <h2>Why Two Steps</h2>
      <p>
        A single-step transfer would expose the vault proof in the mempool before the transaction is included in a block. A malicious miner could observe the proof and attempt to front-run the transaction. The commit-reveal scheme solves this: the commit step submits only a hash (no proof), and the reveal step is valid only after the commit is included in a block.
      </p>
      <p>
        Additionally, each commit hash includes a unique random nonce, making replay attacks impossible even if the same transfer parameters are used again.
      </p>

      <h2>Step-by-Step Implementation (viem)</h2>

      <h3>Step 1: Build the Commit Hash</h3>
      <pre><code>{`import { keccak256, encodePacked } from 'viem';

const nonce = BigInt(Math.floor(Math.random() * 1e15));

const commitHash = keccak256(
  encodePacked(
    ['string', 'uint256', 'address', 'address', 'uint256'],
    [vaultProof, nonce, tokenAddress, recipientAddress, amount]
  )
);`}</code></pre>

      <h3>Step 2: Submit the Commit</h3>
      <pre><code>{`const commitTxHash = await walletClient.writeContract({
  address: vaultAddress,
  abi: VAULT_ABI,
  functionName: 'commitTransfer',
  args: [commitHash],
});

const commitReceipt = await publicClient.waitForTransactionReceipt({
  hash: commitTxHash,
});

console.log('Commit confirmed at block:', commitReceipt.blockNumber);`}</code></pre>

      <h3>Step 3: Wait for the Next Block</h3>
      <pre><code>{`// The reveal must happen in a different block from the commit.
// Poll until the current block is at least commitBlock + 1.
const commitBlock = commitReceipt.blockNumber;

async function waitForNextBlock() {
  while (true) {
    const current = await publicClient.getBlockNumber();
    if (current > commitBlock) break;
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
}`}</code></pre>

      <h3>Step 4: Execute the Reveal</h3>
      <pre><code>{`const revealTxHash = await walletClient.writeContract({
  address: vaultAddress,
  abi: VAULT_ABI,
  functionName: 'revealTransfer',
  args: [tokenAddress, recipientAddress, amount, vaultProof, nonce],
});

const revealReceipt = await publicClient.waitForTransactionReceipt({
  hash: revealTxHash,
});

console.log('Transfer complete. Tx:', revealReceipt.transactionHash);`}</code></pre>

      <h2>Constraints</h2>
      <table>
        <thead>
          <tr>
            <th>Constraint</th>
            <th>Value</th>
            <th>Enforced By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimum block gap</td>
            <td>1 block</td>
            <td>Contract checks <code>block.number &gt; commit.blockNumber</code></td>
          </tr>
          <tr>
            <td>Commit expiry</td>
            <td>600 seconds (10 minutes)</td>
            <td>Contract checks <code>block.timestamp - commit.timestamp &lt;= 600</code></td>
          </tr>
          <tr>
            <td>Replay prevention</td>
            <td>Each commit hash can be used once</td>
            <td><code>commit.used == true</code> reverts on reuse</td>
          </tr>
          <tr>
            <td>Self-transfer</td>
            <td>Blocked</td>
            <td><code>require(to != msg.sender)</code></td>
          </tr>
        </tbody>
      </table>

      <h2>What the Recipient Receives</h2>
      <p>
        The recipient always receives the raw ERC-20 token (for example, USDC), never the qToken. The qToken is burned during <code>revealTransfer()</code>. The recipient wallet does not need to be a Qryptum user. They can use the received tokens freely or choose to shield them into their own QRYPTANK.
      </p>
    </div>
  );
}
