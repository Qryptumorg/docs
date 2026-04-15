import { useLanguage } from "@/lib/LanguageContext";

const FACTORY = "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f";

const content = {
  en: {
    title: "Integration Guide - Mainnet",
    intro: "Full integration guide for QryptSafeFactory on Ethereum mainnet: vault detection, private transfers, QryptShield (Railgun), QryptAir vouchers, and multi-chain switching.",
    h2Detect: "1. Detect Vault on Page Load",
    pDetect: "Same pattern as Sepolia - factory ABI is identical. Only the factory address changes.",
    h2ChainSwitch: "2. Multi-Chain Factory Resolver",
    pChainSwitch: "Support both Sepolia and mainnet in a single integration by resolving the factory address from chainId. This lets you test on Sepolia and ship to mainnet with the same code.",
    h2Transfer: "3. Private Transfer (Commit-Reveal)",
    pTransfer: "The commit-reveal flow is identical to Sepolia. Only the vault ABI function name for the password parameter changes - it's still called via finalizeTransfer() on both chains.",
    h2Shield: "4. QryptShield - enterRailgun()",
    pShield: "On mainnet, the function is enterRailgun() instead of railgun(). The parameters are identical.",
    h2AirBags: "5. QryptAir - mintOffToken() / reclaimOffToken()",
    pAirBags: "On mainnet, fundAirBags() is mintOffToken() and reclaimAirBags() is reclaimOffToken(). The AirBag budget lets users fund offline vouchers that recipients can claim without a vault.",
    h2Voucher: "6. Claim an AirVoucher",
    pVoucher: "Anyone can claim a signed AirVoucher - even without a QryptSafe vault. The recipient calls claimAirVoucher() directly on the vault (same function name on both chains).",
    h2ChainGuard: "7. Chain Guard for Production",
    pChainGuard: "In production, always verify chainId and reject calls if the user is on the wrong network.",
    calloutSameAbi: "The factory ABI is identical on both chains. Only the vault ABI function names differ (qrypt vs Qrypt, etc.).",
    calloutAirBags: "AirVouchers are EIP-712 signed messages. The signature is created by the vault owner and can be sent to anyone via any channel (email, QR, link).",
  },
  ru: {
    title: "Руководство по интеграции - Основная сеть",
    intro: "Полное руководство по интеграции QryptSafeFactory в основной сети Ethereum: определение хранилища, приватные переводы, QryptShield (Railgun), ваучеры QryptAir и переключение между сетями.",
    h2Detect: "1. Определение хранилища при загрузке",
    pDetect: "Тот же паттерн, что и в Sepolia - ABI фабрики идентичен. Меняется только адрес фабрики.",
    h2ChainSwitch: "2. Резолвер фабрики для нескольких сетей",
    pChainSwitch: "Поддерживайте Sepolia и основную сеть в одной интеграции, резолвя адрес фабрики по chainId. Это позволяет тестировать на Sepolia и деплоить в основную сеть с одним кодом.",
    h2Transfer: "3. Приватный перевод (Commit-Reveal)",
    pTransfer: "Механизм commit-reveal идентичен Sepolia. Меняется только имя функции ABI хранилища для пароля - finalizeTransfer() работает одинаково в обеих сетях.",
    h2Shield: "4. QryptShield - enterRailgun()",
    pShield: "В основной сети функция называется enterRailgun() вместо railgun(). Параметры идентичны.",
    h2AirBags: "5. QryptAir - mintOffToken() / reclaimOffToken()",
    pAirBags: "В основной сети fundAirBags() - это mintOffToken(), а reclaimAirBags() - reclaimOffToken(). Бюджет AirBag позволяет создавать офлайн-ваучеры, которые получатели могут использовать без хранилища.",
    h2Voucher: "6. Получение AirVoucher",
    pVoucher: "Любой может получить подписанный AirVoucher - даже без хранилища QryptSafe. Получатель вызывает claimAirVoucher() прямо на хранилище (одно имя функции в обеих сетях).",
    h2ChainGuard: "7. Защита от неверной сети в продакшене",
    pChainGuard: "В продакшене всегда проверяйте chainId и отклоняйте вызовы, если пользователь в неверной сети.",
    calloutSameAbi: "ABI фабрики одинаков в обеих сетях. Различаются только имена функций ABI хранилища (qrypt vs Qrypt и т.д.).",
    calloutAirBags: "AirVoucher - это подписанные сообщения EIP-712. Подпись создаётся владельцем хранилища и может быть передана кому угодно любым каналом (email, QR, ссылка).",
  },
  zh: {
    title: "集成指南 - 主网",
    intro: "以太坊主网 QryptSafeFactory 完整集成指南：保险库检测、私密转账、QryptShield（Railgun）、QryptAir 凭证和多链切换。",
    h2Detect: "1. 页面加载时检测保险库",
    pDetect: "与 Sepolia 模式相同--工厂 ABI 完全相同。只有工厂地址不同。",
    h2ChainSwitch: "2. 多链工厂解析器",
    pChainSwitch: "通过从 chainId 解析工厂地址，在单个集成中同时支持 Sepolia 和主网。这样你可以在 Sepolia 上测试，用同一套代码发布到主网。",
    h2Transfer: "3. 私密转账（提交-揭示）",
    pTransfer: "提交-揭示流程与 Sepolia 完全相同。只有密码参数的保险库 ABI 函数名称不同--两条链上都通过 finalizeTransfer() 调用。",
    h2Shield: "4. QryptShield - enterRailgun()",
    pShield: "在主网上，函数名为 enterRailgun() 而非 railgun()。参数完全相同。",
    h2AirBags: "5. QryptAir - mintOffToken() / reclaimOffToken()",
    pAirBags: "在主网上，fundAirBags() 是 mintOffToken()，reclaimAirBags() 是 reclaimOffToken()。AirBag 预算让用户可以创建离线凭证，接收方无需保险库即可领取。",
    h2Voucher: "6. 领取 AirVoucher",
    pVoucher: "任何人都可以领取已签名的 AirVoucher--即使没有 QryptSafe 保险库。接收方直接在保险库上调用 claimAirVoucher()（两条链上函数名相同）。",
    h2ChainGuard: "7. 生产环境链检查",
    pChainGuard: "在生产环境中，始终验证 chainId，如果用户在错误的网络上则拒绝调用。",
    calloutSameAbi: "工厂 ABI 在两条链上完全相同。只有保险库 ABI 函数名不同（qrypt vs Qrypt 等）。",
    calloutAirBags: "AirVoucher 是 EIP-712 签名消息。签名由保险库所有者创建，可通过任何渠道（邮件、二维码、链接）发送给任何人。",
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
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "rgba(245,158,11,0.8)", color: "#fff", fontSize: "0.8rem", fontWeight: 700, marginRight: 8, verticalAlign: "middle", flexShrink: 0 }}>{n}</span>
  );
}

