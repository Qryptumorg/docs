import { useLanguage } from "@/lib/LanguageContext";
import { contractsContent } from "@/lib/content/contracts";

export default function PersonalVault() {
  const { lang, t } = useLanguage();
  const c = contractsContent[lang].personalVault;

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

      <h2>{c.h2Inheritance}</h2>
      <pre><code>{`import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PersonalVault is ReentrancyGuard {
    address public owner;
    address public factory;
    bool private initialized;
}`}</code></pre>

      <h2>{c.h2Constants}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.constantHeaders[0]}</th>
            <th>{c.constantHeaders[1]}</th>
            <th>{c.constantHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.constantRows.map(([name, value, desc]) => (
            <tr key={name}>
              <td><code>{name}</code></td>
              <td><code>{value}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.h2Functions}</h2>

      <h3>{c.h3Initialize}</h3>
      <pre><code>{`function initialize(address _owner, string calldata password) external`}</code></pre>
      <p>{c.pInitialize}</p>

      <h3>{c.h3Shield}</h3>
      <pre><code>{`function shield(address token, uint256 amount, string calldata password)
    external onlyOwner nonReentrant`}</code></pre>
      <p>{c.pShield}</p>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Revert</th>
          </tr>
        </thead>
        <tbody>
          {c.shieldReverts.map(([condition, revert]) => (
            <tr key={condition}>
              <td>{condition}</td>
              <td><code>{revert}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{c.h3Unshield}</h3>
      <pre><code>{`function unshield(address token, uint256 amount, string calldata password)
    external onlyOwner nonReentrant`}</code></pre>
      <p>{c.pUnshield}</p>

      <h3>{c.h3CommitTransfer}</h3>
      <pre><code>{`function commitTransfer(bytes32 commitHash) external onlyOwner`}</code></pre>
      <p>{c.pCommitTransfer}</p>

      <h3>{c.h3RevealTransfer}</h3>
      <pre><code>{`function revealTransfer(
    address token,
    address to,
    uint256 amount,
    string calldata password,
    uint256 nonce
) external onlyOwner nonReentrant`}</code></pre>
      <p>{c.pRevealTransfer}</p>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Revert</th>
          </tr>
        </thead>
        <tbody>
          {c.revealReverts.map(([condition, revert]) => (
            <tr key={condition}>
              <td>{condition}</td>
              <td><code>{revert}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{c.h3ChangeVaultProof}</h3>
      <pre><code>{`function changeVaultProof(string calldata oldPassword, string calldata newPassword)
    external onlyOwner`}</code></pre>
      <p>{c.pChangeVaultProof}</p>

      <h3>{c.h3EmergencyWithdraw}</h3>
      <pre><code>{`function emergencyWithdraw(address[] calldata tokens) external onlyOwner`}</code></pre>
      <p>{c.pEmergencyWithdraw}</p>

      <h2>{c.h2Events}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.eventHeaders[0]}</th>
            <th>{c.eventHeaders[1]}</th>
          </tr>
        </thead>
        <tbody>
          {c.eventRows.map(([event, desc]) => (
            <tr key={event}>
              <td><code>{event}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
