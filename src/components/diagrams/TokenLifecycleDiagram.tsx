export default function TokenLifecycleDiagram() {
  return (
    <div className="diagram-container">
      <svg viewBox="0 0 640 200" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>

        {/* ERC-20 */}
        <rect x="20" y="70" width="120" height="60" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="80" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111">USDC</text>
        <text x="80" y="114" textAnchor="middle" fontSize="9" fill="#6b7280">Real ERC-20</text>
        <text x="80" y="127" textAnchor="middle" fontSize="9" fill="#6b7280">in wallet</text>

        {/* Arrow: shield */}
        <line x1="140" y1="100" x2="200" y2="100" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)" />
        <text x="170" y="90" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">shield()</text>

        {/* QRYPTANK box */}
        <rect x="200" y="50" width="160" height="100" rx="6" fill="#1a1a1a" stroke="#374151" strokeWidth="1.5" />
        <text x="280" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">QRYPTANK</text>
        <text x="280" y="97" textAnchor="middle" fontSize="9" fill="#9ca3af">PersonalVault contract</text>
        <line x1="210" y1="104" x2="350" y2="104" stroke="#374151" strokeWidth="1" />
        <text x="280" y="120" textAnchor="middle" fontSize="9" fill="#6b7280">Holds real USDC</text>
        <text x="280" y="134" textAnchor="middle" fontSize="9" fill="#6b7280">Mints qUSDC to user</text>

        {/* Arrow: unshield */}
        <line x1="200" y1="115" x2="140" y2="130" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)" strokeDasharray="5,3" />
        <text x="160" y="145" textAnchor="middle" fontSize="9" fill="#6b7280">unshield()</text>

        {/* qToken */}
        <rect x="360" y="35" width="100" height="60" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="410" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111">qUSDC</text>
        <text x="410" y="76" textAnchor="middle" fontSize="9" fill="#6b7280">qToken (ERC-20)</text>
        <text x="410" y="90" textAnchor="middle" fontSize="9" fill="#e74c3c">Non-transferable</text>

        {/* Arrow: mint qToken */}
        <line x1="360" y1="80" x2="310" y2="88" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr3)" />
        <text x="332" y="72" textAnchor="middle" fontSize="8.5" fill="#6b7280">mint</text>

        {/* Arrow: transfer */}
        <line x1="360" y1="65" x2="490" y2="90" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)" strokeDasharray="5,3" />

        {/* Recipient */}
        <rect x="490" y="70" width="130" height="60" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="555" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534">Recipient</text>
        <text x="555" y="112" textAnchor="middle" fontSize="9" fill="#166534">Receives USDC</text>
        <text x="555" y="126" textAnchor="middle" fontSize="9" fill="#6b7280">(not qUSDC)</text>

        {/* Transfer label */}
        <text x="530" y="62" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">revealTransfer()</text>

        {/* Burn label */}
        <text x="410" y="145" textAnchor="middle" fontSize="9" fill="#6b7280">qUSDC burned during transfer</text>

        <defs>
          <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#374151" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
