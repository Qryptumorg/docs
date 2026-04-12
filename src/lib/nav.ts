import type { TranslationSet } from "./translations";

export interface NavItem {
    key: keyof TranslationSet["nav"]["items"];
    href: string;
}

export interface NavSection {
    key: keyof TranslationSet["nav"]["sections"];
    items: NavItem[];
}

export const NAV: NavSection[] = [
    {
        key: "introduction",
        items: [
            { key: "overview", href: "/introduction/overview" },
            { key: "whyQryptum", href: "/introduction/why-qryptum" },
            { key: "howItWorks", href: "/introduction/how-it-works" },
        ],
    },
    {
        key: "security",
        items: [
            { key: "securityModel", href: "/security/security-model" },
            { key: "nonCustodial", href: "/security/non-custodial" },
            { key: "tokenProtection", href: "/security/token-protection" },
            { key: "postQuantum", href: "/security/post-quantum" },
            { key: "contractVerification", href: "/security/contract-verification" },
        ],
    },
    {
        key: "smartContracts",
        items: [
            { key: "deployedAddresses", href: "/contracts/deployed-addresses" },
            { key: "shieldFactory", href: "/contracts/shield-factory" },
            { key: "personalVault", href: "/contracts/personal-vault" },
            { key: "qtoken", href: "/contracts/qtoken" },
            { key: "qryptSafeV2", href: "/contracts/qrypt-safe-v2" },
        ],
    },
    {
        key: "developerDocs",
        items: [
            { key: "quickStart", href: "/developer/quick-start" },
            { key: "integrationGuide", href: "/developer/integration-guide" },
            { key: "apiReference", href: "/developer/api-reference" },
            { key: "commitRevealFlow", href: "/developer/commit-reveal-flow" },
            { key: "abiReference", href: "/developer/abi-reference" },
        ],
    },
    {
        key: "faq",
        items: [
            { key: "faq", href: "/faq" },
        ],
    },
];

export function getAllItems(t: TranslationSet) {
    return NAV.flatMap((s) =>
        s.items.map((item) => ({
            title: t.nav.items[item.key],
            section: t.nav.sections[s.key],
            href: item.href,
        }))
    );
}
