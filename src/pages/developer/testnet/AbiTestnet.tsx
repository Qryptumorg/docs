import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const IMPL    = "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3";

const content = {
  en: {
    title: "ABI Reference - Testnet (Sepolia)",
    intro: "Complete human-readable ABIs for QryptSafeFactory and PersonalQryptSafeV6 on Sepolia. These are the exact function signatures deployed on-chain.",
    h2Factory: "QryptSafeFactory ABI",
    noteFactory: "Immutable, no owner, no pause, no upgrade keys.",
    h2Vault: "PersonalQryptSafeV6 ABI (Sepolia)",
    noteVault: "Sepolia uses lowercase function names: qrypt, unqrypt, railgun, fundAirBags, reclaimAirBags.",
    h2QToken: "ShieldToken (qToken) ABI",
    noteQToken: "Non-transferable ERC-20. Transfer/approve/transferFrom always revert. Minted/burned only by the vault.",
    h2Erc20: "Minimal ERC-20 ABI (for approve calls)",
    h2Addresses: "Contract Addresses (Sepolia)",
    h2FuncTable: "Function Name Reference",
    funcTableNote: "Sepolia V6 uses lowercase names - these are frozen on-chain and will never change.",
    headers: ["Function", "Description", "OTP Required"],
    rows: [
      ["qrypt(token, amount, proof)", "Deposit tokens into vault, mint qTokens", "Yes"],
      ["unqrypt(token, amount, proof)", "Withdraw tokens from vault, burn qTokens", "Yes"],
      ["initTransfer(commitHash)", "Step 1 of private transfer - store hash", "No"],
      ["finalizeTransfer(token, to, amount, proof, nonce)", "Step 2 of private transfer - reveal & execute", "Yes (as password)"],
      ["railgun(token, amount, proof, recipient)", "Shield tokens into Railgun privacy pool", "Yes"],
      ["fundAirBags(token, amount, proof)", "Fund the AirBag budget (QryptAir)", "Yes"],
      ["reclaimAirBags(token, amount, proof)", "Reclaim AirBag budget back to vault", "Yes"],
      ["claimAirVoucher(token, to, amount, deadline, hash, sig)", "Claim a signed voucher (no OTP needed by recipient)", "No"],
      ["rechargeChain(newHead, proof)", "Set a new OTP chain head when chain is exhausted", "Yes (last link)"],
      ["emergencyWithdraw(tokens[])", "Emergency: withdraw all after delay", "No"],
    ],
  },
  ru: {
    title: "Справочник ABI - Тестнет (Sepolia)",
    intro: "Полные human-readable ABI для QryptSafeFactory и PersonalQryptSafeV6 на Sepolia. Это точные сигнатуры функций, задеплоенных on-chain.",
    h2Factory: "ABI QryptSafeFactory",
    noteFactory: "Неизменяемый, без владельца, без паузы, без ключей обновления.",
    h2Vault: "ABI PersonalQryptSafeV6 (Sepolia)",
    noteVault: "В Sepolia используются имена функций в нижнем регистре: qrypt, unqrypt, railgun, fundAirBags, reclaimAirBags.",
    h2QToken: "ABI ShieldToken (qToken)",
    noteQToken: "Непередаваемый ERC-20. Transfer/approve/transferFrom всегда откатываются. Чеканится/сжигается только хранилищем.",
    h2Erc20: "Минимальный ABI ERC-20 (для вызовов approve)",
    h2Addresses: "Адреса контрактов (Sepolia)",
    h2FuncTable: "Таблица имён функций",
    funcTableNote: "Sepolia V6 использует имена в нижнем регистре - они заморожены on-chain и никогда не изменятся.",
    headers: ["Функция", "Описание", "Требуется OTP"],
    rows: [
      ["qrypt(token, amount, proof)", "Внести токены, начеканить qTokens", "Да"],
      ["unqrypt(token, amount, proof)", "Вывести токены, сжечь qTokens", "Да"],
      ["initTransfer(commitHash)", "Шаг 1 приватного перевода - сохранить хэш", "Нет"],
      ["finalizeTransfer(token, to, amount, proof, nonce)", "Шаг 2 приватного перевода - раскрыть и выполнить", "Да (как пароль)"],
      ["railgun(token, amount, proof, recipient)", "Экранировать токены в пул Railgun", "Да"],
      ["fundAirBags(token, amount, proof)", "Пополнить бюджет AirBag (QryptAir)", "Да"],
      ["reclaimAirBags(token, amount, proof)", "Вернуть бюджет AirBag обратно", "Да"],
      ["claimAirVoucher(token, to, amount, deadline, hash, sig)", "Получить подписанный ваучер (OTP не нужен получателю)", "Нет"],
      ["rechargeChain(newHead, proof)", "Установить новую голову OTP-цепочки", "Да (последнее звено)"],
      ["emergencyWithdraw(tokens[])", "Экстренный вывод всех токенов после задержки", "Нет"],
    ],
  },
  zh: {
    title: "ABI 参考 - 测试网（Sepolia）",
    intro: "Sepolia 上 QryptSafeFactory 和 PersonalQryptSafeV6 的完整人类可读 ABI，这些是链上部署的精确函数签名。",
    h2Factory: "QryptSafeFactory ABI",
    noteFactory: "不可变，无所有者，无暂停，无升级密钥。",
    h2Vault: "PersonalQryptSafeV6 ABI（Sepolia）",
    noteVault: "Sepolia 使用小写函数名：qrypt、unqrypt、railgun、fundAirBags、reclaimAirBags。",
    h2QToken: "ShieldToken（qToken）ABI",
    noteQToken: "不可转让的 ERC-20。Transfer/approve/transferFrom 始终回滚。只能由保险库铸造/销毁。",
    h2Erc20: "最小 ERC-20 ABI（用于 approve 调用）",
    h2Addresses: "合约地址（Sepolia）",
    h2FuncTable: "函数名参考",
    funcTableNote: "Sepolia V6 使用小写名称--这些已在链上冻结，永远不会更改。",
    headers: ["函数", "描述", "需要 OTP"],
    rows: [
      ["qrypt(token, amount, proof)", "存入代币，铸造 qToken", "是"],
      ["unqrypt(token, amount, proof)", "提取代币，销毁 qToken", "是"],
      ["initTransfer(commitHash)", "私密转账第一步 - 存储哈希", "否"],
      ["finalizeTransfer(token, to, amount, proof, nonce)", "私密转账第二步 - 揭示并执行", "是（作为密码）"],
      ["railgun(token, amount, proof, recipient)", "将代币存入 Railgun 隐私池", "是"],
      ["fundAirBags(token, amount, proof)", "为 AirBag 预算充值（QryptAir）", "是"],
      ["reclaimAirBags(token, amount, proof)", "将 AirBag 预算取回保险库", "是"],
      ["claimAirVoucher(token, to, amount, deadline, hash, sig)", "领取签名凭证（接收方无需 OTP）", "否"],
      ["rechargeChain(newHead, proof)", "链耗尽时设置新 OTP 链头", "是（最后一个节点）"],
      ["emergencyWithdraw(tokens[])", "延迟后紧急提取所有代币", "否"],
    ],
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
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", marginBottom: 8 }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#60a5fa", minWidth: 100, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <code style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", flex: 1, wordBreak: "break-all" }}>{addr}</code>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#60a5fa", textDecoration: "none", whiteSpace: "nowrap" }}>Etherscan ↗</a>
    </div>
  );
}

