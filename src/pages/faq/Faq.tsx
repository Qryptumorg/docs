import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { faqContent } from "@/lib/content/faq";

export default function Faq() {
  const { lang, t } = useLanguage();
  const c = faqContent[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.faq}
        </span>
      </div>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {c.items.map((faq, i) => (
          <div
            key={i}
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "1rem 1.25rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "hsl(var(--foreground))",
                gap: "1rem",
              }}
            >
              <span>{faq.q}</span>
              <span style={{ flexShrink: 0, fontSize: "1.25rem", color: "hsl(var(--muted-fg))" }}>
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div
                style={{
                  padding: "0 1.25rem 1rem",
                  color: "hsl(var(--muted-fg))",
                  lineHeight: 1.7,
                  borderTop: "1px solid hsl(var(--border))",
                  paddingTop: "1rem",
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
