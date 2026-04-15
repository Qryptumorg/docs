export type FaqItem = {
  q: string;
  a: string;
};

export type FaqContent = {
  title: string;
  intro: string;
  items: FaqItem[];
};

export const faqContent: Record<"en" | "ru" | "zh", FaqContent> = {
  en: {
    title: "Frequently Asked Questions",
    intro: "Common questions about Qryptum's three transfer modes, security model, and how to use them.",
    items: [
      {
        q: "What are Qryptum's three transfer modes?",
        a: "Qryptum offers three modes. QryptSafe is a personal vault on Ethereum that holds real ERC-20 tokens and issues non-transferable qTokens, protected by a commit-reveal vault proof. QryptShield routes transfers through Railgun's zero-knowledge privacy pool, breaking the on-chain link between sender and recipient. QryptAir generates an EIP-712 signed offToken and QR code that the recipient redeems on-chain without any prior interaction from the sender.",
      },
      {
        q: "What is QryptSafe?",
        a: "QryptSafe is your personal smart contract vault on Ethereum. It holds your real ERC-20 tokens and issues non-transferable qTokens as receipts. Every shield, unshield, and transfer requires both your private key and a 6-character vault proof simultaneously. Each wallet address has exactly one QryptSafe, deployed through the QryptSafe factory using the EIP-1167 minimal proxy pattern.",
      },
      {
        q: "What is QryptShield?",
        a: "QryptShield integrates with Railgun's zero-knowledge privacy pool on Ethereum. When you use QryptShield, your transaction is shielded inside the Railgun smart contract system. The on-chain link between the sending and receiving addresses is broken: an outside observer cannot determine who sent to whom or what amount was transferred.",
      },
      {
        q: "What is QryptAir?",
        a: "QryptAir lets you create a signed offToken using the EIP-712 standard. You sign a structured message with your private key specifying the token, amount, and recipient. The result is a QR code the recipient can scan and redeem on-chain themselves. No prior interaction, no on-chain transaction from your side at creation time.",
      },
      {
        q: "What is a vault proof?",
        a: "A vault proof is a 6-character string (3 letters and 3 numbers, for example abc123) that you choose when creating your QryptSafe. It acts as a second factor: every shield, unshield, and transfer operation requires both your private key and your vault proof simultaneously. Only the keccak256 hash of the vault proof is stored on-chain, never the raw string.",
      },
      {
        q: "Does Qryptum have admin access to my funds?",
        a: "No. The QryptSafe factory has no owner, no admin keys, and no pause or unpause mechanism. Once deployed, nobody including the Qryptum team can pause vault creation, modify vault logic, or access any vault funds. The contracts are fully immutable.",
      },
      {
        q: "Can I lose my tokens if I forget my vault proof?",
        a: "If your vault has been inactive for approximately 6 months (1,296,000 Ethereum blocks), you can call emergencyWithdraw() with only your private key to recover all tokens. Any vault activity (shield, unshield, transfer) resets this timer.",
      },
      {
        q: "Can MetaMask, TrustWallet, or any wallet send qTokens?",
        a: "No. The qToken contract overrides transfer(), transferFrom(), and approve() with unconditional reverts. These functions always fail regardless of which wallet, app, or script initiates the call. qTokens can only move via QryptSafe vault operations.",
      },
      {
        q: "Is the vault proof visible on-chain?",
        a: "Yes. The raw vault proof appears in transaction calldata during shield(), unshield(), and revealTransfer() calls. This is intentional and safe: the vault proof is useless without the private key, and all vault functions require msg.sender to be the vault owner.",
      },
      {
        q: "Why does the QryptSafe commit-reveal transfer require two transactions?",
        a: "The two-step scheme ensures the vault proof is not visible in the mempool before the transaction is confirmed. The commit step records only a hash. The reveal step (sent after the commit is mined) carries the vault proof. This prevents front-running attacks where a miner could copy the vault proof and race ahead.",
      },
      {
        q: "What does the recipient receive in a QryptSafe transfer?",
        a: "The recipient always receives the real underlying ERC-20 token (for example USDC), never the qToken. The qToken is burned during the transfer. The recipient does not need to be a Qryptum user.",
      },
      {
        q: "What networks are supported?",
        a: "Ethereum Mainnet (chain ID 1), Sepolia testnet (chain ID 11155111), and local Hardhat (chain ID 31337). QryptSafe is live on Sepolia. Any other connected network shows an unsupported network banner in the app.",
      },
    ],
  },

  ru: {
    title: "Часто задаваемые вопросы",
    intro: "Распространённые вопросы о трёх режимах перевода Qryptum, модели безопасности и использовании.",
    items: [
      {
        q: "Какие три режима перевода есть в Qryptum?",
        a: "Qryptum предлагает три режима. QryptSafe: личное хранилище на Ethereum, которое держит реальные токены ERC-20 и выпускает непередаваемые qToken, защищённое схемой commit-reveal с vault proof. QryptShield: переводы через zero-knowledge пул конфиденциальности Railgun, разрывающий on-chain связь между отправителем и получателем. QryptAir: подписанный offToken по стандарту EIP-712 с QR-кодом, который получатель сам активирует on-chain.",
      },
      {
        q: "Что такое QryptSafe?",
        a: "QryptSafe: ваше личное хранилище-смарт-контракт на Ethereum. Оно хранит реальные токены ERC-20 и выпускает непередаваемые qToken в качестве квитанций. Каждая операция shield, unshield и перевода требует одновременного наличия вашего приватного ключа и vault proof из 6 символов. У каждого адреса кошелька ровно один QryptSafe, деплоящийся через фабрику по шаблону минимального прокси EIP-1167.",
      },
      {
        q: "Что такое QryptShield?",
        a: "QryptShield интегрируется с zero-knowledge пулом конфиденциальности Railgun на Ethereum. При использовании QryptShield ваша транзакция экранируется внутри системы смарт-контрактов Railgun. On-chain связь между адресами отправителя и получателя разрывается: внешний наблюдатель не может определить, кто кому и в каком объёме перевёл средства.",
      },
      {
        q: "Что такое QryptAir?",
        a: "QryptAir позволяет создать подписанный offToken по стандарту EIP-712. Вы подписываете структурированное сообщение своим приватным ключом, указывая токен, сумму и получателя. Результатом является QR-код, который получатель сканирует и самостоятельно активирует on-chain. Никаких предварительных взаимодействий, никаких on-chain транзакций с вашей стороны в момент создания.",
      },
      {
        q: "Что такое vault proof?",
        a: "Vault proof: строка из 6 символов (3 буквы и 3 цифры, например abc123), которую вы выбираете при создании QryptSafe. Он служит вторым фактором: каждая операция shield, unshield и перевода требует одновременного наличия вашего приватного ключа и vault proof. On-chain хранится только keccak256-хэш vault proof, но не сам proof в открытом виде.",
      },
      {
        q: "Имеет ли Qryptum административный доступ к моим средствам?",
        a: "Нет. Фабрика QryptSafe не имеет владельца, административных ключей и механизма паузы. После деплоя никто, включая команду Qryptum, не может приостановить создание хранилищ, изменить логику хранилищ или получить доступ к средствам существующих хранилищ. Контракты полностью иммутабельны.",
      },
      {
        q: "Могу ли я потерять токены, если забуду vault proof?",
        a: "Если ваше хранилище было неактивно примерно 6 месяцев (1 296 000 блоков Ethereum), вы можете вызвать emergencyWithdraw() только с приватным ключом и вернуть все токены. Любая активность хранилища (shield, unshield, transfer) сбрасывает этот таймер.",
      },
      {
        q: "Могут ли MetaMask, TrustWallet или другие кошельки отправить qToken?",
        a: "Нет. Контракт qToken переопределяет transfer(), transferFrom() и approve() безусловными откатами. Эти функции всегда завершаются с ошибкой независимо от того, какой кошелёк, приложение или скрипт инициирует вызов. qToken могут перемещаться только через операции хранилища QryptSafe.",
      },
      {
        q: "Виден ли vault proof on-chain?",
        a: "Да. Исходный vault proof отображается в calldata транзакции во время вызовов shield(), unshield() и revealTransfer(). Это намеренно и безопасно: vault proof бесполезен без приватного ключа, а все функции хранилища требуют, чтобы msg.sender был владельцем хранилища.",
      },
      {
        q: "Почему commit-reveal перевод в QryptSafe требует двух транзакций?",
        a: "Двухэтапная схема гарантирует, что vault proof не виден в мемпуле до подтверждения транзакции. На этапе commit записывается только хэш. На этапе reveal (отправляется после майнинга commit) содержится vault proof. Это предотвращает атаки фронтраннинга, при которых майнер мог бы скопировать vault proof и опередить транзакцию.",
      },
      {
        q: "Что получает получатель при переводе через QryptSafe?",
        a: "Получатель всегда получает реальный базовый токен ERC-20 (например USDC), а не qToken. qToken сжигается во время перевода. Получателю не нужно быть пользователем Qryptum.",
      },
      {
        q: "Какие сети поддерживаются?",
        a: "Ethereum Mainnet (chain ID 1), тестовая сеть Sepolia (chain ID 11155111) и локальный Hardhat (chain ID 31337). QryptSafe активен на Sepolia. При подключении к любой другой сети в приложении отображается предупреждение о неподдерживаемой сети.",
      },
    ],
  },

  zh: {
    title: "常见问题",
    intro: "关于 Qryptum 三种转账模式、安全模型和使用方法的常见问题。",
    items: [
      {
        q: "Qryptum 有哪三种转账模式？",
        a: "Qryptum 提供三种模式。QryptSafe: 以太坊上的个人保险库，持有真实 ERC-20 代币并发行不可转让的 qToken，通过提交-揭示保险库密码方案保护。QryptShield: 通过 Railgun 零知识隐私池路由转账，切断发送方与接收方之间的链上关联。QryptAir: 基于 EIP-712 标准生成离线签名 offToken 和二维码，接收方自行在链上兑换，无需发送方提前交互。",
      },
      {
        q: "什么是 QryptSafe？",
        a: "QryptSafe 是您在以太坊上的个人智能合约保险库。它持有真实的 ERC-20 代币，并发行不可转让的 qToken 作为凭证。每次存入、取出和转账都需要同时具备您的私钥和 6 位保险库密码。每个钱包地址恰好拥有一个 QryptSafe，通过 EIP-1167 最小代理模式由工厂合约部署。",
      },
      {
        q: "什么是 QryptShield？",
        a: "QryptShield 与以太坊上 Railgun 的零知识隐私池集成。使用 QryptShield 时，您的交易在 Railgun 智能合约系统内被屏蔽。发送方与接收方地址之间的链上关联被切断：外部观察者无法判断谁向谁转账或转账金额。",
      },
      {
        q: "什么是 QryptAir？",
        a: "QryptAir 允许您使用 EIP-712 标准创建离线签名 offToken。您用私钥对包含代币、金额和接收方信息的结构化消息进行签名。结果生成一个二维码，接收方扫描后可自行在链上兑换。创建时无需任何预先交互，发送方无需发起链上交易。",
      },
      {
        q: "什么是保险库密码？",
        a: "保险库密码是您在创建 QryptSafe 时选择的 6 位字符串（3 个字母和 3 个数字，例如 abc123）。它作为第二因素：每次存入、取出和转账操作都需要同时具备您的私钥和保险库密码。链上只存储保险库密码的 keccak256 哈希，原始字符串从不上链。",
      },
      {
        q: "Qryptum 对我的资金有管理员访问权限吗？",
        a: "没有。QryptSafe 工厂没有所有者、没有管理员密钥，也没有暂停机制。部署后，包括 Qryptum 团队在内的任何人都无法暂停保险库创建、修改保险库逻辑或访问现有保险库的资金。合约完全不可变。",
      },
      {
        q: "如果忘记保险库密码，会丢失代币吗？",
        a: "如果您的保险库已非活跃约 6 个月（1,296,000 个以太坊区块），您可以仅凭私钥调用 emergencyWithdraw() 取回所有代币。任何保险库活动（存入、取出、转账）都会重置此计时器。",
      },
      {
        q: "MetaMask、TrustWallet 或任何钱包能发送 qToken 吗？",
        a: "不能。qToken 合约用无条件回滚覆盖了 transfer()、transferFrom() 和 approve()。无论哪个钱包、应用或脚本发起调用，这些函数始终失败。qToken 只能通过 QryptSafe 保险库操作移动。",
      },
      {
        q: "保险库密码在链上可见吗？",
        a: "是的。原始保险库密码在 shield()、unshield() 和 revealTransfer() 调用期间出现在交易 calldata 中。这是有意为之且安全的：没有私钥的保险库密码毫无用处，而且所有保险库函数都要求 msg.sender 是保险库所有者。",
      },
      {
        q: "为什么 QryptSafe 的提交-揭示转账需要两笔区块链交易？",
        a: "两步方案确保保险库密码在交易确认前不会在内存池中可见。提交步骤只记录哈希。揭示步骤（在提交被打包后发送）携带保险库密码。这防止了抢先交易攻击，即矿工复制保险库密码并抢先执行交易。",
      },
      {
        q: "QryptSafe 转账中接收方收到什么？",
        a: "接收方始终收到真实的底层 ERC-20 代币（例如 USDC），而非 qToken。qToken 在转账过程中被销毁。接收方无需是 Qryptum 用户。",
      },
      {
        q: "支持哪些网络？",
        a: "以太坊主网（Chain ID 1）、Sepolia 测试网（Chain ID 11155111）和本地 Hardhat（Chain ID 31337）。QryptSafe 已在 Sepolia 上线。连接任何其他网络时，应用中会显示不支持网络的横幅。",
      },
    ],
  },
};
