import { useLanguage } from "@/lib/LanguageContext";
import { introductionContent } from "@/lib/content/introduction";

const MODE_COLORS: Record<string, string> = {
  QryptSafe:   "#22C55E",
  QryptShield: "#8B5CF6",
  QryptAir:    "#F59E0B",
};

function ProtectionLevelCard({
  mode,
  threat,
  mechanism,
}: {
  mode: string;
  threat: string;
  mechanism: string;
}) {
  const color = MODE_COLORS[mode] ?? "#6b7280";
  return (
    <div style={{
      border: `1.5px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "6px",
      padding: "1rem 1.25rem",
      marginBottom: "1rem",
      background: "hsl(var(--card-bg, transparent))",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
        <span style={{
          fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.06em", color, padding: "2px 8px",
          border: `1px solid ${color}50`, borderRadius: "4px",
        }}>
          {mode}
        </span>
      </div>
      <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--fg))" }}>
        {threat}
      </p>
      <p style={{ margin: 0, fontSize: "0.8125rem", color: "hsl(var(--muted-fg))" }}>
        {mechanism}
      </p>
    </div>
  );
}

export default function WhyQryptum() {
  const { lang, t } = useLanguage();
  const c = introductionContent[lang].why;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{
          fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "hsl(var(--muted-fg))",
        }}>
          {t.nav.sections.introduction}
        </span>
      </div>

      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <h2>{c.h2Problem}</h2>
      <p>{c.pProblem1}</p>
      <p>{c.pProblem2}</p>

      <h2>{c.h2ThreeLevels}</h2>
      <p>{c.pThreeLevels}</p>

      {c.levels.map(([mode, threat, mechanism]) => (
        <ProtectionLevelCard key={mode} mode={mode} threat={threat} mechanism={mechanism} />
      ))}

      <h2>{c.h2QryptSafe}</h2>
      <p>{c.pQryptSafe1}</p>
      <p>{c.pQryptSafe2}</p>

      <h2>{c.h2Compare}</h2>
      <table>
        <thead>
          <tr>
            {c.compareHeaders.map((h) => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {c.compareRows.map(([scenario, standard, qryptum]) => (
            <tr key={scenario}>
              <td>{scenario}</td>
              <td style={{ color: "hsl(var(--muted-fg))" }}>{standard}</td>
              <td style={{ color: "#22C55E" }}>{qryptum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2WhatIsNot}</h2>
      <ul>
        {c.notItems.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <h2>{c.h2KeyInsights}</h2>

      {(
        [
          { label: c.insightSafeLabel, text: c.insightSafe, color: "#22C55E" },
          { label: c.insightShieldLabel, text: c.insightShield, color: "#8B5CF6" },
          { label: c.insightAirLabel, text: c.insightAir, color: "#F59E0B" },
        ] as const
      ).map(({ label, text, color }) => (
        <div
          key={label}
          className="callout"
          style={{ borderLeft: `4px solid ${color}`, marginBottom: "1rem" }}
        >
          <strong style={{ color }}>{label}</strong>{" "}
          {text}
        </div>
      ))}
    </div>
  );
}
