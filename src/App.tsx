import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { LanguageProvider } from "@/lib/LanguageContext";
import DocsLayout from "@/components/DocsLayout";
import Overview from "@/pages/introduction/Overview";
import WhyQryptum from "@/pages/introduction/WhyQryptum";
import HowItWorks from "@/pages/introduction/HowItWorks";
import SecurityModel from "@/pages/security/SecurityModel";
import NonCustodial from "@/pages/security/NonCustodial";
import TokenProtection from "@/pages/security/TokenProtection";
import PostQuantum from "@/pages/security/PostQuantum";
import ContractVerification from "@/pages/security/ContractVerification";
import DeployedAddresses from "@/pages/contracts/DeployedAddresses";
import ShieldFactory from "@/pages/contracts/ShieldFactory";
import PersonalVault from "@/pages/contracts/PersonalVault";
import QToken from "@/pages/contracts/QToken";
import QryptSafeV1History from "@/pages/contracts/QryptSafeV1History";
import QryptSafeV2History from "@/pages/contracts/QryptSafeV2History";
import QryptSafeV3History from "@/pages/contracts/QryptSafeV3History";
import QryptSafeV4History from "@/pages/contracts/QryptSafeV4History";
import QryptSafeV5History from "@/pages/contracts/QryptSafeV5History";
import QuickStart from "@/pages/developer/QuickStart";
import IntegrationGuide from "@/pages/developer/IntegrationGuide";
import ApiReference from "@/pages/developer/ApiReference";
import CommitRevealFlow from "@/pages/developer/CommitRevealFlow";
import AbiReference from "@/pages/developer/AbiReference";
import Faq from "@/pages/faq/Faq";

function Router() {
  return (
    <DocsLayout>
      <Switch>
        <Route path="/">
          <Redirect to="/introduction/overview" />
        </Route>
        <Route path="/introduction/overview" component={Overview} />
        <Route path="/introduction/why-qryptum" component={WhyQryptum} />
        <Route path="/introduction/how-it-works" component={HowItWorks} />
        <Route path="/security/security-model" component={SecurityModel} />
        <Route path="/security/non-custodial" component={NonCustodial} />
        <Route path="/security/token-protection" component={TokenProtection} />
        <Route path="/security/post-quantum" component={PostQuantum} />
        <Route path="/security/contract-verification" component={ContractVerification} />
        <Route path="/contracts/deployed-addresses" component={ShieldFactory} />
        <Route path="/contracts/shield-factory" component={ShieldFactory} />
        <Route path="/contracts/personal-vault" component={PersonalVault} />
        <Route path="/contracts/qtoken" component={QToken} />
        <Route path="/contracts/qrypt-safe-v1" component={QryptSafeV1History} />
        <Route path="/contracts/qrypt-safe-v2" component={QryptSafeV2History} />
        <Route path="/contracts/qrypt-safe-v3" component={QryptSafeV3History} />
        <Route path="/contracts/qrypt-safe-v4" component={QryptSafeV4History} />
        <Route path="/contracts/qrypt-safe-v5" component={QryptSafeV5History} />
        <Route path="/developer/quick-start" component={QuickStart} />
        <Route path="/developer/integration-guide" component={IntegrationGuide} />
        <Route path="/developer/api-reference" component={ApiReference} />
        <Route path="/developer/commit-reveal-flow" component={CommitRevealFlow} />
        <Route path="/developer/abi-reference" component={AbiReference} />
        <Route path="/faq" component={Faq} />
        <Route>
          <Redirect to="/introduction/overview" />
        </Route>
      </Switch>
    </DocsLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;
