import React, { useEffect, useState } from "react";
import "./App.css";
import ContentCard from "./components/ContentCard";
import AppHeader from "./components/AppHeader";
import { getAll } from "./services/write.service";

type AppProps = React.FC;

const App: AppProps = () => {
  type Write = {
    id: number;
    title: string;
    content: string;
    tags: string[];
  };

  const [writeData, setWriteData] = useState<Write[]>([]);

  const contentCards = writeData.map((item) => (
    <ContentCard key={item.id} item={item} />
  ));

  const getData = async () => {
    let data = await getAll();
    setWriteData(data.data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppHeader />
      <div className="content-cards-container">{contentCards}</div>
    </>
  );
};

export default App;
