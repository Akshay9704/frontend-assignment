import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/header';
import './logs.css';
import { MimicLogs } from '../../api/api-mimic.js'; 

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(60 * 5); // Default to 5 minutes
  const [liveLogsEnabled, setLiveLogsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const logContainerRef = useRef(null);

  // Fetch logs for the specified time range
  const fetchLogs = async (startTs, endTs, limit) => {
    try {
      setLoading(true);
      const fetchedLogs = await MimicLogs.fetchPreviousLogs({ startTs, endTs, limit });
      setLogs(prevLogs => [...prevLogs, ...fetchedLogs]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  // Subscribe to live logs if enabled
  useEffect(() => {
    let unsubscribeLiveLogs;
    if (liveLogsEnabled) {
      unsubscribeLiveLogs = MimicLogs.subscribeToLiveLogs(newLog => {
        setLogs(prevLogs => [...prevLogs, newLog]);
      });
    }
    return () => {
      if (unsubscribeLiveLogs) unsubscribeLiveLogs();
    };
  }, [liveLogsEnabled, setLogs]);

  // Fetch logs when component mounts or time range changes
  useEffect(() => {
    const endTime = Date.now();
    const startTime = endTime - (selectedTimeRange * 1000);
    setLogs([]);
    fetchLogs(startTime, endTime, 50);
  }, [selectedTimeRange]);

  useEffect(() => {
    if (logContainerRef.current && (liveLogsEnabled || logs.length > 0)) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, liveLogsEnabled]);

  return (
    <div>
      <Header />
      <div className='logs' ref={logContainerRef}>
        {loading && <p className='text-yellow-500 text-center'>Loading...</p>}
        {logs.map((log, index) => (
          <ul key={index} className='flex gap-2'>
            <li className='timestamp'>{new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}: </li>
            <li className='message'>{log.message}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Logs;
