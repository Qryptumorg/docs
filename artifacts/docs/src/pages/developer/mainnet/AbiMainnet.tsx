import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f";
const IMPL    = "0x9E73602079fCbB918D22A7a8b57C2d99F5D701b4";

const content = {
  en: {
    title: "ABI Reference - Mainnet (Ethereum)",
    intro: "Complete human-readable ABIs for QryptSafeFactory and QryptSafe on Ethereum mainnet. MIT licensed, verified on Etherscan.",
    h2Factory: "QryptSafeFactory ABI",
    noteFactory: "Identical to Sepolia. No owner, no admin keys, no pause, no upgrade path.",
    h2Vault: "QryptSafe ABI (Mainnet)",
    noteVault: "Mainnet uses capitalized names: Qrypt, unQrypt, enterRailgun, mintOffToken, reclaimOffToken.",
    h2QToken: "ShieldToken (qToken) ABI",
    h2Erc20: "Minimal ERC-20 ABI",
    h2Addresses: "Contract Addresses (Mainnet)",
    h2FuncCompare: "Mainnet vs Testnet Function Names",
    compareNote: "All other functions (initTransfer, finalizeTransfer, rechargeChain, claimAirVoucher, emergencyWithdraw) are identical on both chains.",
    headers: ["Category", "Sepolia (V6)", "Mainnet (QryptSafe)"],
    rows: [
      ["Deposit", "qrypt()", "Qrypt()"],
      ["Withdraw", "unqrypt()", "unQrypt()"],
      ["Railgun shield", "railgun()", "enterRailgun()"],
      ["Fund AirBag", "fundAirBags()", "mintOffToken()"],
      ["Reclaim AirBag", "reclaimAirBags()", "reclaimOffToken()"],
      ["Private transfer step 1", "initTransfer()", "initTransfer()"],
      ["Private transfer step 2", "finalizeTransfer()", "finalizeTransfer()"],
      ["Claim voucher", "claimAirVoucher()", "claimAirVoucher()"],
      ["Recharge OTP chain", "rechargeChain()", "rechargeChain()"],
      ["Emergency exit", "emergencyWithdraw()", "emergencyWithdraw()"],
    ],
  },
  ru: {
    title: "Справочник ABI - Основная сеть (Ethereum)",
    intro: "Полные human-readable ABI для QryptSafeFactory и QryptSafe в основной сети Ethereum. Лицензия MIT, верифицирован на Etherscan.",
    h2Factory: "ABI QryptSafeFactory",
    noteFactory: "Идентичен Sepolia. Без владельца, без admin-ключей, без паузы, без обновлений.",
    h2Vault: "ABI QryptSafe (Основная сеть)",
    noteVault: "В основной сети используются заглавные имена: Qrypt, unQrypt, enterRailgun, mintOffToken, reclaimOffToken.",
    h2QToken: "ABI ShieldToken (qToken)",
    h2Erc20: "Минимальный ABI ERC-20",
    h2Addresses: "Адреса контрактов (Основная сеть)",
    h2FuncCompare: "Имена функций: Основная сеть vs Тестнет",
    compareNote: "Все остальные функции (initTransfer, finalizeTransfer, rechargeChain, claimAirVoucher, emergencyWithdraw) идентичны в обеих сетях.",
    headers: ["Категория", "Sepolia (V6)", "Основная сеть (QryptSafe)"],
    rows: [
      ["Депозит", "qrypt()", "Qrypt()"],
      ["Вывод", "unqrypt()", "unQrypt()"],
      ["Экранирование Railgun", "railgun()", "enterRailgun()"],
      ["Пополнение AirBag", "fundAirBags()", "mintOffToken()"],
      ["Возврат AirBag", "reclaimAirBags()", "reclaimOffToken()"],
      ["Приватный перевод шаг 1", "initTransfer()", "initTransfer()"],
      ["Приватный перевод шаг 2", "finalizeTransfer()", "finalizeTransfer()"],
      ["Получение ваучера", "claimAirVoucher()", "claimAirVoucher()"],
      ["Перезарядка OTP-цепочки", "rechargeChain()", "rechargeChain()"],
      ["Экстренный выход", "emergencyWithdraw()", "emergencyWithdraw()"],
    ],
  },
  zh: {
    title: "ABI 参考 - 主网（Ethereum）",
    intro: "以太坊主网 QryptSafeFactory 和 QryptSafe 的完整人类可读 ABI。MIT 许可，已在 Etherscan 上验证。",
    h2Factory: "QryptSafeFactory ABI",
    noteFactory: "与 Sepolia 完全相同。无所有者，无管理员密钥，无暂停，无升级路径。",
    h2Vault: "QryptSafe ABI（主网）",
    noteVault: "主网使用大写名称：Qrypt、unQrypt、enterRailgun、mintOffToken、reclaimOffToken。",
    h2QToken: "ShieldToken（qToken）ABI",
    h2Erc20: "最小 ERC-20 ABI",
    h2Addresses: "合约地址（主网）",
    h2FuncCompare: "主网 vs 测试网函数名称",
    compareNote: "其他所有函数（initTransfer、finalizeTransfer、rechargeChain、claimAirVoucher、emergencyWithdraw）在两条链上完全相同。",
    headers: ["类别", "Sepolia（V6）", "主网（QryptSafe）"],
    rows: [
      ["存入", "qrypt()", "Qrypt()"],
      ["提取", "unqrypt()", "unQrypt()"],
      ["Railgun 存入", "railgun()", "enterRailgun()"],
      ["充值 AirBag", "fundAirBags()", "mintOffToken()"],
      ["取回 AirBag", "reclaimAirBags()", "reclaimOffToken()"],
      ["私密转账第一步", "initTransfer()", "initTransfer()"],
      ["私密转账第二步", "finalizeTransfer()", "finalizeTransfer()"],
      ["领取凭证", "claimAirVoucher()", "claimAirVoucher()"],
      ["补充 OTP 链", "rechargeChain()", "rechargeChain()"],
      ["紧急退出", "emergencyWithdraw()", "emergencyWithdraw()"],
    ],
  },
};

function NetworkBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block", boxShadow: "0 0 6px #f59e0b" }} />
      <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", color: "#fbbf24" }}>ETHEREUM MAINNET · CHAIN ID 1 · MIT VERIFIED</span>
    </div>
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

function AddrBox({ label, addr, url }: { label: string; addr: string; url: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", marginBottom: 8 }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fbbf24", minWidth: 100, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <code style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", flex: 1, wordBreak: "break-all" }}>{addr}</code>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#fbbf24", textDecoration: "none", whiteSpace: "nowrap" }}>Etherscan ↗</a>
    </div>
  );
}

export default function AbiMainnet() {
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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>{c.intro}</p>

      <h2>{c.h2Factory}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.noteFactory}</p>
      <CodeBlock filename="abi/factory.ts" code={`const QRYPTSAFE_FACTORY_ABI = [
  "function hasQryptSafe(address user) external view returns (bool)",
  "function getQryptSafe(address user) external view returns (address)",
  "function implementation() external view returns (address)",
  "function createQryptSafe(bytes32 initialChainHead) external returns (address)",
  "event QryptSafeCreated(address indexed owner, address indexed vault)",
];`} />

      <h2>{c.h2Vault}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.noteVault}</p>
      <CodeBlock filename="abi/vault-mainnet.ts" code={`const QRYPTSAFE_MAINNET_ABI = [
  // State reads
  "function owner() external view returns (address)",
  "function factory() external view returns (address)",
  "function proofChainHead() external view returns (bytes32)",
  "function getQryptedBalance(address token) external view returns (uint256)",
  "function getAirBags(address token) external view returns (uint256)",
  "function getQTokenAddress(address token) external view returns (address)",
  "function getEmergencyWithdrawAvailableBlock() external view returns (uint256)",

  // Deposit / Withdraw (Mainnet: capital Q)
  "function Qrypt(address token, uint256 amount, bytes32 proofHash) external",
  "function unQrypt(address token, uint256 amount, bytes32 proofHash) external",

  // Private transfer (identical to Sepolia)
  "function initTransfer(bytes32 commitHash) external",
  "function finalizeTransfer(address token, address to, uint256 amount, string calldata password, uint256 nonce) external",

  // Railgun shield (Mainnet: enterRailgun)
  "function enterRailgun(address token, uint256 amount, bytes32 proofHash, bytes calldata railgunRecipient) external",

  // QryptAir vouchers (Mainnet: mintOffToken / reclaimOffToken)
  "function mintOffToken(address token, uint256 amount, bytes32 proofHash) external",
  "function reclaimOffToken(address token, uint256 amount, bytes32 proofHash) external",
  "function claimAirVoucher(address token, address to, uint256 amount, uint256 deadline, bytes32 voucherHash, bytes calldata sig) external",

  // OTP chain management
  "function rechargeChain(bytes32 newHead, bytes32 currentProof) external",

  // Emergency
  "function emergencyWithdraw(address[] calldata tokenAddresses) external",

  // Events
  "event TokenQrypted(address indexed token, uint256 amount)",
  "event TokenUnqrypted(address indexed token, uint256 amount)",
  "event TransferInitiated(bytes32 indexed commitHash)",
  "event TransferExecuted(address indexed token, address indexed to, uint256 amount)",
  "event QTokenCreated(address indexed token, address indexed qToken)",
  "event AirBagsFunded(address indexed token, uint256 amount)",
  "event AirVoucherClaimed(address indexed token, address indexed to, uint256 amount)",
  "event EmergencyWithdrawExecuted(address indexed token, uint256 amount)",
];`} />

      <h2>{c.h2QToken}</h2>
      <CodeBlock filename="abi/qtoken.ts" code={`const SHIELD_TOKEN_ABI = [
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function vault() external view returns (address)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  // transfer(), transferFrom(), approve() always revert
];`} />

      <h2>{c.h2Erc20}</h2>
      <CodeBlock filename="abi/erc20.ts" code={`const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
];`} />

      <h2>{c.h2Addresses}</h2>
      <AddrBox label="Factory" addr={FACTORY} url={`https://etherscan.io/address/${FACTORY}#code`} />
      <AddrBox label="Implementation" addr={IMPL} url={`https://etherscan.io/address/${IMPL}#code`} />

      <h2>{c.h2FuncCompare}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.compareNote}</p>
      <table>
        <thead>
          <tr>{c.headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {c.rows.map(([cat, sepolia, mainnet]) => {
            const diff = sepolia !== mainnet;
            return (
              <tr key={cat}>
                <td style={{ fontSize: "0.875rem" }}>{cat}</td>
                <td><code style={{ fontSize: "0.78rem", color: diff ? "rgba(255,255,255,0.5)" : "inherit" }}>{sepolia}</code></td>
                <td><code style={{ fontSize: "0.78rem", color: diff ? "#fbbf24" : "inherit", fontWeight: diff ? 700 : 400 }}>{mainnet}</code></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
