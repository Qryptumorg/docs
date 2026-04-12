export type ContractsContent = {
  deployedAddresses: {
    title: string;
    h2Sepolia: string;
    calloutActive: string;
    h3V3Active: string;
    pV3: string;
    h3V2Superseded: string;
    pV2: string;
    h3V1Superseded: string;
    pV1: string;
    tableHeaders: [string, string, string];
    statusVerified: string;
    statusSuperseded: string;
    statusDecommissioned: string;
    statusPending: string;
    h3V5Active: string;
    pV5: string;
    h3V4Decommissioned: string;
    pV4: string;
    calloutActiveV6: string;
    h3V6Active: string;
    pV6: string;
    linkV6Factory: string;
    linkV6Impl: string;
    calloutActiveV5: string;
    linkV5Factory: string;
    linkV5Impl: string;
    linkV4Factory: string;
    linkV3Factory: string;
    linkV3Impl: string;
    linkV2Factory: string;
    linkV1Factory: string;
    h2Mainnet: string;
    calloutMainnet: string;
    h2TestWallets: string;
    pTestWallets: string;
    testWalletHeaders: [string, string, string];
    testWalletRows: [string, string, string][];
    h2SupportedNetworks: string;
    pSupportedNetworks: string;
    networkHeaders: [string, string, string];
    networkRows: [string, string, string][];
  };
  shieldFactory: {
    title: string;
    intro: string;
    calloutAddressV6: string;
    calloutV6Note: string;
    calloutAddressV5: string;
    calloutV5Note: string;
    calloutAddressV4: string;
    calloutAddressV3: string;
    calloutAddressV2: string;
    calloutV3Note: string;
    calloutV2Note: string;
    calloutAddressV1: string;
    h2Design: string;
    pDesign: string;
    calloutNoAdmin: string;
    h2StateVars: string;
    stateHeaders: [string, string, string];
    stateRows: [string, string, string][];
    h2Functions: string;
    h3CreateVault: string;
    pCreateVault: string;
    revertHeaders: [string, string];
    createVaultReverts: [string, string][];
    h3HasVault: string;
    pHasVault: string;
    h3GetVault: string;
    pGetVault: string;
    h2Events: string;
    eventHeaders: [string, string, string];
    eventRows: [string, string, string][];
  };
  personalVault: {
    title: string;
    intro: string;
    h2Inheritance: string;
    h2Constants: string;
    constantHeaders: [string, string, string];
    constantRows: [string, string, string][];
    h2Functions: string;
    h3Initialize: string;
    pInitialize: string;
    h3Shield: string;
    pShield: string;
    shieldReverts: [string, string][];
    h3Unshield: string;
    pUnshield: string;
    h3CommitTransfer: string;
    pCommitTransfer: string;
    h3RevealTransfer: string;
    pRevealTransfer: string;
    revealReverts: [string, string][];
    h3ChangeVaultProof: string;
    pChangeVaultProof: string;
    h3EmergencyWithdraw: string;
    pEmergencyWithdraw: string;
    h2Events: string;
    eventHeaders: [string, string];
    eventRows: [string, string][];
  };
  qtoken: {
    title: string;
    intro: string;
    h2KeyDiff: string;
    pKeyDiff: string;
    h2Inheritance: string;
    h2Constructor: string;
    pConstructor: string;
    calloutDecimals: string;
    h2Overridden: string;
    h2MintBurn: string;
    pMintBurn: string;
    h2Naming: string;
    pNaming: string;
    h2OneContract: string;
    pOneContract: string;
    tableHeaders: [string, string, string, string];
  };
};

