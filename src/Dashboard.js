import React from 'react';
import './Dashboard.css';
import lineChartImage from './linechart.png'; 
import ConversionImage from './conversion.png'; 

function Dashboard() {
  // Example static data
  const data = {
    visitors: 18673,
    pageViews: 5608,
    conversions: 50,
    nonOrganic: 10000,
    organic: 3000,
    CTR: 100,
  };

  return (
    <div className='dashboard'>
      <h2>Life Time Value Overview</h2>
      <div className='stats-container'>
        <div className='stats-container1'>
          <div className='stat-box'><p>Impressions: {data.visitors}</p></div>
          <div className='stat-box'><p>Clicks: {data.pageViews}</p></div>
        </div>
        <div className='stats-container2'>
          <div className='stat-box'><p>Non-Organic: {data.nonOrganic}</p></div>
          <div className='stat-box'><p>Organic: {data.organic}</p></div>
        </div>
        <div className='stats-container3'>
          <div className='stat-box'><p>CTR: {data.CTR}</p></div>
        </div>
      </div>

      <div className='chart-container'>
        <div className='line-chart-container'>
          <h2>User Trends</h2>
          <img src={lineChartImage} alt="Line Chart" />
        </div>
        <div className='conversion-container'>
          <h2>Conversion Trends</h2>
          <img src={ConversionImage} alt="Conversion Chart" />
        </div>
      </div>
    
    </div>
  );
}

export default Dashboard;
