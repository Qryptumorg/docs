import { useLanguage } from "@/lib/LanguageContext";

const FACTORY_V6   = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const SEPOLIA_USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const ETHERSCAN    = "https://sepolia.etherscan.io";

const CONTENT = {
  en: {
    badge: "Sepolia Testnet",
    title: "QryptSafe via Etherscan",
    intro: "This guide shows how to interact with QryptSafe V6 directly through Etherscan's Write Contract interface, without using the DApp. Useful for verification, scripting, or learning exactly how the contract works.",

    callout: "You are interacting with Sepolia testnet. No real funds are involved. All transactions cost only free Sepolia ETH.",

    h2Prereqs: "Prerequisites",
    prereqs: [
      "MetaMask installed with a Sepolia account",
      "Sepolia ETH for gas (get free ETH from sepoliafaucet.com or infura.io/faucet/sepolia)",
      "Sepolia USDC to shield (get from Circle faucet at faucet.circle.com)",
      "Basic understanding of Ethereum transactions",
    ],

    h2Otp: "Understanding the OTP Chain",
    pOtp: "QryptSafe V6 uses a one-time password (OTP) chain instead of a static proof. Think of it as a pre-computed sequence of hashes where each link proves knowledge of the previous one. You generate the chain once offline, commit the top hash to the contract, then spend proofs one at a time.",
    pOtpHow: "The chain works like this: pick a secret string. Hash it repeatedly to build the chain. The final hash (H_n) is your chain head, committed to the contract. Each operation consumes the next hash going down (H_{n-1}, H_{n-2}, ...).",

    h2Step1: "Step 1: Open Factory on Etherscan",
    pStep1: "Open the V6 factory on Sepolia Etherscan and go to the Write Contract tab.",
    step1Links: [
      { label: "V6 Factory on Etherscan", url: `${ETHERSCAN}/address/${FACTORY_V6}#writeContract` },
    ],
    step1Note: "Click Connect to Web3 and connect MetaMask. Make sure MetaMask is on Sepolia (Chain ID 11155111).",

    h2Step2: "Step 2: Compute Your OTP Chain",
    pStep2: "You need to compute a chain of keccak256 hashes before creating your vault. Open your browser console (F12) on any page and run:",
    step2Code: `// Replace 'my_secret_seed' with your own private string. Never share this.
let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my_secret_seed"));
const chain = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  chain.push(h);
}
// chain[99] is your chain head (H100). Use this for createQryptSafe.
// chain[98] is your first OTP proof  (H99). Use this for the first qrypt.
// chain[97] is your second OTP proof (H98). Use this for the second qrypt.
console.log("Chain head (commit):", chain[99]);
console.log("First OTP proof:",     chain[98]);
console.log("Second OTP proof:",    chain[97]);`,
    step2Note: "If ethers is not available in your console, open remix.ethereum.org and run the code in the Remix terminal which has ethers pre-loaded.",

    h2Step3: "Step 3: Create Your Vault",
    pStep3: "Back on Etherscan, find the createQryptSafe function in the Write Contract tab. Enter your chain head (H100 from above) as the chainHead argument. Confirm the transaction in MetaMask.",
    step3Note: "Creating a vault deploys your personal QryptSafe clone on-chain. This is a one-time operation per wallet address.",

    h2Step4: "Step 4: Find Your Vault Address",
    pStep4: "Go to the Read Contract tab on the factory and call getQryptSafe with your wallet address. Copy the returned vault address — you will need it for all following steps.",
    step4Link: { label: "Factory Read Contract", url: `${ETHERSCAN}/address/${FACTORY_V6}#readContract` },

    h2Step5: "Step 5: Approve USDC for Your Vault",
    pStep5: "The vault needs approval to pull USDC from your wallet. Open the Sepolia USDC contract on Etherscan, go to Write Contract, and call approve with your vault address and the amount you want to shield (in USDC's 6-decimal format, so 10 USDC = 10000000).",
    step5Link: { label: "Sepolia USDC on Etherscan", url: `${ETHERSCAN}/address/${SEPOLIA_USDC}#writeContract` },

    h2Step6: "Step 6: Shield Tokens (qrypt)",
    pStep6: "Open your vault address on Etherscan and go to Write Contract. Call the qrypt function with:",
    step6Args: [
      { name: "token", value: `${SEPOLIA_USDC} (Sepolia USDC address)` },
      { name: "amount", value: "10000000 (10 USDC in 6-decimal units)" },
      { name: "otpProof", value: "H99 (your first OTP proof from Step 2)" },
    ],
    step6Note: "After this transaction, your vault holds shielded USDC and a qUSDC receipt is minted. The OTP chain advances: H99 is now consumed. Your next operation must use H98.",

    h2Step7: "Step 7: Unshield Tokens (unqrypt)",
    pStep7: "Call the unqrypt function on your vault with the same token and amount, and your NEXT OTP proof (H98). Your USDC returns to your wallet.",
    step7Args: [
      { name: "token", value: `${SEPOLIA_USDC}` },
      { name: "amount", value: "10000000" },
      { name: "otpProof", value: "H98 (your second OTP proof from Step 2)" },
    ],

    h2Tips: "Tips",
    tips: [
      "Keep your OTP chain in a text file. Each operation consumes one proof in order.",
      "Never reuse a proof. The contract rejects already-consumed OTP links.",
      "If you run out of proofs, call commitChain on your vault to load a new chain.",
      "You can verify shielded balances by calling getShieldedBalance on your vault in the Read Contract tab.",
    ],
  },

  ru: {
    badge: "Тестовая сеть Sepolia",
    title: "QryptSafe через Etherscan",
    intro: "Это руководство показывает, как взаимодействовать с QryptSafe V6 напрямую через интерфейс Write Contract на Etherscan, без использования DApp. Полезно для верификации, автоматизации или детального изучения работы контракта.",

    callout: "Вы работаете с тестовой сетью Sepolia. Реальные средства не используются. Все транзакции требуют только бесплатный Sepolia ETH.",

    h2Prereqs: "Предварительные требования",
    prereqs: [
      "MetaMask с аккаунтом в Sepolia",
      "Sepolia ETH для газа (получите на sepoliafaucet.com или infura.io/faucet/sepolia)",
      "Sepolia USDC для шилдинга (получите на faucet.circle.com)",
      "Базовое понимание транзакций Ethereum",
    ],

    h2Otp: "Понимание OTP-цепочки",
    pOtp: "QryptSafe V6 использует цепочку одноразовых паролей (OTP) вместо статического proof. Представьте её как заранее вычисленную последовательность хешей, где каждое звено доказывает знание предыдущего. Вы генерируете цепочку один раз офлайн, фиксируете верхний хеш в контракте, затем расходуете proofs по одному.",
    pOtpHow: "Принцип работы: выберите секретную строку. Хешируйте её многократно, чтобы построить цепочку. Последний хеш (H_n) является верхушкой цепочки (chain head), зафиксированной в контракте. Каждая операция потребляет следующий хеш вниз по цепочке (H_{n-1}, H_{n-2}, ...).",

    h2Step1: "Шаг 1: Откройте фабрику на Etherscan",
    pStep1: "Откройте фабрику V6 на Sepolia Etherscan и перейдите на вкладку Write Contract.",
    step1Links: [
      { label: "Фабрика V6 на Etherscan", url: `${ETHERSCAN}/address/${FACTORY_V6}#writeContract` },
    ],
    step1Note: "Нажмите Connect to Web3 и подключите MetaMask. Убедитесь, что MetaMask переключён на Sepolia (Chain ID 11155111).",

    h2Step2: "Шаг 2: Вычислите OTP-цепочку",
    pStep2: "Перед созданием хранилища нужно вычислить цепочку keccak256-хешей. Откройте консоль браузера (F12) на любой странице и выполните:",
    step2Code: `// Замените 'my_secret_seed' на собственную секретную строку. Никому не сообщайте её.
let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my_secret_seed"));
const chain = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  chain.push(h);
}
// chain[99] — верхушка цепочки (H100). Используется для createQryptSafe.
// chain[98] — первый OTP proof (H99). Используется для первого qrypt.
// chain[97] — второй OTP proof (H98). Используется для второго qrypt.
console.log("Chain head:", chain[99]);
console.log("Первый OTP proof:", chain[98]);
console.log("Второй OTP proof:", chain[97]);`,
    step2Note: "Если ethers недоступен в консоли, откройте remix.ethereum.org и выполните код в терминале Remix, где ethers предустановлен.",

    h2Step3: "Шаг 3: Создайте хранилище",
    pStep3: "Вернитесь на Etherscan, найдите функцию createQryptSafe во вкладке Write Contract. Введите верхушку цепочки (H100) в качестве аргумента chainHead. Подтвердите транзакцию в MetaMask.",
    step3Note: "Создание хранилища разворачивает ваш личный QryptSafe-клон в блокчейне. Это одноразовая операция для каждого адреса кошелька.",

    h2Step4: "Шаг 4: Найдите адрес вашего хранилища",
    pStep4: "Перейдите на вкладку Read Contract фабрики и вызовите getQryptSafe с адресом вашего кошелька. Скопируйте полученный адрес хранилища.",
    step4Link: { label: "Read Contract фабрики", url: `${ETHERSCAN}/address/${FACTORY_V6}#readContract` },

    h2Step5: "Шаг 5: Разрешите USDC для хранилища",
    pStep5: "Хранилищу нужно разрешение на использование USDC. Откройте контракт Sepolia USDC, перейдите в Write Contract и вызовите approve с адресом вашего хранилища и суммой (в 6-десятичном формате: 10 USDC = 10000000).",
    step5Link: { label: "Sepolia USDC на Etherscan", url: `${ETHERSCAN}/address/${SEPOLIA_USDC}#writeContract` },

    h2Step6: "Шаг 6: Шилдинг токенов (qrypt)",
    pStep6: "Откройте адрес вашего хранилища на Etherscan, перейдите в Write Contract. Вызовите функцию qrypt с параметрами:",
    step6Args: [
      { name: "token", value: `${SEPOLIA_USDC} (адрес Sepolia USDC)` },
      { name: "amount", value: "10000000 (10 USDC в 6-десятичных единицах)" },
      { name: "otpProof", value: "H99 (первый OTP proof из Шага 2)" },
    ],
    step6Note: "После транзакции хранилище держит зашилженные USDC, а qUSDC-квитанция минтится. OTP-цепочка продвигается: H99 потреблён. Следующая операция должна использовать H98.",

    h2Step7: "Шаг 7: Аншилдинг токенов (unqrypt)",
    pStep7: "Вызовите функцию unqrypt на вашем хранилище с тем же токеном и суммой, и СЛЕДУЮЩИМ OTP proof (H98). Ваши USDC вернутся на кошелёк.",
    step7Args: [
      { name: "token", value: `${SEPOLIA_USDC}` },
      { name: "amount", value: "10000000" },
      { name: "otpProof", value: "H98 (второй OTP proof из Шага 2)" },
    ],

    h2Tips: "Советы",
    tips: [
      "Храните OTP-цепочку в текстовом файле. Каждая операция потребляет один proof по порядку.",
      "Никогда не переиспользуйте proof. Контракт отклоняет уже использованные OTP-звенья.",
      "Если proofs закончились, вызовите commitChain на хранилище, чтобы загрузить новую цепочку.",
      "Зашилженные балансы можно проверить, вызвав getShieldedBalance на хранилище во вкладке Read Contract.",
    ],
  },

  zh: {
    badge: "Sepolia 测试网",
    title: "通过 Etherscan 使用 QryptSafe",
    intro: "本指南介绍如何通过 Etherscan 的 Write Contract 界面直接与 QryptSafe V6 交互，无需使用 DApp。适用于验证、脚本编写或深入了解合约工作原理。",

    callout: "您正在与 Sepolia 测试网交互。不涉及真实资金。所有交易仅需免费的 Sepolia ETH。",

    h2Prereqs: "前提条件",
    prereqs: [
      "已安装 MetaMask 并有 Sepolia 账户",
      "用于支付 Gas 的 Sepolia ETH（从 sepoliafaucet.com 或 infura.io/faucet/sepolia 免费获取）",
      "用于存入的 Sepolia USDC（从 faucet.circle.com 获取）",
      "基本了解以太坊交易",
    ],

    h2Otp: "了解 OTP 链",
    pOtp: "QryptSafe V6 使用一次性密码（OTP）链代替静态密码。您可以将其理解为预先计算好的哈希序列，每个链节都可以证明对上一个链节的知情权。您在离线状态下一次性生成整条链，将最顶端的哈希提交到合约，然后逐一使用证明。",
    pOtpHow: "工作原理：选择一个秘密字符串，对其反复进行哈希运算以构建链。最终的哈希值（H_n）是您的链头（chain head），提交到合约。每次操作消耗链中向下的下一个哈希（H_{n-1}、H_{n-2}...）。",

    h2Step1: "第一步：在 Etherscan 上打开工厂合约",
    pStep1: "在 Sepolia Etherscan 上打开 V6 工厂，进入 Write Contract 标签页。",
    step1Links: [
      { label: "Etherscan 上的 V6 工厂", url: `${ETHERSCAN}/address/${FACTORY_V6}#writeContract` },
    ],
    step1Note: "点击 Connect to Web3 并连接 MetaMask。确保 MetaMask 已切换到 Sepolia（Chain ID 11155111）。",

    h2Step2: "第二步：计算 OTP 链",
    pStep2: "创建保险库前，您需要计算一系列 keccak256 哈希值。在任意页面打开浏览器控制台（F12）并运行：",
    step2Code: `// 将 'my_secret_seed' 替换为您自己的私密字符串，请勿分享。
let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my_secret_seed"));
const chain = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  chain.push(h);
}
// chain[99] 是链头（H100），用于 createQryptSafe。
// chain[98] 是第一个 OTP 证明（H99），用于第一次 qrypt。
// chain[97] 是第二个 OTP 证明（H98），用于第二次 qrypt。
console.log("链头:", chain[99]);
console.log("第一个 OTP 证明:", chain[98]);
console.log("第二个 OTP 证明:", chain[97]);`,
    step2Note: "如果控制台中没有 ethers，请打开 remix.ethereum.org，在预装了 ethers 的 Remix 终端中运行代码。",

    h2Step3: "第三步：创建保险库",
    pStep3: "返回 Etherscan，在 Write Contract 标签页中找到 createQryptSafe 函数。将链头（H100）作为 chainHead 参数输入，在 MetaMask 中确认交易。",
    step3Note: "创建保险库会在链上部署您的个人 QryptSafe 克隆。每个钱包地址只需操作一次。",

    h2Step4: "第四步：获取保险库地址",
    pStep4: "进入工厂的 Read Contract 标签页，调用 getQryptSafe 并输入您的钱包地址。复制返回的保险库地址，后续步骤均需使用。",
    step4Link: { label: "工厂 Read Contract", url: `${ETHERSCAN}/address/${FACTORY_V6}#readContract` },

    h2Step5: "第五步：授权 USDC 给保险库",
    pStep5: "保险库需要授权才能从您的钱包中转移 USDC。打开 Sepolia USDC 合约，进入 Write Contract，调用 approve，输入您的保险库地址和金额（6位小数格式：10 USDC = 10000000）。",
    step5Link: { label: "Etherscan 上的 Sepolia USDC", url: `${ETHERSCAN}/address/${SEPOLIA_USDC}#writeContract` },

    h2Step6: "第六步：存入代币（qrypt）",
    pStep6: "在 Etherscan 上打开您的保险库地址，进入 Write Contract，调用 qrypt 函数，参数如下：",
    step6Args: [
      { name: "token", value: `${SEPOLIA_USDC}（Sepolia USDC 地址）` },
      { name: "amount", value: "10000000（10 USDC，6位小数单位）" },
      { name: "otpProof", value: "H99（第二步中的第一个 OTP 证明）" },
    ],
    step6Note: "交易完成后，保险库持有屏蔽的 USDC，并铸造 qUSDC 收据代币。OTP 链向前推进：H99 已消耗，下次操作须使用 H98。",

    h2Step7: "第七步：取出代币（unqrypt）",
    pStep7: "在保险库上调用 unqrypt 函数，使用相同的代币和金额，以及下一个 OTP 证明（H98）。您的 USDC 将返回钱包。",
    step7Args: [
      { name: "token", value: `${SEPOLIA_USDC}` },
      { name: "amount", value: "10000000" },
      { name: "otpProof", value: "H98（第二步中的第二个 OTP 证明）" },
    ],

    h2Tips: "提示",
    tips: [
      "将 OTP 链保存在文本文件中。每次操作按顺序消耗一个证明。",
      "切勿重复使用证明。合约会拒绝已消耗的 OTP 链节。",
      "证明用完后，在保险库上调用 commitChain 加载新链。",
      "可在保险库的 Read Contract 标签页调用 getShieldedBalance 查看屏蔽余额。",
    ],
  },
} as const;

