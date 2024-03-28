import React, { useContext } from 'react';
import Header from '../../components/header'
import DataContext from '../../context/dataContext.js';
import './logs.css'

const Logs = () => {

  const { logs } = useContext(DataContext);

  return (
    <div>
      <Header />
      <div className='logs'>
        {logs.map((log, index) => (
          <ul key={index} className='flex gap-2'>
            <li className='timestamp'>{new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}: </li>
            <li className='message'>{log.message}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Logs