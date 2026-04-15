import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const IMPL    = "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3";

const content = {
  en: {
    badge: "Sepolia Testnet · Chain ID 11155111",
    title: "Quick Start - Testnet",
    intro: "Add privacy-preserving token vaults to your dApp using the QryptSafeFactory deployed on Sepolia. No real assets needed - free ETH from faucets is enough to test the full flow.",
    whatYouBuild: "What you'll integrate",
    features: [
      "Let users create a personal QryptSafe vault tied to their wallet",
      "Deposit ERC-20 tokens into the vault (shielded, minted as qTokens)",
      "Withdraw tokens back to wallet",
      "Send tokens privately to another address via commit-reveal transfer",
    ],
    h2Install: "1. Install",
    h2Addresses: "2. Contract Addresses",
    factoryLabel: "Factory",
    implLabel: "Implementation",
    h2Setup: "3. Connect to the Factory",
    h2CheckVault: "4. Check if the User Has a Vault",
    h2CreateVault: "5. Create a Vault",
    h2OtpChain: "6. Generate the OTP Chain",
    otpNote: "Each vault requires a one-time-password chain derived from a secret seed. The chain head (H100) is stored on-chain. Every vault operation consumes one OTP link from the end of the chain. Keep the seed offline - never send it to any backend.",
    h2Deposit: "7. Deposit Tokens (qrypt)",
    depositNote: "Approve the vault first, then call qrypt. The vault pulls tokens from the user and mints qTokens (e.g. qUSDC) to the user's wallet as a receipt.",
    h2Withdraw: "8. Withdraw Tokens (unqrypt)",
    h2Next: "Next Steps",
    nextSteps: [
      "See the Integration Guide for private transfers (commit-reveal)",
      "See the ABI Reference for all function signatures",
      "See Commit-Reveal Flow for a deep dive into the two-step transfer",
    ],
    calloutFree: "Sepolia is a free testnet. Get test ETH from sepoliafaucet.com or faucet.quicknode.com/ethereum/sepolia.",
    calloutOtp: "The OTP seed must never leave the user's browser. Never log it, never send it to your server.",
  },
  ru: {
    badge: "Тестовая сеть Sepolia · Chain ID 11155111",
    title: "Быстрый старт - Тестнет",
    intro: "Добавьте приватные токен-хранилища в ваш dApp, используя QryptSafeFactory на Sepolia. Реальные активы не нужны - достаточно бесплатного тестового ETH.",
    whatYouBuild: "Что вы интегрируете",
    features: [
      "Пользователи создают личное хранилище QryptSafe, привязанное к их кошельку",
      "Вносят токены ERC-20 в хранилище (они отображаются как qTokens)",
      "Выводят токены обратно в кошелёк",
      "Отправляют токены анонимно через механизм commit-reveal",
    ],
    h2Install: "1. Установка",
    h2Addresses: "2. Адреса контрактов",
    factoryLabel: "Фабрика",
    implLabel: "Реализация",
    h2Setup: "3. Подключение к фабрике",
    h2CheckVault: "4. Проверка наличия хранилища",
    h2CreateVault: "5. Создание хранилища",
    h2OtpChain: "6. Генерация OTP-цепочки",
    otpNote: "Каждому хранилищу нужна одноразовая цепочка паролей, производная от секретного сида. Голова цепочки (H100) хранится on-chain. Каждая операция потребляет одно звено. Храните сид офлайн - никогда не отправляйте его на сервер.",
    h2Deposit: "7. Внесение токенов (qrypt)",
    depositNote: "Сначала одобрите хранилище, затем вызовите qrypt. Хранилище снимает токены с пользователя и чеканит qTokens (например qUSDC) на кошелёк пользователя в качестве квитанции.",
    h2Withdraw: "8. Вывод токенов (unqrypt)",
    h2Next: "Следующие шаги",
    nextSteps: [
      "Смотрите Руководство по интеграции для приватных переводов (commit-reveal)",
      "Смотрите Справочник ABI для всех сигнатур функций",
      "Смотрите Схему Commit-Reveal для подробного разбора двухэтапного перевода",
    ],
    calloutFree: "Sepolia - бесплатная тестовая сеть. Получите тестовый ETH на sepoliafaucet.com или faucet.quicknode.com/ethereum/sepolia.",
    calloutOtp: "OTP-сид никогда не должен покидать браузер пользователя. Не логируйте его и не отправляйте на сервер.",
  },
  zh: {
    badge: "Sepolia 测试网 · Chain ID 11155111",
    title: "快速入门 - 测试网",
    intro: "使用部署在 Sepolia 上的 QryptSafeFactory，为你的 dApp 添加隐私代币保险库。无需真实资产，使用免费测试 ETH 即可完整体验流程。",
    whatYouBuild: "你将集成的内容",
    features: [
      "让用户创建与其钱包绑定的个人 QryptSafe 保险库",
      "将 ERC-20 代币存入保险库（作为 qToken 发行）",
      "将代币提回钱包",
      "通过提交-揭示转账将代币私密发送给其他地址",
    ],
    h2Install: "1. 安装",
    h2Addresses: "2. 合约地址",
    factoryLabel: "工厂合约",
    implLabel: "实现合约",
    h2Setup: "3. 连接工厂",
    h2CheckVault: "4. 检查用户是否有保险库",
    h2CreateVault: "5. 创建保险库",
    h2OtpChain: "6. 生成 OTP 链",
    otpNote: "每个保险库需要一条从秘密种子派生的一次性密码链。链头（H100）存储在链上。每次保险库操作消耗链末尾的一个 OTP 节点。请离线保存种子，永远不要发送到任何后端。",
    h2Deposit: "7. 存入代币（qrypt）",
    depositNote: "先授权保险库，然后调用 qrypt。保险库从用户处提取代币，并将 qToken（如 qUSDC）铸造到用户钱包作为凭证。",
    h2Withdraw: "8. 提取代币（unqrypt）",
    h2Next: "后续步骤",
    nextSteps: [
      "查看集成指南了解私密转账（提交-揭示）",
      "查看 ABI 参考了解所有函数签名",
      "查看提交-揭示流程深入了解两步转账",
    ],
    calloutFree: "Sepolia 是免费测试网。在 sepoliafaucet.com 或 faucet.quicknode.com/ethereum/sepolia 获取测试 ETH。",
    calloutOtp: "OTP 种子永远不能离开用户的浏览器。不要记录它，不要将其发送到服务器。",
  },
};

function NetworkBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block", boxShadow: "0 0 6px #3b82f6" }} />
      <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", color: "#60a5fa" }}>SEPOLIA TESTNET · CHAIN ID 11155111</span>
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
        {/* boxes */}
        {[0,1,2,3].map((i) => (
          <rect key={i} x={i*170+10} y={30} width={130} height={50} rx={8}
            fill={i===0?"rgba(99,102,241,0.15)":i===1?"rgba(59,130,246,0.15)":i===2?"rgba(16,185,129,0.15)":"rgba(245,158,11,0.12)"}
            stroke={i===0?"rgba(99,102,241,0.5)":i===1?"rgba(59,130,246,0.5)":i===2?"rgba(16,185,129,0.5)":"rgba(245,158,11,0.4)"}
            strokeWidth={1.5} />
        ))}
        {/* labels */}
        {labels.map((label, i) => (
          <text key={i} x={i*170+75} y={60} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={9} fontWeight="600" fontFamily="system-ui,sans-serif">{label}</text>
        ))}
        {/* arrows */}
        {[0,1,2].map((i) => (
          <g key={i}>
            <line x1={i*170+142} y1={55} x2={i*170+168} y2={55} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} markerEnd="url(#arr)" />
            <text x={i*170+155} y={48} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={7} fontFamily="system-ui,sans-serif">{steps[i]}</text>
          </g>
        ))}
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.25)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function AddrBox({ label, addr, url }: { label: string; addr: string; url: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", marginBottom: 8 }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#60a5fa", minWidth: 90, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <code style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", flex: 1, wordBreak: "break-all" }}>{addr}</code>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#60a5fa", textDecoration: "none", whiteSpace: "nowrap" }}>Etherscan ↗</a>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "rgba(59,130,246,0.8)", color: "#fff", fontSize: "0.8rem", fontWeight: 700, marginRight: 8, verticalAlign: "middle", flexShrink: 0 }}>{n}</span>
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

