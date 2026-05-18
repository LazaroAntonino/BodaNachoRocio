import { AmorProvider, useAmor } from "./AmorContext";
import AuthScreen from "./AuthScreen";
import Onboarding from "./Onboarding";
import AppInterior from "./AppInterior";
import "./EncuentraElAmor.css";

function AmorRouter() {
  const { user } = useAmor();
  if (!user) return <AuthScreen />;
  if (!user.onboarding_completado) return <Onboarding />;
  return <AppInterior />;
}

export default function EncuentraElAmor() {
  return (
    <AmorProvider>
      <div className="amor-page-root">
        <AmorRouter />
      </div>
    </AmorProvider>
  );
}
