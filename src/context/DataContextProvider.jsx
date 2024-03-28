import React, { useState, useEffect } from "react";
import { MimicLogs, MimicMetrics } from "../api/api-mimic.js";
import DataContext from "./dataContext";

const DataContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // Fetch logs
  const fetchLogs = async () => {
    const startTs = Date.now() - 60 * 60 * 24 * 1000;
    const endTs = Date.now();
    const limit = 20;
    const fetchedLogs = await MimicLogs.fetchPreviousLogs({
      startTs,
      endTs,
      limit,
    });
    setLogs(fetchedLogs);
  };

  const fetchMetrics = async () => {
    const startTs = Date.now() - 60 * 60 * 24 * 1000;
    const endTs = Date.now();
    const fetchedMetrics = await MimicMetrics.fetchMetrics({ startTs, endTs });
    setMetrics(fetchedMetrics);
  };

  useEffect(() => {
    fetchLogs();
    fetchMetrics();
  }, [setLogs, setMetrics]);

  return (
    <DataContext.Provider value={{ metrics, setMetrics, logs, setLogs }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
