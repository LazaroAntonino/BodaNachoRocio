import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import MiPerfil  from "./tabs/MiPerfil";
import Buscar    from "./tabs/Buscar";
import Mensajes  from "./tabs/Mensajes";

const TABS = [
  { id: "perfil",   label: "Mi Perfil", icon: faUser     },
  { id: "buscar",   label: "Buscar",    icon: faHeart    },
  { id: "mensajes", label: "Mensajes",  icon: faComments },
];

export default function AppInterior() {
  const [subTab, setSubTab]           = useState("buscar");
  const [openMatchId, setOpenMatchId] = useState(null);
  const newMatches = 0;

  const handleOpenChat = (matchId) => {
    setOpenMatchId(matchId);
    setSubTab("mensajes");
  };

  const renderTab = () => {
    switch (subTab) {
      case "perfil":
        return <MiPerfil />;
      case "buscar":
        return <Buscar onOpenChat={handleOpenChat} />;
      case "mensajes":
        return (
          <Mensajes
            openMatchId={openMatchId}
            onChatOpened={() => setOpenMatchId(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="amor-app-layout">
      <main className="amor-app-main">
        {renderTab()}
      </main>

      <nav className="amor-bottom-nav" aria-label="Navegación principal">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`amor-nav-btn${subTab === id ? " active" : ""}`}
            onClick={() => setSubTab(id)}
            aria-current={subTab === id ? "page" : undefined}
            type="button"
          >
            {id === "mensajes" && newMatches > 0 && (
              <span className="amor-nav-badge" aria-label={`${newMatches} matches nuevos`}>
                {newMatches > 9 ? "9+" : newMatches}
              </span>
            )}
            <FontAwesomeIcon icon={icon} />
            <span className="amor-nav-label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
