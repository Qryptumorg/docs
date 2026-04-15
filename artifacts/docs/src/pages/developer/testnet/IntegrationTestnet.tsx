import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";

const content = {
  en: {
    title: "Integration Guide - Testnet",
    intro: "A full walkthrough for integrating QryptSafeFactory (Sepolia) into your dApp: vault detection, token deposits, private transfers via commit-reveal, and QryptShield (Railgun).",
    h2Detect: "1. Detect Vault on Page Load",
    pDetect: "When the user connects their wallet, check immediately whether they have a QryptSafe vault. Store the result so your UI can show 'Create Vault' or the vault dashboard.",
    h2NetworkSwitch: "2. Chain Switch Guard",
    pNetworkSwitch: "Always verify the user is on the correct chain before calling any vault function. If not, prompt them to switch.",
    h2Transfer: "3. Private Transfer (Commit-Reveal)",
    pTransfer: "Transfers use a two-step commit-reveal scheme to prevent front-running. Step 1 submits a hash (no vault proof). Step 2 - sent in the next block - reveals the proof and executes the transfer.",
    h2Shield: "4. QryptShield - Send to Railgun",
    pShield: "Shield tokens into the Railgun privacy pool directly from the vault. The user must have a Railgun shielded address (zk-SNARK recipient).",
    h2Events: "5. Listen for Events",
    pEvents: "Index vault events to build a transaction history in your dApp without polling the chain.",
    h2Multicall: "6. Read Multiple Vaults (Multicall)",
    pMulticall: "Use a multicall pattern to read vault status and shielded balances for multiple users in a single RPC call.",
    calloutPrivate: "The vault proof (OTP link) is visible in calldata after the transaction is mined. This is safe - keccak256 is a one-way function and each link can only be used once.",
    calloutRailgun: "The railgunRecipient is a Railgun shielded address - a zk-SNARK encoded bytes. Users can generate it from the Railgun SDK or the Railgun wallet app.",
  },
  ru: {
    title: "Руководство по интеграции - Тестнет",
    intro: "Полное руководство по интеграции QryptSafeFactory (Sepolia) в ваш dApp: определение хранилища, депозиты токенов, приватные переводы через commit-reveal и QryptShield (Railgun).",
    h2Detect: "1. Определение хранилища при загрузке",
    pDetect: "Когда пользователь подключает кошелёк, сразу проверяйте, есть ли у него хранилище QryptSafe. Сохраняйте результат, чтобы ваш UI мог показать 'Создать хранилище' или панель управления.",
    h2NetworkSwitch: "2. Проверка сети",
    pNetworkSwitch: "Всегда проверяйте, что пользователь находится в правильной сети, прежде чем вызывать функции хранилища.",
    h2Transfer: "3. Приватный перевод (Commit-Reveal)",
    pTransfer: "Переводы используют двухэтапную схему commit-reveal для предотвращения фронтраннинга. Шаг 1 отправляет хэш (без vault proof). Шаг 2 - в следующем блоке - раскрывает proof и выполняет перевод.",
    h2Shield: "4. QryptShield - Отправка в Railgun",
    pShield: "Отправляйте токены в пул конфиденциальности Railgun прямо из хранилища. Пользователю нужен экранированный адрес Railgun (получатель zk-SNARK).",
    h2Events: "5. Прослушивание событий",
    pEvents: "Индексируйте события хранилища для построения истории транзакций в вашем dApp.",
    h2Multicall: "6. Чтение нескольких хранилищ (Multicall)",
    pMulticall: "Используйте multicall для чтения статуса хранилища и защищённых балансов нескольких пользователей за один RPC-вызов.",
    calloutPrivate: "Vault proof (OTP-ссылка) виден в calldata после майнинга транзакции. Это безопасно - keccak256 является односторонней функцией, и каждая ссылка может быть использована только один раз.",
    calloutRailgun: "railgunRecipient - это экранированный адрес Railgun, закодированный в zk-SNARK bytes. Пользователи могут его сгенерировать через Railgun SDK или приложение Railgun.",
  },
  zh: {
    title: "集成指南 - 测试网",
    intro: "将 QryptSafeFactory（Sepolia）集成到 dApp 的完整指南：保险库检测、代币存入、通过提交-揭示的私密转账，以及 QryptShield（Railgun）。",
    h2Detect: "1. 页面加载时检测保险库",
    pDetect: "用户连接钱包时，立即检查其是否拥有 QryptSafe 保险库。存储结果以便 UI 显示'创建保险库'或保险库仪表盘。",
    h2NetworkSwitch: "2. 链切换检查",
    pNetworkSwitch: "在调用任何保险库功能前，始终验证用户在正确的链上。如果不是，提示他们切换。",
    h2Transfer: "3. 私密转账（提交-揭示）",
    pTransfer: "转账使用两步提交-揭示方案防止抢先交易。第一步提交哈希（无保险库密码）。第二步在下一个区块中揭示密码并执行转账。",
    h2Shield: "4. QryptShield - 发送到 Railgun",
    pShield: "直接从保险库将代币存入 Railgun 隐私池。用户需要有 Railgun 隐身地址（zk-SNARK 接收者）。",
    h2Events: "5. 监听事件",
    pEvents: "索引保险库事件，在 dApp 中构建交易历史，无需轮询链。",
    h2Multicall: "6. 批量读取保险库（Multicall）",
    pMulticall: "使用 multicall 模式在单个 RPC 调用中读取多个用户的保险库状态和存入余额。",
    calloutPrivate: "保险库密码（OTP 节点）在交易被打包后在 calldata 中可见。这是安全的--keccak256 是单向函数，每个节点只能使用一次。",
    calloutRailgun: "railgunRecipient 是 Railgun 隐身地址，以 zk-SNARK 编码的字节表示。用户可以通过 Railgun SDK 或 Railgun 钱包应用生成。",
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

function StepBadge({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "rgba(59,130,246,0.8)", color: "#fff", fontSize: "0.8rem", fontWeight: 700, marginRight: 8, verticalAlign: "middle", flexShrink: 0 }}>{n}</span>
  );
}

