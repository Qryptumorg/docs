export type IntroductionContent = {
  overview: {
    title: string;
    intro: string;
    h2TransferModes: string;
    modeTableHeaders: [string, string, string, string];
    modes: [string, string, string, string][];
    h2Architecture: string;
    pArchitecture: string;
    archItems: string[];
    h2CoreProperties: string;
    coreTableHeaders: [string, string];
    coreProperties: [string, string][];
    h2DeployedContracts: string;
    pDeployed: string;
    labelFactory: string;
    labelImpl: string;
    labelQryptAir: string;
    pendingNote: string;
    viewOnEtherscan: string;
    labelFactoryV6: string;
    labelImplV6: string;
    labelQryptAirV6: string;
    pDeployedV6: string;
    h2V5ToV6: string;
    v5ToV6Items: string[];
    labelFactoryV5: string;
    labelImplV5: string;
    labelQryptAirV5: string;
    pDeployedV5: string;
    h2V3ToV5: string;
    v3ToV5Items: string[];
    h2V4ToV5: string;
    v4ToV5Items: string[];
  };
  why: {
    title: string;
    intro: string;
    h2Problem: string;
    pProblem1: string;
    pProblem2: string;
    h2ThreeLevels: string;
    pThreeLevels: string;
    levelsTableHeaders: [string, string, string];
    levels: [string, string, string][];
    h2QryptSafe: string;
    pQryptSafe1: string;
    pQryptSafe2: string;
    h2Compare: string;
    compareHeaders: [string, string, string];
    compareRows: [string, string, string][];
    h2WhatIsNot: string;
    notItems: string[];
    h2KeyInsights: string;
    insightSafeLabel: string;
    insightSafe: string;
    insightShieldLabel: string;
    insightShield: string;
    insightAirLabel: string;
    insightAir: string;
  };
  howItWorks: {
    title: string;
    intro: string;
    tabSafe: string;
    tabShield: string;
    tabAir: string;
    // QryptSafe
    safeIntro: string;
    safeH2Lifecycle: string;
    safeStep01Title: string;
    safeStep01Desc: string;
    safeStep02Title: string;
    safeStep02Desc: string;
    safeStep03Title: string;
    safeStep03Desc: string;
    safeTransferTableHeaders: [string, string, string];
    safeTransferRows: [string, string, string][];
    safeTransferCallout: string;
    safeStep04Title: string;
    safeStep04Desc: string;
    safeH2Creating: string;
    safeCreatingDesc: string;
    // QryptShield
    shieldIntro: string;
    shieldH2TokenLifecycle: string;
    shieldStep01Title: string;
    shieldStep01Desc: string;
    shieldStep02Title: string;
    shieldStep02Desc: string;
    shieldStep03Title: string;
    shieldStep03Desc: string;
    shieldStep03Callout: string;
    shieldH2Privacy: string;
    shieldPrivacyHeaders: [string, string];
    shieldPrivacyRows: [string, string][];
    // QryptAir
    airIntro: string;
    airStep01Title: string;
    airStep01Desc: string;
    airStep02Title: string;
    airStep02Desc: string;
    airStep03Title: string;
    airStep03Desc: string;
    airStep03Callout: string;
    airH2UseCases: string;
    airUseCaseHeaders: [string, string];
    airUseCases: [string, string][];
  };
};

