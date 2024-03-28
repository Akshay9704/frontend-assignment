import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Metrics from './pages/metrics/metrics';
import Logs from './pages/logs/logs';
import DataContextProvider from './context/DataContextProvider';
function App() {
  return (
    <Router>
      <DataContextProvider>
        <Routes>
          <Route path="/" element={<Metrics />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </DataContextProvider>
    </Router>
  );
}

export default App;
