import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const SEPOLIA_APP    = "https://qryptum.eth.limo";
const FACTORY_V6     = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const FACTORY_URL    = `https://sepolia.etherscan.io/address/${FACTORY_V6}`;
const USDC_ADDR      = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const USDC_URL       = `https://sepolia.etherscan.io/address/${USDC_ADDR}`;

const content = {
  en: {
    section: "Guide",
    title: "Testnet Guide",
    badge: "Sepolia Testnet",
    intro: "This guide walks you through using Qryptum on Sepolia testnet. Everything here is free, no real funds are involved.",
    calloutSepolia: "You are on Sepolia testnet (chain ID 11155111). All tokens are test tokens with no real value.",
    tabDapp: "DApp",
    tabContract: "Call Contract",

    dapp: {
      h2Step1: "Step 1: Get a Wallet",
      pStep1: "You need an Ethereum-compatible wallet. MetaMask, Rabby, or any WalletConnect-compatible wallet works.",
      step1Items: [
        "Install MetaMask from metamask.io",
        "Create a new wallet and save your seed phrase securely",
        "Add Sepolia testnet: Settings > Networks > Add Network > Sepolia",
      ],
      h2Step2: "Step 2: Get Sepolia ETH",
      pStep2: "You need Sepolia ETH to pay for gas. Use any of these faucets:",
      faucetHeaders: ["Faucet", "Limit", "Requirement"],
      faucetRows: [
        ["Alchemy Sepolia Faucet", "0.5 ETH / day", "Alchemy account"],
        ["Infura Sepolia Faucet",  "0.5 ETH / day", "Infura account"],
        ["Chainlink Faucet",       "0.1 ETH / day", "None"],
      ],
      calloutEth: "0.05 Sepolia ETH is enough for all operations in this guide.",
      h2Step3: "Step 3: Get Sepolia USDC",
      pStep3: "Qryptum is tested with Sepolia USDC (Circle test token). Mint test USDC from the Circle developer faucet at faucet.circle.com.",
      usdcNote: "Sepolia USDC address: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      h2Step4: "Step 4: Open the App",
      pStep4: "Go to the Qryptum dashboard. Connect your wallet. Make sure MetaMask is set to Sepolia.",
      openAppLabel: "Open Qryptum Dashboard",
      step4Items: [
        "Connect wallet in the top right corner",
        "Confirm the chain is Sepolia (chain ID 11155111)",
        "The dashboard shows your QryptSafe status and shielded balances",
      ],
      h2Step5: "Step 5: Create a QryptSafe",
      pStep5: "Each wallet gets exactly one QryptSafe. The vault is deployed via the V6 factory.",
      factoryLabel: "V6 Factory (Sepolia):",
      step5Items: [
        "Click Create QryptSafe in the dashboard",
        "The app computes your OTP chain head and calls createQryptSafe on the factory",
        "Confirm the transaction in your wallet, this deploys your personal vault",
        "Your vault proof (OTP chain) is generated locally and never stored on any server",
      ],
      calloutProof: "The vault proof is the second factor for every operation. Without it, no one, including Qryptum, can touch your shielded tokens.",
      h2Step6: "Step 6: Qrypt a Token",
      pStep6: "Shielding moves a token from your wallet into your QryptSafe vault.",
      step6Items: [
        "Select a token and enter an amount in the dashboard",
        "Approve the vault contract in MetaMask (one-time per token)",
        "Confirm the qrypt transaction",
        "Your wallet receives qTokens (example: qUSDC) as non-transferable receipts",
      ],
      h2Step7: "Step 7: Try QryptAir",
      pStep7: "QryptAir lets you create an offToken and QR code entirely offline. The recipient redeems it on-chain without any prior setup.",
      step7Items: [
        "Go to QryptAir in the dashboard",
        "Enter recipient address, token, amount, and deadline",
        "Fund the air budget",
        "Sign the offToken with your vault proof, no internet required at signing time",
        "Share the QR code with the recipient",
      ],
      h2Step8: "Step 8: Unqrypt",
      pStep8: "To withdraw tokens back to your wallet, call unqrypt(). This burns your qTokens and returns the real ERC-20 tokens.",
      step8Items: [
        "Select a token and amount in the dashboard",
        "Confirm the unqrypt transaction",
        "Real ERC-20 tokens appear in your wallet",
      ],
    },

    contract: {
      intro: "This tab shows how to call QryptSafe V6 directly through Etherscan's Write Contract interface, exactly as the fields appear on screen. No DApp needed.",
      h2Prereqs: "Before You Start",
      prereqs: [
        "MetaMask on Sepolia (chain ID 11155111)",
        "Sepolia ETH for gas",
        "Sepolia USDC to shield (faucet.circle.com)",
      ],
      h2Otp: "Step 1: Compute Your OTP Chain",
      pOtp: "Each QryptSafe uses a one-time-password chain. You pick a secret, hash it 100 times, and commit the top hash to the contract. Each vault operation consumes the next hash down. Open your browser console (F12 on any page) and run:",
      otpCode: `let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("your_secret_here"));
const proofs = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  proofs.push(h);
}
// proofs[99] = chain head  → paste into createQryptSafe
// proofs[98] = first proof → paste into qrypt / unqrypt
// proofs[97] = second proof → use next time
console.log("chain head:", proofs[99]);
console.log("proof #1:",   proofs[98]);
console.log("proof #2:",   proofs[97]);`,
      otpNote: "If ethers is not available in your console, open remix.ethereum.org. The Remix terminal has ethers pre-loaded.",
      h2Create: "Step 2: Create Your Vault",
      pCreate: "Open the V6 factory on Etherscan and go to Contract > Write Contract. Connect your wallet.",
      createLink: `${FACTORY_URL}#writeContract`,
      createLinkLabel: "V6 Factory: Write Contract",
      pCreateFields: "You will see exactly this field:",
      createField: {
        fn: "1. createQryptSafe",
        selector: "0x7db67f4c",
        param: "initialChainHead (bytes32)",
        hint: "Paste your chain head hash from Step 1 (the 0x... value of proofs[99])",
      },
      createNote: "Click Write and confirm in MetaMask. Each wallet can only create one vault.",
      h2GetVault: "Step 3: Find Your Vault Address",
      pGetVault: "Switch to Contract > Read Contract on the same factory page.",
      getVaultLink: `${FACTORY_URL}#readContract`,
      getVaultLinkLabel: "V6 Factory: Read Contract",
      pGetVaultFields: "Find the getQryptSafe function, enter your wallet address, click Query. Copy the returned address - this is your vault.",
      h2Approve: "Step 4: Approve USDC",
      pApprove: "Open Sepolia USDC on Etherscan. Go to Contract > Write Contract.",
      approveLink: `${USDC_URL}#writeContract`,
      approveLinkLabel: "Sepolia USDC: Write Contract",
      pApproveFields: "Find approve and fill both fields:",
      approveFields: [
        { name: "spender (address)", hint: "Paste your vault address from Step 3" },
        { name: "value (uint256)",   hint: "Amount in 6-decimal units, e.g. 10000000 = 10 USDC" },
      ],
      h2Qrypt: "Step 5: Shield Tokens (qrypt)",
      pQrypt: "Open your vault address on Etherscan. Go to Contract > Write Contract. Find qrypt and fill all three fields:",
      qryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "Paste proof #1 from Step 1 (proofs[98])" },
      ],
      qryptNote: "After this transaction, qUSDC appears in your wallet and the OTP chain advances. Proof #1 is now consumed. Next operation must use proof #2.",
      h2Unqrypt: "Step 6: Unshield Tokens (unqrypt)",
      pUnqrypt: "Same vault, Write Contract. Find unqrypt and fill all three fields:",
      unqryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "Paste proof #2 from Step 1 (proofs[97])" },
      ],
      h2Tips: "Tips",
      tips: [
        "Save all your proofs in a text file. Each operation uses one proof in order, never skip or reuse.",
        "If you run out of proofs, call commitChain on your vault to load a new chain.",
        "Check your shielded balance: vault Read Contract > getShieldedBalance.",
      ],
    },
  },

  ru: {
    section: "Руководство",
    title: "Руководство по тестовой сети",
    badge: "Sepolia Testnet",
    intro: "Это руководство описывает использование Qryptum в тестовой сети Sepolia. Всё бесплатно, реальные средства не используются.",
    calloutSepolia: "Вы в тестовой сети Sepolia (chain ID 11155111). Все токены тестовые, без реальной ценности.",
    tabDapp: "DApp",
    tabContract: "Вызов контракта",

    dapp: {
      h2Step1: "Шаг 1: Получите кошелёк",
      pStep1: "Вам нужен кошелёк, совместимый с Ethereum. Подходят MetaMask, Rabby или любой кошелёк с поддержкой WalletConnect.",
      step1Items: [
        "Установите MetaMask с metamask.io",
        "Создайте новый кошелёк и надёжно сохраните сид-фразу",
        "Добавьте тестовую сеть Sepolia: Настройки > Сети > Добавить сеть > Sepolia",
      ],
      h2Step2: "Шаг 2: Получите Sepolia ETH",
      pStep2: "Для оплаты газа нужен Sepolia ETH. Используйте один из фаусетов:",
      faucetHeaders: ["Фаусет", "Лимит", "Требование"],
      faucetRows: [
        ["Alchemy Sepolia Faucet", "0.5 ETH / день", "Аккаунт Alchemy"],
        ["Infura Sepolia Faucet",  "0.5 ETH / день", "Аккаунт Infura"],
        ["Chainlink Faucet",       "0.1 ETH / день",  "Нет"],
      ],
      calloutEth: "0.05 Sepolia ETH достаточно для всех операций в этом руководстве.",
      h2Step3: "Шаг 3: Получите Sepolia USDC",
      pStep3: "Qryptum тестируется с Sepolia USDC (токен Circle). Получите тестовые USDC через фаусет Circle: faucet.circle.com.",
      usdcNote: "Адрес Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      h2Step4: "Шаг 4: Откройте приложение",
      pStep4: "Перейдите в дашборд Qryptum. Подключите кошелёк. Убедитесь, что MetaMask на Sepolia.",
      openAppLabel: "Открыть дашборд Qryptum",
      step4Items: [
        "Подключите кошелёк в правом верхнем углу",
        "Убедитесь, что выбрана сеть Sepolia (chain ID 11155111)",
        "Дашборд показывает статус QryptSafe и защищённые балансы",
      ],
      h2Step5: "Шаг 5: Создайте QryptSafe",
      pStep5: "У каждого кошелька ровно один QryptSafe. Хранилище деплоится через фабрику V6.",
      factoryLabel: "Фабрика V6 (Sepolia):",
      step5Items: [
        "Нажмите Create QryptSafe в дашборде",
        "Приложение вычисляет верхушку OTP-цепочки и вызывает createQryptSafe на фабрике",
        "Подтвердите транзакцию в кошельке",
        "Ваш vault proof (OTP-цепочка) генерируется локально и нигде не хранится",
      ],
      calloutProof: "Vault proof является вторым фактором. Без него никто, включая Qryptum, не может трогать ваши токены.",
      h2Step6: "Шаг 6: Qrypt токен",
      pStep6: "Шилдинг перемещает токен из вашего кошелька в хранилище QryptSafe.",
      step6Items: [
        "Выберите токен и введите сумму в дашборде",
        "Одобрите контракт хранилища в MetaMask (один раз для каждого токена)",
        "Подтвердите транзакцию qrypt",
        "В кошельке появятся qToken (например qUSDC)",
      ],
      h2Step7: "Шаг 7: Попробуйте QryptAir",
      pStep7: "QryptAir позволяет создать offToken и QR-код полностью офлайн.",
      step7Items: [
        "Перейдите в раздел QryptAir в дашборде",
        "Введите адрес получателя, токен, сумму и дедлайн",
        "Пополните бюджет air",
        "Подпишите offToken с vault proof, интернет при подписи не требуется",
        "Поделитесь QR-кодом с получателем",
      ],
      h2Step8: "Шаг 8: Unqrypt",
      pStep8: "Для вывода токенов вызовите unqrypt(). Это сжигает qToken и возвращает реальные токены.",
      step8Items: [
        "Выберите токен и сумму в дашборде",
        "Подтвердите транзакцию unqrypt",
        "Реальные ERC-20 токены появятся в вашем кошельке",
      ],
    },

    contract: {
      intro: "Эта вкладка показывает, как вызвать QryptSafe V6 напрямую через интерфейс Write Contract на Etherscan, точно так, как поля отображаются на экране. DApp не нужен.",
      h2Prereqs: "Перед началом",
      prereqs: [
        "MetaMask на Sepolia (chain ID 11155111)",
        "Sepolia ETH для газа",
        "Sepolia USDC для шилдинга (faucet.circle.com)",
      ],
      h2Otp: "Шаг 1: Вычислите OTP-цепочку",
      pOtp: "Каждый QryptSafe использует цепочку одноразовых паролей. Выберите секрет, хешируйте его 100 раз и зафиксируйте верхний хеш в контракте. Каждая операция потребляет следующий хеш вниз по цепочке. Откройте консоль браузера (F12) и выполните:",
      otpCode: `let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ваш_секрет_здесь"));
const proofs = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  proofs.push(h);
}
// proofs[99] = верхушка цепочки → вставить в createQryptSafe
// proofs[98] = первый proof    → вставить в qrypt / unqrypt
// proofs[97] = второй proof    → использовать в следующий раз
console.log("chain head:", proofs[99]);
console.log("proof #1:",   proofs[98]);
console.log("proof #2:",   proofs[97]);`,
      otpNote: "Если ethers недоступен в консоли, откройте remix.ethereum.org. В терминале Remix ethers предустановлен.",
      h2Create: "Шаг 2: Создайте хранилище",
      pCreate: "Откройте фабрику V6 на Etherscan и перейдите на Contract > Write Contract. Подключите кошелёк.",
      createLink: `${FACTORY_URL}#writeContract`,
      createLinkLabel: "Фабрика V6: Write Contract",
      pCreateFields: "Вы увидите ровно это поле:",
      createField: {
        fn: "1. createQryptSafe",
        selector: "0x7db67f4c",
        param: "initialChainHead (bytes32)",
        hint: "Вставьте верхушку цепочки из шага 1 (значение 0x... из proofs[99])",
      },
      createNote: "Нажмите Write и подтвердите в MetaMask. Каждый кошелёк может создать только одно хранилище.",
      h2GetVault: "Шаг 3: Найдите адрес хранилища",
      pGetVault: "Перейдите на Contract > Read Contract на той же странице фабрики.",
      getVaultLink: `${FACTORY_URL}#readContract`,
      getVaultLinkLabel: "Фабрика V6: Read Contract",
      pGetVaultFields: "Найдите функцию getQryptSafe, введите адрес вашего кошелька, нажмите Query. Скопируйте полученный адрес - это ваше хранилище.",
      h2Approve: "Шаг 4: Разрешите USDC",
      pApprove: "Откройте Sepolia USDC на Etherscan. Перейдите на Contract > Write Contract.",
      approveLink: `${USDC_URL}#writeContract`,
      approveLinkLabel: "Sepolia USDC: Write Contract",
      pApproveFields: "Найдите approve и заполните оба поля:",
      approveFields: [
        { name: "spender (address)", hint: "Вставьте адрес вашего хранилища из шага 3" },
        { name: "value (uint256)",   hint: "Сумма в 6-значном формате, например 10000000 = 10 USDC" },
      ],
      h2Qrypt: "Шаг 5: Шилдинг токенов (qrypt)",
      pQrypt: "Откройте адрес вашего хранилища на Etherscan. Contract > Write Contract. Найдите qrypt и заполните три поля:",
      qryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "Вставьте proof #1 из шага 1 (proofs[98])" },
      ],
      qryptNote: "После транзакции qUSDC появится в кошельке. OTP-цепочка продвинется: proof #1 потреблён. Следующая операция должна использовать proof #2.",
      h2Unqrypt: "Шаг 6: Аншилдинг токенов (unqrypt)",
      pUnqrypt: "То же хранилище, Write Contract. Найдите unqrypt и заполните три поля:",
      unqryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "Вставьте proof #2 из шага 1 (proofs[97])" },
      ],
      h2Tips: "Советы",
      tips: [
        "Сохраните все proofs в текстовом файле. Каждая операция использует один proof по порядку.",
        "Если proofs закончились, вызовите commitChain на хранилище для загрузки новой цепочки.",
        "Проверьте баланс: хранилище Read Contract > getShieldedBalance.",
      ],
    },
  },

  zh: {
    section: "指南",
    title: "测试网指南",
    badge: "Sepolia 测试网",
    intro: "本指南带您了解如何在 Sepolia 测试网上使用 Qryptum。这里的一切都是免费的，不涉及真实资金。",
    calloutSepolia: "您正在 Sepolia 测试网（chain ID 11155111）上。所有代币都是没有真实价值的测试代币。",
    tabDapp: "DApp",
    tabContract: "调用合约",

    dapp: {
      h2Step1: "第一步: 获取钱包",
      pStep1: "您需要一个兼容以太坊的钱包。MetaMask、Rabby 或任何支持 WalletConnect 的钱包均可。",
      step1Items: [
        "从 metamask.io 安装 MetaMask",
        "创建新钱包并安全保存助记词",
        "添加 Sepolia 测试网：设置 > 网络 > 添加网络 > Sepolia",
      ],
      h2Step2: "第二步: 获取 Sepolia ETH",
      pStep2: "您需要 Sepolia ETH 来支付 gas 费。使用以下任一水龙头：",
      faucetHeaders: ["水龙头", "限额", "要求"],
      faucetRows: [
        ["Alchemy Sepolia 水龙头", "0.5 ETH / 天", "Alchemy 账户"],
        ["Infura Sepolia 水龙头",  "0.5 ETH / 天", "Infura 账户"],
        ["Chainlink 水龙头",       "0.1 ETH / 天", "无"],
      ],
      calloutEth: "0.05 Sepolia ETH 足够完成本指南中的所有操作。",
      h2Step3: "第三步: 获取 Sepolia USDC",
      pStep3: "Qryptum 使用 Sepolia USDC（Circle 测试代币）。从 faucet.circle.com 获取测试 USDC。",
      usdcNote: "Sepolia USDC 地址：0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      h2Step4: "第四步: 打开应用",
      pStep4: "前往 Qryptum 仪表板。连接您的钱包。确保 MetaMask 已切换到 Sepolia。",
      openAppLabel: "打开 Qryptum 仪表板",
      step4Items: [
        "在右上角连接钱包",
        "确认链为 Sepolia（chain ID 11155111）",
        "仪表板显示您的 QryptSafe 状态和屏蔽余额",
      ],
      h2Step5: "第五步: 创建 QryptSafe",
      pStep5: "每个钱包只有一个 QryptSafe。保险库通过 V6 工厂合约部署。",
      factoryLabel: "V6 工厂（Sepolia）：",
      step5Items: [
        "在仪表板中点击 Create QryptSafe",
        "应用在本地计算 OTP 链头并调用工厂的 createQryptSafe",
        "在钱包中确认交易",
        "您的保险库密码（OTP 链）在本地生成，从不存储到任何服务器",
      ],
      calloutProof: "保险库密码是每次操作的第二因素。没有它，任何人（包括 Qryptum）都无法触动您的屏蔽代币。",
      h2Step6: "第六步: Qrypt 代币",
      pStep6: "屏蔽代币会将其从您的钱包移入 QryptSafe 保险库。",
      step6Items: [
        "在仪表板中选择代币并输入金额",
        "在 MetaMask 中批准保险库合约（每个代币只需一次）",
        "确认 qrypt 交易",
        "您的钱包将收到 qToken（例如 qUSDC）作为不可转让的凭证",
      ],
      h2Step7: "第七步: 尝试 QryptAir",
      pStep7: "QryptAir 允许您完全离线创建 offToken 和二维码。",
      step7Items: [
        "在仪表板中进入 QryptAir",
        "输入接收方地址、代币、金额和截止时间",
        "为 air 预算充值",
        "用保险库密码签署 offToken, 签署时不需要网络连接",
        "与接收方分享二维码",
      ],
      h2Step8: "第八步: Unqrypt",
      pStep8: "要将代币提取回钱包，请调用 unqrypt()。这将销毁 qToken 并返回真实的 ERC-20 代币。",
      step8Items: [
        "在仪表板中选择代币和金额",
        "确认 unqrypt 交易",
        "真实的 ERC-20 代币将出现在您的钱包中",
      ],
    },

    contract: {
      intro: "本标签页展示如何通过 Etherscan 的 Write Contract 界面直接调用 QryptSafe V6，字段名称与屏幕上显示的完全一致。无需 DApp。",
      h2Prereqs: "开始前",
      prereqs: [
        "MetaMask 已连接 Sepolia（chain ID 11155111）",
        "用于支付 Gas 的 Sepolia ETH",
        "用于存入的 Sepolia USDC（faucet.circle.com）",
      ],
      h2Otp: "第一步: 计算 OTP 链",
      pOtp: "每个 QryptSafe 使用一次性密码链。您选择一个秘密，对其哈希 100 次，并将最顶端的哈希提交到合约。每次操作消耗链中向下的下一个哈希。打开浏览器控制台（F12）并运行：",
      otpCode: `let h = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("你的秘密"));
const proofs = [h];
for (let i = 0; i < 99; i++) {
  h = ethers.utils.keccak256(h);
  proofs.push(h);
}
// proofs[99] = 链头   → 粘贴到 createQryptSafe
// proofs[98] = 第一个证明 → 粘贴到 qrypt / unqrypt
// proofs[97] = 第二个证明 → 下次使用
console.log("chain head:", proofs[99]);
console.log("proof #1:",   proofs[98]);
console.log("proof #2:",   proofs[97]);`,
      otpNote: "如果控制台中没有 ethers，请打开 remix.ethereum.org。Remix 终端已预装 ethers。",
      h2Create: "第二步: 创建保险库",
      pCreate: "在 Etherscan 上打开 V6 工厂，进入 Contract > Write Contract。连接钱包。",
      createLink: `${FACTORY_URL}#writeContract`,
      createLinkLabel: "V6 工厂：Write Contract",
      pCreateFields: "您将看到以下字段：",
      createField: {
        fn: "1. createQryptSafe",
        selector: "0x7db67f4c",
        param: "initialChainHead (bytes32)",
        hint: "粘贴第一步中的链头哈希（proofs[99] 的 0x... 值）",
      },
      createNote: "点击 Write 并在 MetaMask 中确认。每个钱包只能创建一个保险库。",
      h2GetVault: "第三步: 获取保险库地址",
      pGetVault: "在同一工厂页面切换到 Contract > Read Contract。",
      getVaultLink: `${FACTORY_URL}#readContract`,
      getVaultLinkLabel: "V6 工厂：Read Contract",
      pGetVaultFields: "找到 getQryptSafe 函数，输入您的钱包地址，点击 Query。复制返回的地址，这就是您的保险库。",
      h2Approve: "第四步: 授权 USDC",
      pApprove: "在 Etherscan 上打开 Sepolia USDC，进入 Contract > Write Contract。",
      approveLink: `${USDC_URL}#writeContract`,
      approveLinkLabel: "Sepolia USDC：Write Contract",
      pApproveFields: "找到 approve 并填写两个字段：",
      approveFields: [
        { name: "spender (address)", hint: "粘贴第三步中的保险库地址" },
        { name: "value (uint256)",   hint: "金额（6位小数格式），例如 10000000 = 10 USDC" },
      ],
      h2Qrypt: "第五步: 存入代币（qrypt）",
      pQrypt: "在 Etherscan 上打开保险库地址，进入 Contract > Write Contract。找到 qrypt 并填写三个字段：",
      qryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "粘贴第一步中的 proof #1（proofs[98]）" },
      ],
      qryptNote: "交易完成后，qUSDC 出现在钱包中。OTP 链向前推进：proof #1 已消耗，下次操作须使用 proof #2。",
      h2Unqrypt: "第六步: 取出代币（unqrypt）",
      pUnqrypt: "同一保险库，Write Contract。找到 unqrypt 并填写三个字段：",
      unqryptFields: [
        { name: "token (address)",     hint: `${USDC_ADDR}` },
        { name: "amount (uint256)",    hint: "10000000 = 10 USDC" },
        { name: "otpProof (bytes32)",  hint: "粘贴第一步中的 proof #2（proofs[97]）" },
      ],
      h2Tips: "提示",
      tips: [
        "将所有证明保存在文本文件中。每次操作按顺序使用一个证明，不可跳过或重复使用。",
        "证明用完后，在保险库上调用 commitChain 加载新链。",
        "查看屏蔽余额：保险库 Read Contract > getShieldedBalance。",
      ],
    },
  },
} as const;

