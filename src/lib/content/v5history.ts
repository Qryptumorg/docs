export type V5HistoryContent = {
  title: string;
  intro: string;
  h2WhatChanged: string;
  whatChangedItems: string[];
  h2QryptAir: string;
  pQryptAir: string;
  calloutQryptAir: string;
  h2QryptShield: string;
  pQryptShield: string;
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

export const v5historyContent: Record<"en" | "ru" | "zh", V5HistoryContent> = {
  en: {
    title: "QryptSafe V5 History",
    intro:
      "Fifth deployment in the sequential contract history. V5 keeps all V4 security properties and adds two major protocol features: QryptAir (EIP-712 offline vouchers for peer-to-peer shielded transfers via claimAirVoucher) and QryptShield (direct Railgun ZK integration via unshieldToRailgun, renaming shield/unshield to qrypt/unqrypt). 51 unit tests. MIT license. Both factory and implementation verified on Etherscan.",
    h2WhatChanged: "What V5 Changed from V4",
    whatChangedItems: [
      "qrypt / unqrypt branding: shield() renamed to qrypt(), unshield() renamed to unqrypt(). Semantics unchanged; full V4 partial-unshield support preserved.",
      "QryptAir EIP-712 vouchers: createAirVoucher(token, amount, proof, nonce, expiry) signs an off-chain EIP-712 payload. The recipient calls claimAirVoucher(voucher, sig) to atomically receive the real token, bypassing public mempool leakage. Vouchers are single-use (nonce consumed on claim) and expiry-gated.",
      "QryptShield Railgun integration: unshieldToRailgun(token, amount, proof, railgunAddr) calls IRailgun(railgunAddr).deposit() after burning qTokens, routing the underlying asset directly into a Railgun shielded pool. One transaction, no intermediate step.",
      "veilTransfer / unveilTransfer aliases: Additional view aliases for UX clarity. veilTransfer maps to qrypt path, unveilTransfer maps to unqrypt path.",
      "51 unit tests: Up from 47 in V4. New tests cover QryptAir (voucher create, claim, replay protection, expiry), Railgun routing, combined flows, and qToken isolation invariants.",
    ],
    h2QryptAir: "QryptAir: EIP-712 Offline Vouchers",
    pQryptAir:
      "QryptAir allows a vault owner to sign an off-chain voucher granting a specific recipient the right to claim a shielded amount. The voucher is a typed EIP-712 struct and never appears as calldata until the recipient submits it.",
    calloutQryptAir:
      "The nonce is consumed on-chain on first claim. Replaying the same signed voucher reverts with VoucherAlreadyUsed(). Expiry is checked against block.timestamp; an expired voucher reverts with VoucherExpired().",
    h2QryptShield: "QryptShield: Railgun Integration",
    pQryptShield:
      "unshieldToRailgun combines a full unqrypt with a Railgun deposit in a single transaction. The qToken is burned, the underlying ERC-20 is transferred to the Railgun contract, and the on-chain Railgun pool receives the deposit, all atomically.",
    h2Functions: "Renamed Functions",
    functionHeaders: ["V4 Name", "V5 Name", "Change"],
    h2Errors: "Custom Errors (V5 additions)",
    pErrors: "All 13 V4 errors are preserved. V5 adds 3 new errors for QryptAir:",
    errorHeaders: ["Error", "Condition"],
    h2Contracts: "V5 Sepolia Contracts",
    contractHeaders: ["Contract", "Address", "Etherscan"],
    h2E2E: "On-Chain E2E Transactions (51/51)",
    pE2E:
      "All broadcast transactions executed on Sepolia testnet. Wallet A ↔ Vault A, Wallet B ↔ Vault B.",
    e2eHeaders: ["Test", "Group", "Action", "TX"],
    txReadOnly: "read-only",
    h2TestSuite: "Test Suite (51/51)",
    pTestSuite: "51 unit tests in a single suite. Run with: pnpm test:v5",
    testGroups: [
      "Group 1: Infrastructure (T01-T03): Deploy, EIP-1167 clone prefix check, impl address verification",
      "Group 2: Setup (T04-T05): createVault for Wallet A and Wallet B",
      "Group 3: QryptSafe (T06-T17): qrypt, unqrypt, partial amounts, error cases, proof rotation, activityCount",
      "Group 4: QryptAir EIP-712 (T18-T23): Voucher create, claim, replay protection, expiry, invalid sig, nonce isolation",
      "Group 5: QryptShield Railgun (T24-T28): Railgun deposit, event check, qToken burn, zero address guard, wrong proof",
      "Group 6: Security (T29-T32): Duplicate vault, re-initialize, zero proof hash, emergency delay",
      "Group 7: Vault Registry and View (T33-T44): getVault, hasVault, vaultCreatedAt, activityCount monotonic, multi-token, MINIMUM constant, getAllVaultAddresses",
      "Group 8: qToken Isolation (T45-T51): Non-transferable, per-vault address uniqueness, balance independence, full unqrypt cleanup",
    ],
    h2Lineage: "Version Lineage",
    lineageHeaders: ["Version", "Key Change", "Status"],
    lineageRows: [
      ["V1", "Genesis: EIP-1167 proxy, Ownable + Pausable factory", "Superseded"],
      ["V2", "Pausable removed, nonce commit, SafeERC20", "Superseded"],
      ["V3", "Ownable removed, changeVaultProof, ECDSA metaTransfer", "Superseded"],
      ["V4", "Custom errors (13), vault metadata, partial unshield", "Superseded"],
      ["V5", "QryptAir EIP-712 vouchers, Railgun ZK integration, qrypt/unqrypt branding", "Deployed ✓"],
      ["V6", "OTP-chain passwordHash rotation (proofChainHead)", "Pending"],
    ],
  },

  ru: {
    title: "История QryptSafe V5",
    intro:
      "Пятое развёртывание в последовательной истории контрактов. V5 сохраняет все свойства безопасности V4 и добавляет две крупные протокольные функции: QryptAir (офлайн-ваучеры EIP-712 для P2P защищённых переводов через claimAirVoucher) и QryptShield (прямая интеграция с Railgun ZK через unshieldToRailgun, переименование shield/unshield в qrypt/unqrypt). 51 модульный тест. Лицензия MIT. Фабрика и реализация верифицированы на Etherscan.",
    h2WhatChanged: "Что изменилось в V5 по сравнению с V4",
    whatChangedItems: [
      "Брендинг qrypt / unqrypt: shield() переименован в qrypt(), unshield() переименован в unqrypt(). Семантика не изменена; полная поддержка частичного unshield из V4 сохранена.",
      "QryptAir EIP-712 ваучеры: createAirVoucher(token, amount, proof, nonce, expiry) подписывает офлайн-полезную нагрузку EIP-712. Получатель вызывает claimAirVoucher(voucher, sig) для атомарного получения реального токена, минуя утечку в публичном мемпуле. Ваучеры одноразовые (nonce потребляется при получении) и с ограниченным сроком действия.",
      "QryptShield: интеграция с Railgun: unshieldToRailgun(token, amount, proof, railgunAddr) вызывает IRailgun(railgunAddr).deposit() после сжигания qToken, направляя базовый актив напрямую в защищённый пул Railgun. Одна транзакция, без промежуточных шагов.",
      "Псевдонимы veilTransfer / unveilTransfer: дополнительные view-псевдонимы для удобства UX. veilTransfer соответствует пути qrypt, unveilTransfer соответствует пути unqrypt.",
      "51 модульный тест: увеличено с 47 в V4. Новые тесты охватывают QryptAir (создание ваучера, получение, защита от воспроизведения, срок действия), маршрутизацию Railgun, комбинированные потоки и инварианты изоляции qToken.",
    ],
    h2QryptAir: "QryptAir: Офлайн-ваучеры EIP-712",
    pQryptAir:
      "QryptAir позволяет владельцу хранилища подписать офлайн-ваучер, предоставляющий определённому получателю право получить защищённую сумму. Ваучер является типизированной структурой EIP-712 и не появляется в calldata до момента отправки получателем.",
    calloutQryptAir:
      "Nonce потребляется on-chain при первом получении. Повторное использование подписанного ваучера отменяется с ошибкой VoucherAlreadyUsed(). Срок действия проверяется по block.timestamp; просроченный ваучер отменяется с ошибкой VoucherExpired().",
    h2QryptShield: "QryptShield: Интеграция с Railgun",
    pQryptShield:
      "unshieldToRailgun объединяет полный unqrypt с депозитом Railgun в одной транзакции. qToken сжигается, базовый ERC-20 передаётся контракту Railgun, и пул Railgun on-chain получает депозит, всё атомарно.",
    h2Functions: "Переименованные функции",
    functionHeaders: ["Имя в V4", "Имя в V5", "Изменение"],
    h2Errors: "Пользовательские ошибки (добавления V5)",
    pErrors: "Все 13 ошибок V4 сохранены. V5 добавляет 3 новые ошибки для QryptAir:",
    errorHeaders: ["Ошибка", "Условие"],
    h2Contracts: "Контракты V5 в Sepolia",
    contractHeaders: ["Контракт", "Адрес", "Etherscan"],
    h2E2E: "On-chain E2E транзакции (51/51)",
    pE2E:
      "Все транзакции выполнены в тестовой сети Sepolia. Wallet A ↔ Vault A, Wallet B ↔ Vault B.",
    e2eHeaders: ["Тест", "Группа", "Действие", "TX"],
    txReadOnly: "только чтение",
    h2TestSuite: "Набор тестов (51/51)",
    pTestSuite: "51 модульный тест в одном наборе. Запуск: pnpm test:v5",
    testGroups: [
      "Группа 1: Инфраструктура (T01-T03): Деплой, проверка префикса клона EIP-1167, верификация адреса реализации",
      "Группа 2: Настройка (T04-T05): createVault для Wallet A и Wallet B",
      "Группа 3: QryptSafe (T06-T17): qrypt, unqrypt, частичные суммы, ошибки, ротация proof, activityCount",
      "Группа 4: QryptAir EIP-712 (T18-T23): Создание ваучера, получение, защита от воспроизведения, срок действия, неверная подпись, изоляция nonce",
      "Группа 5: QryptShield Railgun (T24-T28): Депозит Railgun, проверка события, сжигание qToken, защита от нулевого адреса, неверный proof",
      "Группа 6: Безопасность (T29-T32): Дублирование хранилища, повторная инициализация, нулевой хэш proof, задержка экстренного вывода",
      "Группа 7: Реестр и просмотр хранилищ (T33-T44): getVault, hasVault, vaultCreatedAt, монотонный activityCount, мультитокен, константа MINIMUM, getAllVaultAddresses",
      "Группа 8: Изоляция qToken (T45-T51): Непередаваемость, уникальность адреса на хранилище, независимость баланса, очистка после полного unqrypt",
    ],
    h2Lineage: "История версий",
    lineageHeaders: ["Версия", "Ключевое изменение", "Статус"],
    lineageRows: [
      ["V1", "Генезис: прокси EIP-1167, фабрика с Ownable + Pausable", "Устаревшая"],
      ["V2", "Удалён Pausable, nonce commit, SafeERC20", "Устаревшая"],
      ["V3", "Удалён Ownable, changeVaultProof, ECDSA metaTransfer", "Устаревшая"],
      ["V4", "Пользовательские ошибки (13), метаданные хранилища, частичный unshield", "Устаревшая"],
      ["V5", "QryptAir EIP-712 ваучеры, интеграция Railgun ZK, брендинг qrypt/unqrypt", "Задеплоена ✓"],
      ["V6", "OTP-цепочка ротации passwordHash (proofChainHead)", "В разработке"],
    ],
  },

  zh: {
    title: "QryptSafe V5 历史",
    intro:
      "合约连续历史中的第五次部署。V5 保留了 V4 的所有安全特性，并新增两项主要协议功能：QryptAir（通过 claimAirVoucher 实现点对点屏蔽转账的 EIP-712 离线凭证）和 QryptShield（通过 unshieldToRailgun 实现的直接 Railgun ZK 集成，将 shield/unshield 重命名为 qrypt/unqrypt）。51 个单元测试。MIT 许可证。工厂和实现均已在 Etherscan 验证。",
    h2WhatChanged: "V5 相对 V4 的变化",
    whatChangedItems: [
      "qrypt / unqrypt 品牌重塑：shield() 重命名为 qrypt()，unshield() 重命名为 unqrypt()。语义不变；V4 的部分取消屏蔽支持完整保留。",
      "QryptAir EIP-712 凭证：createAirVoucher(token, amount, proof, nonce, expiry) 签署离线 EIP-712 载荷。接收方调用 claimAirVoucher(voucher, sig) 以原子方式接收真实代币，绕过公共内存池泄露。凭证一次性使用（nonce 在认领时消耗）且有过期限制。",
      "QryptShield Railgun 集成：unshieldToRailgun(token, amount, proof, railgunAddr) 在销毁 qToken 后调用 IRailgun(railgunAddr).deposit()，将基础资产直接路由到 Railgun 屏蔽池。单笔交易，无中间步骤。",
      "veilTransfer / unveilTransfer 别名：用于改善 UX 的额外视图别名，veilTransfer 映射到 qrypt 路径，unveilTransfer 映射到 unqrypt 路径。",
      "51 个单元测试：比 V4 的 47 个增加。新测试覆盖 QryptAir（凭证创建、认领、重放保护、过期）、Railgun 路由、组合流程和 qToken 隔离不变量。",
    ],
    h2QryptAir: "QryptAir: EIP-712 离线凭证",
    pQryptAir:
      "QryptAir 允许保险库所有者签署离线凭证，授予特定接收方认领屏蔽金额的权利。凭证是类型化 EIP-712 结构，在接收方提交之前不会出现在 calldata 中。",
    calloutQryptAir:
      "Nonce 在首次认领时在链上消耗。重复使用相同签名凭证将以 VoucherAlreadyUsed() 回滚。过期时间根据 block.timestamp 检查；过期凭证将以 VoucherExpired() 回滚。",
    h2QryptShield: "QryptShield: Railgun 集成",
    pQryptShield:
      "unshieldToRailgun 在单笔交易中将完整的 unqrypt 与 Railgun 存款合并。qToken 被销毁，底层 ERC-20 转移到 Railgun 合约，链上 Railgun 池原子式接收存款。",
    h2Functions: "重命名函数",
    functionHeaders: ["V4 名称", "V5 名称", "变更"],
    h2Errors: "自定义错误（V5 新增）",
    pErrors: "所有 13 个 V4 错误均已保留。V5 为 QryptAir 新增 3 个错误：",
    errorHeaders: ["错误", "条件"],
    h2Contracts: "V5 Sepolia 合约",
    contractHeaders: ["合约", "地址", "Etherscan"],
    h2E2E: "链上 E2E 交易（51/51）",
    pE2E: "所有广播交易均在 Sepolia 测试网执行。Wallet A ↔ Vault A，Wallet B ↔ Vault B。",
    e2eHeaders: ["测试", "组别", "操作", "TX"],
    txReadOnly: "只读",
    h2TestSuite: "测试套件（51/51）",
    pTestSuite: "51 个单元测试，单一套件。运行：pnpm test:v5",
    testGroups: [
      "第 1 组: 基础设施 (T01-T03)：部署、EIP-1167 克隆前缀检查、实现地址验证",
      "第 2 组: 初始化 (T04-T05)：为 Wallet A 和 Wallet B 创建 createVault",
      "第 3 组: QryptSafe (T06-T17)：qrypt、unqrypt、部分金额、错误情况、proof 轮换、activityCount",
      "第 4 组: QryptAir EIP-712 (T18-T23)：凭证创建、认领、重放保护、过期、无效签名、nonce 隔离",
      "第 5 组: QryptShield Railgun (T24-T28)：Railgun 存款、事件检查、qToken 销毁、零地址保护、错误 proof",
      "第 6 组: 安全性 (T29-T32)：重复保险库、重新初始化、零 proof 哈希、紧急延迟",
      "第 7 组: 保险库注册表与视图 (T33-T44)：getVault、hasVault、vaultCreatedAt、单调 activityCount、多代币、MINIMUM 常量、getAllVaultAddresses",
      "第 8 组: qToken 隔离 (T45-T51)：不可转让、每个保险库地址唯一性、余额独立性、完整 unqrypt 清理",
    ],
    h2Lineage: "版本沿革",
    lineageHeaders: ["版本", "关键变更", "状态"],
    lineageRows: [
      ["V1", "创世：EIP-1167 代理，带 Ownable + Pausable 的工厂", "已停用"],
      ["V2", "移除 Pausable，nonce commit，SafeERC20", "已停用"],
      ["V3", "移除 Ownable，changeVaultProof，ECDSA metaTransfer", "已停用"],
      ["V4", "自定义错误 (13)，保险库元数据，部分取消屏蔽", "已停用"],
      ["V5", "QryptAir EIP-712 凭证，Railgun ZK 集成，qrypt/unqrypt 品牌", "已部署 ✓"],
      ["V6", "OTP 链 passwordHash 轮换 (proofChainHead)", "待开发"],
    ],
  },
};
