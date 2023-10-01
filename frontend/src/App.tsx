import React from "react";
import "./App.css";
import ContentCard from "./components/ContentCard";
import data from "./data.json";

type AppProps = React.FC;

const App: AppProps = () => {
  const contentCards = data.map((item) => (
    <ContentCard key={item.id} item={item} />
  ));

  return <div className="content-cards-container">{contentCards}</div>;
};

export default App;
