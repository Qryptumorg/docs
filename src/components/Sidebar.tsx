import { useLocation, Link } from "wouter";
import { NAV } from "@/lib/nav";
import { useLanguage } from "@/lib/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DEV_KEYS = ["devTestnet", "devMainnet", "devReference"] as const;
const DIVIDER_BEFORE = ["security", "smartContracts", "guide", "devTestnet", "tokenomics", "faq"];

export default function Sidebar({ open, onClose }: Props) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const devSections = NAV.filter((s) => (DEV_KEYS as readonly string[]).includes(s.key));
  const regularSections = NAV.filter((s) => !(DEV_KEYS as readonly string[]).includes(s.key));

  function renderItem(item: { key: string; href: string }) {
    const isActive = location === item.href || location.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={isMobile ? onClose : undefined}
        style={{
          display: "block",
          padding: "0.35rem 1.5rem",
          fontSize: "0.875rem",
          fontWeight: isActive ? 600 : 400,
          color: isActive ? "hsl(var(--foreground))" : "hsl(var(--sidebar-fg))",
          textDecoration: "none",
          borderLeft: isActive
            ? "2px solid hsl(var(--foreground))"
            : "2px solid transparent",
          background: isActive ? "hsl(var(--muted))" : "transparent",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {t.nav.items[item.key as keyof typeof t.nav.items]}
      </Link>
    );
  }

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
              src="/qryptum-logo.png"
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <div style={{ padding: "1rem 0 2rem", flex: 1, overflowY: "auto" }}>

        {/* Regular sections */}
        {regularSections.map((section) => {
          const isDivider = DIVIDER_BEFORE.includes(section.key);
          return (
            <div key={section.key}>
              {isDivider && (
                <div
                  style={{
                    height: "1px",
                    background: "hsl(var(--sidebar-border))",
                    margin: "0.75rem 1.25rem",
                  }}
                />
              )}
              <div
                style={{
                  padding: "0.5rem 1.5rem 0.35rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "hsl(var(--foreground))",
                  textTransform: "uppercase",
                }}
              >
                {t.nav.sections[section.key as keyof typeof t.nav.sections]}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                {section.items.map((item) => renderItem(item))}
              </div>
            </div>
          );
        })}

        {/* Developer super-section */}
        <div>
          <div
            style={{
              height: "1px",
              background: "hsl(var(--sidebar-border))",
              margin: "0.75rem 1.25rem",
            }}
          />
          <div
            style={{
              padding: "0.5rem 1.5rem 0.35rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "hsl(var(--foreground))", flexShrink: 0 }}>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "hsl(var(--foreground))",
                textTransform: "uppercase",
              }}
            >
              Developer
            </span>
          </div>

          {devSections.map((section) => (
            <div key={section.key} style={{ marginBottom: "0.25rem" }}>
              <div
                style={{
                  padding: "0.4rem 1.5rem 0.2rem 2rem",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "hsl(var(--muted-fg))",
                }}
              >
                {t.nav.sections[section.key as keyof typeof t.nav.sections]}
              </div>
              {section.items.map((item) => {
                const isActive = location === item.href || location.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={isMobile ? onClose : undefined}
                    style={{
                      display: "block",
                      padding: "0.35rem 1.5rem 0.35rem 2.5rem",
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "hsl(var(--foreground))" : "hsl(var(--sidebar-fg))",
                      textDecoration: "none",
                      borderLeft: isActive
                        ? "2px solid hsl(var(--foreground))"
                        : "2px solid transparent",
                      background: isActive ? "hsl(var(--muted))" : "transparent",
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    {t.nav.items[item.key as keyof typeof t.nav.items]}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

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
