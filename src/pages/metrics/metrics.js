import Header from '../../components/header';
import "./metrics.css";
import CpuChart from '../../components/charts/cpuChart';
import MemoryUsage from '../../components/charts/memoryUsage';
import NetworkChart from '../../components/charts/networkChart';
import DiskChart from '../../components/charts/diskChart';

const Metrics = () => {
  return (
    <div>
      <Header />
      <div className='border-2 mx-4 mt-5 rounded-xl p-3'>
        <div className='flex items-center gap-5'>
          <h1 className='font-bold text-2xl'>Metrics</h1>
          <p className='text-sm'>09/08/2023 10:10 -&gt; 09/08/2023 10:15</p>
        </div>
        <div>
          <div className='charts grid grid-cols-2 gap-3 mt-2 py-1 px-6'>
            {/* CPU Usage CHART */}
            <CpuChart />
            {/* Memory Usage CHART */}
            <MemoryUsage />
            {/* Network Usage CHART */}
            <NetworkChart />
            {/* Disk IOPS */}
            <DiskChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Metrics;
