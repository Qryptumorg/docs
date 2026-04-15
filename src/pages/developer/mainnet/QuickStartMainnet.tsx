import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f";
const IMPL    = "0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4";

const content = {
  en: {
    badge: "Ethereum Mainnet · Chain ID 1",
    title: "Quick Start - Mainnet",
    intro: "Integrate QryptSafeFactory on Ethereum mainnet to give your users real, production-grade privacy vaults. The flow is identical to Sepolia - only the factory address and function names differ.",
    whatYouBuild: "What you'll integrate",
    features: [
      "Let users create a personal QryptSafe vault on Ethereum mainnet",
      "Deposit real ERC-20 tokens (USDC, USDT, WETH, etc.) into the vault",
      "Withdraw tokens back with a fresh OTP proof",
      "Send tokens privately to another address",
      "Shield into Railgun via enterRailgun() for zk-proof anonymity",
    ],
    h2Install: "1. Install",
    h2Addresses: "2. Contract Addresses",
    factoryLabel: "Factory",
    implLabel: "Implementation",
    h2Setup: "3. Connect to the Factory",
    h2DiffNote: "Difference from Testnet",
    diffNote: "Mainnet uses capitalized function names (Qrypt, unQrypt, enterRailgun, mintOffToken, reclaimOffToken). The factory ABI and vault creation flow are identical.",
    h2CheckVault: "4. Check if the User Has a Vault",
    h2CreateVault: "5. Create a Vault",
    h2Deposit: "6. Deposit Tokens (Qrypt)",
    depositNote: "On mainnet, the function is Qrypt() (capital Q). Approve the vault first, then call Qrypt.",
    h2Withdraw: "7. Withdraw Tokens (unQrypt)",
    h2Next: "Next Steps",
    nextSteps: [
      "See the Mainnet Integration Guide for private transfers and QryptShield",
      "See the Mainnet ABI Reference for all function signatures",
      "See Commit-Reveal Flow for the two-step transfer deep dive",
    ],
    calloutMainnet: "You are working with real assets. Test your integration thoroughly on Sepolia before going to mainnet.",
    calloutOtp: "Never log or transmit the OTP seed. It must stay in the user's browser session only.",
  },
  ru: {
    badge: "Основная сеть Ethereum · Chain ID 1",
    title: "Быстрый старт - Основная сеть",
    intro: "Интегрируйте QryptSafeFactory в основной сети Ethereum, чтобы дать пользователям настоящие хранилища производственного уровня. Процесс идентичен Sepolia - отличаются только адрес фабрики и имена функций.",
    whatYouBuild: "Что вы интегрируете",
    features: [
      "Создание личного хранилища QryptSafe в основной сети Ethereum",
      "Депозит реальных ERC-20 токенов (USDC, USDT, WETH и др.)",
      "Вывод токенов с использованием нового OTP-доказательства",
      "Приватная отправка токенов другому адресу",
      "Экранирование в Railgun через enterRailgun() для zk-анонимности",
    ],
    h2Install: "1. Установка",
    h2Addresses: "2. Адреса контрактов",
    factoryLabel: "Фабрика",
    implLabel: "Реализация",
    h2Setup: "3. Подключение к фабрике",
    h2DiffNote: "Отличие от тестнета",
    diffNote: "В основной сети используются заглавные имена функций (Qrypt, unQrypt, enterRailgun, mintOffToken, reclaimOffToken). ABI фабрики и процесс создания хранилища идентичны.",
    h2CheckVault: "4. Проверка наличия хранилища",
    h2CreateVault: "5. Создание хранилища",
    h2Deposit: "6. Внесение токенов (Qrypt)",
    depositNote: "В основной сети функция называется Qrypt() (с заглавной буквы). Сначала одобрите хранилище, затем вызовите Qrypt.",
    h2Withdraw: "7. Вывод токенов (unQrypt)",
    h2Next: "Следующие шаги",
    nextSteps: [
      "Смотрите Руководство по интеграции основной сети для приватных переводов и QryptShield",
      "Смотрите Справочник ABI основной сети для всех сигнатур функций",
      "Смотрите Схему Commit-Reveal для подробного разбора двухэтапного перевода",
    ],
    calloutMainnet: "Вы работаете с реальными активами. Тщательно протестируйте интеграцию на Sepolia перед переходом в основную сеть.",
    calloutOtp: "Никогда не логируйте и не передавайте OTP-сид. Он должен оставаться только в сеансе браузера пользователя.",
  },
  zh: {
    badge: "以太坊主网 · Chain ID 1",
    title: "快速入门 - 主网",
    intro: "在以太坊主网上集成 QryptSafeFactory，为用户提供真实的生产级隐私保险库。流程与 Sepolia 完全相同--只有工厂地址和函数名称不同。",
    whatYouBuild: "你将集成的内容",
    features: [
      "让用户在以太坊主网上创建个人 QryptSafe 保险库",
      "存入真实 ERC-20 代币（USDC、USDT、WETH 等）",
      "使用新的 OTP 证明提取代币",
      "私密地将代币发送给其他地址",
      "通过 enterRailgun() 存入 Railgun，实现 zk-proof 匿名",
    ],
    h2Install: "1. 安装",
    h2Addresses: "2. 合约地址",
    factoryLabel: "工厂合约",
    implLabel: "实现合约",
    h2Setup: "3. 连接工厂",
    h2DiffNote: "与测试网的区别",
    diffNote: "主网使用大写函数名（Qrypt、unQrypt、enterRailgun、mintOffToken、reclaimOffToken）。工厂 ABI 和保险库创建流程完全相同。",
    h2CheckVault: "4. 检查用户是否有保险库",
    h2CreateVault: "5. 创建保险库",
    h2Deposit: "6. 存入代币（Qrypt）",
    depositNote: "在主网上，函数名为 Qrypt()（大写 Q）。先授权保险库，然后调用 Qrypt。",
    h2Withdraw: "7. 提取代币（unQrypt）",
    h2Next: "后续步骤",
    nextSteps: [
      "查看主网集成指南了解私密转账和 QryptShield",
      "查看主网 ABI 参考了解所有函数签名",
      "查看提交-揭示流程深入了解两步转账",
    ],
    calloutMainnet: "你正在使用真实资产。在进入主网前，请在 Sepolia 上彻底测试你的集成。",
    calloutOtp: "永远不要记录或传输 OTP 种子。它必须只保留在用户的浏览器会话中。",
  },
};

function NetworkBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block", boxShadow: "0 0 6px #f59e0b" }} />
      <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", color: "#fbbf24" }}>ETHEREUM MAINNET · CHAIN ID 1</span>
    </div>
  );
}

function IntegrationFlow({ lang }: { lang: "en" | "ru" | "zh" }) {
  const labels = {
    en:  ["Your dApp", "QryptSafeFactory", "User's QryptSafe", "ERC-20 Tokens"],
    ru:  ["Ваш dApp", "QryptSafeFactory", "QryptSafe пользователя", "ERC-20 токены"],
    zh:  ["你的 dApp", "QryptSafeFactory", "用户 QryptSafe", "ERC-20 代币"],
  }[lang];
  const steps = {
    en:  ["calls createQryptSafe()", "deploys vault clone", "holds shielded tokens"],
    ru:  ["вызывает createQryptSafe()", "деплоит клон хранилища", "хранит защищённые токены"],
    zh:  ["调用 createQryptSafe()", "部署保险库克隆", "持有存入代币"],
  }[lang];
  return (
    <div style={{ margin: "1.75rem 0", padding: "1.5rem", borderRadius: 12, background: "linear-gradient(135deg,rgba(15,23,42,0.9) 0%,rgba(15,23,42,0.7) 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <svg viewBox="0 0 680 110" style={{ width: "100%", maxWidth: 680, display: "block", margin: "0 auto" }}>
        {[0,1,2,3].map((i) => (
          <rect key={i} x={i*170+10} y={30} width={130} height={50} rx={8}
            fill={i===0?"rgba(139,92,246,0.15)":i===1?"rgba(245,158,11,0.15)":i===2?"rgba(16,185,129,0.15)":"rgba(59,130,246,0.12)"}
            stroke={i===0?"rgba(139,92,246,0.5)":i===1?"rgba(245,158,11,0.5)":i===2?"rgba(16,185,129,0.5)":"rgba(59,130,246,0.4)"}
            strokeWidth={1.5} />
        ))}
        {labels.map((label, i) => (
          <text key={i} x={i*170+75} y={60} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={9} fontWeight="600" fontFamily="system-ui,sans-serif">{label}</text>
        ))}
        {[0,1,2].map((i) => (
          <g key={i}>
            <line x1={i*170+142} y1={55} x2={i*170+168} y2={55} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} markerEnd="url(#arr2)" />
            <text x={i*170+155} y={48} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={7} fontFamily="system-ui,sans-serif">{steps[i]}</text>
          </g>
        ))}
        <defs>
          <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.25)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function AddrBox({ label, addr, url }: { label: string; addr: string; url: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", marginBottom: 8 }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fbbf24", minWidth: 90, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <code style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", flex: 1, wordBreak: "break-all" }}>{addr}</code>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#fbbf24", textDecoration: "none", whiteSpace: "nowrap" }}>Etherscan ↗</a>
    </div>
  );
}

function DiffBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ margin: "1.25rem 0", padding: "1rem 1.25rem", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fbbf24", marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "rgba(245,158,11,0.8)", color: "#fff", fontSize: "0.8rem", fontWeight: 700, marginRight: 8, verticalAlign: "middle", flexShrink: 0 }}>{n}</span>
  );
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.25rem" }}>
      <div style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{filename}</div>
      <pre style={{ margin: 0, padding: "1rem", overflowX: "auto", background: "rgba(0,0,0,0.3)" }}><code>{code}</code></pre>
    </div>
  );
}

