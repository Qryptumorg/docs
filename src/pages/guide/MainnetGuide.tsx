import { useLanguage } from "@/lib/LanguageContext";

const content = {
  en: {
    section: "Guide",
    title: "Mainnet Guide",
    badge: "Coming Soon",
    intro:
      "Qryptum mainnet deployment is planned for a later phase. All current contracts are live on Sepolia testnet. This page will be updated with mainnet contract addresses, deployment date, and step-by-step mainnet usage instructions when the mainnet launch is ready.",
    calloutStatus:
      "Mainnet is not yet live. Use the Testnet Guide to explore Qryptum on Sepolia at no cost.",
    h2WhatToExpect: "What to Expect at Mainnet Launch",
    expectItems: [
      "QryptSafeV6 factory and implementation deployed and MIT-verified on Ethereum Mainnet (chain ID 1)",
      "Full E2E test suite re-run against mainnet contracts before announcement",
      "Mainnet contract addresses published here and in the app",
      "App automatically detects mainnet and routes to the correct factory",
      "Same vault proof and OTP chain flow as testnet — no changes to the UX",
    ],
    h2Contracts: "Mainnet Contracts",
    contractHeaders: ["Contract", "Address", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 Factory", "pending", ""],
      ["PersonalQryptSafeV6 Implementation", "pending", ""],
    ],
    h2Security: "Mainnet Security Notes",
    securityItems: [
      "Use a hardware wallet (Ledger, Trezor) for signing mainnet vault operations",
      "Your vault proof is visible in transaction calldata on Etherscan — this is safe because the vault proof is useless without the private key",
      "Keep your vault proof stored offline, separate from your seed phrase",
      "Start with a small amount to verify the vault round-trip before moving larger balances",
      "The emergency withdrawal function is available after 1,296,000 blocks of inactivity (approximately 6 months)",
    ],
    calloutTestFirst:
      "Always test on Sepolia first. The testnet and mainnet contracts are functionally identical. Practicing on testnet costs nothing and protects against user error on mainnet.",
    h2Timeline: "Deployment Timeline",
    timelineRows: [
      ["Sepolia testnet V6", "Live", "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
      ["Ethereum Mainnet V6", "Planned", "Pending"],
    ],
    timelineHeaders: ["Network", "Status", "Address"],
  },
  ru: {
    section: "Руководство",
    title: "Руководство по основной сети",
    badge: "Скоро",
    intro:
      "Развёртывание Qryptum в основной сети запланировано на следующий этап. Все текущие контракты работают в тестовой сети Sepolia. Эта страница будет обновлена адресами контрактов основной сети, датой развёртывания и пошаговыми инструкциями по использованию в основной сети.",
    calloutStatus:
      "Основная сеть ещё не запущена. Используйте руководство по тестовой сети для изучения Qryptum на Sepolia без затрат.",
    h2WhatToExpect: "Что ожидать при запуске основной сети",
    expectItems: [
      "Фабрика QryptSafeV6 и реализация задеплоены и верифицированы по MIT на Ethereum Mainnet (chain ID 1)",
      "Полный набор E2E-тестов повторно выполняется на контрактах основной сети перед объявлением",
      "Адреса контрактов основной сети опубликованы здесь и в приложении",
      "Приложение автоматически определяет основную сеть и направляет к нужной фабрике",
      "Тот же vault proof и OTP chain flow, что и в тестовой сети — UX не изменяется",
    ],
    h2Contracts: "Контракты основной сети",
    contractHeaders: ["Контракт", "Адрес", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 Factory", "ожидается", ""],
      ["PersonalQryptSafeV6 Implementation", "ожидается", ""],
    ],
    h2Security: "Замечания по безопасности для основной сети",
    securityItems: [
      "Используйте аппаратный кошелёк (Ledger, Trezor) для подписи операций в основной сети",
      "Vault proof виден в calldata транзакции на Etherscan — это безопасно, так как он бесполезен без приватного ключа",
      "Храните vault proof офлайн, отдельно от сид-фразы",
      "Начните с небольшой суммы, чтобы проверить цикл работы хранилища, прежде чем перемещать крупные балансы",
      "Функция экстренного вывода доступна после 1 296 000 блоков неактивности (примерно 6 месяцев)",
    ],
    calloutTestFirst:
      "Всегда сначала тестируйте на Sepolia. Контракты тестовой и основной сети функционально идентичны. Практика на тестовой сети ничего не стоит и защищает от ошибок в основной сети.",
    h2Timeline: "Хронология развёртывания",
    timelineRows: [
      ["Sepolia testnet V6", "Активна", "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
      ["Ethereum Mainnet V6", "Планируется", "Ожидается"],
    ],
    timelineHeaders: ["Сеть", "Статус", "Адрес"],
  },
  zh: {
    section: "指南",
    title: "主网指南",
    badge: "即将推出",
    intro:
      "Qryptum 主网部署计划在后续阶段进行。当前所有合约都在 Sepolia 测试网上运行。主网上线时，本页将更新主网合约地址、部署日期和主网使用的分步说明。",
    calloutStatus:
      "主网尚未上线。请使用测试网指南在 Sepolia 上免费探索 Qryptum。",
    h2WhatToExpect: "主网上线时的预期",
    expectItems: [
      "QryptSafeV6 工厂和实现在以太坊主网（chain ID 1）上部署并通过 MIT 验证",
      "在公告发布前，完整的 E2E 测试套件将在主网合约上重新运行",
      "主网合约地址将在此处和应用中发布",
      "应用自动检测主网并路由到正确的工厂",
      "与测试网相同的保险库密码和 OTP 链流程，UX 不变",
    ],
    h2Contracts: "主网合约",
    contractHeaders: ["合约", "地址", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 工厂", "待定", ""],
      ["PersonalQryptSafeV6 实现", "待定", ""],
    ],
    h2Security: "主网安全注意事项",
    securityItems: [
      "使用硬件钱包（Ledger、Trezor）签署主网保险库操作",
      "保险库密码在 Etherscan 的交易 calldata 中可见 — 这是安全的，因为没有私钥的保险库密码毫无用处",
      "将保险库密码离线存储，与助记词分开保管",
      "先从小额开始验证保险库的往返流程，再转移较大余额",
      "紧急提款功能在 1,296,000 个区块（约 6 个月）不活跃后可用",
    ],
    calloutTestFirst:
      "始终先在 Sepolia 上测试。测试网和主网合约在功能上完全相同。在测试网上练习无需任何费用，并能防止在主网上出现用户错误。",
    h2Timeline: "部署时间表",
    timelineRows: [
      ["Sepolia 测试网 V6", "已上线", "0xeaa722e996888b662E71aBf63d08729c6B6802F4"],
      ["以太坊主网 V6", "计划中", "待定"],
    ],
    timelineHeaders: ["网络", "状态", "地址"],
  },
} as const;

export default function MainnetGuide() {
  const { lang } = useLanguage();
  const c = content[lang];

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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>
      <div className="callout callout-warning">{c.calloutStatus}</div>

      <h2>{c.h2WhatToExpect}</h2>
      <ul>{c.expectItems.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Contracts}</h2>
      <table>
        <thead><tr>{c.contractHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {c.contractRows.map(([name, addr, link], i) => (
            <tr key={i}>
              <td>{name}</td>
              <td><span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>{addr}</span></td>
              <td><span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Timeline}</h2>
      <table>
        <thead><tr>{c.timelineHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {c.timelineRows.map(([network, status, addr], i) => (
            <tr key={i}>
              <td>{network}</td>
              <td>{status}</td>
              <td>{addr === "pending" || addr === "Ожидается" || addr === "待定"
                ? <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>{addr}</span>
                : <code style={{ fontSize: "0.75rem" }}>{addr}</code>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Security}</h2>
      <ul>{c.securityItems.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <div className="callout callout-info">{c.calloutTestFirst}</div>
    </div>
  );
}
