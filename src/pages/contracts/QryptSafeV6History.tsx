import { useLanguage } from "@/lib/LanguageContext";
import { v6historyContent } from "@/lib/content/v6history";

const FACTORY_V6: string = "0xeaa722e996888b662E71aBf63d08729c6B6802F4";
const IMPL_V6: string    = "";
const VAULT_A_V6         = "";
const VAULT_B_V6         = "";
const ETHERSCAN          = "https://sepolia.etherscan.io";

function AddrCell({ value }: { value: string }) {
    if (!value) return <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span>;
    return <code>{value}</code>;
}

function TxLink({ hash }: { hash: string }) {
    return (
        <a href={`${ETHERSCAN}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
            {hash.slice(0, 14)}...{hash.slice(-8)} ↗
        </a>
    );
}

type TxCol = { hash?: string; readOnly?: boolean };

const E2E_ROWS: [string, string, string, TxCol][] = [
    ["T01", "Infrastructure", "Factory v6 has on-chain bytecode", { readOnly: true }],
    ["T02", "Infrastructure", "Impl v6 has on-chain bytecode", { readOnly: true }],
    ["T03", "Infrastructure", "version() returns 6", { readOnly: true }],

    ["T04", "Setup", "createVault: Wallet A → Vault A clone", {}],
    ["T05", "Setup", "createVault: Wallet B → Vault B clone", {}],
    ["T06", "Setup", "commitChain(H100, 100) initializes OTP chain (Vault A)", {}],
    ["T07", "Setup", "Vault A state: chainHead == H100, chainLength == 100", { readOnly: true }],
    ["T08", "Setup", "Approve USDC for Vault A (10 USDC)", {}],

    ["T09", "QryptSafe OTP Chain", "qrypt() 1 USDC with valid OTP H99", {}],
    ["T10", "QryptSafe OTP Chain", "qrypt() ratchet replay: H99 consumed → OtpAlreadyConsumed()", { readOnly: true }],
    ["T11", "QryptSafe OTP Chain", "qrypt() wrong OTP → InvalidOtpProof()", { readOnly: true }],
    ["T12", "QryptSafe OTP Chain", "qrypt() from non-owner Wallet B → NotOwner()", { readOnly: true }],
    ["T13", "QryptSafe OTP Chain", "qrypt() amount below 1e6 → InvalidAmount()", { readOnly: true }],
    ["T14", "QryptSafe OTP Chain", "commitTransfer() with OTP H98", {}],
    ["T15", "QryptSafe OTP Chain", "revealTransfer() no prior commit → CommitNotFound()", { readOnly: true }],
    ["T16", "QryptSafe OTP Chain", "revealTransfer() wrong OTP → InvalidOtpProof()", { readOnly: true }],
    ["T17", "QryptSafe OTP Chain", "revealTransfer() success: 1 USDC to Wallet B", {}],
    ["T18", "QryptSafe OTP Chain", "Replay used commitHash → CommitAlreadyUsed()", { readOnly: true }],
    ["T19", "QryptSafe OTP Chain", "rechargeChain(H100R, 100): new OTP chain installed", {}],
    ["T20", "QryptSafe OTP Chain", "unqrypt() 1 USDC back to Wallet A", {}],
    ["T21", "QryptSafe OTP Chain", "unqrypt() over shieldedBalance → InsufficientBalance()", { readOnly: true }],

    ["T22", "QryptAir + airBags", "createAirVoucher signed off-chain (EIP-712)", { readOnly: true }],
    ["T23", "QryptAir + airBags", "fundAirBags(USDC, 1 USDC, OTP H99R)", {}],
    ["T24", "QryptAir + airBags", "airBags == 1 USDC, shieldedBalance isolated", { readOnly: true }],
    ["T25", "QryptAir + airBags", "redeemAirVoucher(): Wallet B redeems 1 USDC from airBags", {}],
    ["T26", "QryptAir + airBags", "redeemAirVoucher() replay same nonce → VoucherAlreadyUsed()", { readOnly: true }],
    ["T27", "QryptAir + airBags", "redeemAirVoucher() expired deadline → VoucherExpired()", { readOnly: true }],
    ["T28", "QryptAir + airBags", "redeemAirVoucher() wrong transferCodeHash → InvalidVoucherSig()", { readOnly: true }],
    ["T29", "QryptAir + airBags", "reclaimAirBags(): airBags returns to shieldedBalance", {}],

    ["T30", "QryptShield Railgun", "unshieldToRailgun() wrong OTP → InvalidOtpProof()", { readOnly: true }],
    ["T31", "QryptShield Railgun", "unshieldToRailgun() zero railgunProxy → ZeroAddress()", { readOnly: true }],
    ["T32", "QryptShield Railgun", "unshieldToRailgun() over balance → InsufficientBalance()", { readOnly: true }],
    ["T33", "QryptShield Railgun", "unshieldToRailgun() logic: mock Railgun proxy", {}],
    ["T34", "QryptShield Railgun", "chainHead advances after bridge call (eth_call)", { readOnly: true }],

    ["T35", "OTP Chain Security", "Pre-image resistance: H96 unknown from H97 (eth_call)", { readOnly: true }],
    ["T36", "OTP Chain Security", "Ratchet replay: consumed OTP H99 → OtpAlreadyConsumed()", { readOnly: true }],
    ["T37", "OTP Chain Security", "Stale OTP from deeper in chain → InvalidOtpProof()", { readOnly: true }],
    ["T38", "OTP Chain Security", "commitChain() double-init → ChainAlreadyInitialized()", { readOnly: true }],
    ["T39", "OTP Chain Security", "commitChain() zero chainHead → InvalidChainHead()", { readOnly: true }],
    ["T40", "OTP Chain Security", "commitChain() chainLength == 0 → InvalidChainLength()", { readOnly: true }],
    ["T41", "OTP Chain Security", "Cross-vault OTP: Vault A OTP rejected by Vault B → InvalidOtpProof()", { readOnly: true }],
    ["T42", "OTP Chain Security", "Future OTP not yet in chain → InvalidOtpProof()", { readOnly: true }],

    ["T43", "airBags Security", "redeemAirVoucher() pulls only from airBags (shieldedBalance unchanged)", { readOnly: true }],
    ["T44", "airBags Security", "fundAirBags() wrong OTP → InvalidOtpProof()", { readOnly: true }],
    ["T45", "airBags Security", "fundAirBags() excess over shieldedBalance → AirBagsExceedBalance()", { readOnly: true }],
    ["T46", "airBags Security", "reclaimAirBags() from non-owner Wallet B → NotOwner()", { readOnly: true }],
    ["T47", "airBags Security", "redeemAirVoucher() airBags depleted → InsufficientAirBags()", { readOnly: true }],

    ["T48", "Invariants", "Re-initialize existing vault → AlreadyInitialized()", { readOnly: true }],
    ["T49", "Invariants", "emergencyWithdraw() before 1,296,000-block timelock → EmergencyDelayNotMet()", { readOnly: true }],
    ["T50", "Invariants", "Any onlyOwner function from Wallet B → NotOwner()", { readOnly: true }],

    ["T51", "qToken Isolation", "qToken non-transferable: transfer() reverts", { readOnly: true }],
    ["T52", "qToken Isolation", "qToken non-transferable: transferFrom() reverts", { readOnly: true }],
    ["T53", "qToken Isolation", "qToken non-transferable: approve() reverts", { readOnly: true }],
    ["T54", "qToken Isolation", "qToken balance zero for never-qrypted token", { readOnly: true }],
    ["T55", "qToken Isolation", "Vault A qToken address != Vault B qToken address (per-vault)", { readOnly: true }],
    ["T56", "qToken Isolation", "Vault A qrypt does not affect Vault B qToken balance", { readOnly: true }],
    ["T57", "qToken Isolation", "unqrypt Vault A does not affect Vault B", { readOnly: true }],
    ["T58", "qToken Isolation", "Full unqrypt leaves qToken balance = 0", {}],

    ["T59", "Vault Registry", "getVaultAddress(Wallet A) returns Vault A clone", { readOnly: true }],
    ["T60", "Vault Registry", "hasVault(Wallet A) true after createVault", { readOnly: true }],
    ["T61", "Vault Registry", "hasVault(unknownWallet) false", { readOnly: true }],
    ["T62", "Vault Registry", "vaultCreatedAt block stored correctly", { readOnly: true }],
    ["T63", "Vault Registry", "getAllVaultAddresses() returns Vault A + Vault B", { readOnly: true }],

    ["T64", "Multi-token", "USDC + DAI qrypted independently into Vault A", { readOnly: true }],
    ["T65", "Multi-token", "unqrypt USDC does not affect DAI shieldedBalance", { readOnly: true }],
    ["T66", "Multi-token", "activityCount increments on each state-changing call", { readOnly: true }],
    ["T67", "Multi-token", "MINIMUM_SHIELD_AMOUNT constant == 1,000,000 (1 USDC)", { readOnly: true }],
];

const FUNCTION_ROWS: [string, string, string][] = [
    ["cloneAndInit(owner, proofHash)", "cloneAndInit(owner)", "proofHash removed from factory; OTP chain set via commitChain after vault creation"],
    ["initialize(owner, proofHash)", "initialize(owner)", "proofHash removed; vault initializes without chain, must call commitChain separately"],
    ["qrypt(token, amount, proof)", "qrypt(token, amount, otpProof)", "Static bytes32 proof replaced by OTP ratchet link; chainHead advances on every call"],
    ["unqrypt(token, amount, proof)", "unqrypt(token, amount, otpProof)", "Same ratchet change as qrypt"],
    ["veilTransfer(token, amount, proof)", "veilTransfer(token, amount, otpProof)", "qrypt alias; ratchet change"],
    ["unveilTransfer(token, amount, proof)", "unveilTransfer(token, amount, otpProof)", "unqrypt alias; ratchet change"],
    ["changeVaultProof(newProof)", "rechargeChain(newHead, length)", "Upgrade: single hash rotation replaced by full OTP chain install from new seed. Forward secrecy: all old links dead immediately"],
    ["commitTransfer(commitHash)", "commitTransfer(commitHash)", "Unchanged"],
    ["revealTransfer(token, to, amount, proof, nonce)", "revealTransfer(token, to, amount, otpProof, nonce)", "OTP required at reveal phase; static proof rejected"],
    ["claimAirVoucher(voucher, sig)", "redeemAirVoucher(voucher, sig)", "Renamed; draws from airBags only, never from shieldedBalance"],
    ["createAirVoucher(...)", "createAirVoucher(...)", "Unchanged (off-chain helper / view)"],
    ["unshieldToRailgun(token, amount, proof, addr)", "unshieldToRailgun(token, amount, otpProof, addr)", "OTP required; chainHead advances after bridge call"],
    ["emergencyWithdraw(token)", "emergencyWithdraw(token)", "Unchanged"],
    ["version()", "version()", "Returns 6 (was 5)"],
    ["getVaultAddress(owner)", "getVaultAddress(owner)", "Unchanged"],
    ["hasVault(owner)", "hasVault(owner)", "Unchanged"],
    ["getAllVaultAddresses()", "getAllVaultAddresses()", "Unchanged"],
    ["vaultCreatedAt(addr)", "vaultCreatedAt(addr)", "Unchanged"],
    ["implementation()", "implementation()", "Unchanged"],
    ["(new)", "commitChain(chainHead, chainLength)", "Initialize OTP hash chain; notInitialized guard prevents double-init"],
    ["(new)", "fundAirBags(token, amount, otpProof)", "Move shieldedBalance -> airBags; OTP required, head advances"],
    ["(new)", "reclaimAirBags(token)", "Return airBags -> shieldedBalance; no OTP required"],
];

const ERROR_ROWS: [string, string][] = [
    ["OtpAlreadyConsumed()", "OTP link was already used in a prior call; ratchet replay blocked"],
    ["InvalidOtpProof()", "keccak256(submitted) != chainHead; wrong, stale, or future OTP"],
    ["ChainNotInitialized()", "Vault has no OTP chain; commitChain must be called first"],
    ["ChainAlreadyInitialized()", "commitChain called on a vault that already has a chain"],
    ["InvalidChainHead()", "bytes32(0) submitted as chainHead; zero-value guard"],
    ["InvalidChainLength()", "chainLength of 0 submitted; length must be at least 1"],
    ["InsufficientAirBags()", "redeemAirVoucher amount exceeds current airBags balance"],
    ["AirBagsExceedBalance()", "fundAirBags amount exceeds current shieldedBalance"],
];

export default function QryptSafeV6History() {
    const { lang, t } = useLanguage();
    const c = v6historyContent[lang];

    return (
        <div className="docs-content">
            <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
                    {t.nav.sections.smartContracts}
                </span>
            </div>

            <h1>{c.title}</h1>
            <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
                {c.intro}
            </p>

            <h2>{c.h2WhatChanged}</h2>
            <ul>
                {c.whatChangedItems.map((item, i) => (
                    <li key={i}><span dangerouslySetInnerHTML={{ __html: item.replace(/`([^`]+)`/g, '<code>$1</code>') }} /></li>
                ))}
            </ul>

            <h2>{c.h2OtpChain}</h2>
            <p>{c.pOtpChain}</p>
            <pre><code>{`Deploy:  seed  ->  keccak x100  ->  H100  (chainHead stored on-chain, chainLength=100)

TX 1:    caller sends H99  ->  keccak256(H99) == H100  OK  chainHead=H99  length=99
TX 2:    caller sends H98  ->  keccak256(H98) == H99   OK  chainHead=H98  length=98
TX 3:    caller sends H97  ->  keccak256(H97) == H98   OK  chainHead=H97  length=97

Replay:  caller sends H99  ->  keccak256(H99) == H97   FAIL  OtpAlreadyConsumed()
Skip:    caller sends H95  ->  keccak256(H95) == H97   FAIL  InvalidOtpProof()
Future:  caller sends H50  ->  keccak256(H50) == H97   FAIL  InvalidOtpProof()

Attacker sees H97 in calldata  ->  cannot compute H96  (keccak256 is one-way)

rechargeChain("new-seed"):
  new chainHead = keccak256^100("new-seed")
  all old H99..H0 links are permanently dead
  forward secrecy: observing old calldata gives zero advantage`}</code></pre>
            <div className="callout callout-info">{c.calloutOtpChain}</div>

            <h2>{c.h2AirBags}</h2>
            <p>{c.pAirBags}</p>
            <pre><code>{`// V5: redeemAirVoucher could pull from shieldedBalance
await vault.claimAirVoucher(voucher, sig);  // draws from shieldedBalance if needed

// V6: two isolated buckets
await vault.fundAirBags(USDC, parseUnits("1", 6), otpH99);
// shieldedBalance -= 1 USDC, airBags[USDC] += 1 USDC, chainHead advances

await vault.redeemAirVoucher(voucher, sig);
// draws from airBags[USDC] only; reverts InsufficientAirBags() if depleted

await vault.reclaimAirBags(USDC);
// airBags[USDC] -> shieldedBalance, no OTP needed`}</code></pre>

            <h2>{c.h2Functions}</h2>
            <table>
                <thead>
                    <tr>
                        <th>{c.functionHeaders[0]}</th>
                        <th>{c.functionHeaders[1]}</th>
                        <th>{c.functionHeaders[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    {FUNCTION_ROWS.map(([v5, v6, note]) => (
                        <tr key={v6}>
                            <td><code>{v5}</code></td>
                            <td><code>{v6}</code></td>
                            <td>{note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{c.h2Errors}</h2>
            <p>{c.pErrors}</p>
            <table>
                <thead>
                    <tr>
                        <th>{c.errorHeaders[0]}</th>
                        <th>{c.errorHeaders[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {ERROR_ROWS.map(([name, cond]) => (
                        <tr key={name}>
                            <td><code>{name}</code></td>
                            <td>{cond}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{c.h2Contracts}</h2>
            <table>
                <thead>
                    <tr>
                        <th>{c.contractHeaders[0]}</th>
                        <th>{c.contractHeaders[1]}</th>
                        <th>{c.contractHeaders[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>QryptSafeV6 (factory)</td>
                        <td><AddrCell value={FACTORY_V6} /></td>
                        <td>{FACTORY_V6 ? <a href={`${ETHERSCAN}/address/${FACTORY_V6}#code`} target="_blank" rel="noopener noreferrer">View ↗</a> : <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span>}</td>
                    </tr>
                    <tr>
                        <td>PersonalQryptSafeV6 (impl)</td>
                        <td><AddrCell value={IMPL_V6} /></td>
                        <td>{IMPL_V6 ? <a href={`${ETHERSCAN}/address/${IMPL_V6}#code`} target="_blank" rel="noopener noreferrer">View ↗</a> : <span style={{ color: "hsl(var(--muted-fg))", fontStyle: "italic" }}>pending</span>}</td>
                    </tr>
                </tbody>
            </table>

            <h2>{c.h2E2E}</h2>
            <p>{c.pE2E}</p>
            <table>
                <thead>
                    <tr>
                        <th>{c.e2eHeaders[0]}</th>
                        <th>{c.e2eHeaders[1]}</th>
                        <th>{c.e2eHeaders[2]}</th>
                        <th>{c.e2eHeaders[3]}</th>
                    </tr>
                </thead>
                <tbody>
                    {E2E_ROWS.map(([id, group, action, tx]) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{group}</td>
                            <td>{action}</td>
                            <td>
                                {tx.hash
                                    ? <TxLink hash={tx.hash} />
                                    : tx.readOnly
                                        ? <span style={{ color: "hsl(var(--muted-fg))", fontSize: "0.8125rem" }}>{c.txReadOnly}</span>
                                        : null
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{c.h2TestSuite}</h2>
            <p>{c.pTestSuite}</p>
            <ul>
                {c.testGroups.map((g, i) => (
                    <li key={i}><strong>{g.split(':')[0]}:</strong>{g.slice(g.indexOf(':') + 1)}</li>
                ))}
            </ul>

            <h2>{c.h2Lineage}</h2>
            <table>
                <thead>
                    <tr>
                        <th>{c.lineageHeaders[0]}</th>
                        <th>{c.lineageHeaders[1]}</th>
                        <th>{c.lineageHeaders[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    {c.lineageRows.map(([ver, change, status]) => (
                        <tr key={ver}>
                            <td>{ver}</td>
                            <td>{change}</td>
                            <td>{status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