export default function IntegrationMainnet() {
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

      <div className="callout callout-info">{c.calloutSameAbi}</div>

      <h2><StepBadge n={1} />{c.h2Detect}</h2>
      <p>{c.pDetect}</p>

      <h2><StepBadge n={2} />{c.h2ChainSwitch}</h2>
      <p>{c.pChainSwitch}</p>
      <CodeBlock filename="config/factories.ts" code={`const FACTORY_ADDRESSES: Record<number, string> = {
  1:        "${FACTORY}",        // Ethereum Mainnet
  11155111: "0xeaa722e996888b662E71aBf63d08729c6B6802F4", // Sepolia Testnet
};

export function getFactory(chainId: number): string {
  const addr = FACTORY_ADDRESSES[chainId];
  if (!addr) throw new Error(\`QryptSafeFactory not deployed on chain \${chainId}\`);
  return addr;
}`} />

      <h2><StepBadge n={3} />{c.h2Transfer}</h2>
      <p>{c.pTransfer}</p>
      <CodeBlock filename="privateTransfer.ts" code={`// Works identically on both Sepolia and mainnet
async function commitTransfer(vault: ethers.Contract, token: string, to: string, amount: bigint, proof: string) {
  const nonce      = BigInt(Math.floor(Math.random() * 1e15));
  const commitHash = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["address","address","uint256","string","uint256"],
      [token, to, amount, proof, nonce]
    )
  );
  await (await vault.initTransfer(commitHash)).wait();
  return nonce;
}

// Reveal step - same ABI on both chains
async function finalizeTransfer(vault: ethers.Contract, token: string, to: string, amount: bigint, proof: string, nonce: bigint) {
  await (await vault.finalizeTransfer(token, to, amount, proof, nonce)).wait();
}`} />

      <h2><StepBadge n={4} />{c.h2Shield}</h2>
      <p>{c.pShield}</p>
      <CodeBlock filename="qryptShield-mainnet.ts" code={`const VAULT_SHIELD_ABI = [
  // Mainnet: enterRailgun() (Sepolia uses railgun())
  "function enterRailgun(address token, uint256 amount, bytes32 proofHash, bytes calldata railgunRecipient) external",
];
const vault = new ethers.Contract(vaultAddress, VAULT_SHIELD_ABI, signer);

const proof = chain[96]; // next unused OTP link
await (await vault.enterRailgun(tokenAddress, amount, proof, railgunRecipient)).wait();`} />

      <h2><StepBadge n={5} />{c.h2AirBags}</h2>
      <p>{c.pAirBags}</p>
      <CodeBlock filename="qryptAir-mainnet.ts" code={`const VAULT_AIR_ABI = [
  // Mainnet: mintOffToken / reclaimOffToken (Sepolia: fundAirBags / reclaimAirBags)
  "function mintOffToken(address token, uint256 amount, bytes32 proofHash) external",
  "function reclaimOffToken(address token, uint256 amount, bytes32 proofHash) external",
  "function getAirBags(address token) external view returns (uint256)",
];
const vault = new ethers.Contract(vaultAddress, VAULT_AIR_ABI, signer);

// Fund 50 USDC into AirBag budget
const proof = chain[95];
await (await vault.mintOffToken(tokenAddress, ethers.parseUnits("50", 6), proof)).wait();

// Check balance
const budget = await vault.getAirBags(tokenAddress);
console.log("AirBag budget:", ethers.formatUnits(budget, 6), "USDC");`} />

      <h2><StepBadge n={6} />{c.h2Voucher}</h2>
      <p>{c.pVoucher}</p>
      <div className="callout callout-info">{c.calloutAirBags}</div>
      <CodeBlock filename="claimVoucher.ts" code={`const CLAIM_ABI = [
  // Same function name on both Sepolia and mainnet
  "function claimAirVoucher(address token, address to, uint256 amount, uint256 deadline, bytes32 voucherHash, bytes calldata sig) external",
];
const vault = new ethers.Contract(vaultAddress, CLAIM_ABI, signer);

// Recipient claims - no vault or OTP needed on their end
await (await vault.claimAirVoucher(
  tokenAddress,
  recipientAddress,
  amount,
  deadline,
  voucherHash,
  ownerSignature,
)).wait();`} />

      <h2><StepBadge n={7} />{c.h2ChainGuard}</h2>
      <p>{c.pChainGuard}</p>
      <CodeBlock filename="chainGuard.ts" code={`const SUPPORTED_CHAINS = { 1: "mainnet", 11155111: "sepolia" } as const;

async function assertSupportedChain(provider: ethers.BrowserProvider): Promise<number> {
  const { chainId } = await provider.getNetwork();
  const id = Number(chainId);
  if (!(id in SUPPORTED_CHAINS)) {
    throw new Error(
      \`Unsupported chain \${id}. Please switch to Ethereum mainnet or Sepolia testnet.\`
    );
  }
  return id;
}`} />
    </div>
  );
}
