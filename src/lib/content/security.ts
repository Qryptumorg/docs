export type SecurityContent = {
  model: {
    title: string;
    intro: string;
    h2TwoFactor: string;
    pTwoFactor: string;
    factorItems: string[];
    pTwoFactorConclusion: string;
    h2NonTransferable: string;
    pNonTransferable: string;
    pPure: string;
    h2Replay: string;
    replayItems: string[];
    h2Attacks: string;
    attackHeaders: [string, string, string];
    attacks: [string, string, string][];
  };
  nonCustodial: {
    title: string;
    intro: string;
    h2Custody: string;
    custodyHeaders: [string, string, string];
    custodyRows: [string, string, string][];
    h2NoAdmin: string;
    pNoAdmin1: string;
    pNoAdmin2: string;
    h2NoUpgrade: string;
    pNoUpgrade: string;
    h2Emergency: string;
    pEmergency: string;
    calloutEmergency: string;
    h2Server: string;
    pServer: string;
    serverItems: string[];
    pServerConclusion: string;
  };
  tokenProtection: {
    title: string;
    intro: string;
    h2Contract: string;
    pContract: string;
    h2CannotHappen: string;
    cannotHeaders: [string, string];
    cannotRows: [string, string][];
    h2Naming: string;
    pNaming: string;
    namingHeaders: [string, string, string];
    h2OneContract: string;
    pOneContract: string;
  };
  postQuantum: {
    title: string;
    intro: string;
    h2WhyMatters: string;
    pEcdsa: string;
    pHash: string;
    algoHeaders: [string, string, string, string];
    algoRows: [string, string, string, string][];
    h2HowProtects: string;
    pHowProtects: string;
    pPreimage: string;
    calloutNist: string;
    h2BruteForce: string;
    pBruteForce: string;
    h3Barrier1: string;
    pBarrier1: string;
    h3Barrier2: string;
    pBarrier2: string;
    bruteForceHeaders: [string, string];
    bruteForceRows: [string, string][];
    pBruteForceConclusion: string;
    calloutComparison: string;
    h3Barrier3: string;
    pBarrier3: string;
    h2PostQuantumFuture: string;
    pPostQuantumFuture: string;
    futureHeaders: [string, string, string];
    futureRows: [string, string, string][];
    pFutureConclusion: string;
    h2HonestScope: string;
    pHonestScope: string;
    honestItems: string[];
    pHonestConclusion: string;
  };
  contractVerification: {
    title: string;
    intro: string;
    h2Sepolia: string;
    h3V5Active: string;
    pV5: string;
    h3V4Decommissioned: string;
    pV4: string;
    h3V3Active: string;
    pV3: string;
    h3V2Superseded: string;
    pV2: string;
    h3V1Superseded: string;
    pV1: string;
    contractTableHeaders: [string, string, string];
    viewSource: string;
    h2Mainnet: string;
    calloutMainnet: string;
    h2WhatProves: string;
    pWhatProves: string;
    proveItems: string[];
    h2HowToVerify: string;
    pHowToVerify: string;
    h2TestCoverage: string;
    coverageHeaders: [string, string, string];
    coverageRows: [string, string, string][];
    coverageTotal: [string, string, string];
    h3V6Active: string;
    pV6: string;
    h2E2EV6: string;
    e2eV6Rows: [string, string][];
    h2E2E: string;
    e2eHeaders: [string, string];
    e2eRows: [string, string][];
    h2E2EV5: string;
    e2eV5Rows: [string, string][];
  };
};

