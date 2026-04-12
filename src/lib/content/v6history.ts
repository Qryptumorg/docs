export type V6HistoryContent = {
  title: string;
  intro: string;
  h2WhatChanged: string;
  whatChangedItems: string[];
  h2OtpChain: string;
  pOtpChain: string;
  calloutOtpChain: string;
  h2AirBags: string;
  pAirBags: string;
  h2Functions: string;
  functionHeaders: [string, string, string];
  h2Errors: string;
  pErrors: string;
  errorHeaders: [string, string];
  h2Contracts: string;
  contractHeaders: [string, string, string];
  h2E2E: string;
  pE2E: string;
  e2eHeaders: [string, string, string, string];
  txReadOnly: string;
  h2TestSuite: string;
  pTestSuite: string;
  testGroups: string[];
  h2Lineage: string;
  lineageHeaders: [string, string, string];
  lineageRows: [string, string, string][];
};

export const v6historyContent: Record<"en" | "ru" | "zh", V6HistoryContent> = {
  en: {
    title: "QryptSafe V6 History",
    intro:
      "Sixth deployment in the sequential contract history. V6 replaces the static proofHash from V5 with a keccak256 OTP ratchet chain (commitChain / rechargeChain). Every qrypt, unqrypt, revealTransfer, fundAirBags, and unshieldToRailgun call consumes one link and advances the chain head. Replay is impossible by construction. airBags isolation added: redeemAirVoucher draws only from the explicit air budget, never from shieldedBalance. changeVaultProof is replaced by rechargeChain, which installs a full new chain from a new seed, giving forward secrecy. 67 unit tests. MIT license.",
    h2WhatChanged: "What V6 Changed from V5",
    whatChangedItems: [
      "OTP ratchet chain replaces static proofHash: V5 stored keccak256(password) as a fixed bytes32. V6 stores chainHead = keccak256^N(seed) and chainLength = N. Each authenticated TX consumes one link (chainHead = submitted OTP) and decrements chainLength. Pre-image resistance makes replay computationally infeasible.",
      "commitChain(chainHead, chainLength) initializes the vault: called once after createVault. notInitialized guard prevents double-init. V6 factory cloneAndInit no longer accepts proofHash.",
      "rechargeChain(newHead, length) replaces changeVaultProof: owner installs a full new OTP chain derived from a new seed. All remaining links of the old chain are immediately dead. Forward secrecy: observing old calldata gives zero advantage.",
      "airBags isolation for QryptAir: V5 allowed redeemAirVoucher to pull from shieldedBalance. V6 requires fundAirBags(token, amount, otpProof) to explicitly move funds into the air budget. redeemAirVoucher draws from airBags only. reclaimAirBags returns unused budget to shieldedBalance.",
      "unshieldToRailgun now requires OTP: the Railgun bridge call consumes a ratchet link. Static proof from V5 is rejected. commitTransfer and revealTransfer also require OTP at the reveal step.",
      "67 unit tests: up from 51 in V5. 16 new tests cover OTP replay blocking, ratchet monotonicity, airBags isolation, cross-vault OTP rejection, chainLength invariants, and rechargeChain forward secrecy.",
    ],
    h2OtpChain: "OTP Ratchet Chain",
    pOtpChain:
      "The OTP chain is a sequence of keccak256 hashes: seed -> H(N) -> H(N-1) -> ... -> H(1). The vault stores H(N) as chainHead and N as chainLength. To authenticate, the caller submits H(k-1) where keccak256(H(k-1)) == chainHead. The vault advances chainHead to H(k-1) and decrements chainLength. An attacker who sees H(k-1) in calldata cannot compute H(k-2) because keccak256 is one-way.",
    calloutOtpChain:
      "Each OTP link is single-use. Re-submitting a consumed link reverts with OtpAlreadyConsumed(). Submitting a non-adjacent link (future or stale) reverts with InvalidOtpProof() because keccak256 of the submitted value does not equal the current chainHead. rechargeChain installs a brand-new chain from a different seed, rotating the password with full forward secrecy.",
    h2AirBags: "airBags Isolation",
    pAirBags:
      "V6 introduces a dedicated airBags budget per token per vault. The vault owner calls fundAirBags(token, amount, otpProof) to move funds from shieldedBalance into the air budget, consuming an OTP link. redeemAirVoucher then draws exclusively from airBags. If airBags is insufficient the call reverts with InsufficientAirBags(); it never falls back to shieldedBalance. reclaimAirBags(token) returns any unused budget back to shieldedBalance without requiring an OTP.",
    h2Functions: "Function Changes V5 to V6",
    functionHeaders: ["V5 Name", "V6 Name", "Change"],
    h2Errors: "Custom Errors (V6 additions)",
    pErrors: "All 16 V5 errors are preserved. V6 adds 8 new errors for the OTP chain and airBags:",
    errorHeaders: ["Error", "Condition"],
    h2Contracts: "V6 Sepolia Contracts",
    contractHeaders: ["Contract", "Address", "Etherscan"],
    h2E2E: "On-Chain E2E Transactions (67/67)",
    pE2E:
      "50/50 onchain state-changing tests verified on Sepolia 2026-04-12. 17 additional read-only eth_call tests shown in the table below. Revert tests run as eth_call simulations. Wallet A = Vault A owner, Wallet B = recipient.",
    e2eHeaders: ["Test", "Group", "Action", "TX"],
    txReadOnly: "read-only",
    h2TestSuite: "Test Suite (67/67)",
    pTestSuite: "67 unit tests in a single suite. Run with: pnpm test:v6",
    testGroups: [
      "Group 1: Infrastructure (T01-T03): Factory bytecode confirmed, impl bytecode confirmed, version() returns 6",
      "Group 2: Setup (T04-T08): createVault for Wallet A + B, commitChain init, vault state check, USDC approve",
      "Group 3: QryptSafe OTP Chain (T09-T21): qrypt, ratchet replay, wrong OTP, non-owner, minimum amount, commitTransfer, revealTransfer, replay commit, rechargeChain, unqrypt, over-balance",
      "Group 4: QryptAir + airBags (T22-T29): Voucher sign off-chain, fundAirBags, isolation check, redeemAirVoucher, replay nonce, expired deadline, wrong sig hash, reclaimAirBags",
      "Group 5: QryptShield Railgun (T30-T34): Wrong OTP, zero proxy, over balance, mock proxy logic, chainHead advances after bridge",
      "Group 6: OTP Chain Security (T35-T42): Pre-image resistance, ratchet replay, stale OTP, double-init, zero chainHead, zero chainLength, cross-vault OTP, future OTP",
      "Group 7: airBags Security (T43-T47): Isolation from shieldedBalance, wrong OTP on fund, excess funding, non-owner reclaim, depleted airBags",
      "Group 8: Invariants (T48-T50): Re-initialize vault, emergencyWithdraw timelock, non-owner access",
      "Group 9: qToken Isolation (T51-T58): Non-transferable transfer/transferFrom/approve, zero balance for un-qrypted token, per-vault address uniqueness, cross-vault balance independence, full unqrypt cleanup",
      "Group 10: Vault Registry (T59-T63): getVaultAddress, hasVault true/false, vaultCreatedAt block, getAllVaultAddresses",
      "Group 11: Multi-token and Constants (T64-T67): USDC + DAI independent qrypt, unqrypt isolation, activityCount monotonic, MINIMUM_SHIELD_AMOUNT constant",
    ],
    h2Lineage: "Version Lineage",
    lineageHeaders: ["Version", "Key Change", "Status"],
    lineageRows: [
      ["V1", "Genesis: EIP-1167 proxy, Ownable + Pausable factory", "Superseded"],
      ["V2", "Pausable removed, nonce commit, SafeERC20", "Superseded"],
      ["V3", "Ownable removed, changeVaultProof, ECDSA metaTransfer", "Superseded"],
      ["V4", "Custom errors (13), vault metadata, partial unshield", "Superseded"],
      ["V5", "QryptAir EIP-712 vouchers, Railgun ZK integration, qrypt/unqrypt branding", "Superseded"],
      ["V6", "OTP ratchet chain, airBags isolation, rechargeChain forward secrecy", "Deployed ✓"],
    ],
  },

  ru: {
    title: "История QryptSafe V6",
    intro:
      "Шестое развёртывание в последовательной истории контрактов. V6 заменяет статический proofHash из V5 на цепочку OTP-трещоток keccak256 (commitChain / rechargeChain). Каждый вызов qrypt, unqrypt, revealTransfer, fundAirBags и unshieldToRailgun потребляет одно звено и продвигает голову цепочки. Повторное воспроизведение невозможно по конструкции. Добавлена изоляция airBags: redeemAirVoucher берёт средства только из явного воздушного бюджета, никогда из shieldedBalance. changeVaultProof заменён на rechargeChain, который устанавливает полную новую цепочку из нового сида, обеспечивая прямую секретность. 67 модульных тестов. Лицензия MIT.",
    h2WhatChanged: "Что изменилось в V6 по сравнению с V5",
    whatChangedItems: [
      "OTP-цепочка трещоток заменяет статический proofHash: V5 хранил keccak256(password) как фиксированный bytes32. V6 хранит chainHead = keccak256^N(seed) и chainLength = N. Каждая аутентифицированная TX потребляет одно звено и уменьшает chainLength. Стойкость к прообразу делает воспроизведение вычислительно неосуществимым.",
      "commitChain(chainHead, chainLength) инициализирует хранилище: вызывается однократно после createVault. Защита notInitialized предотвращает двойную инициализацию. Фабрика V6 cloneAndInit больше не принимает proofHash.",
      "rechargeChain(newHead, length) заменяет changeVaultProof: владелец устанавливает полную новую OTP-цепочку из нового сида. Все оставшиеся звенья старой цепочки немедленно становятся недействительными. Прямая секретность: наблюдение старых calldata не даёт никакого преимущества.",
      "Изоляция airBags для QryptAir: V5 позволял redeemAirVoucher брать из shieldedBalance. V6 требует явного вызова fundAirBags(token, amount, otpProof) для перемещения средств в воздушный бюджет. redeemAirVoucher берёт только из airBags. reclaimAirBags возвращает неиспользованный бюджет в shieldedBalance.",
      "unshieldToRailgun теперь требует OTP: вызов моста Railgun потребляет звено трещотки. Статический proof от V5 отклоняется. commitTransfer и revealTransfer также требуют OTP на этапе reveal.",
      "67 модульных тестов: увеличено с 51 в V5. 16 новых тестов охватывают блокировку повторного OTP, монотонность трещотки, изоляцию airBags, отклонение межвалютного OTP, инварианты chainLength и прямую секретность rechargeChain.",
    ],
    h2OtpChain: "OTP-цепочка трещоток",
    pOtpChain:
      "OTP-цепочка — это последовательность хешей keccak256: seed -> H(N) -> H(N-1) -> ... -> H(1). Хранилище хранит H(N) как chainHead и N как chainLength. Для аутентификации вызывающий отправляет H(k-1), где keccak256(H(k-1)) == chainHead. Хранилище продвигает chainHead до H(k-1) и уменьшает chainLength. Злоумышленник, видящий H(k-1) в calldata, не может вычислить H(k-2), поскольку keccak256 является односторонней функцией.",
    calloutOtpChain:
      "Каждое OTP-звено одноразовое. Повторная отправка потреблённого звена откатывается с OtpAlreadyConsumed(). Отправка несмежного звена (будущего или устаревшего) откатывается с InvalidOtpProof(), поскольку keccak256 отправленного значения не равен текущему chainHead. rechargeChain устанавливает совершенно новую цепочку из другого сида, ротируя пароль с полной прямой секретностью.",
    h2AirBags: "Изоляция airBags",
    pAirBags:
      "V6 вводит выделенный бюджет airBags на токен на хранилище. Владелец хранилища вызывает fundAirBags(token, amount, otpProof) для перемещения средств из shieldedBalance в воздушный бюджет, потребляя OTP-звено. redeemAirVoucher затем берёт исключительно из airBags. Если airBags недостаточно, вызов откатывается с InsufficientAirBags(); он никогда не переходит к shieldedBalance. reclaimAirBags(token) возвращает неиспользованный бюджет в shieldedBalance без OTP.",
    h2Functions: "Изменения функций V5 → V6",
    functionHeaders: ["Имя в V5", "Имя в V6", "Изменение"],
    h2Errors: "Пользовательские ошибки (добавления V6)",
    pErrors: "Все 16 ошибок V5 сохранены. V6 добавляет 8 новых ошибок для OTP-цепочки и airBags:",
    errorHeaders: ["Ошибка", "Условие"],
    h2Contracts: "Контракты V6 в Sepolia",
    contractHeaders: ["Контракт", "Адрес", "Etherscan"],
    h2E2E: "On-chain E2E транзакции (67/67)",
    pE2E:
      "50/50 онлайн-тестов с изменением состояния подтверждены в Sepolia 2026-04-12. 17 дополнительных read-only тестов приведены в таблице ниже. Тесты отката выполняются как симуляции eth_call.",
    e2eHeaders: ["Тест", "Группа", "Действие", "TX"],
    txReadOnly: "только чтение",
    h2TestSuite: "Набор тестов (67/67)",
    pTestSuite: "67 модульных тестов в одном наборе. Запуск: pnpm test:v6",
    testGroups: [
      "Группа 1: Инфраструктура (T01-T03): Байткод фабрики подтверждён, байткод impl подтверждён, version() возвращает 6",
      "Группа 2: Настройка (T04-T08): createVault для Wallet A + B, инициализация commitChain, проверка состояния, апрув USDC",
      "Группа 3: QryptSafe OTP Chain (T09-T21): qrypt, повтор трещотки, неверный OTP, не-владелец, минимальная сумма, commitTransfer, revealTransfer, повтор коммита, rechargeChain, unqrypt, превышение баланса",
      "Группа 4: QryptAir + airBags (T22-T29): Подпись ваучера офлайн, fundAirBags, проверка изоляции, redeemAirVoucher, повтор nonce, истёкший срок, неверный хеш подписи, reclaimAirBags",
      "Группа 5: QryptShield Railgun (T30-T34): Неверный OTP, нулевой прокси, превышение баланса, мок-прокси логика, chainHead продвигается после бриджа",
      "Группа 6: Безопасность OTP Chain (T35-T42): Стойкость к прообразу, повтор трещотки, устаревший OTP, двойная инициализация, нулевой chainHead, нулевой chainLength, межвалютный OTP, будущий OTP",
      "Группа 7: Безопасность airBags (T43-T47): Изоляция от shieldedBalance, неверный OTP при fund, превышение баланса, reclaim не-владельца, опустошённые airBags",
      "Группа 8: Инварианты (T48-T50): Повторная инициализация, тайм-аут emergencyWithdraw, доступ не-владельца",
      "Группа 9: Изоляция qToken (T51-T58): Непередаваемые transfer/transferFrom/approve, нулевой баланс для не-qrypt токена, уникальность адреса на хранилище, независимость баланса, полная очистка unqrypt",
      "Группа 10: Реестр хранилищ (T59-T63): getVaultAddress, hasVault true/false, блок vaultCreatedAt, getAllVaultAddresses",
      "Группа 11: Мультитокен и константы (T64-T67): USDC + DAI независимый qrypt, изоляция unqrypt, монотонный activityCount, константа MINIMUM_SHIELD_AMOUNT",
    ],
    h2Lineage: "История версий",
    lineageHeaders: ["Версия", "Ключевое изменение", "Статус"],
    lineageRows: [
      ["V1", "Генезис: прокси EIP-1167, фабрика с Ownable + Pausable", "Устаревшая"],
      ["V2", "Удалён Pausable, nonce commit, SafeERC20", "Устаревшая"],
      ["V3", "Удалён Ownable, changeVaultProof, ECDSA metaTransfer", "Устаревшая"],
      ["V4", "Пользовательские ошибки (13), метаданные хранилища, частичный unshield", "Устаревшая"],
      ["V5", "QryptAir EIP-712 ваучеры, интеграция Railgun ZK, брендинг qrypt/unqrypt", "Устаревшая"],
      ["V6", "OTP-цепочка трещоток, изоляция airBags, прямая секретность rechargeChain", "Задеплоена ✓"],
    ],
  },

  zh: {
    title: "QryptSafe V6 历史",
    intro:
      "合约连续历史中的第六次部署。V6 将 V5 的静态 proofHash 替换为 keccak256 OTP 棘轮链（commitChain / rechargeChain）。每次 qrypt、unqrypt、revealTransfer、fundAirBags 和 unshieldToRailgun 调用消耗一个链接并推进链头。重放在设计上不可能。新增 airBags 隔离：redeemAirVoucher 仅从显式空投预算中提取，永不触及 shieldedBalance。changeVaultProof 被 rechargeChain 替换，后者从新种子安装完整的新链，提供前向保密性。67 个单元测试。MIT 许可证。",
    h2WhatChanged: "V6 相对 V5 的变化",
    whatChangedItems: [
      "OTP 棘轮链替换静态 proofHash：V5 将 keccak256(password) 作为固定 bytes32 存储。V6 存储 chainHead = keccak256^N(seed) 和 chainLength = N。每次经过认证的 TX 消耗一个链接（chainHead = 提交的 OTP）并递减 chainLength。单向性使重放在计算上不可行。",
      "commitChain(chainHead, chainLength) 初始化保险库：在 createVault 后调用一次。notInitialized 守卫防止双重初始化。V6 工厂 cloneAndInit 不再接受 proofHash。",
      "rechargeChain(newHead, length) 替换 changeVaultProof：所有者从新种子安装全新的 OTP 链。旧链的所有剩余链接立即失效。前向保密性：观察旧 calldata 不会带来任何优势。",
      "QryptAir 的 airBags 隔离：V5 允许 redeemAirVoucher 从 shieldedBalance 提取。V6 需要 fundAirBags(token, amount, otpProof) 将资金显式移入空投预算。redeemAirVoucher 仅从 airBags 提取。reclaimAirBags 将未使用的预算返回 shieldedBalance。",
      "unshieldToRailgun 现在需要 OTP：Railgun 桥接调用消耗一个棘轮链接。V5 的静态 proof 被拒绝。commitTransfer 和 revealTransfer 也在揭示步骤需要 OTP。",
      "67 个单元测试：比 V5 的 51 个增加。16 个新测试覆盖 OTP 重放阻断、棘轮单调性、airBags 隔离、跨保险库 OTP 拒绝、chainLength 不变量和 rechargeChain 前向保密性。",
    ],
    h2OtpChain: "OTP 棘轮链",
    pOtpChain:
      "OTP 链是一系列 keccak256 哈希：seed -> H(N) -> H(N-1) -> ... -> H(1)。保险库将 H(N) 存储为 chainHead，N 为 chainLength。要认证，调用者提交 H(k-1)，其中 keccak256(H(k-1)) == chainHead。保险库将 chainHead 推进到 H(k-1) 并递减 chainLength。在 calldata 中看到 H(k-1) 的攻击者无法计算 H(k-2)，因为 keccak256 是单向的。",
    calloutOtpChain:
      "每个 OTP 链接是一次性的。重新提交已消耗的链接会以 OtpAlreadyConsumed() 回滚。提交不相邻的链接（未来或过期）会以 InvalidOtpProof() 回滚，因为提交值的 keccak256 不等于当前 chainHead。rechargeChain 从不同种子安装全新链，以完整前向保密性轮换密码。",
    h2AirBags: "airBags 隔离",
    pAirBags:
      "V6 为每个保险库的每个代币引入专用的 airBags 预算。保险库所有者调用 fundAirBags(token, amount, otpProof) 将资金从 shieldedBalance 移入空投预算，消耗一个 OTP 链接。redeemAirVoucher 然后专门从 airBags 提取。如果 airBags 不足，调用以 InsufficientAirBags() 回滚；永远不会退而使用 shieldedBalance。reclaimAirBags(token) 无需 OTP 即可将未使用的预算返还给 shieldedBalance。",
    h2Functions: "函数变更 V5 -> V6",
    functionHeaders: ["V5 名称", "V6 名称", "变更"],
    h2Errors: "自定义错误（V6 新增）",
    pErrors: "所有 16 个 V5 错误均已保留。V6 为 OTP 链和 airBags 新增 8 个错误：",
    errorHeaders: ["错误", "条件"],
    h2Contracts: "V6 Sepolia 合约",
    contractHeaders: ["合约", "地址", "Etherscan"],
    h2E2E: "链上 E2E 交易（67/67）",
    pE2E:
      "50/50 链上状态变更测试已于 2026-04-12 在 Sepolia 验证。下表另含 17 项只读 eth_call 测试。回滚测试以 eth_call 模拟运行。",
    e2eHeaders: ["测试", "组别", "操作", "TX"],
    txReadOnly: "只读",
    h2TestSuite: "测试套件（67/67）",
    pTestSuite: "67 个单元测试，单一套件。运行：pnpm test:v6",
    testGroups: [
      "第 1 组: 基础设施 (T01-T03)：工厂字节码确认，impl 字节码确认，version() 返回 6",
      "第 2 组: 初始化 (T04-T08)：为 Wallet A + B 创建 createVault，commitChain 初始化，保险库状态检查，USDC 授权",
      "第 3 组: QryptSafe OTP Chain (T09-T21)：qrypt，棘轮重放，错误 OTP，非所有者，最小金额，commitTransfer，revealTransfer，重放提交，rechargeChain，unqrypt，超额",
      "第 4 组: QryptAir + airBags (T22-T29)：离线签名凭证，fundAirBags，隔离检查，redeemAirVoucher，重放 nonce，过期截止时间，错误签名哈希，reclaimAirBags",
      "第 5 组: QryptShield Railgun (T30-T34)：错误 OTP，零代理，超额余额，模拟代理逻辑，桥接后 chainHead 推进",
      "第 6 组: OTP Chain 安全性 (T35-T42)：原像抗性，棘轮重放，过时 OTP，双重初始化，零 chainHead，零 chainLength，跨保险库 OTP，未来 OTP",
      "第 7 组: airBags 安全性 (T43-T47)：与 shieldedBalance 隔离，资金错误 OTP，超额资金，非所有者回收，airBags 耗尽",
      "第 8 组: 不变量 (T48-T50)：重新初始化保险库，emergencyWithdraw 时间锁，非所有者访问",
      "第 9 组: qToken 隔离 (T51-T58)：不可转让 transfer/transferFrom/approve，未 qrypt 代币零余额，每保险库地址唯一性，跨保险库余额独立性，完整 unqrypt 清理",
      "第 10 组: 保险库注册表 (T59-T63)：getVaultAddress，hasVault 真/假，vaultCreatedAt 区块，getAllVaultAddresses",
      "第 11 组: 多代币与常量 (T64-T67)：USDC + DAI 独立 qrypt，unqrypt 隔离，activityCount 单调，MINIMUM_SHIELD_AMOUNT 常量",
    ],
    h2Lineage: "版本沿革",
    lineageHeaders: ["版本", "关键变更", "状态"],
    lineageRows: [
      ["V1", "创世：EIP-1167 代理，带 Ownable + Pausable 的工厂", "已停用"],
      ["V2", "移除 Pausable，nonce commit，SafeERC20", "已停用"],
      ["V3", "移除 Ownable，changeVaultProof，ECDSA metaTransfer", "已停用"],
      ["V4", "自定义错误 (13)，保险库元数据，部分取消屏蔽", "已停用"],
      ["V5", "QryptAir EIP-712 凭证，Railgun ZK 集成，qrypt/unqrypt 品牌", "已停用"],
      ["V6", "OTP 棘轮链，airBags 隔离，rechargeChain 前向保密性", "已部署 ✓"],
    ],
  },
};
