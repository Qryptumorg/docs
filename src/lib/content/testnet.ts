export type TestnetContent = {
  joinTestnet: {
    title: string;
    badge: string;
    intro: string;
    heroCta: string;
    heroCtaLink: string;
    calloutSepolia: string;

    h2Prerequisites: string;
    prereqHeaders: [string, string];
    prereqRows: [string, string][];

    h2AddNetwork: string;
    pAddNetwork: string;
    networkRows: [string, string][];

    h2GetEth: string;
    pGetEth: string;
    calloutEthAmount: string;
    faucetHeaders: [string, string, string];
    faucetRows: [string, string, string][];
    pEthVerify: string;

    h2GetUsdc: string;
    pGetUsdc: string;
    calloutUsdcNote: string;
    usdcSteps: string[];
    usdcAlt: string;

    h2OpenApp: string;
    pOpenApp: string;
    openAppSteps: string[];
    calloutNetwork: string;

    h2CreateVault: string;
    pCreateVault: string;
    createVaultSteps: string[];
    calloutProofFormat: string;
    calloutProofWarning: string;

    h2ApproveQrypt: string;
    pApproveQrypt: string;
    approveSteps: string[];
    calloutQToken: string;

    h2Transfer: string;
    pTransfer: string;
    transferSteps: string[];
    calloutCommitReveal: string;

    h2Unqrypt: string;
    pUnqrypt: string;
    unqryptSteps: string[];

    h2Monitor: string;
    pMonitor: string;
    monitorLinks: [string, string][];

    h2Troubleshoot: string;
    troubleshootHeaders: [string, string];
    troubleshootRows: [string, string][];

    h2Contracts: string;
    pContracts: string;
    contractRows: [string, string, string][];
  };
};

