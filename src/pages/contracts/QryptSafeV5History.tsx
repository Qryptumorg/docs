import { useLanguage } from "@/lib/LanguageContext";
import { v5historyContent } from "@/lib/content/v5history";

const FACTORY_V5: string = "0xB757fb0511A6d305370a20a0647C751D7E76D2ce";
const IMPL_V5: string    = "0x06e29f9309Afa42A3f5E5640717bd8db952F12ba";
const VAULT_A_V5         = "0x340C7041cefdf5786644aE7624486620B0E07B70";
const VAULT_B_V5         = "0xA592B995ac851CBC69E91F29696391a530e3D37d";
const QUSDC_V5           = "0xeA614DD453DC33D4D6Ce1F67Df95f380AbDF215C";
const ETHERSCAN          = "https://sepolia.etherscan.io";

function AddrCell({ value }: { value: string }) {
    return <code>{value}</code>;
}

function TxLink({ hash }: { hash: string }) {
    return (
        <a href={`${ETHERSCAN}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
            {hash.slice(0, 14)}...{hash.slice(-8)} ↗
        </a>
    );
}

const TX_APPROVE      = "0xc94144145c5f740cc3cfe5feb7860edd7083c65d0dd042311b300aa25d0ba9e9";
const TX_UNQRYPT      = "0xd0e81551f4d425da9120d590d76214a4c0b92b78aaf321df00eb5fcecb3369e3";
const TX_CLAIM_AIR    = "0x580fca67cc77b7d3ab466d691a08eed8d521f375adf17afbb0a2f9b5666802f6";
const TX_RAILGUN      = "0x4dcde96fe2d019ebd29ca26a130869b23b6ee5a5d84e09e04a0505ab241de4ce";
const TX_T36          = "0xc11cf3b991a002a692862e89eb2d5f7fb7f327934041cb7f4de9bca9fc8dce28";
const TX_T39          = "0x1d7b223fb8c388cd05964be8ae62b45200978c377e3efe3b55be7147f02e7823";
const TX_T44          = "0xec4d6e03cdc6573504124ad3401432451afc13bd9df24301a59327c12ceeb305";
const TX_T47          = "0x3853f48481a77251b2b77cf00452615a5ea8dff2b2262c6829d35d4800756963";
const TX_T48          = "0xfcbb26af72edf825bc50839ea79dafaac44892b2c3a020f1c05dcc9959422dbd";
const TX_T51          = "0x4b5ed57206b5148041021b5300d327fe71c1e89eba203d0d60073b468e997f7a";

type TxCol = { hash?: string; readOnly?: boolean };

const E2E_ROWS: [string, string, string, TxCol][] = [
    ["T01", "Infrastructure", "Deploy QryptSafeV5 factory + impl (EIP-1167)", {}],
    ["T02", "Infrastructure", "Verify EIP-1167 bytecode prefix on factory", { readOnly: true }],
    ["T03", "Infrastructure", "Confirm impl address stored on factory", { readOnly: true }],
    ["T04", "Setup", "createVault: Wallet A → Vault A clone", {}],
    ["T05", "Setup", "createVault: Wallet B → Vault B clone", {}],
    ["T06", "QryptSafe", "approve + qrypt 2.0 USDC (Wallet A)", { hash: TX_APPROVE }],
    ["T07", "QryptSafe", "qToken minted, balanceOf Vault A = 2.0", { readOnly: true }],
    ["T08", "QryptSafe", "unqrypt 1.0 USDC (partial, V4 feature preserved)", { hash: TX_UNQRYPT }],
    ["T09", "QryptSafe", "qToken balance = 1.0 after partial unqrypt", { readOnly: true }],
    ["T10", "QryptSafe", "qrypt reject: wrong proof → InvalidProof()", { readOnly: true }],
    ["T11", "QryptSafe", "qrypt reject: below minimum → InvalidAmount()", { readOnly: true }],
    ["T12", "QryptSafe", "qrypt reject: non-owner → NotOwner()", { readOnly: true }],
    ["T13", "QryptSafe", "unqrypt reject: exceeds balance → InsufficientBalance()", { readOnly: true }],
    ["T14", "QryptSafe", "changeVaultProof: rotate PROOF1 → PROOF2", {}],
    ["T15", "QryptSafe", "old PROOF1 rejected after rotation", { readOnly: true }],
    ["T16", "QryptSafe", "activityCount increments on each state change", { readOnly: true }],
    ["T17", "QryptSafe", "qrypt 1.0 USDC with PROOF2 (replenish for later tests)", {}],
    ["T18", "QryptAir", "createAirVoucher signed off-chain (EIP-712)", { readOnly: true }],
    ["T19", "QryptAir", "claimAirVoucher: Wallet B receives 1.0 USDC", { hash: TX_CLAIM_AIR }],
    ["T20", "QryptAir", "replay claimAirVoucher → VoucherAlreadyUsed()", { readOnly: true }],
    ["T21", "QryptAir", "expired voucher → VoucherExpired()", { readOnly: true }],
    ["T22", "QryptAir", "invalid signature → InvalidVoucherSig()", { readOnly: true }],
    ["T23", "QryptAir", "voucher nonce isolation: two vouchers, one consumed", { readOnly: true }],
    ["T24", "QryptShield", "unshieldToRailgun: burn qToken + deposit to Railgun pool", { hash: TX_RAILGUN }],
    ["T25", "QryptShield", "Railgun deposit event emitted with correct amount", { readOnly: true }],
    ["T26", "QryptShield", "qToken fully burned after Railgun route", { readOnly: true }],
    ["T27", "QryptShield", "unshieldToRailgun reject: zero railgunAddr → ZeroAddress()", { readOnly: true }],
    ["T28", "QryptShield", "unshieldToRailgun reject: wrong proof → InvalidProof()", { readOnly: true }],
    ["T29", "Security", "createVault duplicate → VaultAlreadyExists()", { readOnly: true }],
    ["T30", "Security", "initialize() on existing vault → AlreadyInitialized()", { readOnly: true }],
    ["T31", "Security", "changeVaultProof zero hash → InvalidNewProof()", { readOnly: true }],
    ["T32", "Security", "emergencyWithdraw before delay → EmergencyDelayNotMet()", { readOnly: true }],
    ["T33", "Vault Registry", "getVault(owner) returns correct clone address", { readOnly: true }],
    ["T34", "Vault Registry", "hasVault(owner) false for new address", { readOnly: true }],
    ["T35", "Vault Registry", "hasVault(owner) true after createVault", { readOnly: true }],
    ["T36", "Vault Registry", "vaultCreatedAt block stored correctly", { hash: TX_T36 }],
    ["T37", "Vault Registry", "lastActivityBlock updates on qrypt", { readOnly: true }],
    ["T38", "Vault Registry", "lastActivityBlock updates on unqrypt", { readOnly: true }],
    ["T39", "Vault Registry", "lastActivityBlock updates on claimAirVoucher", { hash: TX_T39 }],
    ["T40", "Vault Registry", "activityCount monotonic across mixed calls", { readOnly: true }],
    ["T41", "Vault Registry", "multi-token: USDC + DAI shielded independently", { readOnly: true }],
    ["T42", "Vault Registry", "multi-token: unqrypt one does not touch other", { readOnly: true }],
    ["T43", "Vault Registry", "MINIMUM_SHIELD_AMOUNT constant = 1,000,000", { readOnly: true }],
    ["T44", "Vault Registry", "getAllVaultAddresses() returns both Vault A + B", { hash: TX_T44 }],
    ["T45", "qToken Isolation", "qToken non-transferable: transfer() reverts", { readOnly: true }],
    ["T46", "qToken Isolation", "qToken non-transferable: transferFrom() reverts", { readOnly: true }],
    ["T47", "qToken Isolation", "qToken balance zero for never-shielded token", { hash: TX_T47 }],
    ["T48", "qToken Isolation", "Vault A qToken address ≠ Vault B qToken address (per-vault)", { hash: TX_T48 }],
    ["T49", "qToken Isolation", "Vault A shield does not affect Vault B balance", { readOnly: true }],
    ["T50", "qToken Isolation", "unqrypt Vault A does not affect Vault B", { readOnly: true }],
    ["T51", "qToken Isolation", "full unqrypt leaves qToken balance = 0", { hash: TX_T51 }],
];

export default function QryptSafeV5History() {
    const { lang, t } = useLanguage();
    const c = v5historyContent[lang];

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

            <h2>{c.h2QryptAir}</h2>
            <p>{c.pQryptAir}</p>
            <pre><code>{`// Voucher struct (EIP-712)
struct AirVoucher {
    address token;
    uint256 amount;
    address recipient;
    uint256 nonce;
    uint256 expiry;
}

// Owner creates and signs off-chain:
const domain = { name: "QryptSafeV5", version: "1", chainId: 11155111,
                 verifyingContract: vaultAddress };
const sig = await signer._signTypedData(domain, types, voucher);

// Recipient claims on-chain:
await vault.claimAirVoucher(voucher, sig);`}</code></pre>
            <div className="callout callout-info">{c.calloutQryptAir}</div>

            <h2>{c.h2QryptShield}</h2>
            <p>{c.pQryptShield}</p>
            <pre><code>{`// V4: two-step manual process
await vault.unshield(token, amount, proof);
await railgun.deposit(token, amount, railgunNote);

// V5: single atomic call
await vault.unshieldToRailgun(token, amount, proof, railgunAddress);
// Internally:
//   1. burn qToken balance (amount)
//   2. IERC20(token).approve(railgunAddr, amount)
//   3. IRailgun(railgunAddr).deposit(token, amount)`}</code></pre>

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
                    {[
                        ["shield(token, amount, proof)", "qrypt(token, amount, proof)", "Rename only"],
                        ["unshield(token, amount, proof)", "unqrypt(token, amount, proof)", "Rename only"],
                        ["(new)", "claimAirVoucher(voucher, sig)", "QryptAir EIP-712 claim"],
                        ["(new)", "unshieldToRailgun(token, amount, proof, addr)", "Railgun ZK integration"],
                        ["(new)", "createAirVoucher(...)", "Off-chain helper (view/pure)"],
                    ].map(([v4, v5, note]) => (
                        <tr key={v5}>
                            <td><code>{v4}</code></td>
                            <td><code>{v5}</code></td>
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
                    {[
                        ["VoucherExpired()", "claimAirVoucher() called after voucher.expiry timestamp"],
                        ["VoucherAlreadyUsed()", "claimAirVoucher() nonce already consumed on a prior claim"],
                        ["InvalidVoucherSig()", "EIP-712 signature does not match the vault owner address"],
                    ].map(([name, cond]) => (
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
                        <td>QryptSafeV5 (factory)</td>
                        <td><AddrCell value={FACTORY_V5} /></td>
                        <td><a href={`${ETHERSCAN}/address/${FACTORY_V5}#code`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
                    </tr>
                    <tr>
                        <td>qUSDC (qToken)</td>
                        <td><AddrCell value={QUSDC_V5} /></td>
                        <td><a href={`${ETHERSCAN}/address/${QUSDC_V5}`} target="_blank" rel="noopener noreferrer">View ↗</a></td>
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
