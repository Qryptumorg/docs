export default function QuantumBruteForceChart() {
  return (
    <div
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--card-border))",
        borderRadius: "12px",
        padding: "1.75rem",
        marginBottom: "2rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #7c3aed, #06b6d4, #10b981)",
        }}
      />

      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#7c3aed",
            marginBottom: "0.35rem",
          }}
        >
          Post-Quantum Security Analysis
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "hsl(var(--fg))",
            marginBottom: "0.25rem",
          }}
        >
          Brute Force Economics and Quantum Threat Model
        </div>
        <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-fg))" }}>
          Why exhausting the vault proof keyspace is economically irrational, even with quantum hardware
        </div>
      </div>

      <div
        className="quantum-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <Panel title="Quantum Threat Landscape" accent="#ef4444">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <ThreatRow
              label="ECDSA (Ethereum wallet)"
              sublabel="Shor's algorithm gives exponential speedup"
              status="vulnerable"
            />
            <ThreatRow
              label="keccak256 (vault proof hash)"
              sublabel="Grover's algorithm gives only quadratic speedup"
              status="resistant"
            />
            <ThreatRow
              label="256-bit hash retains 128-bit quantum security"
              sublabel="Meets NIST post-quantum minimum threshold"
              status="resistant"
            />
          </div>
          <div
            style={{
              marginTop: "0.85rem",
              padding: "0.6rem 0.75rem",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "6px",
              fontSize: "0.72rem",
              color: "hsl(var(--muted-fg))",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "#ef4444" }}>Quantum future: </strong>
            If ECDSA breaks, standard ERC-20 wallets are drained. Qryptum's keccak256 vault proof layer remains the last line of defense.
          </div>
        </Panel>

        <Panel title="Brute Force Cost Barrier" accent="#7c3aed">
          <div style={{ marginBottom: "0.85rem" }}>
            <CostBar
              label="Typical web app attack"
              labelSub="$0 per attempt, rate-limited only"
              costLabel="$0"
              fraction={0.002}
              color="#ef4444"
            />
            <CostBar
              label="Expected vault proof cost"
              labelSub="8.8M attempts at $0.06 per try at 0.5 gwei"
              costLabel="$528K"
              fraction={0.5}
              color="#f59e0b"
            />
            <CostBar
              label="Full keyspace exhaustion"
              labelSub="17.6M combinations at $0.06 each"
              costLabel="$1.05M"
              fraction={1}
              color="#7c3aed"
            />
          </div>
          <div
            style={{
              padding: "0.6rem 0.75rem",
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "6px",
              fontSize: "0.72rem",
              color: "hsl(var(--muted-fg))",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "#7c3aed" }}>On-chain barrier: </strong>
            Each failed guess costs ~40,000 gas. No free attempts, no batch execution, one block per try at 12-second intervals.
          </div>
        </Panel>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(16,185,129,0.06) 100%)",
          border: "1px solid rgba(6,182,212,0.25)",
          borderRadius: "10px",
          padding: "1.1rem 1.25rem",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#06b6d4",
            marginBottom: "0.75rem",
          }}
        >
          Qryptum Dual-Factor Solution
        </div>
        <div
          className="dual-factor-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <DualBlock
            icon={<KeyIcon />}
            title="Layer 1: Private Key"
            desc="ECDSA signature enforced by onlyOwner before any vault logic runs"
            color="#f59e0b"
          />
          <div className="dual-factor-plus" style={{ textAlign: "center", color: "hsl(var(--muted-fg))", fontSize: "1.25rem", fontWeight: 300 }}>+</div>
          <DualBlock
            icon={<LockIcon />}
            title="Layer 2: Vault Proof"
            desc="keccak256 hash with 128-bit quantum resistance and $528K expected brute-force cost"
            color="#06b6d4"
          />
          <div className="dual-factor-arrow" style={{ textAlign: "center", color: "#10b981", fontSize: "1.1rem", fontWeight: 700 }}>→</div>
          <div
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.3rem" }}>
              <ShieldIcon />
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", marginBottom: "0.2rem" }}>
              QRYPTANK
            </div>
            <div style={{ fontSize: "0.68rem", color: "hsl(var(--muted-fg))" }}>
              Both barriers must be defeated simultaneously
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <Stat value="2¹²⁸" label="Quantum operations needed to break vault" color="#06b6d4" />
          <Stat value="$1.05M" label="Cost to exhaust the full keyspace" color="#7c3aed" />
          <Stat value="Zero" label="Admin keys, fully non-custodial" color="#10b981" />
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "hsl(var(--bg))",
        border: `1px solid hsl(var(--card-border))`,
        borderTop: `2px solid ${accent}`,
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: accent,
          marginBottom: "0.85rem",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function ThreatRow({
  label,
  sublabel,
  status,
}: {
  label: string;
  sublabel: string;
  status: "vulnerable" | "resistant";
}) {
  const isVulnerable = status === "vulnerable";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
      <span style={{ marginTop: "1px", flexShrink: 0 }}>
        {isVulnerable ? <WarningIcon /> : <CheckIcon />}
      </span>
      <div>
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: isVulnerable ? "#ef4444" : "#10b981",
            marginBottom: "0.1rem",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-fg))" }}>{sublabel}</div>
      </div>
    </div>
  );
}

function CostBar({
  label,
  labelSub,
  costLabel,
  fraction,
  color,
}: {
  label: string;
  labelSub: string;
  costLabel: string;
  fraction: number;
  color: string;
}) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.2rem",
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--fg))" }}>{label}</span>
          <div style={{ fontSize: "0.68rem", color: "hsl(var(--muted-fg))" }}>{labelSub}</div>
        </div>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color, marginLeft: "0.5rem", flexShrink: 0 }}>
          {costLabel}
        </span>
      </div>
      <div
        style={{
          height: "6px",
          background: "hsl(var(--card-border))",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.max(fraction * 100, 0.5)}%`,
            background: color,
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
}

function DualBlock({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  const rgb: Record<string, string> = {
    "#f59e0b": "245,158,11",
    "#06b6d4": "6,182,212",
    "#10b981": "16,185,129",
  };
  const r = rgb[color] ?? "128,128,128";
  return (
    <div
      style={{
        background: `rgba(${r}, 0.06)`,
        border: `1px solid rgba(${r}, 0.25)`,
        borderRadius: "8px",
        padding: "0.75rem",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.35rem" }}>{icon}</div>
      <div style={{ fontSize: "0.72rem", fontWeight: 700, color, marginBottom: "0.25rem" }}>{title}</div>
      <div style={{ fontSize: "0.67rem", color: "hsl(var(--muted-fg))", lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "1.35rem",
          fontWeight: 800,
          color,
          letterSpacing: "-0.03em",
          marginBottom: "0.2rem",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-fg))", lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(239,68,68,0.12)" />
      <path d="M8 6v3.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="#ef4444" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.25" />
      <path d="M5 8l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="12" r="4" stroke="#f59e0b" strokeWidth="1.75" />
      <path d="M12 12h8M17 12v3" stroke="#f59e0b" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#06b6d4" strokeWidth="1.75" />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="#06b6d4" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.25" fill="#06b6d4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 6v5c0 4.97 3.4 9.12 8 10 4.6-.88 8-5.03 8-10V6l-8-3z" stroke="#10b981" strokeWidth="1.75" strokeLinejoin="round" fill="rgba(16,185,129,0.15)" />
      <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