export default function AbiTestnet() {
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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>{c.intro}</p>

      <h2>{c.h2Factory}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.noteFactory}</p>
      <CodeBlock filename="abi/factory.ts" code={`const QRYPTSAFE_FACTORY_ABI = [
  // Read
  "function hasQryptSafe(address user) external view returns (bool)",
  "function getQryptSafe(address user) external view returns (address)",
  "function implementation() external view returns (address)",

  // Write
  "function createQryptSafe(bytes32 initialChainHead) external returns (address)",

  // Events
  "event QryptSafeCreated(address indexed owner, address indexed vault)",
];`} />

      <h2>{c.h2Vault}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.noteVault}</p>
      <CodeBlock filename="abi/vault-sepolia.ts" code={`const PERSONAL_VAULT_V6_ABI = [
  // State reads
  "function owner() external view returns (address)",
  "function factory() external view returns (address)",
  "function proofChainHead() external view returns (bytes32)",
  "function getQryptedBalance(address token) external view returns (uint256)",
  "function getAirBags(address token) external view returns (uint256)",
  "function getQTokenAddress(address token) external view returns (address)",
  "function getEmergencyWithdrawAvailableBlock() external view returns (uint256)",

  // Deposit / Withdraw (Sepolia: lowercase)
  "function qrypt(address token, uint256 amount, bytes32 proofHash) external",
  "function unqrypt(address token, uint256 amount, bytes32 proofHash) external",

  // Private transfer (commit-reveal)
  "function initTransfer(bytes32 commitHash) external",
  "function finalizeTransfer(address token, address to, uint256 amount, string calldata password, uint256 nonce) external",

  // Railgun shield (Sepolia: lowercase)
  "function railgun(address token, uint256 amount, bytes32 proofHash, bytes calldata railgunRecipient) external",

  // QryptAir vouchers
  "function fundAirBags(address token, uint256 amount, bytes32 proofHash) external",
  "function reclaimAirBags(address token, uint256 amount, bytes32 proofHash) external",
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
  "event AirBagsFunded(address indexed token, uint256 amount)",
  "event AirVoucherClaimed(address indexed token, address indexed to, uint256 amount)",
  "event EmergencyWithdrawExecuted(address indexed token, uint256 amount)",
];`} />

      <h2>{c.h2QToken}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.noteQToken}</p>
      <CodeBlock filename="abi/qtoken.ts" code={`const SHIELD_TOKEN_ABI = [
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function vault() external view returns (address)",
  // transfer(), transferFrom(), approve() all revert - non-transferable
  "event Transfer(address indexed from, address indexed to, uint256 value)",
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
      <AddrBox label="Factory" addr={FACTORY} url={`https://sepolia.etherscan.io/address/${FACTORY}#code`} />
      <AddrBox label="Implementation" addr={IMPL} url={`https://sepolia.etherscan.io/address/${IMPL}#code`} />

      <h2>{c.h2FuncTable}</h2>
      <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-fg))" }}>{c.funcTableNote}</p>
      <table>
        <thead>
          <tr>{c.headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {c.rows.map(([fn, desc, otp]) => (
            <tr key={fn}>
              <td><code style={{ fontSize: "0.78rem" }}>{fn}</code></td>
              <td style={{ fontSize: "0.875rem" }}>{desc}</td>
              <td><span style={{ padding: "2px 8px", borderRadius: 4, fontSize: "0.72rem", fontWeight: 700, background: otp === "Yes" || otp === "Да" || otp === "是" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)", color: otp === "Yes" || otp === "Да" || otp === "是" ? "#34d399" : "rgba(255,255,255,0.4)" }}>{otp}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
