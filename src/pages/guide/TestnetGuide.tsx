import { useLanguage } from "@/lib/LanguageContext";

const SEPOLIA_APP = "https://qryptum.eth.limo";
const SEPOLIA_FAUCET_ALCHEMY = "https://sepoliafaucet.com";
const SEPOLIA_FAUCET_INFURA = "https://www.infura.io/faucet/sepolia";
const SEPOLIA_USDC = "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const FACTORY_V6 = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";

const content = {
  en: {
    section: "Guide",
    title: "Testnet Guide",
    badge: "Sepolia Testnet",
    intro:
      "This guide walks you through using Qryptum on Sepolia testnet. Everything here is free — no real funds are involved. Use this to explore QryptSafe, QryptAir, and QryptShield before mainnet launches.",
    calloutSepolia:
      "You are on Sepolia testnet (chain ID 11155111). All tokens are test tokens with no real value. Transactions cost Sepolia ETH, which is free from faucets.",
    h2Step1: "Step 1 — Get a Wallet",
    pStep1:
      "You need an Ethereum-compatible wallet. MetaMask, Rabby, or any WalletConnect-compatible wallet works. The wallet must support Sepolia testnet.",
    step1Items: [
      "Install MetaMask from metamask.io",
      "Create a new wallet and save your seed phrase securely",
      "Add Sepolia testnet: Settings > Networks > Add Network > Sepolia",
    ],
    h2Step2: "Step 2 — Get Sepolia ETH",
    pStep2: "You need Sepolia ETH to pay for gas. Use any of these faucets:",
    faucetHeaders: ["Faucet", "Limit", "Requirement"],
    faucetRows: [
      ["Alchemy Sepolia Faucet", "0.5 ETH / day", "Alchemy account"],
      ["Infura Sepolia Faucet", "0.5 ETH / day", "Infura account"],
      ["Chainlink Faucet", "0.1 ETH / day", "None"],
    ],
    calloutEth: "0.05 Sepolia ETH is enough for all operations in this guide.",
    h2Step3: "Step 3 — Get Sepolia USDC",
    pStep3:
      "Qryptum is tested with Sepolia USDC (Circle test token). You can mint test USDC from the Circle developer faucet or use any ERC-20 token deployed on Sepolia.",
    usdcNote:
      "The Sepolia USDC contract address is 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238. Verify on Sepolia Etherscan before use.",
    h2Step4: "Step 4 — Open the App",
    pStep4:
      "Go to the Qryptum dashboard. Connect your wallet. Make sure MetaMask is set to Sepolia — the app will show an unsupported network banner if you are on the wrong chain.",
    openAppLabel: "Open Qryptum Dashboard",
    step4Items: [
      "Connect wallet in the top right corner",
      "Confirm the chain is Sepolia (chain ID 11155111)",
      "The dashboard shows your QryptSafe status and shielded balances",
    ],
    h2Step5: "Step 5 — Create a QryptSafe",
    pStep5:
      "Each wallet gets exactly one QryptSafe. The vault is deployed via the V6 factory at the address below.",
    factoryLabel: "V6 Factory (Sepolia):",
    step5Items: [
      "Click Create QryptSafe in the dashboard",
      "Choose a vault proof: exactly 3 lowercase letters and 3 digits (example: abc123)",
      "Confirm the transaction in your wallet — this deploys your personal vault",
      "Write down your vault proof. It is never stored on any server.",
    ],
    calloutProof:
      "The vault proof is the second factor for every operation. Without it, no one — including Qryptum — can touch your shielded tokens.",
    h2Step6: "Step 6 — Qrypt a Token",
    pStep6:
      "Shielding a token moves it from your wallet into your QryptSafe vault. You approve the vault contract to pull the tokens, then call qrypt().",
    step6Items: [
      "Select a token and enter an amount in the dashboard",
      "Approve the vault contract in MetaMask (one-time per token)",
      "Enter your vault proof and confirm the qrypt transaction",
      "Your wallet receives qTokens (example: qUSDC) as non-transferable receipts",
    ],
    h2Step7: "Step 7 — Try QryptAir",
    pStep7:
      "QryptAir lets you create an EIP-712 offToken and QR code entirely offline. The recipient redeems it on-chain without any prior setup.",
    step7Items: [
      "Go to QryptAir in the dashboard",
      "Enter recipient address, token, amount, and deadline",
      "Fund the air budget (moves tokens from your shielded balance to the air budget pool)",
      "Sign the offToken with your vault proof — no internet required at signing time",
      "Share the QR code with the recipient",
      "The recipient scans and calls redeemAirVoucher() to receive the real ERC-20 token",
    ],
    h2Step8: "Step 8 — Unqrypt",
    pStep8:
      "To withdraw tokens back to your wallet, call unqrypt(). This burns your qTokens and returns the real ERC-20 tokens.",
    step8Items: [
      "Select a token and amount in the dashboard",
      "Enter your vault proof and confirm the unqrypt transaction",
      "Real ERC-20 tokens appear in your wallet",
    ],
    h2Contracts: "Active Contracts on Sepolia",
    contractHeaders: ["Contract", "Address", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 Factory", FACTORY_V6, `https://sepolia.etherscan.io/address/${FACTORY_V6}#code`],
      ["Sepolia USDC", "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", SEPOLIA_USDC],
    ],
  },
  ru: {
    section: "Руководство",
    title: "Руководство по тестовой сети",
    badge: "Sepolia Testnet",
    intro:
      "Это руководство описывает использование Qryptum в тестовой сети Sepolia. Всё здесь бесплатно — реальные средства не используются. Изучите QryptSafe, QryptAir и QryptShield до запуска в основной сети.",
    calloutSepolia:
      "Вы находитесь в тестовой сети Sepolia (chain ID 11155111). Все токены являются тестовыми и не имеют реальной ценности. Транзакции стоят Sepolia ETH, который можно получить бесплатно через фаусеты.",
    h2Step1: "Шаг 1 — Получите кошелёк",
    pStep1:
      "Вам нужен кошелёк, совместимый с Ethereum. Подходят MetaMask, Rabby или любой кошелёк с поддержкой WalletConnect. Кошелёк должен поддерживать тестовую сеть Sepolia.",
    step1Items: [
      "Установите MetaMask с metamask.io",
      "Создайте новый кошелёк и надёжно сохраните сид-фразу",
      "Добавьте тестовую сеть Sepolia: Настройки > Сети > Добавить сеть > Sepolia",
    ],
    h2Step2: "Шаг 2 — Получите Sepolia ETH",
    pStep2: "Для оплаты газа нужен Sepolia ETH. Используйте один из этих фаусетов:",
    faucetHeaders: ["Фаусет", "Лимит", "Требование"],
    faucetRows: [
      ["Alchemy Sepolia Faucet", "0.5 ETH / день", "Аккаунт Alchemy"],
      ["Infura Sepolia Faucet", "0.5 ETH / день", "Аккаунт Infura"],
      ["Chainlink Faucet", "0.1 ETH / день", "Нет"],
    ],
    calloutEth: "0.05 Sepolia ETH достаточно для всех операций в этом руководстве.",
    h2Step3: "Шаг 3 — Получите Sepolia USDC",
    pStep3:
      "Qryptum тестируется с Sepolia USDC (тестовый токен Circle). Вы можете получить тестовые USDC через фаусет Circle для разработчиков или использовать любой ERC-20 токен, задеплоенный на Sepolia.",
    usdcNote:
      "Адрес контракта Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238. Проверьте на Sepolia Etherscan перед использованием.",
    h2Step4: "Шаг 4 — Откройте приложение",
    pStep4:
      "Перейдите в дашборд Qryptum. Подключите кошелёк. Убедитесь, что MetaMask переключён на Sepolia — в противном случае приложение покажет баннер о неподдерживаемой сети.",
    openAppLabel: "Открыть дашборд Qryptum",
    step4Items: [
      "Подключите кошелёк в правом верхнем углу",
      "Убедитесь, что выбрана сеть Sepolia (chain ID 11155111)",
      "Дашборд показывает статус QryptSafe и защищённые балансы",
    ],
    h2Step5: "Шаг 5 — Создайте QryptSafe",
    pStep5:
      "У каждого кошелька ровно один QryptSafe. Хранилище деплоится через фабрику V6 по адресу ниже.",
    factoryLabel: "Фабрика V6 (Sepolia):",
    step5Items: [
      "Нажмите Create QryptSafe в дашборде",
      "Выберите vault proof: ровно 3 строчные буквы и 3 цифры (пример: abc123)",
      "Подтвердите транзакцию в кошельке — это деплоит ваше личное хранилище",
      "Запишите vault proof. Он никогда не сохраняется ни на каком сервере.",
    ],
    calloutProof:
      "Vault proof является вторым фактором для каждой операции. Без него никто, включая Qryptum, не может трогать ваши защищённые токены.",
    h2Step6: "Шаг 6 — Qrypt токен",
    pStep6:
      "Шилдинг токена перемещает его из вашего кошелька в хранилище QryptSafe. Вы разрешаете контракту хранилища использовать токены, затем вызываете qrypt().",
    step6Items: [
      "Выберите токен и введите сумму в дашборде",
      "Одобрите контракт хранилища в MetaMask (один раз для каждого токена)",
      "Введите vault proof и подтвердите транзакцию qrypt",
      "В вашем кошельке появятся qToken (например qUSDC) — непередаваемые квитанции",
    ],
    h2Step7: "Шаг 7 — Попробуйте QryptAir",
    pStep7:
      "QryptAir позволяет создать offToken по стандарту EIP-712 и QR-код полностью офлайн. Получатель активирует его on-chain без каких-либо предварительных настроек.",
    step7Items: [
      "Перейдите в раздел QryptAir в дашборде",
      "Введите адрес получателя, токен, сумму и дедлайн",
      "Пополните бюджет air (перемещает токены из защищённого баланса в пул air)",
      "Подпишите offToken с vault proof — интернет при подписи не требуется",
      "Поделитесь QR-кодом с получателем",
      "Получатель сканирует и вызывает redeemAirVoucher() для получения реального токена",
    ],
    h2Step8: "Шаг 8 — Unqrypt",
    pStep8:
      "Для вывода токенов обратно в кошелёк вызовите unqrypt(). Это сжигает ваши qToken и возвращает реальные ERC-20 токены.",
    step8Items: [
      "Выберите токен и сумму в дашборде",
      "Введите vault proof и подтвердите транзакцию unqrypt",
      "Реальные токены ERC-20 появятся в вашем кошельке",
    ],
    h2Contracts: "Активные контракты на Sepolia",
    contractHeaders: ["Контракт", "Адрес", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 Factory", FACTORY_V6, `https://sepolia.etherscan.io/address/${FACTORY_V6}#code`],
      ["Sepolia USDC", "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", SEPOLIA_USDC],
    ],
  },
  zh: {
    section: "指南",
    title: "测试网指南",
    badge: "Sepolia 测试网",
    intro:
      "本指南带您了解如何在 Sepolia 测试网上使用 Qryptum。这里的一切都是免费的，不涉及真实资金。在主网上线之前，先通过此方式探索 QryptSafe、QryptAir 和 QryptShield。",
    calloutSepolia:
      "您正在 Sepolia 测试网（chain ID 11155111）上。所有代币都是没有真实价值的测试代币。交易需要 Sepolia ETH，可从水龙头免费获取。",
    h2Step1: "第一步 — 获取钱包",
    pStep1:
      "您需要一个兼容以太坊的钱包。MetaMask、Rabby 或任何支持 WalletConnect 的钱包均可使用。钱包必须支持 Sepolia 测试网。",
    step1Items: [
      "从 metamask.io 安装 MetaMask",
      "创建新钱包并安全保存助记词",
      "添加 Sepolia 测试网：设置 > 网络 > 添加网络 > Sepolia",
    ],
    h2Step2: "第二步 — 获取 Sepolia ETH",
    pStep2: "您需要 Sepolia ETH 来支付 gas 费。使用以下任一水龙头：",
    faucetHeaders: ["水龙头", "限额", "要求"],
    faucetRows: [
      ["Alchemy Sepolia 水龙头", "0.5 ETH / 天", "Alchemy 账户"],
      ["Infura Sepolia 水龙头", "0.5 ETH / 天", "Infura 账户"],
      ["Chainlink 水龙头", "0.1 ETH / 天", "无"],
    ],
    calloutEth: "0.05 Sepolia ETH 足够完成本指南中的所有操作。",
    h2Step3: "第三步 — 获取 Sepolia USDC",
    pStep3:
      "Qryptum 使用 Sepolia USDC（Circle 测试代币）进行测试。您可以从 Circle 开发者水龙头铸造测试 USDC，或使用任何部署在 Sepolia 上的 ERC-20 代币。",
    usdcNote:
      "Sepolia USDC 合约地址为 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238。使用前请在 Sepolia Etherscan 上验证。",
    h2Step4: "第四步 — 打开应用",
    pStep4:
      "前往 Qryptum 仪表板。连接您的钱包。确保 MetaMask 已切换到 Sepolia — 如果链错误，应用将显示不支持网络的横幅。",
    openAppLabel: "打开 Qryptum 仪表板",
    step4Items: [
      "在右上角连接钱包",
      "确认链为 Sepolia（chain ID 11155111）",
      "仪表板显示您的 QryptSafe 状态和屏蔽余额",
    ],
    h2Step5: "第五步 — 创建 QryptSafe",
    pStep5:
      "每个钱包只有一个 QryptSafe。保险库通过以下地址的 V6 工厂合约部署。",
    factoryLabel: "V6 工厂（Sepolia）：",
    step5Items: [
      "在仪表板中点击 Create QryptSafe",
      "选择保险库密码：恰好 3 个小写字母和 3 个数字（例如：abc123）",
      "在钱包中确认交易 — 这将部署您的个人保险库",
      "记下您的保险库密码。它永远不会存储在任何服务器上。",
    ],
    calloutProof:
      "保险库密码是每次操作的第二因素。没有它，任何人（包括 Qryptum）都无法触动您的屏蔽代币。",
    h2Step6: "第六步 — Qrypt 代币",
    pStep6:
      "屏蔽代币会将其从您的钱包移入 QryptSafe 保险库。您授权保险库合约提取代币，然后调用 qrypt()。",
    step6Items: [
      "在仪表板中选择代币并输入金额",
      "在 MetaMask 中批准保险库合约（每个代币只需一次）",
      "输入保险库密码并确认 qrypt 交易",
      "您的钱包将收到 qToken（例如 qUSDC）作为不可转让的凭证",
    ],
    h2Step7: "第七步 — 尝试 QryptAir",
    pStep7:
      "QryptAir 允许您完全离线创建 EIP-712 offToken 和二维码。接收方在链上兑换，无需任何预先设置。",
    step7Items: [
      "在仪表板中进入 QryptAir",
      "输入接收方地址、代币、金额和截止时间",
      "为 air 预算充值（将代币从屏蔽余额移至 air 预算池）",
      "用保险库密码签署 offToken — 签署时不需要网络连接",
      "与接收方分享二维码",
      "接收方扫描并调用 redeemAirVoucher() 接收真实 ERC-20 代币",
    ],
    h2Step8: "第八步 — Unqrypt",
    pStep8:
      "要将代币提取回钱包，请调用 unqrypt()。这将销毁您的 qToken 并返回真实的 ERC-20 代币。",
    step8Items: [
      "在仪表板中选择代币和金额",
      "输入保险库密码并确认 unqrypt 交易",
      "真实的 ERC-20 代币将出现在您的钱包中",
    ],
    h2Contracts: "Sepolia 上的活跃合约",
    contractHeaders: ["合约", "地址", "Etherscan"],
    contractRows: [
      ["QryptSafeV6 工厂", FACTORY_V6, `https://sepolia.etherscan.io/address/${FACTORY_V6}#code`],
      ["Sepolia USDC", "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", SEPOLIA_USDC],
    ],
  },
} as const;