export default function MainnetQuickStart() {
  const { lang, t } = useLanguage();
  const c = content[lang];

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.devMainnet}
        </span>
      </div>
      <NetworkBadge />
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.5rem" }}>{c.intro}</p>

      <div className="callout callout-warning">{c.calloutMainnet}</div>

      <h2>{c.whatYouBuild}</h2>
      <IntegrationFlow lang={lang} />
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>

      <h2><StepBadge n={1} />{c.h2Install}</h2>
      <CodeBlock filename="terminal" code={`npm install ethers\n# or\nnpm install viem`} />

      <h2><StepBadge n={2} />{c.h2Addresses}</h2>
      <AddrBox label={c.factoryLabel} addr={FACTORY} url={`https://etherscan.io/address/${FACTORY}#code`} />
      <AddrBox label={c.implLabel} addr={IMPL} url={`https://etherscan.io/address/${IMPL}#code`} />

      <DiffBox title={c.h2DiffNote}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>{c.diffNote}</p>
        <table style={{ marginTop: 10, marginBottom: 0 }}>
          <thead><tr><th>Sepolia</th><th>Mainnet</th></tr></thead>
          <tbody>
            <tr><td><code>qrypt()</code></td><td><code>Qrypt()</code></td></tr>
            <tr><td><code>unqrypt()</code></td><td><code>unQrypt()</code></td></tr>
            <tr><td><code>railgun()</code></td><td><code>enterRailgun()</code></td></tr>
            <tr><td><code>fundAirBags()</code></td><td><code>mintOffToken()</code></td></tr>
            <tr><td><code>reclaimAirBags()</code></td><td><code>reclaimOffToken()</code></td></tr>
          </tbody>
        </table>
      </DiffBox>

      <h2><StepBadge n={3} />{c.h2Setup}</h2>
      <CodeBlock filename="qryptsafe-mainnet.ts" code={`import { ethers } from "ethers";

const FACTORY_MAINNET = "${FACTORY}";

const FACTORY_ABI = [
  "function hasQryptSafe(address user) view returns (bool)",
  "function getQryptSafe(address user) view returns (address)",
  "function createQryptSafe(bytes32 initialChainHead) returns (address)",
  "event QryptSafeCreated(address indexed owner, address indexed vault)",
];

const provider = new ethers.BrowserProvider(window.ethereum);
const signer   = await provider.getSigner();

// Make sure user is on mainnet (chainId 1)
const { chainId } = await provider.getNetwork();
if (Number(chainId) !== 1) throw new Error("Switch to Ethereum mainnet");

const factory = new ethers.Contract(FACTORY_MAINNET, FACTORY_ABI, signer);`} />

      <h2><StepBadge n={4} />{c.h2CheckVault}</h2>
      <CodeBlock filename="qryptsafe-mainnet.ts" code={`const userAddress = await signer.getAddress();
const hasVault    = await factory.hasQryptSafe(userAddress);

if (hasVault) {
  const vaultAddress = await factory.getQryptSafe(userAddress);
  console.log("Vault:", vaultAddress);
}`} />

      <h2><StepBadge n={5} />{c.h2CreateVault}</h2>
      <div className="callout callout-warning">{c.calloutOtp}</div>
      <CodeBlock filename="qryptsafe-mainnet.ts" code={`function deriveChain(seed: string): string[] {
  const chain: string[] = [];
  chain[0] = ethers.keccak256(ethers.toUtf8Bytes(seed));
  for (let i = 1; i < 100; i++) chain[i] = ethers.keccak256(chain[i - 1]);
  return chain; // chain[99] = H100 (initialChainHead)
}

const chain             = deriveChain(userSeed);
const initialChainHead  = chain[99];

const tx      = await factory.createQryptSafe(initialChainHead);
const receipt = await tx.wait();
const vaultAddress = await factory.getQryptSafe(userAddress);`} />

      <h2><StepBadge n={6} />{c.h2Deposit}</h2>
      <p>{c.depositNote}</p>
      <CodeBlock filename="qryptsafe-mainnet.ts" code={`const VAULT_ABI = [
  // Mainnet: capital Q
  "function Qrypt(address token, uint256 amount, bytes32 proofHash) external",
];
const ERC20_ABI = ["function approve(address, uint256) returns (bool)"];

const vault = new ethers.Contract(vaultAddress, VAULT_ABI, signer);
const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

const amount = ethers.parseUnits("100", 6); // 100 USDC

// Step 1: approve
await (await token.approve(vaultAddress, amount)).wait();

// Step 2: deposit (Qrypt - capital Q on mainnet)
const proof = chain[98]; // H99 for the first call
await (await vault.Qrypt(tokenAddress, amount, proof)).wait();`} />

      <h2><StepBadge n={7} />{c.h2Withdraw}</h2>
      <CodeBlock filename="qryptsafe-mainnet.ts" code={`const VAULT_WITHDRAW_ABI = [
  // Mainnet: unQrypt (capital Q)
  "function unQrypt(address token, uint256 amount, bytes32 proofHash) external",
];
const vault = new ethers.Contract(vaultAddress, VAULT_WITHDRAW_ABI, signer);

const proof = chain[97]; // H98 (next link after H99 was used)
await (await vault.unQrypt(tokenAddress, amount, proof)).wait();`} />

      <h2>{c.h2Next}</h2>
      <ul>{c.nextSteps.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </div>
  );
}
