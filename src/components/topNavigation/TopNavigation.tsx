import React from "react";
import "./topNavigationStyle.css";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../shared/enums/routes.enum";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import onLoginContent from "./functions/onLoginContent";
import onNotLoginContent from "./functions/onNotLoginContent";

const TopNavigation: React.FC = () => {
  const navigator = useNavigate();

  return (
    <div className="top-navigation-root">
      <div className="top-navigation">
        <div className="top-navigation-home-section">
          <img
            className="top-navigation-home-section-icon"
            src="/douranLogo.png"
            alt="Logo"
            onClick={() => navigator(ROUTES_ENUM.HOME)}
          />
        </div>

        {localStorage.getItem(TOKEN_KEY_ENUM.ACCESS)
          ? onLoginContent()
          : onNotLoginContent()}
      </div>
    </div>
  );
};

export default TopNavigation;