export default function TestnetQuickStart() {
  const { lang, t } = useLanguage();
  const c = content[lang];

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {t.nav.sections.devTestnet}
        </span>
      </div>
      <NetworkBadge />
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.5rem" }}>{c.intro}</p>

      <div className="callout callout-info">{c.calloutFree}</div>

      <h2>{c.whatYouBuild}</h2>
      <IntegrationFlow lang={lang} />
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>

      <h2><StepBadge n={1} />{c.h2Install}</h2>
      <CodeBlock filename="terminal" code={`npm install ethers
# or
npm install viem`} />

      <h2><StepBadge n={2} />{c.h2Addresses}</h2>
      <AddrBox label={c.factoryLabel} addr={FACTORY} url={`https://sepolia.etherscan.io/address/${FACTORY}#code`} />
      <AddrBox label={c.implLabel} addr={IMPL} url={`https://sepolia.etherscan.io/address/${IMPL}#code`} />

      <h2><StepBadge n={3} />{c.h2Setup}</h2>
      <CodeBlock filename="qryptsafe.ts" code={`import { ethers } from "ethers";

const FACTORY_SEPOLIA = "${FACTORY}";

const FACTORY_ABI = [
  "function hasQryptSafe(address user) view returns (bool)",
  "function getQryptSafe(address user) view returns (address)",
  "function createQryptSafe(bytes32 initialChainHead) returns (address)",
  "event QryptSafeCreated(address indexed owner, address indexed vault)",
];

// Connect to provider (e.g. MetaMask in browser)
const provider = new ethers.BrowserProvider(window.ethereum);
const signer   = await provider.getSigner();

const factory = new ethers.Contract(FACTORY_SEPOLIA, FACTORY_ABI, signer);`} />

      <h2><StepBadge n={4} />{c.h2CheckVault}</h2>
      <CodeBlock filename="qryptsafe.ts" code={`const userAddress = await signer.getAddress();

const hasVault = await factory.hasQryptSafe(userAddress);
if (hasVault) {
  const vaultAddress = await factory.getQryptSafe(userAddress);
  console.log("Existing vault:", vaultAddress);
} else {
  console.log("No vault yet - create one first");
}`} />

      <h2><StepBadge n={5} />{c.h2CreateVault}</h2>
      <CodeBlock filename="qryptsafe.ts" code={`// Build a 100-step keccak256 OTP chain from a user secret
// (see step 6 below for full derivation)
const initialChainHead = deriveChainHead(userSeed);

const tx      = await factory.createQryptSafe(initialChainHead);
const receipt = await tx.wait();

const vaultAddress = await factory.getQryptSafe(userAddress);
console.log("Vault created at:", vaultAddress);`} />

      <h2><StepBadge n={6} />{c.h2OtpChain}</h2>
      <p>{c.otpNote}</p>
      <div className="callout callout-warning">{c.calloutOtp}</div>
      <CodeBlock filename="otp.ts" code={`// Derive a 100-link OTP chain from a secret seed string
function deriveChain(seed: string): string[] {
  const chain: string[] = [];
  chain[0] = ethers.keccak256(ethers.toUtf8Bytes(seed)); // H1
  for (let i = 1; i < 100; i++) {
    chain[i] = ethers.keccak256(chain[i - 1]);
  }
  return chain;
  // chain[99] = H100 (initialChainHead, stored on-chain)
}

function deriveChainHead(seed: string): string {
  return deriveChain(seed)[99];
}

// Consume OTP links from the end of the chain:
// 1st tx: proof = chain[98]  (H99)
// 2nd tx: proof = chain[97]  (H98)
// 3rd tx: proof = chain[96]  (H97) ... and so on`} />

      <h2><StepBadge n={7} />{c.h2Deposit}</h2>
      <p>{c.depositNote}</p>
      <CodeBlock filename="qryptsafe.ts" code={`const VAULT_ABI = [
  "function qrypt(address token, uint256 amount, bytes32 proofHash) external",
];
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
];

const vault = new ethers.Contract(vaultAddress, VAULT_ABI, signer);

// Example: deposit 10 USDC (Sepolia USDC = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238)
const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const amount = ethers.parseUnits("10", 6); // 10 USDC

const usdc = new ethers.Contract(USDC_SEPOLIA, ERC20_ABI, signer);

// Step 1: approve vault to spend tokens
await (await usdc.approve(vaultAddress, amount)).wait();

// Step 2: deposit - pass current OTP link as proofHash
const chain = deriveChain(userSeed);
const proof = chain[98]; // H99 for the first call

await (await vault.qrypt(USDC_SEPOLIA, amount, proof)).wait();
// User's wallet now holds 10 qUSDC as receipt`} />

      <h2><StepBadge n={8} />{c.h2Withdraw}</h2>
      <CodeBlock filename="qryptsafe.ts" code={`const VAULT_WITHDRAW_ABI = [
  "function unqrypt(address token, uint256 amount, bytes32 proofHash) external",
];
const vault = new ethers.Contract(vaultAddress, VAULT_WITHDRAW_ABI, signer);

const chain = deriveChain(userSeed);
const proof = chain[97]; // H98 for the second call (H99 was used in deposit)

await (await vault.unqrypt(USDC_SEPOLIA, amount, proof)).wait();
// User's wallet receives 10 USDC back, 10 qUSDC burned`} />

      <h2>{c.h2Next}</h2>
      <ul>{c.nextSteps.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </div>
  );
}
