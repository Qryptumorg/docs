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

        {/* ShieldFactory */}
        <rect x="215" y="100" width="160" height="120" rx="6" fill="#f0f0f0" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="295" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">ShieldFactory</text>
        <line x1="225" y1="136" x2="365" y2="136" stroke="#d1d5db" strokeWidth="1" />
        <text x="295" y="153" textAnchor="middle" fontSize="9.5" fill="#374151">createVault(proofHash)</text>
        <text x="295" y="170" textAnchor="middle" fontSize="9.5" fill="#374151">hasVault(wallet)</text>
        <text x="295" y="187" textAnchor="middle" fontSize="9.5" fill="#374151">getVault(wallet)</text>
        <text x="295" y="208" textAnchor="middle" fontSize="9" fill="#6b7280">EIP-1167 Clone Factory</text>

        {/* Arrow 2 */}
        <line x1="375" y1="160" x2="430" y2="160" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="402" y="148" textAnchor="middle" fontSize="9" fill="#6b7280">clone</text>

        {/* PersonalVault */}
        <rect x="430" y="80" width="160" height="160" rx="6" fill="#1a1a1a" stroke="#374151" strokeWidth="1.5" />
        <text x="510" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">PersonalVault</text>
        <text x="510" y="122" textAnchor="middle" fontSize="9" fill="#9ca3af">0xVaultA (per user)</text>
        <line x1="440" y1="130" x2="580" y2="130" stroke="#374151" strokeWidth="1" />
        <text x="510" y="147" textAnchor="middle" fontSize="9.5" fill="#d1d5db">shield(token, amount, proof)</text>
        <text x="510" y="164" textAnchor="middle" fontSize="9.5" fill="#d1d5db">unshield(token, amount, proof)</text>
        <text x="510" y="181" textAnchor="middle" fontSize="9.5" fill="#d1d5db">commitTransfer(commitHash)</text>
        <text x="510" y="198" textAnchor="middle" fontSize="9.5" fill="#d1d5db">revealTransfer(...)</text>
        <text x="510" y="218" textAnchor="middle" fontSize="9" fill="#6b7280">Holds real ERC-20 tokens</text>

        {/* Arrow 3 */}
        <line x1="590" y1="140" x2="640" y2="140" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* qToken */}
        <rect x="640" y="110" width="68" height="60" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="674" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">qToken</text>
        <text x="674" y="150" textAnchor="middle" fontSize="9" fill="#6b7280">qUSDC</text>
        <text x="674" y="165" textAnchor="middle" fontSize="9" fill="#6b7280">Non-xfer</text>

        {/* Real token stored label */}
        <rect x="430" y="250" width="160" height="28" rx="4" fill="transparent" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,3" />
        <text x="510" y="269" textAnchor="middle" fontSize="9" fill="#6b7280">Real tokens stored here (vault address)</text>

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
