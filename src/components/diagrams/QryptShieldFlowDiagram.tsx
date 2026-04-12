export default function QryptShieldFlowDiagram() {
  const color = "#8B5CF6";

  return (
    <div className="diagram-container" style={{ margin: "1.5rem 0" }}>
      <svg viewBox="0 0 720 200" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <defs>
          <marker id="qshf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={color} />
          </marker>
        </defs>

        {/* Sender wallet */}
        <rect x="10" y="55" width="120" height="70" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="70" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">Sender</text>
        <text x="70" y="99" textAnchor="middle" fontSize="9" fill="#6b7280">deposits</text>
        <text x="70" y="112" textAnchor="middle" fontSize="9" fill="#6b7280">ERC-20</text>

        {/* Arrow 1 */}
        <line x1="130" y1="90" x2="165" y2="90" stroke={color} strokeWidth="1.5" markerEnd="url(#qshf-arrow)" />

        {/* Railgun pool */}
        <rect x="165" y="20" width="200" height="140" rx="8" fill="#1e1b4b" stroke={color} strokeWidth="2" />
        <text x="265" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a78bfa">Railgun Privacy Pool</text>
        <line x1="175" y1="56" x2="355" y2="56" stroke="#4c1d95" strokeWidth="1" />
        <text x="265" y="76" textAnchor="middle" fontSize="9.5" fill="#c4b5fd">UTXO note tree</text>
        <text x="265" y="93" textAnchor="middle" fontSize="9.5" fill="#c4b5fd">ZK-SNARK proofs</text>
        <text x="265" y="110" textAnchor="middle" fontSize="9.5" fill="#c4b5fd">Groth16 circuit</text>
        <text x="265" y="127" textAnchor="middle" fontSize="9.5" fill="#c4b5fd">note commitment</text>
        {/* ZK lock icon representation */}
        <rect x="238" y="138" width="54" height="14" rx="4" fill="#4c1d95" />
        <text x="265" y="149" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a78bfa">ZK PROOF</text>

        {/* Arrow 2 */}
        <line x1="365" y1="90" x2="400" y2="90" stroke={color} strokeWidth="1.5" markerEnd="url(#qshf-arrow)" />

        {/* Recipient wallet */}
        <rect x="400" y="55" width="120" height="70" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="460" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">Recipient</text>
        <text x="460" y="99" textAnchor="middle" fontSize="9" fill="#6b7280">any address</text>
        <text x="460" y="112" textAnchor="middle" fontSize="9" fill="#6b7280">real ERC-20</text>

        {/* "No link" label */}
        <line x1="130" y1="170" x2="400" y2="170" stroke="#4c1d95" strokeWidth="1" strokeDasharray="4,3" />
        <text x="265" y="185" textAnchor="middle" fontSize="9" fill="#6b7280">no observable link between sender and recipient</text>

        {/* On-chain visible box */}
        <rect x="540" y="30" width="170" height="120" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1" />
        <text x="625" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#374151">On-chain visible</text>
        <line x1="550" y1="58" x2="700" y2="58" stroke="#e5e7eb" strokeWidth="1" />
        <text x="625" y="75" textAnchor="middle" fontSize="9" fill="#6b7280">Pool contract address</text>
        <text x="625" y="91" textAnchor="middle" fontSize="9" fill="#6b7280">Token type (USDC etc.)</text>
        <text x="625" y="107" textAnchor="middle" fontSize="9" fill="#6b7280">Block timestamp</text>
        <text x="625" y="123" textAnchor="middle" fontSize="9" fill="#6b7280">ZK proof result</text>
        <text x="625" y="139" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7c3aed">Hidden: addresses + amount</text>
      </svg>
    </div>
  );
}
