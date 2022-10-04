import React from "react";

import Spinner from "../UI/Spinner";
import "./style.css";
export default function LoadingPage() {
  return (
    <div className="wrapper">
      <Spinner />
    </div>
  );
}