export const introductionContent: Record<"en" | "ru" | "zh", IntroductionContent> = {
  en: {
    overview: {
      title: "Overview",
      intro:
        "Qryptum is a non-custodial token protection protocol on Ethereum L1 with three distinct transfer modes. Each mode addresses a different security scenario: from personal vault protection against key theft, to fully anonymous zero-knowledge transfers, to offline airgapped signing without any internet connection. QryptSafe runs on both Sepolia testnet and Ethereum mainnet. QryptShield and QryptAir operate on Sepolia.",
      h2TransferModes: "Transfer Modes",
      modeTableHeaders: ["Mode", "Mechanism", "Privacy Level", "Best For"],
      modes: [
        ["QryptSafe", "qrypt / unqrypt, vault-gated", "On-chain visible", "Personal token protection against private key theft"],
        ["QryptShield", "Railgun ZK privacy pool", "Zero-knowledge private", "Anonymous transfers with no on-chain link between sender and recipient"],
        ["QryptAir", "EIP-712 offToken + QR code", "Offline signed", "Airgapped transfers: sign without internet, broadcast later"],
      ],
      h2Architecture: "System Architecture",
      pArchitecture:
        "Each mode is backed by a different smart contract layer on Ethereum L1:",
      archItems: [
        "QryptSafe: Each user deploys their own PersonalVault contract via the ShieldFactory. The vault holds real ERC-20 tokens and issues non-transferable qTokens as receipts. Every token movement requires both the user's private key and a 6-character vault proof.",
        "QryptShield: Transfers are routed through the Railgun privacy pool. Zero-knowledge proofs cryptographically sever the on-chain link between sender and recipient. No Qryptum-owned contracts are involved: the Railgun protocol handles all on-chain logic.",
        "QryptAir: The sender signs an EIP-712 typed offToken entirely offline. The signed offToken is encoded as a QR code and shared with the recipient, who broadcasts it to Ethereum. The claimAirVoucher function on the vault contract verifies the signature and executes the transfer.",
      ],
      h2CoreProperties: "Core Properties",
      coreTableHeaders: ["Property", "How It Works"],
      coreProperties: [
        ["Non-custodial", "Tokens are held at the vault contract address. No third party has access. Qryptum deployer has zero admin keys."],
        ["Non-transferable qTokens", "transfer(), transferFrom(), and approve() always revert at the contract level. No wallet can move qTokens."],
        ["Dual-factor protection (QryptSafe)", "Every vault operation requires both the user's private key and the 6-character vault proof simultaneously."],
        ["Zero-knowledge privacy (QryptShield)", "Railgun ZK proofs hide sender address, recipient address, and transfer amount from on-chain observers."],
        ["Offline signing (QryptAir)", "The sender's private key never touches a live network node. Signing is fully local. Broadcast is separate."],
        ["Isolated vaults", "Each user has a unique vault address. User A's tokens are at 0xQryptSafeA; User B's are at 0xQryptSafeB. Never mixed."],
        ["QryptAir offToken nonce (QryptSafe)", "Each offToken nonce is single-use. claimAirVoucher() reverts on replay with VoucherAlreadyUsed()."],
        ["Replay protection (QryptAir)", "Each offToken nonce can only be redeemed once. The usedVouchers mapping prevents double-spending."],
      ],
      h2DeployedContracts: "Deployed Contracts (Sepolia)",
      pDeployed: "All contracts are verified MIT on Sepolia Etherscan. QryptShield uses Railgun contracts (deployed and maintained by the Railgun Community).",
      labelFactory: "QryptSafe factory v3 (superseded):",
      labelImpl: "PersonalQryptSafe impl v3 (superseded):",
      labelQryptAir: "QryptAir redeemVoucher (v4, decommissioned):",
      pendingNote: "Superseded by v5.",
      labelFactoryV6: "QryptSafe factory v6 (active):",
      labelImplV6: "PersonalQryptSafe impl v6 (active):",
      labelQryptAirV6: "QryptAir air bags v6 (active):",
      pDeployedV6: "V1, V2, and V3 are deployed and MIT-verified on Sepolia Etherscan. V4-V6 addresses will be added as each version is deployed and verified.",
      h2V5ToV6: "v5 to v6: What Changed",
      v5ToV6Items: [
        "OTP chain replaces static bytes32 proofHash: each proof is single-use and advances the chain head, making replay attacks structurally impossible.",
        "rechargeChain() added: owner can append a new OTP chain to the vault without redeploying.",
        "Air bags isolation: QryptAir offToken redemption draws from a separate air bags balance, preventing double-spend against the shielded balance.",
        "depositToAirBag() and withdrawFromAirBag() added for explicit air bags balance management.",
        "67/67 E2E tests pass on Sepolia. Factory and implementation MIT-verified on Etherscan.",
      ],
      labelFactoryV5: "QryptSafe factory v5 (superseded by v6):",
      labelImplV5: "PersonalQryptSafe impl v5 (superseded by v6):",
      labelQryptAirV5: "QryptAir claimAirVoucher v5 (superseded by v6):",
      pDeployedV5: "v5 is superseded by v6 (OTP chain upgrade). All v5 contracts remain verified MIT on Sepolia Etherscan. 51/51 E2E tests pass.",
      h2V3ToV5: "v3 to v5: What Changed",
      v3ToV5Items: [
        "bytes32 proofHash replaces string vaultProof: keccak256 hash sent to contract instead of raw string, enabling EIP-712 struct-hash compatibility.",
        "unshieldToRailgun() added: QryptShield can now route unshields directly to the Railgun privacy pool.",
        "claimAirVoucher() added: QryptAir EIP-712 offline signed vouchers now live in PersonalQryptSafe (no separate contract needed).",
        "v4 intermediate deployment decommissioned (used string vaultProof with QryptAir/QryptShield). Superseded by v5.",
        "51/51 E2E tests pass on Sepolia. All contracts MIT-verified on Etherscan.",
      ],
      h2V4ToV5: "v4 to v5: bytes32 proofHash Upgrade",
      v4ToV5Items: [
        "vaultProof parameter changed from string to bytes32 in all functions (qrypt, unqrypt, changeVaultProof, claimAirVoucher, unshieldToRailgun).",
        "EIP-712 struct-hash now works correctly: bytes32 is a fixed-size type, compatible with encodeData.",
        "All 32 E2E tests pass with the new bytes32 proofHash on Sepolia.",
      ],
      viewOnEtherscan: "View on Sepolia Etherscan",
    },

    why: {
      title: "Why Qryptum",
      intro:
        "ERC-20 tokens on Ethereum carry a fundamental risk: anyone with your private key can transfer every token you own, instantly. Qryptum eliminates this exposure without introducing a custodian, through three distinct protection modes designed for different threat scenarios.",
      h2Problem: "The Problem",
      pProblem1:
        "Private key exposure is the single largest cause of crypto loss. Phishing, malware, compromised seed phrases, social engineering: the result is always the same. Once an attacker has the private key, they drain every token in the wallet within seconds.",
      pProblem2:
        "Existing solutions require trusting a third party: custodial exchanges, multisig services, or hardware wallet manufacturers. Qryptum requires trusting no one except the open-source, verified code.",
      h2ThreeLevels: "Three Levels of Protection",
      pThreeLevels:
        "Qryptum addresses the private key problem at three levels. Users can choose the level that fits their threat model.",
      levelsTableHeaders: ["Mode", "Threat Addressed", "Mechanism"],
      levels: [
        ["QryptSafe", "Private key theft, phishing approvals, malicious contract calls", "Vault proof: a second factor required on every token movement"],
        ["QryptShield", "On-chain transaction tracing, wallet address linking, balance surveillance", "Railgun ZK pool: sender and recipient are cryptographically unlinked"],
        ["QryptAir", "Signing key exposure during network-connected signing sessions", "EIP-712 offline offToken: signing key never touches a live node"],
      ],
      h2QryptSafe: "QryptSafe: Vault Proof Layer",
      pQryptSafe1:
        "QryptSafe adds a second mandatory factor to every token movement: a vault proof. The vault proof is a 6-character string (3 letters plus 3 numbers, for example abc123) verified entirely on-chain by the smart contract. No server ever sees it.",
      pQryptSafe2:
        "When a user shields tokens into their Qrypt-Safe, those tokens move to a smart contract address with no private key. The real ERC-20 tokens sit at that vault address. In their place, the user holds qTokens (such as qUSDC or qWETH) in their wallet. These qTokens are non-transferable receipts: they cannot be moved by any wallet, exchange, or script.",
      h2Compare: "Scenario Comparison",
      compareHeaders: ["Scenario", "Standard ERC-20", "Qryptum"],
      compareRows: [
        ["Private key leaked", "All tokens drained instantly", "Attacker cannot move qTokens (revert)"],
        ["Phishing site approval", "Token approval drained", "approve() always reverts"],
        ["Malicious contract call", "transferFrom() drains balance", "transferFrom() always reverts"],
        ["Exchange hack", "Tokens exposed if deposited", "qTokens cannot be deposited to any exchange"],
        ["On-chain tracing", "All transfers visible on Etherscan", "QryptShield breaks on-chain link via ZK proof"],
        ["Online signing risk", "Key used on live network each time", "QryptAir signs offline, key never exposed to node"],
      ],
      h2WhatIsNot: "What Qryptum Is Not",
      notItems: [
        "Not a custodian. Qryptum never holds or controls user funds at any point. Vault contracts have zero admin keys.",
        "Not a multisig wallet. No co-signers, recovery parties, or time delays imposed by Qryptum itself.",
        "Not a wrapped token bridge. Tokens stay on Ethereum L1. No cross-chain movement.",
        "Not a Layer 2. All smart contracts execute directly on Ethereum L1. QryptSafe is live on both Sepolia testnet and Ethereum mainnet.",
        "Not a replacement for hardware wallets. Qryptum adds a layer on top of, not instead of, proper key management.",
      ],
      h2KeyInsights: "Key Insights",
      insightSafeLabel: "QryptSafe:",
      insightSafe:
        "Knowing the vault proof alone is useless without the private key. Knowing the private key alone is useless because qToken transfers always revert. An attacker needs both simultaneously, and the vault proof is never stored on any server.",
      insightShieldLabel: "QryptShield:",
      insightShield:
        "Even with full blockchain access, an observer cannot link a Railgun deposit to a withdrawal. The ZK proof reveals only that the prover knows a valid note, not which note or which wallet created it.",
      insightAirLabel: "QryptAir:",
      insightAir:
        "The signing key can be kept permanently offline. Only the broadcast step requires network access, and that step can be performed by anyone, including the recipient.",
    },

    howItWorks: {
      title: "How It Works",
      intro:
        "Qryptum has three transfer modes. Each has a different flow, smart contract layer, and privacy model. Select a mode below to see its step-by-step flow. QryptSafe operates on both Sepolia testnet and Ethereum mainnet. QryptShield and QryptAir operate on Sepolia.",
      tabSafe: "QryptSafe",
      tabShield: "QryptShield",
      tabAir: "QryptAir",

      safeIntro:
        "QryptSafe protects ERC-20 tokens by locking them in a personal smart contract vault. Every token movement requires both the user's private key and a 6-character vault proof, verified on-chain. A stolen private key alone cannot move tokens.",
      safeH2Lifecycle: "Token Lifecycle",
      safeStep01Title: "qrypt - Deposit tokens into your Qrypt-Safe",
      safeStep01Desc:
        "The user approves the vault contract to pull tokens, then calls qrypt(tokenAddress, amount, otpProof). The contract verifies the OTP chain proof (keccak256(proof) == chainHead), advances the chain head to the next position, pulls the ERC-20 tokens, and mints an equivalent amount of non-transferable qTokens (for example, qUSDC) to the user's wallet.",
      safeStep02Title: "Hold - qTokens as receipts",
      safeStep02Desc:
        "After calling qrypt, the user holds qTokens in their wallet. The underlying ERC-20 tokens sit at the vault contract address. Any call to transfer(), transferFrom(), or approve() on qTokens immediately reverts at the contract level. No wallet, exchange, or script can move them.",
      safeStep03Title: "Transfer - QryptAir offToken or QryptShield",
      safeStep03Desc:
        "To send tokens peer-to-peer, use QryptAir (claimAirVoucher) for offline EIP-712 signed offTokens, or QryptShield (unshieldToRailgun) for anonymous delivery via the Railgun ZK pool.",
      safeTransferTableHeaders: ["Step", "Action", "On-chain"],
      safeTransferRows: [
        ["1", "Sender signs an EIP-712 offToken offline (QryptAir) or calls unshieldToRailgun (QryptShield)", "No / Yes"],
        ["2", "QryptAir: recipient calls claimAirVoucher(voucher, sig). Contract verifies signature and nonce.", "Yes"],
        ["3", "QryptShield: Railgun ZK pool receives deposit; recipient withdraws anonymously.", "Yes"],
        ["4", "Real ERC-20 is received by recipient. qToken is burned on sender's vault.", "Yes"],
      ],
      safeTransferCallout:
        "The recipient always receives the real ERC-20 (for example, USDC), never qUSDC. They can then call qrypt on their own Qrypt-Safe if they want the same protection.",
      safeStep04Title: "unqrypt - Withdraw tokens back to wallet",
      safeStep04Desc:
        "The user calls unqrypt(tokenAddress, amount, vaultProof). The contract burns the qTokens and returns the real ERC-20 tokens to the user's wallet.",
      safeH2Creating: "Creating a Qrypt-Safe",
      safeCreatingDesc:
        "Each wallet can have exactly one Qrypt-Safe, deployed via the ShieldFactory. The user calls createQryptSafe(initialChainHead), where initialChainHead is a keccak256 hash derived off-chain from their vault proof - this seeds the OTP chain. The raw vault proof never touches any server. After deployment, the user can shield any number of different ERC-20 tokens into their single Qrypt-Safe.",

      shieldIntro:
        "QryptShield routes transfers through the Railgun privacy pool on Ethereum L1. Zero-knowledge proofs cryptographically sever the on-chain link between sender and recipient. Even a full blockchain analysis cannot determine who sent to whom.",
      shieldH2TokenLifecycle: "Token Flow",
      shieldStep01Title: "Deposit - Shield tokens into the Railgun pool",
      shieldStep01Desc:
        "The user deposits ERC-20 tokens into the Railgun privacy pool. From this moment, the sender's wallet address and the deposit amount are hidden behind a zero-knowledge proof. On-chain, only the pool interaction is visible: not the sender's wallet or balance.",
      shieldStep02Title: "Mix - Zero-knowledge unlinking",
      shieldStep02Desc:
        "Inside the Railgun pool, deposited notes are cryptographically mixed. The pool holds a UTXO-based note commitment tree. No on-chain observer can link a specific deposit to a specific withdrawal. Transaction history shows only pool interactions, never individual wallet addresses.",
      shieldStep03Title: "Withdraw - Receive at any address",
      shieldStep03Desc:
        "The user (or recipient) generates a ZK proof of ownership for specific notes inside the pool and calls unshield(). Tokens are released to any address. The ZK proof is verified on-chain, but the cryptographic link back to the original depositing wallet is broken.",
      shieldStep03Callout:
        "The recipient receives real ERC-20 tokens at their address. No prior knowledge of the sender's address is leaked on-chain.",
      shieldH2Privacy: "Privacy Guarantees",
      shieldPrivacyHeaders: ["What is hidden", "What is visible on-chain"],
      shieldPrivacyRows: [
        ["Sender wallet address", "Railgun pool contract address"],
        ["Recipient wallet address", "Token type (USDC, ETH, etc.)"],
        ["Transfer amount", "Block timestamp"],
        ["Link between sender and recipient", "ZK proof verification result (pass or fail)"],
      ],

      airIntro:
        "QryptAir lets users create, sign, and deliver a token transfer entirely without internet access. The signed offToken is encoded as a QR code. The recipient scans and broadcasts it to Ethereum. The sender's private key never touches a live network node.",
      airStep01Title: "Sign - Create an offToken offline",
      airStep01Desc:
        "The sender generates an EIP-712 offToken specifying the recipient, token, amount, deadline, and nonce. It is signed with the sender's private key, entirely offline. No internet connection is required at any point during this step.",
      airStep02Title: "Encode - Share via QR code",
      airStep02Desc:
        "The signed offToken (recipient, token, amount, deadline, nonce, and signature) is encoded as a QR code. The QR can be printed, photographed, displayed on a screen, or transmitted via any physical medium. It remains valid until its deadline timestamp.",
      airStep03Title: "Broadcast - Recipient claims on-chain",
      airStep03Desc:
        "The recipient scans the QR code, extracts the voucher data, and calls claimAirVoucher(voucher, sig) on the vault contract. The contract verifies the EIP-712 signature on-chain, checks the deadline and nonce (replay protection), and executes the token transfer.",
      airStep03Callout:
        "Each nonce can only be claimed once. claimAirVoucher() reverts with VoucherAlreadyUsed() on replay. Expired vouchers revert with VoucherExpired().",
      airH2UseCases: "Use Cases",
      airUseCaseHeaders: ["Scenario", "How QryptAir Helps"],
      airUseCases: [
        ["Airgapped wallet signing", "Sign on an offline device, broadcast from a separate online device"],
        ["Physical token gifting", "Print a QR code as a physical token gift card"],
        ["Low-connectivity environments", "Prepare transfers in advance; broadcast when connectivity is available"],
        ["Extra signing security", "Keep the signing key permanently offline. Only the broadcast step requires internet access."],
      ],
    },
  },

  ru: {
    overview: {
      title: "Обзор",
      intro:
        "Qryptum: некастодиальный протокол защиты токенов на Ethereum L1 с тремя режимами перевода. Каждый режим предназначен для конкретного сценария безопасности: от защиты личного хранилища от кражи ключей до полностью анонимных переводов на основе доказательств с нулевым разглашением и автономной подписи без доступа к интернету. QryptSafe работает как в тестовой сети Sepolia, так и в основной сети Ethereum. QryptShield и QryptAir работают в Sepolia.",
      h2TransferModes: "Режимы перевода",
      modeTableHeaders: ["Режим", "Механизм", "Уровень конфиденциальности", "Лучше всего подходит для"],
      modes: [
        ["QryptSafe", "qrypt / unqrypt, vault-gated", "Видимо on-chain", "Личная защита токенов от кражи приватного ключа"],
        ["QryptShield", "Пул конфиденциальности Railgun ZK", "Zero-knowledge, приватно", "Анонимные переводы без on-chain связи между отправителем и получателем"],
        ["QryptAir", "EIP-712 ваучер + QR-код", "Подписано офлайн", "Airgapped-переводы: подпись без интернета, трансляция позже"],
      ],
      h2Architecture: "Архитектура системы",
      pArchitecture:
        "Каждый режим опирается на отдельный уровень смарт-контрактов на Ethereum L1:",
      archItems: [
        "QryptSafe: Каждый пользователь развёртывает собственный контракт PersonalVault через ShieldFactory. Хранилище держит реальные токены ERC-20 и выпускает непередаваемые qToken в качестве квитанций. Любое движение токенов требует одновременного наличия приватного ключа и 6-символьного vault proof.",
        "QryptShield: Переводы маршрутизируются через пул конфиденциальности Railgun. Доказательства с нулевым разглашением криптографически разрывают on-chain связь между отправителем и получателем. Контракты Qryptum не задействованы: всю логику обрабатывает протокол Railgun.",
        "QryptAir: Отправитель подписывает типизированный ваучер EIP-712 полностью офлайн. Подписанный ваучер кодируется в QR-код и передаётся получателю, который транслирует его в Ethereum. Функция claimAirVoucher в контракте хранилища проверяет подпись и исполняет перевод.",
      ],
      h2CoreProperties: "Основные свойства",
      coreTableHeaders: ["Свойство", "Принцип работы"],
      coreProperties: [
        ["Некастодиальность", "Токены хранятся по адресу контракта хранилища. Ни одна третья сторона не имеет доступа. У деплойера Qryptum нет административных ключей."],
        ["Непередаваемые qToken", "transfer(), transferFrom() и approve() всегда завершаются с ошибкой на уровне контракта. Ни один кошелёк не может переместить qToken."],
        ["Двухфакторная защита (QryptSafe)", "Каждая операция с хранилищем требует одновременного наличия приватного ключа и 6-символьного vault proof."],
        ["Zero-knowledge конфиденциальность (QryptShield)", "ZK-доказательства Railgun скрывают адрес отправителя, адрес получателя и сумму перевода от наблюдателей on-chain."],
        ["Офлайн-подпись (QryptAir)", "Приватный ключ отправителя никогда не соприкасается с живым сетевым узлом. Подпись выполняется локально. Трансляция отдельна."],
        ["Изолированные хранилища", "У каждого пользователя уникальный адрес хранилища. Токены A на 0xQryptSafeA, токены B на 0xQryptSafeB. Никогда не смешиваются."],
        ["Nonce ваучера QryptAir (QryptSafe)", "Каждый nonce ваучера одноразовый. claimAirVoucher() завершается с ошибкой VoucherAlreadyUsed() при повторе."],
        ["Защита от повторного использования (QryptAir)", "Каждый нонс ваучера можно использовать только один раз. Маппинг usedVouchers предотвращает двойные траты."],
      ],
      h2DeployedContracts: "Задеплоенные контракты (Sepolia)",
      pDeployed: "Все контракты верифицированы по лицензии MIT в Sepolia Etherscan. QryptShield использует контракты Railgun (развёрнуты и поддерживаются сообществом Railgun).",
      labelFactory: "QryptSafe factory v3 (заменён):",
      labelImpl: "PersonalQryptSafe impl v3 (заменён):",
      labelQryptAir: "QryptAir redeemVoucher (v4, выведен):",
      pendingNote: "Заменён v5.",
      labelFactoryV6: "QryptSafe factory v6 (активный):",
      labelImplV6: "PersonalQryptSafe impl v6 (активный):",
      labelQryptAirV6: "QryptAir air bags v6 (активный):",
      pDeployedV6: "V1, V2 и V3 задеплоены и верифицированы по MIT на Sepolia Etherscan. Адреса V4-V6 будут добавлены по мере деплоя каждой версии.",
      h2V5ToV6: "v5 to v6: что изменилось",
      v5ToV6Items: [
        "OTP-цепочка заменяет статический bytes32 proofHash: каждый proof одноразовый и продвигает голову цепочки, делая атаки повтора структурно невозможными.",
        "rechargeChain() добавлен: владелец может добавить новую OTP-цепочку в хранилище без повторного деплоя.",
        "Изоляция air bags: погашение ваучера QryptAir берётся из отдельного баланса air bags, предотвращая двойную трату относительно защищённого баланса.",
        "depositToAirBag() и withdrawFromAirBag() добавлены для явного управления средствами air bags.",
        "67/67 E2E-тестов проходят в Sepolia. Factory и implementation MIT-верифицированы на Etherscan.",
      ],
      labelFactoryV5: "QryptSafe factory v5 (заменён v6):",
      labelImplV5: "PersonalQryptSafe impl v5 (заменён v6):",
      labelQryptAirV5: "QryptAir claimAirVoucher v5 (заменён v6):",
      pDeployedV5: "v5 заменён v6 (обновление OTP-цепочки). Все контракты v5 по-прежнему верифицированы MIT в Sepolia Etherscan. 51/51 E2E-теста проходят.",
      h2V3ToV5: "v3 to v5: что изменилось",
      v3ToV5Items: [
        "bytes32 proofHash вместо string vaultProof: keccak256 хэш передаётся в контракт вместо сырой строки, обеспечивая совместимость с EIP-712 struct-hash.",
        "Добавлен unshieldToRailgun(): QryptShield теперь может направлять аншилды напрямую в пул приватности Railgun.",
        "Добавлен claimAirVoucher(): EIP-712 офлайн-подписанные ваучеры QryptAir теперь живут в PersonalQryptSafe (отдельный контракт не нужен).",
        "Промежуточное развёртывание v4 выведено (использовало string vaultProof с QryptAir/QryptShield). Заменено v5.",
        "51/51 E2E-теста проходят на Sepolia. Все контракты MIT-верифицированы на Etherscan.",
      ],
      h2V4ToV5: "v4 to v5: апгрейд bytes32 proofHash",
      v4ToV5Items: [
        "Параметр vaultProof изменён с string на bytes32 во всех функциях (shield, unshield, commit, reveal, changeVaultProof).",
        "EIP-712 struct-hash теперь работает корректно: bytes32 is a fixed-size type, совместим с encodeData.",
        "Все 32 E2E-теста проходят с новым bytes32 proofHash на Sepolia.",
      ],
      viewOnEtherscan: "Просмотреть в Sepolia Etherscan",
    },

    why: {
      title: "Зачем нужен Qryptum",
      intro:
        "Токены ERC-20 на Ethereum несут фундаментальный риск: любой, кто имеет ваш приватный ключ, может мгновенно перевести все ваши токены. Qryptum устраняет эту уязвимость без привлечения кастодиана, предлагая три режима защиты для разных сценариев угроз.",
      h2Problem: "Проблема",
      pProblem1:
        "Утечка приватного ключа является главной причиной потери криптоактивов. Фишинг, вредоносное ПО, компрометация сид-фразы, социальная инженерия: результат всегда одинаков. Получив приватный ключ, злоумышленник опустошает кошелёк за считанные секунды.",
      pProblem2:
        "Существующие решения требуют доверия третьей стороне: кастодиальные биржи, мультисиг-сервисы или производители аппаратных кошельков. Qryptum требует доверять только открытому, верифицированному коду.",
      h2ThreeLevels: "Три уровня защиты",
      pThreeLevels:
        "Qryptum решает проблему приватного ключа на трёх уровнях. Пользователь выбирает уровень, соответствующий своей модели угроз.",
      levelsTableHeaders: ["Режим", "Устраняемая угроза", "Механизм"],
      levels: [
        ["QryptSafe", "Кража приватного ключа, фишинговые апрувалы, вредоносные вызовы контрактов", "Vault proof: второй фактор для каждого движения токенов"],
        ["QryptShield", "Трассировка транзакций on-chain, связывание адресов кошельков, слежка за балансами", "Пул Railgun ZK: отправитель и получатель криптографически разрываются"],
        ["QryptAir", "Утечка ключа подписи при подключённых к сети сессиях", "EIP-712 офлайн-ваучер: ключ подписи никогда не касается живого узла"],
      ],
      h2QryptSafe: "QryptSafe: уровень vault proof",
      pQryptSafe1:
        "QryptSafe добавляет второй обязательный фактор для любого движения токенов: vault proof. Vault proof: строка из 6 символов (3 буквы плюс 3 цифры, например abc123), проверяемая исключительно on-chain смарт-контрактом. Ни один сервер никогда его не видит.",
      pQryptSafe2:
        "Когда пользователь защищает токены в своём Qrypt-Safe, они перемещаются по адресу смарт-контракта без приватного ключа. Реальные токены ERC-20 находятся по этому адресу хранилища. Вместо них пользователь держит в кошельке qToken (qUSDC или qWETH). Это непередаваемые квитанции: их не может переместить ни один кошелёк, биржа или скрипт.",
      h2Compare: "Сравнение сценариев",
      compareHeaders: ["Сценарий", "Стандартный ERC-20", "Qryptum"],
      compareRows: [
        ["Утечка приватного ключа", "Все токены мгновенно слиты", "Злоумышленник не может переместить qToken (revert)"],
        ["Апрувал на фишинговом сайте", "Апрувал токенов использован для слива", "approve() всегда завершается с ошибкой"],
        ["Вредоносный вызов контракта", "transferFrom() опустошает баланс", "transferFrom() всегда завершается с ошибкой"],
        ["Взлом биржи", "Токены под угрозой при депозите", "qToken нельзя внести ни на одну биржу"],
        ["Трассировка on-chain", "Все переводы видны в Etherscan", "QryptShield разрывает on-chain связь через ZK-доказательство"],
        ["Риск онлайн-подписи", "Ключ используется в сети при каждой подписи", "QryptAir подписывает офлайн, ключ не попадает на узел"],
      ],
      h2WhatIsNot: "Чем не является Qryptum",
      notItems: [
        "Не кастодиан. Qryptum никогда не держит и не контролирует средства пользователей. У контрактов хранилищ нет административных ключей.",
        "Не мультисиг-кошелёк. Нет со-подписантов, сторон восстановления или временных задержек, навязанных Qryptum.",
        "Не мост обёрнутых токенов. Токены остаются на Ethereum L1. Кросс-чейн движения нет.",
        "Не Layer 2. Все смарт-контракты исполняются непосредственно на Ethereum L1. QryptSafe работает как в Sepolia, так и в основной сети Ethereum.",
        "Не замена аппаратным кошелькам. Qryptum добавляет слой поверх, а не вместо, надлежащего управления ключами.",
      ],
      h2KeyInsights: "Ключевые выводы",
      insightSafeLabel: "QryptSafe:",
      insightSafe:
        "Знание vault proof без приватного ключа бесполезно. Знание приватного ключа без vault proof бесполезно, потому что переводы qToken всегда завершаются с ошибкой. Злоумышленнику нужно и то и другое одновременно, а vault proof никогда не хранится ни на одном сервере.",
      insightShieldLabel: "QryptShield:",
      insightShield:
        "Даже при полном доступе к блокчейну наблюдатель не может связать депозит Railgun с выводом. ZK-доказательство лишь подтверждает, что у доказывающего есть действительная нота, но не раскрывает, какая именно нота и какой кошелёк её создал.",
      insightAirLabel: "QryptAir:",
      insightAir:
        "Ключ подписи можно держать постоянно офлайн. Только шаг трансляции требует доступа к сети, и этот шаг может выполнить любой, включая получателя.",
    },

    howItWorks: {
      title: "Как это работает",
      intro:
        "У Qryptum три режима перевода. Каждый имеет свой поток, уровень смарт-контракта и модель конфиденциальности. Выберите режим ниже, чтобы увидеть его пошаговый процесс. QryptSafe работает как в Sepolia, так и в основной сети Ethereum. QryptShield и QryptAir работают в Sepolia.",
      tabSafe: "QryptSafe",
      tabShield: "QryptShield",
      tabAir: "QryptAir",

      safeIntro:
        "QryptSafe защищает токены ERC-20, блокируя их в личном смарт-контракте хранилища. Любое движение токенов требует одновременно приватного ключа пользователя и 6-символьного vault proof, проверяемого on-chain. Похищенный приватный ключ сам по себе не может переместить токены.",
      safeH2Lifecycle: "Жизненный цикл токена",
      safeStep01Title: "qrypt: внести токены в Qrypt-Safe",
      safeStep01Desc:
        "Пользователь разрешает контракту хранилища списать токены, затем вызывает qrypt(tokenAddress, amount, otpProof). Контракт проверяет OTP-цепочку (keccak256(proof) == chainHead), продвигает голову цепочки на следующую позицию, списывает токены ERC-20 и выпускает эквивалентное количество непередаваемых qToken (например, qUSDC) на кошелёк пользователя.",
      safeStep02Title: "Hold: qToken как квитанции",
      safeStep02Desc:
        "После вызова qrypt пользователь держит qToken в своём кошельке. Исходные токены ERC-20 находятся по адресу контракта хранилища. Любой вызов transfer(), transferFrom() или approve() для qToken немедленно завершается с ошибкой на уровне контракта. Ни один кошелёк, биржа или скрипт не может их переместить.",
      safeStep03Title: "Transfer: ваучер QryptAir или QryptShield",
      safeStep03Desc:
        "Для отправки токенов P2P используйте QryptAir (claimAirVoucher) для офлайн EIP-712 ваучеров или QryptShield (unshieldToRailgun) для анонимной доставки через ZK-пул Railgun.",
      safeTransferTableHeaders: ["Шаг", "Действие", "On-chain"],
      safeTransferRows: [
        ["1", "Отправитель подписывает EIP-712 ваучер офлайн (QryptAir) или вызывает unshieldToRailgun (QryptShield)", "Нет / Да"],
        ["2", "QryptAir: получатель вызывает claimAirVoucher(voucher, sig). Контракт проверяет подпись и nonce.", "Да"],
        ["3", "QryptShield: ZK-пул Railgun принимает депозит; получатель выводит анонимно.", "Да"],
        ["4", "Получатель получает реальный ERC-20. qToken сжигается в хранилище отправителя.", "Да"],
      ],
      safeTransferCallout:
        "Получатель всегда получает реальный токен ERC-20 (например, USDC), а не qUSDC. При желании он может вызвать qrypt в своём Qrypt-Safe для той же защиты.",
      safeStep04Title: "unqrypt: вывести токены обратно в кошелёк",
      safeStep04Desc:
        "Пользователь вызывает unqrypt(tokenAddress, amount, vaultProof). Контракт сжигает qToken и возвращает реальные токены ERC-20 на кошелёк пользователя.",
      safeH2Creating: "Создание Qrypt-Safe",
      safeCreatingDesc:
        "Каждый кошелёк может иметь ровно один Qrypt-Safe, развёртываемый через ShieldFactory. Пользователь вызывает createQryptSafe(initialChainHead), где initialChainHead - keccak256-хэш, получаемый офлайн из vault proof - это заряжает OTP-цепочку. Сам vault proof никогда не попадает ни на один сервер. После развёртывания пользователь может защитить любое количество различных токенов ERC-20 в своём единственном Qrypt-Safe.",

      shieldIntro:
        "QryptShield маршрутизирует переводы через пул конфиденциальности Railgun на Ethereum L1. Доказательства с нулевым разглашением криптографически разрывают on-chain связь между отправителем и получателем. Даже полный анализ блокчейна не позволяет установить, кто кому отправил.",
      shieldH2TokenLifecycle: "Поток токенов",
      shieldStep01Title: "Deposit: внести токены в пул Railgun",
      shieldStep01Desc:
        "Пользователь вносит токены ERC-20 в пул конфиденциальности Railgun. С этого момента адрес кошелька отправителя и сумма депозита скрыты за ZK-доказательством. On-chain видно только взаимодействие с пулом, а не кошелёк или баланс отправителя.",
      shieldStep02Title: "Mix: разрыв связи через zero-knowledge",
      shieldStep02Desc:
        "Внутри пула Railgun внесённые ноты криптографически смешиваются. Пул использует UTXO-дерево нот. Ни один наблюдатель on-chain не может связать конкретный депозит с конкретным выводом. История транзакций показывает только взаимодействия с пулом, но не адреса кошельков.",
      shieldStep03Title: "Withdraw: получить по любому адресу",
      shieldStep03Desc:
        "Пользователь или получатель генерирует ZK-доказательство владения конкретными нотами в пуле и вызывает unshield(). Токены высвобождаются на любой адрес. ZK-доказательство проверяется on-chain, но криптографическая связь с исходным кошельком-депозитором разорвана.",
      shieldStep03Callout:
        "Получатель получает реальные токены ERC-20 по своему адресу. Никакой информации об адресе отправителя не утекает on-chain.",
      shieldH2Privacy: "Гарантии конфиденциальности",
      shieldPrivacyHeaders: ["Что скрыто", "Что видно on-chain"],
      shieldPrivacyRows: [
        ["Адрес кошелька отправителя", "Адрес контракта пула Railgun"],
        ["Адрес кошелька получателя", "Тип токена (USDC, ETH и т.д.)"],
        ["Сумма перевода", "Временная метка блока"],
        ["Связь между отправителем и получателем", "Результат проверки ZK-доказательства (успех или отказ)"],
      ],

      airIntro:
        "QryptAir позволяет создать, подписать и доставить токен-перевод полностью без доступа к интернету. Подписанный EIP-712 ваучер кодируется в QR-код. Получатель сканирует его и транслирует в Ethereum. Приватный ключ отправителя никогда не касается живого сетевого узла.",
      airStep01Title: "Sign: создать ваучер офлайн",
      airStep01Desc:
        "Отправитель генерирует типизированный EIP-712 ваучер, указывающий получателя, токен, сумму, дедлайн и nonce. Ваучер подписывается приватным ключом отправителя полностью офлайн. Доступ к интернету на этом шаге не требуется.",
      airStep02Title: "Encode: поделиться через QR-код",
      airStep02Desc:
        "Подписанный ваучер (получатель, токен, сумма, дедлайн, nonce и подпись) кодируется в QR-код. QR можно распечатать, сфотографировать, показать на экране или передать любым физическим способом. Он действителен до наступления дедлайна.",
      airStep03Title: "Broadcast: получатель забирает on-chain",
      airStep03Desc:
        "Получатель сканирует QR-код, извлекает данные ваучера и вызывает claimAirVoucher(voucher, sig) в контракте хранилища. Контракт проверяет EIP-712 подпись on-chain, проверяет дедлайн и nonce (защита от повторного использования) и выполняет перевод токенов.",
      airStep03Callout:
        "Каждый nonce можно использовать только один раз. claimAirVoucher() завершается с ошибкой VoucherAlreadyUsed() при повторе. Истёкшие ваучеры завершаются с ошибкой VoucherExpired().",
      airH2UseCases: "Сценарии использования",
      airUseCaseHeaders: ["Сценарий", "Как помогает QryptAir"],
      airUseCases: [
        ["Подпись с airgapped-кошелька", "Подписать на офлайн-устройстве, транслировать с отдельного онлайн-устройства"],
        ["Физический подарок в виде токенов", "Распечатать QR-код как физическую подарочную карту с токенами"],
        ["Среды с ограниченным подключением", "Подготовить переводы заранее; транслировать при наличии подключения"],
        ["Повышенная безопасность подписи", "Держать ключ подписи постоянно офлайн. Только шаг трансляции требует интернета."],
      ],
    },
  },

  zh: {
    overview: {
      title: "概述",
      intro:
        "Qryptum 是以太坊 L1 上的非托管代币保护协议，提供三种不同的转账模式。每种模式针对不同的安全场景：从防御私钥被盗的个人保险库保护，到基于零知识证明的完全匿名转账，再到无需互联网连接的离线隔空签名。QryptSafe 在 Sepolia 测试网和以太坊主网均上线运行。QryptShield 和 QryptAir 在 Sepolia 运行。",
      h2TransferModes: "转账模式",
      modeTableHeaders: ["模式", "机制", "隐私级别", "最适合"],
      modes: [
        ["QryptSafe", "提交-揭示 vault proof", "链上可见", "防止私钥被盗的个人代币保护"],
        ["QryptShield", "Railgun ZK 隐私池", "零知识，完全私密", "发送方和接收方无链上关联的匿名转账"],
        ["QryptAir", "EIP-712 凭证 + 二维码", "离线签名", "隔空转账：离线签名，稍后广播"],
      ],
      h2Architecture: "系统架构",
      pArchitecture:
        "每种模式由以太坊 L1 上不同的智能合约层支撑：",
      archItems: [
        "QryptSafe：每位用户通过 ShieldFactory 部署自己的 PersonalVault 合约。保险库持有真实 ERC-20 代币并发行不可转让的 qToken 作为凭证。每次代币操作都同时需要用户的私钥和 6 位 vault proof。",
        "QryptShield：转账通过 Railgun 隐私池路由。零知识证明在密码学上切断发送方与接收方之间的链上关联。不涉及 Qryptum 自有合约，所有链上逻辑由 Railgun 协议处理。",
        "QryptAir：发送方完全离线签署 EIP-712 类型化凭证。签名凭证编码为二维码并分享给接收方，接收方将其广播到以太坊。保险库合约上的 claimAirVoucher 函数验证签名并执行转账。",
      ],
      h2CoreProperties: "核心特性",
      coreTableHeaders: ["特性", "工作原理"],
      coreProperties: [
        ["非托管", "代币存储在保险库合约地址。任何第三方均无法访问。Qryptum 部署者没有任何管理密钥。"],
        ["不可转让的 qToken", "transfer()、transferFrom() 和 approve() 在合约层面始终回滚。任何钱包均无法移动 qToken。"],
        ["双因素保护（QryptSafe）", "每次保险库操作都同时需要用户的私钥和 6 位 vault proof。"],
        ["零知识隐私（QryptShield）", "Railgun ZK 证明向链上观察者隐藏发送方地址、接收方地址和转账金额。"],
        ["离线签名（QryptAir）", "发送方的私钥从不接触实时网络节点。签名完全在本地进行，广播是独立步骤。"],
        ["隔离保险库", "每位用户拥有唯一的保险库地址。用户 A 的代币在 0xQryptSafeA，用户 B 的在 0xQryptSafeB，永不混淆。"],
        ["QryptAir 凭证 nonce（QryptSafe）", "每个凭证 nonce 仅可使用一次。claimAirVoucher() 重放时以 VoucherAlreadyUsed() 回滚。"],
        ["重放保护（QryptAir）", "每个凭证 nonce 只能使用一次。usedVouchers 映射防止双重花费。"],
      ],
      h2DeployedContracts: "已部署合约（Sepolia）",
      pDeployed: "所有合约均在 Sepolia Etherscan 上通过 MIT 许可证验证。QryptShield 使用 Railgun 合约（由 Railgun 社区部署和维护）。",
      labelFactory: "QryptSafe factory v3（已取代）：",
      labelImpl: "PersonalQryptSafe impl v3（已取代）：",
      labelQryptAir: "QryptAir redeemVoucher（v4，已停用）：",
      pendingNote: "已被 v5 取代。",
      labelFactoryV6: "QryptSafe factory v6（活跃）：",
      labelImplV6: "PersonalQryptSafe impl v6（活跃）：",
      labelQryptAirV6: "QryptAir air bags v6（活跃）：",
      pDeployedV6: "V1、V2 和 V3 已在 Sepolia Etherscan 上部署并通过 MIT 许可证验证。V4-V6 的地址将在每个版本部署并验证后添加。",
      h2V5ToV6: "v5 to v6: 变更内容",
      v5ToV6Items: [
        "OTP 链替换静态 bytes32 proofHash：每个 proof 一次性使用并推进链头，从结构上使重放攻击不可能。",
        "新增 rechargeChain()：owner 可在不重新部署的情况下向保险库追加新的 OTP 链。",
        "Air bags 隔离：QryptAir 凭证兑换从独立的 air bags 余额中提取，防止对屏蔽余额的双花。",
        "新增 depositToAirBag() 和 withdrawFromAirBag() 用于显式管理 air bags 资金。",
        "67/67 E2E 测试在 Sepolia 全部通过。Factory 和 implementation 在 Etherscan 进行 MIT 验证。",
      ],
      labelFactoryV5: "QryptSafe factory v5（已被 v6 取代）：",
      labelImplV5: "PersonalQryptSafe impl v5（已被 v6 取代）：",
      labelQryptAirV5: "QryptAir claimAirVoucher v5（已被 v6 取代）：",
      pDeployedV5: "v5 已被 v6 取代（OTP 链升级）。所有 v5 合约仍在 Sepolia Etherscan 上通过 MIT 许可证验证。51/51 E2E 测试全部通过。",
      h2V3ToV5: "v3 to v5: 变更内容",
      v3ToV5Items: [
        "bytes32 proofHash 替换 string vaultProof：将 keccak256 哈希发送到合约而非原始字符串，实现 EIP-712 struct-hash 兼容性。",
        "添加 unshieldToRailgun()：QryptShield 现在可以将取消屏蔽直接路由到 Railgun 隐私池。",
        "添加 claimAirVoucher()：QryptAir EIP-712 离线签名凭证现在存在于 PersonalQryptSafe 中（无需单独合约）。",
        "v4 中间部署已停用（使用 string vaultProof 配合 QryptAir/QryptShield）。被 v5 取代。",
        "Sepolia 上 51/51 E2E 测试全部通过。所有合约已在 Etherscan 进行 MIT 验证。",
      ],
      h2V4ToV5: "v4 to v5: bytes32 proofHash 升级",
      v4ToV5Items: [
        "vaultProof 参数在所有函数中从 string 更改为 bytes32（qrypt、unqrypt、changeVaultProof、claimAirVoucher、unshieldToRailgun）。",
        "EIP-712 struct-hash 现在正常工作：bytes32 是固定大小类型，与 encodeData 兼容。",
        "在 Sepolia 上使用新 bytes32 proofHash 的所有 32 个 E2E 测试全部通过。",
      ],
      viewOnEtherscan: "在 Sepolia Etherscan 上查看",
    },

    why: {
      title: "为何选择 Qryptum",
      intro:
        "以太坊上的 ERC-20 代币存在根本性风险：任何拥有您私钥的人都可以立即转移您的全部代币。Qryptum 在不引入托管方的情况下消除这一风险，通过三种针对不同威胁场景的保护模式实现这一目标。",
      h2Problem: "问题所在",
      pProblem1:
        "私钥泄露是加密资产损失的最大单一原因。钓鱼攻击、恶意软件、助记词泄露、社会工程学攻击：结果始终相同。一旦攻击者获得私钥，就能在数秒内清空钱包中的所有代币。",
      pProblem2:
        "现有解决方案需要信任第三方：托管交易所、多签服务或硬件钱包制造商。Qryptum 只需信任开源、经过验证的代码，无需信任任何人。",
      h2ThreeLevels: "三重保护",
      pThreeLevels:
        "Qryptum 在三个层面解决私钥问题。用户可根据自身威胁模型选择合适的保护级别。",
      levelsTableHeaders: ["模式", "应对威胁", "机制"],
      levels: [
        ["QryptSafe", "私钥被盗、钓鱼授权、恶意合约调用", "Vault proof：每次代币操作都需要的第二因素"],
        ["QryptShield", "链上交易追踪、钱包地址关联、余额监控", "Railgun ZK 池：发送方和接收方在密码学上断开关联"],
        ["QryptAir", "联网签名会话中的签名密钥泄露", "EIP-712 离线凭证：签名密钥从不接触实时节点"],
      ],
      h2QryptSafe: "QryptSafe：Vault Proof 层",
      pQryptSafe1:
        "QryptSafe 为每次代币操作添加第二个必需因素：vault proof。Vault proof 是一个 6 位字符串（3 个字母加 3 个数字，例如 abc123），完全由智能合约在链上验证。任何服务器都不会看到它。",
      pQryptSafe2:
        "当用户将代币存入 Qrypt-Safe 时，代币转移到一个没有私钥的智能合约地址。真实的 ERC-20 代币存放在该保险库地址。作为替代，用户在钱包中持有 qToken（如 qUSDC 或 qWETH）。这些 qToken 是不可转让的凭证：任何钱包、交易所或脚本都无法移动它们。",
      h2Compare: "场景对比",
      compareHeaders: ["场景", "标准 ERC-20", "Qryptum"],
      compareRows: [
        ["私钥泄露", "所有代币瞬间被清空", "攻击者无法移动 qToken（回滚）"],
        ["钓鱼网站授权", "代币授权被清空", "approve() 始终回滚"],
        ["恶意合约调用", "transferFrom() 清空余额", "transferFrom() 始终回滚"],
        ["交易所被黑", "存入代币面临风险", "qToken 无法存入任何交易所"],
        ["链上追踪", "所有转账在 Etherscan 可见", "QryptShield 通过 ZK 证明切断链上关联"],
        ["联网签名风险", "每次签名时密钥暴露于网络", "QryptAir 离线签名，密钥不接触节点"],
      ],
      h2WhatIsNot: "Qryptum 不是什么",
      notItems: [
        "不是托管方。Qryptum 从不持有或控制用户资金。保险库合约没有管理密钥。",
        "不是多签钱包。没有 Qryptum 强加的共同签名人、恢复方或时间延迟。",
        "不是跨链代币桥。代币留在以太坊 L1，没有跨链操作。",
        "不是 Layer 2。所有智能合约直接在以太坊 L1 上执行。QryptSafe 在 Sepolia 测试网和以太坊主网均上线。",
        "不是硬件钱包的替代品。Qryptum 在正确密钥管理的基础上增加一层保护，而非取代它。",
      ],
      h2KeyInsights: "核心洞察",
      insightSafeLabel: "QryptSafe：",
      insightSafe:
        "单独知道 vault proof 而没有私钥毫无用处。单独拥有私钥而没有 vault proof 也毫无用处，因为 qToken 转账始终会回滚。攻击者需要同时拥有两者，而 vault proof 从不存储在任何服务器上。",
      insightShieldLabel: "QryptShield：",
      insightShield:
        "即使拥有完整的区块链访问权限，观察者也无法将 Railgun 存款与提款关联起来。ZK 证明只证明证明者知道一个有效的票据，而不透露是哪个票据或哪个钱包创建的。",
      insightAirLabel: "QryptAir：",
      insightAir:
        "签名密钥可以永久保持离线状态。只有广播步骤需要网络访问，而该步骤可以由任何人执行，包括接收方。",
    },

    howItWorks: {
      title: "工作原理",
      intro:
        "Qryptum 有三种转账模式，各自具有不同的流程、智能合约层和隐私模型。在下方选择一种模式，查看其逐步流程。QryptSafe 在 Sepolia 测试网和以太坊主网均上线。QryptShield 和 QryptAir 在 Sepolia 运行。",
      tabSafe: "QryptSafe",
      tabShield: "QryptShield",
      tabAir: "QryptAir",

      safeIntro:
        "QryptSafe 通过将 ERC-20 代币锁定在个人智能合约保险库中来保护它们。每次代币操作都需要用户的私钥和经链上验证的 6 位 vault proof。仅凭被盗的私钥无法移动代币。",
      safeH2Lifecycle: "代币生命周期",
      safeStep01Title: "qrypt - 将代币存入 Qrypt-Safe",
      safeStep01Desc:
        "用户授权保险库合约提取代币，然后调用 qrypt(tokenAddress, amount, otpProof)。合约验证 OTP 链 proof（keccak256(proof) == chainHead），将链头推进到下一位置，提取 ERC-20 代币，并向用户钱包铸造等量的不可转让 qToken（例如 qUSDC）。",
      safeStep02Title: "Hold - qToken 作为凭证",
      safeStep02Desc:
        "调用 qrypt 后，用户在钱包中持有 qToken。底层 ERC-20 代币存放在保险库合约地址。对 qToken 调用 transfer()、transferFrom() 或 approve() 会立即在合约层面回滚。任何钱包、交易所或脚本都无法移动它们。",
      safeStep03Title: "Transfer - QryptAir 凭证或 QryptShield",
      safeStep03Desc:
        "要进行 P2P 转账，使用 QryptAir（claimAirVoucher）发送离线 EIP-712 签名凭证，或使用 QryptShield（unshieldToRailgun）通过 Railgun ZK 池匿名投递。",
      safeTransferTableHeaders: ["步骤", "操作", "是否上链"],
      safeTransferRows: [
        ["1", "发送方离线签署 EIP-712 凭证（QryptAir）或调用 unshieldToRailgun（QryptShield）", "否 / 是"],
        ["2", "QryptAir：接收方调用 claimAirVoucher(voucher, sig)。合约验证签名和 nonce。", "是"],
        ["3", "QryptShield：Railgun ZK 池接收存款；接收方匿名提取。", "是"],
        ["4", "接收方收到真实 ERC-20。发送方保险库中的 qToken 被销毁。", "是"],
      ],
      safeTransferCallout:
        "接收方始终收到真实的 ERC-20 代币（例如 USDC），而非 qUSDC。如果想要相同保护，可在自己的 Qrypt-Safe 上调用 qrypt。",
      safeStep04Title: "unqrypt - 将代币提取回钱包",
      safeStep04Desc:
        "用户调用 unqrypt(tokenAddress, amount, vaultProof)。合约销毁 qToken 并将真实 ERC-20 代币返还到用户钱包。",
      safeH2Creating: "创建 Qrypt-Safe",
      safeCreatingDesc:
        "每个钱包只能拥有一个 Qrypt-Safe，通过 ShieldFactory 部署。用户调用 createQryptSafe(initialChainHead)，其中 initialChainHead 是离线从 vault proof 派生的 keccak256 哈希，用于初始化 OTP 链。原始 vault proof 不会接触任何服务器。部署后，用户可以将任意数量的不同 ERC-20 代币存入其唯一的 Qrypt-Safe。",

      shieldIntro:
        "QryptShield 将转账路由通过以太坊 L1 上的 Railgun 隐私池。零知识证明在密码学上切断发送方和接收方之间的链上关联。即使进行完整的区块链分析，也无法确定谁向谁发送了代币。",
      shieldH2TokenLifecycle: "代币流转",
      shieldStep01Title: "Deposit - 将代币存入 Railgun 池",
      shieldStep01Desc:
        "用户将 ERC-20 代币存入 Railgun 隐私池。从此时起，发送方的钱包地址和存款金额被零知识证明隐藏。链上只能看到与池的交互，看不到发送方的钱包或余额。",
      shieldStep02Title: "Mix - 零知识断链",
      shieldStep02Desc:
        "在 Railgun 池内部，存入的票据在密码学上混合。该池持有基于 UTXO 的票据承诺树。任何链上观察者都无法将特定存款与特定提款关联起来。交易历史只显示与池的交互，而不显示个人钱包地址。",
      shieldStep03Title: "Withdraw - 在任意地址接收",
      shieldStep03Desc:
        "用户或接收方为池内特定票据生成 ZK 所有权证明，并调用 unshield()。代币被释放到任意地址。ZK 证明在链上验证，但与原始存款钱包的密码学关联已被切断。",
      shieldStep03Callout:
        "接收方在其地址收到真实的 ERC-20 代币。发送方地址的任何信息都不会在链上泄露。",
      shieldH2Privacy: "隐私保证",
      shieldPrivacyHeaders: ["隐藏的信息", "链上可见的信息"],
      shieldPrivacyRows: [
        ["发送方钱包地址", "Railgun 池合约地址"],
        ["接收方钱包地址", "代币类型（USDC、ETH 等）"],
        ["转账金额", "区块时间戳"],
        ["发送方与接收方的关联", "ZK 证明验证结果（通过或失败）"],
      ],

      airIntro:
        "QryptAir 允许用户完全在没有互联网连接的情况下创建、签署和传递代币转账。签署的 EIP-712 凭证被编码为二维码。接收方扫描并将其广播到以太坊。发送方的私钥从不接触实时网络节点。",
      airStep01Title: "Sign - 离线创建凭证",
      airStep01Desc:
        "发送方生成指定接收方、代币、金额、截止时间和 nonce 的 EIP-712 类型化数据凭证。凭证用发送方的私钥完全离线签署。此步骤不需要任何互联网连接。",
      airStep02Title: "Encode - 通过二维码分享",
      airStep02Desc:
        "签署的凭证（接收方、代币、金额、截止时间、nonce 和签名）被编码为二维码。二维码可以打印、拍照、显示在屏幕上或通过任何物理媒介传输。它在截止时间戳之前有效。",
      airStep03Title: "Broadcast - 接收方在链上领取",
      airStep03Desc:
        "接收方扫描二维码，提取凭证数据，并在保险库合约上调用 claimAirVoucher(voucher, sig)。合约在链上验证 EIP-712 签名，检查截止时间和 nonce（重放保护），并执行代币转账。",
      airStep03Callout:
        "每个 nonce 只能使用一次。claimAirVoucher() 重放时以 VoucherAlreadyUsed() 回滚。已过期凭证以 VoucherExpired() 回滚。",
      airH2UseCases: "使用场景",
      airUseCaseHeaders: ["场景", "QryptAir 如何帮助"],
      airUseCases: [
        ["隔空钱包签名", "在离线设备上签名，从独立的联网设备广播"],
        ["实物代币赠礼", "将二维码打印为实物代币礼品卡"],
        ["低连接环境", "提前准备转账；在有连接时广播"],
        ["额外签名安全", "让签名密钥永久保持离线。只有广播步骤需要互联网访问。"],
      ],
    },
  },
};