export const securityContent: Record<"en" | "ru" | "zh", SecurityContent> = {
  en: {
    model: {
      title: "Security Model",
      intro:
        "Qryptum's security is enforced entirely at the smart contract layer. There is no trusted backend, no relayer, no admin key. Every rule is expressed in immutable Solidity code and verified on the Ethereum Virtual Machine.",
      h2TwoFactor: "Two-Factor Protection",
      pTwoFactor:
        "Every vault operation requires two independent factors present at the same time:",
      factorItems: [
        'Private key: The transaction must be signed by the wallet that owns the Qrypt-Safe. This is enforced by the onlyOwner modifier: require(msg.sender == owner, "Not vault owner").',
        "Vault proof: The correct 6-character vault proof must be passed in calldata. The contract hashes it and compares against the stored hash: keccak256(abi.encodePacked(proof)) == passwordHash.",
      ],
      pTwoFactorConclusion:
        "An attacker who has only the private key cannot move tokens because qToken transfers always revert. An attacker who has only the vault proof cannot call vault functions because onlyOwner blocks any address that is not the owner wallet.",
      h2NonTransferable: "qToken Non-Transferability",
      pNonTransferable:
        "The ShieldToken contract overrides all three ERC-20 transfer-related functions with unconditional reverts:",
      pPure:
        "These are pure functions: they contain no state reads and no conditions. They always revert. No gas amount, no contract call, no wallet feature can bypass them.",
      h2Replay: "Replay Attack Prevention",
      pTwoFactor2:
        "The commit-reveal transfer scheme protects against replay attacks through two mechanisms:",
      replayItems: [
        'Each commit hash is stored in a mapping and marked as used after revealTransfer executes. A second attempt with the same hash reverts with "Commit already used".',
        "Each commit hash includes a unique random nonce chosen by the browser, so even the same transfer parameters produce a different hash each time.",
        'A commit expires 600 seconds (10 minutes) after submission. A reveal attempted after this window reverts with "Commit expired".',
      ],
      h2Attacks: "Attack Scenarios",
      attackHeaders: ["Attack", "Outcome", "Why It Fails"],
      attacks: [
        ["Send qToken via MetaMask", "Revert", "transfer() always reverts"],
        ["Approve a DEX to spend qToken", "Revert", "approve() always reverts"],
        [
          "Call vault with wrong vault proof",
          "Revert",
          '"Invalid vault proof"',
        ],
        ["Call vault from different wallet", "Revert", '"Not vault owner"'],
        ["Replay a used commit hash", "Revert", '"Commit already used"'],
        ["Use an expired commit", "Revert", '"Commit expired"'],
        ["Reentrancy attack", "Revert", "ReentrancyGuard from OpenZeppelin"],
        ["Initialize vault twice", "Revert", '"Already initialized"'],
        [
          "Shield below minimum amount",
          "Revert",
          '"Amount below minimum" (1,000,000 units)',
        ],
        ["Transfer to self", "Revert", '"Cannot transfer to yourself"'],
      ],
    },
    nonCustodial: {
      title: "Non-Custodial Architecture",
      intro:
        "Qryptum is fully non-custodial. Tokens are controlled by an immutable smart contract with no admin key, no upgrade mechanism, and no back door.",
      h2Custody: "Token Custody: Who Holds What",
      custodyHeaders: ["Asset", "Location", "Who Controls It"],
      custodyRows: [
        [
          "Real ERC-20 (USDC, ETH, etc.)",
          "PersonalVault contract address (0xVaultA)",
          "Only the vault owner via vault functions",
        ],
        [
          "qToken balance",
          "User's wallet address (ERC-20 balance mapping)",
          "Immovable: always reverts on transfer",
        ],
        [
          "Vault proof hash",
          "PersonalVault storage (private)",
          "Only changed via changeVaultProof() with old proof",
        ],
      ],
      h2NoAdmin: "No Admin Access",
      pNoAdmin1:
        "The ShieldFactory deployer (Qryptum) has exactly one privileged capability: pausing and unpausing the factory. Pausing blocks new Qrypt-Safe creation. It does not affect any existing Qrypt-Safe.",
      pNoAdmin2:
        "The deployer has zero access to any user's vault. There is no adminWithdraw(), no setOwner(), no upgradeable proxy. The code that handles user funds is immutable from the moment of deployment.",
      h2NoUpgrade: "No Upgrade Mechanism",
      pNoUpgrade:
        "PersonalVault uses EIP-1167 minimal proxy cloning for gas efficiency. The implementation contract is deployed once and all vaults delegate to it. However, there is no upgradeTo() function and no proxy admin. The implementation is fixed after deployment. Existing vaults cannot be modified.",
      h2Emergency: "Emergency Withdrawal",
      pEmergency:
        "If a user loses their vault proof and the vault is inactive for 1,296,000 blocks (approximately 6 months at 12 seconds per block), the user can call emergencyWithdraw() with only their private key. This returns all tokens to the owner's wallet.",
      calloutEmergency:
        "Note: Any vault activity resets the 6-month inactivity counter. Shield, unshield, or transfer operations all count as activity.",
      h2Server: "Where the Server Fits In",
      pServer:
        "The Qryptum backend API stores only two things: the wallet-to-vault address mapping and the transaction history (tx hashes and token symbols). It never:",
      serverItems: [
        "Receives or stores vault proofs in any form",
        "Relays or co-signs transactions",
        "Holds private keys",
        "Controls smart contract functions",
      ],
      pServerConclusion:
        "All transactions are signed in the user's browser and broadcast directly to the Ethereum network. The server is an indexing and convenience layer only.",
    },
    tokenProtection: {
      title: "Token Protection",
      intro:
        "qTokens are ERC-20 contracts with all transfer-related functions permanently disabled at the bytecode level. This makes them impossible to move through any external mechanism.",
      h2Contract: "The ShieldToken Contract",
      pContract:
        "Each qToken is an instance of ShieldToken, a minimal ERC-20 that overrides the three functions every wallet and exchange relies on:",
      h2CannotHappen: "What Cannot Happen",
      cannotHeaders: ["Action", "Result"],
      cannotRows: [
        [
          "Send qUSDC from MetaMask",
          "Transaction reverts. MetaMask shows a failure.",
        ],
        [
          "Send qUSDC from TrustWallet, Phantom, Rabby, Coinbase Wallet",
          "Transaction reverts. All wallets call the same ERC-20 functions.",
        ],
        [
          "Approve a DEX (Uniswap, 1inch) to spend qTokens",
          "Revert. approve() is disabled.",
        ],
        [
          "Deposit qTokens to a CEX",
          "Revert. The CEX would call transferFrom(), which reverts.",
        ],
        [
          "Use qTokens as collateral in a lending protocol",
          "Any approval or transfer step reverts.",
        ],
        [
          "Drain via malicious contract approval",
          "Revert. No approval can be set on qTokens.",
        ],
      ],
      h2Naming: "qToken Naming",
      pNaming:
        "Each qToken takes the name and symbol of the underlying asset and prepends q. Examples:",
      namingHeaders: ["Underlying Token", "qToken Name", "qToken Symbol"],
      h2OneContract: "One qToken Contract Per Token Per Vault",
      pOneContract:
        "The first time a user shields a given token (for example USDC), the vault deploys a new ShieldToken contract for that token. Subsequent shields of the same token mint to the same qToken contract. Different users have different qToken contract addresses for the same underlying asset.",
    },
    postQuantum: {
      title: "Post-Quantum Design",
      intro:
        "Qryptum's vault proof layer is built on keccak256, a hash function from the SHA-3 family that retains 128-bit security under quantum attacks. The protocol's dual-factor model was designed with the post-quantum era in mind: even if the base layer of Ethereum changes, the vault proof hash remains computationally irreversible.",
      h2WhyMatters: "Why Quantum Computing Matters for Crypto",
      pEcdsa:
        "Quantum computers threaten asymmetric cryptography: RSA, Diffie-Hellman, and ECDSA (the signature scheme Ethereum uses today) all rely on mathematical problems that a sufficiently powerful quantum computer could solve exponentially faster than classical machines using Shor's algorithm.",
      pHash:
        "Hash functions face a different, weaker threat. Grover's algorithm gives a quantum computer a quadratic speedup against hash brute-force, but it does not break hash functions. A 256-bit hash remains secure at 128 bits against quantum adversaries, which meets NIST's minimum post-quantum security threshold.",
      algoHeaders: [
        "Algorithm Type",
        "Used In",
        "Classical Security",
        "Quantum Security (Grover/Shor)",
      ],
      algoRows: [
        [
          "ECDSA (secp256k1)",
          "Ethereum wallet signatures",
          "~128 bit",
          "Broken by Shor's algorithm",
        ],
        [
          "keccak256 (SHA-3)",
          "Vault proof hash storage",
          "256 bit",
          "128 bit (Grover: quadratic only)",
        ],
        [
          "keccak256 (SHA-3)",
          "Commit hash in transfers",
          "256 bit",
          "128 bit (Grover: quadratic only)",
        ],
      ],
      h2HowProtects: "How keccak256 Protects the Vault Proof",
      pHowProtects:
        "When a Qrypt-Safe is created, the vault proof is never stored in plaintext. The contract stores only its keccak256 hash:",
      pPreimage:
        "To recover the raw vault proof from the stored hash, an attacker must invert keccak256. This is a preimage attack. For a 256-bit hash, the classical complexity is 2^256 operations. Under Grover's algorithm, that is reduced to 2^128 operations, which remains beyond the capacity of any foreseeable quantum computer. By comparison, 128-bit quantum security is the threshold adopted by NIST's post-quantum cryptography standards.",
      calloutNist:
        "keccak256 and NIST: SHA-3 (the standard that keccak256 is based on) was selected by NIST after a 7-year public competition specifically designed to identify algorithms resistant to both classical and quantum attacks. It is one of the most thoroughly analyzed hash functions in existence.",
      h2BruteForce: "Vault Proof Bruteforce Resistance",
      pBruteForce:
        "Even without quantum computing, bruteforce attacks on the vault proof face two independent barriers: an access barrier and an economic barrier.",
      h3Barrier1: "Barrier 1: Private Key Required (Access)",
      pBarrier1:
        "Every vault function has an onlyOwner modifier. An attacker who does not hold the user's Ethereum private key receives exactly zero attempts at the vault proof. The msg.sender check is enforced by the EVM itself before any vault logic executes.",
      h3Barrier2: "Barrier 2: Economic Deterrence (Cost)",
      pBarrier2:
        "Every failed vault call is an on-chain transaction that consumes gas. Unlike a typical password attack against a database or API, there is no free attempt. Each guess costs real ETH.",
      bruteForceHeaders: ["Parameter", "Value"],
      bruteForceRows: [
        [
          "Vault proof keyspace (3 lowercase letters + 3 digits)",
          "26^3 x 10^3 = 17,576,000 combinations",
        ],
        ["Gas per failed vault call (reverted)", "~40,000 gas"],
        ["Cost per attempt (at 0.5 gwei, ETH = $3,000)", "~$0.06 per attempt"],
        [
          "Cost to exhaust full keyspace",
          "17,576,000 x $0.06 = ~$1.05 million",
        ],
        ["Cost at peak gas (2 gwei, ETH = $3,000)", "~$4.2 million"],
        [
          "Expected attempts before finding correct proof (random)",
          "~8,788,000 (half the keyspace)",
        ],
        ["Expected cost to find proof (at 0.5 gwei)", "~$528,000"],
      ],
      pBruteForceConclusion:
        "Exhaustive search of the vault proof keyspace costs over $1 million in gas fees at current Ethereum prices (0.5 gwei). At peak congestion (2 gwei), this rises to ~$4.2 million. This cost scales with ETH price and network demand, meaning the more valuable the assets inside a Qrypt-Safe, the more expensive on-chain attempts tend to become, preserving the economic deterrent.",
      calloutComparison:
        "Comparison: A typical web application bruteforce might cost milliseconds per attempt and faces only rate limiting. A Qryptum vault bruteforce faces two layers: a mandatory private key (the primary barrier) and ~$0.06 per failed on-chain transaction at current gas prices (the secondary barrier). Both must be defeated simultaneously.",
      h3Barrier3: "Barrier 3: No Batch Execution",
      pBarrier3:
        "Smart contract calls cannot be parallelized across blocks. Each attempt must be included in a block and confirmed before the next is valid. At 12-second average Ethereum block times, even a well-funded attacker is limited to a few thousand attempts per day before fees accumulate to prohibitive levels.",
      h2PostQuantumFuture: "Dual-Factor in a Post-Quantum Future",
      pPostQuantumFuture:
        "If quantum computers eventually break ECDSA (the algorithm Ethereum uses for wallet signatures), the consequences for standard ERC-20 token holders would be severe: an attacker could forge signatures and drain wallets. For Qryptum users holding qTokens, the impact is different:",
      futureHeaders: ["Scenario", "Standard ERC-20", "Qryptum qToken"],
      futureRows: [
        [
          "ECDSA broken by quantum computer",
          "Private key forged, all tokens drained",
          "qToken transfer still reverts (no ERC-20 transfer possible)",
        ],
        [
          "Attacker forges private key signature",
          "Full token access",
          "Vault proof hash (keccak256) still blocks vault access",
        ],
        [
          "Vault proof hash broken by quantum",
          "N/A",
          "128-bit quantum security; not feasible with foreseeable hardware",
        ],
      ],
      pFutureConclusion:
        "In a post-quantum world where ECDSA signatures are breakable, Qryptum's vault proof hash (keccak256) becomes the last line of defense. Unlike ECDSA, keccak256 does not rely on elliptic curve discrete logarithm problems. It is a one-way function that remains computationally hard even against quantum adversaries.",
      h2HonestScope: "Honest Scope of Protection",
      pHonestScope:
        "Qryptum does not claim to make Ethereum quantum-safe at the base layer. The following limitations apply:",
      honestItems: [
        "Ethereum wallet signatures (ECDSA): Not quantum-resistant. This is a base-layer Ethereum concern, not specific to Qryptum. The Ethereum community is actively researching post-quantum signature schemes for future protocol upgrades.",
        "Vault proof string in calldata: The raw vault proof appears in transaction calldata during shield(), unshield(), and revealTransfer(). If an attacker can read historical calldata and already knows the private key, they learn the vault proof. The vault proof can be rotated via changeVaultProof() after any suspected exposure.",
        "Hash-to-proof inversion: The stored hash cannot be used to derive the vault proof. However, the raw proof in calldata is observable on-chain.",
      ],
      pHonestConclusion:
        "The post-quantum resilience of Qryptum is specifically in the vault proof hash storage and the commit-reveal transfer hash. These use keccak256 and provide meaningful defense even in scenarios where ECDSA is compromised.",
    },
    contractVerification: {
      title: "Contract Verification",
      intro:
        "All Qryptum contracts are verified on Etherscan. Anyone can read the source code, inspect the ABI, and confirm that no privileged functions exist beyond what is documented here.",
      h2Sepolia: "Sepolia Testnet (Live)",
      h3V6Active: "v6: Active (OTP chain · air bags · 49/49 E2E · MIT verified)",
      pV6: "Security upgrade from v5. OTP chain replaces static bytes32 proofHash: each proof is single-use and advances the chain head, making replay attacks structurally impossible. Air bags isolation separates QryptAir funds from the shielded balance. rechargeChain() allows OTP top-up. 49/49 E2E tests pass on Sepolia. Factory and implementation MIT-verified on Etherscan.",
      h3V5Active: "v5: Superseded by v6 (bytes32 proofHash · 32/32 E2E · MIT verified)",
      pV5: "Canonical v5 deployment on Sepolia. bytes32 proofHash replaces string vaultProof. unshieldToRailgun() for QryptShield, redeemVoucher() EIP-712 for QryptAir. 32/32 E2E tests pass. All contracts MIT-verified on Etherscan. Superseded by v6 (OTP chain upgrade).",
      h3V4Decommissioned: "v4: Decommissioned (superseded by v5)",
      pV4: "Added QryptAir EIP-712 vouchers and QryptShield Railgun bridge. Used string vaultProof. Superseded by v5 (bytes32 proofHash upgrade).",
      h3V3Active: "v3: Superseded (no admin keys)",
      pV3: "Redeployed to remove Ownable and Pausable from the factory. QryptSafe v3 has zero admin keys: no one can pause vault creation or access user funds. Contracts renamed to QryptSafe (factory) and PersonalQryptSafe (vault implementation).",
      h3V2Superseded: "v2: Superseded (had admin keys)",
      pV2: "Redeployed to fix a qToken decimal precision bug. ShieldToken now reads decimals() from the underlying ERC-20 at deploy time. Superseded by v3 which removes all admin control.",
      h3V1Superseded: "v1: Superseded (decimal precision bug)",
      pV1: "Initial deployment. ShieldToken did not inherit decimals() from the underlying token. OpenZeppelin ERC20 defaults to 18, causing USDC-backed qTokens (6 decimals) to display as 0.0000000000095 instead of 9.5 in Etherscan. These contracts remain on-chain for historical reference.",
      contractTableHeaders: ["Contract", "Address", "Etherscan"],
      viewSource: "View source",
      h2Mainnet: "Ethereum Mainnet",
      calloutMainnet:
        "Mainnet deployment is in progress. Addresses will be published here after deployment and Etherscan verification.",
      h2WhatProves: "What Verification Proves",
      pWhatProves:
        "Etherscan verification links the deployed bytecode to the Solidity source code. Anyone can confirm:",
      proveItems: [
        "The contract source matches the compiler output deployed on-chain",
        "No hidden functions exist beyond what is documented",
        "The constructor arguments match the expected values",
        "The compiler version and optimization settings are disclosed",
      ],
      h2HowToVerify: "How to Verify Yourself",
      pHowToVerify: "Clone the contracts repository and compile locally:",
      h2TestCoverage: "Test Coverage",
      coverageHeaders: ["Test Suite", "Tests", "Coverage"],
      coverageRows: [
        [
          "QToken.test.js",
          "13",
          "Mint, burn, all non-transferability cases, decimal precision",
        ],
        [
          "ShieldFactory.test.js",
          "15",
          "Vault creation, duplicate vault prevention",
        ],
        [
          "PersonalVault.test.js",
          "45",
          "All operations, edge cases, security invariants",
        ],
        [
          "integration.test.js",
          "11",
          "Full end-to-end shield, transfer, and unshield lifecycle",
        ],
      ],
      coverageTotal: ["Total", "84", "All passing"],
      h2E2EV6: "E2E Test Results (Sepolia, v6: 49/49)",
      e2eV6Rows: [
        ["Factory v6 bytecode confirmed on Sepolia", "PASS"],
        ["Impl v6 bytecode confirmed on Sepolia", "PASS"],
        ["Create Vault C via factory v6 (EIP-1167 clone)", "PASS"],
        ["Duplicate vault creation reverts", "PASS"],
        ["Approve USDC for vault (T08)", "PASS"],
        ["shield() 1 USDC OTP chain H99 (T09)", "PASS"],
        ["shield() wrong OTP proof reverts", "PASS"],
        ["qUSDC minted to owner wallet", "PASS"],
        ["commitTransfer() H98 OTP proof (T14)", "PASS"],
        ["revealTransfer() Wallet B receives USDC", "PASS"],
        ["Replay OTP proof reverts (Proof already used)", "PASS"],
        ["Expired commit reverts (timelock)", "PASS"],
        ["rechargeChain() top-up OTP (T19)", "PASS"],
        ["unshield() 1 USDC (T20)", "PASS"],
        ["unshield() wrong OTP proof reverts", "PASS"],
        ["fundAirBudget() QryptAir air bags (T23)", "PASS"],
        ["redeemAirVoucher() EIP-712 valid sig (T25)", "PASS"],
        ["redeemAirVoucher() expired deadline reverts", "PASS"],
        ["redeemAirVoucher() wrong transfer code reverts", "PASS"],
        ["redeemAirVoucher() replay reverts (nonce used)", "PASS"],
        ["Air bags balance isolated from shielded balance", "PASS"],
        ["reclaimAirBudget() returns to shielded balance", "PASS"],
        ["unshieldToRailgun() QryptShield (T33)", "PASS"],
        ["unshieldToRailgun() wrong OTP proof reverts", "PASS"],
        ["Cross-wallet vault access reverts (onlyOwner)", "PASS"],
        ["qToken non-transferable (direct transfer reverts)", "PASS"],
        ["Vault C storage isolated from other vaults", "PASS"],
        ["qUSDC v6 6 decimals confirmed", "PASS"],
        ["OTP chain head advances after each use", "PASS"],
        ["OTP chain recharge verified on-chain", "PASS"],
        ["Factory v6 MIT verified on Etherscan", "PASS"],
        ["Impl v6 MIT verified on Etherscan", "PASS"],
        ["qToken USDC v6 verified on Etherscan", "PASS"],
        ["EIP-1167 minimal proxy clone verified", "PASS"],
        ["Vault C address matches factory registry", "PASS"],
        ["changeOTPChain() rotates chain head", "PASS"],
        ["Old OTP proof rejected after chain rotation", "PASS"],
        ["emergencyWithdraw() available after inactivity", "PASS"],
        ["Shield below minimum reverts", "PASS"],
        ["commitTransfer() self-transfer reverts", "PASS"],
        ["OTP chain security: H97 cannot be computed from H98", "PASS"],
        ["OTP chain security: only owner can advance chain", "PASS"],
        ["OTP chain security: proof pre-image never in storage", "PASS"],
        ["Air bags security: voucher cannot drain shielded balance", "PASS"],
        ["Air bags security: unfunded voucher reverts", "PASS"],
        ["QryptShield: Railgun pool address verified", "PASS"],
        ["QryptAir EIP-712 domain verified (chainId 11155111)", "PASS"],
        ["Group 8 invariants: all storage checks pass", "PASS"],
      ] as [string, string][],
      h2E2EV5: "E2E Test Results (Sepolia, v5: 32/32)",
      e2eV5Rows: [
        ["Factory v5 bytecode confirmed on Sepolia", "PASS"],
        ["Impl v5 bytecode confirmed on Sepolia", "PASS"],
        ["Create Vault A via factory (EIP-1167 clone)", "PASS"],
        ["Create Vault B via factory (isolated storage)", "PASS"],
        ["Duplicate vault creation reverts", "PASS"],
        ["shield() 10 USDC: correct bytes32 proofHash", "PASS"],
        ["shield() wrong proofHash: revert expected", "PASS"],
        ["Unshield: correct proofHash", "PASS"],
        ["Unshield: wrong proofHash reverts", "PASS"],
        ["commitTransfer() hashed intent (bytes32)", "PASS"],
        ["revealTransfer() Wallet B receives USDC", "PASS"],
        ["Replay commit reverts (Commit already used)", "PASS"],
        ["Wrong vault proof in reveal reverts", "PASS"],
        ["Expired commit reverts (timelock)", "PASS"],
        ["changeVaultProof(): rotates bytes32 hash", "PASS"],
        ["Old proof rejected after rotation", "PASS"],
        ["unshieldToRailgun() QryptShield: correct proof", "PASS"],
        ["unshieldToRailgun() wrong proof reverts", "PASS"],
        ["redeemVoucher() QryptAir EIP-712: valid sig", "PASS"],
        ["redeemVoucher() expired deadline reverts", "PASS"],
        ["redeemVoucher() wrong transfer code reverts", "PASS"],
        ["redeemVoucher() replay reverts (nonce used)", "PASS"],
        ["Cross-wallet vault access reverts (onlyOwner)", "PASS"],
        ["qToken non-transferable (direct transfer reverts)", "PASS"],
        ["Vault A storage isolated from Vault B", "PASS"],
        ["qUSDC 6 decimals (decimal fix confirmed)", "PASS"],
        ["Factory v5 MIT verified on Etherscan", "PASS"],
        ["Impl v5 MIT verified on Etherscan", "PASS"],
        ["qUSDC verified on Etherscan", "PASS"],
        ["EIP-1167 minimal proxy clone verified", "PASS"],
        ["Vault A address matches factory registry", "PASS"],
        ["Vault B address matches factory registry", "PASS"],
      ],
      h2E2E: "E2E Test Results (Sepolia, v2: historical)",
      e2eHeaders: ["Test", "Result"],
      e2eRows: [
        ["Create Qrypt-Safe", "PASS"],
        [
          "Shield USDC (shielded balance displayed as 2.0 qUSDC, decimal fix confirmed)",
          "PASS",
        ],
        ["qToken non-transferable (direct transfer reverts)", "PASS"],
        ["Wrong vault proof reverts", "PASS"],
        ["Cross-wallet vault access reverts (onlyOwner)", "PASS"],
        ["Commit-Reveal Transfer: Wallet B receives raw USDC", "PASS"],
        ["Replay commit reverts (Commit already used)", "PASS"],
        ["Unshield USDC", "PASS"],
      ],
    },
  },

  ru: {
    model: {
      title: "Модель безопасности",
      intro:
        "Безопасность Qryptum обеспечивается исключительно на уровне смарт-контракта. Нет доверенного бэкенда, нет ретранслятора, нет административного ключа. Каждое правило выражено в неизменяемом коде Solidity и верифицировано на Ethereum Virtual Machine.",
      h2TwoFactor: "Двухфакторная защита",
      pTwoFactor:
        "Каждая операция с хранилищем требует одновременного наличия двух независимых факторов:",
      factorItems: [
        'Приватный ключ: транзакция должна быть подписана кошельком, которому принадлежит Qrypt-Safe. Это обеспечивается модификатором onlyOwner: require(msg.sender == owner, "Not vault owner").',
        "Vault proof: правильный 6-символьный vault proof должен быть передан в calldata. Контракт хэширует его и сравнивает с сохранённым хэшем: keccak256(abi.encodePacked(proof)) == passwordHash.",
      ],
      pTwoFactorConclusion:
        "Злоумышленник, имеющий только приватный ключ, не может переместить токены, потому что передачи qToken всегда завершаются с ошибкой. Злоумышленник, имеющий только vault proof, не может вызвать функции хранилища, потому что onlyOwner блокирует любой адрес, не являющийся кошельком владельца.",
      h2NonTransferable: "Непередаваемость qToken",
      pNonTransferable:
        "Контракт ShieldToken переопределяет все три функции ERC-20, связанные с передачей, безусловными ошибками:",
      pPure:
        "Это функции pure: они не содержат обращений к состоянию и условий. Они всегда завершаются с ошибкой. Никакое количество газа, никакой вызов контракта и никакая функция кошелька не могут их обойти.",
      h2Replay: "Защита от атак воспроизведения",
      pTwoFactor2:
        "Схема commit-reveal для передачи защищает от атак воспроизведения двумя механизмами:",
      replayItems: [
        'Каждый хэш коммита хранится в маппинге и помечается как использованный после выполнения revealTransfer. Повторная попытка с тем же хэшем завершится ошибкой "Commit already used".',
        "Каждый хэш коммита включает уникальный случайный nonce, выбранный браузером, поэтому даже одинаковые параметры передачи каждый раз дают разный хэш.",
        'Коммит истекает через 600 секунд (10 минут) после отправки. Попытка раскрытия после этого окна завершится ошибкой "Commit expired".',
      ],
      h2Attacks: "Сценарии атак",
      attackHeaders: ["Атака", "Результат", "Почему не работает"],
      attacks: [
        [
          "Отправить qToken через MetaMask",
          "Ошибка",
          "transfer() всегда завершается с ошибкой",
        ],
        [
          "Одобрить DEX на расход qToken",
          "Ошибка",
          "approve() всегда завершается с ошибкой",
        ],
        [
          "Вызвать хранилище с неверным vault proof",
          "Ошибка",
          '"Invalid vault proof"',
        ],
        ["Вызвать хранилище с другого кошелька", "Ошибка", '"Not vault owner"'],
        [
          "Использовать использованный хэш коммита",
          "Ошибка",
          '"Commit already used"',
        ],
        ["Использовать просроченный коммит", "Ошибка", '"Commit expired"'],
        ["Атака повторного входа", "Ошибка", "ReentrancyGuard от OpenZeppelin"],
        [
          "Инициализировать хранилище дважды",
          "Ошибка",
          '"Already initialized"',
        ],
        [
          "Защитить сумму ниже минимума",
          "Ошибка",
          '"Amount below minimum" (1 000 000 единиц)',
        ],
        ["Перевод самому себе", "Ошибка", '"Cannot transfer to yourself"'],
      ],
    },
    nonCustodial: {
      title: "Некастодиальная архитектура",
      intro:
        "Qryptum полностью некастодиален. Токены контролируются неизменяемым смарт-контрактом без административных ключей, механизма обновления и бэкдоров.",
      h2Custody: "Кастодия токенов: кто что держит",
      custodyHeaders: ["Актив", "Местонахождение", "Кто контролирует"],
      custodyRows: [
        [
          "Реальные ERC-20 (USDC, ETH и др.)",
          "Адрес контракта PersonalVault (0xVaultA)",
          "Только владелец хранилища через функции хранилища",
        ],
        [
          "Баланс qToken",
          "Адрес кошелька пользователя (маппинг балансов ERC-20)",
          "Неперемещаемый: всегда ошибка при передаче",
        ],
        [
          "Хэш vault proof",
          "Хранилище PersonalVault (приватное)",
          "Меняется только через changeVaultProof() со старым proof",
        ],
      ],
      h2NoAdmin: "Отсутствие административного доступа",
      pNoAdmin1:
        "Деплойер ShieldFactory (Qryptum) имеет ровно одну привилегированную возможность: приостанавливать и возобновлять работу фабрики. Приостановка блокирует создание новых Qrypt-Safe. Это не влияет ни на одно существующее хранилище.",
      pNoAdmin2:
        "Деплойер не имеет никакого доступа к хранилищу ни одного пользователя. Нет функции adminWithdraw(), нет setOwner(), нет обновляемого прокси. Код, обрабатывающий средства пользователей, неизменяем с момента деплоя.",
      h2NoUpgrade: "Отсутствие механизма обновления",
      pNoUpgrade:
        "PersonalVault использует клонирование с минимальным прокси EIP-1167 для экономии газа. Контракт реализации деплоится один раз, и все хранилища делегируют ему. Однако нет функции upgradeTo() и нет администратора прокси. Реализация фиксируется после деплоя. Существующие хранилища не могут быть изменены.",
      h2Emergency: "Экстренный вывод средств",
      pEmergency:
        "Если пользователь теряет vault proof и хранилище неактивно в течение 1 296 000 блоков (примерно 6 месяцев при 12 секундах на блок), пользователь может вызвать emergencyWithdraw() только с приватным ключом. Это возвращает все токены на кошелёк владельца.",
      calloutEmergency:
        "Примечание: Любая активность хранилища сбрасывает счётчик 6-месячного бездействия. Операции shield, unshield и transfer считаются активностью.",
      h2Server: "Роль сервера",
      pServer:
        "Бэкенд API Qryptum хранит только два вида данных: маппинг кошелёк-адрес хранилища и историю транзакций (хэши транзакций и символы токенов). Сервер никогда не:",
      serverItems: [
        "Получает или хранит vault proof в любой форме",
        "Ретранслирует или совместно подписывает транзакции",
        "Хранит приватные ключи",
        "Управляет функциями смарт-контракта",
      ],
      pServerConclusion:
        "Все транзакции подписываются в браузере пользователя и отправляются напрямую в сеть Ethereum. Сервер выполняет только функции индексирования и удобства.",
    },
    tokenProtection: {
      title: "Защита токенов",
      intro:
        "qToken: контракты ERC-20 со всеми функциями передачи, навсегда отключёнными на уровне байткода. Это делает их невозможными для перемещения через любой внешний механизм.",
      h2Contract: "Контракт ShieldToken",
      pContract:
        "Каждый qToken является экземпляром ShieldToken, минимального ERC-20, переопределяющего три функции, на которые опирается каждый кошелёк и биржа:",
      h2CannotHappen: "Что невозможно",
      cannotHeaders: ["Действие", "Результат"],
      cannotRows: [
        [
          "Отправить qUSDC из MetaMask",
          "Транзакция завершается с ошибкой. MetaMask показывает сбой.",
        ],
        [
          "Отправить qUSDC из TrustWallet, Phantom, Rabby, Coinbase Wallet",
          "Транзакция завершается с ошибкой. Все кошельки вызывают одни и те же функции ERC-20.",
        ],
        [
          "Одобрить DEX (Uniswap, 1inch) для расходования qToken",
          "Ошибка. approve() отключён.",
        ],
        [
          "Внести qToken на CEX",
          "Ошибка. CEX вызовет transferFrom(), который завершится с ошибкой.",
        ],
        [
          "Использовать qToken как залог в протоколе кредитования",
          "Любой шаг одобрения или передачи завершится с ошибкой.",
        ],
        [
          "Слив через одобрение вредоносного контракта",
          "Ошибка. Для qToken нельзя установить ни одного одобрения.",
        ],
      ],
      h2Naming: "Именование qToken",
      pNaming:
        "Каждый qToken берёт название и символ базового актива и добавляет префикс q. Примеры:",
      namingHeaders: ["Базовый токен", "Название qToken", "Символ qToken"],
      h2OneContract: "Один контракт qToken на токен на хранилище",
      pOneContract:
        "При первой защите токена (например USDC) хранилище деплоит новый контракт ShieldToken для этого токена. При последующих операциях shield с тем же токеном минтинг происходит в тот же контракт qToken. У разных пользователей разные адреса контрактов qToken для одного и того же базового актива.",
    },
    postQuantum: {
      title: "Пост-квантовый дизайн",
      intro:
        "Слой vault proof Qryptum построен на keccak256: хэш-функции семейства SHA-3, сохраняющей 128-битную стойкость при квантовых атаках. Двухфакторная модель протокола разработана с учётом пост-квантовой эры: даже если базовый уровень Ethereum изменится, хэш vault proof останется вычислительно необратимым.",
      h2WhyMatters: "Почему квантовые компьютеры важны для криптовалют",
      pEcdsa:
        "Квантовые компьютеры угрожают асимметричной криптографии: RSA, Диффи-Хеллман и ECDSA (схема подписи, используемая Ethereum сегодня) основаны на математических задачах, которые достаточно мощный квантовый компьютер мог бы решить экспоненциально быстрее, чем классические машины, с помощью алгоритма Шора.",
      pHash:
        "Хэш-функции сталкиваются с иной, более слабой угрозой. Алгоритм Гровера даёт квантовому компьютеру квадратичное ускорение при брутфорсе хэшей, но не взламывает хэш-функции. 256-битный хэш остаётся безопасным на уровне 128 бит против квантовых противников, что соответствует минимальному порогу пост-квантовой безопасности NIST.",
      algoHeaders: [
        "Тип алгоритма",
        "Используется в",
        "Классическая стойкость",
        "Квантовая стойкость (Гровер/Шор)",
      ],
      algoRows: [
        [
          "ECDSA (secp256k1)",
          "Подписи кошельков Ethereum",
          "~128 бит",
          "Взломан алгоритмом Шора",
        ],
        [
          "keccak256 (SHA-3)",
          "Хранение хэша vault proof",
          "256 бит",
          "128 бит (Гровер: только квадратичный)",
        ],
        [
          "keccak256 (SHA-3)",
          "Хэш коммита в передачах",
          "256 бит",
          "128 бит (Гровер: только квадратичный)",
        ],
      ],
      h2HowProtects: "Как keccak256 защищает vault proof",
      pHowProtects:
        "При создании Qrypt-Safe vault proof никогда не хранится в открытом виде. Контракт хранит только его keccak256-хэш:",
      pPreimage:
        "Чтобы восстановить исходный vault proof из сохранённого хэша, злоумышленник должен обратить keccak256. Это атака на прообраз. Для 256-битного хэша классическая сложность составляет 2^256 операций. С алгоритмом Гровера это сокращается до 2^128 операций, что по-прежнему недостижимо для любого обозримого квантового компьютера. Для сравнения: 128-битная квантовая стойкость является порогом, принятым стандартами пост-квантовой криптографии NIST.",
      calloutNist:
        "keccak256 и NIST: SHA-3 (стандарт, на котором основан keccak256) был выбран NIST после 7-летнего открытого конкурса, специально направленного на выявление алгоритмов, устойчивых как к классическим, так и к квантовым атакам. Это одна из наиболее тщательно проанализированных хэш-функций в мире.",
      h2BruteForce: "Стойкость vault proof к брутфорсу",
      pBruteForce:
        "Даже без квантовых вычислений брутфорс-атаки на vault proof сталкиваются с двумя независимыми барьерами: барьером доступа и экономическим барьером.",
      h3Barrier1: "Барьер 1: требуется приватный ключ (доступ)",
      pBarrier1:
        "Каждая функция хранилища имеет модификатор onlyOwner. Злоумышленник, не владеющий приватным ключом Ethereum пользователя, получает ровно ноль попыток ввода vault proof. Проверка msg.sender выполняется самой EVM до начала любой логики хранилища.",
      h3Barrier2: "Барьер 2: экономическое сдерживание (стоимость)",
      pBarrier2:
        "Каждый неудачный вызов хранилища является on-chain транзакцией, потребляющей газ. В отличие от типичной атаки на пароль базы данных или API, здесь нет бесплатных попыток. Каждая попытка стоит реальных ETH.",
      bruteForceHeaders: ["Параметр", "Значение"],
      bruteForceRows: [
        [
          "Пространство ключей vault proof (3 строчные буквы + 3 цифры)",
          "26^3 x 10^3 = 17 576 000 комбинаций",
        ],
        ["Газ на неудачный вызов хранилища (revert)", "~40 000 газа"],
        [
          "Стоимость одной попытки (0.5 gwei, ETH = $3 000)",
          "~$0.06 за попытку",
        ],
        [
          "Стоимость перебора всего пространства ключей",
          "17 576 000 x $0.06 = ~$1.05 млн",
        ],
        ["Стоимость при пиковом газе (2 gwei, ETH = $3 000)", "~$4.2 млн"],
        [
          "Ожидаемое число попыток до нахождения proof (случайно)",
          "~8 788 000 (половина пространства)",
        ],
        ["Ожидаемая стоимость нахождения proof (0.5 gwei)", "~$528 000"],
      ],
      pBruteForceConclusion:
        "Полный перебор пространства ключей vault proof стоит свыше $1 млн в виде комиссий за газ по текущим ценам Ethereum (0.5 gwei). При пиковой нагрузке (2 gwei) это возрастает до ~$4.2 млн. Стоимость масштабируется вместе с ценой ETH и спросом на сеть: чем ценнее активы в Qrypt-Safe, тем дороже on-chain попытки.",
      calloutComparison:
        "Сравнение: Типичный брутфорс веб-приложения занимает миллисекунды на попытку и встречает только ограничение частоты запросов. Брутфорс хранилища Qryptum сталкивается с двумя слоями: обязательным приватным ключом (основной барьер) и ~$0.06 за неудачную on-chain транзакцию (вторичный барьер). Оба должны быть преодолены одновременно.",
      h3Barrier3: "Барьер 3: невозможность пакетного выполнения",
      pBarrier3:
        "Вызовы смарт-контрактов нельзя распараллелить по блокам. Каждая попытка должна быть включена в блок и подтверждена до начала следующей. При среднем времени блока Ethereum 12 секунд даже хорошо финансируемый злоумышленник ограничен несколькими тысячами попыток в день до достижения запретительного уровня комиссий.",
      h2PostQuantumFuture: "Двухфакторность в пост-квантовом будущем",
      pPostQuantumFuture:
        "Если квантовые компьютеры в итоге взломают ECDSA (алгоритм, используемый Ethereum для подписей кошельков), последствия для держателей стандартных токенов ERC-20 будут катастрофическими: злоумышленник сможет подделывать подписи и опустошать кошельки. Для пользователей Qryptum, держащих qToken, ситуация иная:",
      futureHeaders: ["Сценарий", "Стандартный ERC-20", "Qryptum qToken"],
      futureRows: [
        [
          "ECDSA взломан квантовым компьютером",
          "Приватный ключ подделан, все токены слиты",
          "Передача qToken по-прежнему завершается с ошибкой (ERC-20 передача невозможна)",
        ],
        [
          "Злоумышленник подделывает подпись приватного ключа",
          "Полный доступ к токенам",
          "Хэш vault proof (keccak256) по-прежнему блокирует доступ к хранилищу",
        ],
        [
          "Хэш vault proof взломан квантовым путём",
          "Н/А",
          "128-битная квантовая стойкость; недостижимо с обозримым железом",
        ],
      ],
      pFutureConclusion:
        "В пост-квантовом мире, где подписи ECDSA взломаны, хэш vault proof Qryptum (keccak256) становится последней линией обороны. В отличие от ECDSA, keccak256 не опирается на задачу дискретного логарифма на эллиптических кривых. Это односторонняя функция, остающаяся вычислительно сложной даже против квантовых противников.",
      h2HonestScope: "Честные границы защиты",
      pHonestScope:
        "Qryptum не претендует на обеспечение квантовой безопасности Ethereum на базовом уровне. Действуют следующие ограничения:",
      honestItems: [
        "Подписи кошельков Ethereum (ECDSA): не квантово-устойчивы. Это забота базового уровня Ethereum, не специфичная для Qryptum. Сообщество Ethereum активно исследует пост-квантовые схемы подписи для будущих обновлений протокола.",
        "Строка vault proof в calldata: исходный vault proof виден в calldata транзакции во время shield(), unshield() и revealTransfer(). Если злоумышленник может читать историческое calldata и уже знает приватный ключ, он узнаёт vault proof. Vault proof можно сменить через changeVaultProof() после любого подозрительного раскрытия.",
        "Инверсия хэша в proof: сохранённый хэш не может быть использован для получения vault proof. Однако исходный proof в calldata наблюдаем on-chain.",
      ],
      pHonestConclusion:
        "Пост-квантовая устойчивость Qryptum конкретно связана с хранением хэша vault proof и хэшем передачи commit-reveal. Они используют keccak256 и обеспечивают значимую защиту даже в сценариях, где ECDSA скомпрометирован.",
    },
    contractVerification: {
      title: "Верификация контрактов",
      intro:
        "Все контракты Qryptum верифицированы на Etherscan. Любой может прочитать исходный код, изучить ABI и подтвердить, что нет привилегированных функций за пределами задокументированных здесь.",
      h2Sepolia: "Тестовая сеть Sepolia (активна)",
      h3V6Active: "v6: Активный (OTP-цепочка · air bags · 49/49 E2E · MIT верифицирован)",
      pV6: "Обновление безопасности от v5. OTP-цепочка заменяет статический bytes32 proofHash: каждый proof используется один раз и продвигает голову цепочки, делая атаки воспроизведения структурно невозможными. Изоляция air bags отделяет средства QryptAir от защищённого баланса. rechargeChain() позволяет пополнять OTP. 49/49 E2E-тестов проходят на Sepolia. MIT-верифицирован на Etherscan.",
      h3V5Active: "v5: Заменён v6 (bytes32 proofHash · 32/32 E2E · MIT верифицирован)",
      pV5: "Каноническое развёртывание v5 на Sepolia. bytes32 proofHash заменяет string vaultProof. unshieldToRailgun() для QryptShield, redeemVoucher() EIP-712 для QryptAir. 32/32 E2E-теста проходят. Все контракты MIT-верифицированы на Etherscan. Заменён v6 (обновление OTP-цепочки).",
      h3V4Decommissioned: "v4: Выведен (заменён v5)",
      pV4: "Добавлены QryptAir EIP-712 ваучеры и мост QryptShield Railgun. Использовал string vaultProof. Заменён v5 (переход на bytes32 proofHash).",
      h3V3Active: "v3: Заменён (нет административных ключей)",
      pV3: "Передеплоен для удаления Ownable и Pausable из фабрики. QryptSafe v3 не имеет административных ключей: никто не может приостановить создание хранилища или получить доступ к средствам пользователей. Контракты переименованы: QryptSafe (фабрика) и PersonalQryptSafe (реализация хранилища).",
      h3V2Superseded: "v2: Устаревший (имел административные ключи)",
      pV2: "Передеплоен для исправления ошибки точности десятичных знаков qToken. ShieldToken теперь считывает decimals() из базового ERC-20 при деплое. Заменён v3, который удаляет весь административный контроль.",
      h3V1Superseded: "v1: Устаревший (ошибка точности десятичных знаков)",
      pV1: "Первоначальный деплой. ShieldToken не наследовал decimals() от базового токена. OpenZeppelin ERC20 по умолчанию использует 18 знаков, из-за чего qToken на USDC (6 знаков) отображались как 0.0000000000095 вместо 9.5 в Etherscan. Эти контракты остаются в сети для исторической справки.",
      contractTableHeaders: ["Контракт", "Адрес", "Etherscan"],
      viewSource: "Просмотреть исходный код",
      h2Mainnet: "Ethereum Mainnet",
      calloutMainnet:
        "Деплой в основную сеть выполняется. Адреса будут опубликованы здесь после деплоя и верификации на Etherscan.",
      h2WhatProves: "Что доказывает верификация",
      pWhatProves:
        "Верификация Etherscan связывает задеплоенный байткод с исходным кодом Solidity. Любой может подтвердить:",
      proveItems: [
        "Исходный код контракта совпадает с выводом компилятора, задеплоенным on-chain",
        "Нет скрытых функций за пределами задокументированных",
        "Аргументы конструктора соответствуют ожидаемым значениям",
        "Версия компилятора и настройки оптимизации раскрыты",
      ],
      h2HowToVerify: "Как верифицировать самостоятельно",
      pHowToVerify:
        "Склонируйте репозиторий контрактов и скомпилируйте локально:",
      h2TestCoverage: "Покрытие тестами",
      coverageHeaders: ["Набор тестов", "Тесты", "Покрытие"],
      coverageRows: [
        [
          "QToken.test.js",
          "13",
          "Минтинг, сжигание, все случаи непередаваемости, точность десятичных знаков",
        ],
        [
          "ShieldFactory.test.js",
          "15",
          "Создание хранилища, пауза/снятие паузы, владение",
        ],
        [
          "PersonalVault.test.js",
          "45",
          "Все операции, граничные случаи, инварианты безопасности",
        ],
        [
          "integration.test.js",
          "11",
          "Полный сквозной жизненный цикл shield, transfer и unshield",
        ],
      ],
      coverageTotal: ["Итого", "84", "Все проходят"],
      h2E2EV6: "Результаты E2E-тестов (Sepolia, v6: 49/49)",
      e2eV6Rows: [
        ["Байткод фабрики v6 подтверждён на Sepolia", "PASS"],
        ["Байткод имплементации v6 подтверждён на Sepolia", "PASS"],
        ["Создание Vault C через фабрику v6 (EIP-1167 клон)", "PASS"],
        ["Создание дублирующего хранилища отклоняется", "PASS"],
        ["Approve USDC для хранилища (T08)", "PASS"],
        ["shield() 1 USDC OTP-цепочка H99 (T09)", "PASS"],
        ["shield() неверный OTP proof откатывается", "PASS"],
        ["qUSDC зачислен на кошелёк владельца", "PASS"],
        ["commitTransfer() OTP proof H98 (T14)", "PASS"],
        ["revealTransfer() Wallet B получает USDC", "PASS"],
        ["Повторное использование OTP proof откатывается", "PASS"],
        ["Просроченный коммит откатывается", "PASS"],
        ["rechargeChain() пополнение OTP (T19)", "PASS"],
        ["unshield() 1 USDC (T20)", "PASS"],
        ["unshield() неверный OTP proof откатывается", "PASS"],
        ["fundAirBudget() air bags QryptAir (T23)", "PASS"],
        ["redeemAirVoucher() EIP-712 валидная подпись (T25)", "PASS"],
        ["redeemAirVoucher() просроченный дедлайн откатывается", "PASS"],
        ["redeemAirVoucher() неверный код перевода откатывается", "PASS"],
        ["redeemAirVoucher() повтор откатывается (nonce использован)", "PASS"],
        ["Баланс air bags изолирован от защищённого баланса", "PASS"],
        ["reclaimAirBudget() возвращает на защищённый баланс", "PASS"],
        ["unshieldToRailgun() QryptShield (T33)", "PASS"],
        ["unshieldToRailgun() неверный OTP proof откатывается", "PASS"],
        ["Кросс-кошельковый доступ откатывается (onlyOwner)", "PASS"],
        ["qToken непередаваемый (прямой transfer откатывается)", "PASS"],
        ["Хранилище C изолировано от других хранилищ", "PASS"],
        ["qUSDC v6 6 знаков подтверждено", "PASS"],
        ["Голова OTP-цепочки продвигается после каждого использования", "PASS"],
        ["Пополнение OTP-цепочки верифицировано on-chain", "PASS"],
        ["Фабрика v6 MIT верифицирована на Etherscan", "PASS"],
        ["Имплементация v6 MIT верифицирована на Etherscan", "PASS"],
        ["qToken USDC v6 верифицирован на Etherscan", "PASS"],
        ["EIP-1167 минимальный proxy-клон верифицирован", "PASS"],
        ["Адрес Vault C совпадает с реестром фабрики", "PASS"],
        ["changeOTPChain() сменяет голову цепочки", "PASS"],
        ["Старый OTP proof отклонён после смены цепочки", "PASS"],
        ["emergencyWithdraw() доступен после бездействия", "PASS"],
        ["Shield ниже минимума откатывается", "PASS"],
        ["commitTransfer() перевод самому себе откатывается", "PASS"],
        ["OTP безопасность: H97 невозможно вычислить из H98", "PASS"],
        ["OTP безопасность: только владелец продвигает цепочку", "PASS"],
        ["OTP безопасность: прообраз proof никогда не в хранилище", "PASS"],
        ["Air bags безопасность: ваучер не может опустошить защищённый баланс", "PASS"],
        ["Air bags безопасность: незафондированный ваучер откатывается", "PASS"],
        ["QryptShield: адрес пула Railgun верифицирован", "PASS"],
        ["QryptAir EIP-712 домен верифицирован (chainId 11155111)", "PASS"],
        ["Group 8 инварианты: все проверки хранилища пройдены", "PASS"],
      ] as [string, string][],
      h2E2EV5: "Результаты E2E-тестов (Sepolia, v5: 32/32)",
      e2eV5Rows: [
        ["Байткод фабрики v5 подтверждён на Sepolia", "PASS"],
        ["Байткод имплементации v5 подтверждён на Sepolia", "PASS"],
        ["Создание Vault A через фабрику (EIP-1167 клон)", "PASS"],
        ["Создание Vault B через фабрику (изолированное хранилище)", "PASS"],
        ["Создание дублирующего хранилища отклоняется", "PASS"],
        ["shield() 10 USDC: корректный bytes32 proofHash", "PASS"],
        ["shield() неверный proofHash: ожидаемый откат", "PASS"],
        ["Unshield: корректный proofHash", "PASS"],
        ["Unshield: неверный proofHash откатывается", "PASS"],
        ["commitTransfer() хэшированное намерение (bytes32)", "PASS"],
        ["revealTransfer() Wallet B получает USDC", "PASS"],
        ["Повтор commit откатывается (уже использован)", "PASS"],
        ["Неверный vault proof в reveal откатывается", "PASS"],
        ["Истёкший commit откатывается (таймлок)", "PASS"],
        ["changeVaultProof(): ротация bytes32 хэша", "PASS"],
        ["Старый proof отклоняется после ротации", "PASS"],
        ["unshieldToRailgun() QryptShield: корректный proof", "PASS"],
        ["unshieldToRailgun() неверный proof откатывается", "PASS"],
        ["redeemVoucher() QryptAir EIP-712: валидная подпись", "PASS"],
        ["redeemVoucher() истёкший дедлайн откатывается", "PASS"],
        ["redeemVoucher() неверный код перевода откатывается", "PASS"],
        ["redeemVoucher() повтор откатывается (нонс использован)", "PASS"],
        ["Доступ к хранилищу другого кошелька откатывается (onlyOwner)", "PASS"],
        ["qToken не передаваем (прямая передача откатывается)", "PASS"],
        ["Хранилище Vault A изолировано от Vault B", "PASS"],
        ["qUSDC 6 десятичных знаков (исправление подтверждено)", "PASS"],
        ["Фабрика v5 MIT верифицирована на Etherscan", "PASS"],
        ["Имплементация v5 MIT верифицирована на Etherscan", "PASS"],
        ["qUSDC верифицирован на Etherscan", "PASS"],
        ["EIP-1167 минимальный прокси-клон верифицирован", "PASS"],
        ["Адрес Vault A совпадает с реестром фабрики", "PASS"],
        ["Адрес Vault B совпадает с реестром фабрики", "PASS"],
      ],
      h2E2E: "Результаты E2E-тестов (Sepolia, v2: исторические)",
      e2eHeaders: ["Тест", "Результат"],
      e2eRows: [
        ["Создание Qrypt-Safe", "PASS"],
        [
          "Shield USDC (баланс qUSDC отображается как 2.0, исправление знаков подтверждено)",
          "PASS",
        ],
        ["qToken непередаваем (прямая передача завершается с ошибкой)", "PASS"],
        ["Неверный vault proof вызывает ошибку", "PASS"],
        [
          "Доступ к хранилищу с другого кошелька (onlyOwner) вызывает ошибку",
          "PASS",
        ],
        ["Commit-Reveal Transfer: Кошелёк B получает USDC", "PASS"],
        [
          "Воспроизведение коммита (Commit already used) вызывает ошибку",
          "PASS",
        ],
        ["Unshield USDC", "PASS"],
      ],
    },
  },

  zh: {
    model: {
      title: "安全模型",
      intro:
        "Qryptum 的安全性完全在智能合约层面执行。没有可信后端、没有中继器、没有管理密钥。每条规则都以不可变的 Solidity 代码表达，并在以太坊虚拟机上进行验证。",
      h2TwoFactor: "双因素保护",
      pTwoFactor: "每次保险库操作都需要同时具备两个独立因素：",
      factorItems: [
        '私钥：交易必须由拥有 Qrypt-Safe 的钱包签名。这由 onlyOwner 修饰符强制执行：require(msg.sender == owner, "Not vault owner")。',
        "保险库密码：必须在 calldata 中传递正确的 6 位保险库密码。合约对其哈希并与存储的哈希进行比较：keccak256(abi.encodePacked(proof)) == passwordHash。",
      ],
      pTwoFactorConclusion:
        "仅有私钥的攻击者无法移动代币，因为 qToken 转账始终回滚。仅有保险库密码的攻击者无法调用保险库函数，因为 onlyOwner 会阻止任何非所有者钱包的地址。",
      h2NonTransferable: "qToken 不可转让性",
      pNonTransferable:
        "ShieldToken 合约用无条件回滚覆盖了 ERC-20 所有三个与转账相关的函数：",
      pPure:
        "这些是 pure 函数：不包含状态读取和条件判断，始终回滚。任何 Gas 数量、任何合约调用、任何钱包功能都无法绕过它们。",
      h2Replay: "防重放攻击",
      pTwoFactor2: "提交-揭示转账方案通过两种机制防止重放攻击：",
      replayItems: [
        '每个提交哈希都存储在映射中，revealTransfer 执行后标记为已使用。使用相同哈希的第二次尝试将以 "Commit already used" 回滚。',
        "每个提交哈希包含浏览器选择的唯一随机 nonce，因此即使相同的转账参数每次也会产生不同的哈希。",
        '提交在提交后 600 秒（10 分钟）到期。在此窗口后尝试揭示将以 "Commit expired" 回滚。',
      ],
      h2Attacks: "攻击场景",
      attackHeaders: ["攻击", "结果", "失败原因"],
      attacks: [
        ["通过 MetaMask 发送 qToken", "回滚", "transfer() 始终回滚"],
        ["授权 DEX 消费 qToken", "回滚", "approve() 始终回滚"],
        ["以错误的保险库密码调用保险库", "回滚", '"Invalid vault proof"'],
        ["从不同钱包调用保险库", "回滚", '"Not vault owner"'],
        ["重放已使用的提交哈希", "回滚", '"Commit already used"'],
        ["使用已过期的提交", "回滚", '"Commit expired"'],
        ["重入攻击", "回滚", "OpenZeppelin 的 ReentrancyGuard"],
        ["两次初始化保险库", "回滚", '"Already initialized"'],
        [
          "存入低于最小金额",
          "回滚",
          '"Amount below minimum"（1,000,000 单位）',
        ],
        ["转账给自己", "回滚", '"Cannot transfer to yourself"'],
      ],
    },
    nonCustodial: {
      title: "非托管架构",
      intro:
        "Qryptum 完全非托管。代币由不可变智能合约控制，没有管理密钥、没有升级机制、没有后门。",
      h2Custody: "代币托管：谁持有什么",
      custodyHeaders: ["资产", "位置", "谁控制"],
      custodyRows: [
        [
          "真实 ERC-20（USDC、ETH 等）",
          "PersonalVault 合约地址（0xVaultA）",
          "仅保险库所有者通过保险库函数控制",
        ],
        [
          "qToken 余额",
          "用户钱包地址（ERC-20 余额映射）",
          "不可移动：转账时始终回滚",
        ],
        [
          "保险库密码哈希",
          "PersonalVault 存储（私有）",
          "仅通过 changeVaultProof() 用旧密码修改",
        ],
      ],
      h2NoAdmin: "无管理员访问",
      pNoAdmin1:
        "ShieldFactory 部署者（Qryptum）只有一项特权：暂停和恢复工厂。暂停会阻止新 Qrypt-Safe 的创建，但不影响任何现有的 Qrypt-Safe。",
      pNoAdmin2:
        "部署者对任何用户的保险库没有任何访问权限。没有 adminWithdraw()、没有 setOwner()、没有可升级代理。处理用户资金的代码从部署时起就不可变。",
      h2NoUpgrade: "无升级机制",
      pNoUpgrade:
        "PersonalVault 使用 EIP-1167 最小代理克隆以节省 Gas。实现合约部署一次，所有保险库都委托给它。但是，没有 upgradeTo() 函数，也没有代理管理员。实现在部署后固定，现有保险库无法修改。",
      h2Emergency: "紧急提款",
      pEmergency:
        "如果用户丢失保险库密码，且保险库在 1,296,000 个区块（约 12 秒/块，约 6 个月）内处于非活跃状态，用户可以仅凭私钥调用 emergencyWithdraw()，将所有代币退回到所有者钱包。",
      calloutEmergency:
        "注意：任何保险库活动都会重置 6 个月非活跃计时器。存入、取出或转账操作均算作活动。",
      h2Server: "服务器的角色",
      pServer:
        "Qryptum 后端 API 只存储两类数据：钱包到保险库地址的映射，以及交易历史（交易哈希和代币符号）。它绝不：",
      serverItems: [
        "以任何形式接收或存储保险库密码",
        "中继或共同签署交易",
        "持有私钥",
        "控制智能合约函数",
      ],
      pServerConclusion:
        "所有交易在用户浏览器中签名，并直接广播到以太坊网络。服务器仅是索引和便利层。",
    },
    tokenProtection: {
      title: "代币保护",
      intro:
        "qToken 是 ERC-20 合约，所有与转账相关的函数在字节码层面被永久禁用。这使得它们无法通过任何外部机制移动。",
      h2Contract: "ShieldToken 合约",
      pContract:
        "每个 qToken 都是 ShieldToken 的实例，这是一个最小化 ERC-20，覆盖了每个钱包和交易所依赖的三个函数：",
      h2CannotHappen: "不可能发生的操作",
      cannotHeaders: ["操作", "结果"],
      cannotRows: [
        ["从 MetaMask 发送 qUSDC", "交易回滚。MetaMask 显示失败。"],
        [
          "从 TrustWallet、Phantom、Rabby、Coinbase Wallet 发送 qUSDC",
          "交易回滚。所有钱包调用相同的 ERC-20 函数。",
        ],
        ["授权 DEX（Uniswap、1inch）消费 qToken", "回滚。approve() 已禁用。"],
        ["将 qToken 存入 CEX", "回滚。CEX 会调用 transferFrom()，该函数回滚。"],
        ["将 qToken 用作借贷协议的抵押品", "任何授权或转账步骤均回滚。"],
        ["通过恶意合约授权清空资金", "回滚。qToken 无法设置任何授权。"],
      ],
      h2Naming: "qToken 命名规则",
      pNaming: "每个 qToken 使用底层资产的名称和符号，并加上前缀 q。示例：",
      namingHeaders: ["底层代币", "qToken 名称", "qToken 符号"],
      h2OneContract: "每个保险库每种代币一个 qToken 合约",
      pOneContract:
        "用户首次存入某种代币（例如 USDC）时，保险库会为该代币部署一个新的 ShieldToken 合约。后续存入同一代币时，铸造到同一 qToken 合约。不同用户对同一底层资产有不同的 qToken 合约地址。",
    },
    postQuantum: {
      title: "后量子设计",
      intro:
        "Qryptum 的保险库密码层基于 keccak256 构建，这是 SHA-3 系列的哈希函数，在量子攻击下仍保持 128 位安全性。该协议的双因素模型从设计之初就考虑到了后量子时代：即使以太坊基础层发生变化，保险库密码哈希在计算上仍不可逆。",
      h2WhyMatters: "量子计算为何对加密货币重要",
      pEcdsa:
        "量子计算机威胁着非对称密码学：RSA、Diffie-Hellman 和 ECDSA（以太坊目前使用的签名方案）都依赖于数学问题，足够强大的量子计算机可以利用 Shor 算法以指数级速度求解这些问题。",
      pHash:
        "哈希函数面临不同且更弱的威胁。Grover 算法给量子计算机在哈希暴力破解上带来二次加速，但不会破解哈希函数。256 位哈希对量子对手仍保持 128 位安全性，符合 NIST 最低后量子安全阈值。",
      algoHeaders: [
        "算法类型",
        "使用场景",
        "经典安全性",
        "量子安全性（Grover/Shor）",
      ],
      algoRows: [
        ["ECDSA (secp256k1)", "以太坊钱包签名", "~128 位", "被 Shor 算法破解"],
        [
          "keccak256 (SHA-3)",
          "保险库密码哈希存储",
          "256 位",
          "128 位（Grover：仅二次加速）",
        ],
        [
          "keccak256 (SHA-3)",
          "转账中的提交哈希",
          "256 位",
          "128 位（Grover：仅二次加速）",
        ],
      ],
      h2HowProtects: "keccak256 如何保护保险库密码",
      pHowProtects:
        "创建 Qrypt-Safe 时，保险库密码从不以明文存储。合约只存储其 keccak256 哈希：",
      pPreimage:
        "要从存储的哈希恢复原始保险库密码，攻击者必须反转 keccak256，这是一种原像攻击。对于 256 位哈希，经典复杂度为 2^256 次操作。在 Grover 算法下，这减少到 2^128 次操作，仍超出任何可预见量子计算机的能力范围。相比之下，128 位量子安全性是 NIST 后量子密码学标准采用的阈值。",
      calloutNist:
        "keccak256 与 NIST：SHA-3（keccak256 基于的标准）是在 NIST 历时 7 年的公开竞赛后被选中的，该竞赛专门设计用于识别能够抵抗经典和量子攻击的算法。它是目前分析最彻底的哈希函数之一。",
      h2BruteForce: "保险库密码暴力破解抵抗性",
      pBruteForce:
        "即使没有量子计算，对保险库密码的暴力破解也面临两个独立屏障：访问屏障和经济屏障。",
      h3Barrier1: "屏障 1：需要私钥（访问）",
      pBarrier1:
        "每个保险库函数都有 onlyOwner 修饰符。不持有用户以太坊私钥的攻击者对保险库密码的尝试次数恰好为零。msg.sender 检查由 EVM 本身在任何保险库逻辑执行前强制执行。",
      h3Barrier2: "屏障 2：经济威慑（成本）",
      pBarrier2:
        "每次失败的保险库调用都是消耗 Gas 的链上交易。与针对数据库或 API 的典型密码攻击不同，这里没有免费尝试。每次猜测都需要花费真实的 ETH。",
      bruteForceHeaders: ["参数", "数值"],
      bruteForceRows: [
        [
          "保险库密码密钥空间（3 个小写字母 + 3 个数字）",
          "26^3 x 10^3 = 17,576,000 种组合",
        ],
        ["每次失败保险库调用的 Gas（回滚）", "~40,000 Gas"],
        ["每次尝试的成本（0.5 gwei，ETH = $3,000）", "~$0.06/次"],
        ["穷举整个密钥空间的成本", "17,576,000 x $0.06 = ~$105 万"],
        ["峰值 Gas 时的成本（2 gwei，ETH = $3,000）", "~$420 万"],
        ["随机找到正确密码的预期尝试次数", "~8,788,000（密钥空间的一半）"],
        ["找到密码的预期成本（0.5 gwei）", "~$528,000"],
      ],
      pBruteForceConclusion:
        "在当前以太坊价格（0.5 gwei）下，穷举保险库密码密钥空间需要超过 $100 万的 Gas 费。在峰值拥堵时（2 gwei），这将上升至约 $420 万。该成本随 ETH 价格和网络需求而扩大，这意味着 Qrypt-Safe 中的资产越有价值，链上尝试往往就越昂贵，从而维持了经济威慑效果。",
      calloutComparison:
        "对比：典型的 Web 应用暴力破解每次尝试只需毫秒，只面临速率限制。Qryptum 保险库暴力破解面临两层屏障：强制私钥（主要屏障）和当前 Gas 价格下每次失败链上交易约 $0.06（次要屏障）。两者必须同时被攻克。",
      h3Barrier3: "屏障 3：无法批量执行",
      pBarrier3:
        "智能合约调用无法跨区块并行化。每次尝试必须被打包到一个区块并确认后，下一次才有效。以太坊平均 12 秒的出块时间意味着，即使资金充裕的攻击者每天也只能进行数千次尝试，之后费用就会累积到令人望而却步的水平。",
      h2PostQuantumFuture: "后量子未来中的双因素",
      pPostQuantumFuture:
        "如果量子计算机最终破解 ECDSA（以太坊用于钱包签名的算法），对标准 ERC-20 代币持有者的影响将是灾难性的：攻击者可以伪造签名并清空钱包。对于持有 qToken 的 Qryptum 用户而言，影响则不同：",
      futureHeaders: ["场景", "标准 ERC-20", "Qryptum qToken"],
      futureRows: [
        [
          "ECDSA 被量子计算机破解",
          "私钥被伪造，所有代币被清空",
          "qToken 转账仍然回滚（无法进行 ERC-20 转账）",
        ],
        [
          "攻击者伪造私钥签名",
          "完全访问代币",
          "保险库密码哈希（keccak256）仍阻止保险库访问",
        ],
        [
          "保险库密码哈希被量子计算破解",
          "不适用",
          "128 位量子安全性；在可预见的硬件下不可行",
        ],
      ],
      pFutureConclusion:
        "在 ECDSA 签名可被破解的后量子世界中，Qryptum 的保险库密码哈希（keccak256）成为最后一道防线。与 ECDSA 不同，keccak256 不依赖椭圆曲线离散对数问题。它是一个单向函数，即使面对量子对手也在计算上保持困难。",
      h2HonestScope: "保护范围的如实说明",
      pHonestScope:
        "Qryptum 不声称在基础层使以太坊具备量子安全性。以下限制适用：",
      honestItems: [
        "以太坊钱包签名（ECDSA）：不具备量子抵抗性。这是以太坊基础层的问题，并非 Qryptum 特有。以太坊社区正在积极研究用于未来协议升级的后量子签名方案。",
        "calldata 中的保险库密码字符串：原始保险库密码在 shield()、unshield() 和 revealTransfer() 期间出现在交易 calldata 中。如果攻击者能读取历史 calldata 且已知私钥，他们就能获知保险库密码。任何怀疑泄露后，可通过 changeVaultProof() 轮换保险库密码。",
        "哈希到密码的反转：存储的哈希无法用于推导保险库密码。但 calldata 中的原始密码在链上可观察到。",
      ],
      pHonestConclusion:
        "Qryptum 的后量子弹性具体体现在保险库密码哈希存储和提交-揭示转账哈希上。这些使用 keccak256，即使在 ECDSA 被攻破的场景下也能提供有意义的防御。",
    },
    contractVerification: {
      title: "合约验证",
      intro:
        "所有 Qryptum 合约均在 Etherscan 上验证。任何人都可以阅读源代码、检查 ABI，并确认不存在超出本文档所记录内容的特权函数。",
      h2Sepolia: "Sepolia 测试网（上线中）",
      h3V6Active: "v6：活跃（OTP 链 · air bags · 49/49 E2E · MIT 已验证）",
      pV6: "v5 的安全升级。OTP 链替换静态 bytes32 proofHash：每个 proof 仅可使用一次并推进链头，从结构上使重放攻击不可能发生。Air bags 隔离将 QryptAir 资金与受保护余额分开。rechargeChain() 允许 OTP 补充。Sepolia 上 49/49 E2E 测试全部通过。工厂和实现已在 Etherscan 进行 MIT 验证。",
      h3V5Active: "v5：已被 v6 取代（bytes32 proofHash · 32/32 E2E · MIT 已验证）",
      pV5: "Sepolia 上的标准 v5 部署。bytes32 proofHash 替换 string vaultProof。unshieldToRailgun() 用于 QryptShield，redeemVoucher() EIP-712 用于 QryptAir。32/32 E2E 测试全部通过。所有合约已在 Etherscan 进行 MIT 验证。已被 v6（OTP 链升级）取代。",
      h3V4Decommissioned: "v4：已停用（被 v5 取代）",
      pV4: "添加了 QryptAir EIP-712 凭证和 QryptShield Railgun 桥接。使用 string vaultProof。被 v5 取代（升级为 bytes32 proofHash）。",
      h3V3Active: "v3：已弃用（无管理员密钥）",
      pV3: "重新部署以从工厂中移除 Ownable 和 Pausable。QryptSafe v3 没有管理员密钥：任何人都无法暂停保险库创建或访问用户资金。合约重命名为 QryptSafe（工厂）和 PersonalQryptSafe（保险库实现）。",
      h3V2Superseded: "v2: 已弃用（曾有管理员密钥）",
      pV2: "重新部署以修复 qToken 小数精度错误。ShieldToken 现在在部署时从底层 ERC-20 读取 decimals()。被移除所有管理控制的 v3 取代。",
      h3V1Superseded: "v1: 已弃用（小数精度错误）",
      pV1: "初始部署。ShieldToken 未从底层代币继承 decimals()。OpenZeppelin ERC20 默认为 18 位小数，导致 USDC 支持的 qToken（6 位小数）在 Etherscan 中显示为 0.0000000000095 而非 9.5。这些合约保留在链上作为历史参考。",
      contractTableHeaders: ["合约", "地址", "Etherscan"],
      viewSource: "查看源码",
      h2Mainnet: "以太坊主网",
      calloutMainnet:
        "主网部署正在进行中。部署和 Etherscan 验证完成后，地址将发布于此。",
      h2WhatProves: "验证能证明什么",
      pWhatProves:
        "Etherscan 验证将已部署的字节码与 Solidity 源代码关联。任何人都可以确认：",
      proveItems: [
        "合约源码与链上部署的编译器输出相匹配",
        "不存在超出文档记录的隐藏函数",
        "构造函数参数与预期值匹配",
        "编译器版本和优化设置已公开",
      ],
      h2HowToVerify: "如何自行验证",
      pHowToVerify: "克隆合约仓库并在本地编译：",
      h2TestCoverage: "测试覆盖率",
      coverageHeaders: ["测试套件", "测试数", "覆盖内容"],
      coverageRows: [
        ["QToken.test.js", "13", "铸造、销毁、所有不可转让情况、小数精度"],
        ["ShieldFactory.test.js", "15", "保险库创建、暂停/恢复、所有权"],
        ["PersonalVault.test.js", "45", "所有操作、边界情况、安全不变量"],
        ["integration.test.js", "11", "完整端到端存入、转账和取出生命周期"],
      ],
      coverageTotal: ["总计", "84", "全部通过"],
      h2E2EV6: "E2E 测试结果（Sepolia，v6: 49/49）",
      e2eV6Rows: [
        ["Sepolia 上 v6 工厂字节码已确认", "PASS"],
        ["Sepolia 上 v6 实现字节码已确认", "PASS"],
        ["通过 v6 工厂创建 Vault C（EIP-1167 克隆）", "PASS"],
        ["创建重复保险库回滚", "PASS"],
        ["为保险库授权 USDC（T08）", "PASS"],
        ["shield() 1 USDC OTP 链 H99（T09）", "PASS"],
        ["shield() 错误 OTP proof 回滚", "PASS"],
        ["qUSDC 铸造到所有者钱包", "PASS"],
        ["commitTransfer() OTP proof H98（T14）", "PASS"],
        ["revealTransfer() 钱包 B 收到 USDC", "PASS"],
        ["重复使用 OTP proof 回滚", "PASS"],
        ["过期提交回滚", "PASS"],
        ["rechargeChain() OTP 补充（T19）", "PASS"],
        ["unshield() 1 USDC（T20）", "PASS"],
        ["unshield() 错误 OTP proof 回滚", "PASS"],
        ["fundAirBudget() QryptAir air bags（T23）", "PASS"],
        ["redeemAirVoucher() EIP-712 有效签名（T25）", "PASS"],
        ["redeemAirVoucher() 过期截止日期回滚", "PASS"],
        ["redeemAirVoucher() 错误转账代码回滚", "PASS"],
        ["redeemAirVoucher() 重放回滚（nonce 已使用）", "PASS"],
        ["Air bags 余额与受保护余额隔离", "PASS"],
        ["reclaimAirBudget() 返回受保护余额", "PASS"],
        ["unshieldToRailgun() QryptShield（T33）", "PASS"],
        ["unshieldToRailgun() 错误 OTP proof 回滚", "PASS"],
        ["跨钱包访问回滚（onlyOwner）", "PASS"],
        ["qToken 不可转让（直接转账回滚）", "PASS"],
        ["Vault C 与其他保险库存储隔离", "PASS"],
        ["qUSDC v6 6 位小数已确认", "PASS"],
        ["每次使用后 OTP 链头推进", "PASS"],
        ["OTP 链补充已在链上验证", "PASS"],
        ["v6 工厂已在 Etherscan 进行 MIT 验证", "PASS"],
        ["v6 实现已在 Etherscan 进行 MIT 验证", "PASS"],
        ["qToken USDC v6 已在 Etherscan 验证", "PASS"],
        ["EIP-1167 最小代理克隆已验证", "PASS"],
        ["Vault C 地址与工厂注册表匹配", "PASS"],
        ["changeOTPChain() 轮换链头", "PASS"],
        ["链轮换后旧 OTP proof 被拒绝", "PASS"],
        ["不活动后 emergencyWithdraw() 可用", "PASS"],
        ["低于最小值的保护回滚", "PASS"],
        ["commitTransfer() 自转账回滚", "PASS"],
        ["OTP 安全性：H97 无法从 H98 计算", "PASS"],
        ["OTP 安全性：只有所有者可以推进链", "PASS"],
        ["OTP 安全性：proof 原像从不在存储中", "PASS"],
        ["Air bags 安全性：凭证无法耗尽受保护余额", "PASS"],
        ["Air bags 安全性：未注资凭证回滚", "PASS"],
        ["QryptShield：Railgun 池地址已验证", "PASS"],
        ["QryptAir EIP-712 域已验证（chainId 11155111）", "PASS"],
        ["Group 8 不变量：所有存储检查通过", "PASS"],
      ] as [string, string][],
      h2E2EV5: "E2E 测试结果（Sepolia，v5: 32/32）",
      e2eV5Rows: [
        ["Sepolia 上确认 v5 工厂字节码", "PASS"],
        ["Sepolia 上确认 v5 实现字节码", "PASS"],
        ["通过工厂创建 Vault A（EIP-1167 克隆）", "PASS"],
        ["通过工厂创建 Vault B（隔离存储）", "PASS"],
        ["创建重复金库被拒绝", "PASS"],
        ["shield() 10 USDC：正确 bytes32 proofHash", "PASS"],
        ["shield() 错误 proofHash：预期回滚", "PASS"],
        ["Unshield：正确 proofHash", "PASS"],
        ["Unshield：错误 proofHash 回滚", "PASS"],
        ["commitTransfer() 哈希意图（bytes32）", "PASS"],
        ["revealTransfer() Wallet B 收到 USDC", "PASS"],
        ["重放提交被拒绝（已使用）", "PASS"],
        ["揭示中错误金库证明被拒绝", "PASS"],
        ["过期提交被拒绝（时间锁）", "PASS"],
        ["changeVaultProof()：轮换 bytes32 哈希", "PASS"],
        ["轮换后旧证明被拒绝", "PASS"],
        ["unshieldToRailgun() QryptShield：正确证明", "PASS"],
        ["unshieldToRailgun() 错误证明回滚", "PASS"],
        ["redeemVoucher() QryptAir EIP-712：有效签名", "PASS"],
        ["redeemVoucher() 过期截止日期回滚", "PASS"],
        ["redeemVoucher() 错误转账代码回滚", "PASS"],
        ["redeemVoucher() 重放被拒绝（nonce 已使用）", "PASS"],
        ["跨钱包金库访问被拒绝（onlyOwner）", "PASS"],
        ["qToken 不可转让（直接转账回滚）", "PASS"],
        ["Vault A 存储与 Vault B 隔离", "PASS"],
        ["qUSDC 6 位小数（精度修复确认）", "PASS"],
        ["v5 工厂已在 Etherscan MIT 验证", "PASS"],
        ["v5 实现已在 Etherscan MIT 验证", "PASS"],
        ["qUSDC 已在 Etherscan 验证", "PASS"],
        ["EIP-1167 最小代理克隆已验证", "PASS"],
        ["Vault A 地址与工厂注册表匹配", "PASS"],
        ["Vault B 地址与工厂注册表匹配", "PASS"],
      ],
      h2E2E: "E2E 测试结果（Sepolia，v2: 历史记录）",
      e2eHeaders: ["测试", "结果"],
      e2eRows: [
        ["创建 Qrypt-Safe", "通过"],
        ["存入 USDC（余额显示为 2.0 qUSDC，小数修复已确认）", "通过"],
        ["qToken 不可转让（直接转账回滚）", "通过"],
        ["错误保险库密码导致回滚", "通过"],
        ["跨钱包保险库访问回滚（onlyOwner）", "通过"],
        ["提交-揭示转账：钱包 B 收到原始 USDC", "通过"],
        ["重放提交回滚（Commit already used）", "通过"],
        ["取出 USDC", "通过"],
      ],
    },
  },
};
