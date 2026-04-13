import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import AskQryptum from "./AskQryptum";
import { getAllItems } from "@/lib/nav";
import { useLanguage } from "@/lib/LanguageContext";
import type { Language } from "@/lib/translations";
import { useIsMobile } from "@/hooks/useIsMobile";

const LANGS: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "zh", label: "ZH" },
];

interface Props {
  onMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export default function TopBar({ onMenuToggle, mobileMenuOpen }: Props) {
  const { t, lang, setLang } = useLanguage();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [, navigate] = useLocation();
  const isMobile = useIsMobile();
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const allItems = getAllItems(t);
  const results = search.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.section.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !searchRef.current?.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearch("");
      setSearchOpen(false);
      searchRef.current?.blur();
    }
    if (e.key === "Enter" && results.length > 0) {
      navigate(results[0].href);
      setSearch("");
      setSearchOpen(false);
    }
  };

  const goTo = (href: string) => {
    navigate(href);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: "hsl(var(--topbar-bg))",
          borderBottom: "1px solid hsl(var(--topbar-border))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
          zIndex: 100,
          gap: 0,
        }}
      >
        {isMobile ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, minWidth: 0, paddingLeft: "0.75rem" }}>
              <button
                onClick={onMenuToggle}
                aria-label="Toggle menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--foreground))",
                  padding: "6px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {mobileMenuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                  </svg>
                )}
              </button>

              <a
                href={import.meta.env.BASE_URL}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  textDecoration: "none",
                  color: "hsl(var(--foreground))",
                }}
              >
                <img
                  src={import.meta.env.BASE_URL + 'qryptum-logo.png'}
                  alt="Qryptum"
                  style={{ height: "28px", width: "28px", objectFit: "contain", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "hsl(var(--muted-fg))",
                    background: "hsl(var(--muted))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "4px",
                    padding: "0.1rem 0.3rem",
                    marginLeft: "4px",
                  }}
                >
                  {t.topbar.docsBadge}
                </span>
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, paddingRight: "0.75rem" }}>
              <div ref={langRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0.25rem 0.5rem",
                    background: "hsl(var(--muted))",
                    border: "1px solid hsl(var(--card-border))",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "hsl(var(--muted-fg))",
                    fontFamily: "inherit",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {lang.toUpperCase()}
                </button>
                {langOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--card-border))",
                    borderRadius: "8px",
                    overflow: "hidden",
                    minWidth: "64px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 200,
                  }}>
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.4rem 0.75rem",
                          background: lang === l.code ? "rgba(98,126,234,0.12)" : "transparent",
                          border: "none",
                          borderBottom: "1px solid hsl(var(--card-border))",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.75rem",
                          fontWeight: lang === l.code ? 600 : 400,
                          color: lang === l.code ? "#627EEA" : "hsl(var(--fg))",
                          fontFamily: "inherit",
                        }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setChatOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.3rem 0.6rem",
                  background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(124,58,237,0.1))",
                  border: "1px solid rgba(6,182,212,0.35)",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#06b6d4",
                  fontFamily: "inherit",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L4 6v5c0 4.97 3.4 9.12 8 10 4.6-.88 8-5.03 8-10V6l-8-3z" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Ask
              </button>
              <ThemeToggle />
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: "260px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1.25rem",
                  gap: "0.5rem",
                  borderRight: "1px solid hsl(var(--topbar-border))",
                  height: "56px",
                  flexShrink: 0,
                }}
              >
                <a
                  href={import.meta.env.BASE_URL}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                    textDecoration: "none",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <img
                    src={import.meta.env.BASE_URL + 'qryptum-logo.png'}
                    alt="Qryptum"
                    style={{ height: "32px", width: "32px", objectFit: "contain", flexShrink: 0 }}
                  />
                </a>
                <span
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "hsl(var(--muted-fg))",
                    background: "hsl(var(--muted))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "4px",
                    padding: "0.1rem 0.375rem",
                    flexShrink: 0,
                  }}
                >
                  {t.topbar.docsBadge}
                </span>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 2rem", position: "relative" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "520px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "hsl(var(--muted-fg))",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={handleSearchKey}
                  placeholder={t.topbar.searchPlaceholder}
                  style={{
                    width: "100%",
                    height: "34px",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.75rem",
                    background: "hsl(var(--bg))",
                    border: "1px solid hsl(var(--card-border))",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    color: "hsl(var(--fg))",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0.6rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <kbd
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "inherit",
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--card-border))",
                      borderRadius: "3px",
                      padding: "1px 4px",
                      color: "hsl(var(--muted-fg))",
                      lineHeight: 1.5,
                    }}
                  >
                    /
                  </kbd>
                </div>

                {searchOpen && results.length > 0 && (
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--card-border))",
                      borderRadius: "10px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                      zIndex: 200,
                    }}
                  >
                    {results.slice(0, 8).map((item) => (
                      <button
                        key={item.href}
                        onClick={() => goTo(item.href)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0.6rem 0.875rem",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid hsl(var(--card-border))",
                          cursor: "pointer",
                          textAlign: "left",
                          gap: "0.75rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-fg))" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--fg))", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.title}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "hsl(var(--muted-fg))", flexShrink: 0 }}>
                          {item.section}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, paddingRight: "1.25rem" }}>
              <button
                onClick={() => setChatOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.35rem 0.75rem",
                  background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(124,58,237,0.1))",
                  border: "1px solid rgba(6,182,212,0.35)",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#06b6d4",
                  fontFamily: "inherit",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L4 6v5c0 4.97 3.4 9.12 8 10 4.6-.88 8-5.03 8-10V6l-8-3z" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                {t.topbar.askBtn}
              </button>

              <div ref={langRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "0.3rem 0.6rem",
                    background: "hsl(var(--muted))",
                    border: "1px solid hsl(var(--card-border))",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "hsl(var(--muted-fg))",
                    fontFamily: "inherit",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {lang.toUpperCase()}
                </button>
                {langOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--card-border))",
                    borderRadius: "8px",
                    overflow: "hidden",
                    minWidth: "72px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 200,
                  }}>
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.5rem 0.875rem",
                          background: lang === l.code ? "rgba(98,126,234,0.12)" : "transparent",
                          border: "none",
                          borderBottom: "1px solid hsl(var(--card-border))",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.8rem",
                          fontWeight: lang === l.code ? 600 : 400,
                          color: lang === l.code ? "#627EEA" : "hsl(var(--fg))",
                          fontFamily: "inherit",
                        }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <ThemeToggle />
            </div>
          </>
        )}
      </header>

      {chatOpen && <AskQryptum onClose={() => setChatOpen(false)} />}
    </>
  );
}
