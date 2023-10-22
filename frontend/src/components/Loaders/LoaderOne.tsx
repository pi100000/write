import React from "react";
import "./styles/loader-one.css";

type Props = {};

export const LoaderOne = (props: Props) => {
  return (
    <div className="loader">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};
