export default function QryptAirFlowDiagram() {
  const color = "#F59E0B";

  return (
    <div className="diagram-container" style={{ margin: "1.5rem 0" }}>
      <svg viewBox="0 0 720 200" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <defs>
          <marker id="qaf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={color} />
          </marker>
          <marker id="qaf-arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* Sender offline box */}
        <rect x="10" y="30" width="150" height="110" rx="8" fill="#451a03" stroke={color} strokeWidth="2" />
        <text x="85" y="55" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>Sender (Offline)</text>
        <line x1="20" y1="63" x2="150" y2="63" stroke="#78350f" strokeWidth="1" />
        <text x="85" y="81" textAnchor="middle" fontSize="9" fill="#fcd34d">EIP-712 sign</text>
        <text x="85" y="96" textAnchor="middle" fontSize="9" fill="#fcd34d">token + amount</text>
        <text x="85" y="111" textAnchor="middle" fontSize="9" fill="#fcd34d">deadline + nonce</text>
        <text x="85" y="128" textAnchor="middle" fontSize="9" fill="#fcd34d">transferCodeHash</text>

        {/* Arrow 1: signed voucher */}
        <line x1="160" y1="85" x2="200" y2="85" stroke={color} strokeWidth="1.5" markerEnd="url(#qaf-arrow)" />
        <text x="180" y="77" textAnchor="middle" fontSize="8" fill={color}>sig</text>

        {/* QR Code box */}
        <rect x="200" y="50" width="130" height="70" rx="6" fill="#fffbeb" stroke={color} strokeWidth="1.5" />
        <text x="265" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">QR Code</text>
        <text x="265" y="90" textAnchor="middle" fontSize="9" fill="#b45309">voucher + sig</text>
        <text x="265" y="105" textAnchor="middle" fontSize="9" fill="#b45309">encoded JSON</text>

        {/* QR pattern decoration */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={215 + col * 10}
              y={112 + row * 10}
              width="8"
              height="8"
              rx="1"
              fill={(row === 0 && col === 0) || (row === 0 && col === 2) || (row === 2 && col === 0) ? "#92400e" : (row === 1 && col === 1) ? "#f59e0b" : "#d97706"}
            />
          ))
        )}

        {/* Arrow 2: QR via physical/digital medium */}
        <line x1="330" y1="85" x2="370" y2="85" stroke={color} strokeWidth="1.5" markerEnd="url(#qaf-arrow)" />
        <text x="350" y="77" textAnchor="middle" fontSize="8" fill="#6b7280">share</text>
        <text x="350" y="99" textAnchor="middle" fontSize="7.5" fill="#9ca3af">print / screen</text>

        {/* Transfer code arrow (separate channel, dashed) */}
        <line x1="85" y1="145" x2="85" y2="168" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="85" y1="168" x2="510" y2="168" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="510" y1="168" x2="510" y2="145" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#qaf-arrow-gray)" />
        <text x="297" y="181" textAnchor="middle" fontSize="8.5" fill="#6b7280">transfer code via separate channel (not in QR)</text>

        {/* Recipient box */}
        <rect x="370" y="30" width="150" height="110" rx="8" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="445" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">Recipient (Online)</text>
        <line x1="380" y1="63" x2="510" y2="63" stroke="#e5e7eb" strokeWidth="1" />
        <text x="445" y="81" textAnchor="middle" fontSize="9" fill="#374151">scan QR code</text>
        <text x="445" y="96" textAnchor="middle" fontSize="9" fill="#374151">enter transfer code</text>
        <text x="445" y="111" textAnchor="middle" fontSize="9" fill="#374151">call redeemVoucher()</text>
        <text x="445" y="128" textAnchor="middle" fontSize="9" fill="#374151">pays own gas</text>

        {/* Arrow 3: broadcast to Ethereum */}
        <line x1="520" y1="85" x2="558" y2="85" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#qaf-arrow-gray)" />

        {/* Ethereum box */}
        <rect x="558" y="40" width="150" height="90" rx="6" fill="#111" stroke="#374151" strokeWidth="1.5" />
        <text x="633" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Ethereum</text>
        <line x1="568" y1="74" x2="698" y2="74" stroke="#374151" strokeWidth="1" />
        <text x="633" y="91" textAnchor="middle" fontSize="9" fill="#9ca3af">verify EIP-712 sig</text>
        <text x="633" y="106" textAnchor="middle" fontSize="9" fill="#9ca3af">check deadline</text>
        <text x="633" y="121" textAnchor="middle" fontSize="9" fill="#9ca3af">mark nonce used</text>
      </svg>
    </div>
  );
}