type Lang = keyof typeof content;

function FieldRow({ name, hint }: { name: string; hint: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "4px",
      background: "hsl(var(--bg))", border: "1px solid hsl(var(--border))",
      borderRadius: "6px", padding: "0.6rem 0.75rem", marginBottom: "0.5rem",
    }}>
      <code style={{ fontSize: "0.8rem", color: "hsl(var(--fg))", fontWeight: 600 }}>{name}</code>
      <span style={{ fontSize: "0.78rem", color: "hsl(var(--muted-fg))" }}>{hint}</span>
    </div>
  );
}

function FnBox({ fn, selector, param, hint }: { fn: string; selector: string; param: string; hint: string }) {
  return (
    <div style={{
      border: "1px solid hsl(var(--border))", borderRadius: "8px",
      overflow: "hidden", marginBottom: "1rem",
    }}>
      <div style={{
        background: "hsl(var(--muted) / 0.4)",
        padding: "0.5rem 0.75rem",
        display: "flex", alignItems: "center", gap: "0.5rem",
        borderBottom: "1px solid hsl(var(--border))",
      }}>
        <code style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--fg))" }}>{fn}</code>
        <code style={{ fontSize: "0.72rem", color: "hsl(var(--muted-fg))" }}>{selector}</code>
      </div>
      <div style={{ padding: "0.75rem" }}>
        <FieldRow name={param} hint={hint} />
        <div style={{
          display: "inline-block", background: "hsl(217 91% 55%)",
          color: "#fff", borderRadius: "4px", padding: "0.25rem 0.75rem",
          fontSize: "0.78rem", fontWeight: 600, marginTop: "0.25rem",
        }}>Write</div>
      </div>
    </div>
  );
}

