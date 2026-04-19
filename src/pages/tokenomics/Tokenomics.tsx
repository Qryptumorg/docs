import { useLanguage } from "@/lib/LanguageContext";

const allocations = {
  en: [
    {
      label: "Uniswap Liquidity",
      tokens: 78_000_000,
      pct: 78,
      color: "#22C55E",
      desc: "Deposited directly into Uniswap as protocol-owned liquidity at launch. The pool itself is the distribution mechanism: no private sale, no presale, no whitelist. QRYPT is tradeable from day one by anyone, with liquidity that belongs to the protocol rather than external market makers or temporary LPs who can exit.",
    },
    {
      label: "Core Team & Development",
      tokens: 5_000_000,
      pct: 5,
      color: "#6366f1",
      desc: "Allocated to the founding contributors who designed, built, and shipped the protocol. This covers the cryptographic design of the OTP ratchet system, smart contract development across six iterations, the application layer, API infrastructure, and all ongoing maintenance. The team does not receive tokens for promises; this reflects work already delivered.",
    },
    {
      label: "Ecosystem & Grants",
      tokens: 7_000_000,
      pct: 7,
      color: "#F59E0B",
      desc: "Reserved for developers, integrators, auditors, and builders who extend or build on top of the Qryptum protocol. This includes third-party integrations, independent security audits, open-source tooling, and community-driven development. Grants are distributed based on shipped work and verified contributions, not proposals or speculative roadmaps.",
    },
    {
      label: "Early Contributors",
      tokens: 5_000_000,
      pct: 5,
      color: "#06B6D4",
      desc: "Allocated to individuals who supported the protocol during its earliest and most uncertain stage, before any public launch or recognition. Their involvement helped shape the direction of the protocol and validated the core assumptions before the first contract was deployed.",
    },
    {
      label: "Reserve & Treasury",
      tokens: 5_000_000,
      pct: 5,
      color: "#8B5CF6",
      desc: "Reserved for future protocol needs that cannot be fully anticipated at launch: cross-chain deployment costs, emergency liquidity, formal security audits as the protocol scales, and governance infrastructure. Every expenditure from this allocation will be announced publicly before execution.",
    },
  ],
  ru: [
    {
      label: "Ликвидность Uniswap",
      tokens: 78_000_000,
      pct: 78,
      color: "#22C55E",
      desc: "Внесено напрямую в Uniswap как ликвидность протокола при запуске. Пул сам является механизмом распределения: без закрытых продаж, пресейлов и белых списков. QRYPT доступен для торговли с первого дня всем желающим, а ликвидность принадлежит протоколу, а не внешним маркет-мейкерам, которые могут выйти в любой момент.",
    },
    {
      label: "Основная команда и разработка",
      tokens: 5_000_000,
      pct: 5,
      color: "#6366f1",
      desc: "Выделено основателям, разработавшим и запустившим протокол. Охватывает криптографический дизайн системы OTP-цепочки, разработку смарт-контрактов в шести итерациях, прикладной уровень, API-инфраструктуру и текущее обслуживание. Токены отражают уже выполненную работу, а не обещания.",
    },
    {
      label: "Экосистема и гранты",
      tokens: 7_000_000,
      pct: 7,
      color: "#F59E0B",
      desc: "Зарезервировано для разработчиков, интеграторов, аудиторов и строителей, расширяющих протокол Qryptum. Включает сторонние интеграции, независимые аудиты безопасности, инструменты с открытым исходным кодом и разработку сообщества. Гранты распределяются на основе проверенных и завершённых работ, без спекулятивных аллокаций.",
    },
    {
      label: "Ранние участники",
      tokens: 5_000_000,
      pct: 5,
      color: "#06B6D4",
      desc: "Выделено тем, кто поддержал протокол на самом раннем и неопределённом этапе, до публичного запуска. Их участие помогло сформировать направление протокола и подтвердить ключевые допущения ещё до развёртывания первого контракта.",
    },
    {
      label: "Резерв и казначейство",
      tokens: 5_000_000,
      pct: 5,
      color: "#8B5CF6",
      desc: "Зарезервировано для будущих нужд протокола: затраты на кросс-чейн развёртывание, экстренная ликвидность, официальные аудиты безопасности по мере масштабирования и инфраструктура управления. Каждое расходование из этой аллокации будет объявлено публично до исполнения.",
    },
  ],
  zh: [
    {
      label: "Uniswap 流动性",
      tokens: 78_000_000,
      pct: 78,
      color: "#22C55E",
      desc: "在启动时直接存入 Uniswap 作为协议自有流动性。池子本身即为分发机制：无私募、无预售、无白名单。任何人从第一天起即可交易 QRYPT，流动性归属于协议本身，而非随时可能退出的外部做市商。",
    },
    {
      label: "核心团队与开发",
      tokens: 5_000_000,
      pct: 5,
      color: "#6366f1",
      desc: "分配给设计、构建和发布协议的核心贡献者。涵盖 OTP 棘轮系统的密码学设计、六次迭代的智能合约开发、应用层、API 基础设施及持续维护。团队所获代币反映已交付的工作，而非未来承诺。",
    },
    {
      label: "生态系统与资助",
      tokens: 7_000_000,
      pct: 7,
      color: "#F59E0B",
      desc: "为扩展或基于 Qryptum 协议构建的开发者、集成商、审计人员和建设者预留。包括第三方集成、独立安全审计、开源工具和社区驱动的开发。资助基于已交付并经过验证的贡献发放，不接受投机性申请。",
    },
    {
      label: "早期贡献者",
      tokens: 5_000_000,
      pct: 5,
      color: "#06B6D4",
      desc: "分配给在公开发布之前最早期、最不确定阶段支持协议的个人。他们的参与帮助塑造了协议方向，并在第一个合约部署之前验证了核心假设。",
    },
    {
      label: "储备与国库",
      tokens: 5_000_000,
      pct: 5,
      color: "#8B5CF6",
      desc: "为启动时无法完全预见的未来协议需求预留：跨链部署成本、紧急流动性、协议规模扩大后的正式安全审计，以及治理基础设施。每笔支出将在执行前公开公告。",
    },
  ],
};

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function DonutChart({ data }: { data: typeof allocations.en }) {
  const size = 200;
  const cx = 100;
  const cy = 100;
  const r = 70;
  const strokeW = 28;

  let cumPct = 0;
  const slices = data.map((d) => {
    const start = cumPct;
    cumPct += d.pct;
    return { ...d, start, end: cumPct };
  });

  function describeArc(startPct: number, endPct: number) {
    const gap = 0.8;
    const s = ((startPct + gap / 2) / 100) * 360 - 90;
    const e = ((endPct - gap / 2) / 100) * 360 - 90;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(s));
    const y1 = cy + r * Math.sin(toRad(s));
    const x2 = cx + r * Math.cos(toRad(e));
    const y2 = cy + r * Math.sin(toRad(e));
    const large = e - s > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s) => (
        <path
          key={s.label}
          d={describeArc(s.start, s.end)}
          fill="none"
          stroke={s.color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-fg))" fontWeight={500}>
        Total Supply
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="13" fill="hsl(var(--foreground))" fontWeight={700}>
        100,000,000
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-fg))">
        QRYPT
      </text>
    </svg>
  );
}

