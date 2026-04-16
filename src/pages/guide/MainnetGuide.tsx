import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const content = {
  en: {
    section: "Guide",
    title: "Mainnet Guide",
    badge: "Live",
    intro: "QryptSafe V6 is live on Ethereum mainnet. Factory and implementation are deployed and Etherscan verification is in progress. Use this guide for mainnet vault operations with real assets.",
    calloutStatus: "QryptSafe is live on Ethereum mainnet. Factory: 0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f. Always test on Sepolia first.",
    tabDapp: "DApp",
    tabContract: "Call Contract",

    dapp: {
      h2WhatToExpect: "Mainnet is Live - What Changed",
      expectItems: [
        "QryptSafeV6 factory deployed on Ethereum Mainnet (chain ID 1). Factory: 0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f",
        "67/67 E2E tests passed on Sepolia before mainnet deploy. Mainnet round-trip verified.",
        "Mainnet contract addresses published above and in the app",
        "App automatically detects mainnet (chain ID 1) and routes to the correct factory",
        "Same OTP chain flow as testnet - no UX changes, identical smart contract interface",
      ],
      h2Contracts: "Mainnet Contracts",
      contractHeaders: ["Contract", "Address", "Etherscan"],
      contractRows: [
        ["QryptSafeV6 Factory", "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f", "https://etherscan.io/address/0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
        ["PersonalQryptSafeV6 Implementation", "0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4", "https://etherscan.io/address/0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4"],
      ],
      h2Security: "Mainnet Security Notes",
      securityItems: [
        "Connect with MetaMask, Trust Wallet, or any EIP-1193 wallet. Verify the network is Ethereum Mainnet (chain ID 1) before signing any vault transaction.",
        "Start with a small amount to verify the vault round-trip before moving larger balances",
        "Keep your vault proof (OTP chain seed) stored offline, separate from your seed phrase",
        "The emergency withdrawal function is available after approximately 6 months of inactivity",
      ],
      calloutTestFirst: "Always test on Sepolia first. The testnet and mainnet contracts are functionally identical. Practicing on testnet costs nothing and protects against user error on mainnet.",
      h2Timeline: "Deployment Timeline",
      timelineHeaders: ["Network", "Status", "Address"],
      timelineRows: [
        ["Sepolia testnet V6", "Live",    "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
        ["Ethereum Mainnet V6", "Live", "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
      ],
    },

    contract: {
      calloutPending: "Mainnet contracts are live. Factory: 0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f. Use Etherscan Write Contract with the same field layout as the testnet guide. Always test on Sepolia first before committing real assets.",
      h2Preview: "Call Contract on Mainnet",
      pPreview: "Use the mainnet V6 factory and vault directly on Etherscan. The field-by-field layout is the same as the testnet guide:",
      previewSteps: [
        "Factory Write Contract: createQryptSafe - field: initialChainHead (bytes32)",
        "Factory Read Contract: getQryptSafe - enter your wallet address",
        "USDC (mainnet) Write Contract: approve - fields: spender (address), value (uint256)",
        "Vault Write Contract: qrypt - fields: token (address), amount (uint256), otpProof (bytes32)",
        "Vault Write Contract: unqrypt - fields: token (address), amount (uint256), otpProof (bytes32)",
      ],
    },
  },

  ru: {
    section: "Руководство",
    title: "Руководство по основной сети",
    badge: "Активна",
    intro: "QryptSafe V6 запущен в основной сети Ethereum. Factory и реализация задеплоены, верификация на Etherscan выполняется. Используйте это руководство для операций с хранилищем в основной сети.",
    calloutStatus: "QryptSafe активен в основной сети Ethereum. Factory: 0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f. Всегда сначала тестируйте на Sepolia.",
    tabDapp: "DApp",
    tabContract: "Вызов контракта",

    dapp: {
      h2WhatToExpect: "Что ожидать при запуске основной сети",
      expectItems: [
        "Фабрика QryptSafeV6 и реализация задеплоены и верифицированы на Ethereum Mainnet (chain ID 1)",
        "Полный набор E2E-тестов повторно выполняется перед объявлением",
        "Адреса контрактов основной сети опубликованы здесь и в приложении",
        "Приложение автоматически определяет основную сеть и направляет к нужной фабрике",
        "Тот же OTP chain flow, что и в тестовой сети",
      ],
      h2Contracts: "Контракты основной сети",
      contractHeaders: ["Контракт", "Адрес", "Etherscan"],
      contractRows: [
        ["QryptSafeV6 Factory", "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f", "https://etherscan.io/address/0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
        ["PersonalQryptSafeV6 Implementation", "0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4", "https://etherscan.io/address/0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4"],
      ],
      h2Security: "Безопасность в основной сети",
      securityItems: [
        "Подключайтесь через MetaMask, Trust Wallet или любой EIP-1193 кошелёк. Перед подписью любой операции убедитесь, что выбрана сеть Ethereum Mainnet (chain ID 1).",
        "Начните с небольшой суммы, чтобы проверить цикл хранилища",
        "Храните OTP-цепочку офлайн, отдельно от сид-фразы",
        "Функция экстренного вывода доступна примерно после 6 месяцев неактивности",
      ],
      calloutTestFirst: "Всегда сначала тестируйте на Sepolia. Контракты функционально идентичны. Практика на тестовой сети ничего не стоит.",
      h2Timeline: "Хронология развёртывания",
      timelineHeaders: ["Сеть", "Статус", "Адрес"],
      timelineRows: [
        ["Sepolia testnet V6", "Активна",    "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
        ["Ethereum Mainnet V6", "Активна", "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
      ],
    },

    contract: {
      calloutPending: "Контракты основной сети активны. Factory: 0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f. Используйте Etherscan Write Contract с той же схемой полей, что и в тестовой сети. Всегда сначала тестируйте на Sepolia.",
      h2Preview: "Как будет выглядеть Вызов контракта",
      pPreview: "После запуска основной сети эта вкладка будет направлять вас по вызову фабрики и хранилища V6 напрямую на Etherscan:",
      previewSteps: [
        "Фабрика Write Contract: createQryptSafe - поле: initialChainHead (bytes32)",
        "Фабрика Read Contract: getQryptSafe - введите адрес вашего кошелька",
        "USDC (mainnet) Write Contract: approve - поля: spender (address), value (uint256)",
        "Хранилище Write Contract: qrypt - поля: token (address), amount (uint256), otpProof (bytes32)",
        "Хранилище Write Contract: unqrypt - поля: token (address), amount (uint256), otpProof (bytes32)",
      ],
    },
  },

  zh: {
    section: "指南",
    title: "主网指南",
    badge: "已上线",
    intro: "QryptSafe V6 已在以太坊主网上线。Factory 和实现已部署，Etherscan 验证进行中。使用本指南进行主网保险库操作。",
    calloutStatus: "QryptSafe 已在以太坊主网上线。Factory：0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f。始终先在 Sepolia 上测试。",
    tabDapp: "DApp",
    tabContract: "调用合约",

    dapp: {
      h2WhatToExpect: "主网上线时的预期",
      expectItems: [
        "QryptSafeV6 工厂和实现在以太坊主网（chain ID 1）上部署并验证",
        "在公告发布前，完整的 E2E 测试套件将在主网合约上重新运行",
        "主网合约地址将在此处和应用中发布",
        "应用自动检测主网并路由到正确的工厂",
        "与测试网相同的 OTP 链流程，用户体验不变",
      ],
      h2Contracts: "主网合约",
      contractHeaders: ["合约", "地址", "Etherscan"],
      contractRows: [
        ["QryptSafeV6 工厂", "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f", "https://etherscan.io/address/0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
        ["PersonalQryptSafeV6 实现", "0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4", "https://etherscan.io/address/0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4"],
      ],
      h2Security: "主网安全注意事项",
      securityItems: [
        "使用 MetaMask、Trust Wallet 或任何 EIP-1193 钱包连接。签署任何保险库交易前，请确认网络为以太坊主网（chain ID 1）。",
        "先从小额开始验证保险库的往返流程",
        "将 OTP 链（秘密种子）离线存储，与助记词分开保管",
        "紧急提款功能在约 6 个月不活跃后可用",
      ],
      calloutTestFirst: "始终先在 Sepolia 上测试。测试网和主网合约功能完全相同。在测试网上练习无需任何费用。",
      h2Timeline: "部署时间表",
      timelineHeaders: ["网络", "状态", "地址"],
      timelineRows: [
        ["Sepolia 测试网 V6", "已上线",  "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
        ["以太坊主网 V6",     "已上线",  "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f"],
      ],
    },

    contract: {
      calloutPending: "主网合约已上线。Factory：0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f。使用 Etherscan Write Contract，字段布局与测试网指南相同。始终先在 Sepolia 上测试再操作真实资产。",
      h2Preview: "调用合约标签页预览",
      pPreview: "主网上线后，本标签页将引导您在 Etherscan 上直接调用 V6 工厂和保险库：",
      previewSteps: [
        "工厂 Write Contract：createQryptSafe - 字段：initialChainHead (bytes32)",
        "工厂 Read Contract：getQryptSafe - 输入您的钱包地址",
        "USDC（主网）Write Contract：approve - 字段：spender (address)、value (uint256)",
        "保险库 Write Contract：qrypt - 字段：token (address)、amount (uint256)、otpProof (bytes32)",
        "保险库 Write Contract：unqrypt - 字段：token (address)、amount (uint256)、otpProof (bytes32)",
      ],
    },
  },
} as const;

type Lang = keyof typeof content;

export default function MainnetGuide() {
  const { lang } = useLanguage();
  const c = content[(lang as Lang) in content ? (lang as Lang) : "en"];
  const [tab, setTab] = useState<"dapp" | "contract">("dapp");
  const d = c.dapp;
  const ct = c.contract;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.4rem 1.1rem",
    borderRadius: "6px",
    border: "1px solid",
    borderColor: active ? "hsl(var(--primary, 217 91% 55%))" : "hsl(var(--border))",
    background: active ? "hsl(var(--primary, 217 91% 55%))" : "transparent",
    color: active ? "#fff" : "hsl(var(--muted-fg))",
    fontWeight: active ? 600 : 400,
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {c.section}
        </span>
      </div>
      <h1>{c.title}</h1>
      <div style={{ display: "inline-block", background: "hsl(var(--callout-warn-bg, 38 92% 92%))", color: "hsl(var(--callout-warn-fg, 38 92% 30%))", borderRadius: "0.375rem", padding: "0.125rem 0.625rem", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>
        {c.badge}
      </div>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        {c.intro}
      </p>
      <div className="callout callout-warning" style={{ marginBottom: "1.5rem" }}>{c.calloutStatus}</div>

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        <button style={tabStyle(tab === "dapp")}     onClick={() => setTab("dapp")}>{c.tabDapp}</button>
        <button style={tabStyle(tab === "contract")} onClick={() => setTab("contract")}>{c.tabContract}</button>
      </div>

      {/* DApp Tab */}
      {tab === "dapp" && (
        <>
          <h2>{d.h2WhatToExpect}</h2>
          <ul>{d.expectItems.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{d.h2Contracts}</h2>
          <table>
            <thead><tr>{d.contractHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {d.contractRows.map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  <td><code style={{ fontSize: "0.75rem" }}>{row[1]}</code></td>
                  <td>{row[2] ? <a href={row[2]} target="_blank" rel="noopener noreferrer">Etherscan</a> : <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{d.h2Timeline}</h2>
          <table>
            <thead><tr>{d.timelineHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {d.timelineRows.map(([network, status, addr], i) => (
                <tr key={i}>
                  <td>{network}</td>
                  <td>{status}</td>
                  <td>
                    {addr === "Pending" || addr === "Ожидается" || addr === "待定"
                      ? <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>{addr}</span>
                      : <code style={{ fontSize: "0.75rem" }}>{addr}</code>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{d.h2Security}</h2>
          <ul>{d.securityItems.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <div className="callout callout-info">{d.calloutTestFirst}</div>
        </>
      )}

      {/* Call Contract Tab */}
      {tab === "contract" && (
        <>
          <div className="callout callout-warning" style={{ marginBottom: "1.5rem" }}>{ct.calloutPending}</div>
          <h2>{ct.h2Preview}</h2>
          <p>{ct.pPreview}</p>
          <ul>{ct.previewSteps.map((s, i) => <li key={i}><code style={{ fontSize: "0.8rem" }}>{s}</code></li>)}</ul>
        </>
      )}
    </div>
  );
}
