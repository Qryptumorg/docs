export type DeveloperContent = {
  quickStart: {
    title: string;
    intro: string;
    h2Prerequisites: string;
    prerequisites: string[];
    h2Install: string;
    h2Connect: string;
    h2CheckVault: string;
    h2Create: string;
    h2Shield: string;
    calloutProof: string;
    h2NextSteps: string;
    nextSteps: string[];
  };
  integrationGuide: {
    title: string;
    intro: string;
    h2ProofHashing: string;
    pProofHashing: string;
    h2ProofFormat: string;
    pProofFormat: string;
    h2VaultStatus: string;
    h2ShieldedBalances: string;
    h2NetworkConfig: string;
    h2RecordTx: string;
    pRecordTx: string;
    h2EnvVars: string;
    envHeaders: [string, string];
    envRows: [string, string][];
  };
  apiReference: {
    title: string;
    intro: string;
    calloutBaseUrl: string;
    h2Health: string;
    h3Healthz: string;
    pHealthz: string;
    h3Health: string;
    pHealth: string;
    h2Vaults: string;
    h3PostVaults: string;
    pPostVaults: string;
    h3GetVault: string;
    pGetVault: string;
    h3VerifyVault: string;
    pVerifyVault: string;
    h2Transactions: string;
    h3PostTx: string;
    pPostTx: string;
    h3GetTx: string;
    pGetTx: string;
    h2Errors: string;
    errorHeaders: [string, string, string];
    errorRows: [string, string, string][];
  };
  commitReveal: {
    title: string;
    intro: string;
    h2WhyTwo: string;
    pWhyTwo1: string;
    pWhyTwo2: string;
    h2Implementation: string;
    h3Step1: string;
    h3Step2: string;
    h3Step3: string;
    h3Step4: string;
    h2Constraints: string;
    constraintHeaders: [string, string, string];
    constraintRows: [string, string, string][];
    h2Recipient: string;
    pRecipient: string;
  };
  abiReference: {
    title: string;
    intro: string;
    h2FactoryAbi: string;
    h2VaultAbi: string;
    h2QTokenAbi: string;
    h2Erc20Abi: string;
    h2Addresses: string;
    addressHeaders: [string, string, string];
    addressRows: [string, string, string][];
  };
};

