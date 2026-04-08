export default function SecurityLayerDiagram() {
  return (
    <div className="diagram-container">
      <svg viewBox="0 0 560 280" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>

        {/* Outer ring: onlyOwner */}
        <ellipse cx="280" cy="150" rx="250" ry="120" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6,4" />
        <text x="280" y="36" textAnchor="middle" fontSize="10" fill="#6b7280">Layer 1: onlyOwner (private key required)</text>

        {/* Middle ring: vault proof */}
        <ellipse cx="280" cy="150" rx="175" ry="82" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="280" y="74" textAnchor="middle" fontSize="10" fill="#6b7280">Layer 2: vault proof (6-char cryptographic proof)</text>

        {/* Inner: QRYPTANK */}
        <rect x="200" y="110" width="160" height="80" rx="8" fill="#1a1a1a" stroke="#374151" strokeWidth="1.5" />
        <text x="280" y="140" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">QRYPTANK</text>
        <text x="280" y="157" textAnchor="middle" fontSize="9.5" fill="#9ca3af">Token storage</text>
        <text x="280" y="172" textAnchor="middle" fontSize="9" fill="#6b7280">PersonalVault contract</text>

        {/* qToken non-transferable note */}
        <rect x="395" y="110" width="140" height="52" rx="6" fill="#f8f8f8" stroke="#d1d5db" strokeWidth="1" />
        <text x="465" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111">qToken</text>
        <text x="465" y="146" textAnchor="middle" fontSize="9" fill="#e74c3c">transfer() revert</text>
        <text x="465" y="159" textAnchor="middle" fontSize="9" fill="#e74c3c">approve() revert</text>

        {/* Arrow */}
        <line x1="395" y1="136" x2="360" y2="150" stroke="#d1d5db" strokeWidth="1" markerEnd="url(#arr4)" />

        {/* Labels */}
        <text x="60" y="165" textAnchor="middle" fontSize="9" fill="#6b7280">Any wallet</text>
        <text x="60" y="178" textAnchor="middle" fontSize="9" fill="#6b7280">cannot pass</text>
        <text x="60" y="191" textAnchor="middle" fontSize="9" fill="#e74c3c">Layer 1</text>

        <text x="140" y="175" textAnchor="middle" fontSize="9" fill="#6b7280">owner wallet</text>
        <text x="140" y="188" textAnchor="middle" fontSize="9" fill="#6b7280">still needs</text>
        <text x="140" y="201" textAnchor="middle" fontSize="9" fill="#e74c3c">Layer 2</text>

        <defs>
          <marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d1d5db" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
