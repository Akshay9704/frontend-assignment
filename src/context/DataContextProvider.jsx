import React, { useState, useEffect } from "react";
import { MimicMetrics } from "../api/api-mimic.js";
import DataContext from "./dataContext";

const DataContextProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);

  const fetchMetrics = async () => {
    const startTs = Date.now() - 60 * 60 * 24 * 1000;
    const endTs = Date.now();
    const fetchedMetrics = await MimicMetrics.fetchMetrics({ startTs, endTs });
    setMetrics(fetchedMetrics);
  };

  useEffect(() => {
    fetchMetrics();
  }, [setMetrics]);

  return (
    <DataContext.Provider value={{ metrics, setMetrics }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
