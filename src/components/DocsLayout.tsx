import { useEffect, useState } from "react";
import { ReactNode } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { initTheme } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  children: ReactNode;
}

export default function DocsLayout({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      <TopBar
        onMenuToggle={() => setMobileMenuOpen((o) => !o)}
        mobileMenuOpen={mobileMenuOpen}
      />
      <Sidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main
        style={{
          marginLeft: isMobile ? 0 : "260px",
          marginTop: "56px",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: isMobile ? "1.5rem 1rem 4rem" : "3rem 2.5rem 5rem",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
