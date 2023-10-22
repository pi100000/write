import React from "react";
import "./index.css";

type AppHeaderProps = {};

const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>WRITE</h1>
        <nav>
          <ul>
            <li>Search</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
