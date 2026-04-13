export default function ArchitectureDiagram() {
  return (
    <div className="diagram-container">
      <svg viewBox="0 0 720 320" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        {/* User Wallet */}
        <rect x="20" y="120" width="140" height="80" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="90" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111">User Wallet</text>
        <text x="90" y="166" textAnchor="middle" fontSize="10" fill="#6b7280">0xWallet</text>
        <text x="90" y="182" textAnchor="middle" fontSize="10" fill="#6b7280">Private Key</text>

        {/* Arrow 1 */}
        <line x1="160" y1="160" x2="215" y2="160" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="187" y="148" textAnchor="middle" fontSize="9" fill="#6b7280">deploy</text>

        {/* QryptSafe Factory */}
        <rect x="215" y="100" width="160" height="120" rx="6" fill="#f0f0f0" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="295" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">QryptSafe</text>
        <line x1="225" y1="136" x2="365" y2="136" stroke="#d1d5db" strokeWidth="1" />
        <text x="295" y="153" textAnchor="middle" fontSize="9.5" fill="#374151">createVault(proofHash)</text>
        <text x="295" y="170" textAnchor="middle" fontSize="9.5" fill="#374151">hasVault(wallet)</text>
        <text x="295" y="187" textAnchor="middle" fontSize="9.5" fill="#374151">getVault(wallet)</text>
        <text x="295" y="208" textAnchor="middle" fontSize="9" fill="#6b7280">EIP-1167 Clone Factory</text>

        {/* Arrow 2 */}
        <line x1="375" y1="160" x2="430" y2="160" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="402" y="148" textAnchor="middle" fontSize="9" fill="#6b7280">clone</text>

        {/* PersonalVault v6 */}
        <rect x="430" y="70" width="160" height="180" rx="6" fill="#1a1a1a" stroke="#374151" strokeWidth="1.5" />
        <text x="510" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">PersonalVault</text>
        <text x="510" y="112" textAnchor="middle" fontSize="9" fill="#9ca3af">0xVaultAddr (per user)</text>
        <line x1="440" y1="120" x2="580" y2="120" stroke="#374151" strokeWidth="1" />
        <text x="510" y="137" textAnchor="middle" fontSize="9.5" fill="#d1d5db">Qrypt(token, amount, proof)</text>
        <text x="510" y="154" textAnchor="middle" fontSize="9.5" fill="#d1d5db">unQrypt(token, amount, proof)</text>
        <text x="510" y="171" textAnchor="middle" fontSize="9.5" fill="#d1d5db">initTransfer(token, amount, proof)</text>
        <text x="510" y="188" textAnchor="middle" fontSize="9.5" fill="#d1d5db">finalizeTransfer(...)</text>
        <text x="510" y="205" textAnchor="middle" fontSize="9.5" fill="#d1d5db">enterRailgun(...)</text>
        <text x="510" y="225" textAnchor="middle" fontSize="9" fill="#6b7280">Holds real ERC-20 tokens</text>

        {/* Arrow 3 */}
        <line x1="590" y1="130" x2="640" y2="130" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* qToken */}
        <rect x="640" y="100" width="68" height="60" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="674" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">qToken</text>
        <text x="674" y="140" textAnchor="middle" fontSize="9" fill="#6b7280">qUSDC</text>
        <text x="674" y="155" textAnchor="middle" fontSize="9" fill="#6b7280">Non-xfer</text>

        {/* Real token stored label */}
        <rect x="430" y="260" width="160" height="28" rx="4" fill="transparent" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,3" />
        <text x="510" y="279" textAnchor="middle" fontSize="9" fill="#6b7280">Real tokens stored here (vault address)</text>

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