export default function TestnetGuide() {
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
      <div style={{ display: "inline-block", background: "hsl(var(--callout-info-bg, 217 91% 95%))", color: "hsl(var(--callout-info-fg, 217 91% 30%))", borderRadius: "0.375rem", padding: "0.125rem 0.625rem", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>
        {c.badge}
      </div>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>
      <div className="callout callout-info">{c.calloutSepolia}</div>

      <h2>{c.h2Step1}</h2>
      <p>{c.pStep1}</p>
      <ul>{c.step1Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Step2}</h2>
      <p>{c.pStep2}</p>
      <table>
        <thead><tr>{c.faucetHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {c.faucetRows.map(([name, limit, req], i) => (
            <tr key={i}><td>{name}</td><td>{limit}</td><td>{req}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="callout callout-info">{c.calloutEth}</div>

      <h2>{c.h2Step3}</h2>
      <p>{c.pStep3}</p>
      <div className="callout callout-warning">{c.usdcNote}</div>

      <h2>{c.h2Step4}</h2>
      <p>{c.pStep4}</p>
      <p><a href={SEPOLIA_APP} target="_blank" rel="noopener noreferrer">{c.openAppLabel} ↗</a></p>
      <ul>{c.step4Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Step5}</h2>
      <p>{c.pStep5}</p>
      <p>{c.factoryLabel} <code>{FACTORY_V6}</code> {" "}<a href={`https://sepolia.etherscan.io/address/${FACTORY_V6}#code`} target="_blank" rel="noopener noreferrer">↗</a></p>
      <ul>{c.step5Items.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <div className="callout callout-warning">{c.calloutProof}</div>

      <h2>{c.h2Step6}</h2>
      <p>{c.pStep6}</p>
      <ul>{c.step6Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Step7}</h2>
      <p>{c.pStep7}</p>
      <ul>{c.step7Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Step8}</h2>
      <p>{c.pStep8}</p>
      <ul>{c.step8Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>{c.h2Contracts}</h2>
      <table>
        <thead><tr>{c.contractHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {c.contractRows.map(([name, addr, link], i) => (
            <tr key={i}>
              <td>{name}</td>
              <td><code>{addr}</code></td>
              <td><a href={link} target="_blank" rel="noopener noreferrer">View ↗</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
