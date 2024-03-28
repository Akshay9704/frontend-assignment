import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/TF logo.svg";
import Metrics from "../assets/metrics.png";
import Logs from "../assets/list-active.png";

const Header = ({setTime, selectedTime, setSelectedTime}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuItemClick = (time) => {
    setTime(time);
    setShowDropdown(false);
    if (time === 5) {
      setSelectedTime("Last 5 minutes");
    } else if (time === 10) {
      setSelectedTime("Last 10 minutes");
    } else if (time === 15) { 
      setSelectedTime("Last 15 minutes");
    } else if (time === 30) {
      setSelectedTime("Last 30 minutes");
    } else if (time === 60) {
      setSelectedTime("Last 1 hour");
    } else if (time === 180) {
      setSelectedTime("Last 3 hours");
    } else if (time === 360) {
      setSelectedTime("Last 6 hours");
    }
  };

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
      <div className="relative">
        <div
          onClick={handleDropdownClick}
          className="border-2 px-2 rounded-lg cursor-pointer"
        >
          <h4>{selectedTime} &#9662;</h4>
        </div>
        {showDropdown && (
          <div className="absolute top-8 right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-10">
            <div
              onClick={() => handleMenuItemClick(5)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 5 minutes
            </div>
            <div
              onClick={() => handleMenuItemClick(10)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 10 minutes
            </div>
            <div
              onClick={() => handleMenuItemClick(15)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 15 minutes
            </div>
            <div
              onClick={() => handleMenuItemClick(30)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 30 minutes
            </div>
            <div
              onClick={() => handleMenuItemClick(60)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 1 hour
            </div>
            <div
              onClick={() => handleMenuItemClick(180)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 3 hours
            </div>
            <div
              onClick={() => handleMenuItemClick(360)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              Last 6 hours
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
