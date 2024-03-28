import React, { useState, useEffect } from 'react';
import { MimicLogs, MimicMetrics } from '../api/api-mimic.js'; // Adjust the path accordingly

const Demo = () => {
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Fetch logs
    const fetchLogs = async () => {
      const startTs = Date.now() - (60 * 60 * 24 * 1000); // Example: Logs from the last 24 hours
      const endTs = Date.now();
      const limit = 10; 
      const fetchedLogs = await MimicLogs.fetchPreviousLogs({ startTs, endTs, limit });
      setLogs(fetchedLogs);
    };

    // Fetch metrics
    const fetchMetrics = async () => {
      const startTs = Date.now() - (60 * 60 * 24 * 1000); // Example: Metrics from the last 24 hours
      const endTs = Date.now();
      const fetchedMetrics = await MimicMetrics.fetchMetrics({ startTs, endTs });
      setMetrics(fetchedMetrics);
    };

    fetchLogs();
    fetchMetrics();
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}: {log.message}</li>
        ))}
      </ul>

      <h1>Metrics</h1>
      {metrics.map((graph, index) => (
        <div key={index}>
          <h2>{graph.name}</h2>
          {graph.graphLines.map((line, idx) => (
            <div key={idx}>
              <h3>{line.name}</h3>
              <ul>
                {line.values.map((data, i) => (
                  <li key={i}>{new Date(data.timestamp).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: false})}: {data.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Demo;
