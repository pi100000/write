import React from "react";
import "../App.css";

type AppHeaderProps = {};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
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
