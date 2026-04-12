export default function TransferModeDiagram() {
  return (
    <div className="diagram-container" style={{ margin: "1.75rem 0" }}>
      <svg viewBox="0 0 740 260" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <defs>
          <marker id="tmd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#6b7280" />
          </marker>
          <marker id="tmd-arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#22C55E" />
          </marker>
          <marker id="tmd-arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#8B5CF6" />
          </marker>
          <marker id="tmd-arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#F59E0B" />
          </marker>
        </defs>

        {/* Wallet (left) */}
        <rect x="10" y="100" width="110" height="60" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="65" y="126" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">User Wallet</text>
        <text x="65" y="143" textAnchor="middle" fontSize="9.5" fill="#6b7280">Private Key</text>
        <text x="65" y="155" textAnchor="middle" fontSize="9.5" fill="#6b7280">+ ERC-20</text>

        {/* Wallet -> fork lines */}
        <line x1="120" y1="130" x2="155" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
        <line x1="155" y1="50" x2="155" y2="210" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Fork -> row 1 (QryptSafe) */}
        <line x1="155" y1="50" x2="190" y2="50" stroke="#22C55E" strokeWidth="1.5" markerEnd="url(#tmd-arrow-green)" />
        {/* Fork -> row 2 (QryptShield) */}
        <line x1="155" y1="130" x2="190" y2="130" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#tmd-arrow-purple)" />
        {/* Fork -> row 3 (QryptAir) */}
        <line x1="155" y1="210" x2="190" y2="210" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#tmd-arrow-amber)" />

        {/* -------- Row 1: QryptSafe -------- */}
        {/* Vault box */}
        <rect x="190" y="22" width="150" height="56" rx="6" fill="#052e16" stroke="#22C55E" strokeWidth="1.5" />
        <text x="265" y="43" textAnchor="middle" fontSize="10" fontWeight="700" fill="#22C55E">QryptSafe</text>
        <text x="265" y="57" textAnchor="middle" fontSize="9" fill="#86efac">Commit-reveal</text>
        <text x="265" y="70" textAnchor="middle" fontSize="9" fill="#86efac">vault proof</text>
        {/* Arrow vault -> recipient */}
        <line x1="340" y1="50" x2="390" y2="50" stroke="#22C55E" strokeWidth="1.5" markerEnd="url(#tmd-arrow-green)" />
        {/* qToken box */}
        <rect x="390" y="22" width="110" height="56" rx="6" fill="#f0fdf4" stroke="#22C55E" strokeWidth="1" />
        <text x="445" y="43" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#15803d">qToken</text>
        <text x="445" y="56" textAnchor="middle" fontSize="9" fill="#16a34a">non-transferable</text>
        <text x="445" y="70" textAnchor="middle" fontSize="9" fill="#16a34a">receipt</text>
        {/* Arrow qToken -> recipient */}
        <line x1="500" y1="50" x2="550" y2="50" stroke="#22C55E" strokeWidth="1.5" markerEnd="url(#tmd-arrow-green)" />
        {/* Recipient box */}
        <rect x="550" y="22" width="100" height="56" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="600" y="46" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111">Recipient</text>
        <text x="600" y="60" textAnchor="middle" fontSize="9" fill="#6b7280">gets real</text>
        <text x="600" y="73" textAnchor="middle" fontSize="9" fill="#6b7280">ERC-20</text>

        {/* -------- Row 2: QryptShield -------- */}
        {/* Railgun box */}
        <rect x="190" y="102" width="150" height="56" rx="6" fill="#1e1b4b" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="265" y="123" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a78bfa">QryptShield</text>
        <text x="265" y="137" textAnchor="middle" fontSize="9" fill="#c4b5fd">Railgun ZK pool</text>
        <text x="265" y="150" textAnchor="middle" fontSize="9" fill="#c4b5fd">zero-knowledge</text>
        {/* Arrow Railgun -> ZK mix */}
        <line x1="340" y1="130" x2="390" y2="130" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#tmd-arrow-purple)" />
        {/* ZK proof box */}
        <rect x="390" y="102" width="110" height="56" rx="6" fill="#f5f3ff" stroke="#8B5CF6" strokeWidth="1" />
        <text x="445" y="124" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#6d28d9">ZK Proof</text>
        <text x="445" y="137" textAnchor="middle" fontSize="9" fill="#7c3aed">link broken</text>
        <text x="445" y="150" textAnchor="middle" fontSize="9" fill="#7c3aed">on-chain</text>
        {/* Arrow ZK -> recipient */}
        <line x1="500" y1="130" x2="550" y2="130" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#tmd-arrow-purple)" />
        {/* Recipient box */}
        <rect x="550" y="102" width="100" height="56" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="600" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111">Recipient</text>
        <text x="600" y="140" textAnchor="middle" fontSize="9" fill="#6b7280">anonymous</text>
        <text x="600" y="153" textAnchor="middle" fontSize="9" fill="#6b7280">delivery</text>

        {/* -------- Row 3: QryptAir -------- */}
        {/* Sign offline box */}
        <rect x="190" y="182" width="150" height="56" rx="6" fill="#451a03" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="265" y="203" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fbbf24">QryptAir</text>
        <text x="265" y="217" textAnchor="middle" fontSize="9" fill="#fcd34d">EIP-712 offline</text>
        <text x="265" y="230" textAnchor="middle" fontSize="9" fill="#fcd34d">voucher + QR</text>
        {/* Arrow offline -> QR */}
        <line x1="340" y1="210" x2="390" y2="210" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#tmd-arrow-amber)" />
        {/* QR box */}
        <rect x="390" y="182" width="110" height="56" rx="6" fill="#fffbeb" stroke="#F59E0B" strokeWidth="1" />
        <text x="445" y="204" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">QR Code</text>
        <text x="445" y="217" textAnchor="middle" fontSize="9" fill="#b45309">scan or print</text>
        <text x="445" y="230" textAnchor="middle" fontSize="9" fill="#b45309">any channel</text>
        {/* Arrow QR -> recipient */}
        <line x1="500" y1="210" x2="550" y2="210" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#tmd-arrow-amber)" />
        {/* Recipient box */}
        <rect x="550" y="182" width="100" height="56" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="600" y="206" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111">Recipient</text>
        <text x="600" y="220" textAnchor="middle" fontSize="9" fill="#6b7280">broadcasts</text>
        <text x="600" y="233" textAnchor="middle" fontSize="9" fill="#6b7280">on-chain</text>

        {/* Mode labels on left */}
        <text x="175" y="38" textAnchor="middle" fontSize="8" fontWeight="700" fill="#22C55E" transform="rotate(-90,175,50)">SAFE</text>
        <text x="175" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#8B5CF6" transform="rotate(-90,175,130)">SHIELD</text>
        <text x="175" y="198" textAnchor="middle" fontSize="8" fontWeight="700" fill="#F59E0B" transform="rotate(-90,175,210)">AIR</text>
      </svg>
    </div>
  );
}
