import { useLocation, Link } from "wouter";
import { NAV } from "@/lib/nav";
import { useLanguage } from "@/lib/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const nav = (
    <nav
      style={{
        position: "fixed",
        top: isMobile ? 0 : "56px",
        left: 0,
        bottom: 0,
        width: "260px",
        background: "hsl(var(--sidebar-bg))",
        borderRight: "1px solid hsl(var(--sidebar-border))",
        overflowY: "auto",
        zIndex: isMobile ? 150 : 40,
        transform: isMobile && !open ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.25s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.875rem 1.25rem",
            borderBottom: "1px solid hsl(var(--sidebar-border))",
            height: "56px",
            flexShrink: 0,
          }}
        >
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}
          >
            <img
              src={`${import.meta.env.BASE_URL}qryptum-logo.png`}
              alt="Qryptum"
              style={{ height: "28px", width: "28px", objectFit: "contain" }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "-0.01em",
                color: "hsl(var(--foreground))",
                marginLeft: "-4px",
              }}
            >
              QRYPTUM
            </span>
          </a>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "hsl(var(--muted-fg))",
              padding: "6px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <div style={{ padding: "1.25rem 0 2rem", flex: 1, overflowY: "auto" }}>
        {NAV.map((section) => (
          <div key={section.key} style={{ marginBottom: "0.25rem" }}>
            <div
              style={{
                padding: "0.25rem 1.5rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "hsl(var(--muted-fg))",
                marginTop: "1.25rem",
                marginBottom: "0.25rem",
              }}
            >
              {t.nav.sections[section.key]}
            </div>
            {section.items.map((item) => {
              const isActive =
                location === item.href || location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  style={{
                    display: "block",
                    padding: "0.375rem 1.5rem",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--sidebar-fg))",
                    textDecoration: "none",
                    borderLeft: isActive
                      ? "2px solid hsl(var(--foreground))"
                      : "2px solid transparent",
                    background: isActive ? "hsl(var(--muted))" : "transparent",
                  }}
                >
                  {t.nav.items[item.key]}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(2px)",
              zIndex: 140,
            }}
          />
        )}
        {nav}
      </>
    );
  }

  return nav;
}