export default function IntegrationTestnet() {
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

      <h2><StepBadge n={1} />{c.h2Detect}</h2>
      <p>{c.pDetect}</p>
      <CodeBlock filename="useQryptSafe.ts" code={`import { useEffect, useState } from "react";
import { ethers } from "ethers";

const FACTORY_SEPOLIA = "${FACTORY}";
const FACTORY_ABI = [
  "function hasQryptSafe(address) view returns (bool)",
  "function getQryptSafe(address) view returns (address)",
];

export function useQryptSafe(userAddress: string | undefined) {
  const [vaultAddress, setVaultAddress] = useState<string | null>(null);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    if (!userAddress) { setLoading(false); return; }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const factory  = new ethers.Contract(FACTORY_SEPOLIA, FACTORY_ABI, provider);
    factory.hasQryptSafe(userAddress).then(async (has: boolean) => {
      setVaultAddress(has ? await factory.getQryptSafe(userAddress) : null);
      setLoading(false);
    });
  }, [userAddress]);

  return { vaultAddress, loading };
}`} />

      <h2><StepBadge n={2} />{c.h2NetworkSwitch}</h2>
      <p>{c.pNetworkSwitch}</p>
      <CodeBlock filename="chainGuard.ts" code={`const SEPOLIA_CHAIN_ID = 11155111;

async function ensureSepolia(): Promise<void> {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network  = await provider.getNetwork();
  if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // 11155111 in hex
    });
  }
}`} />

      <h2><StepBadge n={3} />{c.h2Transfer}</h2>
      <p>{c.pTransfer}</p>
      <div className="callout callout-info">{c.calloutPrivate}</div>
      <CodeBlock filename="privateTransfer.ts" code={`// Step 1: Commit - submit hash only, no vault proof in mempool
async function commitTransfer(
  vault: ethers.Contract,
  token: string,
  to: string,
  amount: bigint,
  vaultProof: string,
): Promise<{ nonce: bigint; commitHash: string }> {
  const nonce      = BigInt(Math.floor(Math.random() * 1e15));
  const commitHash = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["address","address","uint256","string","uint256"],
      [token, to, amount, vaultProof, nonce]
    )
  );
  await (await vault.initTransfer(commitHash)).wait();
  return { nonce, commitHash };
}

// Step 2: Reveal - wait for next block, then finalize
async function finalizeTransfer(
  vault: ethers.Contract,
  token: string,
  to: string,
  amount: bigint,
  vaultProof: string,
  nonce: bigint,
): Promise<void> {
  // Recommend waiting 15s or 1 block between steps
  await (await vault.finalizeTransfer(token, to, amount, vaultProof, nonce)).wait();
  // Recipient receives raw ERC-20 - not a qToken
}`} />

      <h2><StepBadge n={4} />{c.h2Shield}</h2>
      <p>{c.pShield}</p>
      <div className="callout callout-info">{c.calloutRailgun}</div>
      <CodeBlock filename="qryptShield.ts" code={`const VAULT_SHIELD_ABI = [
  // Sepolia uses lowercase: railgun()
  "function railgun(address token, uint256 amount, bytes32 proofHash, bytes calldata railgunRecipient) external",
];
const vault = new ethers.Contract(vaultAddress, VAULT_SHIELD_ABI, signer);

// railgunRecipient is a Railgun shielded address (bytes encoding)
// Generate via @railgun-community/shared-models
const proof = chain[96]; // next unused OTP link

await (await vault.railgun(
  tokenAddress,
  amount,
  proof,
  railgunRecipient
)).wait();`} />

      <h2><StepBadge n={5} />{c.h2Events}</h2>
      <p>{c.pEvents}</p>
      <CodeBlock filename="events.ts" code={`const VAULT_EVENTS_ABI = [
  "event TokenQrypted(address indexed token, uint256 amount)",
  "event TokenUnqrypted(address indexed token, uint256 amount)",
  "event TransferExecuted(address indexed token, address indexed to, uint256 amount)",
];
const vault = new ethers.Contract(vaultAddress, VAULT_EVENTS_ABI, provider);

// Listen live
vault.on("TokenQrypted", (token, amount) => {
  console.log("Deposited:", ethers.formatUnits(amount, 6), "to vault");
});

// Query history
const depositFilter = vault.filters.TokenQrypted();
const logs = await vault.queryFilter(depositFilter, -1000); // last 1000 blocks`} />

      <h2><StepBadge n={6} />{c.h2Multicall}</h2>
      <p>{c.pMulticall}</p>
      <CodeBlock filename="multicall.ts" code={`// Read hasQryptSafe for multiple users in one call using a multicall contract
// Example with ethers + Multicall3 (0xcA11bde05977b3631167028862bE2a173976CA11)
const MULTICALL3 = "0xcA11bde05977b3631167028862bE2a173976CA11";
const iface = new ethers.Interface([
  "function hasQryptSafe(address) view returns (bool)",
]);

const calls = wallets.map(w => ({
  target: FACTORY_SEPOLIA,
  allowFailure: true,
  callData: iface.encodeFunctionData("hasQryptSafe", [w]),
}));

const mc = new ethers.Contract(MULTICALL3, [
  "function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) view returns (tuple(bool success, bytes returnData)[])"
], provider);

const results = await mc.aggregate3(calls);
const vaultStatus = results.map((r: {success: boolean; returnData: string}, i: number) => ({
  wallet: wallets[i],
  hasVault: r.success ? iface.decodeFunctionResult("hasQryptSafe", r.returnData)[0] : false,
}));`} />
    </div>
  );
}
