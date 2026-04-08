export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    title: "Introduction",
    items: [
      { title: "Overview", href: "/introduction/overview" },
      { title: "Why Qryptum", href: "/introduction/why-qryptum" },
      { title: "How It Works", href: "/introduction/how-it-works" },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Security Model", href: "/security/security-model" },
      { title: "Non-Custodial Architecture", href: "/security/non-custodial" },
      { title: "Token Protection", href: "/security/token-protection" },
      { title: "Post-Quantum Design", href: "/security/post-quantum" },
      { title: "Contract Verification", href: "/security/contract-verification" },
    ],
  },
  {
    title: "Smart Contracts",
    items: [
      { title: "Deployed Addresses", href: "/contracts/deployed-addresses" },
      { title: "ShieldFactory", href: "/contracts/shield-factory" },
      { title: "PersonalVault", href: "/contracts/personal-vault" },
      { title: "qToken", href: "/contracts/qtoken" },
    ],
  },
  {
    title: "Developer Docs",
    items: [
      { title: "Quick Start", href: "/developer/quick-start" },
      { title: "Integration Guide", href: "/developer/integration-guide" },
      { title: "API Reference", href: "/developer/api-reference" },
      { title: "Commit-Reveal Flow", href: "/developer/commit-reveal-flow" },
      { title: "ABI Reference", href: "/developer/abi-reference" },
    ],
  },
  {
    title: "FAQ",
    items: [
      { title: "FAQ", href: "/faq" },
    ],
  },
];
