export default function PostQuantum() {
  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Security
        </span>
      </div>
      <h1>Post-Quantum Design</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        Qryptum's vault proof layer is built on keccak256, a hash function from the SHA-3 family that retains 128-bit security under quantum attacks. The protocol's dual-factor model was designed with the post-quantum era in mind: even if the base layer of Ethereum changes, the vault proof hash remains computationally irreversible.
      </p>

      <h2>Why Quantum Computing Matters for Crypto</h2>
      <p>
        Quantum computers threaten asymmetric cryptography: RSA, Diffie-Hellman, and ECDSA (the signature scheme Ethereum uses today) all rely on mathematical problems that a sufficiently powerful quantum computer could solve exponentially faster than classical machines using Shor's algorithm.
      </p>
      <p>
        Hash functions face a different, weaker threat. Grover's algorithm gives a quantum computer a quadratic speedup against hash brute-force, but it does not break hash functions. A 256-bit hash remains secure at 128 bits against quantum adversaries, which meets NIST's minimum post-quantum security threshold.
      </p>

      <table>
        <thead>
          <tr>
            <th>Algorithm Type</th>
            <th>Used In</th>
            <th>Classical Security</th>
            <th>Quantum Security (Grover/Shor)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ECDSA (secp256k1)</td>
            <td>Ethereum wallet signatures</td>
            <td>~128 bit</td>
            <td style={{ color: "#dc2626", fontWeight: 600 }}>Broken by Shor's algorithm</td>
          </tr>
          <tr>
            <td>keccak256 (SHA-3)</td>
            <td>Vault proof hash storage</td>
            <td>256 bit</td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>128 bit (Grover: quadratic only)</td>
          </tr>
          <tr>
            <td>keccak256 (SHA-3)</td>
            <td>Commit hash in transfers</td>
            <td>256 bit</td>
            <td style={{ color: "#16a34a", fontWeight: 600 }}>128 bit (Grover: quadratic only)</td>
          </tr>
        </tbody>
      </table>

      <h2>How keccak256 Protects the Vault Proof</h2>
      <p>
        When a QRYPTANK is created, the vault proof is never stored in plaintext. The contract stores only its keccak256 hash:
      </p>
      <pre><code>{`// On-chain storage (PersonalVault.sol)
bytes32 private passwordHash;  // keccak256(abi.encodePacked("abc123"))

// Verification on every vault operation
require(
    keccak256(abi.encodePacked(password)) == passwordHash,
    "Invalid vault proof"
);`}</code></pre>
      <p>
        To recover the raw vault proof from the stored hash, an attacker must invert keccak256. This is a preimage attack. For a 256-bit hash, the classical complexity is 2<sup>256</sup> operations. Under Grover's algorithm, that is reduced to 2<sup>128</sup> operations, which remains beyond the capacity of any foreseeable quantum computer. By comparison, 128-bit quantum security is the threshold adopted by NIST's post-quantum cryptography standards.
      </p>

      <div className="callout callout-info">
        <strong>keccak256 and NIST:</strong> SHA-3 (the standard that keccak256 is based on) was selected by NIST after a 7-year public competition specifically designed to identify algorithms resistant to both classical and quantum attacks. It is one of the most thoroughly analyzed hash functions in existence.
      </div>

      <h2>Vault Proof Bruteforce Resistance</h2>
      <p>
        Even without quantum computing, bruteforce attacks on the vault proof face two independent barriers: an access barrier and an economic barrier.
      </p>

      <h3>Barrier 1: Private Key Required (Access)</h3>
      <p>
        Every vault function has an <code>onlyOwner</code> modifier. An attacker who does not hold the user's Ethereum private key receives exactly zero attempts at the vault proof. The <code>msg.sender</code> check is enforced by the EVM itself before any vault logic executes.
      </p>
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
      <p>
        This means bruteforce of the vault proof is only relevant in the scenario where the private key has already been compromised. That scenario is precisely where qToken non-transferability provides the primary protection.
      </p>

      <h3>Barrier 2: Economic Deterrence (Cost)</h3>
      <p>
        Every failed vault call is an on-chain transaction that consumes gas. Unlike a typical password attack against a database or API, there is no free attempt. Each guess costs real ETH.
      </p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vault proof keyspace (3 lowercase letters + 3 digits)</td>
            <td>26<sup>3</sup> × 10<sup>3</sup> = <strong>17,576,000</strong> combinations</td>
          </tr>
          <tr>
            <td>Gas per failed vault call (reverted)</td>
            <td>~40,000 gas</td>
          </tr>
          <tr>
            <td>Cost per attempt (at 0.5 gwei, ETH = $3,000)</td>
            <td>~<strong>$0.06</strong> per attempt</td>
          </tr>
          <tr>
            <td>Cost to exhaust full keyspace</td>
            <td>17,576,000 × $0.06 = <strong>~$1.05 million</strong></td>
          </tr>
          <tr>
            <td>Cost at peak gas (2 gwei, ETH = $3,000)</td>
            <td>~<strong>$4.2 million</strong></td>
          </tr>
          <tr>
            <td>Expected attempts before finding correct proof (random)</td>
            <td>~8,788,000 (half the keyspace)</td>
          </tr>
          <tr>
            <td>Expected cost to find proof (at 0.5 gwei)</td>
            <td>~<strong>$528,000</strong></td>
          </tr>
        </tbody>
      </table>

      <p>
        Exhaustive search of the vault proof keyspace costs over $1 million in gas fees at current Ethereum prices (0.5 gwei). At peak congestion (2 gwei), this rises to ~$4.2 million. This cost scales with ETH price and network demand, meaning the more valuable the assets inside a QRYPTANK, the more expensive on-chain attempts tend to become, preserving the economic deterrent.
      </p>

      <div className="callout callout-info">
        <strong>Comparison:</strong> A typical web application bruteforce might cost milliseconds per attempt and faces only rate limiting. A Qryptum vault bruteforce faces two layers: a mandatory private key (the primary barrier) and ~$0.06 per failed on-chain transaction at current gas prices (the secondary barrier). Both must be defeated simultaneously.
      </div>

      <h3>Barrier 3: No Batch Execution</h3>
      <p>
        Smart contract calls cannot be parallelized across blocks. Each attempt must be included in a block and confirmed before the next is valid. At 12-second average Ethereum block times, even a well-funded attacker is limited to a few thousand attempts per day before fees accumulate to prohibitive levels.
      </p>

      <h2>Dual-Factor in a Post-Quantum Future</h2>
      <p>
        If quantum computers eventually break ECDSA (the algorithm Ethereum uses for wallet signatures), the consequences for standard ERC-20 token holders would be severe: an attacker could forge signatures and drain wallets. For Qryptum users holding qTokens, the impact is different:
      </p>

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
            <td>ECDSA broken by quantum computer</td>
            <td style={{ color: "#dc2626" }}>Private key forged, all tokens drained</td>
            <td>qToken transfer still reverts (no ERC-20 transfer possible)</td>
          </tr>
          <tr>
            <td>Attacker forges private key signature</td>
            <td style={{ color: "#dc2626" }}>Full token access</td>
            <td>Vault proof hash (keccak256) still blocks vault access</td>
          </tr>
          <tr>
            <td>Vault proof hash broken by quantum</td>
            <td>N/A</td>
            <td>128-bit quantum security; not feasible with foreseeable hardware</td>
          </tr>
        </tbody>
      </table>

      <p>
        In a post-quantum world where ECDSA signatures are breakable, Qryptum's vault proof hash (keccak256) becomes the last line of defense. Unlike ECDSA, keccak256 does not rely on elliptic curve discrete logarithm problems. It is a one-way function that remains computationally hard even against quantum adversaries.
      </p>

      <h2>Honest Scope of Protection</h2>
      <p>
        Qryptum does not claim to make Ethereum quantum-safe at the base layer. The following limitations apply:
      </p>
      <ul>
        <li><strong>Ethereum wallet signatures (ECDSA):</strong> Not quantum-resistant. This is a base-layer Ethereum concern, not specific to Qryptum. The Ethereum community is actively researching post-quantum signature schemes for future protocol upgrades.</li>
        <li><strong>Vault proof string in calldata:</strong> The raw vault proof appears in transaction calldata during <code>shield()</code>, <code>unshield()</code>, and <code>revealTransfer()</code>. If an attacker can read historical calldata and already knows the private key, they learn the vault proof. The vault proof can be rotated via <code>changeVaultProof()</code> after any suspected exposure.</li>
        <li><strong>Hash-to-proof inversion:</strong> The stored hash cannot be used to derive the vault proof. However, the raw proof in calldata is observable on-chain.</li>
      </ul>
      <p>
        The post-quantum resilience of Qryptum is specifically in the vault proof hash storage and the commit-reveal transfer hash. These use keccak256 and provide meaningful defense even in scenarios where ECDSA is compromised.
      </p>
    </div>
  );
}
