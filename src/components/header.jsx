import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/TF logo.svg";
import Metrics from "../assets/metrics.png";
import Logs from "../assets/list-active.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-4 mx-5">
      <div className="flex gap-4">
        <img src={Logo} alt="Logo" />
        <div onClick={() => navigate("/")} className="flex items-center gap-1 cursor-pointer">
          <img className="w-5" src={Metrics} alt="Metrics" />
          <h1 className="font-bold hover:decoration-slate-600 hover:underline hover:underline-offset-8 hover:decoration-2">Metrics</h1>
        </div>
        <div
          onClick={() => navigate("/logs")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img className="w-4" src={Logs} alt="Logs" />
          <h1 className="font-bold hover:decoration-slate-600 hover:underline hover:underline-offset-8 hover:decoration-2">Logs</h1>
        </div>
      </div>
      <div className="border-2 px-2 rounded-lg cursor-pointer">
        <h4>Last 5 minutes</h4>
      </div>
    </div>
  );
};

export default Header;
