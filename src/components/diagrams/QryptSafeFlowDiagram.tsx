export default function QryptSafeFlowDiagram() {
  const color = "#22C55E";
  const dim = "#6b7280";

  return (
    <div className="diagram-container" style={{ margin: "1.5rem 0" }}>
      <svg viewBox="0 0 720 180" width="100%" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <defs>
          <marker id="qsf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={color} />
          </marker>
        </defs>

        {/* Step boxes */}
        {[
          { x: 10, label: "01", title: "Shield", sub1: "ERC-20 in", sub2: "qToken minted" },
          { x: 188, label: "02", title: "Hold", sub1: "qToken in wallet", sub2: "non-transferable" },
          { x: 366, label: "03", title: "Transfer", sub1: "commit-reveal", sub2: "2-step on-chain" },
          { x: 544, label: "04", title: "Unshield", sub1: "qToken burned", sub2: "ERC-20 out" },
        ].map(({ x, label, title, sub1, sub2 }) => (
          <g key={label}>
            <rect x={x} y="30" width="162" height="110" rx="8" fill="#052e16" stroke={color} strokeWidth="1.5" />
            <rect x={x} y="30" width="162" height="36" rx="8" fill="#166534" />
            <rect x={x} y="52" width="162" height="14" rx="0" fill="#166534" />
            <text x={x + 81} y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{label}</text>
            <text x={x + 81} y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{title}</text>
            <text x={x + 81} y="98" textAnchor="middle" fontSize="10" fill="#86efac">{sub1}</text>
            <text x={x + 81} y="115" textAnchor="middle" fontSize="10" fill="#86efac">{sub2}</text>
          </g>
        ))}

        {/* Arrows between boxes */}
        {[172, 350, 528].map((x) => (
          <line key={x} x1={x} y1="85" x2={x + 16} y2="85" stroke={color} strokeWidth="1.5" markerEnd="url(#qsf-arrow)" />
        ))}

        {/* Vault proof label below step 1 and 3 */}
        <text x="91" y="158" textAnchor="middle" fontSize="9" fill={color}>vault proof</text>
        <text x="91" y="169" textAnchor="middle" fontSize="9" fill={dim}>required</text>
        <text x="447" y="158" textAnchor="middle" fontSize="9" fill={color}>vault proof</text>
        <text x="447" y="169" textAnchor="middle" fontSize="9" fill={dim}>required</text>
        <text x="269" y="158" textAnchor="middle" fontSize="9" fill={dim}>no vault proof</text>
        <text x="269" y="169" textAnchor="middle" fontSize="9" fill={dim}>in commit TX</text>
        <text x="625" y="158" textAnchor="middle" fontSize="9" fill={color}>vault proof</text>
        <text x="625" y="169" textAnchor="middle" fontSize="9" fill={dim}>required</text>
      </svg>
    </div>
  );
}