export const contractsContent: Record<"en" | "ru" | "zh", ContractsContent> = {
  en: {
    deployedAddresses: {
      title: "Deployed Addresses",
      h2Sepolia: "Sepolia Testnet (Chain ID: 11155111)",
      calloutActive: "Active deployment: v3. v2 and v1 are preserved below for historical reference. All new Qrypt-Safe deployments use the v3 factory.",
      h3V3Active: "v3: Active (no admin keys)",
      pV3:
        "Redeployed to remove Ownable and Pausable from the factory. QryptSafe v3 is fully immutable: no one can pause vault creation or call privileged functions. The contracts are renamed QryptSafe (factory) and PersonalQryptSafe (vault implementation).",
      h3V2Superseded: "v2: Superseded (had admin keys)",
      pV2:
        "Fixed qToken decimal precision vs v1. Superseded by v3: ShieldFactory v2 had Ownable and Pausable, meaning the deployer could pause vault creation. v3 removes this entirely.",
      h3V1Superseded: "v1: Superseded (decimal precision bug)",
      pV1:
        "Initial deployment. ShieldToken did not read decimals() from the underlying token. All qTokens defaulted to 18 decimals, causing incorrect display in Etherscan and wallets. These contracts remain on-chain but the app no longer points to this factory.",
      tableHeaders: ["Contract", "Address", "Status"],
      statusVerified: "Verified",
      statusSuperseded: "Superseded",
      statusDecommissioned: "Decommissioned",
      statusPending: "Pending",
      calloutActiveV6: "Active deployment: v6. v5, v4, v3, v2, and v1 are preserved below for historical reference. All new Qrypt-Safe deployments use the v6 factory.",
      h3V6Active: "v6: Active (OTP chain · air bags · 49/49 E2E · MIT verified)",
      pV6: "Security upgrade from v5. OTP chain replaces the static bytes32 proofHash: each proof is single-use and advances the chain head, making replay attacks structurally impossible. Air bags isolation separates QryptAir funds from the shielded balance. rechargeChain() allows OTP top-up. 49/49 E2E tests pass on Sepolia. Factory and implementation MIT-verified on Etherscan.",
      linkV6Factory: "QryptSafe v6 factory on Sepolia Etherscan",
      linkV6Impl: "PersonalQryptSafe v6 implementation on Sepolia Etherscan",
      calloutActiveV5: "v5 superseded by v6. v5 remains below for historical reference.",
      h3V5Active: "v5: Superseded by v6 (bytes32 proofHash · QryptAir EIP-712 · QryptShield Railgun)",
      pV5: "Canonical v5 deployment. bytes32 proofHash replaces string vaultProof, enabling EIP-712 struct-hash compatibility. unshieldToRailgun() added for QryptShield. redeemVoucher() added for QryptAir offline transfers. 32/32 E2E tests pass on Sepolia. MIT-verified on Etherscan. Superseded by v6 (OTP chain upgrade).",
      h3V4Decommissioned: "v4: Decommissioned (superseded by v5)",
      pV4: "Added QryptAir EIP-712 vouchers and QryptShield Railgun integration. Used string vaultProof in calldata. Superseded by v5 (bytes32 proofHash upgrade for full EIP-712 struct-hash compatibility).",
      linkV5Factory: "QryptSafe v5 factory on Sepolia Etherscan",
      linkV5Impl: "PersonalQryptSafe v5 implementation on Sepolia Etherscan",
      linkV4Factory: "QryptSafe v4 on Sepolia Etherscan (decommissioned)",
      linkV3Factory: "QryptSafe v3 on Sepolia Etherscan",
      linkV3Impl: "PersonalQryptSafe v3 on Sepolia Etherscan",
      linkV2Factory: "ShieldFactory v2 on Sepolia Etherscan",
      linkV1Factory: "ShieldFactory v1 on Sepolia Etherscan",
      h2Mainnet: "Ethereum Mainnet (Chain ID: 1)",
      calloutMainnet:
        "Mainnet deployment is pending. This table will be updated after deployment and Etherscan verification.",
      h2TestWallets: "Test Wallets and Contracts (Sepolia)",
      pTestWallets: "These wallets were used for automated E2E testing on Sepolia. They hold no mainnet assets.",
      testWalletHeaders: ["Label", "Address", "Notes"],
      testWalletRows: [],
      h2SupportedNetworks: "Supported Networks",
      pSupportedNetworks:
        "The frontend recognizes three chain IDs. Any other connected network displays an unsupported network warning.",
      networkHeaders: ["Network", "Chain ID", "Use Case"],
      networkRows: [
        ["Ethereum Mainnet", "1", "Production"],
        ["Sepolia", "11155111", "Testnet (live)"],
        ["Hardhat Local", "31337", "Development"],
      ],
    },
    shieldFactory: {
      title: "QryptSafe (Factory)",
      intro:
        "QryptSafe is the entry point for all Qrypt-Safe deployments. It uses the EIP-1167 minimal proxy pattern to deploy a unique PersonalVault for each wallet address. Version 6 is the current active deployment on Sepolia (OTP chain, air bags isolation, 49/49 E2E). v5, v3, and v2 are preserved below for historical reference.",
      calloutAddressV6: "Sepolia address (v6: active, OTP chain):",
      calloutV6Note: "v6 is the current canonical factory. OTP chain replaces static bytes32 proofHash. Air bags isolation for QryptAir. rechargeChain() for OTP top-up. 49/49 E2E tests pass. MIT-verified on Etherscan.",
      calloutAddressV5: "Sepolia address (v5: superseded by v6):",
      calloutV5Note: "v5 is superseded by v6 (OTP chain upgrade). bytes32 proofHash, unshieldToRailgun() (QryptShield), redeemVoucher() EIP-712 (QryptAir). 51 tests. MIT-verified on Etherscan.",
      calloutAddressV4: "Sepolia address (v4: historical):",
      calloutAddressV3: "Sepolia address (v3: historical):",
      calloutAddressV2: "Sepolia address (v2: historical):",
      calloutAddressV1: "Sepolia address (v1: historical, critical bug):",
      calloutV3Note:
        "v3 is the current active factory. No admin keys, no owner, no pause function. Vault creation is always open.",
      calloutV2Note:
        "v2 was superseded by v3. The v2 factory had Ownable and Pausable, meaning the deployer could pause vault creation. v3 removes all admin control.",
      h2Design: "Contract Design (v3)",
      pDesign:
        "v3 removes all privileged roles. There is no owner and no pause mechanism. The contract imports only the Clones library for EIP-1167 proxy deployment. Anyone can call createVault at any time.",
      calloutNoAdmin: "No admin keys exist in v3. The deployer has zero special access. No one can pause, upgrade, or interfere with vault creation.",
      h2StateVars: "State Variables",
      stateHeaders: ["Variable", "Type", "Description"],
      stateRows: [
        ["vaultImplementation", "address immutable", "The PersonalVault implementation contract. Set in the constructor, never changed."],
        ["vaults", "mapping(address => address) private", "Maps wallet address to deployed vault address."],
      ],
      h2Functions: "Functions",
      h3CreateVault: "createVault",
      pCreateVault:
        "Deploys a new PersonalVault clone for msg.sender. Reverts if a vault already exists for this wallet. The passwordHash must be keccak256(abi.encodePacked(rawVaultProof)) computed off-chain in the browser. The raw vault proof never reaches this function.",
      revertHeaders: ["Revert Condition", "Message"],
      createVaultReverts: [
        ["Vault already exists", "\"Qrypt-Safe already exists for this wallet\""],
      ],
      h3HasVault: "hasVault",
      pHasVault: "Returns true if the wallet has a deployed Qrypt-Safe.",
      h3GetVault: "getVault",
      pGetVault: "Returns the vault contract address for the given wallet. Returns address(0) if no vault exists.",
      h2Events: "Events",
      eventHeaders: ["Event", "Parameters", "Emitted When"],
      eventRows: [
        ["VaultCreated", "owner (indexed), vault (indexed)", "A new PersonalVault is successfully deployed"],
      ],
    },
    personalVault: {
      title: "PersonalVault",
      intro:
        "PersonalVault is the core contract for each Qrypt-Safe. It handles shielding, unshielding, commit-reveal transfers, vault proof management, and emergency withdrawal. One PersonalVault is deployed per wallet via the ShieldFactory.",
      h2Inheritance: "Inheritance",
      h2Constants: "Constants",
      constantHeaders: ["Constant", "Value", "Meaning"],
      constantRows: [
        ["COMMIT_EXPIRY_SECONDS", "600", "Reveal must happen within 10 minutes of commit"],
        ["MINIMUM_SHIELD_AMOUNT", "1_000_000", "Minimum shield amount in token base units"],
        ["EMERGENCY_DELAY_BLOCKS", "1_296_000", "Approximately 6 months of inactivity before emergency withdrawal is available"],
      ],
      h2Functions: "Functions",
      h3Initialize: "initialize",
      pInitialize: "Called once by the ShieldFactory immediately after cloning. Sets the owner and vault proof hash. Reverts if called again.",
      h3Shield: "shield",
      pShield:
        "Pulls ERC-20 tokens from the owner's wallet into the vault and mints an equivalent amount of qTokens. Verifies the vault proof. Uses a balance-before/after pattern to handle fee-on-transfer tokens correctly.",
      shieldReverts: [
        ["Wrong vault proof", "\"Invalid vault proof\""],
        ["Amount below minimum", "\"Amount below minimum\""],
        ["Not the vault owner", "\"Not vault owner\""],
      ],
      h3Unshield: "unshield",
      pUnshield: "Burns qTokens and returns the underlying ERC-20 to the owner's wallet.",
      h3CommitTransfer: "commitTransfer",
      pCommitTransfer: "Step 1 of the two-step transfer. Records the commit hash, current block number, and timestamp. The vault proof is not included in this call.",
      h3RevealTransfer: "revealTransfer",
      pRevealTransfer:
        "Step 2. Verifies the commit hash matches the stored commit, checks the 10-minute expiry window, verifies the vault proof, burns qTokens, and sends real ERC-20 directly to the recipient wallet. The recipient always receives the raw ERC-20, never qTokens.",
      revealReverts: [
        ["Commit not found", "\"Commit not found\""],
        ["Commit already used", "\"Commit already used\""],
        ["Commit expired", "\"Commit expired\""],
        ["Hash mismatch", "\"Commit hash mismatch\""],
        ["Wrong vault proof", "\"Invalid vault proof\""],
        ["Self-transfer", "\"Cannot transfer to yourself\""],
      ],
      h3ChangeVaultProof: "changeVaultProof",
      pChangeVaultProof: "Changes the vault proof. Requires the current proof to be correct. The new proof must match the 3-letter + 3-digit format.",
      h3EmergencyWithdraw: "emergencyWithdraw",
      pEmergencyWithdraw: "Available only after EMERGENCY_DELAY_BLOCKS of inactivity. Requires only the private key, not the vault proof. Burns all qTokens and sends all underlying tokens to the owner.",
      h2Events: "Events",
      eventHeaders: ["Event", "Parameters"],
      eventRows: [
        ["TokenShielded", "token (indexed), amount, qToken (indexed)"],
        ["TokenUnshielded", "token (indexed), amount"],
        ["TransferExecuted", "token (indexed), to (indexed), amount"],
        ["QTokenDeployed", "token (indexed), qToken (indexed)"],
        ["CommitSubmitted", "commitHash (indexed)"],
        ["VaultProofChanged", "(no parameters)"],
        ["EmergencyWithdraw", "token (indexed), amount"],
      ],
    },
    qtoken: {
      title: "qToken (ShieldToken)",
      intro:
        "ShieldToken is the contract behind every qToken (qUSDC, qUSDT, qWETH, etc.). It is an ERC-20 with all transfer-related functions permanently disabled. Only the parent vault contract can mint or burn.",
      h2KeyDiff: "Key Difference from Standard ERC-20",
      pKeyDiff:
        "A standard ERC-20 exposes three functions that allow tokens to move between addresses: transfer(), transferFrom(), and approve(). ShieldToken overrides all three with unconditional reverts. No amount of gas or clever contract call can bypass this, because the functions are marked pure (no state reads, no conditions, just revert).",
      h2Inheritance: "Inheritance",
      h2Constructor: "Constructor",
      pConstructor:
        "Called by PersonalVault when a token is shielded for the first time. The vault address is the PersonalVault instance that owns this qToken. The decimals_ value is read from the underlying ERC-20 before deployment and stored permanently. This ensures Etherscan, MetaMask, and all wallets display the correct token amount regardless of the underlying token's decimal precision.",
      calloutDecimals:
        "Why this matters: OpenZeppelin ERC20 defaults to 18 decimals. USDC has 6 decimals. Without this fix, 9.5 qUSDC would display as 0.0000000000095 in Etherscan. The constructor parameter was added in the v2 deployment.",
      h2Overridden: "Overridden Functions",
      h2MintBurn: "Mint and Burn",
      pMintBurn: "Only the vault contract can call mint() and burn(). Attempts from any other address revert with \"Only Qrypt-Safe can call this\".",
      h2Naming: "Token Naming Convention",
      pNaming: "When deployed, the qToken reads the underlying token's name and symbol and prepends q:",
      h2OneContract: "One Contract Per Token Per Vault",
      pOneContract:
        "Each PersonalVault deploys its own set of qToken contracts. User A and User B each have their own qUSDC at different addresses. The balances are attributed to the user's wallet address in the qToken's ERC-20 balance mapping.",
      tableHeaders: ["User", "Token", "qToken Contract", "Balance Attributed To"],
    },
  },

  ru: {
    deployedAddresses: {
      title: "Задеплоенные адреса",
      h2Sepolia: "Тестовая сеть Sepolia (Chain ID: 11155111)",
      calloutActive: "Активный деплой: v3. v2 и v1 сохранены ниже для исторической справки. Все новые Qrypt-Safe используют фабрику v3.",
      h3V3Active: "v3: Активный (без административных ключей)",
      pV3:
        "Передеплоен для удаления Ownable и Pausable из фабрики. QryptSafe v3 полностью неизменяем: никто не может приостановить создание хранилища или вызвать привилегированные функции. Контракты переименованы: QryptSafe (фабрика) и PersonalQryptSafe (реализация хранилища).",
      h3V2Superseded: "v2: Устаревший (имел административные ключи)",
      pV2:
        "Исправлена точность десятичных знаков qToken относительно v1. Заменён v3: ShieldFactory v2 имел Ownable и Pausable, то есть деплойер мог приостанавливать создание хранилищ. v3 полностью это устраняет.",
      h3V1Superseded: "v1: Устаревший (ошибка точности десятичных знаков)",
      pV1:
        "Первоначальный деплой. ShieldToken не считывал decimals() из базового токена. Все qToken использовали 18 знаков по умолчанию, вызывая некорректное отображение в Etherscan и кошельках. Эти контракты остаются в сети, но приложение больше не указывает на эту фабрику.",
      tableHeaders: ["Контракт", "Адрес", "Статус"],
      statusVerified: "Верифицирован",
      statusSuperseded: "Устарел",
      statusDecommissioned: "Выведен",
      statusPending: "Ожидается",
      calloutActiveV6: "Активное развёртывание: v6. v5, v4, v3, v2 и v1 сохранены ниже для исторической справки. Все новые Qrypt-Safe используют фабрику v6.",
      h3V6Active: "v6: Активен (OTP-цепочка · air bags · 49/49 E2E · MIT-верифицирован)",
      pV6: "Обновление безопасности от v5. OTP-цепочка заменяет статический bytes32 proofHash: каждый proof используется один раз и продвигает голову цепочки, делая атаки воспроизведения структурно невозможными. Изоляция air bags отделяет средства QryptAir от защищённого баланса. rechargeChain() позволяет пополнять OTP. 49/49 E2E-тестов проходят на Sepolia. Фабрика и реализация MIT-верифицированы на Etherscan.",
      linkV6Factory: "Фабрика QryptSafe v6 на Sepolia Etherscan",
      linkV6Impl: "Имплементация PersonalQryptSafe v6 на Sepolia Etherscan",
      calloutActiveV5: "v5 заменён v6. v5 сохранён ниже для исторической справки.",
      h3V5Active: "v5: Заменён v6 (bytes32 proofHash · QryptAir EIP-712 · QryptShield Railgun)",
      pV5: "Каноническое развёртывание v5. bytes32 proofHash заменяет string vaultProof, обеспечивая совместимость с EIP-712 struct-hash. Добавлен unshieldToRailgun() для QryptShield. Добавлен redeemVoucher() для QryptAir офлайн-переводов. 32/32 E2E-теста проходят на Sepolia. MIT-верифицирован на Etherscan. Заменён v6 (обновление OTP-цепочки).",
      h3V4Decommissioned: "v4: Выведен (заменён v5)",
      pV4: "Добавлены QryptAir EIP-712 ваучеры и интеграция QryptShield Railgun. Использовал string vaultProof в calldata. Заменён v5 (переход на bytes32 proofHash для полной совместимости с EIP-712 struct-hash).",
      linkV5Factory: "Фабрика QryptSafe v5 на Sepolia Etherscan",
      linkV5Impl: "Имплементация PersonalQryptSafe v5 на Sepolia Etherscan",
      linkV4Factory: "QryptSafe v4 на Sepolia Etherscan (выведен)",
      linkV3Factory: "QryptSafe v3 в Sepolia Etherscan",
      linkV3Impl: "PersonalQryptSafe v3 в Sepolia Etherscan",
      linkV2Factory: "ShieldFactory v2 в Sepolia Etherscan",
      linkV1Factory: "ShieldFactory v1 в Sepolia Etherscan",
      h2Mainnet: "Ethereum Mainnet (Chain ID: 1)",
      calloutMainnet:
        "Деплой в основную сеть ожидается. Эта таблица будет обновлена после деплоя и верификации в Etherscan.",
      h2TestWallets: "Тестовые кошельки и контракты (Sepolia)",
      pTestWallets: "Эти кошельки использовались для автоматического E2E-тестирования в Sepolia. Они не содержат активов основной сети.",
      testWalletHeaders: ["Метка", "Адрес", "Примечания"],
      testWalletRows: [],
      h2SupportedNetworks: "Поддерживаемые сети",
      pSupportedNetworks:
        "Фронтенд распознаёт три chain ID. При подключении к любой другой сети отображается предупреждение о неподдерживаемой сети.",
      networkHeaders: ["Сеть", "Chain ID", "Использование"],
      networkRows: [
        ["Ethereum Mainnet", "1", "Продакшн"],
        ["Sepolia", "11155111", "Тестнет (активен)"],
        ["Hardhat Local", "31337", "Разработка"],
      ],
    },
    shieldFactory: {
      title: "QryptSafe (Фабрика)",
      intro:
        "QryptSafe: точка входа для всех деплоев Qrypt-Safe. Использует паттерн EIP-1167 минимального прокси для деплоя уникального PersonalVault для каждого адреса кошелька. Версия 6 является текущим активным деплоем в Sepolia (OTP-цепочка, изоляция air bags, 49/49 E2E). v5, v3 и v2 сохранены ниже для исторической справки.",
      calloutAddressV6: "Адрес в Sepolia (v6: активный, OTP-цепочка):",
      calloutV6Note: "v6: текущая каноническая фабрика. OTP-цепочка заменяет статический bytes32 proofHash. Изоляция air bags для QryptAir. rechargeChain() для пополнения OTP. 49/49 E2E-тестов проходят. MIT-верифицирован на Etherscan.",
      calloutAddressV5: "Адрес в Sepolia (v5: заменён v6):",
      calloutV5Note: "v5 заменён v6 (обновление OTP-цепочки). bytes32 proofHash, unshieldToRailgun() (QryptShield), redeemVoucher() EIP-712 (QryptAir). 51 тест. MIT-верифицирован на Etherscan.",
      calloutAddressV4: "Адрес в Sepolia (v4: исторический):",
      calloutAddressV3: "Адрес в Sepolia (v3: исторический):",
      calloutAddressV2: "Адрес в Sepolia (v2: исторический):",
      calloutAddressV1: "Адрес в Sepolia (v1: исторический, критическая ошибка):",
      calloutV3Note:
        "v3: текущая активная фабрика. Нет административных ключей, нет владельца, нет функции паузы. Создание хранилищ всегда открыто.",
      calloutV2Note:
        "v2 заменён v3. У фабрики v2 были Ownable и Pausable: деплойер мог ставить создание хранилищ на паузу. v3 полностью устраняет административный контроль.",
      h2Design: "Архитектура контракта (v3)",
      pDesign:
        "v3 удаляет все привилегированные роли. Нет владельца, нет механизма паузы. Контракт импортирует только библиотеку Clones для деплоя EIP-1167 прокси. Любой желающий может вызвать createVault в любое время.",
      calloutNoAdmin: "В v3 не существует административных ключей. Деплойер не имеет никаких особых прав. Никто не может приостановить, обновить или иным образом повлиять на создание хранилищ.",
      h2StateVars: "Переменные состояния",
      stateHeaders: ["Переменная", "Тип", "Описание"],
      stateRows: [
        ["vaultImplementation", "address immutable", "Контракт реализации PersonalVault. Устанавливается в конструкторе, никогда не меняется."],
        ["vaults", "mapping(address => address) private", "Сопоставляет адрес кошелька с адресом задеплоенного хранилища."],
      ],
      h2Functions: "Функции",
      h3CreateVault: "createVault",
      pCreateVault:
        "Деплоит новый клон PersonalVault для msg.sender. Откатывается, если хранилище для этого кошелька уже существует. passwordHash должен быть keccak256(abi.encodePacked(rawVaultProof)), вычисленным в браузере. Исходный vault proof никогда не достигает этой функции.",
      revertHeaders: ["Условие отката", "Сообщение"],
      createVaultReverts: [
        ["Хранилище уже существует", "\"Qrypt-Safe already exists for this wallet\""],
      ],
      h3HasVault: "hasVault",
      pHasVault: "Возвращает true, если у кошелька есть задеплоенный Qrypt-Safe.",
      h3GetVault: "getVault",
      pGetVault: "Возвращает адрес контракта хранилища для данного кошелька. Возвращает address(0), если хранилище не существует.",
      h2Events: "События",
      eventHeaders: ["Событие", "Параметры", "Когда эмитируется"],
      eventRows: [
        ["VaultCreated", "owner (indexed), vault (indexed)", "Новый PersonalVault успешно задеплоен"],
      ],
    },
    personalVault: {
      title: "PersonalVault",
      intro:
        "PersonalVault: основной контракт каждого Qrypt-Safe. Обрабатывает защиту, снятие защиты, commit-reveal передачи, управление vault proof и экстренный вывод средств. Один PersonalVault деплоится на кошелёк через ShieldFactory.",
      h2Inheritance: "Наследование",
      h2Constants: "Константы",
      constantHeaders: ["Константа", "Значение", "Смысл"],
      constantRows: [
        ["COMMIT_EXPIRY_SECONDS", "600", "Reveal должен произойти в течение 10 минут после commit"],
        ["MINIMUM_SHIELD_AMOUNT", "1_000_000", "Минимальная сумма защиты в базовых единицах токена"],
        ["EMERGENCY_DELAY_BLOCKS", "1_296_000", "Приблизительно 6 месяцев бездействия до доступности экстренного вывода"],
      ],
      h2Functions: "Функции",
      h3Initialize: "initialize",
      pInitialize: "Вызывается один раз ShieldFactory сразу после клонирования. Устанавливает владельца и хэш vault proof. Откатывается при повторном вызове.",
      h3Shield: "shield",
      pShield:
        "Списывает токены ERC-20 с кошелька владельца в хранилище и минтит эквивалентное количество qToken. Проверяет vault proof. Использует паттерн до/после баланса для корректной обработки токенов с комиссией за перевод.",
      shieldReverts: [
        ["Неверный vault proof", "\"Invalid vault proof\""],
        ["Сумма ниже минимума", "\"Amount below minimum\""],
        ["Не владелец хранилища", "\"Not vault owner\""],
      ],
      h3Unshield: "unshield",
      pUnshield: "Сжигает qToken и возвращает базовый ERC-20 на кошелёк владельца.",
      h3CommitTransfer: "commitTransfer",
      pCommitTransfer: "Шаг 1 двухэтапного перевода. Записывает хэш коммита, текущий номер блока и временную метку. Vault proof не включён в этот вызов.",
      h3RevealTransfer: "revealTransfer",
      pRevealTransfer:
        "Шаг 2. Проверяет соответствие хэша коммита сохранённому, проверяет 10-минутное окно истечения, верифицирует vault proof, сжигает qToken и отправляет реальный ERC-20 напрямую на кошелёк получателя. Получатель всегда получает реальный ERC-20, а не qToken.",
      revealReverts: [
        ["Коммит не найден", "\"Commit not found\""],
        ["Коммит уже использован", "\"Commit already used\""],
        ["Коммит истёк", "\"Commit expired\""],
        ["Несоответствие хэша", "\"Commit hash mismatch\""],
        ["Неверный vault proof", "\"Invalid vault proof\""],
        ["Перевод самому себе", "\"Cannot transfer to yourself\""],
      ],
      h3ChangeVaultProof: "changeVaultProof",
      pChangeVaultProof: "Меняет vault proof. Требует правильного текущего proof. Новый proof должен соответствовать формату 3 буквы + 3 цифры.",
      h3EmergencyWithdraw: "emergencyWithdraw",
      pEmergencyWithdraw: "Доступен только после EMERGENCY_DELAY_BLOCKS бездействия. Требует только приватного ключа, не vault proof. Сжигает все qToken и отправляет все базовые токены владельцу.",
      h2Events: "События",
      eventHeaders: ["Событие", "Параметры"],
      eventRows: [
        ["TokenShielded", "token (indexed), amount, qToken (indexed)"],
        ["TokenUnshielded", "token (indexed), amount"],
        ["TransferExecuted", "token (indexed), to (indexed), amount"],
        ["QTokenDeployed", "token (indexed), qToken (indexed)"],
        ["CommitSubmitted", "commitHash (indexed)"],
        ["VaultProofChanged", "(без параметров)"],
        ["EmergencyWithdraw", "token (indexed), amount"],
      ],
    },
    qtoken: {
      title: "qToken (ShieldToken)",
      intro:
        "ShieldToken: контракт, лежащий в основе каждого qToken (qUSDC, qUSDT, qWETH и др.). Это ERC-20 со всеми функциями передачи, навсегда отключёнными. Только родительский контракт хранилища может минтить или сжигать.",
      h2KeyDiff: "Ключевое отличие от стандартного ERC-20",
      pKeyDiff:
        "Стандартный ERC-20 предоставляет три функции, позволяющие токенам перемещаться между адресами: transfer(), transferFrom() и approve(). ShieldToken переопределяет все три безусловными откатами. Никакое количество газа или хитрый вызов контракта не могут это обойти, поскольку функции помечены как pure (без чтения состояния, без условий, только откат).",
      h2Inheritance: "Наследование",
      h2Constructor: "Конструктор",
      pConstructor:
        "Вызывается PersonalVault при первой защите токена. Адрес vault является экземпляром PersonalVault, которому принадлежит данный qToken. Значение decimals_ считывается из базового ERC-20 до деплоя и хранится постоянно. Это гарантирует корректное отображение суммы токена в Etherscan, MetaMask и всех кошельках, независимо от точности базового токена.",
      calloutDecimals:
        "Почему это важно: OpenZeppelin ERC20 по умолчанию использует 18 знаков. У USDC 6 знаков. Без этого исправления 9.5 qUSDC отображались бы как 0.0000000000095 в Etherscan. Параметр конструктора добавлен в деплое v2.",
      h2Overridden: "Переопределённые функции",
      h2MintBurn: "Минтинг и сжигание",
      pMintBurn: "Только контракт хранилища может вызывать mint() и burn(). Попытки с любого другого адреса завершаются ошибкой \"Only Qrypt-Safe can call this\".",
      h2Naming: "Соглашение об именовании токенов",
      pNaming: "При деплое qToken считывает название и символ базового токена и добавляет префикс q:",
      h2OneContract: "Один контракт на токен на хранилище",
      pOneContract:
        "Каждый PersonalVault деплоит собственный набор контрактов qToken. У пользователей A и B есть собственные qUSDC по разным адресам. Балансы приписываются адресу кошелька пользователя в маппинге балансов ERC-20 qToken.",
      tableHeaders: ["Пользователь", "Токен", "Контракт qToken", "Баланс приписан"],
    },
  },

  zh: {
    deployedAddresses: {
      title: "已部署地址",
      h2Sepolia: "Sepolia 测试网（Chain ID: 11155111）",
      calloutActive: "活跃部署：v3。v2 和 v1 保留在下方供历史参考。所有新的 Qrypt-Safe 部署使用 v3 工厂。",
      h3V3Active: "v3: 活跃（无管理员密钥）",
      pV3:
        "重新部署以从工厂移除 Ownable 和 Pausable。QryptSafe v3 完全不可变：没有人可以暂停保险库创建或调用特权函数。合约重命名为 QryptSafe（工厂）和 PersonalQryptSafe（保险库实现）。",
      h3V2Superseded: "v2: 已弃用（曾有管理员密钥）",
      pV2:
        "相对 v1 修复了 qToken 小数精度问题。被 v3 取代：ShieldFactory v2 具有 Ownable 和 Pausable，意味着部署者可以暂停保险库创建。v3 完全移除了这一功能。",
      h3V1Superseded: "v1: 已弃用（小数精度错误）",
      pV1:
        "初始部署。ShieldToken 未从底层代币读取 decimals()。所有 qToken 默认使用 18 位小数，导致在 Etherscan 和钱包中显示错误。这些合约仍在链上，但应用不再指向此工厂。",
      tableHeaders: ["合约", "地址", "状态"],
      statusVerified: "已验证",
      statusSuperseded: "已弃用",
      statusDecommissioned: "已停用",
      statusPending: "待定",
      calloutActiveV6: "当前部署：v6。v5、v4、v3、v2 和 v1 保留在下方供历史参考。所有新 Qrypt-Safe 部署使用 v6 工厂。",
      h3V6Active: "v6：活跃（OTP 链 · air bags · 49/49 E2E · MIT 已验证）",
      pV6: "v5 的安全升级。OTP 链替换静态 bytes32 proofHash：每个 proof 仅可使用一次并推进链头，从结构上使重放攻击不可能发生。Air bags 隔离将 QryptAir 资金与受保护余额分开。rechargeChain() 允许 OTP 补充。Sepolia 上 49/49 E2E 测试全部通过。工厂和实现已在 Etherscan 进行 MIT 验证。",
      linkV6Factory: "Sepolia Etherscan 上的 QryptSafe v6 工厂",
      linkV6Impl: "Sepolia Etherscan 上的 PersonalQryptSafe v6 实现",
      calloutActiveV5: "v5 已被 v6 取代。v5 保留在下方供历史参考。",
      h3V5Active: "v5：已被 v6 取代（bytes32 proofHash · QryptAir EIP-712 · QryptShield Railgun）",
      pV5: "标准 v5 部署。bytes32 proofHash 替换 string vaultProof，实现 EIP-712 struct-hash 兼容性。添加 unshieldToRailgun()（QryptShield）。添加 redeemVoucher()（QryptAir 离线转账）。Sepolia 上 32/32 E2E 测试全部通过。已在 Etherscan 进行 MIT 验证。已被 v6（OTP 链升级）取代。",
      h3V4Decommissioned: "v4：已停用（被 v5 取代）",
      pV4: "添加了 QryptAir EIP-712 凭证和 QryptShield Railgun 集成。使用 string vaultProof 写入 calldata。被 v5 取代（升级为 bytes32 proofHash 以完全兼容 EIP-712 struct-hash）。",
      linkV5Factory: "Sepolia Etherscan 上的 QryptSafe v5 工厂",
      linkV5Impl: "Sepolia Etherscan 上的 PersonalQryptSafe v5 实现",
      linkV4Factory: "Sepolia Etherscan 上的 QryptSafe v4（已停用）",
      linkV3Factory: "QryptSafe v3 在 Sepolia Etherscan",
      linkV3Impl: "PersonalQryptSafe v3 在 Sepolia Etherscan",
      linkV2Factory: "ShieldFactory v2 在 Sepolia Etherscan",
      linkV1Factory: "ShieldFactory v1 在 Sepolia Etherscan",
      h2Mainnet: "以太坊主网（Chain ID: 1）",
      calloutMainnet: "主网部署待定。部署和 Etherscan 验证完成后将更新此表。",
      h2TestWallets: "测试钱包和合约（Sepolia）",
      pTestWallets: "这些钱包用于 Sepolia 上的自动化 E2E 测试，不持有主网资产。",
      testWalletHeaders: ["标签", "地址", "备注"],
      testWalletRows: [],
      h2SupportedNetworks: "支持的网络",
      pSupportedNetworks: "前端识别三个 Chain ID。连接任何其他网络将显示不支持的网络警告。",
      networkHeaders: ["网络", "Chain ID", "用途"],
      networkRows: [
        ["以太坊主网", "1", "生产环境"],
        ["Sepolia", "11155111", "测试网（上线中）"],
        ["Hardhat 本地", "31337", "开发环境"],
      ],
    },
    shieldFactory: {
      title: "QryptSafe（工厂）",
      intro:
        "QryptSafe 是所有 Qrypt-Safe 部署的入口点。它使用 EIP-1167 最小代理模式为每个钱包地址部署唯一的 PersonalVault。版本 6 是 Sepolia 上当前的活跃部署（OTP 链、air bags 隔离、49/49 E2E）。v5、v3 和 v2 保留在下方供历史参考。",
      calloutAddressV6: "Sepolia 地址（v6：活跃, OTP 链）：",
      calloutV6Note: "v6 是当前标准工厂。OTP 链替换静态 bytes32 proofHash。QryptAir 的 air bags 隔离。rechargeChain() 用于 OTP 补充。49/49 E2E 测试全部通过。已在 Etherscan 进行 MIT 验证。",
      calloutAddressV5: "Sepolia 地址（v5：已被 v6 取代）：",
      calloutV5Note: "v5 已被 v6 取代（OTP 链升级）。bytes32 proofHash、unshieldToRailgun()（QryptShield）、redeemVoucher() EIP-712（QryptAir）。51 项测试。已在 Etherscan 进行 MIT 验证。",
      calloutAddressV4: "Sepolia 地址（v4：历史版本）：",
      calloutAddressV3: "Sepolia 地址（v3：历史版本）：",
      calloutAddressV2: "Sepolia 地址（v2：历史版本）：",
      calloutAddressV1: "Sepolia 地址（v1：历史版本，严重漏洞）：",
      calloutV3Note:
        "v3 是当前活跃工厂。无管理员密钥、无所有者、无暂停函数。保险库创建始终开放。",
      calloutV2Note:
        "v2 已被 v3 取代。v2 工厂具有 Ownable 和 Pausable，这意味着部署者可以暂停保险库创建。v3 移除了所有管理控制。",
      h2Design: "合约设计（v3）",
      pDesign:
        "v3 移除了所有特权角色。没有所有者，没有暂停机制。合约仅导入 Clones 库用于 EIP-1167 代理部署。任何人都可以随时调用 createVault。",
      calloutNoAdmin: "v3 中不存在管理员密钥。部署者没有任何特殊访问权限。没有人可以暂停、升级或干扰保险库创建。",
      h2StateVars: "状态变量",
      stateHeaders: ["变量", "类型", "描述"],
      stateRows: [
        ["vaultImplementation", "address immutable", "PersonalVault 实现合约。在构造函数中设置，永不更改。"],
        ["vaults", "mapping(address => address) private", "将钱包地址映射到已部署的保险库地址。"],
      ],
      h2Functions: "函数",
      h3CreateVault: "createVault",
      pCreateVault:
        "为 msg.sender 部署新的 PersonalVault 克隆。如果该钱包已有保险库则回滚。passwordHash 必须是在浏览器中离线计算的 keccak256(abi.encodePacked(rawVaultProof))。原始保险库密码不会到达此函数。",
      revertHeaders: ["回滚条件", "消息"],
      createVaultReverts: [
        ["保险库已存在", "\"Qrypt-Safe already exists for this wallet\""],
      ],
      h3HasVault: "hasVault",
      pHasVault: "如果钱包已部署 Qrypt-Safe 则返回 true。",
      h3GetVault: "getVault",
      pGetVault: "返回给定钱包的保险库合约地址。如果不存在保险库则返回 address(0)。",
      h2Events: "事件",
      eventHeaders: ["事件", "参数", "触发时机"],
      eventRows: [
        ["VaultCreated", "owner (indexed), vault (indexed)", "新 PersonalVault 成功部署时"],
      ],
    },
    personalVault: {
      title: "PersonalVault",
      intro:
        "PersonalVault 是每个 Qrypt-Safe 的核心合约。它处理代币存入、取出、提交-揭示转账、保险库密码管理和紧急提款。每个钱包通过 ShieldFactory 部署一个 PersonalVault。",
      h2Inheritance: "继承关系",
      h2Constants: "常量",
      constantHeaders: ["常量", "值", "含义"],
      constantRows: [
        ["COMMIT_EXPIRY_SECONDS", "600", "揭示必须在提交后 10 分钟内完成"],
        ["MINIMUM_SHIELD_AMOUNT", "1_000_000", "以代币基本单位表示的最小存入金额"],
        ["EMERGENCY_DELAY_BLOCKS", "1_296_000", "紧急提款可用前约 6 个月的非活跃期"],
      ],
      h2Functions: "函数",
      h3Initialize: "initialize",
      pInitialize: "克隆后由 ShieldFactory 立即调用一次。设置所有者和保险库密码哈希。再次调用时回滚。",
      h3Shield: "shield",
      pShield:
        "将 ERC-20 代币从所有者钱包提取到保险库，并铸造等量的 qToken。验证保险库密码。使用余额前后比对模式正确处理含转账手续费的代币。",
      shieldReverts: [
        ["保险库密码错误", "\"Invalid vault proof\""],
        ["金额低于最小值", "\"Amount below minimum\""],
        ["非保险库所有者", "\"Not vault owner\""],
      ],
      h3Unshield: "unshield",
      pUnshield: "销毁 qToken 并将底层 ERC-20 退回所有者钱包。",
      h3CommitTransfer: "commitTransfer",
      pCommitTransfer: "两步转账的第一步。记录提交哈希、当前区块号和时间戳。此调用不包含保险库密码。",
      h3RevealTransfer: "revealTransfer",
      pRevealTransfer:
        "第二步。验证提交哈希与存储的提交匹配，检查 10 分钟到期窗口，验证保险库密码，销毁 qToken，并将真实 ERC-20 直接发送到接收方钱包。接收方始终收到原始 ERC-20，而非 qToken。",
      revealReverts: [
        ["未找到提交", "\"Commit not found\""],
        ["提交已使用", "\"Commit already used\""],
        ["提交已过期", "\"Commit expired\""],
        ["哈希不匹配", "\"Commit hash mismatch\""],
        ["保险库密码错误", "\"Invalid vault proof\""],
        ["转账给自己", "\"Cannot transfer to yourself\""],
      ],
      h3ChangeVaultProof: "changeVaultProof",
      pChangeVaultProof: "更改保险库密码。需要提供当前正确的密码。新密码必须符合 3 个字母 + 3 个数字的格式。",
      h3EmergencyWithdraw: "emergencyWithdraw",
      pEmergencyWithdraw: "仅在 EMERGENCY_DELAY_BLOCKS 非活跃后可用。只需私钥，无需保险库密码。销毁所有 qToken 并将所有底层代币发送给所有者。",
      h2Events: "事件",
      eventHeaders: ["事件", "参数"],
      eventRows: [
        ["TokenShielded", "token (indexed), amount, qToken (indexed)"],
        ["TokenUnshielded", "token (indexed), amount"],
        ["TransferExecuted", "token (indexed), to (indexed), amount"],
        ["QTokenDeployed", "token (indexed), qToken (indexed)"],
        ["CommitSubmitted", "commitHash (indexed)"],
        ["VaultProofChanged", "（无参数）"],
        ["EmergencyWithdraw", "token (indexed), amount"],
      ],
    },
    qtoken: {
      title: "qToken（ShieldToken）",
      intro:
        "ShieldToken 是每个 qToken（qUSDC、qUSDT、qWETH 等）背后的合约。它是一个 ERC-20，所有与转账相关的函数被永久禁用。只有父保险库合约可以铸造或销毁。",
      h2KeyDiff: "与标准 ERC-20 的关键区别",
      pKeyDiff:
        "标准 ERC-20 提供了允许代币在地址间移动的三个函数：transfer()、transferFrom() 和 approve()。ShieldToken 用无条件回滚覆盖了所有三个函数。没有任何 Gas 数量或聪明的合约调用可以绕过这一点，因为这些函数被标记为 pure（不读取状态、无条件判断，直接回滚）。",
      h2Inheritance: "继承关系",
      h2Constructor: "构造函数",
      pConstructor:
        "当代币首次被存入时由 PersonalVault 调用。vault 地址是拥有此 qToken 的 PersonalVault 实例。decimals_ 值在部署前从底层 ERC-20 读取并永久存储。这确保了 Etherscan、MetaMask 和所有钱包都能正确显示代币金额，无论底层代币的小数精度如何。",
      calloutDecimals:
        "为何重要：OpenZeppelin ERC20 默认为 18 位小数。USDC 有 6 位小数。如果没有此修复，9.5 qUSDC 在 Etherscan 中会显示为 0.0000000000095。构造函数参数在 v2 部署中添加。",
      h2Overridden: "覆盖的函数",
      h2MintBurn: "铸造和销毁",
      pMintBurn: "只有保险库合约可以调用 mint() 和 burn()。来自任何其他地址的尝试都会以 \"Only Qrypt-Safe can call this\" 回滚。",
      h2Naming: "代币命名约定",
      pNaming: "部署时，qToken 读取底层代币的名称和符号，并在前面加上 q：",
      h2OneContract: "每个保险库每种代币一个合约",
      pOneContract:
        "每个 PersonalVault 部署自己的一套 qToken 合约。用户 A 和用户 B 各自在不同地址拥有自己的 qUSDC。余额在 qToken 的 ERC-20 余额映射中归属于用户的钱包地址。",
      tableHeaders: ["用户", "代币", "qToken 合约", "余额归属"],
    },
  },
};