export const developerContent: Record<"en" | "ru" | "zh", DeveloperContent> = {
  en: {
    quickStart: {
      title: "Quick Start",
      intro:
        "This guide shows how to interact with Qryptum contracts from a JavaScript or TypeScript application using viem or ethers.js.",
      h2Prerequisites: "Prerequisites",
      prerequisites: [
        "An Ethereum wallet with Sepolia ETH for gas",
        "Sepolia USDC or another ERC-20 token for testing",
        "Node.js 18+ and a package manager",
      ],
      h2Install: "Install Dependencies",
      h2Connect: "Connect to ShieldFactory (viem)",
      h2CheckVault: "Check if Vault Exists",
      h2Create: "Create a Qrypt-Safe",
      h2Shield: "Shield a Token",
      calloutProof:
        "The vault proof string is passed in plaintext calldata during shield(), unshield(), and revealTransfer(). It is visible in the transaction on Etherscan. This is acceptable because the vault proof is useless without the private key, and all vault functions have the onlyOwner modifier.",
      h2NextSteps: "Next Steps",
      nextSteps: [
        "See the Integration Guide for the full commit-reveal transfer implementation",
        "See ABI Reference for the complete ABIs of all contracts",
        "See API Reference for the backend REST API",
      ],
    },
    integrationGuide: {
      title: "Integration Guide",
      intro:
        "A complete walkthrough for integrating Qryptum into a frontend application, including vault detection, shielding, and full transfer flow.",
      h2ProofHashing: "1. Vault Proof Hashing",
      pProofHashing:
        "The vault proof must be hashed in the browser before any on-chain operation. Never send the raw vault proof to any backend.",
      h2ProofFormat: "2. Vault Proof Format Validation",
      pProofFormat:
        "The vault proof must be exactly 6 characters: 3 letters and 3 digits. The contract enforces this format when calling changeVaultProof(). Validate in the browser before submission:",
      h2VaultStatus: "3. Detecting Vault Status",
      h2ShieldedBalances: "4. Reading Shielded Balances",
      h2NetworkConfig: "5. Network Configuration",
      h2RecordTx: "6. Recording Transactions to the API",
      pRecordTx:
        "After each successful on-chain transaction, record it to the Qryptum backend API for display in the dashboard history:",
      h2EnvVars: "Environment Variables",
      envHeaders: ["Variable", "Description"],
      envRows: [
        ["VITE_SHIELD_FACTORY_SEPOLIA", "ShieldFactory address on Sepolia"],
        ["VITE_SHIELD_FACTORY_MAINNET", "ShieldFactory address on mainnet (set after deploy)"],
        ["VITE_ALCHEMY_SEPOLIA_URL", "Optional: Alchemy RPC for Sepolia reads"],
        ["VITE_ALCHEMY_MAINNET_URL", "Optional: Alchemy RPC for mainnet reads"],
        ["VITE_WALLETCONNECT_PROJECT_ID", "Optional: WalletConnect cloud project ID"],
      ],
    },
    apiReference: {
      title: "API Reference",
      intro:
        "The Qryptum backend API is a read-write REST API for recording and retrieving vault registrations and transaction history. It never receives vault proofs or private keys.",
      calloutBaseUrl: "Base URL:",
      h2Health: "Health",
      h3Healthz: "GET /api/healthz",
      pHealthz: "Basic health check. Returns immediately without a database call.",
      h3Health: "GET /api/health",
      pHealth: "Full health check. Executes a SELECT 1 against the database.",
      h2Vaults: "Vaults",
      h3PostVaults: "POST /api/vaults",
      pPostVaults: "Register a vault record after the user's createVault() transaction is confirmed on-chain.",
      h3GetVault: "GET /api/vaults/:walletAddress",
      pGetVault: "Retrieve vault registration for a wallet address.",
      h3VerifyVault: "POST /api/vault/verify",
      pVerifyVault: "Check if a vault record exists for a wallet address. Returns only a boolean, never returns vault proof data.",
      h2Transactions: "Transactions",
      h3PostTx: "POST /api/transactions",
      pPostTx: "Record a confirmed on-chain transaction. Call this after waitForTransactionReceipt() returns a successful receipt.",
      h3GetTx: "GET /api/transactions/:walletAddress",
      pGetTx: "Retrieve transaction history for a wallet. Returns the 50 most recent by default, sorted newest first.",
      h2Errors: "Error Responses",
      errorHeaders: ["Status", "Body", "Meaning"],
      errorRows: [
        ["400", "{ \"error\": \"...\" }", "Validation error in request body"],
        ["404", "{ \"error\": \"...\" }", "Record not found"],
        ["409", "{ \"error\": \"...\" }", "Duplicate wallet address on vault creation"],
        ["500", "{ \"error\": \"Internal error\" }", "Server or database error"],
      ],
    },
    commitReveal: {
      title: "Commit-Reveal Flow",
      intro:
        "Transfers in Qryptum use a two-step commit-reveal scheme. The commit step records a hash on-chain without revealing the vault proof. The reveal step verifies the hash and executes the transfer.",
      h2WhyTwo: "Why Two Steps",
      pWhyTwo1:
        "A single-step transfer would expose the vault proof in the mempool before the transaction is included in a block. A malicious miner could observe the proof and attempt to front-run the transaction. The commit-reveal scheme solves this: the commit step submits only a hash (no proof), and the reveal step is valid only after the commit is included in a block.",
      pWhyTwo2:
        "Additionally, each commit hash includes a unique random nonce, making replay attacks impossible even if the same transfer parameters are used again.",
      h2Implementation: "Step-by-Step Implementation (viem)",
      h3Step1: "Step 1: Build the Commit Hash",
      h3Step2: "Step 2: Submit the Commit",
      h3Step3: "Step 3: Wait for the Next Block",
      h3Step4: "Step 4: Execute the Reveal",
      h2Constraints: "Constraints",
      constraintHeaders: ["Constraint", "Value", "Enforced By"],
      constraintRows: [
        ["Minimum block gap", "1 block", "Contract checks block.number > commit.blockNumber"],
        ["Commit expiry", "600 seconds (10 minutes)", "Contract checks block.timestamp - commit.timestamp <= 600"],
        ["Replay prevention", "Each commit hash can be used once", "commit.used == true reverts on reuse"],
        ["Self-transfer", "Blocked", "require(to != msg.sender)"],
      ],
      h2Recipient: "What the Recipient Receives",
      pRecipient:
        "The recipient always receives the raw ERC-20 token (for example, USDC), never the qToken. The qToken is burned during revealTransfer(). The recipient wallet does not need to be a Qryptum user. They can use the received tokens freely or choose to shield them into their own Qrypt-Safe.",
    },
    abiReference: {
      title: "ABI Reference",
      intro:
        "Human-readable ABIs for all Qryptum contracts. Use these to read and write to the contracts using viem, ethers.js, or any EVM-compatible library.",
      h2FactoryAbi: "ShieldFactory ABI",
      h2VaultAbi: "PersonalVault ABI",
      h2QTokenAbi: "ShieldToken (qToken) ABI",
      h2Erc20Abi: "Minimal ERC-20 ABI (for underlying tokens)",
      h2Addresses: "Contract Addresses",
      addressHeaders: ["Network", "Chain ID", "ShieldFactory"],
      addressRows: [
        ["Sepolia (v6: active)", "11155111", "Pending — see Deployed Addresses page"],
        ["Ethereum Mainnet", "1", "Pending deployment"],
      ],
    },
  },

  ru: {
    quickStart: {
      title: "Быстрый старт",
      intro:
        "Это руководство показывает, как взаимодействовать с контрактами Qryptum из JavaScript или TypeScript приложения с помощью viem или ethers.js.",
      h2Prerequisites: "Требования",
      prerequisites: [
        "Кошелёк Ethereum с Sepolia ETH для газа",
        "Sepolia USDC или другой токен ERC-20 для тестирования",
        "Node.js 18+ и менеджер пакетов",
      ],
      h2Install: "Установка зависимостей",
      h2Connect: "Подключение к ShieldFactory (viem)",
      h2CheckVault: "Проверка существования хранилища",
      h2Create: "Создание Qrypt-Safe",
      h2Shield: "Защита токена",
      calloutProof:
        "Строка vault proof передаётся в открытом calldata во время shield(), unshield() и revealTransfer(). Она видна в транзакции на Etherscan. Это допустимо, поскольку vault proof бесполезен без приватного ключа, а все функции хранилища имеют модификатор onlyOwner.",
      h2NextSteps: "Следующие шаги",
      nextSteps: [
        "Смотрите Руководство по интеграции для полной реализации commit-reveal передачи",
        "Смотрите Справочник ABI для полных ABI всех контрактов",
        "Смотрите Справочник API для бэкенд REST API",
      ],
    },
    integrationGuide: {
      title: "Руководство по интеграции",
      intro:
        "Полное руководство по интеграции Qryptum во фронтенд-приложение, включая обнаружение хранилища, защиту и полный поток передачи.",
      h2ProofHashing: "1. Хэширование vault proof",
      pProofHashing:
        "Vault proof должен быть захэширован в браузере до любой on-chain операции. Никогда не отправляйте исходный vault proof на какой-либо бэкенд.",
      h2ProofFormat: "2. Валидация формата vault proof",
      pProofFormat:
        "Vault proof должен содержать ровно 6 символов: 3 буквы и 3 цифры. Контракт проверяет этот формат при вызове changeVaultProof(). Выполняйте валидацию в браузере перед отправкой:",
      h2VaultStatus: "3. Определение статуса хранилища",
      h2ShieldedBalances: "4. Считывание защищённых балансов",
      h2NetworkConfig: "5. Конфигурация сети",
      h2RecordTx: "6. Запись транзакций в API",
      pRecordTx:
        "После каждой успешной on-chain транзакции записывайте её в бэкенд API Qryptum для отображения в истории дашборда:",
      h2EnvVars: "Переменные окружения",
      envHeaders: ["Переменная", "Описание"],
      envRows: [
        ["VITE_SHIELD_FACTORY_SEPOLIA", "Адрес ShieldFactory в Sepolia"],
        ["VITE_SHIELD_FACTORY_MAINNET", "Адрес ShieldFactory в основной сети (устанавливается после деплоя)"],
        ["VITE_ALCHEMY_SEPOLIA_URL", "Опционально: Alchemy RPC для чтения из Sepolia"],
        ["VITE_ALCHEMY_MAINNET_URL", "Опционально: Alchemy RPC для чтения из основной сети"],
        ["VITE_WALLETCONNECT_PROJECT_ID", "Опционально: ID проекта WalletConnect Cloud"],
      ],
    },
    apiReference: {
      title: "Справочник API",
      intro:
        "Бэкенд API Qryptum: REST API для чтения и записи данных о регистрации хранилищ и истории транзакций. Он никогда не получает vault proof или приватные ключи.",
      calloutBaseUrl: "Базовый URL:",
      h2Health: "Проверка работоспособности",
      h3Healthz: "GET /api/healthz",
      pHealthz: "Базовая проверка работоспособности. Возвращает ответ немедленно без обращения к БД.",
      h3Health: "GET /api/health",
      pHealth: "Полная проверка работоспособности. Выполняет SELECT 1 к базе данных.",
      h2Vaults: "Хранилища",
      h3PostVaults: "POST /api/vaults",
      pPostVaults: "Регистрирует запись хранилища после подтверждения транзакции createVault() пользователя on-chain.",
      h3GetVault: "GET /api/vaults/:walletAddress",
      pGetVault: "Получает регистрационную запись хранилища для адреса кошелька.",
      h3VerifyVault: "POST /api/vault/verify",
      pVerifyVault: "Проверяет существование записи хранилища для адреса кошелька. Возвращает только булево значение, никогда не возвращает данные vault proof.",
      h2Transactions: "Транзакции",
      h3PostTx: "POST /api/transactions",
      pPostTx: "Записывает подтверждённую on-chain транзакцию. Вызывайте после того, как waitForTransactionReceipt() вернул успешный результат.",
      h3GetTx: "GET /api/transactions/:walletAddress",
      pGetTx: "Получает историю транзакций для кошелька. По умолчанию возвращает 50 последних, отсортированных от новых к старым.",
      h2Errors: "Ответы об ошибках",
      errorHeaders: ["Статус", "Тело", "Значение"],
      errorRows: [
        ["400", "{ \"error\": \"...\" }", "Ошибка валидации тела запроса"],
        ["404", "{ \"error\": \"...\" }", "Запись не найдена"],
        ["409", "{ \"error\": \"...\" }", "Дублирующийся адрес кошелька при создании хранилища"],
        ["500", "{ \"error\": \"Internal error\" }", "Ошибка сервера или базы данных"],
      ],
    },
    commitReveal: {
      title: "Схема Commit-Reveal",
      intro:
        "Передачи в Qryptum используют двухэтапную схему commit-reveal. Этап commit записывает хэш on-chain без раскрытия vault proof. Этап reveal верифицирует хэш и выполняет передачу.",
      h2WhyTwo: "Почему два шага",
      pWhyTwo1:
        "Одноэтапная передача обнажала бы vault proof в мемпуле до включения транзакции в блок. Вредоносный майнер мог бы наблюдать proof и попытаться совершить фронтраннинг транзакции. Схема commit-reveal решает это: этап commit отправляет только хэш (без proof), а этап reveal действителен только после включения коммита в блок.",
      pWhyTwo2:
        "Кроме того, каждый хэш коммита включает уникальный случайный nonce, делая атаки воспроизведения невозможными даже при повторном использовании тех же параметров передачи.",
      h2Implementation: "Пошаговая реализация (viem)",
      h3Step1: "Шаг 1: Формирование хэша коммита",
      h3Step2: "Шаг 2: Отправка коммита",
      h3Step3: "Шаг 3: Ожидание следующего блока",
      h3Step4: "Шаг 4: Выполнение раскрытия",
      h2Constraints: "Ограничения",
      constraintHeaders: ["Ограничение", "Значение", "Кто проверяет"],
      constraintRows: [
        ["Минимальный интервал блоков", "1 блок", "Контракт проверяет block.number > commit.blockNumber"],
        ["Истечение коммита", "600 секунд (10 минут)", "Контракт проверяет block.timestamp - commit.timestamp <= 600"],
        ["Защита от воспроизведения", "Каждый хэш коммита можно использовать один раз", "commit.used == true откатывается при повторном использовании"],
        ["Перевод самому себе", "Заблокирован", "require(to != msg.sender)"],
      ],
      h2Recipient: "Что получает получатель",
      pRecipient:
        "Получатель всегда получает реальный токен ERC-20 (например USDC), а не qToken. qToken сжигается во время revealTransfer(). Кошелёк получателя не обязан быть пользователем Qryptum. Полученные токены можно использовать свободно или защитить в собственном Qrypt-Safe.",
    },
    abiReference: {
      title: "Справочник ABI",
      intro:
        "Human-readable ABI для всех контрактов Qryptum. Используйте их для чтения и записи в контракты через viem, ethers.js или любую EVM-совместимую библиотеку.",
      h2FactoryAbi: "ABI ShieldFactory",
      h2VaultAbi: "ABI PersonalVault",
      h2QTokenAbi: "ABI ShieldToken (qToken)",
      h2Erc20Abi: "Минимальный ABI ERC-20 (для базовых токенов)",
      h2Addresses: "Адреса контрактов",
      addressHeaders: ["Сеть", "Chain ID", "ShieldFactory"],
      addressRows: [
        ["Sepolia (v6: активный)", "11155111", "Ожидается — см. страницу Deployed Addresses"],
        ["Ethereum Mainnet", "1", "Ожидается деплой"],
      ],
    },
  },

  zh: {
    quickStart: {
      title: "快速入门",
      intro:
        "本指南展示如何使用 viem 或 ethers.js 从 JavaScript 或 TypeScript 应用程序与 Qryptum 合约交互。",
      h2Prerequisites: "前提条件",
      prerequisites: [
        "拥有 Sepolia ETH 用于 Gas 的以太坊钱包",
        "用于测试的 Sepolia USDC 或其他 ERC-20 代币",
        "Node.js 18+ 和包管理器",
      ],
      h2Install: "安装依赖",
      h2Connect: "连接到 ShieldFactory（viem）",
      h2CheckVault: "检查保险库是否存在",
      h2Create: "创建 Qrypt-Safe",
      h2Shield: "存入代币",
      calloutProof:
        "保险库密码字符串在 shield()、unshield() 和 revealTransfer() 期间以明文 calldata 传递。它在 Etherscan 上的交易中可见。这是可接受的，因为没有私钥的保险库密码毫无用处，而且所有保险库函数都有 onlyOwner 修饰符。",
      h2NextSteps: "后续步骤",
      nextSteps: [
        "查看集成指南了解完整的提交-揭示转账实现",
        "查看 ABI 参考了解所有合约的完整 ABI",
        "查看 API 参考了解后端 REST API",
      ],
    },
    integrationGuide: {
      title: "集成指南",
      intro:
        "将 Qryptum 集成到前端应用程序的完整指南，包括保险库检测、代币存入和完整转账流程。",
      h2ProofHashing: "1. 保险库密码哈希",
      pProofHashing:
        "在任何链上操作之前，保险库密码必须在浏览器中进行哈希处理。永远不要将原始保险库密码发送到任何后端。",
      h2ProofFormat: "2. 保险库密码格式验证",
      pProofFormat:
        "保险库密码必须恰好是 6 个字符：3 个字母和 3 个数字。调用 changeVaultProof() 时合约会强制执行此格式。在提交前在浏览器中进行验证：",
      h2VaultStatus: "3. 检测保险库状态",
      h2ShieldedBalances: "4. 读取存入余额",
      h2NetworkConfig: "5. 网络配置",
      h2RecordTx: "6. 向 API 记录交易",
      pRecordTx:
        "每次成功的链上交易后，将其记录到 Qryptum 后端 API 以在仪表板历史中显示：",
      h2EnvVars: "环境变量",
      envHeaders: ["变量", "描述"],
      envRows: [
        ["VITE_SHIELD_FACTORY_SEPOLIA", "Sepolia 上的 ShieldFactory 地址"],
        ["VITE_SHIELD_FACTORY_MAINNET", "主网上的 ShieldFactory 地址（部署后设置）"],
        ["VITE_ALCHEMY_SEPOLIA_URL", "可选：用于 Sepolia 读取的 Alchemy RPC"],
        ["VITE_ALCHEMY_MAINNET_URL", "可选：用于主网读取的 Alchemy RPC"],
        ["VITE_WALLETCONNECT_PROJECT_ID", "可选：WalletConnect Cloud 项目 ID"],
      ],
    },
    apiReference: {
      title: "API 参考",
      intro:
        "Qryptum 后端 API 是一个读写 REST API，用于记录和检索保险库注册信息和交易历史。它从不接收保险库密码或私钥。",
      calloutBaseUrl: "基础 URL：",
      h2Health: "健康检查",
      h3Healthz: "GET /api/healthz",
      pHealthz: "基本健康检查。不调用数据库，立即返回。",
      h3Health: "GET /api/health",
      pHealth: "完整健康检查。对数据库执行 SELECT 1。",
      h2Vaults: "保险库",
      h3PostVaults: "POST /api/vaults",
      pPostVaults: "在用户的 createVault() 交易在链上确认后注册保险库记录。",
      h3GetVault: "GET /api/vaults/:walletAddress",
      pGetVault: "检索钱包地址的保险库注册信息。",
      h3VerifyVault: "POST /api/vault/verify",
      pVerifyVault: "检查钱包地址是否存在保险库记录。仅返回布尔值，从不返回保险库密码数据。",
      h2Transactions: "交易",
      h3PostTx: "POST /api/transactions",
      pPostTx: "记录已确认的链上交易。在 waitForTransactionReceipt() 返回成功收据后调用。",
      h3GetTx: "GET /api/transactions/:walletAddress",
      pGetTx: "检索钱包的交易历史。默认返回最近 50 条，按最新排序。",
      h2Errors: "错误响应",
      errorHeaders: ["状态码", "响应体", "含义"],
      errorRows: [
        ["400", "{ \"error\": \"...\" }", "请求体验证错误"],
        ["404", "{ \"error\": \"...\" }", "记录未找到"],
        ["409", "{ \"error\": \"...\" }", "创建保险库时钱包地址重复"],
        ["500", "{ \"error\": \"Internal error\" }", "服务器或数据库错误"],
      ],
    },
    commitReveal: {
      title: "提交-揭示流程",
      intro:
        "Qryptum 的转账使用两步提交-揭示方案。提交步骤在不揭示保险库密码的情况下在链上记录哈希。揭示步骤验证哈希并执行转账。",
      h2WhyTwo: "为何需要两步",
      pWhyTwo1:
        "单步转账会在交易打包到区块前将保险库密码暴露在内存池中。恶意矿工可能观察到密码并尝试抢先交易。提交-揭示方案解决了这个问题：提交步骤只提交哈希（无密码），揭示步骤只有在提交被打包到区块后才有效。",
      pWhyTwo2:
        "此外，每个提交哈希包含一个唯一的随机 nonce，即使再次使用相同的转账参数也无法进行重放攻击。",
      h2Implementation: "逐步实现（viem）",
      h3Step1: "第 1 步：构建提交哈希",
      h3Step2: "第 2 步：提交",
      h3Step3: "第 3 步：等待下一个区块",
      h3Step4: "第 4 步：执行揭示",
      h2Constraints: "约束条件",
      constraintHeaders: ["约束", "值", "由谁执行"],
      constraintRows: [
        ["最小区块间隔", "1 个区块", "合约检查 block.number > commit.blockNumber"],
        ["提交到期", "600 秒（10 分钟）", "合约检查 block.timestamp - commit.timestamp <= 600"],
        ["防重放", "每个提交哈希只能使用一次", "commit.used == true 在重用时回滚"],
        ["自转账", "禁止", "require(to != msg.sender)"],
      ],
      h2Recipient: "接收方收到什么",
      pRecipient:
        "接收方始终收到原始 ERC-20 代币（例如 USDC），而非 qToken。qToken 在 revealTransfer() 期间被销毁。接收方钱包无需是 Qryptum 用户，可以自由使用收到的代币，或选择将其存入自己的 Qrypt-Safe。",
    },
    abiReference: {
      title: "ABI 参考",
      intro:
        "所有 Qryptum 合约的人类可读 ABI。使用这些 ABI 通过 viem、ethers.js 或任何 EVM 兼容库读写合约。",
      h2FactoryAbi: "ShieldFactory ABI",
      h2VaultAbi: "PersonalVault ABI",
      h2QTokenAbi: "ShieldToken（qToken）ABI",
      h2Erc20Abi: "最小 ERC-20 ABI（用于底层代币）",
      h2Addresses: "合约地址",
      addressHeaders: ["网络", "Chain ID", "ShieldFactory"],
      addressRows: [
        ["Sepolia（v6: 活跃）", "11155111", "待定 — 请见 Deployed Addresses 页面"],
        ["以太坊主网", "1", "待部署"],
      ],
    },
  },
};