export const testnetContent: Record<"en" | "ru" | "zh", TestnetContent> = {
  en: {
    joinTestnet: {
      title: "How to Join the Testnet",
      badge: "Sepolia Testnet",
      intro:
        "This guide walks you through the complete process of testing QryptSafe on Sepolia from zero: getting testnet ETH, acquiring Sepolia USDC, creating a vault, shielding tokens, performing a transfer, and withdrawing. No mainnet funds required.",
      heroCta: "Open QryptSafe Testnet App",
      heroCtaLink: "https://app.qryptum.org",
      calloutSepolia:
        "All testnet activity happens on Sepolia (Chain ID: 11155111). No real assets are involved. Gas is paid with free Sepolia ETH from faucets.",

      h2Prerequisites: "Prerequisites",
      prereqHeaders: ["Requirement", "Details"],
      prereqRows: [
        [
          "Browser wallet",
          "MetaMask (Chrome, Firefox, Brave, or Edge extension)",
        ],
        ["Sepolia ETH", "Minimum 0.05 ETH for gas across all steps"],
        ["Sepolia USDC", "Any amount - 10 USDC is enough for a full test run"],
        [
          "Desktop browser",
          "Mobile wallets are supported but desktop is recommended for first run",
        ],
      ],

      h2AddNetwork: "Step 1 - Add Sepolia to MetaMask",
      pAddNetwork:
        "Sepolia is usually pre-installed in MetaMask. If it is missing, add it manually with these parameters:",
      networkRows: [
        ["Network Name", "Sepolia"],
        ["RPC URL", "https://rpc.sepolia.org"],
        ["Chain ID", "11155111"],
        ["Currency Symbol", "ETH"],
        ["Block Explorer", "https://sepolia.etherscan.io"],
      ],

      h2GetEth: "Step 2 - Get Sepolia ETH",
      pGetEth:
        "Sepolia ETH is free and available from multiple faucets. You only need a small amount for gas. Use any faucet below:",
      calloutEthAmount:
        "Request at least 0.1 ETH. Each interaction with QryptSafe costs roughly 0.001-0.003 ETH in gas.",
      faucetHeaders: ["Faucet", "Daily Limit", "URL"],
      faucetRows: [
        ["Alchemy Sepolia Faucet", "0.5 ETH/day", "https://sepoliafaucet.com"],
        [
          "Infura Sepolia Faucet",
          "0.5 ETH/day",
          "https://www.infura.io/faucet/sepolia",
        ],
        [
          "Chainlink Faucet",
          "0.1 ETH/day",
          "https://faucets.chain.link/sepolia",
        ],
        [
          "Google Cloud Web3 Faucet",
          "0.05 ETH/day",
          "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
        ],
        [
          "Paradigm Faucet",
          "1 ETH/day (mainnet activity required)",
          "https://faucet.paradigm.xyz",
        ],
        [
          "Sepolia PoW Faucet",
          "Variable - mine your own",
          "https://sepolia-faucet.pk910.de",
        ],
      ],
      pEthVerify:
        "After requesting, check your MetaMask balance on Sepolia. If balance shows 0 after 2 minutes, try a different faucet.",

      h2GetUsdc: "Step 3 - Get Sepolia USDC",
      pGetUsdc:
        "The official Circle testnet faucet distributes real USDC on Sepolia. This is the same USDC contract used by the QryptSafe app.",
      calloutUsdcNote:
        "Sepolia USDC contract: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - this address is hardcoded into the QryptSafe testnet app.",
      usdcSteps: [
        "Go to https://faucet.circle.com",
        "Select 'Ethereum Sepolia' as the network",
        "Connect your wallet or enter your address",
        "Request USDC (up to 10 USDC per day)",
        "Confirm the transaction in MetaMask",
        "Wait ~15 seconds for the token to appear",
        "In MetaMask: click 'Import tokens' and paste the USDC contract address above if it does not appear automatically",
      ],
      usdcAlt:
        "Alternative: if the Circle faucet is down, you can swap Sepolia ETH for USDC on Uniswap v3 deployed on Sepolia at https://app.uniswap.org by switching to Sepolia network.",

      h2OpenApp: "Step 4 - Open the QryptSafe App",
      pOpenApp:
        "The testnet app is live at app.qryptum.org. Make sure MetaMask is on Sepolia before connecting.",
      openAppSteps: [
        "Open https://app.qryptum.org in your browser",
        "Click 'Connect Wallet' in the top-right corner",
        "Select MetaMask in the wallet selector",
        "Approve the connection in MetaMask",
        "Verify the network indicator shows 'Sepolia' - it appears next to your address",
        "If it shows a different network, click the network name and switch to Sepolia",
      ],
      calloutNetwork:
        "The app will display a warning if you are connected to the wrong network. Do not proceed until the Sepolia indicator is green.",

      h2CreateVault: "Step 5 - Create Your Vault",
      pCreateVault:
        "Every wallet gets exactly one vault. The vault is a unique contract at a unique address. Creating it requires a vault proof: a secret string that becomes the second authentication factor for every vault operation.",
      createVaultSteps: [
        "Click 'Create Vault' on the main dashboard",
        "You will be prompted to enter a vault proof - choose a string of exactly 3 lowercase letters followed by 3 digits (e.g. abc123)",
        "The app hashes the proof locally using keccak256 before sending to the contract - your raw proof never leaves your browser",
        "Click 'Create Vault' to send the transaction",
        "Approve in MetaMask - gas is approximately 0.002 ETH",
        "Wait for 1-2 block confirmations (~15-30 seconds)",
        "Your vault address appears in the dashboard - copy and save it",
        "Verify the vault on Etherscan: paste your vault address at https://sepolia.etherscan.io",
      ],
      calloutProofFormat:
        "Vault proof format: exactly 3 lowercase letters + 3 digits. Examples: abc123, xyz789, qry001. This is enforced on-chain.",
      calloutProofWarning:
        "Write down your vault proof. It is never stored anywhere - not in the app, not on-chain, not on any server. If you lose it, you cannot access your vault. Use emergencyWithdraw after 6 months of inactivity as a last resort.",

      h2ApproveQrypt: "Step 6 - Shield Tokens (Qrypt)",
      pApproveQrypt:
        "Shielding moves real ERC-20 tokens from your wallet into the vault. You receive non-transferable qTokens in return. Two transactions are required: an ERC-20 approval and the Qrypt call itself.",
      approveSteps: [
        "In the app, go to the 'Shield' tab",
        "Select USDC as the token",
        "Enter the amount (e.g. 5 USDC)",
        "Enter your vault proof in the proof field",
        "Click 'Approve USDC' - this authorizes the vault to spend your USDC",
        "Confirm the approval transaction in MetaMask (~0.0005 ETH gas)",
        "After the approval confirms, click 'Qrypt'",
        "Confirm the Qrypt transaction in MetaMask (~0.002 ETH gas)",
        "After confirmation, your USDC balance decreases and qUSDC balance increases in the dashboard",
        "The USDC is now held at your vault contract address, not your wallet",
      ],
      calloutQToken:
        "qTokens cannot be transferred, approved, or delegated. If an attacker drains your wallet private key, qUSDC stays locked in the vault. Only the vault proof unlocks it.",

      h2Transfer: "Step 7 - Transfer to Another Address",
      pTransfer:
        "QryptSafe uses a commit-reveal pattern for transfers. Phase 1 commits the transfer hash on-chain. Phase 2 reveals the proof and executes. This prevents front-running and mempool inspection.",
      transferSteps: [
        "Go to the 'Transfer' tab",
        "Enter the recipient address (any Sepolia address)",
        "Enter the token (USDC) and amount",
        "Enter your vault proof",
        "Click 'initTransfer' - this commits the hash. Approve in MetaMask",
        "Wait for the initTransfer transaction to confirm (~15 seconds)",
        "Click 'finalizeTransfer' - this reveals the proof and executes the transfer. Approve in MetaMask",
        "After confirmation, the recipient's qUSDC balance increases",
        "Check the transfer on Etherscan by clicking the transaction hash in the dashboard",
      ],
      calloutCommitReveal:
        "initTransfer and finalizeTransfer must be called in the same block window. The commit expires after a configurable number of blocks. If finalize is called too late, the commit is automatically invalidated.",

      h2Unqrypt: "Step 8 - Withdraw Tokens (unQrypt)",
      pUnqrypt:
        "unQrypt burns qTokens and releases the underlying ERC-20 back to your wallet. This is a single transaction.",
      unqryptSteps: [
        "Go to the 'Withdraw' tab",
        "Select USDC",
        "Enter the amount to withdraw",
        "Enter your vault proof",
        "Click 'unQrypt' and confirm in MetaMask (~0.002 ETH gas)",
        "After confirmation, your qUSDC balance decreases and your USDC wallet balance increases",
        "Verify on Etherscan: the vault sent ERC-20 to your wallet address",
      ],

      h2Monitor: "Monitor on Etherscan",
      pMonitor:
        "Every transaction is verifiable on Sepolia Etherscan. Use these links to inspect the factory, your vault, and individual transactions:",
      monitorLinks: [
        [
          "QryptSafe v6 Factory",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 Implementation",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],

      h2Troubleshoot: "Troubleshooting",
      troubleshootHeaders: ["Issue", "Fix"],
      troubleshootRows: [
        [
          "Transaction fails with 'wrong network'",
          "Switch MetaMask to Sepolia (Chain ID 11155111) and retry",
        ],
        [
          "'Vault already exists' error",
          "Your wallet already has a vault. Click 'My Vault' in the dashboard to view it",
        ],
        [
          "Approval transaction succeeds but Qrypt fails",
          "The approval amount may be too low. Approve the exact amount you intend to shield",
        ],
        [
          "Vault proof rejected on-chain",
          "Check the format: exactly 3 lowercase letters + 3 digits. Copy-paste carefully, no spaces",
        ],
        [
          "USDC does not appear in MetaMask",
          "Import token manually: open MetaMask, click 'Import tokens', paste 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        ],
        [
          "finalizeTransfer fails with 'commit expired'",
          "Re-run initTransfer first. The commit window may have passed",
        ],
        [
          "Gas estimate fails",
          "Increase gas limit manually in MetaMask advanced settings. Try 200,000 gas for vault interactions",
        ],
        [
          "App shows 'wrong factory'",
          "The app is pointed at the V6 factory. Clear browser cache and reload the page",
        ],
      ],

      h2Contracts: "Testnet Contract Addresses",
      pContracts:
        "All contracts are MIT-licensed and verified on Sepolia Etherscan.",
      contractRows: [
        [
          "QryptSafe v6 (factory)",
          "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 (impl)",
          "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],
    },
  },

  ru: {
    joinTestnet: {
      title: "Как присоединиться к тестнету",
      badge: "Тестнет Sepolia",
      intro:
        "Это руководство проведёт вас через полный процесс тестирования QryptSafe в Sepolia с нуля: получение тестового ETH, USDC, создание хранилища, защита токенов, перевод и вывод. Реальные средства не требуются.",
      heroCta: "Открыть тестнет QryptSafe",
      heroCtaLink: "https://app.qryptum.org",
      calloutSepolia:
        "Вся активность происходит в Sepolia (Chain ID: 11155111). Реальные активы не задействованы. Газ оплачивается бесплатным Sepolia ETH из кранов.",

      h2Prerequisites: "Требования",
      prereqHeaders: ["Требование", "Детали"],
      prereqRows: [
        [
          "Браузерный кошелёк",
          "MetaMask (расширение для Chrome, Firefox, Brave или Edge)",
        ],
        ["Sepolia ETH", "Минимум 0.05 ETH на газ для всех шагов"],
        [
          "Sepolia USDC",
          "Любое количество - 10 USDC достаточно для полного тест-рана",
        ],
        [
          "Браузер на ПК",
          "Мобильные кошельки поддерживаются, но ПК рекомендован для первого запуска",
        ],
      ],

      h2AddNetwork: "Шаг 1 - Добавить Sepolia в MetaMask",
      pAddNetwork:
        "Sepolia обычно предустановлен в MetaMask. Если его нет, добавьте вручную с этими параметрами:",
      networkRows: [
        ["Название сети", "Sepolia"],
        ["RPC URL", "https://rpc.sepolia.org"],
        ["Chain ID", "11155111"],
        ["Символ валюты", "ETH"],
        ["Блок-эксплорер", "https://sepolia.etherscan.io"],
      ],

      h2GetEth: "Шаг 2 - Получить Sepolia ETH",
      pGetEth:
        "Sepolia ETH бесплатный и доступен из нескольких кранов. Нужно лишь небольшое количество для газа:",
      calloutEthAmount:
        "Запросите не менее 0.1 ETH. Каждое взаимодействие с QryptSafe стоит примерно 0.001-0.003 ETH газа.",
      faucetHeaders: ["Кран", "Дневной лимит", "URL"],
      faucetRows: [
        ["Alchemy Sepolia Faucet", "0.5 ETH/день", "https://sepoliafaucet.com"],
        [
          "Infura Sepolia Faucet",
          "0.5 ETH/день",
          "https://www.infura.io/faucet/sepolia",
        ],
        [
          "Chainlink Faucet",
          "0.1 ETH/день",
          "https://faucets.chain.link/sepolia",
        ],
        [
          "Google Cloud Web3 Faucet",
          "0.05 ETH/день",
          "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
        ],
        [
          "Paradigm Faucet",
          "1 ETH/день (требуется активность в мейннете)",
          "https://faucet.paradigm.xyz",
        ],
        [
          "Sepolia PoW Faucet",
          "Переменный - добыча",
          "https://sepolia-faucet.pk910.de",
        ],
      ],
      pEthVerify:
        "После запроса проверьте баланс MetaMask в Sepolia. Если через 2 минуты баланс 0 - попробуйте другой кран.",

      h2GetUsdc: "Шаг 3 - Получить Sepolia USDC",
      pGetUsdc:
        "Официальный кран Circle распределяет реальный USDC в Sepolia. Это тот же контракт USDC, который используется в приложении QryptSafe.",
      calloutUsdcNote:
        "Контракт Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - этот адрес встроен в тестнет-приложение QryptSafe.",
      usdcSteps: [
        "Перейдите на https://faucet.circle.com",
        "Выберите 'Ethereum Sepolia' как сеть",
        "Подключите кошелёк или введите адрес",
        "Запросите USDC (до 10 USDC в день)",
        "Подтвердите транзакцию в MetaMask",
        "Подождите ~15 секунд для появления токена",
        "В MetaMask: нажмите 'Импортировать токены' и вставьте адрес контракта USDC если он не появился автоматически",
      ],
      usdcAlt:
        "Альтернатива: если кран Circle недоступен, вы можете обменять Sepolia ETH на USDC на Uniswap v3 в Sepolia на https://app.uniswap.org переключившись на сеть Sepolia.",

      h2OpenApp: "Шаг 4 - Открыть приложение QryptSafe",
      pOpenApp:
        "Тестнет-приложение доступно по адресу app.qryptum.org. Убедитесь что MetaMask переключён на Sepolia перед подключением.",
      openAppSteps: [
        "Откройте https://app.qryptum.org в браузере",
        "Нажмите 'Подключить кошелёк' в правом верхнем углу",
        "Выберите MetaMask в селекторе кошельков",
        "Подтвердите подключение в MetaMask",
        "Убедитесь что индикатор сети показывает 'Sepolia'",
        "Если показывает другую сеть - нажмите на название сети и переключитесь на Sepolia",
      ],
      calloutNetwork:
        "Приложение покажет предупреждение если вы подключены к неправильной сети. Не продолжайте пока индикатор Sepolia не станет зелёным.",

      h2CreateVault: "Шаг 5 - Создать хранилище",
      pCreateVault:
        "Каждый кошелёк получает ровно одно хранилище. Создание требует vault proof: секретную строку, которая становится вторым фактором аутентификации для каждой операции.",
      createVaultSteps: [
        "Нажмите 'Создать хранилище' на главном дашборде",
        "Введите vault proof - строку из ровно 3 строчных букв и 3 цифр (например abc123)",
        "Приложение хеширует proof локально через keccak256 - сырой proof никогда не покидает браузер",
        "Нажмите 'Создать хранилище' для отправки транзакции",
        "Подтвердите в MetaMask - газ примерно 0.002 ETH",
        "Подождите 1-2 подтверждения блока (~15-30 секунд)",
        "Адрес вашего хранилища появится на дашборде - скопируйте и сохраните его",
      ],
      calloutProofFormat:
        "Формат vault proof: ровно 3 строчные буквы + 3 цифры. Примеры: abc123, xyz789, qry001.",
      calloutProofWarning:
        "Запишите vault proof. Он нигде не хранится - ни в приложении, ни в блокчейне, ни на сервере. Если потеряете - воспользуйтесь emergencyWithdraw через 6 месяцев бездействия.",

      h2ApproveQrypt: "Шаг 6 - Защитить токены (Qrypt)",
      pApproveQrypt:
        "Qrypt перемещает ERC-20 токены из вашего кошелька в хранилище. Вы получаете непередаваемые qToken взамен. Требуются две транзакции: одобрение ERC-20 и вызов Qrypt.",
      approveSteps: [
        "В приложении перейдите на вкладку 'Shield'",
        "Выберите USDC как токен",
        "Введите сумму (например 5 USDC)",
        "Введите vault proof",
        "Нажмите 'Одобрить USDC' - это разрешает хранилищу тратить ваш USDC",
        "Подтвердите транзакцию одобрения в MetaMask (~0.0005 ETH газа)",
        "После подтверждения нажмите 'Qrypt'",
        "Подтвердите транзакцию Qrypt в MetaMask (~0.002 ETH газа)",
        "После подтверждения баланс USDC уменьшается, баланс qUSDC увеличивается",
      ],
      calloutQToken:
        "qToken нельзя передавать, одобрять или делегировать. Даже если приватный ключ скомпрометирован - qUSDC остаётся заблокированным в хранилище. Только vault proof его разблокирует.",

      h2Transfer: "Шаг 7 - Перевод на другой адрес",
      pTransfer:
        "QryptSafe использует паттерн commit-reveal для переводов. Фаза 1 фиксирует хеш перевода. Фаза 2 раскрывает proof и выполняет перевод.",
      transferSteps: [
        "Перейдите на вкладку 'Transfer'",
        "Введите адрес получателя",
        "Введите токен (USDC) и сумму",
        "Введите vault proof",
        "Нажмите 'initTransfer' - фиксирует хеш. Подтвердите в MetaMask",
        "Подождите подтверждения транзакции initTransfer (~15 секунд)",
        "Нажмите 'finalizeTransfer' - раскрывает proof и выполняет перевод. Подтвердите в MetaMask",
        "После подтверждения баланс qUSDC получателя увеличивается",
      ],
      calloutCommitReveal:
        "initTransfer и finalizeTransfer должны быть вызваны в одном окне блоков. Коммит истекает после заданного числа блоков.",

      h2Unqrypt: "Шаг 8 - Вывод токенов (unQrypt)",
      pUnqrypt:
        "unQrypt сжигает qToken и возвращает базовый ERC-20 в ваш кошелёк. Это одна транзакция.",
      unqryptSteps: [
        "Перейдите на вкладку 'Withdraw'",
        "Выберите USDC",
        "Введите сумму для вывода",
        "Введите vault proof",
        "Нажмите 'unQrypt' и подтвердите в MetaMask (~0.002 ETH газа)",
        "После подтверждения баланс qUSDC уменьшается, баланс USDC в кошельке увеличивается",
      ],

      h2Monitor: "Мониторинг на Etherscan",
      pMonitor:
        "Каждая транзакция верифицируема на Sepolia Etherscan. Используйте эти ссылки для проверки фабрики, хранилища и транзакций:",
      monitorLinks: [
        [
          "QryptSafe v6 Factory",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 Implementation",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],

      h2Troubleshoot: "Устранение неполадок",
      troubleshootHeaders: ["Проблема", "Решение"],
      troubleshootRows: [
        [
          "Транзакция не проходит 'wrong network'",
          "Переключите MetaMask на Sepolia (Chain ID 11155111)",
        ],
        [
          "Ошибка 'Vault already exists'",
          "У вашего кошелька уже есть хранилище. Нажмите 'My Vault' на дашборде",
        ],
        [
          "Одобрение прошло, но Qrypt не работает",
          "Возможно сумма одобрения меньше нужной. Одобрите точную сумму",
        ],
        [
          "Vault proof отклонён on-chain",
          "Проверьте формат: ровно 3 строчные буквы + 3 цифры. Нет пробелов",
        ],
        [
          "USDC не появляется в MetaMask",
          "Импортируйте токен вручную, вставив адрес контракта USDC",
        ],
        [
          "finalizeTransfer: 'commit expired'",
          "Перезапустите initTransfer. Окно коммита истекло",
        ],
        [
          "Ошибка оценки газа",
          "Увеличьте лимит газа до 200,000 в расширенных настройках MetaMask",
        ],
      ],

      h2Contracts: "Адреса тестнет-контрактов",
      pContracts:
        "Все контракты MIT-лицензированы и верифицированы на Sepolia Etherscan.",
      contractRows: [
        [
          "QryptSafe v6 (factory)",
          "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 (impl)",
          "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],
    },
  },

  zh: {
    joinTestnet: {
      title: "如何加入测试网",
      badge: "Sepolia 测试网",
      intro:
        "本指南带您从零开始完整测试 QryptSafe on Sepolia：获取测试 ETH、Sepolia USDC、创建金库、保护代币、执行转账和提款。无需真实资产。",
      heroCta: "打开 QryptSafe 测试网应用",
      heroCtaLink: "https://app.qryptum.org",
      calloutSepolia:
        "所有测试网活动在 Sepolia 上进行（Chain ID: 11155111）。不涉及真实资产。Gas 由水龙头免费提供的 Sepolia ETH 支付。",

      h2Prerequisites: "前提条件",
      prereqHeaders: ["需求", "详情"],
      prereqRows: [
        ["浏览器钱包", "MetaMask（Chrome、Firefox、Brave 或 Edge 扩展）"],
        ["Sepolia ETH", "所有步骤至少需要 0.05 ETH 用于 gas"],
        ["Sepolia USDC", "任意数量 - 10 USDC 足够完整测试"],
        ["桌面浏览器", "支持移动钱包，但首次运行建议使用桌面端"],
      ],

      h2AddNetwork: "步骤 1 - 将 Sepolia 添加到 MetaMask",
      pAddNetwork:
        "Sepolia 通常预装在 MetaMask 中。如果缺失，请使用以下参数手动添加：",
      networkRows: [
        ["网络名称", "Sepolia"],
        ["RPC URL", "https://rpc.sepolia.org"],
        ["Chain ID", "11155111"],
        ["货币符号", "ETH"],
        ["区块浏览器", "https://sepolia.etherscan.io"],
      ],

      h2GetEth: "步骤 2 - 获取 Sepolia ETH",
      pGetEth: "Sepolia ETH 免费，可从多个水龙头获取。只需少量用于 gas：",
      calloutEthAmount:
        "请求至少 0.1 ETH。与 QryptSafe 的每次交互大约消耗 0.001-0.003 ETH gas。",
      faucetHeaders: ["水龙头", "每日限额", "URL"],
      faucetRows: [
        ["Alchemy Sepolia Faucet", "0.5 ETH/天", "https://sepoliafaucet.com"],
        [
          "Infura Sepolia Faucet",
          "0.5 ETH/天",
          "https://www.infura.io/faucet/sepolia",
        ],
        [
          "Chainlink Faucet",
          "0.1 ETH/天",
          "https://faucets.chain.link/sepolia",
        ],
        [
          "Google Cloud Web3 Faucet",
          "0.05 ETH/天",
          "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
        ],
        [
          "Paradigm Faucet",
          "1 ETH/天（需要主网活动）",
          "https://faucet.paradigm.xyz",
        ],
        [
          "Sepolia PoW Faucet",
          "可变 - 自行挖矿",
          "https://sepolia-faucet.pk910.de",
        ],
      ],
      pEthVerify:
        "请求后，检查 MetaMask 在 Sepolia 上的余额。如果 2 分钟后余额为 0，请尝试其他水龙头。",

      h2GetUsdc: "步骤 3 - 获取 Sepolia USDC",
      pGetUsdc:
        "Circle 官方测试网水龙头在 Sepolia 上分发真实 USDC。这与 QryptSafe 应用使用的 USDC 合约相同。",
      calloutUsdcNote:
        "Sepolia USDC 合约：0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 - 此地址已硬编码到 QryptSafe 测试网应用中。",
      usdcSteps: [
        "访问 https://faucet.circle.com",
        "选择 'Ethereum Sepolia' 作为网络",
        "连接钱包或输入地址",
        "请求 USDC（每天最多 10 USDC）",
        "在 MetaMask 中确认交易",
        "等待 ~15 秒让代币出现",
        "在 MetaMask 中：点击 '导入代币' 并粘贴上面的 USDC 合约地址（如果没有自动出现）",
      ],
      usdcAlt:
        "备选方案：如果 Circle 水龙头不可用，可在 https://app.uniswap.org 切换到 Sepolia 网络，将 Sepolia ETH 兑换为 USDC。",

      h2OpenApp: "步骤 4 - 打开 QryptSafe 应用",
      pOpenApp:
        "测试网应用地址：app.qryptum.org。连接前确保 MetaMask 在 Sepolia 上。",
      openAppSteps: [
        "在浏览器中打开 https://app.qryptum.org",
        "点击右上角的 '连接钱包'",
        "在钱包选择器中选择 MetaMask",
        "在 MetaMask 中批准连接",
        "确认网络指示器显示 'Sepolia'",
        "如果显示其他网络，点击网络名称并切换到 Sepolia",
      ],
      calloutNetwork:
        "如果连接到错误网络，应用将显示警告。在 Sepolia 指示器变绿之前不要继续操作。",

      h2CreateVault: "步骤 5 - 创建金库",
      pCreateVault:
        "每个钱包恰好有一个金库。创建需要 vault proof：一个秘密字符串，成为每个金库操作的第二认证因素。",
      createVaultSteps: [
        "在主仪表板上点击 '创建金库'",
        "输入 vault proof - 恰好 3 个小写字母加 3 个数字（如 abc123）",
        "应用在本地使用 keccak256 哈希 proof - 原始 proof 不离开浏览器",
        "点击 '创建金库' 发送交易",
        "在 MetaMask 中确认 - gas 约 0.002 ETH",
        "等待 1-2 个区块确认（~15-30 秒）",
        "您的金库地址出现在仪表板上 - 复制并保存",
      ],
      calloutProofFormat:
        "Vault proof 格式：恰好 3 个小写字母 + 3 个数字。示例：abc123、xyz789、qry001。",
      calloutProofWarning:
        "记下您的 vault proof。它不会存储在任何地方。如果丢失，可在 6 个月不活动后使用 emergencyWithdraw。",

      h2ApproveQrypt: "步骤 6 - 保护代币（Qrypt）",
      pApproveQrypt:
        "Qrypt 将 ERC-20 代币从您的钱包移入金库。您获得不可转让的 qToken 作为回报。需要两笔交易：ERC-20 授权和 Qrypt 调用。",
      approveSteps: [
        "在应用中进入 'Shield' 标签",
        "选择 USDC 作为代币",
        "输入金额（如 5 USDC）",
        "在 proof 字段输入 vault proof",
        "点击 '批准 USDC' - 授权金库使用您的 USDC",
        "在 MetaMask 中确认批准交易（~0.0005 ETH gas）",
        "批准确认后，点击 'Qrypt'",
        "在 MetaMask 中确认 Qrypt 交易（~0.002 ETH gas）",
        "确认后，USDC 余额减少，qUSDC 余额增加",
      ],
      calloutQToken:
        "qToken 无法转移、批准或委托。即使私钥泄露，qUSDC 也锁在金库中。只有 vault proof 能解锁它。",

      h2Transfer: "步骤 7 - 转账到其他地址",
      pTransfer:
        "QryptSafe 使用 commit-reveal 模式进行转账。阶段 1 在链上提交转账哈希。阶段 2 揭示 proof 并执行。",
      transferSteps: [
        "进入 'Transfer' 标签",
        "输入收款人地址",
        "输入代币（USDC）和金额",
        "输入 vault proof",
        "点击 'initTransfer' - 提交哈希。在 MetaMask 中确认",
        "等待 initTransfer 交易确认（~15 秒）",
        "点击 'finalizeTransfer' - 揭示 proof 并执行转账。在 MetaMask 中确认",
        "确认后，收款人的 qUSDC 余额增加",
      ],
      calloutCommitReveal:
        "initTransfer 和 finalizeTransfer 必须在同一区块窗口内调用。提交在一定区块数后过期。",

      h2Unqrypt: "步骤 8 - 提取代币（unQrypt）",
      pUnqrypt:
        "unQrypt 销毁 qToken 并将底层 ERC-20 释放回您的钱包。这是单笔交易。",
      unqryptSteps: [
        "进入 'Withdraw' 标签",
        "选择 USDC",
        "输入提取金额",
        "输入 vault proof",
        "点击 'unQrypt' 并在 MetaMask 中确认（~0.002 ETH gas）",
        "确认后，qUSDC 余额减少，钱包 USDC 余额增加",
      ],

      h2Monitor: "在 Etherscan 上监控",
      pMonitor:
        "每笔交易都可在 Sepolia Etherscan 上验证。使用以下链接查看工厂、金库和交易：",
      monitorLinks: [
        [
          "QryptSafe v6 Factory",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 Implementation",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],

      h2Troubleshoot: "故障排除",
      troubleshootHeaders: ["问题", "解决方案"],
      troubleshootRows: [
        [
          "交易失败 'wrong network'",
          "将 MetaMask 切换到 Sepolia（Chain ID 11155111）",
        ],
        [
          "错误 'Vault already exists'",
          "您的钱包已有金库。点击仪表板中的 'My Vault'",
        ],
        ["批准成功但 Qrypt 失败", "批准金额可能不足。批准您要保护的确切金额"],
        [
          "Vault proof 被链上拒绝",
          "检查格式：恰好 3 个小写字母 + 3 个数字，无空格",
        ],
        ["USDC 不在 MetaMask 中显示", "手动导入代币：粘贴 USDC 合约地址"],
        [
          "finalizeTransfer: 'commit expired'",
          "重新运行 initTransfer。提交窗口可能已过期",
        ],
        ["Gas 估算失败", "在 MetaMask 高级设置中将 gas 限制增加到 200,000"],
      ],

      h2Contracts: "测试网合约地址",
      pContracts: "所有合约均为 MIT 许可并在 Sepolia Etherscan 上验证。",
      contractRows: [
        [
          "QryptSafe v6 (factory)",
          "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
          "https://sepolia.etherscan.io/address/0xeaa722e996888b662E71aBf63d08729c6B6802F4#code",
        ],
        [
          "PersonalQryptSafe v6 (impl)",
          "0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3",
          "https://sepolia.etherscan.io/address/0x3E03f768476a763A48f2E00B73e4dC69f9E8A7E3#code",
        ],
        [
          "Sepolia USDC (Circle)",
          "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
          "https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238#code",
        ],
      ],
    },
  },
};