export default function TestnetGuide() {
  const { lang } = useLanguage();
  const c = content[(lang as Lang) in content ? (lang as Lang) : "en"];
  const [tab, setTab] = useState<"dapp" | "contract">("dapp");
  const d = c.dapp;
  const ct = c.contract;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.4rem 1.1rem",
    borderRadius: "6px",
    border: "1px solid",
    borderColor: active ? "hsl(var(--primary, 217 91% 55%))" : "hsl(var(--border))",
    background: active ? "hsl(var(--primary, 217 91% 55%))" : "transparent",
    color: active ? "#fff" : "hsl(var(--muted-fg))",
    fontWeight: active ? 600 : 400,
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.15s",
  });

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
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        {c.intro}
      </p>
      <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>{c.calloutSepolia}</div>

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        <button style={tabStyle(tab === "dapp")}     onClick={() => setTab("dapp")}>{c.tabDapp}</button>
        <button style={tabStyle(tab === "contract")} onClick={() => setTab("contract")}>{c.tabContract}</button>
      </div>

      {/* DApp Tab */}
      {tab === "dapp" && (
        <>
          <h2>{d.h2Step1}</h2>
          <p>{d.pStep1}</p>
          <ul>{d.step1Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{d.h2Step2}</h2>
          <p>{d.pStep2}</p>
          <table>
            <thead><tr>{d.faucetHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>{d.faucetRows.map(([name, limit, req], i) => <tr key={i}><td>{name}</td><td>{limit}</td><td>{req}</td></tr>)}</tbody>
          </table>
          <div className="callout callout-info">{d.calloutEth}</div>

          <h2>{d.h2Step3}</h2>
          <p>{d.pStep3}</p>
          <div className="callout callout-warning">{d.usdcNote}</div>

          <h2>{d.h2Step4}</h2>
          <p>{d.pStep4}</p>
          <p><a href={SEPOLIA_APP} target="_blank" rel="noopener noreferrer">{d.openAppLabel} ↗</a></p>
          <ul>{d.step4Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{d.h2Step5}</h2>
          <p>{d.pStep5}</p>
          <p>{d.factoryLabel} <code>{FACTORY_V6}</code>{" "}<a href={`${FACTORY_URL}#code`} target="_blank" rel="noopener noreferrer">↗</a></p>
          <ul>{d.step5Items.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <div className="callout callout-warning">{d.calloutProof}</div>

          <h2>{d.h2Step6}</h2>
          <p>{d.pStep6}</p>
          <ul>{d.step6Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{d.h2Step7}</h2>
          <p>{d.pStep7}</p>
          <ul>{d.step7Items.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{d.h2Step8}</h2>
          <p>{d.pStep8}</p>
          <ul>{d.step8Items.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </>
      )}

      {/* Call Contract Tab */}
      {tab === "contract" && (
        <>
          <p style={{ color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "1.5rem" }}>{ct.intro}</p>

          <h2>{ct.h2Prereqs}</h2>
          <ul>{ct.prereqs.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h2>{ct.h2Otp}</h2>
          <p>{ct.pOtp}</p>
          <pre style={{
            background: "#0d1117", borderRadius: "6px", padding: "1rem",
            overflow: "auto", fontSize: "0.78rem", lineHeight: 1.6,
            border: "1px solid #30363d", marginBottom: "0.75rem", margin: "0 0 0.75rem",
          }}><code style={{ color: "#e6edf3", fontFamily: "monospace", whiteSpace: "pre" }}>{ct.otpCode}</code></pre>
          <div className="callout callout-info" style={{ marginBottom: "1.5rem" }}>{ct.otpNote}</div>

          <h2>{ct.h2Create}</h2>
          <p>{ct.pCreate}</p>
          <p><a href={ct.createLink} target="_blank" rel="noopener noreferrer">{ct.createLinkLabel} ↗</a></p>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>{ct.pCreateFields}</p>
          <FnBox
            fn={ct.createField.fn}
            selector={ct.createField.selector}
            param={ct.createField.param}
            hint={ct.createField.hint}
          />
          <div className="callout callout-warning" style={{ marginBottom: "1.5rem" }}>{ct.createNote}</div>

          <h2>{ct.h2GetVault}</h2>
          <p>{ct.pGetVault}</p>
          <p><a href={ct.getVaultLink} target="_blank" rel="noopener noreferrer">{ct.getVaultLinkLabel} ↗</a></p>
          <p>{ct.pGetVaultFields}</p>

          <h2>{ct.h2Approve}</h2>
          <p>{ct.pApprove}</p>
          <p><a href={ct.approveLink} target="_blank" rel="noopener noreferrer">{ct.approveLinkLabel} ↗</a></p>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-fg))" }}>{ct.pApproveFields}</p>
          {ct.approveFields.map((f, i) => <FieldRow key={i} name={f.name} hint={f.hint} />)}

          <h2>{ct.h2Qrypt}</h2>
          <p>{ct.pQrypt}</p>
          {ct.qryptFields.map((f, i) => <FieldRow key={i} name={f.name} hint={f.hint} />)}
          <div className="callout callout-success" style={{ marginBottom: "1.5rem" }}>{ct.qryptNote}</div>

          <h2>{ct.h2Unqrypt}</h2>
          <p>{ct.pUnqrypt}</p>
          {ct.unqryptFields.map((f, i) => <FieldRow key={i} name={f.name} hint={f.hint} />)}

          <h2>{ct.h2Tips}</h2>
          <ul>{ct.tips.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <div style={{ marginTop: "2rem", padding: "1rem", background: "hsl(var(--muted) / 0.3)", borderRadius: "8px", fontSize: "0.82rem", lineHeight: 1.7 }}>
            <strong>V6 Factory:</strong> <code style={{ fontSize: "0.75rem" }}>{FACTORY_V6}</code>
            {" "}<a href={`${FACTORY_URL}#writeContract`} target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
            <br />
            <strong>Sepolia USDC:</strong> <code style={{ fontSize: "0.75rem" }}>{USDC_ADDR}</code>
            {" "}<a href={USDC_URL} target="_blank" rel="noopener noreferrer">Etherscan ↗</a>
          </div>
        </>
      )}
    </div>
  );
}