export default function Tokenomics() {
  const { lang } = useLanguage();
  const data = allocations[lang] ?? allocations.en;

  const title = lang === "ru" ? "Токеномика" : lang === "zh" ? "代币经济学" : "Tokenomics";
  const subtitle =
    lang === "ru"
      ? "Распределение токенов QRYPT и структура аллокации."
      : lang === "zh"
      ? "QRYPT 代币分配与分配结构。"
      : "QRYPT token distribution and allocation structure.";
  const overviewLabel = lang === "ru" ? "Обзор токена" : lang === "zh" ? "代币概览" : "Token Overview";
  const allocLabel = lang === "ru" ? "Распределение" : lang === "zh" ? "分配详情" : "Allocation";

  const overview = [
    { label: lang === "ru" ? "Название" : lang === "zh" ? "名称" : "Token Name", value: "Qryptum" },
    { label: lang === "ru" ? "Символ" : lang === "zh" ? "代号" : "Symbol", value: "QRYPT" },
    { label: lang === "ru" ? "Общий выпуск" : lang === "zh" ? "总供应量" : "Total Supply", value: "100,000,000" },
    { label: lang === "ru" ? "Сеть" : lang === "zh" ? "网络" : "Network", value: "Ethereum Mainnet" },
    { label: lang === "ru" ? "Стандарт" : lang === "zh" ? "标准" : "Standard", value: "ERC-20" },
  ];

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Tokenomics
        </span>
      </div>
      <h1>{title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        {subtitle}
      </p>

      <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>{overviewLabel}</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.75rem",
        marginBottom: "2.5rem",
      }}>
        {overview.map((row) => (
          <div key={row.label} style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.6rem",
            padding: "0.85rem 1rem",
            background: "hsl(var(--card))",
          }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))", marginBottom: "0.3rem" }}>
              {row.label}
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "hsl(var(--foreground))" }}>{row.value}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>{allocLabel}</h2>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "2rem" }}>
        <div style={{ flexShrink: 0 }}>
          <DonutChart data={data} />
        </div>
        <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: "0.6rem", justifyContent: "center" }}>
          {data.map((a) => (
            <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--foreground))" }}>{a.label}</span>
              <span style={{ fontSize: "0.8rem", color: "hsl(var(--muted-fg))", marginLeft: "auto" }}>{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.map((a) => (
          <div key={a.label} style={{
            border: `1px solid ${a.color}33`,
            borderRadius: "0.75rem",
            padding: "1.25rem 1.5rem",
            background: `${a.color}0d`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "hsl(var(--foreground))" }}>{a.label}</span>
              <span style={{
                marginLeft: "auto",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: a.color,
                background: `${a.color}22`,
                border: `1px solid ${a.color}44`,
                borderRadius: "0.3rem",
                padding: "0.1rem 0.5rem",
              }}>
                {a.pct}% &nbsp;|&nbsp; {fmt(a.tokens)} QRYPT
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.7, color: "hsl(var(--muted-fg))" }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