type Lang = keyof typeof CONTENT;

function ArgTable({ args }: { args: { name: string; value: string }[] }) {
  return (
    <table>
      <thead>
        <tr><th>Parameter</th><th>Value</th></tr>
      </thead>
      <tbody>
        {args.map(({ name, value }) => (
          <tr key={name}>
            <td><code>{name}</code></td>
            <td style={{ wordBreak: "break-all", fontSize: "0.8rem" }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function EtherscanGuide() {
  const { lang } = useLanguage();
  const c = CONTENT[(lang as Lang) in CONTENT ? (lang as Lang) : "en"];

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{
          fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "hsl(var(--muted-fg))",
        }}>
          {c.badge}
        </span>
      </div>

      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>
        <p style={{ margin: 0 }}>{c.callout}</p>
      </div>

      <h2>{c.h2Prereqs}</h2>
      <ul>
        {c.prereqs.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>{c.h2Otp}</h2>
      <p>{c.pOtp}</p>
      <p>{c.pOtpHow}</p>

      <h2>{c.h2Step1}</h2>
      <p>{c.pStep1}</p>
      {c.step1Links.map(({ label, url }) => (
        <p key={url}>
          <a href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a>
        </p>
      ))}
      <div className="callout callout-warning" style={{ marginBottom: "0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{c.step1Note}</p>
      </div>

      <h2>{c.h2Step2}</h2>
      <p>{c.pStep2}</p>
      <pre style={{
        background: "hsl(var(--code-bg, 220 13% 10%))",
        borderRadius: "6px", padding: "1rem", overflow: "auto",
        fontSize: "0.8rem", lineHeight: 1.6,
        border: "1px solid hsl(var(--border))",
      }}>
        <code>{c.step2Code}</code>
      </pre>
      <div className="callout callout-info" style={{ marginBottom: "0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{c.step2Note}</p>
      </div>

      <h2>{c.h2Step3}</h2>
      <p>{c.pStep3}</p>
      <div className="callout callout-warning" style={{ marginBottom: "0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{c.step3Note}</p>
      </div>

      <h2>{c.h2Step4}</h2>
      <p>{c.pStep4}</p>
      <p>
        <a href={c.step4Link.url} target="_blank" rel="noopener noreferrer">
          {c.step4Link.label} ↗
        </a>
      </p>

      <h2>{c.h2Step5}</h2>
      <p>{c.pStep5}</p>
      <p>
        <a href={c.step5Link.url} target="_blank" rel="noopener noreferrer">
          {c.step5Link.label} ↗
        </a>
      </p>

      <h2>{c.h2Step6}</h2>
      <p>{c.pStep6}</p>
      <ArgTable args={c.step6Args as unknown as { name: string; value: string }[]} />
      <div className="callout callout-success" style={{ marginBottom: "0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{c.step6Note}</p>
      </div>

      <h2>{c.h2Step7}</h2>
      <p>{c.pStep7}</p>
      <ArgTable args={c.step7Args as unknown as { name: string; value: string }[]} />

      <h2>{c.h2Tips}</h2>
      <ul>
        {c.tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "hsl(var(--muted) / 0.3)", borderRadius: "8px", fontSize: "0.875rem" }}>
        <strong>Factory:</strong>{" "}
        <code style={{ fontSize: "0.8rem" }}>{FACTORY_V6}</code>{" "}
        <a href={`${ETHERSCAN}/address/${FACTORY_V6}#writeContract`} target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
        <br />
        <strong>Sepolia USDC:</strong>{" "}
        <code style={{ fontSize: "0.8rem" }}>{SEPOLIA_USDC}</code>{" "}
        <a href={`${ETHERSCAN}/address/${SEPOLIA_USDC}`} target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
      </div>
    </div>
  );
}
