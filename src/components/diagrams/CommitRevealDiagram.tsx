export default function CommitRevealDiagram() {
  return (
    <div className="diagram-container">
      <svg viewBox="0 0 680 340" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>

        {/* Column headers */}
        <text x="100" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">User Browser</text>
        <text x="340" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">Ethereum Network</text>
        <text x="580" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">Recipient Wallet</text>

        {/* Vertical lanes */}
        <line x1="100" y1="30" x2="100" y2="330" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="340" y1="30" x2="340" y2="330" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="580" y1="30" x2="580" y2="330" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />

        {/* Step 1 */}
        <rect x="30" y="46" width="140" height="38" rx="5" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1" />
        <text x="100" y="62" textAnchor="middle" fontSize="9.5" fill="#374151" fontWeight="600">Step 1: Compute commit</text>
        <text x="100" y="76" textAnchor="middle" fontSize="8.5" fill="#6b7280">keccak256(proof + nonce + ...)</text>

        {/* Arrow step 1 to step 2 */}
        <line x1="100" y1="84" x2="100" y2="104" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />

        {/* Step 2 */}
        <rect x="30" y="104" width="140" height="28" rx="5" fill="#1a1a1a" stroke="#374151" strokeWidth="1" />
        <text x="100" y="122" textAnchor="middle" fontSize="9.5" fill="#d1d5db" fontWeight="600">TX: commitTransfer(hash)</text>

        {/* Arrow to network */}
        <line x1="170" y1="118" x2="270" y2="118" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />
        <text x="220" y="110" textAnchor="middle" fontSize="8.5" fill="#6b7280">broadcast</text>

        {/* Step 3: block confirmed */}
        <rect x="270" y="104" width="140" height="28" rx="5" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1" />
        <text x="340" y="118" textAnchor="middle" fontSize="9.5" fill="#374151">Block N confirmed</text>
        <text x="340" y="130" textAnchor="middle" fontSize="8.5" fill="#6b7280">commit stored on-chain</text>

        {/* Wait */}
        <line x1="340" y1="132" x2="340" y2="162" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3,3" />
        <rect x="270" y="162" width="140" height="24" rx="5" fill="#fef9c3" stroke="#fde68a" strokeWidth="1" />
        <text x="340" y="178" textAnchor="middle" fontSize="9.5" fill="#92400e">Wait 1 block (mandatory)</text>

        {/* Arrow back */}
        <line x1="340" y1="186" x2="340" y2="206" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />

        {/* Step 4: Reveal */}
        <rect x="30" y="206" width="140" height="38" rx="5" fill="#1a1a1a" stroke="#374151" strokeWidth="1" />
        <text x="100" y="222" textAnchor="middle" fontSize="9.5" fill="#d1d5db" fontWeight="600">TX: revealTransfer(</text>
        <text x="100" y="236" textAnchor="middle" fontSize="8.5" fill="#9ca3af">token, to, amount, proof, nonce)</text>

        {/* Arrow to network */}
        <line x1="170" y1="224" x2="270" y2="224" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />

        {/* Network processes */}
        <rect x="270" y="206" width="140" height="58" rx="5" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1" />
        <text x="340" y="224" textAnchor="middle" fontSize="9.5" fill="#374151" fontWeight="600">Contract verifies:</text>
        <text x="340" y="238" textAnchor="middle" fontSize="8.5" fill="#6b7280">1. commit hash matches</text>
        <text x="340" y="251" textAnchor="middle" fontSize="8.5" fill="#6b7280">2. vault proof correct</text>
        <text x="340" y="264" textAnchor="middle" fontSize="8.5" fill="#6b7280">3. within 10 min window</text>

        {/* Arrow to recipient */}
        <line x1="410" y1="240" x2="510" y2="240" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />

        {/* Recipient gets */}
        <rect x="510" y="218" width="140" height="44" rx="5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="580" y="236" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">Receives raw ERC-20</text>
        <text x="580" y="250" textAnchor="middle" fontSize="8.5" fill="#166534">(e.g. USDC, not qUSDC)</text>

        {/* Burn note */}
        <line x1="270" y1="264" x2="170" y2="290" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="30" y="278" width="140" height="28" rx="5" fill="#f9f9f9" stroke="#d1d5db" strokeWidth="1" />
        <text x="100" y="294" textAnchor="middle" fontSize="9" fill="#374151">qToken burned on-chain</text>

        <defs>
          <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
